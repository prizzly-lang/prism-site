/**
 * 글 페이지를 그린다. 본문은 `articles/*.mjs`에 있고 여기는 껍데기다.
 *
 * `build.mjs`의 `page()`를 재사용하지 않는 이유: 그쪽은 히어로·영상·FAQ·CTA를
 * 한 덩어리로 들고 있어서, 글에 필요 없는 것을 끄는 분기가 함수 전체에 퍼진다.
 * 겹치는 것은 <head> 몇 줄뿐이고, 분기가 퍼지는 비용이 더 크다.
 *
 * 별도 파일인 이유: build.mjs가 이미 800줄이고, 글은 랜딩 페이지와 수명이
 * 다르다. 글이 늘어나면 `articles/`에 파일이 하나 늘 뿐이다.
 *
 * 공유 상수(ORIGIN·esc·L)를 다시 선언하지 않고 `deps`로 받는다. 같은 값이
 * 두 파일에 적히면 한쪽만 고치는 날이 온다.
 *
 * 글 하나의 모양(`articles/*.mjs`의 default export):
 *   slug     경로. 한국어는 `/<slug>/`, 나머지는 `/<lang>/<slug>/`(랜딩 페이지와 같은 규칙)
 *   date     최초 게시일. JSON-LD `datePublished`
 *   updated  마지막으로 내용을 고친 날. JSON-LD `dateModified`
 *   langs    이 글이 있는 언어. 어느 언어로 쓸지는 글마다 첫 주석에 이유를 적는다
 *   type     schema.org 형식
 *   ld       (선택) 언어를 받아 JSON-LD에 더할 필드를 돌려주는 함수
 *   text     언어별 { title, desc, lead, backHome, dateLabel, update?, body }
 */

import levels from './articles/proven-unique.mjs';
import optics from './articles/optics.mjs';

/** 랜딩 페이지 아래 링크도 이 순서다. 처음 온 사람에게 먼저 보일 글이 앞이다. */
export const ARTICLES = [optics, levels];

export const articlesIn = (lang) => ARTICLES.filter((a) => a.langs.includes(lang));

export const articlePathOf = (art, l) => (l === 'ko' ? `/${art.slug}/` : `/${l}/${art.slug}/`);

/** 영어가 있으면 영어, 없으면 첫 언어. 지금 글은 전부 영어가 있다. */
const defaultLangOf = (art) => (art.langs.includes('en') ? 'en' : art.langs[0]);

const BLOCK = {
  h2: (v, esc) => `        <h2>${esc(v)}</h2>`,
  /*
    본문에 <strong>·<em>이 들어 있어 이스케이프하지 않는다. 이 값의 출처는
    articles/ 안의 파일뿐이고 사용자 입력이 섞일 자리가 없다.
  */
  p: (v) => `        <p>${v}</p>`,
  ol: (items) =>
    ['        <ol>', ...items.map((i) => `          <li>${i}</li>`), '        </ol>'].join('\n'),
  ul: (items) =>
    ['        <ul>', ...items.map((i) => `          <li>${i}</li>`), '        </ul>'].join('\n'),
  /*
    사진 한 장. 폭·높이를 적어 두어 불러오는 동안 글이 밀리지 않게 한다. 화면에서는
    CSS가 절반 폭(2배 밀도)으로 줄인다.
  */
  img: (v, esc) =>
    `        <figure class="article-figure"><img src="${v.src}" alt="${esc(v.alt)}" width="${v.w}" height="${v.h}" loading="lazy" decoding="async" /></figure>`,
  pre: (v, esc) => `        <pre><code>${esc(v)}</code></pre>`,
  table: (rows, esc) => {
    const [head, ...body] = rows;
    return [
      '        <table>',
      '          <thead><tr>' + head.map((c) => `<th>${esc(c)}</th>`).join('') + '</tr></thead>',
      '          <tbody>',
      ...body.map(
        (r) => '            <tr>' + r.map((c) => `<td>${esc(c)}</td>`).join('') + '</tr>',
      ),
      '          </tbody>',
      '        </table>',
    ].join('\n');
  },
};

export function articlePage(art, lang, deps) {
  const { esc, L, ORIGIN, urlOf, ORG, APP_ID } = deps;
  const urlIn = (l) => ORIGIN + articlePathOf(art, l);
  const a = art.text[lang];
  const t = L[lang];
  const up = lang === 'ko' ? '../' : '../../';
  const home = lang === 'ko' ? '/' : `/${lang}/`;

  const images = a.body.filter(([k]) => k === 'img').map(([, v]) => ORIGIN + v.src);

  const ld = {
    '@context': 'https://schema.org',
    '@type': art.type,
    headline: a.title,
    description: a.desc,
    inLanguage: lang,
    url: urlIn(lang),
    datePublished: art.date,
    dateModified: art.updated,
    author: ORG,
    publisher: ORG,
    // 랜딩 페이지의 앱과 같은 @id. 글이 어느 PRISM을 말하는지 기계에 묶는다.
    about: { '@type': 'MobileApplication', '@id': APP_ID, name: 'PRISM', url: urlOf(lang) },
    // 글은 공짜로 읽는다. 앱은 유료다. 둘을 같은 값으로 두면 답변 엔진이 헷갈린다.
    isAccessibleForFree: true,
    // 본문에 사진이 있으면 그 사진들이 이 글의 대표 이미지다(Article 형식이 기대하는 값).
    ...(images.length ? { image: images } : {}),
    ...(art.ld ? art.ld(lang) : {}),
  };

  const alternates = art.langs
    .map((l) => `    <link rel="alternate" hreflang="${l}" href="${urlIn(l)}" />`)
    .join('\n');

  const otherLangLinks = art.langs
    .filter((l) => l !== lang)
    .map((l) => `<a href="${urlIn(l)}" hreflang="${l}" lang="${l}">${L[l].langName}</a>`)
    .join('\n          ');

  const body = a.body.map(([kind, value]) => BLOCK[kind](value, esc)).join('\n');

  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(a.title)} | PRISM</title>
    <meta name="description" content="${esc(a.desc)}" />
    <meta name="theme-color" content="#F3EFE6" />
    <link rel="canonical" href="${urlIn(lang)}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${urlIn(defaultLangOf(art))}" />
    <meta property="og:title" content="${esc(a.title)}" />
    <meta property="og:description" content="${esc(a.desc)}" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="${lang.replace('-', '_')}" />
    <meta property="og:url" content="${urlIn(lang)}" />
    <meta property="og:image" content="${ORIGIN}/img/board-prism.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="${up}style.css" />
    <link rel="icon" href="${up}icon.svg" type="image/svg+xml" />
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
  </head>
  <body>
    <main>
      <nav class="langs" aria-label="${esc(t.otherLangs)}">
        ${otherLangLinks}
      </nav>

      <article class="article">
        <p class="article-back"><a href="${home}">${esc(a.backHome)}</a></p>
        <h1>${esc(a.title)}</h1>
        <p class="article-date"><time datetime="${art.date}">${esc(a.dateLabel)}</time></p>
${a.update ? `        <p class="article-update">${esc(a.update)}</p>\n` : ''}        <p class="article-lead">${a.lead}</p>
${body}
      </article>

      <nav class="links">
        <a href="${home}">PRISM</a>
        <a href="${up}privacy.html">${esc(t.privacy)}</a>
        <a href="${up}support.html">${esc(t.support)}</a>
      </nav>

      <footer>
        <p>© 2026 A Driven Inc. <a href="mailto:prism@adriven.co">prism@adriven.co</a></p>
      </footer>
    </main>
  </body>
</html>
`;
}

/** sitemap.xml에 끼워 넣을 <url> 항목들. 랜딩 페이지 쪽과 같은 모양이다. */
/** lastmod는 글을 마지막으로 고친 날(art.updated)이다. 빌드한 날이 아니다. */
export function articleSitemapEntries({ ORIGIN }) {
  return ARTICLES.flatMap((art) => {
    const urlIn = (l) => ORIGIN + articlePathOf(art, l);
    return art.langs.map((l) =>
      [
        '  <url>',
        `    <loc>${urlIn(l)}</loc>`,
        `    <lastmod>${art.updated}</lastmod>`,
        ...art.langs.map(
          (a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${urlIn(a)}" />`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlIn(defaultLangOf(art))}" />`,
        '  </url>',
      ].join('\n'),
    );
  }).join('\n');
}

/** llms.txt의 「글 / Writing」 절. 답변 엔진이 인용할 것은 랜딩 페이지가 아니라 이쪽이다. */
export function articleLlmsSection({ ORIGIN }) {
  return ARTICLES.flatMap((art) =>
    art.langs.map(
      (l) => `- [${art.text[l].title}](${ORIGIN}${articlePathOf(art, l)}): ${art.text[l].desc}`,
    ),
  ).join('\n');
}
