/**
 * 「오늘의 빛 퍼즐」: `/daily/`(오늘 세 판, 어제 정답, 연속 기록)와 `/daily/<날짜>/`(지난 날의 판과 정답).
 * 계획: prism 저장소 docs/OPTICS-SITE.md 8절. 하루연산(harumath.kr)처럼 매일 새로 만들고, 화면에서도
 * 종이로도 푼다. 회원가입·맞춤 난이도·보상은 가져오지 않는다.
 *
 * 재료는 prism 저장소가 만든다(엔진이 있어야 만들 수 있는 것만):
 *   tools/make-daily.ts      날짜 시드로 세 판을 생성하고 정답이 하나뿐인지 증명
 *   tools/daily-site.ts      daily/<날짜>/assets/(판 그림, boards.json, 지난 날짜만 정답)와 daily/player.js
 * 여기서는 그것을 읽어 페이지만 그린다. 가장 늦은 날짜가 「오늘」이다.
 *
 * 검색: `/daily/`는 색인하고, 날짜별 보관 페이지는 얕은 페이지로 보이지 않게 noindex로 두고
 * sitemap에서 뺀다(SITE-UX-PLAN 6절). 연속 기록과 푼 판은 그 기기의 브라우저에만 저장한다.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { ORIGIN, ORG, UI, LEARN_LANGS, esc, homeOf, learnPath, dailyPath } from './site.mjs';
import { page } from './ui/page.mjs';
import { harumathHref } from './crosslinks.mjs';

const DIFFS = ['easy', 'normal', 'hard'];

const T = {
  ko: {
    title: '오늘의 빛 퍼즐',
    desc: '매일 새로 나오는 빛 퍼즐 세 판(쉬움·보통·어려움). 거울과 프리즘을 돌려 빛을 결정에 보내세요. 브라우저에서 바로 풀거나 A4로 인쇄하고, 다음 날 정답을 확인합니다. 회원가입이 없습니다.',
    lead: '매일 새 판 세 개가 나옵니다. 거울·프리즘 같은 조각을 누르면 90°씩 돌아갑니다. 모든 결정이 켜지면 풀립니다. 판마다 정답은 하나뿐이고, 정답은 다음 날 이 페이지에 나옵니다.',
    legend: [
      '작은 도형이 빛의 색을 나타냅니다. 삼각형(▲)은 빨강, 사각형(■)은 초록, 원(●)은 파랑이고, 도형이 둘이면 두 빛이 섞인 색입니다.',
      '상자는 광원입니다. 흰 상자는 안의 도형 색의 빛을, 검게 꽉 찬 상자는 흰빛을 냅니다. 상자에 붙은 뾰족한 쪽으로 빛이 나갑니다.',
      '결정(육각형)에 닿는 빛을 모두 합한 색이 결정 속 도형과 정확히 같아야 결정이 켜집니다. 다른 색이 하나라도 더 닿으면 켜지지 않습니다.',
    ],
    legendBeams: '선은 빛이 지나가는 길입니다. 흰빛은 실선, 빨강은 긴 파선, 초록은 점과 선이 번갈아 나오는 선, 파랑은 점선입니다.',
    legendSplitter: '두 줄 사이가 회색인 판은 반투명 거울입니다. 빛이 그대로 지나가는 동시에 거울처럼 꺾여서 두 갈래로 나뉩니다.',
    legendPrism: '회색 삼각형은 프리즘입니다. 굵은 밑면으로 흰빛이 들어오면 빨강은 곧게 나가고 초록과 파랑은 양옆으로 갈라집니다. 그 밖의 빛은 그대로 지나갑니다.',
    legendFilter: '회색 원은 색 필터입니다. 안의 도형이 가리키는 색만 지나가고 나머지 색은 걸러집니다.',
    legendPolarizer: '줄무늬 원은 편광판입니다. 편광되지 않은 빛은 지나가면서 줄과 같은 방향으로 편광되고, 이미 편광된 빛은 줄 방향이 같을 때만 지나갑니다. 상자에 회색 줄이 있는 광원은 이미 편광된 빛을 냅니다.',
    diff: { easy: '쉬움', normal: '보통', hard: '어려움' },
    chapter: (n, name) => `게임 ${n}챕터 「${name}」의 조각`,
    par: (n) => `최소 ${n}탭`,
    taps: '탭',
    lit: '결정 {n}/{total}',
    reset: '처음부터',
    solved: '풀었습니다! {n}탭 (최소 {par}탭)',
    writeTaps: '몇 번 눌렀나요? ______ 탭',
    streak: '연속 {n}일',
    streakNote: '세 판을 모두 푼 날이 며칠째 이어지는지 보여 줍니다. 기록은 이 기기의 브라우저에만 저장되고 어디로도 보내지 않습니다.',
    share: '결과 공유',
    print: 'A4로 인쇄',
    shareTitle: 'PRISM 오늘의 빛 퍼즐 {date}',
    shareLine: '{name} {n}탭 (최소 {par})',
    shareUnsolved: '{name} 아직 못 풂',
    copied: '결과를 복사했습니다. 붙여 넣어 보내세요.',
    copyFailed: '이 브라우저에서는 결과를 공유하거나 복사하지 못했습니다.',
    noscript: '자바스크립트가 꺼져 있어 화면에서 풀 수 없습니다. 인쇄해서 종이로 풀어 보세요.',
    pieces: { mirror: '거울', splitter: '반투명 거울', prism: '프리즘', polarizer: '편광판' },
    yesterday: (d) => `어제(${d}) 정답`,
    answersFor: (d) => `${d} 정답`,
    answerNote: '숫자가 적힌 검은 원은 그 조각을 누르는 횟수입니다. 선은 정답일 때 빛이 지나가는 길입니다. 판이 커서 숫자가 붙어 보이면 그림 아래 글자 목록을 보세요.',
    tapList: '누를 조각',
    times: (n) => `${n}번`,
    archive: '지난 퍼즐',
    archiveTitle: (d) => `${d}의 빛 퍼즐`,
    archiveDesc: (d) => `${d}에 나온 빛 퍼즐 세 판과 정답입니다.`,
    toToday: '오늘의 퍼즐로',
    more: '더 해 보기',
    learn: '빛의 성질 배우기',
    play: '앱의 1챕터를 브라우저에서 해 보기',
    harumath: (href) => `매일 하는 연산 연습은 같은 회사(에이드리븐)의 <a href="${href}">하루연산</a>에서 할 수 있습니다.`,
    printFoot: '정답은 다음 날 prism.adriven.co/daily/ 에 나옵니다.',
  },
  en: {
    title: 'Daily light puzzle',
    desc: 'Three new light puzzles every day: easy, medium and hard. Turn mirrors and prisms to send light to the crystals. Solve in the browser or print on A4, and check the answers the next day. No sign-up.',
    lead: 'Three new boards every day. Tap a mirror, prism or other turning piece to turn it 90°. A board is solved when every crystal lights up. Each board has exactly one solution, and the answers appear on this page the next day.',
    legend: [
      'Small shapes stand for colors of light: ▲ is red, ■ is green, ● is blue. Two shapes together mean the two colors mixed.',
      'Boxes are light sources. A white box sends light of the color shown inside it; the solid black box sends white light. Light leaves through the pointed side of the box.',
      'A crystal (hexagon) lights up only when all the light reaching it adds up to exactly the color shown inside it. Any extra color keeps it dark.',
    ],
    legendBeams: 'Lines show where light travels: white is a solid line, red long dashes, green dash-dot, blue dots.',
    legendSplitter: 'A plate with gray between two lines is a beam splitter. Light goes straight through and is reflected like a mirror at the same time, so it splits in two.',
    legendPrism: 'A gray triangle is a prism. White light entering through its thick base splits: red goes straight on, green and blue turn to either side. Any other light passes straight through.',
    legendFilter: 'A gray circle is a color filter. Only the color of the shape inside it gets through; other colors are removed.',
    legendPolarizer: 'A striped circle is a polarizer. Unpolarized light passes and comes out polarized along the stripes; light that is already polarized passes only if it matches the stripes. A source with gray stripes on its box sends light that is already polarized.',
    diff: { easy: 'Easy', normal: 'Medium', hard: 'Hard' },
    chapter: (n, name) => `Pieces from chapter ${n}, “${name}”`,
    par: (n) => `Fewest possible: ${n} taps`,
    taps: 'Taps',
    lit: 'Crystals {n}/{total}',
    reset: 'Start over',
    solved: 'Solved in {n} taps (fewest possible {par})',
    writeTaps: 'How many taps? ______',
    streak: '{n}-day streak',
    streakNote: 'How many days in a row you have solved all three boards. Your record stays in this browser on this device and is never sent anywhere.',
    share: 'Share result',
    print: 'Print on A4',
    shareTitle: 'PRISM daily light puzzle {date}',
    shareLine: '{name} {n} taps (fewest {par})',
    shareUnsolved: '{name} not yet',
    copied: 'Result copied. Paste it wherever you like.',
    copyFailed: 'This browser could not share or copy the result.',
    noscript: 'JavaScript is off, so the boards cannot be played on screen. Print the page and solve them on paper.',
    pieces: { mirror: 'mirror', splitter: 'beam splitter', prism: 'prism', polarizer: 'polarizer' },
    yesterday: (d) => `Yesterday’s answers (${d})`,
    answersFor: (d) => `Answers for ${d}`,
    answerNote: 'A black circle with a number shows how many times to tap that piece. The lines show where the light goes once the board is solved. On large boards where numbers crowd together, use the list under each picture.',
    tapList: 'Pieces to tap',
    times: (n) => `${n}×`,
    archive: 'Past puzzles',
    archiveTitle: (d) => `Light puzzles for ${d}`,
    archiveDesc: (d) => `The three light puzzles from ${d}, with answers.`,
    toToday: 'Today’s puzzles',
    more: 'Keep going',
    learn: 'Learn how light behaves',
    play: 'Play chapter 1 of the app in your browser',
    harumath: () => '',
    printFoot: 'Answers appear the next day at prism.adriven.co/en/daily/',
  },
};

const LOCALE = { ko: 'ko-KR', en: 'en-US' };
const longDate = (lang, d) =>
  new Intl.DateTimeFormat(LOCALE[lang], { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(new Date(`${d}T00:00:00Z`));
const shortDate = (lang, d) =>
  new Intl.DateTimeFormat(LOCALE[lang], { timeZone: 'UTC', month: 'long', day: 'numeric' }).format(new Date(`${d}T00:00:00Z`));

/** 사이트에 넘어와 있는 날짜들(오래된 것부터). */
function loadDays(root) {
  const dir = resolve(root, 'daily');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .map((d) => JSON.parse(readFileSync(resolve(dir, d, 'assets', 'boards.json'), 'utf8')));
}

const isDayBefore = (a, b) => Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`) === 86_400_000;

const asset = (date, name) => `/daily/${date}/assets/${name}`;

/** 늘 쓰는 설명 + 그날 판에 실제로 나오는 조각의 설명만. 규칙은 엔진(prism src/engine/beam.ts)과 같아야 한다. */
function legendHtml(t, boards) {
  const has = (type) => boards.some((b) => b.level.pieces.some((p) => p.type === type || (type === 'polarizer' && p.pol)));
  return [...t.legend, has('splitter') && t.legendSplitter, has('prism') && t.legendPrism, has('filter') && t.legendFilter, has('polarizer') && t.legendPolarizer]
    .filter(Boolean)
    .map((s) => `        <p>${esc(s)}</p>`)
    // 빛줄기 설명은 화면용이다. 인쇄한 문제 판에는 빛줄기가 없다.
    .concat(`        <p class="screen-only">${esc(t.legendBeams)}</p>`)
    .join('\n');
}

function boardCard(lang, day, b, i) {
  const t = T[lang];
  const alt = `${t.diff[b.difficulty]} ${b.grid.cols}×${b.grid.rows}`;
  return `        <section class="daily-board" data-board="${i}" aria-labelledby="daily-${b.difficulty}">
          <h2 id="daily-${b.difficulty}">${esc(t.diff[b.difficulty])}</h2>
          <p class="daily-board__meta">${esc(t.chapter(b.chapter, b.chapterName[lang]))} · ${esc(t.par(b.par))}</p>
          <div class="daily-board__stage screen-only" data-stage><img src="${asset(day.date, `${b.difficulty}-puzzle.svg`)}" alt="${esc(alt)}" width="300" height="300" /></div>
          <img class="daily-board__paper print-only" src="${asset(day.date, `${b.difficulty}-puzzle.svg`)}" alt="${esc(alt)}" />
          <p class="daily-board__stats screen-only">${esc(t.taps)} <strong data-taps>0</strong> · <span data-lit></span></p>
          <p class="daily-board__status screen-only" data-status role="status"></p>
          <p class="actions"><button class="button button--secondary" type="button" data-reset>${esc(t.reset)}</button></p>
          <p class="print-only">${esc(t.writeTaps)}</p>
        </section>`;
}

/** 정답(지난 날짜): 그림과 글자 목록 둘 다. 탭 표지가 붙어 보이는 큰 판에서도 글자로 읽을 수 있게. */
function answersHtml(lang, day, heading) {
  const t = T[lang];
  const items = day.boards.map((b) => `          <figure class="daily-answer">
            <img src="${asset(day.date, `${b.difficulty}-answer.svg`)}" alt="${esc(`${t.diff[b.difficulty]} ${t.answersFor(day.date)}`)}" loading="lazy" />
            <figcaption><strong>${esc(t.diff[b.difficulty])}</strong> · ${esc(t.tapList)}: ${b.solution.map((s) => `${s.cell} ${esc(t.times(s.taps))}`).join(', ')}</figcaption>
          </figure>`);
  return `      <section class="section" aria-labelledby="daily-answers">
        <h2 id="daily-answers">${esc(heading)}</h2>
        <p>${esc(t.answerNote)}</p>
        <div class="daily-answers">
${items.join('\n')}
        </div>
      </section>`;
}

function playerData(lang, day) {
  const t = T[lang];
  const data = {
    date: day.date,
    boards: day.boards.map((b) => ({ difficulty: b.difficulty, level: b.level })),
    text: {
      pieces: t.pieces,
      difficulty: t.diff,
      solved: t.solved,
      lit: t.lit,
      streak: t.streak,
      shareTitle: t.shareTitle,
      shareLine: t.shareLine,
      shareUnsolved: t.shareUnsolved,
      copied: t.copied,
      copyFailed: t.copyFailed,
      url: ORIGIN + dailyPath(lang),
    },
  };
  // </script>가 끼어들 수 없게 < 를 이스케이프한다.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function todayPage(lang, days) {
  const t = T[lang];
  const day = days.at(-1);
  const yesterday = days.at(-2);
  const path = dailyPath(lang);
  const past = days.slice(0, -1).reverse();
  const harumath = lang === 'ko' ? `\n        <p>${t.harumath(harumathHref('daily'))}</p>` : '';

  return page({
    lang,
    title: `${t.title} | PRISM`,
    h1: t.title,
    desc: t.desc,
    path,
    alternates: Object.fromEntries(LEARN_LANGS.map((l) => [l, dailyPath(l)])),
    section: 'daily',
    crumbs: [[UI[lang].home, homeOf(lang)]],
    ld: [{
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: t.title,
      description: t.desc,
      inLanguage: lang,
      url: ORIGIN + path,
      learningResourceType: 'Puzzle',
      educationalLevel: lang === 'ko' ? '초등 5학년 이상' : 'Ages 10 and up',
      isAccessibleForFree: true,
      dateModified: day.date,
      publisher: ORG,
      teaches: lang === 'ko' ? ['빛의 반사', '빛의 분산', '빛의 합성'] : ['Reflection of light', 'Dispersion of light', 'Mixing colored light'],
      about: { '@type': 'Thing', name: lang === 'ko' ? '광학' : 'Optics' },
    }],
    main: `      <header class="page-head">
        <h1>${esc(t.title)}</h1>
        <p class="page-head__date"><time datetime="${day.date}">${esc(longDate(lang, day.date))}</time></p>
        <p class="lead screen-only">${esc(t.lead)}</p>
        <p class="print-only">${esc(t.printFoot)}</p>
      </header>
      <noscript><p class="callout callout--note">${esc(t.noscript)}</p></noscript>
      <div class="daily-legend">
${legendHtml(t, day.boards)}
      </div>
      <div class="daily-boards">
${day.boards.map((b, i) => boardCard(lang, day, b, i)).join('\n')}
      </div>
      <section class="section screen-only daily-record" aria-label="${esc(t.share)}">
        <p class="daily-record__streak" data-streak></p>
        <p class="daily-record__note">${esc(t.streakNote)}</p>
        <p class="actions">
          <button class="button" type="button" data-share>${esc(t.share)}</button>
          <button class="button button--secondary" type="button" data-print>${esc(t.print)}</button>
        </p>
        <p data-share-status role="status"></p>
      </section>
${yesterday ? `<div class="screen-only">\n${answersHtml(lang, yesterday, (isDayBefore(yesterday.date, day.date) ? t.yesterday : t.answersFor)(shortDate(lang, yesterday.date)))}\n</div>` : ''}
      <section class="section screen-only" aria-labelledby="daily-more">
        <h2 id="daily-more">${esc(t.more)}</h2>
        <ul>
          <li><a href="${learnPath(lang)}">${esc(t.learn)}</a></li>
          <li><a href="/play/">${esc(t.play)}</a></li>
        </ul>${harumath}
      </section>${past.length ? `
      <section class="section screen-only" aria-labelledby="daily-archive">
        <h2 id="daily-archive">${esc(t.archive)}</h2>
        <ul>
${past.map((d) => `          <li><a href="${dailyPath(lang, d.date)}">${esc(longDate(lang, d.date))}</a></li>`).join('\n')}
        </ul>
      </section>` : ''}
      <script type="application/json" id="daily-data">${playerData(lang, day)}</script>
      <script src="/daily/player.js" defer></script>`,
  });
}

function archivePage(lang, day) {
  const t = T[lang];
  const d = longDate(lang, day.date);
  return page({
    lang,
    title: `${t.archiveTitle(d)} | PRISM`,
    h1: t.archiveTitle(d),
    desc: t.archiveDesc(d),
    path: dailyPath(lang, day.date),
    alternates: Object.fromEntries(LEARN_LANGS.map((l) => [l, dailyPath(l, day.date)])),
    section: 'daily',
    noindex: true,
    crumbs: [[UI[lang].home, homeOf(lang)], [t.title, dailyPath(lang)]],
    main: `      <header class="page-head">
        <h1>${esc(t.archiveTitle(d))}</h1>
      </header>
      <div class="daily-legend">
${legendHtml(t, day.boards)}
      </div>
      <div class="daily-boards">
${day.boards.map((b) => `        <figure class="daily-answer">
          <img src="${asset(day.date, `${b.difficulty}-puzzle.svg`)}" alt="${esc(`${t.diff[b.difficulty]} ${b.grid.cols}×${b.grid.rows}`)}" />
          <figcaption><strong>${esc(t.diff[b.difficulty])}</strong> · ${esc(t.chapter(b.chapter, b.chapterName[lang]))} · ${esc(t.par(b.par))}</figcaption>
        </figure>`).join('\n')}
      </div>
${answersHtml(lang, day, t.answersFor(d))}
      <p class="actions"><a class="button button--secondary" href="${dailyPath(lang)}">${esc(t.toToday)}</a></p>`,
  });
}

/** { path, html, updated, noindex } 목록. 판이 하나도 없으면 빈 목록(페이지를 만들지 않는다). */
export function dailyPages(root) {
  const days = loadDays(root);
  if (!days.length) return [];
  const out = [];
  for (const lang of LEARN_LANGS) {
    out.push({ path: dailyPath(lang), html: todayPage(lang, days), updated: days.at(-1).date });
    for (const day of days.slice(0, -1)) out.push({ path: dailyPath(lang, day.date), html: archivePage(lang, day), updated: day.date, noindex: true });
  }
  return out;
}
