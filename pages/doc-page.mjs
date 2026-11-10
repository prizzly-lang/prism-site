/**
 * 문서 페이지(개인정보 처리방침, 지원). 내용은 `pages/privacy.mjs`, `pages/support.mjs`.
 *
 * 예전에는 손으로 쓴 privacy.html·support.html 두 장이 한·영을 한 페이지에 쌓고 있었다.
 * 영어·일본어·중국어 방문자가 눌러도 한국어 맨 위로 갔다. 이제 언어마다 한 장이고 공통
 * 머리말·바닥글을 쓴다. 한국어 주소(/privacy.html, /support.html)는 스토어에 등록돼 있어 그대로다.
 */

import { ORIGIN, ORG, LANGS, UI, esc, homeOf, docPath } from '../site.mjs';
import { page } from '../ui/page.mjs';
import { blocks } from '../ui/content.mjs';
import privacy from './privacy.mjs';
import support from './support.mjs';

export const DOCS = [privacy, support];

export function docPages() {
  return DOCS.flatMap((doc) =>
    LANGS.map((lang) => {
      const t = doc.text[lang];
      const path = docPath(lang, doc.slug);
      return {
        path,
        updated: doc.updated,
        html: page({
          lang,
          title: `${t.title} | PRISM`,
          h1: t.title,
          desc: t.desc,
          path,
          alternates: Object.fromEntries(LANGS.map((l) => [l, docPath(l, doc.slug)])),
          crumbs: [[UI[lang].home, homeOf(lang)]],
          ld: [{
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: t.title,
            inLanguage: lang,
            url: ORIGIN + path,
            dateModified: doc.updated,
            publisher: ORG,
          }],
          main: `      <header class="page-head">
        <h1>${esc(t.title)}</h1>
${t.updatedLabel ? `        <p class="page-head__date">${esc(t.updatedLabel)}</p>\n` : ''}        <p class="callout">${t.summary}</p>
      </header>
      <div class="prose">
${blocks(t.body)}
      </div>`,
        }),
      };
    }),
  );
}
