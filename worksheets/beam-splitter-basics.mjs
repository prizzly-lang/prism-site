/**
 * 학습지 A4 「빛을 둘로 나누기」(`/worksheets/beam-splitter-basics/`)의 판과 한·영 문구.
 * 시리즈 A(챕터 연습)의 넷째 장: 2챕터 「분열」(반투명 거울) 기초. 그리는 쪽은 `worksheet-page.mjs`.
 *
 * ## 판
 * 앱 15, 16, 17, 18번 판(2챕터 앞쪽 네 판. 22번은 「빛의 길 찾기」가 이미 썼다). prism 저장소
 * `tools/make-worksheet-boards.ts --sheet beam-splitter-basics --site ../prism-site`가 엔진으로
 * 그리고 정답이 하나뿐인지, 탭 합이 par와 같은지 확인한다. 아래 길 설명은 정답 그림을 보고 적었다.
 * 반투명 거울: 들어온 빛을 직진 하나와 90도 꺾인 하나로 가른다(`src/engine/beam.ts`의 splitter).
 * "\" 모양에는 오른쪽·아래로 가던 빛이 각각 아래·오른쪽으로 꺾이고, "/" 모양에는 오른쪽·아래로
 * 가던 빛이 각각 위·왼쪽으로 꺾인다.
 *   15번(파랑, A1 오른쪽): D1 「\」에서 아래로 → D3 반투명 거울 「\」: 오른쪽 갈래는 E3 결정,
 *         직진 갈래는 D4 거울을 돌려 「\」로 만들면 오른쪽으로 꺾여 E4 결정. 처음에는 E3만 켜져 있다.
 *   16번(초록, A1 아래): A4 반투명 거울 「\」: 오른쪽 갈래는 B4, C4를 지나 D4 「/」에서 위로 D1 결정.
 *         직진 갈래는 A5 거울을 「\」로 돌려 오른쪽으로, C5 「/」에서 위로 C4(앞 갈래와 가로지름)를
 *         지나 C1 결정. 돌리는 것은 A5 하나.
 *   17번(초록, B1 아래): B3 반투명 거울 「/」: 아래로 온 빛이 왼쪽으로 꺾이는 갈래와 직진 갈래.
 *         A3 거울을 「\」로 돌리면 왼쪽 갈래가 위로 꺾여 A2 결정, B4 거울을 「/」로 돌리면 직진 갈래가
 *         왼쪽으로 꺾여 A4 결정. 처음에는 A3 「/」가 왼쪽 갈래를 A4 결정으로 보내 A4만 켜져 있다.
 *   18번(빨강, E3 왼쪽): B3까지 곧게 가서 A3 거울을 「\」로 돌리면 위로 → A2 「/」에서 오른쪽으로 →
 *         B2 반투명 거울을 「\」로 돌리면 한 갈래는 오른쪽으로 곧게 C2, D2, E2를 지나 판 밖으로, 한 갈래는
 *         아래로 B3(앞의 빛과 가로지름) → B4 반투명 거울을 「/」로 돌리면 왼쪽 갈래는 A4 결정, 직진 갈래는
 *         B5 결정. 처음에는 A3 「/」가 빛을 A4 결정으로 보내 A4만 켜져 있다. A2 거울은 이미 맞다.
 *
 * ## 교육과정 (prism 저장소 docs/WORKSHEETS.md 4절)
 * 반투명 거울은 한국 2022 개정, NGSS, 영국 어디에도 직접 맞는 기준이 없다. 그래서 「교과 밖 심화」라고
 * 쓰고 바탕이 되는 반사([6과02-02])만 잇는다. 영어판은 NGSS·영국 기준과 잇지 않고 「extension」이라고 쓴다.
 *
 * ## 삽화
 * 없음(새 생성 0회). 판 그림과 기호만 쓴다.
 *
 * ## 쓰지 않은 것
 * 가격. 빛의 밝기(게임에는 밝기가 없다. 개념 페이지 「반투명 거울」의 「게임과 다른 점」에서 다룬다).
 * 앞 학습지와 개념 페이지의 문장을 되풀이하지 않고 새로 썼다. 「푸는 방법」과 화면 머리말은 공통 틀이다.
 * QR은 체험판에 반투명 거울이 없어서 오늘의 퍼즐(`/daily/`)로 간다.
 */

const BOARDS = [
  { id: 15, chapter: 2, taps: { D4: 1 } },
  { id: 16, chapter: 2, taps: { A5: 1 } },
  { id: 17, chapter: 2, taps: { A3: 1, B4: 1 } },
  { id: 18, chapter: 2, taps: { A3: 1, B2: 1, B4: 1 } },
];

const TEXT = {
  ko: {
    pageTitle: '빛을 둘로 나누기: 반투명 거울 학습지 (인쇄용)',
    navLabel: '인쇄용 학습지: 빛을 둘로 나누기',
    desc: '반투명 거울이 빛 한 줄기를 둘로 나누는 것을 판 네 개에서 연필로 따라가 보는 무료 인쇄용 학습지입니다. 에이드리븐의 광학 퍼즐 게임 PRISM 2챕터 앞쪽 판들로, 갈라진 두 빛이 각각 어디로 가는지 그려 봅니다. 흑백 인쇄용, 정답지 포함.',
    level: '초등 5~6학년 (교과 밖 심화)',
    meta: '초등 5~6학년 · A4 2쪽 + 정답지 1쪽 · 준비물: 연필',
    intro: [
      '반투명 거울이 나오는 2챕터 앞쪽 판 네 개로 만든 학습지입니다. A4 한 장(앞뒤 2쪽)과 교사용 정답지 한 장입니다. 앞면에서는 빛이 반투명 거울에서 둘로 갈라지는 길을 따라 모든 결정에 빛을 보내고, 뒷면에서는 갈라진 두 빛, 돌려도 그대로인 빛, 서로 가로지르는 빛, 결정에 닿지 않는 갈래를 생각해 봅니다.',
      '흑백으로 인쇄해도 풀 수 있습니다. 빛의 색은 도형으로도 표시되어 있습니다(빨강 △, 초록 □, 파랑 ○).',
      '반투명 거울은 2022 개정 교육과정에 직접 나오지 않는 교과 밖 심화 주제입니다. 바탕이 되는 빛의 반사는 초등 5~6학년 「빛의 성질」 단원에서 배웁니다([6과02-02] 관련). 「거울로 빛 보내기」를 먼저 풀었다면 더 쉽습니다.',
      'CC BY-NC 4.0으로 공개합니다. 출처(PRISM, 에이드리븐)를 밝히면 돈을 받지 않는 범위에서 자유롭게 인쇄·복사·공유하고 고쳐 쓸 수 있습니다.',
    ],
    pdf: '학습지 PDF (A4 2쪽)',
    answersPdf: '정답지 PDF (A4 1쪽)',
    print: '이 화면 인쇄하기',
    answersLink: '정답과 풀이 보기 →',
    worksheetLink: '← 학습지로',
    guideLink: '챕터별 원리를 더 자세히: 교사용 안내 글',
    learnLink: '개념 설명: 반투명 거울(빔 스플리터)',

    kicker: 'PRISM 학습지 · 반투명 거울 기초',
    title: '빛을 둘로 나누기',
    subtitle: '반투명 거울에서 갈라지는 빛의 길',
    fields: ['이름', '학년·반', '날짜'],
    rulesH: '푸는 방법',
    rules: [
      '광원(네모 상자)에서 작은 화살표 방향으로 빛이 나갑니다. 빛은 무언가를 만날 때까지 곧게 나아갑니다.',
      '반투명 거울(선이 두 줄인 조각)에 닿은 빛은 둘이 됩니다. 한 줄기는 오던 방향으로 곧게 가고, 한 줄기는 거울처럼 90도 꺾입니다. 두 줄기의 색은 같습니다.',
      '거울과 반투명 거울은 한 번 돌리면 90도 돌아가서 「/」 모양과 「\\」 모양이 서로 바뀝니다. 결정과 광원은 움직이지 않습니다. 모든 결정(육각형)에 그 안에 그려진 색의 빛이 닿으면 풀린 것입니다.',
    ],
    legendH: '기호',
    legend: { source: '광원', mirror: '거울', splitter: '반투명 거울', crystal: '결정', r: '빨강', g: '초록', b: '파랑' },
    task: '돌려야 할 조각에 동그라미를 치고, 광원에서 결정까지 빛의 길을 연필로 그리세요. 갈라진 빛은 두 줄기를 모두 그립니다.',
    boards: [
      { name: '반투명 거울 하나', goal: '파란 빛(○) 한 줄기로 결정 두 개를 모두 밝히세요.', taps: '한 번 돌리면 됩니다.', hint: '처음에도 결정 하나는 이미 켜져 있습니다. 반투명 거울에서 갈라진 빛이 어디로 가는지 따라가 보세요.' },
      { name: '두 갈래가 만나는 판', goal: '초록 빛(□) 한 줄기로 결정 두 개를 모두 밝히세요.', taps: '한 번 돌리면 됩니다.', hint: '반투명 거울에서 갈라진 한 줄기는 이미 맞게 가고 있습니다. 곧게 가는 줄기를 따라가 보세요.' },
      { name: '한쪽만 켜진 판', goal: '초록 빛(□) 한 줄기로 결정 두 개를 모두 밝히세요.', taps: '두 번 돌리면 됩니다.', hint: '돌리기 전에도 결정 하나가 켜져 있지만, 위쪽 결정은 꺼져 있습니다. 반투명 거울은 돌리지 않습니다.' },
      { name: '반투명 거울 둘', goal: '빨간 빛(△) 한 줄기로 아래쪽 결정 두 개를 모두 밝히세요.', taps: '세 번 돌리면 됩니다.', hint: '반투명 거울 둘을 모두 돌려야 합니다. 맞게 놓여 있는 조각도 하나 있으니 그것은 그대로 둡니다.' },
    ],
    answerLine: '돌린 칸',
    extraTag: '심화',
    appNote: 'PRISM 앱의 15, 16, 17, 18번 판입니다. 반투명 거울은 브라우저의 오늘의 퍼즐에도 자주 나옵니다.',

    page2H: '빛을 둘로 나누는 생각',
    concepts: [
      {
        h: '한 줄기가 두 줄기가 된다',
        body: '반투명 거울에 닿은 빛은 사라지거나 한 줄기만 남지 않고, 곧게 가는 빛과 꺾이는 빛 둘이 됩니다. 두 빛은 처음 빛과 같은 색입니다.',
        q: '1번 판에서 파란 빛이 반투명 거울(D3)에 닿으면 두 줄기가 각각 어느 쪽으로 가나요?',
        lines: 2,
      },
      {
        h: '돌리면 꺾이는 쪽만 바뀐다',
        body: '반투명 거울을 돌리면 꺾이는 빛이 가는 쪽이 바뀝니다. 곧게 가는 빛은 거울을 어느 모양으로 놓아도 그대로 곧게 갑니다. 이 판들에서는 반투명 거울을 돌리지 않아도 되는 때도 많습니다.',
        q: '3번 판에서 돌리기 전에는 어느 결정이 켜져 있나요? 풀린 판에서 그 결정은 반투명 거울에서 갈라진 두 줄기 가운데 어느 쪽 빛으로 켜지나요?',
        lines: 3,
      },
      {
        h: '갈라진 빛이 서로 지나칠 때',
        body: '갈라진 두 줄기가 같은 칸에서 만나도 서로 막지 않고 그대로 지나갑니다. 빛이 꺾이거나 갈라지는 것은 거울이나 반투명 거울이 있는 칸에서뿐입니다.',
        q: '풀린 2번 판에서 갈라진 두 갈래가 다시 만나는 칸은 어디인가요? 그 칸은 무엇으로 채워져 있나요?',
        q2: '그 칸에 거울이 놓여 있었다면 두 갈래에는 어떤 일이 생길까요?',
        lines: 3,
      },
      {
        h: '모든 갈래가 결정에 닿을 필요는 없다',
        body: '빛이 갈라지면 갈래가 늘어납니다. 그 갈래가 모두 결정에 닿아야 하는 것은 아닙니다. 어느 갈래는 판 밖으로 나가 버려도 괜찮습니다.',
        q: '4번 판에서 빛은 반투명 거울을 두 번 만납니다. 풀린 판에서 빛은 모두 몇 줄기로 끝나나요? 그 가운데 결정에 닿는 것은 몇 줄기인가요?',
        q2: '판 밖으로 나가는 줄기는 어느 반투명 거울에서 갈라졌고, 어느 칸들을 지나가나요?',
        lines: 5,
      },
    ],
    qrH: '앱 없이 해 보기',
    qrBody: '휴대폰 카메라로 찍으면 매일 새로 나오는 오늘의 빛 퍼즐을 브라우저에서 바로 풀어 볼 수 있습니다. 반투명 거울이 자주 나옵니다.',
    qrUrl: 'prism.adriven.co/daily',
    curriculum: '반투명 거울은 교과 밖 심화 주제입니다. 바탕이 되는 반사는 초등 5~6학년 「빛의 성질」 단원에서 배웁니다.',
    license: 'CC BY-NC 4.0: 출처(PRISM, 에이드리븐)를 밝히면 비영리로 자유롭게 공유하고 고쳐 쓸 수 있습니다.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: '정답과 풀이',
    answersKicker: '교사용',
    beamLegendH: '정답 그림의 빛',
    beamLegend: { r: '빨강', g: '초록', b: '파랑', tap: '돌리는 횟수' },
    answers: [
      { taps: 'D4 거울을 한 번 돌립니다. D1과 D3은 그대로 둡니다.', path: 'A1에서 오른쪽으로 간 빛이 D1에서 아래로 꺾이고, D3 반투명 거울에서 둘이 됩니다. 오른쪽으로 꺾인 갈래는 E3 결정에 닿습니다. 곧게 내려간 갈래는 D4에서 오른쪽으로 꺾여 E4 결정에 닿습니다.' },
      { taps: 'A5 거울을 한 번 돌립니다. A4, C5, D4는 그대로 둡니다.', path: 'A1에서 내려온 빛이 A4 반투명 거울에서 둘이 됩니다. 오른쪽으로 꺾인 갈래는 B4, C4를 지나 D4에서 위로 꺾여 D1 결정에 닿습니다. 곧게 내려간 갈래는 A5에서 오른쪽으로, C5에서 위로 꺾여 C4(앞의 갈래와 가로지름)를 지나 C1 결정에 닿습니다.' },
      { taps: 'A3과 B4 거울을 한 번씩 돌립니다. B3 반투명 거울은 그대로 둡니다.', path: 'B1에서 내려온 빛이 B3 반투명 거울에서 둘이 됩니다. 왼쪽으로 꺾인 갈래는 A3에서 위로 꺾여 A2 결정에 닿습니다. 곧게 내려간 갈래는 B4에서 왼쪽으로 꺾여 A4 결정에 닿습니다.' },
      { taps: 'A3 거울과 B2, B4 반투명 거울을 한 번씩 돌립니다. A2 거울은 그대로 둡니다.', path: 'E3에서 왼쪽으로 간 빛이 A3에서 위로, A2에서 오른쪽으로 꺾여 B2 반투명 거울에서 둘이 됩니다. 곧게 간 갈래는 C2, D2, E2를 지나 판 밖으로 나갑니다. 아래로 꺾인 갈래는 B3에서 앞의 빛과 가로지른 뒤 B4 반투명 거울에서 또 둘이 되어, 왼쪽 갈래는 A4 결정에, 곧게 내려간 갈래는 B5 결정에 닿습니다.' },
    ],
    conceptAnswersH: '뒷면 답',
    conceptAnswers: [
      '1. 한 줄기는 오른쪽으로 꺾여 E3 결정으로, 한 줄기는 곧게 아래로 D4 거울로 갑니다.',
      '2. A4 결정이 켜져 있습니다. 풀린 판에서는 반투명 거울(B3)에서 곧게 내려가 B4 거울에서 꺾인 갈래의 빛으로 켜집니다. 꺾이는 갈래는 A3 거울을 돌린 뒤 A2 결정을 켭니다.',
      '3. C4 칸이고, 거울 없이 빈칸입니다. 거울이 있었다면 그 칸을 지나던 두 줄기 가운데 두 줄기 모두 그 칸에서 꺾여 다른 곳으로 갔을 것입니다.',
      '4. 세 줄기로 끝납니다. 결정에 닿는 것은 두 줄기(A4, B5)입니다. 나머지 한 줄기는 B2 반투명 거울에서 곧게 간 갈래로, C2, D2, E2를 지나 판 밖으로 나갑니다.',
    ],
  },

  en: {
    pageTitle: 'Splitting Light in Two: a printable beam splitter worksheet',
    navLabel: 'Printable worksheet: Splitting Light in Two',
    desc: 'A free printable worksheet where students follow a beam of light as a beam splitter divides it into two, on four early chapter 2 boards of PRISM, a light puzzle by A Driven. Students draw where each of the two beams goes. Black and white, with an answer key.',
    level: 'Ages 10 to 12 (extension)',
    meta: 'Ages 10 to 12 · 2 A4 pages + 1-page answer key · You need: a pencil',
    intro: [
      'A worksheet built from four early boards of chapter 2, where beam splitters first appear. It has two A4 pages (front and back) for students and a one-page answer key for teachers. On the front, students follow the light as a beam splitter divides it in two and send it to every crystal. On the back, they think about the two beams, the beam that stays straight when you turn the splitter, beams that cross, and branches that never reach a crystal.',
      'It works on a black and white printer: every color of light is also marked with a shape (red △, green □, blue ○).',
      'Beam splitters are an extension topic beyond the standard curriculum. The reflection behind them is taught in upper elementary science. It is easier after the “Steering Light with Mirrors” worksheet.',
      'Licensed CC BY-NC 4.0: you may print, copy, share and adapt it for any non-commercial use, with credit to PRISM by A Driven.',
    ],
    pdf: 'Worksheet PDF (2 A4 pages)',
    answersPdf: 'Answer key PDF (1 A4 page)',
    print: 'Print this page',
    answersLink: 'See the answers →',
    worksheetLink: '← Back to the worksheet',
    guideLink: 'More on each principle: the teacher\'s guide',
    learnLink: 'Concept page: beam splitters',

    kicker: 'PRISM worksheet · Beam splitter basics',
    title: 'Splitting Light in Two',
    subtitle: 'Where the two beams go',
    fields: ['Name', 'Class', 'Date'],
    rulesH: 'How to play',
    rules: [
      'Light leaves the source (the square box) in the direction of its small arrow. It keeps going straight until it meets something.',
      'When light reaches a beam splitter (the piece drawn with two lines), it becomes two beams. One carries on straight the way it came, and one bends 90 degrees like it would off a mirror. Both beams have the same color.',
      'Each tap turns a mirror or a beam splitter 90 degrees, so it swaps between a “/” shape and a “\\” shape. Crystals and sources never move. The board is solved when every crystal (hexagon) receives light of the color drawn inside it.',
    ],
    legendH: 'Key',
    legend: { source: 'Light source', mirror: 'Mirror', splitter: 'Beam splitter', crystal: 'Crystal', r: 'red', g: 'green', b: 'blue' },
    task: 'Circle the pieces you would turn, then draw the path of the light from the source to the crystals in pencil. When the light splits, draw both beams.',
    boards: [
      { name: 'One beam splitter', goal: 'Light both crystals with the one blue beam (○).', taps: 'It takes one tap.', hint: 'One crystal is already lit before you turn anything. Follow where the two beams from the beam splitter go.' },
      { name: 'Two beams that meet', goal: 'Light both crystals with the one green beam (□).', taps: 'It takes one tap.', hint: 'One of the two beams from the beam splitter is already going the right way. Follow the one that stays straight.' },
      { name: 'Only one crystal is lit', goal: 'Light both crystals with the one green beam (□).', taps: 'It takes two taps.', hint: 'One crystal is lit before you turn anything, but the one at the top is dark. You do not turn the beam splitter.' },
      { name: 'Two beam splitters', goal: 'Light both crystals at the bottom with the one red beam (△).', taps: 'It takes three taps.', hint: 'You have to turn both beam splitters. One piece already starts out the right way, so leave it alone.' },
    ],
    answerLine: 'Pieces turned',
    extraTag: 'Extension',
    appNote: 'These are levels 15, 16, 17 and 18 of the PRISM app. Beam splitters also show up often in the daily puzzle in the browser.',

    page2H: 'Ways of thinking about splitting light',
    concepts: [
      {
        h: 'One beam becomes two',
        body: 'Light that reaches a beam splitter does not disappear and does not turn into just one beam. It becomes two: one that goes straight and one that bends. Both are the color of the light that came in.',
        q: 'On board 1, when the blue light reaches the beam splitter in D3, which way does each of the two beams go?',
        lines: 2,
      },
      {
        h: 'Turning changes only the bending beam',
        body: 'When you turn a beam splitter, the beam that bends goes the other way. The beam that goes straight keeps going straight whichever way the splitter is turned. On these boards you often do not need to turn the beam splitter at all.',
        q: 'On board 3, which crystal is lit before you turn anything? On the solved board, which of the two beams from the beam splitter lights that crystal?',
        lines: 3,
      },
      {
        h: 'When split beams cross',
        body: 'When two split beams meet in a cell, they do not block each other and each carries on as it was. Light bends or splits only in a cell that holds a mirror or a beam splitter.',
        q: 'On the solved board 2, the two branches from the splitter meet again in one cell. Which cell is it, and what fills it?',
        q2: 'What would happen to the two beams if a mirror stood in that cell?',
        lines: 3,
      },
      {
        h: 'Not every branch has to reach a crystal',
        body: 'Each split adds a branch. Not every branch has to end on a crystal. One may simply leave the board.',
        q: 'On board 4 the light meets a beam splitter twice. On the solved board, how many beams does the light end up as? How many of them reach a crystal?',
        q2: 'Which beam splitter does the beam that leaves the board split off from, and which cells does it pass through?',
        lines: 5,
      },
    ],
    qrH: 'Try it without the app',
    qrBody: 'Scan with a phone camera to play the daily light puzzle, a new set of three every day, right in the browser. Beam splitters come up often.',
    qrUrl: 'prism.adriven.co/daily',
    curriculum: 'Beam splitters are an extension topic. The reflection behind them is taught in upper elementary science.',
    license: 'CC BY-NC 4.0: share and adapt for non-commercial use, with credit to PRISM by A Driven.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: 'Answers and explanations',
    answersKicker: 'For teachers',
    beamLegendH: 'Light in the answer diagrams',
    beamLegend: { r: 'red', g: 'green', b: 'blue', tap: 'number of taps' },
    answers: [
      { taps: 'Turn the mirror in D4 once. Leave D1 and D3 alone.', path: 'The light going right from A1 bends down at D1 and splits at the beam splitter in D3. The beam that bends right reaches the crystal at E3. The beam that goes straight down bends right at D4 and reaches the crystal at E4.' },
      { taps: 'Turn the mirror in A5 once. Leave A4, C5 and D4 alone.', path: 'The light coming down from A1 splits at the beam splitter in A4. The beam that bends right passes B4 and C4, bends up at D4 and reaches the crystal at D1. The beam that goes straight down bends right at A5 and up at C5, passes C4 (crossing the first beam) and reaches the crystal at C1.' },
      { taps: 'Turn the mirrors in A3 and B4 once each. Leave the beam splitter in B3 alone.', path: 'The light coming down from B1 splits at the beam splitter in B3. The beam that bends left bends up at A3 and reaches the crystal at A2. The beam that goes straight down bends left at B4 and reaches the crystal at A4.' },
      { taps: 'Turn the mirror in A3 and the beam splitters in B2 and B4 once each. Leave the mirror in A2 alone.', path: 'The light going left from E3 bends up at A3 and right at A2, then splits at the beam splitter in B2. The beam that goes straight passes C2, D2 and E2 and leaves the board. The beam that bends down crosses the first beam in B3 and splits again at the beam splitter in B4: the beam that bends left reaches the crystal at A4, and the beam that goes straight down reaches the crystal at B5.' },
    ],
    conceptAnswersH: 'Back page answers',
    conceptAnswers: [
      '1. One beam bends right and reaches the crystal at E3. The other goes straight down to the mirror in D4.',
      '2. The crystal at A4. On the solved board it is lit by the beam that goes straight down from the beam splitter (B3) and bends at the mirror in B4. The beam that bends left, after the mirror in A3 is turned, lights the crystal at A2.',
      '3. In C4, which is an empty cell with no mirror. With a mirror there, both beams passing through would have bent in that cell and gone somewhere else.',
      '4. Three beams. Two reach a crystal (A4 and B5). The third is the beam that goes straight on at the beam splitter in B2: it passes C2, D2 and E2 and leaves the board.',
    ],
  },
};

export default {
  slug: 'beam-splitter-basics',
  /** 마지막으로 고친 날. sitemap lastmod와 JSON-LD dateModified. 문구·판을 고치면 같이 고친다. */
  updated: '2026-11-27',
  boards: BOARDS,
  /** 기호 설명 아이콘을 잘라 올 판 칸: [판 번호, 열, 행]. 여기 적은 것만 기호 설명에 나온다. */
  legendCells: {
    source: [15, 'A', 1],
    mirror: [15, 'D', 1],
    splitter: [15, 'D', 3],
    crystal: [15, 'E', 3],
  },
  /** 이 학습지에 나오는 빛의 색(기호 설명과 정답 그림 설명에 이것만 보인다). */
  colors: ['r', 'g', 'b'],
  /** 이어지는 개념 페이지(`/learn/<slug>/`). */
  learn: 'beam-splitter',
  text: TEXT,
};
