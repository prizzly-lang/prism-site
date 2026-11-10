/**
 * 학습지 PDF를 만든다. `node build.mjs` 다음에 돌린다.
 *
 *   node print-worksheet.mjs
 *
 * 화면 페이지와 같은 HTML을 Chrome으로 인쇄한다(인쇄용 CSS가 화면 머리말을 빼고 장마다
 * A4 한 쪽으로 나눈다). PDF를 따로 조판하지 않는 이유: 두 벌을 관리하면 한쪽만 고치는 날이
 * 온다. 학습지 문구를 고치면 PDF도 다시 만든다.
 *
 * 페이지가 사이트 루트 기준 경로(/worksheet/assets/...)를 쓰므로 file://로 열지 않고
 * 잠깐 로컬 서버를 띄운다. Chrome 위치는 CHROME 환경 변수로 바꿀 수 있다.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WS_LANGS, wsPathOf, WS_PDF } from './worksheet-page.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json',
};

const CHROME =
  process.env.CHROME ??
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
  ].find((p) => existsSync(p));
if (!CHROME) throw new Error('Chrome을 찾지 못했다. CHROME 환경 변수로 경로를 준다.');

const server = createServer(async (req, res) => {
  let p = join(HERE, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try {
    if ((await stat(p)).isDirectory()) p = join(p, 'index.html');
    res.writeHead(200, { 'content-type': TYPES[extname(p)] ?? 'application/octet-stream' });
    res.end(await readFile(p));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const print = (url, out) =>
  new Promise((ok, fail) => {
    const p = spawn(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      // 글꼴이 다 내려온 뒤에 인쇄한다. 빠르면 한글이 시스템 글꼴로 찍힌다.
      '--virtual-time-budget=8000',
      `--print-to-pdf=${out}`,
      url,
    ]);
    p.on('exit', (c) => (c === 0 && existsSync(out) ? ok() : fail(new Error(`${url} 인쇄 실패(${c})`))));
  });

for (const lang of WS_LANGS) {
  for (const answers of [false, true]) {
    const out = resolve(HERE, 'worksheet', WS_PDF[lang][answers ? 'answers' : 'sheet']);
    await print(base + wsPathOf(lang, answers), out);
    console.log(`✅ ${out}`);
  }
}
server.close();
