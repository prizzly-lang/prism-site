/**
 * 글 페이지. 본문은 `articles/*.mjs`, 목록과 주소 규칙은 `articles/index.mjs`, 틀은 `ui/page.mjs`.
 *
 * 글 하나의 모양(`articles/*.mjs`의 default export):
 *   slug     경로. 한국어는 `/<slug>/`, 나머지는 `/<lang>/<slug>/`
 *   date     최초 게시일. JSON-LD `datePublished`
 *   updated  마지막으로 내용을 고친 날. JSON-LD `dateModified`, sitemap lastmod
 *   langs    이 글이 있는 언어. 어느 언어로 쓸지는 글마다 첫 주석에 이유를 적는다
 *   type     schema.org 형식
 *   ld       (선택) 언어를 받아 JSON-LD에 더할 필드를 돌려주는 함수
 *   text     언어별 { title, desc, lead, dateLabel, update?, body }
 * body 블록은 `ui/content.mjs`의 BLOCK.
 */

import { ORIGIN, ORG, APP_ID, UI, esc, homeOf } from './site.mjs';
import { ARTICLES, articlePathOf } from './articles/index.mjs';
import { page } from './ui/page.mjs';
import { blocks } from './ui/content.mjs';

export function articlePage(art, lang) {
  const a = art.text[lang];
  const path = articlePathOf(art, lang);
  const images = a.body.filter(([k]) => k === 'img').map(([, v]) => ORIGIN + v.src);

  const ld = {
    '@context': 'https://schema.org',
    '@type': art.type,
    headline: a.title,
    description: a.desc,
    inLanguage: lang,
    url: ORIGIN + path,
    datePublished: art.date,
    dateModified: art.updated,
    author: ORG,
    publisher: ORG,
    // 앱 소개 페이지의 앱과 같은 @id. 글이 어느 PRISM을 말하는지 기계에 묶는다.
    about: { '@type': 'MobileApplication', '@id': APP_ID, name: 'PRISM', url: ORIGIN + homeOf(lang) },
    // 글은 공짜로 읽는다. 앱은 유료다. 둘을 같은 값으로 두면 답변 엔진이 헷갈린다.
    isAccessibleForFree: true,
    ...(images.length ? { image: images } : {}),
    ...(art.ld ? art.ld(lang) : {}),
  };

  return page({
    lang,
    title: `${a.title} | PRISM`,
    h1: a.title,
    desc: a.desc,
    path,
    alternates: Object.fromEntries(art.langs.map((l) => [l, articlePathOf(art, l)])),
    xDefault: articlePathOf(art, art.langs.includes('en') ? 'en' : art.langs[0]),
    ogType: 'article',
    crumbs: [[UI[lang].home, homeOf(lang)]],
    ld: [ld],
    main: `      <article>
        <header class="page-head">
          <h1>${esc(a.title)}</h1>
          <p class="page-head__date"><time datetime="${art.date}">${esc(a.dateLabel)}</time></p>
${a.update ? `          <p class="page-head__update">${esc(a.update)}</p>\n` : ''}          <p class="lead">${a.lead}</p>
        </header>
        <div class="prose">
${blocks(a.body)}
        </div>
      </article>`,
  });
}

/** sitemap 항목: [경로, lastmod]. lastmod는 글을 마지막으로 고친 날이다. 빌드한 날이 아니다. */
export const articleSitemap = () =>
  ARTICLES.flatMap((art) => art.langs.map((l) => [articlePathOf(art, l), art.updated]));

/** llms.txt의 「글 / Writing」 절. */
export const articleLlmsSection = () =>
  ARTICLES.flatMap((art) =>
    art.langs.map((l) => `- [${art.text[l].title}](${ORIGIN}${articlePathOf(art, l)}): ${art.text[l].desc}`),
  ).join('\n');
