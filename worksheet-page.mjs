/**
 * 인쇄용 학습지 페이지를 그린다. 문구는 `worksheet-content.mjs`, 판 그림은
 * `worksheets/<slug>/assets/`(prism 저장소의 make-worksheet-boards.ts가 넘긴다).
 *
 * 한 페이지에 A4 「장」(.sheet)을 이어 붙인다. 화면에서는 종이 몇 장이 놓인 것처럼
 * 보이고(A4보다 좁으면 한 줄로 흘러내린다, css/sheet.css), 인쇄하면 장마다 A4 한 쪽이 된다.
 * PDF는 같은 HTML을 Chrome으로 인쇄해 만든다(`print-worksheet.mjs`). 화면 전용 머리말
 * (.screen-only)과 사이트 머리말·바닥글은 인쇄에서 빠진다.
 *
 *   /worksheets/                       학습지 목록          /en/worksheets/
 *   /worksheets/path-of-light/         학습지 2쪽           /en/worksheets/path-of-light/
 *   /worksheets/path-of-light/answers/ 정답지 1쪽(교사용)
 *
 * 판 그림은 <img>가 아니라 SVG를 본문에 그대로 넣는다. 그래야 판 가장자리 글자가
 * 사이트 글꼴(Prism Sans)을 쓰고, 기호 설명의 아이콘을 같은 그림에서 잘라 쓸 수 있다.
 * 스크린 리더에는 판마다 role="img"와 이름을 준다(그림 속 글자 대신 무엇을 하는 판인지).
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { WS, BOARDS } from './worksheet-content.mjs';
import { harumathHref } from './crosslinks.mjs';
import { ORIGIN, ORG, APP_ID, UI, LEARN_LANGS, esc, plain, homeOf, worksheetsPath, prefix } from './site.mjs';
import { page } from './ui/page.mjs';

export const WS_LANGS = LEARN_LANGS;
export const WS_SLUG = 'path-of-light';
/** 학습지를 마지막으로 고친 날. sitemap lastmod와 JSON-LD dateModified. 문구·판을 고치면 같이 고친다. */
export const WS_UPDATED = '2026-11-26';
export const wsPathOf = (l, answers = false) => `${worksheetsPath(l, WS_SLUG)}${answers ? 'answers/' : ''}`;
export const WS_PDF = {
  ko: { sheet: 'prism-worksheet-ko.pdf', answers: 'prism-worksheet-answers-ko.pdf' },
  en: { sheet: 'prism-worksheet-en.pdf', answers: 'prism-worksheet-answers-en.pdf' },
};
/** 화면 머리말 이미지. 삽화가 없으면 그 자리를 비운다(빌드는 멈추지 않는다). */
const ART = ['header', 'ch1', 'ch2', 'ch3', 'ch4'];
const DIR = `/worksheets/${WS_SLUG}`;

export function worksheetPages(HERE) {
  const A = resolve(HERE, 'worksheets', WS_SLUG, 'assets');
  const board = JSON.parse(readFileSync(resolve(A, 'boards.json'), 'utf8'));
  checkAgainstEngine(board);

  const svgOf = (name) =>
    readFileSync(resolve(A, name), 'utf8')
      .replace(/<\?xml[^>]*>\s*/, '')
      .replace(/<title>[^<]*<\/title>/, '');
  const qr = readFileSync(resolve(A, 'qr-play.svg'), 'utf8');
  const hasArt = Object.fromEntries(ART.map((a) => [a, existsSync(resolve(A, `${a}.webp`))]));

  /*
    기호 설명 아이콘. 손으로 다시 그리지 않고 실제 판 그림의 한 칸을 viewBox로 잘라 쓴다.
    판에서 본 모양과 설명의 모양이 어긋날 수 없다.
  */
  const cell = (id, kind, col, row) => {
    const lv = board.levels.find((l) => l.id === id);
    const size = 68.5 / lv.grid.cols;
    const inner = svgOf(`${id}-${kind}.svg`).replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    const x = 5 + (col.charCodeAt(0) - 65) * size;
    const y = 5 + (Number(row) - 1) * size;
    return `<svg class="ico" viewBox="${x} ${y} ${size} ${size}" aria-hidden="true">${inner}</svg>`;
  };
  const ICON = {
    source: cell(3, 'puzzle', 'A', 5),
    white: cell(49, 'puzzle', 'C', 1),
    mirror: cell(3, 'puzzle', 'C', 3),
    splitter: cell(22, 'puzzle', 'D', 3),
    prism: cell(49, 'puzzle', 'D', 5),
    crystal: cell(3, 'puzzle', 'A', 1),
  };
  const GLYPH = {
    r: '<svg class="glyph" viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1 9.2 8.6H.8Z"/></svg>',
    g: '<svg class="glyph" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 1.5h7v7h-7z"/></svg>',
    b: '<svg class="glyph" viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="3.8"/></svg>',
  };
  /*
    문구 속 △□○를 판과 같은 도형 그림으로 바꾼다. 사이트 글꼴(SUIT·Instrument Sans)에는
    이 기호가 없어 인쇄하면 시스템 글꼴(맑은 고딕 등)로 섞여 나온다.
  */
  const INLINE = { '△': GLYPH.r, '□': GLYPH.g, '○': GLYPH.b };
  const gl = (s) =>
    esc(s).replace(/[△□○]/g, (c) => INLINE[c].replace('class="glyph"', 'class="glyph inline"'));
  /** 판 그림의 이름(스크린 리더). 도형 기호는 소리 내 읽을 것이 없으니 뺀다. */
  const label = (s) => esc(plain(s).replace(/[△□○]/g, '').replace(/\s+/g, ' '));

  /* 정답 그림의 선 모양. make-worksheet-boards.ts의 BEAM_STYLE과 같은 값이다. */
  const beam = (dash, w, cap) =>
    `<svg class="beam" viewBox="0 0 16 3" aria-hidden="true"><path d="M1 1.5H15" stroke="currentColor" stroke-width="${w}" stroke-linecap="${cap}"${dash ? ` stroke-dasharray="${dash}"` : ''}/></svg>`;
  const BEAM = {
    white: beam('', 0.6, 'round'),
    r: beam('3.4 1.3', 0.55, 'butt'),
    g: beam('2 1.2 0.01 1.2', 0.5, 'round'),
    b: beam('0.01 1.5', 0.9, 'round'),
  };

  const out = [];
  for (const lang of WS_LANGS) {
    const w = WS[lang];
    out.push({ path: worksheetsPath(lang), html: listPage(lang), updated: WS_UPDATED });
    out.push({ path: wsPathOf(lang), html: sheetPage(lang, w, false), updated: WS_UPDATED });
    out.push({ path: wsPathOf(lang, true), html: sheetPage(lang, w, true), updated: WS_UPDATED });
  }
  return out;

  /** 학습지 목록. 학습지가 늘면 카드가 는다. 카드마다 대상·시간·준비물 한 줄. */
  function listPage(lang) {
    const w = WS[lang];
    const L = w.list;
    return page({
      lang,
      title: `${L.title} | PRISM`,
      h1: L.title,
      desc: L.desc,
      path: worksheetsPath(lang),
      alternates: Object.fromEntries(WS_LANGS.map((l) => [l, worksheetsPath(l)])),
      section: 'worksheets',
      crumbs: [[UI[lang].home, homeOf(lang)]],
      ld: [{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: L.title,
        description: L.desc,
        inLanguage: lang,
        url: ORIGIN + worksheetsPath(lang),
        publisher: ORG,
        hasPart: [{ '@type': 'LearningResource', name: w.title, url: ORIGIN + wsPathOf(lang) }],
      }],
      main: `      <header class="page-head">
        <h1>${esc(L.title)}</h1>
        <p class="lead">${esc(L.lead)}</p>
      </header>
      <ul class="card-list stack">
        <li class="card">
          <h2><a href="${wsPathOf(lang)}">${esc(w.title)}</a></h2>
          <p>${esc(w.subtitle)}</p>
          <p class="card__meta">${esc(L.meta)}</p>
        </li>
      </ul>`,
    });
  }

  function sheetPage(lang, w, answers) {
    const path = wsPathOf(lang, answers);
    const pdf = `${DIR}/${WS_PDF[lang].sheet}`;
    const pdfA = `${DIR}/${WS_PDF[lang].answers}`;
    const h1 = answers ? `${w.title}: ${w.answersTitle}` : w.pageTitle;

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: answers ? `${w.title}: ${w.answersTitle}` : w.title,
      description: w.desc,
      inLanguage: lang,
      url: ORIGIN + path,
      dateModified: WS_UPDATED,
      learningResourceType: answers ? 'answer key' : 'worksheet',
      educationalLevel: lang === 'ko' ? '초등 5~6학년, 중학교' : 'Ages 10 to 14',
      teaches: w.concepts.map((c) => c.h),
      isAccessibleForFree: true,
      audience: { '@type': 'EducationalAudience', educationalRole: answers ? 'teacher' : 'student' },
      author: ORG,
      publisher: ORG,
      about: { '@type': 'MobileApplication', '@id': APP_ID, name: 'PRISM' },
      encoding: {
        '@type': 'MediaObject',
        contentUrl: ORIGIN + (answers ? pdfA : pdf),
        encodingFormat: 'application/pdf',
      },
      ...(hasArt.header ? { image: `${ORIGIN}${DIR}/assets/header.webp` } : {}),
    };
    const crumbs = [[UI[lang].home, homeOf(lang)], [UI[lang].worksheets, worksheetsPath(lang)]];
    if (answers) crumbs.push([w.title, wsPathOf(lang)]);

    const screenHead = `      <header class="page page-head screen-only">
        <h1>${esc(h1)}</h1>
${answers ? '' : `        <div class="prose">${w.intro.map((p) => `<p>${gl(p)}</p>`).join('')}</div>\n`}        <p class="actions">
          <a class="button" href="${pdf}" download>${esc(w.pdf)}</a>
          <a class="button button--secondary" href="${pdfA}" download>${esc(w.answersPdf)}</a>
          <button class="button button--secondary" type="button" onclick="window.print()">${esc(w.print)}</button>
        </p>
        <ul class="cluster">
          <li><a href="${wsPathOf(lang, !answers)}">${esc(answers ? w.worksheetLink : w.answersLink)}</a></li>
          <li><a href="${prefix(lang)}/optics/">${esc(w.guideLink)}</a></li>
        </ul>
${lang === 'ko' ? `        <p class="callout callout--note">매일 연산 연습은 <a href="${harumathHref('worksheet')}">하루연산</a>에서 할 수 있습니다. 에이드리븐이 만든 초등 연산 문제지 서비스로, 종이로도 태블릿으로도 풉니다.</p>\n` : ''}      </header>`;

    const body = answers ? answerSheet(w) : `${frontSheet(w)}\n${backSheet(w)}`;

    return page({
      lang,
      title: `${h1} | PRISM`,
      h1,
      desc: w.desc,
      path,
      alternates: Object.fromEntries(WS_LANGS.map((l) => [l, wsPathOf(l, answers)])),
      section: 'worksheets',
      crumbs,
      ld: [ld],
      image: hasArt.header ? `${DIR}/assets/header.webp` : undefined,
      extraCss: ['sheet'],
      mainClass: 'sheets',
      main: `${screenHead}\n${body}`,
    });
  }

  function legend(w) {
    const g = w.legend;
    const item = (ico, label) => `<li>${ico}<span>${esc(label)}</span></li>`;
    return `
          <ul class="legend">
            ${item(ICON.source, g.source)}
            ${item(ICON.white, g.white)}
            ${item(ICON.mirror, g.mirror)}
            ${item(ICON.splitter, g.splitter)}
            ${item(ICON.prism, g.prism)}
            ${item(ICON.crystal, g.crystal)}
          </ul>
          <p class="glyphs"><span>${GLYPH.r}${esc(g.r)}</span><span>${GLYPH.g}${esc(g.g)}</span><span>${GLYPH.b}${esc(g.b)}</span></p>`;
  }

  function sheetHead(w, kicker, title, sub, withArt) {
    return `
        <header class="sheet-head">
          ${withArt && hasArt.header ? `<img class="head-art" src="${DIR}/assets/header.webp" alt="" />` : ''}
          <div class="head-row">
            <div>
              <p class="kicker">${esc(kicker)}</p>
              <h2 class="sheet-title">${esc(title)}</h2>
              <p class="sheet-sub">${esc(sub)}</p>
            </div>
            <dl class="fields">${w.fields.map((f) => `<div><dt>${esc(f)}</dt><dd></dd></div>`).join('')}</dl>
          </div>
        </header>`;
  }

  function frontSheet(w) {
    const cards = BOARDS.map((b, i) => {
      const c = w.boards[i];
      return `
          <article class="board-card">
            <h3><span class="num">${i + 1}</span>${esc(c.name)}${c.extra ? ` <span class="tag">${esc(w.extraTag)}</span>` : ''}</h3>
            <p class="goal">${gl(c.goal)} <strong>${esc(c.taps)}</strong></p>
            <div class="board" role="img" aria-label="${label(`${c.name}. ${c.goal}`)}">${svgOf(`${b.id}-puzzle.svg`)}</div>
            <p class="hint">${gl(c.hint)}</p>
            <p class="write"><span>${esc(w.answerLine)}</span><i></i></p>
          </article>`;
    }).join('');
    return `
      <section class="sheet sheet-front" aria-label="1">
${sheetHead(w, w.kicker, w.title, w.subtitle, true)}
        <section class="rules">
          <div>
            <h3>${esc(w.rulesH)}</h3>
            <ol>${w.rules.map((r) => `<li>${esc(r)}</li>`).join('')}</ol>
            <p class="task">${esc(w.task)}</p>
          </div>
          <div class="legend-box">
            <h3>${esc(w.legendH)}</h3>${legend(w)}
          </div>
        </section>
        <section class="boards">${cards}
        </section>
        <footer class="sheet-foot"><span>${esc(w.appNote)}</span><span>1</span></footer>
      </section>`;
  }

  function backSheet(w) {
    const blocks = w.concepts.map((c, i) => {
      const art = hasArt[`ch${i + 1}`] ? `<img class="c-art" src="${DIR}/assets/ch${i + 1}.webp" alt="" />` : '';
      const lines = (n) => `<div class="lines">${'<i></i>'.repeat(n)}</div>`;
      const extra = c.preview
        ? `<div class="preview"><strong>${esc(c.preview.h)}</strong> ${esc(c.preview.body)}</div>`
        : '';
      const blanks = c.blanks
        ? `<p class="blanks">${c.blanks.map((b) => `<span>${esc(b)} <i></i></span>`).join('')}</p>`
        : '';
      const table = c.table
        ? `<table class="mix">${c.table.map(([a]) => `<tr><th>${esc(a)}</th><td>=</td><td class="blank"></td></tr>`).join('')}</table>`
        : '';
      return `
          <article class="concept">
            ${art}
            <div class="c-text">
              <h3><span class="num">${i + 1}</span>${esc(c.h)}${c.extra ? ` <span class="tag">${esc(w.extraTag)}</span>` : ''}</h3>
              <p>${esc(c.body)}</p>
              ${extra}
              <p class="q">${esc(c.q)}</p>
              ${blanks}${table}${c.q2 ? `<p class="q">${esc(c.q2)}</p>` : ''}${c.lines ? lines(c.lines) : ''}
            </div>
          </article>`;
    }).join('');
    return `
      <section class="sheet sheet-back" aria-label="2">
        <h2 class="back-title">${esc(w.page2H)}</h2>
        <section class="concepts">${blocks}
        </section>
        <footer class="back-foot">
          <div class="qr" role="img" aria-label="QR ${esc(w.qrUrl)}">${qr}</div>
          <div>
            <p><strong>${esc(w.qrH)}</strong> ${esc(w.qrBody)} <span class="url">${esc(w.qrUrl)}</span></p>
            <p class="small">${esc(w.curriculum)} ${esc(w.license)}</p>
            <p class="small">${esc(w.copyright)}</p>
          </div>
          <span class="page-no">2</span>
        </footer>
      </section>`;
  }

  function answerSheet(w) {
    const g = w.beamLegend;
    const cards = BOARDS.map((b, i) => {
      const a = w.answers[i];
      return `
          <article class="board-card answer">
            <h3><span class="num">${i + 1}</span>${esc(w.boards[i].name)}</h3>
            <div class="board" role="img" aria-label="${label(`${w.boards[i].name}. ${a.path}`)}">${svgOf(`${b.id}-answer.svg`)}</div>
            <p class="taps"><strong>${esc(a.taps)}</strong></p>
            <p class="path">${esc(a.path)}</p>
          </article>`;
    }).join('');
    return `
      <section class="sheet sheet-answers" aria-label="${esc(w.answersTitle)}">
        <header class="sheet-head">
          <div class="head-row">
            <div>
              <p class="kicker">${esc(w.kicker)} · ${esc(w.answersKicker)}</p>
              <h2 class="sheet-title">${esc(w.answersTitle)}</h2>
              <p class="sheet-sub">${esc(w.title)}</p>
            </div>
            <div class="beam-legend">
              <p><strong>${esc(w.beamLegendH)}</strong></p>
              <ul>
                <li>${BEAM.white}${esc(g.white)}</li>
                <li>${BEAM.r}${GLYPH.r}${esc(g.r)}</li>
                <li>${BEAM.g}${GLYPH.g}${esc(g.g)}</li>
                <li>${BEAM.b}${GLYPH.b}${esc(g.b)}</li>
                <li><span class="badge">1</span>${esc(g.tap)}</li>
              </ul>
            </div>
          </div>
        </header>
        <section class="boards">${cards}
        </section>
        <section class="concept-answers">
          <h3>${esc(w.conceptAnswersH)}</h3>
          <ol>${w.conceptAnswers.map((a) => `<li>${esc(a.replace(/^\d\.\s*/, ''))}</li>`).join('')}</ol>
        </section>
      </section>`;
  }
}

/**
 * 문구의 탭 목록이 엔진이 만든 boards.json과 같은지. 문구를 고치다 정답이 어긋나면
 * 학습지는 조용히 틀린 답을 가르친다. 그러기 전에 빌드를 멈춘다.
 */
function checkAgainstEngine(board) {
  for (const b of BOARDS) {
    const lv = board.levels.find((l) => l.id === b.id);
    if (!lv) throw new Error(`학습지: boards.json에 ${b.id}번 판이 없다`);
    const engine = Object.fromEntries(lv.rotate.map((r) => [r.cell, r.taps]));
    const mine = JSON.stringify(Object.entries(b.taps).sort());
    const theirs = JSON.stringify(Object.entries(engine).sort());
    if (mine !== theirs) throw new Error(`학습지 ${b.id}번 판: 문구 ${mine} ≠ 엔진 ${theirs}`);
  }
}
