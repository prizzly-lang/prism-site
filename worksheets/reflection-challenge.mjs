/**
 * 학습지 A3 「거울 판 도전하기」(`/worksheets/reflection-challenge/`)의 판과 한·영 문구.
 * 시리즈 A(챕터 연습)의 셋째 장: 1챕터 「반사」 도전. 그리는 쪽은 `worksheet-page.mjs`.
 *
 * ## 판
 * 앱 10, 12, 13, 14번 판(11번은 남겨 둔다). 1챕터에는 벽이 없다(벽은 25번 판, 2챕터부터).
 * 그래서 계획서의 「벽이 있는 판」 대신 돌릴 거울이 가장 많은(par 3~4) 1챕터 판을 쓴다. prism 저장소
 * `tools/make-worksheet-boards.ts --sheet reflection-challenge --site ../prism-site`가 엔진으로
 * 그리고 정답이 하나뿐인지, 탭 합이 par와 같은지 확인한다. 아래 길 설명은 정답 그림을 보고 적었다.
 *   10번: C1 광원(아래로) → C3 「\」에서 오른쪽으로 → D3 「\」에서 아래로 → D5 결정.
 *         B5 광원(위로) → B3 「\」에서 왼쪽으로 → A3 결정. 거울 셋 모두 처음에는 「/」(틀림).
 *   12번: A2 광원(오른쪽으로) → C2를 지나 D2 「\」에서 아래로 → D4 「\」에서 오른쪽으로 → E4 결정.
 *         C1 광원(아래로) → C2에서 앞의 빛과 가로지름 → C3 「/」에서 왼쪽으로 → B3 결정.
 *   13번: D5 광원(위로) → D3 「\」에서 왼쪽으로 → B3 「\」에서 위로 → B2 「/」에서 오른쪽으로 →
 *         D2 「/」에서 위로 → D1 결정. 네 번 꺾임, 거울 넷 모두 돌림.
 *   14번: C1 광원(아래로) → C3 「/」에서 왼쪽으로 → B3 「/」에서 아래로 → B4 「/」에서 왼쪽으로 →
 *         A4 「\」에서 위로 → A1 결정. E1 광원(왼쪽으로)의 빛은 D1을 지나 C1 광원에서 끝난다
 *         (엔진 beam.ts: 광원은 빛을 흡수한다).
 *
 * ## 교육과정 (prism 저장소 docs/WORKSHEETS.md 4절)
 * - 초5~6 [6과02-02]: 빛의 직진·반사 현상. 각도 규칙은 묻지 않는다.
 * - 영어판: NGSS 4-PS4-2, 영국 KS2 Light(Year 6)에 「connects to」로만 잇는다.
 * - 성취기준 원문 문장은 옮기지 않았다.
 *
 * ## 삽화
 * 없음(새 생성 0회). 판 그림과 기호만 쓴다.
 *
 * ## 쓰지 않은 것
 * 가격. 입사각·반사각. 뒷면 문항은 A1, A2, 「빛의 길 찾기」, 개념 페이지의 문장을 되풀이하지 않고
 * 새로 썼다. 「푸는 방법」과 화면 머리말은 학습지 공통 틀이다.
 */

const BOARDS = [
  { id: 10, chapter: 1, taps: { B3: 1, C3: 1, D3: 1 } },
  { id: 12, chapter: 1, taps: { C3: 1, D2: 1, D4: 1 } },
  { id: 13, chapter: 1, taps: { B2: 1, B3: 1, D2: 1, D3: 1 } },
  { id: 14, chapter: 1, taps: { A4: 1, B3: 1, B4: 1, C3: 1 } },
];

const TEXT = {
  ko: {
    pageTitle: '거울 판 도전하기: 빛의 반사 학습지 (인쇄용)',
    navLabel: '인쇄용 학습지: 거울 판 도전하기',
    desc: '돌려야 할 거울이 셋에서 넷인 판 네 개에서 빛의 길을 연필로 그려 보는 무료 인쇄용 학습지입니다. 에이드리븐의 광학 퍼즐 게임 PRISM 1챕터 후반의 판들로, 최소 몇 번 돌리면 되는지 생각하고 결정에서 광원으로 길을 거꾸로 짚어 봅니다. 흑백 인쇄용, 정답지 포함.',
    level: '초등 5~6학년',
    meta: '초등 5~6학년 · A4 2쪽 + 정답지 1쪽 · 준비물: 연필',
    intro: [
      '돌려야 할 거울이 셋에서 넷인 1챕터 후반 판 네 개로 만든 학습지입니다. A4 한 장(앞뒤 2쪽)과 교사용 정답지 한 장입니다. 앞면에서는 어느 거울을 돌려야 하는지 찾아 빛을 결정까지 보내고, 뒷면에서는 돌리는 횟수, 거꾸로 따라가기, 빛이 서로 가로지르는 것, 다른 광원에 막히는 빛을 생각해 봅니다.',
      '흑백으로 인쇄해도 풀 수 있습니다. 빛의 색은 도형으로도 표시되어 있습니다(빨강 △, 초록 □).',
      '초등 5~6학년 「빛의 성질」 단원에서 빛의 반사를 배울 때 쓰기 좋습니다(2022 개정 [6과02-02] 관련). 「거울로 빛 보내기」와 「거울 두 장으로 빛 돌리기」를 먼저 풀었다면 더 쉽습니다.',
      'CC BY-NC 4.0으로 공개합니다. 출처(PRISM, 에이드리븐)를 밝히면 돈을 받지 않는 범위에서 자유롭게 인쇄·복사·공유하고 고쳐 쓸 수 있습니다.',
    ],
    pdf: '학습지 PDF (A4 2쪽)',
    answersPdf: '정답지 PDF (A4 1쪽)',
    print: '이 화면 인쇄하기',
    answersLink: '정답과 풀이 보기 →',
    worksheetLink: '← 학습지로',
    guideLink: '챕터별 원리를 더 자세히: 교사용 안내 글',
    learnLink: '개념 설명: 빛의 반사',

    kicker: 'PRISM 학습지 · 반사 도전',
    title: '거울 판 도전하기',
    subtitle: '돌려야 할 거울을 가려내기',
    fields: ['이름', '학년·반', '날짜'],
    rulesH: '푸는 방법',
    rules: [
      '광원(네모 상자)에서 작은 화살표 방향으로 빛이 나갑니다. 빛은 무언가를 만날 때까지 곧게 나아갑니다.',
      '거울을 한 번 돌리면 90도 돌아가서 「/」 모양과 「\\」 모양이 서로 바뀝니다. 결정과 광원은 움직이지 않습니다.',
      '모든 결정(육각형)에 그 안에 그려진 색의 빛이 닿으면 풀린 것입니다.',
    ],
    legendH: '기호',
    legend: { source: '광원', mirror: '거울', crystal: '결정', r: '빨강', g: '초록' },
    task: '돌려야 할 거울에 동그라미를 치고, 광원에서 결정까지 빛의 길을 연필로 그리세요.',
    boards: [
      { name: '광원 둘, 거울 셋', goal: '빨간 빛(△) 두 줄기로 결정 두 개를 모두 밝히세요.', taps: '세 번 돌리면 됩니다.', hint: '한 광원은 위로, 다른 광원은 아래로 빛을 보냅니다. 거울 셋이 모두 틀리게 놓여 있습니다.' },
      { name: '빛이 서로 지나치는 판', goal: '초록 빛(□) 두 줄기로 결정 두 개를 모두 밝히세요.', taps: '세 번 돌리면 됩니다.', hint: '두 빛줄기는 어느 한 칸에서 서로 가로지릅니다.' },
      { name: '네모로 도는 길', goal: '빨간 빛(△)을 위쪽 결정까지 보내세요.', taps: '네 번 돌리면 됩니다.', hint: '결정은 광원과 같은 세로줄 맨 위에 있지만, 그 사이의 거울이 빛을 옆으로 보내 곧바로 갈 수 없습니다.' },
      { name: '광원 둘, 결정 하나', goal: '초록 빛(□)으로 왼쪽 위의 결정을 밝히세요.', taps: '네 번 돌리면 됩니다.', hint: '광원 둘 가운데 하나의 빛만 결정에 닿을 수 있습니다. 어느 쪽일까요?' },
    ],
    answerLine: '돌린 칸',
    extraTag: '심화',
    appNote: 'PRISM 앱의 10, 12, 13, 14번 판입니다. 브라우저 체험판에서도 풀 수 있습니다.',

    page2H: '큰 판을 푸는 생각',
    concepts: [
      {
        h: '거울은 한 번만 돌린다',
        body: '거울은 「/」와 「\\」, 두 모양뿐입니다. 한 번 돌리면 다른 모양이 되고, 두 번 돌리면 처음 모양으로 돌아옵니다. 그래서 한 거울을 두 번 돌릴 일은 없고, 모양이 틀린 거울의 수가 가장 적게 돌리는 횟수입니다.',
        q: '1번 판에서 처음부터 맞게 놓인 거울이 있나요? 풀려면 거울을 모두 몇 번 돌려야 하나요?',
        lines: 2,
      },
      {
        h: '결정에서 거꾸로 따라가기',
        body: '이 판들에서는 빛의 길을 거꾸로 짚어도 같은 길입니다. 결정에서 출발해 빛이 온 쪽으로 거슬러 가면 광원에 닿습니다. 길이 복잡하면 광원에서 앞으로 가는 것보다 결정에서 거꾸로 가는 편이 쉬울 때가 있습니다.',
        q: '풀린 3번 판에서 D1 결정에서 출발해 아래쪽으로 거슬러 가며 만나는 거울을 순서대로 칸 이름으로 쓰세요. 마지막에 닿는 것은 무엇인가요?',
        lines: 3,
      },
      {
        h: '빛이 서로 지나칠 때',
        body: '빛줄기 둘이 한 칸에서 만나도 서로 부딪치거나 막지 않고 그대로 지나갑니다. 그 칸에 거울이 있을 때만 빛이 꺾입니다.',
        q: '풀린 2번 판에서 두 빛이 서로 가로지르는 칸은 어디인가요? 그 칸에는 무엇이 있나요?',
        q2: '두 빛 가운데 한 줄기가 C2에서 거울을 만났다면 어떻게 달라졌을까요?',
        lines: 3,
      },
      {
        h: '다른 광원에 막히는 빛',
        body: '이 게임의 규칙에서는 빛이 다른 광원에 닿으면 거기서 끝납니다. 광원이 있다고 해서 그 빛이 모두 결정에 쓰이는 것은 아닙니다.',
        q: '4번 판의 E1 광원에서 나온 빛은 어느 칸을 지나 어디에서 끝나나요?',
        q2: '4번 판에서 결정을 밝히는 빛은 어느 칸의 광원에서 왔나요? 그 빛은 거울을 몇 개 거치나요?',
        extra: true,
        lines: 5,
      },
    ],
    qrH: '앱 없이 해 보기',
    qrBody: '휴대폰 카메라로 찍으면 이 학습지의 판이 들어 있는 1챕터 14판을 브라우저에서 바로 풀 수 있습니다.',
    qrUrl: 'prism.adriven.co/play',
    curriculum: '초등 5~6학년 「빛의 성질」 단원(빛의 반사)과 함께 쓸 수 있습니다.',
    license: 'CC BY-NC 4.0: 출처(PRISM, 에이드리븐)를 밝히면 비영리로 자유롭게 공유하고 고쳐 쓸 수 있습니다.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: '정답과 풀이',
    answersKicker: '교사용',
    beamLegendH: '정답 그림의 빛',
    beamLegend: { r: '빨강', g: '초록', tap: '돌리는 횟수' },
    answers: [
      { taps: 'B3, C3, D3을 한 번씩 돌립니다.', path: 'C1에서 내려온 빛이 C3에서 오른쪽으로, D3에서 아래로 꺾여 D5 결정에 닿습니다. B5에서 올라온 빛은 B3에서 왼쪽으로 꺾여 A3 결정에 닿습니다.' },
      { taps: 'C3, D2, D4를 한 번씩 돌립니다.', path: 'A2에서 오른쪽으로 간 빛은 C2를 지나 D2에서 아래로, D4에서 오른쪽으로 꺾여 E4 결정에 닿습니다. C1에서 내려온 빛은 C2에서 앞의 빛과 가로지른 뒤 C3에서 왼쪽으로 꺾여 B3 결정에 닿습니다.' },
      { taps: 'B2, B3, D2, D3을 한 번씩 돌립니다.', path: 'D5에서 올라온 빛이 D3에서 왼쪽으로, B3에서 위로, B2에서 오른쪽으로, D2에서 위로 꺾여 D1 결정에 닿습니다.' },
      { taps: 'A4, B3, B4, C3을 한 번씩 돌립니다.', path: 'C1에서 내려온 빛이 C3에서 왼쪽으로, B3에서 아래로, B4에서 왼쪽으로, A4에서 위로 꺾여 A1 결정에 닿습니다. E1 광원의 빛은 C1 광원에서 끝납니다.' },
    ],
    conceptAnswersH: '뒷면 답',
    conceptAnswers: [
      '1. 처음부터 맞게 놓인 거울은 없습니다. 세 개를 한 번씩, 모두 세 번 돌립니다.',
      '2. D2, B2, B3, D3 순서로 만나고, 마지막에 D5 광원에 닿습니다.',
      '3. C2 칸이고, 거울 없이 빈칸입니다. 거울이 없어서 두 빛은 그대로 지나갑니다. 거울이 있었다면 그 빛은 C2에서 꺾였을 것입니다.',
      '4. D1을 지나 C1 광원에서 끝납니다. 결정을 밝히는 빛은 C1 광원에서 왔고, 거울 네 개(C3, B3, B4, A4)를 거칩니다.',
    ],
  },

  en: {
    pageTitle: 'Mirror Board Challenge: a printable worksheet on reflection',
    navLabel: 'Printable worksheet: Mirror Board Challenge',
    desc: 'A free printable worksheet with four later boards from chapter 1 of PRISM, a light puzzle by A Driven. Students work out which three or four mirrors to turn, think about the fewest turns, and trace a beam backwards from the crystal to the source. Black and white, with an answer key.',
    level: 'Ages 9 to 12',
    meta: 'Ages 9 to 12 · 2 A4 pages + 1-page answer key · You need: a pencil',
    intro: [
      'A worksheet built from four later boards of chapter 1, each with three or four mirrors to turn. It has two A4 pages (front and back) for students and a one-page answer key for teachers. On the front, students find which mirrors to turn and send the light to the crystals. On the back, they think about the number of turns, tracing a beam backwards, beams that cross, and light stopped by another source.',
      'It works on a black and white printer: every color of light is also marked with a shape (red △, green □).',
      'For ages about 9 to 12, in a unit on reflection. Connects to NGSS 4-PS4-2 (US) and KS2 Light, Year 6 (England). It is easier after the “Steering Light with Mirrors” and “Light Around Corners” worksheets.',
      'Licensed CC BY-NC 4.0: you may print, copy, share and adapt it for any non-commercial use, with credit to PRISM by A Driven.',
    ],
    pdf: 'Worksheet PDF (2 A4 pages)',
    answersPdf: 'Answer key PDF (1 A4 page)',
    print: 'Print this page',
    answersLink: 'See the answers →',
    worksheetLink: '← Back to the worksheet',
    guideLink: 'More on each principle: the teacher\'s guide',
    learnLink: 'Concept page: reflection of light',

    kicker: 'PRISM worksheet · Reflection challenge',
    title: 'Mirror Board Challenge',
    subtitle: 'Sorting out which mirrors to turn',
    fields: ['Name', 'Class', 'Date'],
    rulesH: 'How to play',
    rules: [
      'Light leaves the source (the square box) in the direction of its small arrow. It keeps going straight until it meets something.',
      'Each tap turns a mirror 90 degrees, so it swaps between a “/” shape and a “\\” shape. Crystals and sources never move.',
      'The board is solved when every crystal (hexagon) receives light of the color drawn inside it.',
    ],
    legendH: 'Key',
    legend: { source: 'Light source', mirror: 'Mirror', crystal: 'Crystal', r: 'red', g: 'green' },
    task: 'Circle the mirrors you would turn, then draw the path of the light from the source to the crystal in pencil.',
    boards: [
      { name: 'Two sources, three mirrors', goal: 'Light both crystals with the two red beams (△).', taps: 'It takes three taps.', hint: 'One source sends light up, the other down. All three mirrors start out the wrong way.' },
      { name: 'Beams that cross', goal: 'Light both crystals with the two green beams (□).', taps: 'It takes three taps.', hint: 'The two beams cross each other in one cell.' },
      { name: 'Around the square', goal: 'Send the red light (△) to the crystal at the top.', taps: 'It takes four taps.', hint: 'The crystal is at the top of the same column as the source, but the mirrors in between send the light off to the side, so it cannot go straight.' },
      { name: 'Two sources, one crystal', goal: 'Light the crystal at the top left with green light (□).', taps: 'It takes four taps.', hint: 'Only one of the two sources can reach the crystal. Which one?' },
    ],
    answerLine: 'Pieces turned',
    extraTag: 'Extension',
    appNote: 'These are levels 10, 12, 13 and 14 of the PRISM app. You can also play them in the browser demo.',

    page2H: 'Ways of thinking about big boards',
    concepts: [
      {
        h: 'Turn a mirror at most once',
        body: 'A mirror has only two shapes, “/” and “\\”. One turn gives the other shape, and a second turn brings it back. So you never need to turn a mirror twice, and the fewest turns is the number of mirrors that start out the wrong way.',
        q: 'On board 1, does any mirror start out the right way? How many turns does it take in all?',
        lines: 2,
      },
      {
        h: 'Tracing back from the crystal',
        body: 'On these boards the path of the light is the same read backwards. Start at the crystal and go back the way the light came, and you reach the source. When the path is tangled, going backwards from the crystal can be easier than going forwards from the source.',
        q: 'On the solved board 3, start at the crystal in D1 and go down, back along the beam. List the mirrors you meet, in order, by cell name. What do you reach at the end?',
        lines: 3,
      },
      {
        h: 'When beams cross',
        body: 'When two beams meet in a cell, they do not collide or block each other. They carry on as they were. Light only bends in a cell that holds a mirror.',
        q: 'On the solved board 2, in which cell do the two beams cross? What is in that cell?',
        q2: 'What would have changed if one of the two beams had met a mirror in C2?',
        lines: 3,
      },
      {
        h: 'Light stopped by another source',
        body: 'In this game, light that reaches another light source ends there. Having a source does not mean its light is used to light a crystal.',
        q: 'On board 4, which cells does the light from the source in E1 pass through, and where does it end?',
        q2: 'On board 4, which source does the light that lights the crystal come from? How many mirrors does it meet?',
        extra: true,
        lines: 5,
      },
    ],
    qrH: 'Try it without the app',
    qrBody: 'Scan with a phone camera to play chapter 1 (14 levels, including the boards on this sheet) in the browser.',
    qrUrl: 'prism.adriven.co/play',
    curriculum: 'For ages about 9 to 12. Connects to NGSS 4-PS4-2 and KS2 Light (Year 6).',
    license: 'CC BY-NC 4.0: share and adapt for non-commercial use, with credit to PRISM by A Driven.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: 'Answers and explanations',
    answersKicker: 'For teachers',
    beamLegendH: 'Light in the answer diagrams',
    beamLegend: { r: 'red', g: 'green', tap: 'number of taps' },
    answers: [
      { taps: 'Turn B3, C3 and D3 once each.', path: 'The light coming down from C1 bends right at C3 and down at D3, reaching the crystal at D5. The light going up from B5 bends left at B3 and reaches the crystal at A3.' },
      { taps: 'Turn C3, D2 and D4 once each.', path: 'The light going right from A2 passes C2, bends down at D2 and right at D4, reaching the crystal at E4. The light coming down from C1 crosses the first beam at C2, then bends left at C3 and reaches the crystal at B3.' },
      { taps: 'Turn B2, B3, D2 and D3 once each.', path: 'The light going up from D5 bends left at D3, up at B3, right at B2 and up again at D2, reaching the crystal at D1.' },
      { taps: 'Turn A4, B3, B4 and C3 once each.', path: 'The light coming down from C1 bends left at C3, down at B3, left at B4 and up at A4, reaching the crystal at A1. The light from the source at E1 ends at the source at C1.' },
    ],
    conceptAnswersH: 'Back page answers',
    conceptAnswers: [
      '1. No mirror starts out the right way. Turn all three once: three turns in all.',
      '2. D2, B2, B3, D3, in that order. At the end you reach the source at D5.',
      '3. In C2, which is an empty cell with no mirror. With no mirror, both beams carry straight on. With a mirror there, that beam would have bent in C2.',
      '4. It passes D1 and ends at the source in C1. The light that lights the crystal comes from the source in C1 and meets four mirrors (C3, B3, B4, A4).',
    ],
  },
};

export default {
  slug: 'reflection-challenge',
  /** 마지막으로 고친 날. sitemap lastmod와 JSON-LD dateModified. 문구·판을 고치면 같이 고친다. */
  updated: '2026-11-25',
  boards: BOARDS,
  /** 기호 설명 아이콘을 잘라 올 판 칸: [판 번호, 열, 행]. 여기 적은 것만 기호 설명에 나온다. */
  legendCells: {
    source: [10, 'C', 1],
    mirror: [10, 'B', 3],
    crystal: [10, 'A', 3],
  },
  /** 이 학습지에 나오는 빛의 색(기호 설명과 정답 그림 설명에 이것만 보인다). */
  colors: ['r', 'g'],
  /** 이어지는 개념 페이지(`/learn/<slug>/`). */
  learn: 'reflection',
  text: TEXT,
};
