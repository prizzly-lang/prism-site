/**
 * 학습지 자동 검사 묶음. `node check-worksheets.mjs [slug…] [--no-preview]`
 *
 * 학습지를 하루 하나씩 늘리면 사람 눈으로 매번 다 보지 못한다. 발행 전에 이 한 명령으로
 * 기계가 볼 수 있는 것을 먼저 거른다(prism 저장소 docs/WORKSHEETS.md 2절 「자동 검사 묶음」).
 * 검수 에이전트는 그다음에 물리·문장·교육과정 표현을 본다.
 *
 *   1. 정답 대조     문구의 탭 목록 = 엔진의 boards.json(worksheet-page.mjs의 대조를 그대로 부른다),
 *                    boards.json의 판마다 탭 합 = par
 *   2. 빌드 최신     디스크의 HTML(학습지·정답지·목록)이 지금 데이터로 만든 HTML과 같은지
 *   3. 글꼴 범위     페이지의 한글이 모두 잘라 넣은 글꼴(fonts/coverage.json)에 있는지
 *   4. em dash      U+2014가 없는지. 본문, JSON-LD, 속성(alt·aria-label·title·meta content)까지,
 *                    HTML 개체(&mdash; &#8212;)도 풀어서 본다
 *   5. 금지어        가격(₩, $숫자, 「가격」, 「price」, 숫자에 붙은 「원」), 「계정」, 영어 「…account」
 *   6. 정답지·이용 허락  정답지는 noindex이고 어느 sitemap에도 없다. 학습지는 화면 글자와
 *                    JSON-LD 둘 다에 CC BY-NC 4.0을 밝힌다
 *   7. 쪽 넘침       .sheet는 297mm에 overflow:hidden이라 넘치면 쪽이 늘지 않고 **잘린다**. 그래서
 *                    WebKit으로 장마다 내용이 안쪽 아래 끝을 넘는지 잰다(`tools/sheet-overflow.swift`)
 *   8. PDF          파일이 있고, 쪽 수 = 그 페이지의 A4 장 수, 크기가 A4
 *   9. 흑백 미리보기  PDF를 쪽마다 회색조 PNG로 찍어 경로를 알려 준다(`tools/pdf-gray.swift`).
 *                    판정은 사람이 한다
 *
 * 7과 9는 macOS의 swift가 있어야 한다. 없으면 7은 **실패**로 센다(넘침을 못 본 채 통과시키지
 * 않는다). `--no-preview`는 9만 끈다.
 * 하나라도 틀리면 끝에 모아 보여 주고 종료 코드 1. PDF가 그 학습지의 재료(문구, 판, 삽화,
 * worksheet-page.mjs, css/sheet.css)보다 오래됐으면 경고만 한다(git으로 받은 파일은 수정 시각이
 * 믿을 만하지 않다). PDF를 다시 만드는 일은 `print-worksheet.mjs`.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WORKSHEETS, WS_LANGS, worksheetPages, wsPathOf, wsPdf } from './worksheet-page.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const noPreview = args.includes('--no-preview');
const only = args.filter((a) => !a.startsWith('--'));
for (const s of only) if (!WORKSHEETS.some((w) => w.slug === s)) throw new Error(`그런 학습지가 없다: ${s}`);
const sheets = WORKSHEETS.filter((w) => !only.length || only.includes(w.slug));

const errors = [];
const warns = [];
const fail = (slug, what) => errors.push(`${slug}: ${what}`);

/* 1. 정답 대조(문구 ↔ boards.json)는 worksheetPages가 학습지마다 하고, 어긋나면 던진다. */
let pages = [];
try {
  pages = worksheetPages(HERE);
} catch (e) {
  // 정답이 어긋나면 페이지를 하나도 만들지 못한다. 뒤 검사는 의미가 없으니 여기서 멈춘다.
  console.error(`✗ 정답 대조: ${e.message}`);
  process.exit(1);
}

/** HTML 개체를 푼다. &mdash;·&#8212;·&#x20A9;처럼 써서 검사를 빠져나가지 못하게. */
const NAMED = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", mdash: '—', ndash: '–', won: '₩', dollar: '$' };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);

/**
 * 사람과 검색엔진이 읽는 글자. 화면 글자, JSON-LD(답변 엔진이 읽는다), 그리고 속성 중
 * alt·aria-label·title·meta content. 덩어리 사이는 줄바꿈으로 끊어 숫자와 다음 칸의 글자가
 * 붙어 보이지 않게 한다(「2」 칸 다음 「원 ●」 칸을 「2 원」 가격으로 읽지 않게).
 */
function textOf(html) {
  const h = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const attrs = [...h.matchAll(/\s(?:alt|aria-label|title|content)="([^"]*)"/g)].map((m) => m[1]);
  // JSON-LD 안의 — 같은 이스케이프도 푼다.
  const body = h.replace(/\\u([0-9a-f]{4})/gi, (_, x) => String.fromCharCode(parseInt(x, 16))).replace(/<[^>]+>/g, '\n');
  return decode([body, ...attrs].join('\n'));
}

/* 언어마다 금지어. 「원」은 도형 이름(원 ●)이라 숫자에 바로 붙은 것만 본다(가격은 「3,000원」처럼 붙여 쓴다). */
const BANNED = {
  ko: [/가격/, /₩/, /\d[\d,]*원/, /계정/, /\$\s?\d/],
  en: [/\bprices?\b/i, /\$\s?\d/, /₩/, /\b(?:an?|your|my|free|create|new|sign[- ]in|log[- ]in)\s+accounts?\b/i, /\baccounts\b/i, /\bUSD\b/],
};

const coverage = JSON.parse(readFileSync(resolve(HERE, 'fonts/coverage.json'), 'utf8')).hangul;
const sitemaps = readdirSync(HERE).filter((f) => /^sitemap.*\.xml$/.test(f));
const sitemapText = sitemaps.map((f) => readFileSync(resolve(HERE, f), 'utf8')).join('\n');
if (!sitemaps.includes('sitemap-worksheets.xml')) errors.push('sitemap-worksheets.xml이 없다. node build.mjs');

/** 2. 디스크의 HTML이 지금 데이터로 만든 것과 같은지. */
function checkFresh(slug, { path, html }) {
  const onDisk = resolve(HERE, `.${path}index.html`);
  if (!existsSync(onDisk)) fail(slug, `${path}: 빌드 결과가 없다. node build.mjs`);
  else if (readFileSync(onDisk, 'utf8') !== html) fail(slug, `${path}: 디스크의 HTML이 지금 데이터와 다르다. node build.mjs`);
}

/** 3·4·5. 글꼴 범위, em dash, 금지어. */
function checkText(slug, lang, { path, html }) {
  const text = textOf(html);
  const around = (i, n) => text.slice(Math.max(0, i - 20), i + n + 20).replace(/\s+/g, ' ').trim();
  const missing = new Set([...text].filter((c) => /[가-힣]/.test(c) && !coverage.includes(c)));
  if (missing.size) fail(slug, `${path}: 글꼴에 없는 한글 ${[...missing].join('')} (prism에서 npm run fonts -- --site ../prism-site)`);
  const at = text.indexOf('—');
  if (at >= 0) fail(slug, `${path}: em dash(—) ${text.split('—').length - 1}곳: 「${around(at, 1)}」`);
  for (const re of BANNED[lang] ?? []) {
    const m = text.match(re);
    if (m) fail(slug, `${path}: 금지어 ${re} → 「${around(m.index, m[0].length)}」`);
  }
}

/** PDF의 쪽 수와 크기. Chrome(Skia)은 쪽 객체를 압축하지 않으므로 바이트에서 바로 센다. */
function pdfInfo(file) {
  const b = readFileSync(file).toString('latin1');
  const pages = (b.match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
  const counts = [...b.matchAll(/\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)|\/Count\s+(\d+)[^>]*?\/Type\s*\/Pages\b/g)].map((m) => Number(m[1] ?? m[2]));
  const boxes = [...b.matchAll(/\/MediaBox\s*\[\s*([\d.\s-]+)\]/g)].map((m) => m[1].trim().split(/\s+/).map(Number));
  return { pages, total: counts.length ? Math.max(...counts) : null, boxes };
}
/** A4 = 210×297mm = 595.28×841.89pt. Chrome은 1pt 안쪽으로 반올림한다. */
const isA4 = ([x0, y0, x1, y1]) => Math.abs(x1 - x0 - 595.28) < 2 && Math.abs(y1 - y0 - 841.89) < 2;
const newest = (files) => Math.max(0, ...files.filter(existsSync).map((f) => statSync(f).mtimeMs));

const hasSwift = process.platform === 'darwin' && spawnSync('swift', ['--version']).status === 0;
const previews = [];
const toMeasure = []; // [slug, path]

/* 목록 페이지(/worksheets/, /en/worksheets/)에는 학습지마다 카드 문구가 실린다. */
for (const lang of WS_LANGS) {
  const p = pages.find((x) => x.path === wsPathOf(lang, ''));
  if (!p) {
    errors.push(`목록: ${lang} 목록 페이지를 찾지 못했다`);
    continue;
  }
  checkFresh('목록', p);
  checkText('목록', lang, p);
}

for (const w of sheets) {
  const { slug } = w;
  const assets = resolve(HERE, 'worksheets', slug, 'assets');

  /* 1. boards.json 자체: 판마다 탭 합이 par. 엔진 도구가 이미 보지만, 손으로 고친 파일을 잡는다. */
  const bj = join(assets, 'boards.json');
  if (!existsSync(bj)) fail(slug, `boards.json이 없다(${bj})`);
  else {
    for (const lv of JSON.parse(readFileSync(bj, 'utf8')).levels) {
      const sum = lv.rotate.reduce((s, r) => s + r.taps, 0);
      if (sum !== lv.par) fail(slug, `${lv.id}번 판: 탭 합 ${sum} ≠ par ${lv.par}`);
    }
  }
  /* PDF가 이것들보다 오래됐으면 다시 찍어야 할 수 있다. */
  const inputs = [
    resolve(HERE, 'worksheets', `${slug}.mjs`),
    resolve(HERE, 'worksheet-page.mjs'),
    resolve(HERE, 'css/sheet.css'),
    ...(existsSync(assets) ? readdirSync(assets).map((f) => join(assets, f)) : []),
  ];
  const inputsAt = newest(inputs);

  for (const lang of WS_LANGS) {
    for (const answers of [false, true]) {
      const path = wsPathOf(lang, slug, answers);
      const p = pages.find((x) => x.path === path);
      if (!p) {
        fail(slug, `${path}: 페이지를 만들지 못했다`);
        continue;
      }
      checkFresh(slug, p);
      checkText(slug, lang, p);
      toMeasure.push([slug, path]);

      /* 6. 정답지는 검색에서 빼고, 학습지는 이용 허락을 밝힌다 */
      const robots = /<meta name="robots" content="noindex/.test(p.html);
      if (answers && !robots) fail(slug, `${path}: 정답지인데 noindex가 아니다`);
      if (answers && sitemapText.includes(`${path}<`)) fail(slug, `${path}: 정답지가 sitemap에 있다`);
      if (!answers && robots) fail(slug, `${path}: 학습지가 noindex다`);
      if (!answers) {
        if (!/"license"\s*:\s*"https:\/\/creativecommons\.org\/licenses\/by-nc\/4\.0\/?"/.test(p.html)) fail(slug, `${path}: JSON-LD에 CC BY-NC 4.0 license가 없다`);
        const visible = decode(p.html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' '));
        if (!visible.includes('CC BY-NC 4.0')) fail(slug, `${path}: 화면에 CC BY-NC 4.0 표시가 없다`);
      }

      /* 8. PDF */
      const name = wsPdf(slug, lang, answers);
      const pdf = resolve(HERE, 'worksheets', slug, name);
      const want = (p.html.match(/<section class="sheet[\s"]/g) ?? []).length;
      if (!existsSync(pdf)) {
        fail(slug, `${name}가 없다. node print-worksheet.mjs ${slug}`);
        continue;
      }
      const info = pdfInfo(pdf);
      const got = info.pages || info.total;
      if (!got) fail(slug, `${name}: 쪽 수를 세지 못했다(압축된 PDF?). 눈으로 확인하거나 이 검사를 고친다`);
      else if (got !== want) fail(slug, `${name}: ${got}쪽인데 A4 장은 ${want}개다`);
      if (!info.boxes.length) fail(slug, `${name}: MediaBox를 찾지 못해 크기를 확인하지 못했다`);
      else if (!info.boxes.every(isA4)) fail(slug, `${name}: A4가 아니다 ${JSON.stringify(info.boxes.find((b) => !isA4(b)))}`);
      if (inputsAt > statSync(pdf).mtimeMs + 1000) warns.push(`${name}가 재료(문구·판·삽화·틀)보다 오래됐다. 고쳤으면 node print-worksheet.mjs ${slug}`);

      /* 9. 흑백 미리보기 */
      if (hasSwift && !noPreview) {
        const out = join(tmpdir(), 'prism-worksheet-check', slug);
        const r = spawnSync('swift', [resolve(HERE, 'tools/pdf-gray.swift'), pdf, out, '100'], { encoding: 'utf8' });
        if (r.status === 0) previews.push(...r.stdout.trim().split('\n'));
        else warns.push(`${name}: 흑백 미리보기 실패 ${r.stderr.trim().slice(0, 200)}`);
      }
    }
  }
}

/* 7. 쪽 넘침. 빌드된 파일을 작은 서버로 띄워 WebKit으로 잰다. */
if (!hasSwift) errors.push('쪽 넘침: macOS의 swift가 없어 재지 못했다(넘침을 확인하지 않고는 통과시키지 않는다)');
else if (toMeasure.length) {
  const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json', '.js': 'text/javascript' };
  const server = createServer(async (req, res) => {
    let f = join(HERE, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    try {
      if ((await stat(f)).isDirectory()) f = join(f, 'index.html');
      res.writeHead(200, { 'content-type': TYPES[extname(f)] ?? 'application/octet-stream' });
      res.end(await readFile(f));
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  // 서버가 이 프로세스 안에 있으므로 swift를 동기로 부르면 응답하지 못한다. 비동기로 기다린다.
  const { spawn } = await import('node:child_process');
  const stdout = await new Promise((ok) => {
    let s = '';
    const c = spawn('swift', [resolve(HERE, 'tools/sheet-overflow.swift'), ...toMeasure.map(([, p]) => base + p)]);
    c.stdout.on('data', (d) => (s += d));
    c.on('exit', () => ok(s));
  });
  server.close();
  const results = stdout.trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
  for (const [slug, path] of toMeasure) {
    const r = results.find((x) => x.url === base + path);
    if (!r || r.error) fail(slug, `${path}: 쪽 넘침을 재지 못했다 ${r?.error ?? ''}`);
    else if (!r.sheets) fail(slug, `${path}: A4 장(.sheet)이 없다`);
    else for (const o of r.overflow) fail(slug, `${path}: ${o.sheet}번째 장이 ${o.by}px 넘쳐 잘린다(${o.what})`);
  }
}

console.log(`학습지 ${sheets.length}개(${sheets.map((w) => w.slug).join(', ')}) × ${WS_LANGS.join('·')} × 학습지·정답지, 목록 페이지`);
if (previews.length) console.log(`\n흑백 미리보기 ${previews.length}장(눈으로 확인):\n${previews.map((p) => `  ${p}`).join('\n')}`);
else if (!noPreview) console.log('\n흑백 미리보기: 건너뜀(macOS의 swift가 없다)');
if (warns.length) console.log(`\n경고 ${warns.length}건:\n${warns.map((w) => `  ⚠ ${w}`).join('\n')}`);
if (errors.length) {
  console.error(`\n틀린 곳 ${errors.length}건:\n${errors.map((e) => `  ✗ ${e}`).join('\n')}`);
  process.exitCode = 1;
} else console.log('\n✅ 자동 검사 통과(정답 대조, 빌드 최신, 글꼴, em dash, 금지어, 정답지·이용 허락, 쪽 넘침, PDF 쪽 수·A4)');
