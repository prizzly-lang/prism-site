/**
 * 404. GitHub Pages는 없는 주소에 루트의 `/404.html`을 그대로 보여 준다(주소는 그대로 남는다).
 * 그래서 링크는 전부 절대 경로이고, 어느 언어에서 왔는지 모르니 네 언어로 한 줄씩 쓴다.
 * 색인하지 않는다.
 */

import { LANGS, homeOf, esc } from '../site.mjs';
import { page } from '../ui/page.mjs';

const LINE = {
  ko: ['페이지를 찾을 수 없습니다', '주소가 바뀌었거나 없는 페이지입니다.', 'PRISM 첫 화면으로'],
  en: ['Page not found', 'The address has changed or the page does not exist.', 'Go to the PRISM home page'],
  ja: ['ページが見つかりません', 'アドレスが変わったか、存在しないページです。', 'PRISMのトップへ'],
  'zh-Hans': ['找不到页面', '地址已更改，或该页面不存在。', '前往 PRISM 首页'],
};

export function notFoundPage() {
  const others = LANGS.filter((l) => l !== 'ko')
    .map((l) => `        <p lang="${l}">${esc(LINE[l][0])}. ${esc(LINE[l][1])} <a href="${homeOf(l)}">${esc(LINE[l][2])}</a></p>`)
    .join('\n');
  return page({
    lang: 'ko',
    title: `${LINE.ko[0]} | PRISM`,
    desc: LINE.ko[1],
    path: '/404.html',
    noindex: true,
    main: `      <header class="page-head">
        <h1>${esc(LINE.ko[0])}</h1>
        <p class="lead">${esc(LINE.ko[1])} <a href="/">${esc(LINE.ko[2])}</a></p>
      </header>
      <div class="stack">
${others}
      </div>`,
  });
}
