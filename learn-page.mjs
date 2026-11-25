/**
 * 「배우기」: 개념 목록 `/learn/`과 개념 페이지 `/learn/<개념>/`. 내용은 `learn/<slug>.mjs`.
 * 틀(SITE-UX-PLAN 5절, OPTICS-SITE 3절): 브레드크럼 → 사이드바(순서와 현재 위치) → H1·부제 →
 * 한 줄 정의(답변 엔진 인용용) → 대상·시간·준비물·교육과정 → 본문(실험·설명·게임 속 장면) →
 * 확인 문제(정답은 접기) → 게임과 다른 점 → 관련 학습지·해 보기 → 이전·다음.
 * 학습 페이지에는 스토어 버튼을 직접 두지 않고 「해 보기」(체험판)로 보낸다.
 */

import { ORIGIN, ORG, updatedLine, APP_ID, UI, CONCEPTS, CONCEPT_LANGS, esc, homeOf, learnPath, prefix } from './site.mjs';
import { page } from './ui/page.mjs';
import { blocks, disclosure } from './ui/content.mjs';
import { sideNav, pager } from './ui/nav.mjs';
import { wsPathOf, worksheetOf, WS_LANGS } from './worksheet-page.mjs';
import reflection from './learn/reflection.mjs';
import beamSplitter from './learn/beam-splitter.mjs';
import dispersion from './learn/dispersion.mjs';
import lightMixing from './learn/light-mixing.mjs';

/** 개념 페이지. 하나 더할 때 여기에 import 한 줄과 항목 하나. 순서는 site.mjs의 CONCEPTS가 정한다. */
export const LEARN = [reflection, beamSplitter, dispersion, lightMixing];
/** 그 언어로 쓴 개념만. 일본어·중국어는 개념마다 따로 연다(site.mjs CONCEPT_LANGS). */
const learnIn = (lang) => LEARN.filter((c) => c.langs.includes(lang));
const availableIn = (lang) => learnIn(lang).map((c) => c.slug);
/** 개념 페이지가 하나라도 있는 언어. 목록 페이지도 이 언어들에만 만든다. */
export const LEARN_PAGE_LANGS = CONCEPT_LANGS.filter((l) => learnIn(l).length);

const T = {
  ko: {
    indexTitle: '빛을 배우는 곳',
    indexDesc: '빛의 반사부터 편광까지, 빛의 성질을 실험과 빛 퍼즐 게임 PRISM으로 배웁니다. 초등 5~6학년과 중학생, 교사를 위한 광학 개념 페이지입니다.',
    indexLead: '빛의 성질을 하나씩, 집이나 교실에서 해 볼 수 있는 작은 실험과 함께 설명합니다. 순서는 게임 PRISM의 일곱 챕터와 같습니다.',
    soon: '준비 중',
    guide: '일곱 개념을 한 번에 훑어보려면: 교사용 안내 글',
    level: '대상',
    minutes: '시간',
    materials: '준비물',
    curriculum: '교육과정',
    checkH: '확인 문제',
    differsH: '게임과 실제는 여기가 다릅니다',
    nextH: '이어서 해 보기',
    worksheet: '인쇄용 학습지',
    play: '브라우저에서 PRISM 1챕터 해 보기',
  },
  en: {
    indexTitle: 'Learn about light',
    indexDesc: 'Learn how light behaves, from reflection to polarization, with small experiments and the light puzzle game PRISM. For ages 10 to 14 and their teachers.',
    indexLead: 'One property of light at a time, each with a small experiment you can try at home or in class. The order follows the seven chapters of the game PRISM.',
    soon: 'Coming soon',
    guide: 'All seven concepts at a glance: the teacher\'s guide',
    level: 'For',
    minutes: 'Time',
    materials: 'You need',
    curriculum: 'Curriculum',
    checkH: 'Check your understanding',
    differsH: 'Where the game differs from real light',
    nextH: 'Keep going',
    worksheet: 'Printable worksheet',
    play: 'Play chapter 1 of PRISM in your browser',
  },
  ja: {
    indexTitle: '光を学ぶ',
    indexDesc: '光の反射から偏光まで、光の性質を小さな実験と光のパズルゲームPRISMで学びます。小学校高学年から中学生と先生のための光学のページです。',
    indexLead: '光の性質をひとつずつ、家や教室でできる小さな実験とあわせて説明します。順番はゲームPRISMの7つの章と同じです。日本語のページは順に増やしていきます。',
    soon: '準備中',
    guide: '7つの項目をまとめて見るなら：先生向けの案内',
    level: '対象',
    minutes: '時間',
    materials: '用意するもの',
    curriculum: '学習指導要領',
    checkH: '確認問題',
    differsH: 'ゲームと実際の光はここが違います',
    nextH: '続けてやってみる',
    worksheet: '印刷用ワークシート',
    play: 'ブラウザでPRISMの第1章を遊ぶ',
  },
  'zh-Hans': {
    indexTitle: '学习光',
    indexDesc: '从光的反射到偏振，用小实验和光线解谜游戏 PRISM 学习光的性质。面向小学高年级、初中生和教师的光学页面。',
    indexLead: '一次讲一种光的性质，每页配一个在家或教室就能做的小实验。顺序与游戏 PRISM 的七个章节相同。中文页面会陆续增加。',
    soon: '准备中',
    guide: '一次浏览全部七个概念：教师指南',
    level: '适合',
    minutes: '时间',
    materials: '准备',
    curriculum: '课程标准',
    checkH: '检查一下',
    differsH: '游戏和真实的光在这些地方不同',
    nextH: '接着试试',
    worksheet: '打印版学习单',
    play: '在浏览器里玩 PRISM 第 1 章',
  },
};

export function learnPages() {
  const out = [];
  for (const lang of LEARN_PAGE_LANGS) {
    out.push({ path: learnPath(lang), html: indexPage(lang), updated: latest(lang) });
    for (const c of learnIn(lang)) out.push({ path: learnPath(lang, c.slug), html: conceptPage(lang, c), updated: c.updated });
  }
  return out;
}

const latest = (lang) => learnIn(lang).map((c) => c.updated).sort().at(-1);
const alternatesOf = (slug) => Object.fromEntries(
  LEARN_PAGE_LANGS.filter((l) => !slug || availableIn(l).includes(slug)).map((l) => [l, learnPath(l, slug)]),
);

function indexPage(lang) {
  const t = T[lang];
  const items = CONCEPTS.map((c, i) => {
    const data = learnIn(lang).find((l) => l.slug === c.slug);
    if (!data) {
      return `        <li class="card card--muted"><h2>${i + 1}. ${esc(c[lang])}</h2><p class="card__meta">${esc(t.soon)}</p></li>`;
    }
    return `        <li class="card"><h2>${i + 1}. <a href="${learnPath(lang, c.slug)}">${esc(c[lang])}</a></h2><p>${esc(data.text[lang].definition)}</p><p class="card__meta">${esc(data.text[lang].level)}</p></li>`;
  });
  return page({
    lang,
    title: `${t.indexTitle} | PRISM`,
    h1: t.indexTitle,
    desc: t.indexDesc,
    path: learnPath(lang),
    alternates: alternatesOf(),
    section: 'learn',
    crumbs: [[UI[lang].home, homeOf(lang)]],
    ld: [{
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t.indexTitle,
      description: t.indexDesc,
      inLanguage: lang,
      url: ORIGIN + learnPath(lang),
      publisher: ORG,
      hasPart: learnIn(lang).map((c) => ({ '@type': 'Article', headline: c.text[lang].title, url: ORIGIN + learnPath(lang, c.slug) })),
    }],
    main: `      <header class="page-head">
        <h1>${esc(t.indexTitle)}</h1>
        <p class="lead">${esc(t.indexLead)}</p>
        <p><a href="${prefix(lang)}/optics/">${esc(t.guide)}</a></p>
      </header>
      <ol class="card-list stack">
${items.join('\n')}
      </ol>`,
  });
}

function conceptPage(lang, c) {
  const t = T[lang];
  const x = c.text[lang];
  const path = learnPath(lang, c.slug);
  const ws = c.worksheet && WS_LANGS.includes(lang) ? worksheetOf(c.worksheet).text[lang] : null;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: x.title,
    description: x.desc,
    inLanguage: lang,
    url: ORIGIN + path,
    datePublished: c.date,
    dateModified: c.updated,
    author: ORG,
    publisher: ORG,
    isAccessibleForFree: true,
    about: { '@type': 'DefinedTerm', name: x.title, description: x.definition },
    teaches: x.title,
    educationalLevel: x.level,
    mentions: { '@type': 'MobileApplication', '@id': APP_ID, name: 'PRISM' },
    ...(x.body.some(([k]) => k === 'img') ? { image: x.body.filter(([k]) => k === 'img').map(([, v]) => ORIGIN + v.src) } : {}),
  };

  const meta = [
    [t.level, x.level],
    [t.minutes, x.minutes],
    [t.materials, x.materials],
    [t.curriculum, x.curriculum],
  ].map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');

  return page({
    lang,
    title: `${x.title}: ${x.subtitle} | PRISM`,
    h1: x.title,
    desc: x.desc,
    path,
    alternates: alternatesOf(c.slug),
    section: 'learn',
    crumbs: [[UI[lang].home, homeOf(lang)], [UI[lang].learn, learnPath(lang)]],
    ld: [ld],
    mainClass: 'with-sidebar',
    main: `      <div>
        ${sideNav(lang, c.slug, availableIn(lang))}
        <script>
          /* 좁은 화면에서는 개념 목록을 접어 본문이 먼저 보이게 한다. 스크립트가 없으면 펼친 채다. */
          if (matchMedia('(max-width: 49.99rem)').matches) document.currentScript.previousElementSibling.open = false;
        </script>
      </div>
      <article>
        <header class="page-head">
          <p class="page-head__kicker">${CONCEPTS.findIndex((k) => k.slug === c.slug) + 1} / ${CONCEPTS.length}</p>
          <h1>${esc(x.title)}</h1>
          <p class="page-head__sub">${esc(x.subtitle)}</p>
          ${updatedLine(lang, c.updated)}
          <p class="definition">${esc(x.definition)}</p>
          <dl class="meta">${meta}</dl>
        </header>
        <div class="prose">
${blocks(x.body)}
          <h2>${esc(t.checkH)}</h2>
          <div>${x.check.map(({ q, a }) => disclosure(q, a)).join('')}</div>
          <h2>${esc(t.differsH)}</h2>
          <ul>${x.differs.map((d) => `<li>${d}</li>`).join('')}</ul>
          <h2>${esc(t.nextH)}</h2>
          <ul>
            ${ws ? `<li>${esc(t.worksheet)}: <a href="${wsPathOf(lang, c.worksheet)}">${esc(ws.title)}</a></li>` : ''}
            <li><a href="/play/">${esc(t.play)}</a></li>
          </ul>
        </div>
        ${pager(lang, c.slug, availableIn(lang))}
      </article>`,
  });
}
