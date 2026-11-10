/**
 * 페이지 안 길찾기: 브레드크럼, 개념 사이드바, 이전·다음. 규격은 SITE-UX-PLAN.md 3절.
 */

import { UI, CONCEPTS, esc, learnPath } from '../site.mjs';

/**
 * 브레드크럼. 상위 단계까지만 보인다(GOV.UK). 현재 페이지 이름은 바로 아래 H1이 말한다.
 * 휴대폰에서 길면 CSS가 바로 위 단계 하나만 남긴다.
 */
export function breadcrumbs(lang, crumbs) {
  const items = crumbs.map(([name, href]) => `<li><a href="${href}">${esc(name)}</a></li>`).join('');
  return `    <nav class="crumbs" aria-label="${esc(UI[lang].crumbs)}"><ol>${items}</ol></nav>\n`;
}

/**
 * 개념 사이드바(`/learn/<개념>/`에만). 학습 순서대로 번호를 매기고 머리에 「3 / 7」을 적는다.
 * 아직 페이지가 없는 개념은 링크 없이 흐리게 둔다: 순서 전체가 보여야 지금 어디쯤인지 안다.
 * 50rem 미만에서는 본문 위에 `<details>`로 접힌다(CSS). 서랍이나 팝오버는 쓰지 않는다.
 */
export function sideNav(lang, current, available) {
  const u = UI[lang];
  const idx = CONCEPTS.findIndex((c) => c.slug === current);
  const items = CONCEPTS.map((c, i) => {
    const name = esc(c[lang]);
    if (c.slug === current) return `<li><a href="${learnPath(lang, c.slug)}" aria-current="page">${name}</a></li>`;
    if (!available.includes(c.slug)) return `<li><span class="side-nav__soon">${name}</span></li>`;
    return `<li><a href="${learnPath(lang, c.slug)}">${name}</a></li>`;
  }).join('');
  return `<details class="side-nav" open>
          <summary>${esc(u.conceptList)} · ${idx + 1} / ${CONCEPTS.length} ${esc(CONCEPTS[idx][lang])}</summary>
          <nav aria-label="${esc(u.conceptList)}"><ol>${items}</ol></nav>
        </details>`;
}

/** 이전·다음 개념. 상대 페이지 제목을 함께 적는다(「다음」만으로는 어디로 가는지 모른다). */
export function pager(lang, current, available) {
  const u = UI[lang];
  const list = CONCEPTS.filter((c) => available.includes(c.slug));
  const i = list.findIndex((c) => c.slug === current);
  const prev = list[i - 1];
  const next = list[i + 1];
  if (!prev && !next) return '';
  const a = (c, cls, label) =>
    `<a class="pager__${cls}" href="${learnPath(lang, c.slug)}"><span>${esc(label)}</span>${esc(c[lang])}</a>`;
  return `<nav class="pager" aria-label="${esc(u.pager)}">${prev ? a(prev, 'prev', u.prev) : ''}${next ? a(next, 'next', u.next) : ''}</nav>`;
}
