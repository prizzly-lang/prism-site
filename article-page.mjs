/**
 * 기술 글 페이지를 그린다. 본문은 `article.mjs`에 있고 여기는 껍데기다.
 *
 * `build.mjs`의 `page()`를 재사용하지 않는 이유: 그쪽은 히어로·영상·FAQ·CTA를
 * 한 덩어리로 들고 있어서, 글에 필요 없는 것을 끄는 분기가 함수 전체에 퍼진다.
 * 겹치는 것은 <head> 몇 줄뿐이고, 분기가 퍼지는 비용이 더 크다.
 *
 * 별도 파일인 이유: build.mjs가 이미 800줄이고, 글은 랜딩 페이지와 수명이
 * 다르다. 글이 늘어나면 이 파일만 커진다.
 *
 * 공유 상수(ORIGIN·esc·L)를 다시 선언하지 않고 `deps`로 받는다. 같은 값이
 * 두 파일에 적히면 한쪽만 고치는 날이 온다.
 */

import { ARTICLE, ARTICLE_SLUG, ARTICLE_DATE } from './article.mjs';

/** 한국어와 영어만. 이유는 `article.mjs` 첫 주석에 있다. */
export const ARTICLE_LANGS = ['ko', 'en'];

export const articlePathOf = (l) => (l === 'ko' ? `/${ARTICLE_SLUG}/` : `/${l}/${ARTICLE_SLUG}/`);

const BLOCK = {
  h2: (v, esc) => `        <h2>${esc(v)}</h2>`,
  /*
    본문에 <strong>·<em>이 들어 있어 이스케이프하지 않는다. 이 값의 출처는
    article.mjs 하나뿐이고 사용자 입력이 섞일 자리가 없다.
  */
  p: (v) => `        <p>${v}</p>`,
  ol: (items) =>
    ['        <ol>', ...items.map((i) => `          <li>${i}</li>`), '        </ol>'].join('\n'),
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

export function articlePage(lang, deps) {
  const { esc, L, ORIGIN, urlOf } = deps;
  const articleUrlOf = (l) => ORIGIN + articlePathOf(l);
  const a = ARTICLE[lang];
  const t = L[lang];
  const up = lang === 'ko' ? '../' : '../../';
  const home = lang === 'ko' ? '/' : `/${lang}/`;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: a.title,
    description: a.desc,
    inLanguage: lang,
    url: articleUrlOf(lang),
    datePublished: ARTICLE_DATE,
    author: { '@type': 'Organization', name: 'A Driven Inc.', url: `${ORIGIN}/` },
    publisher: { '@type': 'Organization', name: 'A Driven Inc.', url: `${ORIGIN}/` },
    about: { '@type': 'MobileApplication', name: 'PRISM', url: urlOf(lang) },
    // 글은 공짜로 읽는다. 앱은 유료다. 둘을 같은 값으로 두면 답변 엔진이 헷갈린다.
    isAccessibleForFree: true,
  };

  const alternates = ARTICLE_LANGS.map(
    (l) => `    <link rel="alternate" hreflang="${l}" href="${articleUrlOf(l)}" />`,
  ).join('\n');

  const otherLangLinks = ARTICLE_LANGS.filter((l) => l !== lang)
    .map(
      (l) =>
        `<a href="${ORIGIN}${articlePathOf(l)}" hreflang="${l}" lang="${l}">${L[l].langName}</a>`,
    )
    .join('\n          ');

  const body = a.body.map(([kind, value]) => BLOCK[kind](value, esc)).join('\n');

  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(a.title)} | PRISM</title>
    <meta name="description" content="${esc(a.desc)}" />
    <meta name="theme-color" content="#06070C" />
    <link rel="canonical" href="${articleUrlOf(lang)}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${articleUrlOf('en')}" />
    <meta property="og:title" content="${esc(a.title)}" />
    <meta property="og:description" content="${esc(a.desc)}" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="${lang.replace('-', '_')}" />
    <meta property="og:url" content="${articleUrlOf(lang)}" />
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
        <p class="article-date"><time datetime="${ARTICLE_DATE}">${esc(a.dateLabel)}</time></p>
        <p class="article-lead">${a.lead}</p>
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
export function articleSitemapEntries({ ORIGIN, now }) {
  const articleUrlOf = (l) => ORIGIN + articlePathOf(l);
  return ARTICLE_LANGS.map((l) =>
    [
      '  <url>',
      `    <loc>${articleUrlOf(l)}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      ...ARTICLE_LANGS.map(
        (a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${articleUrlOf(a)}" />`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${articleUrlOf('en')}" />`,
      '  </url>',
    ].join('\n'),
  ).join('\n');
}

/** llms.txt의 「글 / Writing」 절. 답변 엔진이 인용할 것은 랜딩 페이지가 아니라 이쪽이다. */
export function articleLlmsSection({ ORIGIN }) {
  const articleUrlOf = (l) => ORIGIN + articlePathOf(l);
  return ARTICLE_LANGS.map(
    (l) => `- [${ARTICLE[l].title}](${articleUrlOf(l)}): ${ARTICLE[l].desc}`,
  ).join('\n');
}
