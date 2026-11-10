/**
 * 본문 블록과 내용 컴포넌트. 글(articles/), 개념(learn/), 문서(pages/)가 같은 블록을 쓴다.
 * 블록: ['h2', 글] ['h3', 글] ['p', HTML] ['ul'|'ol', [HTML…]] ['note', HTML] ['pre', 글]
 *       ['table', [[머리…], [칸…]…]] ['img', { src, alt, w, h }]
 * HTML 값은 저장소 안의 내용 파일에서만 온다(사용자 입력이 섞일 자리가 없다). 그래서
 * 이스케이프하지 않는다. 글자 값(h2·h3·pre·table·alt)은 이스케이프한다.
 */

import { APPSTORE, PLAYSTORE, UI, esc } from '../site.mjs';

const I = '        ';

export const BLOCK = {
  h2: (v) => `${I}<h2>${esc(v)}</h2>`,
  h3: (v) => `${I}<h3>${esc(v)}</h3>`,
  p: (v) => `${I}<p>${v}</p>`,
  ul: (items) => `${I}<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`,
  ol: (items) => `${I}<ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>`,
  note: (v) => `${I}<div class="callout callout--note"><p>${v}</p></div>`,
  pre: (v) => `${I}<pre><code>${esc(v)}</code></pre>`,
  /* 사진. 폭·높이를 적어 두어 불러오는 동안 글이 밀리지 않게 한다. */
  img: (v) =>
    `${I}<figure class="figure"><img src="${v.src}" alt="${esc(v.alt)}" width="${v.w}" height="${v.h}" loading="lazy" decoding="async" /></figure>`,
  /* 좁은 화면에서 표만 가로로 스크롤한다(페이지 전체가 밀리지 않게). */
  table: (rows) => {
    const [head, ...body] = rows;
    return `${I}<div class="table-wrap" tabindex="0"><table>
${I}  <thead><tr>${head.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
${I}  <tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
${I}</table></div>`;
  },
};

export const blocks = (list) => list.map(([kind, value]) => BLOCK[kind](value)).join('\n');

/**
 * 스토어 버튼 둘. 칠한 버튼은 하나(App Store), 둘째는 테두리만. 앱 소개 페이지에서만 쓴다:
 * 학습 페이지에 스토어 버튼을 직접 두면 광고처럼 읽힌다(SITE-UX-PLAN 5절).
 */
export const storeLinks = (lang, cls = '') => `<p class="store-links${cls ? ` ${cls}` : ''}">
          <a class="button" href="${APPSTORE}">${esc(UI[lang].getIos)}</a>
          <a class="button button--secondary" href="${PLAYSTORE}">${esc(UI[lang].getAndroid)}</a>
        </p>`;

/** 문답 하나를 접기로. 답은 접혀 있어도 DOM에 있어 FAQPage·답변 엔진과 어긋나지 않는다. */
export const disclosure = (q, a, open = false) =>
  `<details class="disclosure"${open ? ' open' : ''}><summary>${esc(q)}</summary><div class="disclosure__body"><p>${a}</p></div></details>`;
