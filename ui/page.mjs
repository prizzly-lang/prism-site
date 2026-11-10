/**
 * 모든 페이지의 틀: <head>, 건너뛰기 링크, 머리말(로고·주 메뉴·언어), 바닥글(사이트맵·회사·
 * 패밀리 사이트). 예전에는 build.mjs·article-page.mjs·worksheet-page.mjs가 <head>를 세 벌
 * 복사해 들고 있었고 이미 어긋나 있었다(학습지에만 og:locale이 없었다). 이제 한 곳이다.
 * 규격: prism 저장소 docs/SITE-UX-PLAN.md 3절.
 *
 * 기본 내비게이션에 자바스크립트를 쓰지 않는다. 현재 위치는 `aria-current`로 표시하고 CSS가
 * 그 속성에 모양을 건다(색만이 아니라 굵기와 밑 막대).
 */

import {
  ORIGIN, APPSTORE, PLAYSTORE, EMAIL, LANGS, LANG_NAME, UI, esc, homeOf, ogLocale,
  navItems, docPath, aboutPath, FAMILY, familyName, familyNameLang, familyHref, COMPANY, COMPANY_UI,
} from '../site.mjs';
import { articlesIn, articlePathOf } from '../articles/index.mjs';
import { breadcrumbs } from './nav.mjs';

/** 언어별 본문 글꼴. 첫 화면 글자가 이것으로 그려지므로 미리 받는다. */
const BODY_FONT = { ko: '/fonts/sans-kr-400.woff2' };

/**
 * 페이지 한 장.
 *   lang, title, desc, path         필수. path는 `/en/learn/` 같은 사이트 안 경로
 *   alternates  { 언어: 경로 }       같은 내용의 다른 언어판(있는 것만). hreflang과 언어 전환
 *   xDefault    경로                 없으면 영어판, 영어판이 없으면 생략
 *   section     'learn'|'worksheets'|'play'|'app'   주 메뉴의 현재 섹션
 *   crumbs      [[이름, 경로]…]      브레드크럼(현재 페이지는 넣지 않는다. 바로 아래 H1이다)
 *   ld          JSON-LD 객체 배열    BreadcrumbList는 crumbs에서 여기서 만든다
 *   h1          BreadcrumbList 마지막 항목 이름(없으면 title)
 *   ogType, image, noindex, extraCss (['sheet']), headExtra, main(HTML), mainClass, chrome(false면 머리말·바닥글 생략)
 */
export function page(o) {
  const { lang, title, desc, path, section, crumbs = [], main } = o;
  const alternates = o.alternates ?? { [lang]: path };
  const xDefault = o.xDefault ?? alternates.en;
  const ld = [...(o.ld ?? [])];
  if (crumbs.length) ld.push(breadcrumbLd(crumbs, o.h1 ?? title));
  const chrome = o.chrome !== false;

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="theme-color" content="#F3EFE6" />${o.noindex ? '\n    <meta name="robots" content="noindex, follow" />' : ''}
    <link rel="canonical" href="${ORIGIN}${path}" />
${o.noindex ? '' : Object.entries(alternates)
  .map(([l, p]) => `    <link rel="alternate" hreflang="${l}" href="${ORIGIN}${p}" />\n`)
  .join('')}${!o.noindex && xDefault && Object.keys(alternates).length > 1 ? `    <link rel="alternate" hreflang="x-default" href="${ORIGIN}${xDefault}" />\n` : ''}    <meta property="og:title" content="${esc(o.ogTitle ?? title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:type" content="${o.ogType ?? 'website'}" />
    <meta property="og:locale" content="${ogLocale(lang)}" />
    <meta property="og:url" content="${ORIGIN}${path}" />
    <meta property="og:image" content="${ORIGIN}${o.image ?? '/img/board-prism.png'}" />
    <meta name="twitter:card" content="summary" />
    <link rel="preload" href="${BODY_FONT[lang] ?? '/fonts/sans-400.woff2'}" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/fonts/fonts.css" />
    <link rel="stylesheet" href="/site.css" />
${(o.extraCss ?? []).map((c) => `    <link rel="stylesheet" href="/${c}.css" />\n`).join('')}    <link rel="icon" href="/icon.svg" type="image/svg+xml" />${o.headExtra ?? ''}
${ld.length ? `    <script type="application/ld+json">
${JSON.stringify(ld.length === 1 ? ld[0] : ld, null, 2)}
    </script>
` : ''}  </head>
  <body>
${chrome ? `    <a class="skip-link" href="#main">${esc(UI[lang].skip)}</a>
${siteHeader(lang, section, alternates, path)}
` : ''}${crumbs.length ? breadcrumbs(lang, crumbs) : ''}    <main id="main" class="${o.mainClass ?? 'page'}" tabindex="-1">
${main}
    </main>
${chrome ? siteFooter(lang) : ''}  </body>
</html>
`;
}

/**
 * 머리말. 로고, 주 메뉴, 언어 전환. 고정(sticky)하지 않는다: 크롬북 768px 높이에서 본문을
 * 가리고(WCAG 2.4.11), 메뉴가 다섯 개 이하라 다시 올라가는 비용이 작다.
 */
function siteHeader(lang, section, alternates, path) {
  const u = UI[lang];
  const items = navItems(lang)
    .map((n) => {
      const cur = n.href === path ? ' aria-current="page"' : n.key === section ? ' aria-current="true"' : '';
      return `          <li><a href="${n.href}"${cur}>${esc(n.name)}</a></li>`;
    })
    .join('\n');
  return `    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-logo" href="${homeOf(lang)}"${path === homeOf(lang) ? ' aria-current="page"' : ''}>PRISM</a>
        <nav class="site-nav" aria-label="${esc(u.mainNav)}">
          <ul>
${items}
          </ul>
        </nav>
${langSwitch(lang, alternates)}
      </div>
    </header>`;
}

/**
 * 언어 전환. 각 언어를 자기 글자로 적고 국기를 쓰지 않는다. 현재 언어도 목록에 남겨 굵게
 * 표시한다(빼 버리면 지금 무슨 언어인지가 화면에서 사라진다). 이 페이지의 그 언어판이 없으면
 * 그 언어의 첫 화면으로 보낸다.
 */
function langSwitch(lang, alternates) {
  const items = LANGS.map((l) => {
    const href = alternates[l] ?? homeOf(l);
    const cur = l === lang ? ' aria-current="true"' : '';
    return `<li><a href="${href}" hreflang="${l}" lang="${l}"${cur}>${LANG_NAME[l]}</a></li>`;
  }).join('');
  return `        <nav class="lang-switch" aria-label="${esc(UI[lang].langNav)}"><ul>${items}</ul></nav>`;
}

/**
 * 바닥글. 펼친 사이트맵(NN/g 「doormat」), 회사, 패밀리 사이트, 저작권. 접지 않는다.
 */
export function siteFooter(lang) {
  const u = UI[lang];
  const link = (href, name) => `<li><a href="${href}">${esc(name)}</a></li>`;
  const site = [
    ...navItems(lang).filter((n) => n.key !== 'app').map((n) => link(n.href, n.name)),
    `<li><a href="${APPSTORE}">${esc(u.appStore)}</a> · <a href="${PLAYSTORE}">${esc(u.googlePlay)}</a></li>`,
  ];
  const reading = articlesIn(lang).map((a) => link(articlePathOf(a, lang), a.text[lang].navTitle ?? a.text[lang].title));
  const company = [link(aboutPath(lang), u.about), link(docPath(lang, 'support'), u.support), link(docPath(lang, 'privacy'), u.privacy)];
  return `    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__map">
          <nav aria-label="${esc(u.footerSite)}">
            <h2>${esc(u.footerSite)}</h2>
            <ul>${site.join('')}</ul>
          </nav>
${reading.length ? `          <nav aria-label="${esc(u.footerRead)}">
            <h2>${esc(u.footerRead)}</h2>
            <ul>${reading.join('')}</ul>
          </nav>
` : ''}          <nav aria-label="${esc(u.footerCompany)}">
            <h2>${esc(u.footerCompany)}</h2>
            <ul>${company.join('')}</ul>
          </nav>
        </div>
${familySites(lang, 'footer')}
${companyInfo(lang)}
        <p class="site-footer__legal">© 2026 A Driven Inc. All rights reserved. · PRISM <a href="mailto:${EMAIL}">${EMAIL}</a></p>
      </div>
    </footer>
`;
}

/**
 * 회사 정보와 인증. 한국 웹사이트 바닥글의 사업자 표시 관례를 따른다(값은 site.mjs의 COMPANY).
 * 다른 언어에서도 법적 표시 값은 한국어 원문 그대로(lang="ko"), 항목 이름만 그 언어로 쓴다.
 * 인증은 로고 그림이 아니라 글자로 적는다: 종이와 잉크 디자인에 남의 색 로고를 섞지 않고,
 * 스크린 리더와 검색이 그대로 읽는다.
 */
function companyInfo(lang) {
  const c = COMPANY;
  const u = COMPANY_UI[lang];
  const ko = lang === 'ko';
  const v = (s) => (ko ? esc(s) : `<span lang="ko">${esc(s)}</span>`);
  const row = (k, val) => `<div><dt>${esc(k)}</dt><dd>${val}</dd></div>`;
  return `        <section class="company" aria-label="${esc(u.info)}">
          <h2>${esc(c.name[lang])}</h2>
          <dl class="company__info">${[
            row(u.ceo, v(c.ceo)),
            row(u.bizNo, `${c.bizNo}${ko ? ` <a href="${c.ftc}">${esc(u.ftc)}</a>` : ''}`),
            row(u.mailOrderNo, v(c.mailOrderNo)),
            row(u.address, ko ? esc(c.address) : esc(c.addressEn)),
            row(u.phone, `<a href="tel:${c.phoneIntl}">${ko ? c.phone : c.phoneIntl}</a>`),
            row(u.email, `<a href="mailto:${c.email}">${c.email}</a>`),
          ].join('')}</dl>
          <ul class="company__certs" aria-label="${esc(u.certs)}">${c.certs.map((x) => `<li>${esc(x[lang])}</li>`).join('')}</ul>
${c.certs.filter((x) => x.detail).map((x) => `          <p class="company__cert-detail">${esc(x.detail[lang])}</p>`).join('\n')}
        </section>`;
}

/** 패밀리 사이트 목록. 바닥글과 `/about/`이 같이 쓴다(content는 UTM의 자리 이름). */
export function familySites(lang, content) {
  const u = UI[lang];
  const items = FAMILY.map((f) => {
    const nl = familyNameLang(f, lang);
    const name = `<a href="${familyHref(f, lang, content)}"${nl !== lang ? ` lang="${nl}" hreflang="ko"` : ''}>${esc(familyName(f, lang))}</a>`;
    const ko = f.koOnly && lang !== 'ko' ? ` <span class="family__lang">(${esc(u.koOnly)})</span>` : '';
    return `<li>${name}${ko}<span class="family__desc">${esc(f.desc[lang])}</span><span class="family__host">${f.host}</span></li>`;
  }).join('');
  return `        <nav class="family" aria-label="${esc(u.family)}">
          <h2>${esc(u.family)}</h2>
          <ul>${items}</ul>
        </nav>`;
}

/** BreadcrumbList. 화면 브레드크럼과 같은 목록에 현재 페이지(item 없음)를 덧붙인다. */
function breadcrumbLd(crumbs, name) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      ...crumbs.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: ORIGIN + p })),
      { '@type': 'ListItem', position: crumbs.length + 1, name },
    ],
  };
}

