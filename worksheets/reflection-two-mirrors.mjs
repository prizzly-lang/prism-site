/**
 * 학습지 A2 「거울 두 장으로 빛 돌리기」(`/worksheets/reflection-two-mirrors/`)의 판과 한·영 문구.
 * 시리즈 A(챕터 연습)의 둘째 장: 1챕터 「반사」 중급. 그리는 쪽은 `worksheet-page.mjs`.
 *
 * ## 판
 * 앱 6, 7, 8, 9번 판(1~5번은 「빛의 길 찾기」와 A1이 썼고, 10~14번은 A3 몫이다). prism 저장소
 * `tools/make-worksheet-boards.ts --sheet reflection-two-mirrors --site ../prism-site`가 엔진으로
 * 그리고 정답이 하나뿐인지, 탭 합이 par와 같은지 확인한다. 아래 길 설명은 정답 그림을 보고 적었다.
 *   6번: E5 광원(왼쪽으로) → B5 「\」에서 위로 → B2 「/」에서 오른쪽으로 → D2 「\」에서 아래로 →
 *        D3 「\」에서 오른쪽으로 → E3 결정. 네 번 꺾임. 돌리기 전에는 B5 「/」가 빛을 아래로 보내 판 밖.
 *   7번: A2 광원(오른쪽으로) → C2 「/」에서 위로 → C1 결정(처음부터 켜져 있다).
 *        E1 광원(아래로) → E4 「/」에서 왼쪽으로 → C4 「/」에서 아래로 → C5 결정.
 *        돌리기 전에는 E4 「\」가 빛을 오른쪽으로 보내 판 밖.
 *   8번: B5 광원(위로) → B2 「\」에서 왼쪽으로 → A2 「/」에서 아래로 → A4 「\」에서 오른쪽으로 →
 *        B4 빈칸을 가로질러 → E4 결정. 세 번 꺾임.
 *   9번: A1 광원(오른쪽으로) → D1 「\」에서 아래로 → D5 「\」에서 오른쪽으로 → E5 「/」에서 위로 →
 *        E1 결정. 세 번 꺾임.
 *
 * ## 거울 두 장 규칙 (2번 문항의 표)
 * 「/」는 오른쪽↔위, 왼쪽↔아래를 바꾸고 「\」는 오른쪽↔아래, 왼쪽↔위를 바꾼다. 그래서 같은 쪽으로
 * 기운 두 장을 차례로 만나면 처음 방향으로 돌아오고(잠망경), 다른 쪽으로 기운 두 장을 차례로
 * 만나면 반대 방향이 된다(되돌아가는 빛). 실제 거울도 같다: 나란한 두 장은 방향을 지키고,
 * 직각으로 놓인 두 장은 빛을 온 쪽으로 돌려보낸다.
 *
 * ## 교육과정 (prism 저장소 docs/WORKSHEETS.md 4절)
 * - 초5~6 [6과02-02]: 빛의 직진·반사 현상. 각도 규칙은 묻지 않고 「어느 쪽으로 가나」만 묻는다.
 * - 초5~6 [6과02-03]: 거울을 이용한 도구. 잠망경을 여기에 잇는다.
 * - 영어판: NGSS 4-PS4-2, 영국 KS2 Light(Year 6, 잠망경은 비법정 예시)에 「connects to」로만 잇는다.
 * - 성취기준 원문 문장은 옮기지 않았다.
 *
 * ## 삽화
 * 2번 문항 옆 잠망경 단면도(ch2.webp)는 삽화 창고의 `periscope-two-mirrors`. 모델이 그린 삽화가
 * 아니라 계산한 선 도면이다(prism 저장소 worksheet/art/prompts/periscope_ref.py: 나란한 45도 거울
 * 두 장, 나가는 빛이 들어온 빛과 같은 방향). 2026-11-20 무인 실행에서 gcloud 재로그인이 필요해
 * 동판화풍 삽화는 만들지 못했다.
 *
 * ## 쓰지 않은 것
 * 가격. 입사각·반사각(A1의 「중학교 미리 보기」와 개념 페이지가 다룬다). 뒷면 문항은 A1, 「빛의 길
 * 찾기」, 개념 페이지 「빛의 반사」의 문장을 되풀이하지 않고 새로 썼다. 「푸는 방법」과 화면 머리말은
 * 학습지 공통 틀이다. 자전거 반사판은 실제로는 직각으로 만나는 면 셋을 쓰지만, 여기서는 「직각으로
 * 만나는 작은 거울면」이라고만 적었다(면의 개수를 틀리게 말하지 않는다).
 *
 * ## 검수 (2026-11-20, 다른 에이전트)
 * 보류 3건을 고쳤다: 2번 본문은 「풀린 1번 판」이어야 한다(처음에는 D2가 「/」), 3번 문항은 3번 판에서
 * A2·A4도 답이 되어 「위로 가던 빛을 아래로」로 좁혔다, 잠망경 도면 뒤의 회색 바탕을 없앴다.
 */

const BOARDS = [
  { id: 6, chapter: 1, taps: { D2: 1, B5: 1 } },
  { id: 7, chapter: 1, taps: { C4: 1, E4: 1 } },
  { id: 8, chapter: 1, taps: { A2: 1, B2: 1, A4: 1 } },
  { id: 9, chapter: 1, taps: { D1: 1, D5: 1, E5: 1 } },
];

const TEXT = {
  ko: {
    pageTitle: '거울 두 장으로 빛 돌리기: 빛의 반사 학습지 (인쇄용)',
    navLabel: '인쇄용 학습지: 거울 두 장으로 빛 돌리기',
    desc: '빛이 거울에 여러 번 반사되는 길을 연필로 그려 보는 무료 인쇄용 학습지입니다. 에이드리븐의 광학 퍼즐 게임 PRISM 1챕터의 판 네 개로, 나란한 거울 두 장이 잠망경처럼 빛을 옮기는 것과 서로 다른 쪽으로 기운 거울 두 장이 빛을 되돌려 보내는 것을 알아봅니다. 흑백 인쇄용, 정답지 포함.',
    level: '초등 5~6학년',
    meta: '초등 5~6학년 · A4 2쪽 + 정답지 1쪽 · 준비물: 연필',
    intro: [
      '거울이 서너 개 놓인 판 네 개로 만든 학습지입니다. A4 한 장(앞뒤 2쪽)과 교사용 정답지 한 장입니다. 앞면에서는 거울을 돌려 빛을 결정까지 보내고, 뒷면에서는 거울 두 장이 짝을 이루면 빛의 방향이 어떻게 되는지 알아봅니다.',
      '흑백으로 인쇄해도 풀 수 있습니다. 빛의 색은 도형으로도 표시되어 있습니다(빨강 △, 초록 □).',
      '초등 5~6학년 「빛의 성질」 단원에서 빛의 반사와 거울을 이용한 도구를 배울 때 쓰기 좋습니다(2022 개정 [6과02-02], [6과02-03] 관련). 「거울로 빛 보내기」 학습지를 먼저 풀었다면 더 쉽습니다.',
      'CC BY-NC 4.0으로 공개합니다. 출처(PRISM, 에이드리븐)를 밝히면 돈을 받지 않는 범위에서 자유롭게 인쇄·복사·공유하고 고쳐 쓸 수 있습니다.',
    ],
    pdf: '학습지 PDF (A4 2쪽)',
    answersPdf: '정답지 PDF (A4 1쪽)',
    print: '이 화면 인쇄하기',
    answersLink: '정답과 풀이 보기 →',
    worksheetLink: '← 학습지로',
    guideLink: '챕터별 원리를 더 자세히: 교사용 안내 글',
    learnLink: '개념 설명: 빛의 반사',

    kicker: 'PRISM 학습지 · 반사 중급',
    title: '거울 두 장으로 빛 돌리기',
    subtitle: '여러 번 반사되는 빛의 길',
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
      { name: '거울 네 개', goal: '초록 빛(□)을 초록 결정까지 보내세요.', taps: '두 번 돌리면 됩니다.', hint: '빛은 거울 네 개를 모두 거칩니다. 그 가운데 둘은 이미 맞게 놓여 있습니다.' },
      { name: '광원 둘, 결정 둘', goal: '빨간 빛(△) 두 줄기로 결정 두 개를 모두 밝히세요.', taps: '두 번 돌리면 됩니다.', hint: '결정 하나에는 처음부터 빛이 닿아 있습니다.' },
      { name: '올라갔다 내려오기', goal: '초록 빛을 오른쪽 끝의 결정까지 보내세요.', taps: '세 번 돌리면 됩니다.', hint: '위로 올라간 빛이 옆줄로 옮겨 가서 다시 내려와야 합니다.' },
      { name: '돌아서 가는 길', goal: '초록 빛을 광원과 같은 줄에 있는 결정까지 보내세요.', taps: '세 번 돌리면 됩니다.', hint: '이 판의 거울은 빛을 통과시키지 않습니다. 돌아서 가는 길을 찾으세요.' },
    ],
    answerLine: '돌린 칸',
    extraTag: '심화',
    appNote: 'PRISM 앱의 6, 7, 8, 9번 판입니다. 브라우저 체험판에서도 풀 수 있습니다.',

    page2H: '거울 두 장이 짝을 이루면',
    concepts: [
      {
        h: '거울을 만나는 순서',
        body: '거울이 여러 개인 판에서는 빛이 어느 거울을 먼저 만나는지가 중요합니다. 앞의 거울이 빛을 보낸 곳에 다음 거울이 있어야 길이 이어집니다.',
        q: '풀린 1번 판에서 빛이 만나는 거울을 순서대로 칸 이름으로 쓰세요. 빛은 모두 몇 번 꺾였나요?',
        lines: 3,
      },
      {
        h: '같은 쪽으로 기운 두 장: 잠망경',
        body: '풀린 1번 판에서 D2와 D3 거울은 같은 쪽으로 기울어 있습니다. 오른쪽으로 가던 빛은 두 거울을 만난 뒤에도 오른쪽으로 갑니다. 방향은 그대로이고 줄만 한 칸 아래로 옮겨졌습니다. 잠망경(위 그림)은 이렇게 나란히 놓은 거울 두 장으로 빛을 옮겨서, 잠수함 안에서도 물 위를 볼 수 있게 합니다.',
        q: '거울 두 장을 차례로 만난 빛은 어느 쪽으로 갈까요? 위, 아래, 왼쪽, 오른쪽 가운데 골라 쓰세요.',
        sign: '→',
        artTall: true,
        table: [
          ['오른쪽으로 가던 빛이 「\\」 다음에 「\\」를 만나면', ''],
          ['오른쪽으로 가던 빛이 「\\」 다음에 「/」를 만나면', ''],
          ['위로 가던 빛이 「/」 다음에 「/」를 만나면', ''],
          ['위로 가던 빛이 「\\」 다음에 「/」를 만나면', ''],
        ],
      },
      {
        h: '다른 쪽으로 기운 두 장: 되돌아가는 빛',
        body: '「/」와 「\\」처럼 서로 다른 쪽으로 기운 거울 두 장을 차례로 만나면, 빛은 왔던 쪽으로 되돌아갑니다. 자전거 뒤의 반사판에는 거울처럼 빛을 되비추는 작은 면들이 직각으로 맞물려 가득 들어 있어서, 자동차 불빛을 온 쪽으로 돌려보냅니다.',
        q: '풀린 3번 판에는 위로 가던 빛을 아래로 되돌려 보낸 거울 두 개가, 풀린 4번 판에는 아래로 가던 빛을 위로 되돌려 보낸 거울 두 개가 있습니다. 어느 칸에 있나요?',
        blanks: ['3번 판', '4번 판'],
        q2: '4번 판의 결정은 D1 거울 바로 옆에 있습니다. 그런데도 빛이 먼 길을 돌아서 가야 하는 까닭은 무엇일까요?',
        lines: 2,
      },
      {
        h: '빛줄기가 둘일 때',
        body: '광원이 둘이면 빛줄기도 둘입니다. 거울 하나를 돌리면 그 거울을 만나는 빛줄기의 길만 바뀝니다.',
        q: '2번 판에서 처음부터 빛이 닿아 있던 결정은 어느 칸에 있나요? 그 빛은 어느 칸의 광원에서 왔나요?',
        q2: '풀린 2번 판에서 C2 거울을 한 번 돌리면 두 결정은 각각 어떻게 될까요?',
        extra: true,
        lines: 5,
      },
    ],
    qrH: '앱 없이 해 보기',
    qrBody: '휴대폰 카메라로 찍으면 이 학습지의 판이 들어 있는 1챕터 14판을 브라우저에서 바로 풀 수 있습니다.',
    qrUrl: 'prism.adriven.co/play',
    curriculum: '초등 5~6학년 「빛의 성질」 단원(빛의 반사, 거울을 이용한 도구)과 함께 쓸 수 있습니다.',
    license: 'CC BY-NC 4.0: 출처(PRISM, 에이드리븐)를 밝히면 비영리로 자유롭게 공유하고 고쳐 쓸 수 있습니다.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: '정답과 풀이',
    answersKicker: '교사용',
    beamLegendH: '정답 그림의 빛',
    beamLegend: { r: '빨강', g: '초록', tap: '돌리는 횟수' },
    answers: [
      { taps: 'B5와 D2를 한 번씩 돌립니다. B2와 D3은 그대로 둡니다.', path: '왼쪽으로 가던 빛이 B5에서 위로, B2에서 오른쪽으로, D2에서 아래로, D3에서 다시 오른쪽으로 꺾여 E3 결정에 닿습니다.' },
      { taps: 'C4와 E4를 한 번씩 돌립니다. C2는 그대로 둡니다.', path: 'E1에서 내려온 빛이 E4에서 왼쪽으로, C4에서 아래로 꺾여 C5 결정에 닿습니다. A2에서 나온 빛은 C2에서 위로 꺾여 C1 결정에 닿습니다.' },
      { taps: 'A2, B2, A4를 한 번씩 돌립니다.', path: '위로 가던 빛이 B2에서 왼쪽으로, A2에서 아래로, A4에서 오른쪽으로 꺾입니다. B4에서 자기 길을 가로질러 E4 결정에 닿습니다.' },
      { taps: 'D1, D5, E5를 한 번씩 돌립니다.', path: '오른쪽으로 가던 빛이 D1에서 아래로, D5에서 오른쪽으로, E5에서 위로 꺾여 E1 결정에 닿습니다.' },
    ],
    conceptAnswersH: '뒷면 답',
    conceptAnswers: [
      '1. B5, B2, D2, D3 순서로 만나고 네 번 꺾였습니다.',
      '2. 차례로 오른쪽, 왼쪽, 위, 아래. 같은 쪽으로 기운 두 장을 만나면 처음 방향 그대로이고, 다른 쪽으로 기운 두 장을 만나면 반대 방향이 됩니다.',
      '3. 3번 판은 B2와 A2(위로 가던 빛이 아래로), 4번 판은 D5와 E5(아래로 가던 빛이 위로). 거울은 빛을 통과시키지 않기 때문입니다. D1 거울은 오른쪽으로 가던 빛을 위나 아래로만 보낼 수 있고, 오른쪽에 있는 결정 쪽으로는 보내지 못합니다.',
      '4. C1 결정이고, A2 광원에서 온 빛입니다. C2를 돌리면 A2에서 온 빛이 C2에서 아래로, C4에서 왼쪽으로 꺾여 판 밖으로 나갑니다. C1 결정은 꺼지고 C5 결정은 그대로 켜져 있습니다.',
    ],
  },

  en: {
    pageTitle: 'Light Around Corners: a printable worksheet on reflection with two mirrors',
    navLabel: 'Printable worksheet: Light Around Corners',
    desc: 'A free printable worksheet on light that reflects several times. On four boards from chapter 1 of PRISM, a light puzzle by A Driven, students find out how two parallel mirrors shift a beam like a periscope and how two mirrors at right angles send it back. Black and white, with an answer key.',
    level: 'Ages 9 to 12',
    meta: 'Ages 9 to 12 · 2 A4 pages + 1-page answer key · You need: a pencil',
    intro: [
      'A worksheet built from four boards with three or four mirrors each. It has two A4 pages (front and back) for students and a one-page answer key for teachers. On the front, students turn mirrors to send light to the crystals. On the back, they work out what happens to the direction of light when two mirrors act as a pair.',
      'It works on a black and white printer: every color of light is also marked with a shape (red △, green □).',
      'For ages about 9 to 12, in a unit on reflection and on tools that use mirrors. Connects to NGSS 4-PS4-2 (US) and KS2 Light, Year 6 (England). It is easier after the “Steering Light with Mirrors” worksheet.',
      'Licensed CC BY-NC 4.0: you may print, copy, share and adapt it for any non-commercial use, with credit to PRISM by A Driven.',
    ],
    pdf: 'Worksheet PDF (2 A4 pages)',
    answersPdf: 'Answer key PDF (1 A4 page)',
    print: 'Print this page',
    answersLink: 'See the answers →',
    worksheetLink: '← Back to the worksheet',
    guideLink: 'More on each principle: the teacher\'s guide',
    learnLink: 'Concept page: reflection of light',

    kicker: 'PRISM worksheet · Reflection, level 2',
    title: 'Light Around Corners',
    subtitle: 'Paths with several reflections',
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
      { name: 'Four mirrors', goal: 'Send the green light (□) to the green crystal.', taps: 'It takes two taps.', hint: 'The light visits all four mirrors. Two of them are already set the right way.' },
      { name: 'Two sources, two crystals', goal: 'Light both crystals with the two red beams (△).', taps: 'It takes two taps.', hint: 'One crystal is lit from the start.' },
      { name: 'Up and back down', goal: 'Send the green light to the crystal at the right edge.', taps: 'It takes three taps.', hint: 'The light goes up, moves over to the next column and has to come back down.' },
      { name: 'The long way round', goal: 'Send the green light to the crystal in the same row as the source.', taps: 'It takes three taps.', hint: 'Light cannot pass through these mirrors. Look for a way around.' },
    ],
    answerLine: 'Pieces turned',
    extraTag: 'Extension',
    appNote: 'These are levels 6, 7, 8 and 9 of the PRISM app. You can also play them in the browser demo.',

    page2H: 'When two mirrors work as a pair',
    concepts: [
      {
        h: 'The order of the mirrors',
        body: 'On a board with several mirrors, it matters which mirror the light meets first. The path only carries on if the next mirror stands where the mirror before it sends the light.',
        q: 'On the solved board 1, list the mirrors the light meets, in order, by cell name. How many times does the light bend in all?',
        lines: 3,
      },
      {
        h: 'Two mirrors leaning the same way: a periscope',
        body: 'On the solved board 1, the mirrors at D2 and D3 lean the same way. Light heading right is still heading right after it has met both. Its direction is unchanged, and it has only moved down one row. A periscope (pictured above) uses two parallel mirrors like these to shift light, so the crew of a submarine can see above the water.',
        q: 'Which way does the light go after it has met both mirrors? Write up, down, left or right.',
        sign: '→',
        artTall: true,
        table: [
          ['Light heading right meets “\\” and then “\\”', ''],
          ['Light heading right meets “\\” and then “/”', ''],
          ['Light heading up meets “/” and then “/”', ''],
          ['Light heading up meets “\\” and then “/”', ''],
        ],
      },
      {
        h: 'Two mirrors leaning opposite ways: light sent back',
        body: 'When light meets two mirrors that lean opposite ways, like “/” and “\\”, it ends up heading back the way it came. The reflector on the back of a bicycle is packed with tiny faces that meet at right angles and act like mirrors, so it sends the light of a car back toward the car.',
        q: 'On the solved boards, two mirrors turn the light right around: from up to down on board 3, from down to up on board 4. Which cells are they in?',
        blanks: ['Board 3', 'Board 4'],
        q2: 'On board 4 the crystal is right next to the mirror at D1. Why does the light still have to go the long way round?',
        lines: 2,
      },
      {
        h: 'Two beams at once',
        body: 'Two sources make two beams. Turning a mirror only changes the path of a beam that meets that mirror.',
        q: 'On board 2, which cell holds the crystal that is lit from the start? Which cell holds the source of that light?',
        q2: 'On the solved board 2, what happens to each crystal if you turn the mirror at C2 once?',
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
      { taps: 'Turn B5 and D2 once each. Leave B2 and D3 alone.', path: 'The light heading left bends up at B5, right at B2, down at D2 and right again at D3, reaching the crystal at E3.' },
      { taps: 'Turn C4 and E4 once each. Leave C2 alone.', path: 'The light coming down from E1 bends left at E4 and down at C4, reaching the crystal at C5. The light from A2 bends up at C2 and reaches the crystal at C1.' },
      { taps: 'Turn A2, B2 and A4 once each.', path: 'The light heading up bends left at B2, down at A2 and right at A4. It crosses its own path at B4 and reaches the crystal at E4.' },
      { taps: 'Turn D1, D5 and E5 once each.', path: 'The light heading right bends down at D1, right at D5 and up at E5, reaching the crystal at E1.' },
    ],
    conceptAnswersH: 'Back page answers',
    conceptAnswers: [
      '1. B5, B2, D2, D3, in that order. It bends four times.',
      '2. In order: right, left, up, down. After two mirrors leaning the same way the light keeps its first direction. After two mirrors leaning opposite ways it heads the opposite way.',
      '3. Board 3: B2 and A2 (light heading up ends up heading down). Board 4: D5 and E5 (light heading down ends up heading up). Light cannot pass through a mirror. The mirror at D1 can only turn light arriving from the left upward or downward, never on to the crystal behind it.',
      '4. The crystal at C1, lit by the source at A2. With C2 turned, the light from A2 bends down at C2 and left at C4, then leaves the board. The crystal at C1 goes dark and the crystal at C5 stays lit.',
    ],
  },
};

export default {
  slug: 'reflection-two-mirrors',
  /** 마지막으로 고친 날. sitemap lastmod와 JSON-LD dateModified. 문구·판을 고치면 같이 고친다. */
  updated: '2026-11-20',
  boards: BOARDS,
  /** 기호 설명 아이콘을 잘라 올 판 칸: [판 번호, 열, 행]. 여기 적은 것만 기호 설명에 나온다. */
  legendCells: {
    source: [6, 'E', 5],
    mirror: [6, 'B', 2],
    crystal: [6, 'E', 3],
  },
  /** 이 학습지에 나오는 빛의 색(기호 설명과 정답 그림 설명에 이것만 보인다). */
  colors: ['r', 'g'],
  /** 이어지는 개념 페이지(`/learn/<slug>/`). */
  learn: 'reflection',
  text: TEXT,
};
