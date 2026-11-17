/**
 * 학습지 A1 「거울로 빛 보내기」(`/worksheets/reflection-basics/`)의 판과 한·영 문구.
 * 시리즈 A(챕터 연습)의 첫 장: 1챕터 「반사」 기초. 그리는 쪽은 `worksheet-page.mjs`.
 *
 * ## 판
 * 앱 1, 2, 4, 5번 판(1챕터에서 가장 쉬운 넷. 3번은 「빛의 길 찾기」가 이미 썼고, 6~9번은 A2,
 * 10~14번은 A3 몫이다). prism 저장소 `tools/make-worksheet-boards.ts --sheet reflection-basics
 * --site ../prism-site`가 엔진으로 그리고 정답이 하나뿐인지, 탭 합이 par와 같은지 확인한다.
 * 아래 문구의 길 설명은 정답 그림(`<id>-answer.svg`)을 보고 적었다.
 *   1번: A4 광원 → C4 「/」에서 위로 → C2 「\」에서 왼쪽으로 → A2 결정. 두 번 꺾임.
 *        돌리기 전에는 C4 「\」가 빛을 아래로 보내 판 밖으로 나간다.
 *   2번: A5 광원 → D5 「/」에서 위로 → D2 「\」에서 왼쪽으로 → A2 결정. 두 번 꺾임.
 *   4번: E3 광원(왼쪽으로) → A3 「/」에서 아래로 → A4 「\」에서 오른쪽으로 → C4 「\」에서 아래로 → C5. 세 번.
 *   5번: A3 광원 → D3 「\」에서 아래로 → D5 「/」에서 왼쪽으로 → C5 「\」에서 위로 → C3 빈칸을
 *        가로질러 → C1 결정. 세 번 꺾이고 C3에서 자기 길과 엇갈린다.
 *
 * ## 교육과정 (prism 저장소 docs/WORKSHEETS.md 4절)
 * - 초5~6 [6과02-02]: 빛의 직진·반사 현상. 각도 규칙은 다루지 않으므로 문항은 「어느 쪽으로
 *   꺾이나」만 묻는다. 입사각 = 반사각은 중학교 [9과10-01]이라 「중학교 미리 보기」로만 둔다.
 * - 영어판: NGSS 4-PS4-2, 영국 KS2 Light(Year 3, Year 6)에 「connects to」로만 잇는다.
 * - 성취기준 원문 문장은 옮기지 않았다.
 *
 * ## 삽화
 * 새로 만들지 않았다. 삽화 창고(prism 저장소 worksheet/art/library.json)의
 * `law-of-reflection-flashlight`(법선과 같은 크기의 두 각)를 2번 문항 「중학교 미리 보기」 위에 다시 쓴다.
 * 머리 그림(optical-bench-overview)은 반투명 거울과 프리즘이 그려져 있어 이 학습지에는 쓰지 않는다.
 *
 * ## 쓰지 않은 것
 * 가격. 뒷면 문항과 힌트, 풀이는 「빛의 길 찾기」와 개념 페이지 「빛의 반사」의 문장을 되풀이하지
 * 않고 새로 썼다. 「푸는 방법」의 규칙 문장과 화면 머리말(버튼, 이용 허락, 저작권)은 학습지마다 같은
 * 공통 틀이라 「빛의 길 찾기」와 거의 같다(11/18 검수에서 짚음). 두 빛줄기가 엇갈려도 서로 방해하지
 * 않는다는 내용(4번 문항)은 실제 빛의 성질이고, 게임에서도 빈칸에서 엇갈린 빛은 그대로 지나간다.
 */

const BOARDS = [
  { id: 1, chapter: 1, taps: { C4: 1 } },
  { id: 2, chapter: 1, taps: { D2: 1, D5: 1 } },
  { id: 4, chapter: 1, taps: { A4: 1, C4: 1 } },
  { id: 5, chapter: 1, taps: { D3: 1, D5: 1 } },
];

const TEXT = {
  ko: {
    pageTitle: '거울로 빛 보내기: 빛의 반사 기초 학습지 (인쇄용)',
    navLabel: '인쇄용 학습지: 거울로 빛 보내기',
    desc: '빛의 반사를 처음 배우는 학생을 위한 무료 인쇄용 학습지입니다. 에이드리븐의 광학 퍼즐 게임 PRISM 1챕터의 판 네 개에서 거울을 돌려 빛을 결정까지 보내고, 빛이 곧게 나아가다 거울에서 꺾이는 모습을 연필로 그려 봅니다. 흑백 인쇄용, 정답지 포함.',
    level: '초등 5~6학년',
    meta: '초등 5~6학년 · A4 2쪽 + 정답지 1쪽 · 준비물: 연필',
    intro: [
      '거울만 나오는 가장 쉬운 판들 가운데 네 개로 만든 학습지입니다. A4 한 장(앞뒤 2쪽)과 교사용 정답지 한 장입니다. 앞면에서는 거울을 돌려 빛을 결정까지 보내고, 뒷면에서는 빛이 곧게 나아가는 것과 거울에서 꺾이는 것을 질문으로 확인합니다.',
      '흑백으로 인쇄해도 풀 수 있습니다. 빛의 색은 도형으로도 표시되어 있습니다(초록 □, 파랑 ○).',
      '초등 5~6학년 「빛의 성질」 단원에서 빛의 직진과 반사를 배운 뒤에 쓰기 좋습니다(2022 개정 [6과02-02] 관련). 뒷면의 「중학교 미리 보기」 한 칸은 중학교 「빛과 파동」의 반사 법칙을 소개합니다.',
      'CC BY-NC 4.0으로 공개합니다. 출처(PRISM, 에이드리븐)를 밝히면 돈을 받지 않는 범위에서 자유롭게 인쇄·복사·공유하고 고쳐 쓸 수 있습니다.',
    ],
    pdf: '학습지 PDF (A4 2쪽)',
    answersPdf: '정답지 PDF (A4 1쪽)',
    print: '이 화면 인쇄하기',
    answersLink: '정답과 풀이 보기 →',
    worksheetLink: '← 학습지로',
    guideLink: '챕터별 원리를 더 자세히: 교사용 안내 글',
    learnLink: '개념 설명: 빛의 반사',

    kicker: 'PRISM 학습지 · 반사 기초',
    title: '거울로 빛 보내기',
    subtitle: '빛의 직진과 반사',
    fields: ['이름', '학년·반', '날짜'],
    rulesH: '푸는 방법',
    rules: [
      '광원(네모 상자)에서 작은 화살표 방향으로 빛이 나갑니다. 빛은 무언가를 만날 때까지 곧게 나아갑니다.',
      '거울을 한 번 돌리면 90도 돌아가서 「/」 모양과 「\\」 모양이 서로 바뀝니다. 결정과 광원은 움직이지 않습니다.',
      '결정(육각형)에 그 안에 그려진 색의 빛이 닿으면 풀린 것입니다.',
    ],
    legendH: '기호',
    legend: { source: '광원', mirror: '거울', crystal: '결정', g: '초록', b: '파랑' },
    task: '먼저 빛의 길을 눈으로 따라간 다음, 돌려야 할 거울에 동그라미를 치고 길을 연필로 그리세요.',
    boards: [
      { name: '거울 하나 돌리기', goal: '파란 빛(○)을 파란 결정까지 보내세요.', taps: '한 번 돌리면 됩니다.', hint: '지금 빛이 어디로 가는지부터 그려 보세요.' },
      { name: '두 번 꺾기', goal: '파란 빛이 거울 두 개를 거쳐 결정에 닿게 하세요.', taps: '두 번 돌리면 됩니다.', hint: '빛이 먼저 만나는 거울부터 생각합니다.' },
      { name: '맞는 거울 찾기', goal: '파란 빛을 아래쪽 결정까지 보내세요.', taps: '두 번 돌리면 됩니다.', hint: '거울 세 개 가운데 하나는 돌리지 않습니다.' },
      { name: '길을 가로질러', goal: '초록 빛(□)을 초록 결정까지 보내세요.', taps: '두 번 돌리면 됩니다.', hint: '빛은 자기가 지나온 길을 가로질러 갈 수 있습니다.' },
    ],
    answerLine: '돌린 칸',
    extraTag: '심화',
    appNote: 'PRISM 앱의 1, 2, 4, 5번 판입니다. 브라우저 체험판에서도 풀 수 있습니다.',

    page2H: '빛은 곧게 가다가 거울에서 꺾입니다',
    concepts: [
      {
        h: '빛은 곧게 나아갑니다',
        body: '손전등을 켜면 빛은 휘지 않고 똑바로 뻗어 갑니다. 그래서 물체 뒤에는 그림자가 생깁니다. 판에서도 빛은 거울이나 결정을 만나기 전까지 한 줄로 곧게 갑니다.',
        q: '1번 판에서 거울을 돌리기 전에는 빛이 어디로 갔나요? 빛의 길을 말로 써 보세요.',
        lines: 3,
      },
      {
        h: '거울은 빛의 방향을 바꿉니다',
        body: '빛이 거울에 닿으면 튕겨 나와 다른 쪽으로 갑니다. 이것을 빛의 반사라고 합니다. 판의 거울은 기운 방향에 따라 빛을 보내는 쪽이 다릅니다.',
        q: '빛은 어느 쪽으로 꺾일까요? 위, 아래 가운데 골라 쓰세요.',
        sign: '→',
        artTall: true,
        table: [
          ['오른쪽으로 가던 빛이 「/」 거울을 만나면', ''],
          ['오른쪽으로 가던 빛이 「\\」 거울을 만나면', ''],
          ['왼쪽으로 가던 빛이 「/」 거울을 만나면', ''],
          ['왼쪽으로 가던 빛이 「\\」 거울을 만나면', ''],
        ],
        preview: {
          h: '중학교 미리 보기',
          body: '거울면에 수직으로 세운 선을 법선이라고 합니다. 들어오는 빛과 법선 사이의 각(입사각)은 나가는 빛과 법선 사이의 각(반사각)과 늘 같습니다. 위 그림에 표시한 두 각이 같은 크기입니다.',
        },
      },
      {
        h: '꺾인 횟수 세기',
        body: '빛이 거울을 한 번 만날 때마다 길이 한 번 꺾입니다.',
        q: '풀린 판에서 빛은 결정에 닿을 때까지 몇 번 꺾였나요?',
        blanks: ['2번 판', '3번 판', '4번 판'],
        q2: '풀린 3번 판에서 A3 거울을 한 번 돌리면 빛은 어디로 갈까요?',
        lines: 2,
      },
      {
        h: '엇갈려도 제 길을 갑니다',
        body: '손전등 두 개의 빛을 서로 엇갈리게 비춰도, 두 빛은 부딪혀 튕기지 않고 각자 가던 길을 그대로 갑니다.',
        q: '4번 판에서 빛은 자기가 지나온 길을 한 번 가로지릅니다. 어느 칸에서 가로지르나요? 그 칸에서 빛의 방향이 바뀌었나요?',
        lines: 2,
      },
    ],
    qrH: '앱 없이 해 보기',
    qrBody: '휴대폰 카메라로 찍으면 이 학습지의 판이 들어 있는 1챕터 14판을 브라우저에서 바로 풀 수 있습니다.',
    qrUrl: 'prism.adriven.co/play',
    curriculum: '초등 5~6학년 「빛의 성질」 단원과 함께 쓸 수 있습니다. 「중학교 미리 보기」는 중학교 「빛과 파동」 단원의 내용입니다.',
    license: 'CC BY-NC 4.0: 출처(PRISM, 에이드리븐)를 밝히면 비영리로 자유롭게 공유하고 고쳐 쓸 수 있습니다.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: '정답과 풀이',
    answersKicker: '교사용',
    beamLegendH: '정답 그림의 빛',
    beamLegend: { g: '초록', b: '파랑', tap: '돌리는 횟수' },
    answers: [
      { taps: 'C4를 한 번 돌립니다. C2는 그대로 둡니다.', path: '오른쪽으로 가던 빛이 C4에서 위로, C2에서 왼쪽으로 꺾여 A2 결정에 닿습니다.' },
      { taps: 'D2와 D5를 한 번씩 돌립니다.', path: '빛은 D5에서 위로 꺾여 올라가고, D2에서 왼쪽으로 꺾여 A2 결정에 닿습니다.' },
      { taps: 'A4와 C4를 한 번씩 돌립니다. A3은 그대로 둡니다.', path: '왼쪽으로 가던 빛이 A3에서 아래로, A4에서 오른쪽으로, C4에서 다시 아래로 꺾여 C5 결정에 닿습니다.' },
      { taps: 'D3과 D5를 한 번씩 돌립니다. C5는 그대로 둡니다.', path: '빛은 D3에서 아래로, D5에서 왼쪽으로, C5에서 위로 꺾입니다. 올라가면서 C3을 가로질러 C1 결정에 닿습니다.' },
    ],
    conceptAnswersH: '뒷면 답',
    conceptAnswers: [
      '1. 광원에서 오른쪽으로 곧게 가다가 C4 거울에서 아래로 꺾여 판 밖으로 나갔습니다.',
      '2. 차례로 위, 아래, 아래, 위.',
      '3. 2번 판 두 번, 3번 판 세 번, 4번 판 세 번. A3 거울을 돌리면 빛은 A3에서 위로 꺾여 판 밖으로 나갑니다.',
      '4. C3에서 가로지릅니다. 방향은 바뀌지 않았습니다. 빛은 거울을 만날 때만 꺾였습니다.',
    ],
  },

  en: {
    pageTitle: 'Steering Light with Mirrors: a printable reflection worksheet for beginners',
    navLabel: 'Printable worksheet: Steering Light with Mirrors',
    desc: 'A free printable worksheet for a first lesson on reflection. Students turn mirrors on four boards from chapter 1 of PRISM, a light puzzle by A Driven, and draw how light travels straight, then turns. Black and white, with an answer key.',
    level: 'Ages 9 to 12',
    meta: 'Ages 9 to 12 · 2 A4 pages + 1-page answer key · You need: a pencil',
    intro: [
      'A worksheet built from four of the easiest boards in the game, with mirrors and nothing else. It has two A4 pages (front and back) for students and a one-page answer key for teachers. On the front, students turn mirrors to send light to a crystal. On the back, short questions check two ideas: light travels in straight lines, and a mirror changes its direction.',
      'It works on a black and white printer: every color of light is also marked with a shape (green □, blue ○).',
      'For ages about 9 to 12, after a first lesson on how light travels and reflects. Connects to NGSS 4-PS4-2 (US) and KS2 Light (England). One “Going further” box on the back introduces the law of reflection.',
      'Licensed CC BY-NC 4.0: you may print, copy, share and adapt it for any non-commercial use, with credit to PRISM by A Driven.',
    ],
    pdf: 'Worksheet PDF (2 A4 pages)',
    answersPdf: 'Answer key PDF (1 A4 page)',
    print: 'Print this page',
    answersLink: 'See the answers →',
    worksheetLink: '← Back to the worksheet',
    guideLink: 'More on each principle: the teacher\'s guide',
    learnLink: 'Concept page: reflection of light',

    kicker: 'PRISM worksheet · Reflection basics',
    title: 'Steering Light with Mirrors',
    subtitle: 'Straight lines and reflection',
    fields: ['Name', 'Class', 'Date'],
    rulesH: 'How to play',
    rules: [
      'Light leaves the source (the square box) in the direction of its small arrow. It keeps going straight until it meets something.',
      'Each tap turns a mirror 90 degrees, so it swaps between a “/” shape and a “\\” shape. Crystals and sources never move.',
      'The board is solved when the crystal (hexagon) receives light of the color drawn inside it.',
    ],
    legendH: 'Key',
    legend: { source: 'Light source', mirror: 'Mirror', crystal: 'Crystal', g: 'green', b: 'blue' },
    task: 'Follow the light with your eyes first. Then circle the mirrors you would turn and draw the path in pencil.',
    boards: [
      { name: 'Turn one mirror', goal: 'Send the blue light (○) to the blue crystal.', taps: 'It takes one tap.', hint: 'Start by drawing where the light goes right now.' },
      { name: 'Two bends', goal: 'Make the blue light reach the crystal by way of both mirrors.', taps: 'It takes two taps.', hint: 'Think about the mirror the light meets first.' },
      { name: 'Find the right mirrors', goal: 'Send the blue light to the crystal at the bottom.', taps: 'It takes two taps.', hint: 'One of the three mirrors should not be turned.' },
      { name: 'Across its own path', goal: 'Send the green light (□) to the green crystal.', taps: 'It takes two taps.', hint: 'Light is allowed to cross a path it has already taken.' },
    ],
    answerLine: 'Pieces turned',
    extraTag: 'Extension',
    appNote: 'These are levels 1, 2, 4 and 5 of the PRISM app. You can also play them in the browser demo.',

    page2H: 'Light goes straight, then bends at a mirror',
    concepts: [
      {
        h: 'Light travels in straight lines',
        body: 'Switch on a flashlight and the beam does not curve. It goes straight ahead, which is why a shadow forms behind an object. On the boards, light also runs in one straight line until it meets a mirror or a crystal.',
        q: 'On board 1, where did the light go before you turned a mirror? Describe its path in words.',
        lines: 3,
      },
      {
        h: 'A mirror changes the direction of light',
        body: 'When light hits a mirror it bounces off and heads a different way. This is called reflection. On the boards, the way a mirror leans decides where it sends the light.',
        q: 'Which way does the light go next? Write “up” or “down”.',
        sign: '→',
        artTall: true,
        table: [
          ['Light heading right meets a “/” mirror', ''],
          ['Light heading right meets a “\\” mirror', ''],
          ['Light heading left meets a “/” mirror', ''],
          ['Light heading left meets a “\\” mirror', ''],
        ],
        preview: {
          h: 'Going further',
          body: 'A line drawn at right angles to a mirror is called the normal. The angle between the incoming light and the normal always equals the angle between the outgoing light and the normal. The two angles marked in the picture above are the same size.',
        },
      },
      {
        h: 'Count the bends',
        body: 'Every time the light meets a mirror, its path bends once.',
        q: 'On the solved boards, how many times did the light bend before it reached the crystal?',
        blanks: ['Board 2', 'Board 3', 'Board 4'],
        q2: 'On the solved board 3, where would the light go if you turned the A3 mirror once?',
        lines: 2,
      },
      {
        h: 'Crossing beams carry on',
        body: 'Shine two flashlights so that their beams cross. The beams do not bump into each other. Each one carries on along its own path.',
        q: 'On board 4, the light crosses its own earlier path once. In which cell? Did the light change direction there?',
        lines: 2,
      },
    ],
    qrH: 'Try it without the app',
    qrBody: 'Scan with a phone camera to play chapter 1 (14 levels, including the boards on this sheet) in the browser.',
    qrUrl: 'prism.adriven.co/play',
    curriculum: 'For ages about 9 to 12. Connects to NGSS 4-PS4-2 and KS2 Light. The “Going further” box is for older students.',
    license: 'CC BY-NC 4.0: share and adapt for non-commercial use, with credit to PRISM by A Driven.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: 'Answers and explanations',
    answersKicker: 'For teachers',
    beamLegendH: 'Light in the answer diagrams',
    beamLegend: { g: 'green', b: 'blue', tap: 'number of taps' },
    answers: [
      { taps: 'Turn C4 once. Leave C2 alone.', path: 'The light heading right turns up at C4 and left at C2, reaching the crystal at A2.' },
      { taps: 'Turn D2 and D5 once each.', path: 'The light turns up at D5, climbs the column, and turns left at D2 to reach the crystal at A2.' },
      { taps: 'Turn A4 and C4 once each. Leave A3 alone.', path: 'The light heading left turns down at A3, right at A4 and down again at C4, reaching the crystal at C5.' },
      { taps: 'Turn D3 and D5 once each. Leave C5 alone.', path: 'The light turns down at D3, left at D5 and up at C5. On its way up it crosses C3 and reaches the crystal at C1.' },
    ],
    conceptAnswersH: 'Back page answers',
    conceptAnswers: [
      '1. It went straight to the right from the source, turned down at the C4 mirror and left the board at the bottom.',
      '2. In order: up, down, down, up.',
      '3. Board 2: twice. Board 3: three times. Board 4: three times. With the A3 mirror turned, the light turns up at A3 and leaves the board at the top.',
      '4. In cell C3. It did not change direction there. The light only bent where it met a mirror.',
    ],
  },
};

export default {
  slug: 'reflection-basics',
  /** 마지막으로 고친 날. sitemap lastmod와 JSON-LD dateModified. 문구·판을 고치면 같이 고친다. */
  updated: '2026-11-18',
  boards: BOARDS,
  /** 기호 설명 아이콘을 잘라 올 판 칸: [판 번호, 열, 행]. 여기 적은 것만 기호 설명에 나온다. */
  legendCells: {
    source: [1, 'A', 4],
    mirror: [1, 'C', 2],
    crystal: [1, 'A', 2],
  },
  /** 이 학습지에 나오는 빛의 색(기호 설명과 정답 그림 설명에 이것만 보인다). */
  colors: ['g', 'b'],
  /** 이어지는 개념 페이지(`/learn/<slug>/`). */
  learn: 'reflection',
  text: TEXT,
};
