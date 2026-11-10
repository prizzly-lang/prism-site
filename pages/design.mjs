/**
 * `/design/`: 디자인 시스템 견본. 실제 컴포넌트 함수(ui/*.mjs)와 CSS로 만든다. 그래서 여기서
 * 보이는 모양이 곧 사이트의 모양이다. 손으로 따로 그린 견본은 어긋나기 시작하면 아무도 모른다.
 * 색인하지 않고 sitemap에 넣지 않는다. 규칙은 css/tokens.css 첫 주석과 SITE-UX-PLAN.md 4절.
 */

import { page } from '../ui/page.mjs';
import { breadcrumbs, sideNav, pager } from '../ui/nav.mjs';
import { blocks, storeLinks, disclosure } from '../ui/content.mjs';

const SWATCH = [
  ['--paper', '바탕'],
  ['--paper-raised', '올린 면(카드·바닥글)'],
  ['--ink', '글자·버튼·포커스 15.2:1'],
  ['--ink-dim', '본문 7.6:1'],
  ['--ink-faint', '보조 글 4.9:1'],
  ['--line', '링크 밑줄·의미 있는 선 3.2:1'],
  ['--hair', '장식 구분선 (글자 금지)'],
  ['--lit-r', '빛: 빨강 △'],
  ['--lit-g', '빛: 초록 □'],
  ['--lit-b', '빛: 파랑 ○'],
  ['--lit-y', '빛: 노랑'],
  ['--lit-c', '빛: 시안'],
  ['--lit-m', '빛: 마젠타'],
];

const section = (h, body) => `      <section class="section">
        <h2>${h}</h2>
${body}
      </section>`;

export function designPage() {
  const swatches = SWATCH.map(
    ([v, d]) => `<li class="cluster"><span style="display:inline-block;width:3rem;height:2rem;border:1px solid var(--hair);border-radius:var(--r-sm);background:var(${v})"></span><code>${v}</code> ${d}</li>`,
  ).join('');
  return page({
    lang: 'ko',
    title: '디자인 시스템 | PRISM',
    desc: 'PRISM 사이트의 토큰과 컴포넌트 견본.',
    path: '/design/',
    noindex: true,
    main: `      <header class="page-head">
        <p class="page-head__kicker">PRISM 사이트</p>
        <h1>디자인 시스템</h1>
        <p class="page-head__sub">종이와 잉크. 색은 빛에만.</p>
        <p class="lead">토큰은 css/tokens.css, 컴포넌트는 css/components.css와 ui/*.mjs가 한 쌍입니다. 색 코드는 tokens.css에만 둡니다(다른 CSS에 나오면 빌드가 멈춥니다).</p>
      </header>
${section('색', `        <ul class="facts">${swatches}</ul>`)}
${section('글자', `        <p style="font-family:var(--serif);font-size:var(--t-hero);line-height:1">PRISM</p>
        <h1>H1 세리프 400</h1>
        <h2>H2 세리프 400</h2>
        <h3>H3 산세리프 600</h3>
        <p class="lead">리드 문단. 페이지가 무엇인지 한 번에 말합니다.</p>
        <p>본문. 빛은 곧게 나아가다 거울을 만나면 방향을 바꿉니다. <a href="#">본문 링크</a>는 밑줄로 알립니다.</p>
        <p class="page-head__date">보조 글(날짜·설명)</p>`)}
${section('버튼', `        <p class="actions"><a class="button" href="#">주 버튼</a><a class="button button--secondary" href="#">보조 버튼</a><button class="button button--secondary" type="button">버튼 요소</button></p>
        ${storeLinks('ko')}`)}
${section('정의 · 메타 · 알림', `        <p class="definition">빛의 반사는 빛이 물체의 표면에 부딪혀 방향을 바꿔 되돌아 나오는 현상입니다.</p>
        <dl class="meta"><dt>대상</dt><dd>초등 5~6학년</dd><dt>시간</dt><dd>10분</dd></dl>
        <div class="callout"><p>알림 상자(기본).</p></div>
        <div class="callout callout--note"><p>알림 상자(참고).</p></div>`)}
${section('본문 블록', `        <div class="prose">
${blocks([
  ['p', '문단과 <strong>강조</strong>.'],
  ['ul', ['목록 하나', '목록 둘']],
  ['ol', ['순서 하나', '순서 둘']],
  ['table', [['챕터', '판 수'], ['반사', '14'], ['분열', '32']]],
  ['pre', 'solve(board) // 코드'],
])}
        </div>`)}
${section('접기', `        <div>${disclosure('질문은 이렇게 접힙니다', '답은 접혀 있어도 문서 안에 있습니다.', true)}${disclosure('두 번째 질문', '답.')}</div>`)}
${section('사실 · 숫자', `        <ul class="facts"><li><strong>300개</strong> 퍼즐</li><li>모든 퍼즐의 정답은 하나</li></ul>
        <ul class="stats"><li><b>300</b><span>퍼즐</span></li><li><b>7</b><span>챕터</span></li><li><b>1</b><span>판마다 정답</span></li><li><b>0</b><span>광고</span></li></ul>`)}
${section('도형 범례 · 챕터 띠', `        <ul class="shape-legend">
          <li><svg class="glyph glyph--r" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,3 18,17 2,17" /></svg>빨강 = 삼각형</li>
          <li><svg class="glyph glyph--g" viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="2" /></svg>초록 = 사각형</li>
          <li><svg class="glyph glyph--b" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" /></svg>파랑 = 원</li>
        </ul>
        <ol class="chapters">${[1, 2, 3, 4, 5, 6, 7].map((n) => `<li class="chapter chapter--${n}"><span class="chapter__num">${n}</span><strong class="chapter__name">챕터 ${n}</strong><span class="chapter__desc">띠가 그 챕터의 빛을 그립니다</span></li>`).join('')}</ol>`)}
${section('길찾기', `        ${breadcrumbs('ko', [['PRISM', '/'], ['배우기', '/learn/']])}
        <div style="max-width:var(--sidebar)">${sideNav('ko', 'reflection', ['reflection'])}</div>
        ${pager('ko', 'reflection', ['reflection'])}
        <p>머리말의 현재 섹션과 사이드바의 현재 항목은 <code>aria-current</code>로 표시하고, 색이 아니라 밑 막대·왼쪽 막대·굵기로 보입니다.</p>`)}
${section('카드', `        <ul class="card-list grid"><li class="card"><h3><a href="#">카드 제목</a></h3><p>목록의 한 항목. 링크는 제목 하나만.</p><p class="card__meta">메타</p></li><li class="card card--muted"><h3>준비 중</h3><p class="card__meta">아직 없는 항목</p></li></ul>`)}`,
  });
}
