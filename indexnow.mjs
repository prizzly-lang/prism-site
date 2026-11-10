/**
 * 바뀐 주소를 IndexNow로 알린다. Bing·네이버·Yandex 등이 같은 알림을 나눠 받는다.
 *
 * 왜: ChatGPT 검색과 Copilot은 Bing 색인을 쓴다. 사이트를 고치고 크롤러가 다시
 * 올 때까지 기다리면 며칠에서 몇 주가 걸리고, 그동안 답변 엔진은 옛 내용(가격,
 * 판 수)을 인용한다. 출시처럼 사실이 바뀌는 날 바로 알린다.
 *
 * 키는 사이트 루트의 `<키>.txt`에 있다(IndexNow 규약: 그 파일 내용이 키와 같아야
 * 소유가 증명된다). 키를 바꾸면 파일 이름과 아래 KEY를 함께 바꾼다.
 *
 * **main에 푸시해 사이트에 실제로 반영된 뒤에** 돌린다. 반영 전에 알리면 크롤러가
 * 옛 페이지를 다시 가져간다.
 *
 *   node indexnow.mjs              sitemap.xml의 주소 전부
 *   node indexnow.mjs /optics/ /   일부만(경로 또는 전체 주소)
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const HOST = 'prism.adriven.co';
const ORIGIN = `https://${HOST}`;
const KEY = 'a41d48cc0ad3257ff19bc6feedbe342a';

const args = process.argv.slice(2);
const urls = args.length
  ? args.map((a) => (a.startsWith('http') ? a : ORIGIN + a))
  : [...readFileSync(resolve(HERE, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: urls }),
});
// 200·202가 접수다. 422는 주소가 host와 안 맞을 때, 403은 키 파일을 못 찾을 때.
console.log(res.status, `${urls.length}개`, (await res.text()).slice(0, 200));
if (!res.ok) process.exitCode = 1;
