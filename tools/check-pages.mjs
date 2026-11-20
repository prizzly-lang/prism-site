/**
 * 화면 확인. `node tools/check-pages.mjs <경로…> [--shot <경로>=<파일.png>]`
 *
 * 지은 사이트를 임시 서버로 띄우고 헤드리스 Chrome(CDP)으로 경로마다 375와 1280 폭에서
 * 가로 넘침, 콘솔 오류, 깨진 내부 링크·그림을 본다. 미리보기 서버를 쓸 수 없는 무인 실행용이다.
 * `--shot /daily/=out.png`는 그 경로의 375 폭 전체 길이 화면을 찍는다.
 * 하나라도 틀리면 종료 코드 1. node 22 이상(전역 WebSocket).
 */
import { createServer } from 'node:http';
import { readFile, stat, mkdtemp, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.mp4': 'video/mp4' };

const args = process.argv.slice(2);
const shots = new Map();
const paths = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--shot') { const [p, f] = args[++i].split('='); shots.set(p, f); if (!paths.includes(p)) paths.push(p); }
  else paths.push(args[i]);
}
if (!paths.length) { console.error('경로를 하나 이상 준다. 예: node tools/check-pages.mjs /daily/ /worksheets/'); process.exit(2); }

async function fileFor(urlPath) {
  let p = join(ROOT, decodeURIComponent(urlPath.split('?')[0].split('#')[0]));
  if (!p.startsWith(ROOT)) return null;
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); await stat(p); return p; } catch { return null; }
}
const server = createServer(async (req, res) => {
  const f = await fileFor(req.url);
  if (!f) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(f)] ?? 'application/octet-stream' });
  res.end(await readFile(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${await mkdtemp(join(tmpdir(), 'prism-check-'))}`, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const browserWs = await new Promise((ok, no) => {
  let buf = '';
  chrome.stderr.on('data', (d) => { buf += d; const m = buf.match(/ws:\/\/[^\s]+/); if (m) ok(m[0]); });
  setTimeout(() => no(new Error('Chrome이 뜨지 않았다')), 20000);
});
const port = new URL(browserWs).port;
const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let seq = 0;
const waiting = new Map();
const listeners = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } else for (const l of listeners) l(m);
});
const send = (method, params = {}) => new Promise((ok) => { const id = ++seq; waiting.set(id, (m) => ok(m.result ?? m)); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;
await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable'); await send('Network.enable');
// 방문 분석(Cloudflare)은 로컬 확인에서 보내지 않는다. 막힌 요청이 남기는 오류는 세지 않는다.
await send('Network.setBlockedURLs', { urls: ['*cloudflareinsights.com*'] });
const ignorable = (e) => /cloudflareinsights\.com/.test(e);

const problems = [];
const linkSeen = new Map();
for (const path of paths) {
  for (const width of [375, 1280]) {
    const errors = [];
    const l = (m) => {
      if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
      if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errors.push(`${m.params.entry.text} ${m.params.entry.url ?? ''}`);
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map((a) => a.value ?? a.description).join(' '));
    };
    listeners.push(l);
    await send('Emulation.setDeviceMetricsOverride', { width, height: 812, deviceScaleFactor: width === 375 ? 2 : 1, mobile: width === 375 });
    const loaded = new Promise((r) => { const w = (m) => { if (m.method === 'Page.loadEventFired') { listeners.splice(listeners.indexOf(w), 1); r(); } }; listeners.push(w); });
    await send('Page.navigate', { url: base + path });
    await loaded;
    await new Promise((r) => setTimeout(r, 700));
    const over = await evaluate('document.documentElement.scrollWidth - window.innerWidth');
    if (over > 1) problems.push(`${path} @${width}: 가로로 ${over}px 넘친다`);
    for (const e of errors.filter((x) => !ignorable(x))) problems.push(`${path} @${width}: 콘솔 오류 ${e}`);
    if (width === 375) {
      const refs = await evaluate(`[...new Set([...document.querySelectorAll('a[href],img[src],link[href],script[src]')].map(e=>e.href||e.src).filter(u=>u.startsWith(location.origin)))]`);
      for (const u of refs ?? []) {
        const p = new URL(u).pathname;
        if (!linkSeen.has(p)) linkSeen.set(p, Boolean(await fileFor(p)));
        if (!linkSeen.get(p)) problems.push(`${path}: 깨진 링크 ${p}`);
      }
      if (shots.has(path)) {
        await evaluate(`(async()=>{document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);await new Promise(r=>setTimeout(r,300));})()`);
        const h = Math.min(await evaluate('document.documentElement.scrollHeight'), 8000);
        await send('Emulation.setDeviceMetricsOverride', { width, height: h, deviceScaleFactor: 2, mobile: true });
        await new Promise((r) => setTimeout(r, 300));
        const png = await send('Page.captureScreenshot', { format: 'png' });
        await writeFile(shots.get(path), Buffer.from(png.data, 'base64'));
        console.log(`화면 ${path} → ${shots.get(path)}`);
      }
    }
    listeners.splice(listeners.indexOf(l), 1);
  }
}
ws.close(); chrome.kill(); server.close();
if (problems.length) { console.error(problems.map((p) => `❌ ${p}`).join('\n')); process.exit(1); }
console.log(`✅ ${paths.length}개 경로 × 375·1280: 가로 넘침·콘솔 오류·깨진 링크 없음 (링크 ${linkSeen.size}개 확인)`);
