/**
 * 인쇄용 학습지 「빛의 길 찾기」의 문구. 그리는 쪽은 `worksheet-page.mjs`.
 *
 * ## 판
 * 판 그림·정답 그림·탭 목록은 prism 저장소의 `tools/make-worksheet-boards.ts`가
 * 게임 엔진으로 만들어 `worksheet/assets/`로 넘긴다(`--site ../prism-site`). 정답은
 * 엔진이 푼 결과이고, 그 도구가 정답이 하나뿐인지와 탭 수가 par와 같은지 확인한다.
 * 아래 `boards`의 문구(몇 번 돌리는지, 어느 칸인지)는 그 boards.json과 같아야 한다.
 * `worksheet-page.mjs`가 빌드할 때 대조하고 어긋나면 멈춘다.
 *
 * ## 교육과정 표기 (2026-11-10 조사)
 * - 한국 2022 개정: 초5~6 「빛의 성질」 [6과02-02]는 빛의 직진·반사·굴절 **현상**을 관찰하고
 *   각도 규칙은 다루지 않는다. 입사각 = 반사각(반사 법칙)은 중학교 [9과10-01]부터, [9과10-02]는
 *   그 법칙으로 평면거울의 상을 설명한다(11/10 검수에서 [9과10-02]로 잘못 적은 것을 바로잡음).
 *   그래서 반사 문항은 각도 규칙 없이 내고, 규칙은 「중학교 미리 보기」로 따로 둔다.
 * - 빛의 합성은 중학교 [9과10-03]에만 있다. 프리즘은 초·중에 없고(고1 탐구 활동),
 *   반투명 거울은 어느 나라에도 직접 맞는 기준이 없다. 둘은 「심화」로 표시한다.
 * - 영어판은 NGSS 4-PS4-2, MS-PS4-2, 영국 KS2 Light·KS3 Light waves와 「connects to」로만
 *   잇는다. 색 섞기는 영미 기준에 없으므로 기준 코드 옆에 두지 않는다.
 * 출처: 교육부 고시 제2022-33호 [별책 9] 과학과 교육과정, nextgenscience.org, gov.uk
 * National curriculum in England: science programmes of study.
 *
 * ## 가격을 쓰지 않는다
 * 학습지는 오래 돌아다닌다. 1.5와 1.6의 판매 방식이 다르고 앞으로도 바뀔 수 있다.
 * 앱 없이 해 볼 수 있는 체험판 주소만 쓴다.
 */

/** 정답과 맞춰 볼 사실. worksheet-page.mjs가 boards.json과 대조한다. */
export const BOARDS = [
  { id: 3, chapter: 1, taps: { A3: 1, C5: 1 } },
  { id: 22, chapter: 2, taps: { A4: 1, C4: 1, D4: 1 } },
  { id: 49, chapter: 3, taps: { D4: 1, D5: 1 } },
  { id: 92, chapter: 4, taps: { D3: 1, F4: 1 } },
];

export const WS = {
  ko: {
    pageTitle: '빛의 길 찾기: 인쇄용 광학 학습지 (반사·프리즘·빛의 합성)',
    navLabel: '인쇄용 학습지: 빛의 길 찾기',
    desc: '광학 퍼즐 게임 PRISM의 판 네 개로 만든 무료 인쇄용 학습지입니다. 거울의 반사, 반투명 거울, 프리즘, 빛의 합성을 연필로 풀어 봅니다. 흑백 인쇄용이고 정답지가 따로 있습니다. 초등 5~6학년 「빛의 성질」, 중학교 「빛과 파동」 단원과 함께 쓸 수 있습니다.',
    list: {
      title: '인쇄용 광학 학습지',
      desc: '광학 퍼즐 게임 PRISM의 판으로 만든 무료 인쇄용 학습지 모음입니다. 반사, 반투명 거울, 프리즘, 빛의 합성을 연필로 풀어 봅니다. 흑백 인쇄용이고 정답지가 따로 있습니다.',
      lead: '교실과 가정에서 바로 인쇄해 쓰는 A4 학습지입니다. 흑백으로 인쇄해도 풀 수 있고, 교사용 정답지가 따로 있습니다.',
      meta: '초등 5~6학년 · 중학교 · A4 2쪽 + 정답지 1쪽 · 준비물: 연필',
    },
    intro: [
      'A4 두 장(앞뒤)짜리 학습지와 교사용 정답지 한 장입니다. 앞면에서는 PRISM 게임의 판 네 개를 연필로 풀고, 뒷면에서는 그 판에 숨은 빛의 성질을 질문으로 짚습니다.',
      '흑백으로 인쇄해도 풀 수 있습니다. 빛의 색은 도형으로도 표시되어 있습니다(빨강 △, 초록 □, 파랑 ○).',
      '초등 5~6학년 「빛의 성질」, 중학교 「빛과 파동」 단원과 함께 쓸 수 있습니다(2022 개정 [6과02-02], [9과10-01]~[9과10-03] 관련). 반투명 거울과 프리즘은 교과 밖 심화 내용입니다.',
      '교실과 가정에서 자유롭게 인쇄하고 복사해 쓰셔도 됩니다.',
    ],
    pdf: '학습지 PDF (A4 2쪽)',
    answersPdf: '정답지 PDF (A4 1쪽)',
    print: '이 화면 인쇄하기',
    answersLink: '정답과 풀이 보기 →',
    worksheetLink: '← 학습지로',
    guideLink: '챕터별 원리를 더 자세히: 교사용 안내 글',

    kicker: 'PRISM 학습지',
    title: '빛의 길 찾기',
    subtitle: '반사 · 반투명 거울 · 프리즘 · 빛의 합성',
    fields: ['이름', '학년·반', '날짜'],
    rulesH: '푸는 방법',
    rules: [
      '광원(네모 상자)에서 작은 화살표 방향으로 빛이 나갑니다.',
      '거울, 반투명 거울, 프리즘은 한 번 돌릴 때마다 시계 방향으로 90도 돌아갑니다. 결정과 광원은 움직이지 않습니다.',
      '모든 결정(육각형)에 그 안에 그려진 색의 빛이 닿으면 풀린 것입니다.',
    ],
    legendH: '기호',
    legend: {
      source: '광원',
      white: '흰 빛 광원',
      mirror: '거울',
      splitter: '반투명 거울',
      prism: '프리즘',
      crystal: '결정',
      r: '빨강',
      g: '초록',
      b: '파랑',
    },
    task: '돌려야 할 조각에 동그라미를 치고, 빛이 가는 길을 연필로 그려 보세요.',
    boards: [
      { name: '반사', goal: '파란 빛을 파란 결정까지 보내세요.', taps: '두 번 돌리면 됩니다.', hint: '거울 하나는 이미 맞게 놓여 있습니다.' },
      { name: '반투명 거울', extra: true, goal: '빨간 빛 하나로 빨간 결정 세 개를 모두 켜세요.', taps: '세 번 돌리면 됩니다.', hint: '반투명 거울은 빛을 통과시키면서 동시에 반사합니다.' },
      { name: '프리즘', extra: true, goal: '흰 빛을 프리즘으로 나눠 초록 결정과 빨간 결정을 켜세요.', taps: '두 번 돌리면 됩니다.', hint: '흰 빛은 프리즘의 굵은 밑면으로 들어가야 갈라집니다.' },
      { name: '빛의 합성', goal: '청록 결정(□○)에는 초록 빛과 파란 빛이 함께 닿아야 합니다.', taps: '두 번 돌리면 됩니다.', hint: '초록 결정(□)도 잊지 마세요.' },
    ],
    answerLine: '돌린 칸',
    extraTag: '심화',
    appNote: '이 판들은 PRISM 앱의 3, 22, 49, 92번 판입니다.',

    page2H: '판 속에 숨은 빛의 성질',
    concepts: [
      {
        h: '반사',
        body: '거울에 비스듬히 들어온 빛은 반대쪽으로 튕겨 나갑니다. 잠망경은 거울 두 장으로 빛의 길을 두 번 꺾어, 담 너머를 볼 수 있게 합니다.',
        q: '1번 판에서 빛은 결정에 닿기까지 몇 번 꺾였나요? 한 번 꺾일 때마다 몇 도씩 방향이 바뀌었나요?',
        lines: 2,
        preview: {
          h: '중학교 미리 보기',
          body: '거울에 닿는 빛이 거울면에 수직인 선(법선)과 이루는 각(입사각)과, 튕겨 나가는 빛이 이루는 각(반사각)은 같습니다. 45도로 놓인 거울에서 빛이 90도 꺾이는 까닭입니다.',
        },
      },
      {
        h: '반투명 거울',
        extra: true,
        body: '유리에 은을 아주 얇게 입히면 빛의 절반은 통과하고 절반은 반사됩니다. 중력파를 처음 찾아낸 LIGO 실험 장치의 핵심 부품입니다.',
        q: '2번 판에서 결정 E3, C2, A5에 닿는 빛의 밝기는 각각 처음 빛의 얼마일까요? (유리가 빛을 흡수하는 것은 생각하지 않습니다.)',
        blanks: ['E3', 'C2', 'A5'],
      },
      {
        h: '프리즘',
        extra: true,
        body: '흰 빛은 여러 색이 섞인 빛입니다. 프리즘을 지나면 색마다 꺾이는 정도가 달라 갈라지는데, 빨강이 가장 적게, 파랑과 보라가 가장 많이 꺾입니다. 뉴턴이 이 실험으로 흰 빛이 여러 색의 합이라는 것을 밝혔습니다. 게임은 빨강·초록·파랑 세 줄기로 단순하게 나눴습니다.',
        q: '3번 판에서 파란 빛은 어디로 갔나요? 파란 결정이 하나 더 있었다면 판의 어느 칸에 놓아야 켜졌을까요?',
        lines: 2,
      },
      {
        h: '빛의 합성',
        body: '물감은 섞을수록 어두워지지만, 빛은 겹칠수록 밝아집니다. 휴대폰 화면도 빨강·초록·파랑 세 가지 작은 점만으로 모든 색을 만듭니다.',
        q: '빛을 겹치면 무슨 색이 될까요?',
        table: [
          ['빨강 + 초록', ''],
          ['빨강 + 파랑', ''],
          ['초록 + 파랑', ''],
          ['빨강 + 초록 + 파랑', ''],
        ],
        q2: '물감은 노랑과 파랑을 섞으면 초록이 됩니다. 노란 빛과 파란 빛을 겹치면 무슨 색일까요?',
        lines: 1,
      },
    ],
    qrH: '앱 없이 해 보기',
    qrBody: '휴대폰 카메라로 찍으면 브라우저에서 1챕터 14판을 바로 해 볼 수 있습니다.',
    qrUrl: 'prism.adriven.co/play',
    curriculum: '초등 5~6학년 「빛의 성질」, 중학교 「빛과 파동」 단원과 함께 쓸 수 있습니다. 반투명 거울과 프리즘은 교과 밖 심화 내용입니다.',
    license: '교실과 가정에서 자유롭게 인쇄·복사해 쓰셔도 됩니다.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: '정답과 풀이',
    answersKicker: '교사용',
    beamLegendH: '정답 그림의 빛',
    beamLegend: { white: '흰 빛', r: '빨강', g: '초록', b: '파랑', tap: '돌리는 횟수' },
    answers: [
      { taps: 'A3과 C5를 한 번씩 돌립니다. C3은 그대로 둡니다.', path: '빛은 C5에서 위로, C3에서 왼쪽으로, A3에서 다시 위로 꺾여 A1 결정에 닿습니다.' },
      { taps: 'A4, C4, D4를 한 번씩 돌립니다. D3은 그대로 둡니다.', path: 'D3의 반투명 거울에서 빛이 둘로 나뉘어 하나는 E3으로 갑니다. 나머지는 D4 거울에서 왼쪽으로 꺾여 C4의 반투명 거울에서 다시 나뉘고, C2와 (A4 거울을 거쳐) A5에 닿습니다.' },
      { taps: 'D4와 D5를 한 번씩 돌립니다. C5는 그대로 둡니다.', path: 'C5 거울이 흰 빛을 프리즘의 밑면으로 보냅니다. 빨강은 곧장 F5로, 초록은 위로 나가 D4 거울에서 F4로 꺾이고, 파랑은 아래로 판 밖으로 나갑니다.' },
      { taps: 'D3과 F4를 한 번씩 돌립니다. D1, E4는 그대로 둡니다.', path: '오른쪽 위 광원의 초록 빛이 D1 반투명 거울에서 나뉘어 하나는 A1 결정으로, 하나는 아래 D3 거울에서 F3으로 갑니다. 파란 빛은 E4, F4 거울을 거쳐 같은 F3에 닿아 청록이 됩니다.' },
    ],
    conceptAnswersH: '뒷면 답',
    conceptAnswers: [
      '1. 세 번 꺾였고, 한 번에 90도씩 바뀌었습니다.',
      '2. E3은 2분의 1, C2와 A5는 각각 4분의 1입니다. 반투명 거울을 한 번 지날 때마다 절반씩 나뉩니다.',
      '3. 아래쪽으로 판 밖으로 나갔습니다. 파란 결정을 D6에 두었다면 켜졌습니다.',
      '4. 노랑, 마젠타(자홍), 청록(시안), 흰색. 노란 빛과 파란 빛을 겹치면 흰색입니다. 노란 빛 안에 빨강과 초록이 이미 들어 있기 때문입니다.',
    ],
  },

  en: {
    pageTitle: 'Path of Light: a printable optics worksheet (reflection, prisms, color mixing)',
    navLabel: 'Printable worksheet: Path of Light',
    desc: 'A free printable worksheet built from four boards of the light puzzle game PRISM. Students solve reflection, beam splitter, prism and additive color mixing puzzles with a pencil. Prints in black and white, with a separate answer key. For ages about 10 to 14.',
    list: {
      title: 'Printable optics worksheets',
      desc: 'Free printable worksheets built from the boards of PRISM, a light puzzle game. Solve reflection, half-silvered mirrors, prisms and color mixing with a pencil. Made for black-and-white printing, with a separate answer key.',
      lead: 'A4 worksheets to print for the classroom or at home. They work in black and white, and each has a separate answer key for teachers.',
      meta: 'Ages 10 to 14 · 2 A4 pages + 1-page answer key · You need: a pencil',
    },
    intro: [
      'Two A4 pages (front and back) for students, plus a one-page answer key for teachers. On the front, students solve four boards from the PRISM game with a pencil; on the back, short questions draw out the physics hidden in those boards.',
      'It works on a black and white printer: every color of light is also marked with a shape (red △, green □, blue ○).',
      'For ages about 10 to 14. Connects to light topics in NGSS 4-PS4-2 and MS-PS4-2 (US) and KS2 Light and KS3 Light waves (England). The beam splitter is an extension beyond the standard curriculum.',
      'Free to print and copy for classroom and home use.',
    ],
    pdf: 'Worksheet PDF (2 A4 pages)',
    answersPdf: 'Answer key PDF (1 A4 page)',
    print: 'Print this page',
    answersLink: 'See the answers →',
    worksheetLink: '← Back to the worksheet',
    guideLink: 'More on each principle: the teacher\'s guide',

    kicker: 'PRISM worksheet',
    title: 'Path of Light',
    subtitle: 'Reflection · Beam splitters · Prisms · Mixing light',
    fields: ['Name', 'Class', 'Date'],
    rulesH: 'How to play',
    rules: [
      'Light leaves each source (the square box) in the direction of its small arrow.',
      'Each tap turns a mirror, beam splitter or prism 90 degrees clockwise. Crystals and sources never move.',
      'The board is solved when every crystal (hexagon) receives light of the color drawn inside it.',
    ],
    legendH: 'Key',
    legend: {
      source: 'Light source',
      white: 'White light source',
      mirror: 'Mirror',
      splitter: 'Beam splitter',
      prism: 'Prism',
      crystal: 'Crystal',
      r: 'red',
      g: 'green',
      b: 'blue',
    },
    task: 'Circle the pieces you would turn, then draw the path of the light in pencil.',
    boards: [
      { name: 'Reflection', goal: 'Send the blue light to the blue crystal.', taps: 'It takes two taps.', hint: 'One mirror is already in the right position.' },
      { name: 'Beam splitter', extra: true, goal: 'Light all three red crystals with a single red beam.', taps: 'It takes three taps.', hint: 'A beam splitter lets light through and reflects it at the same time.' },
      { name: 'Prism', goal: 'Split white light with the prism to light the green and red crystals.', taps: 'It takes two taps.', hint: 'White light must enter through the prism\'s thick base to split.' },
      { name: 'Mixing light', goal: 'The cyan crystal (□○) needs green and blue light at the same time.', taps: 'It takes two taps.', hint: 'Do not forget the green crystal (□).' },
    ],
    answerLine: 'Pieces turned',
    extraTag: 'Extension',
    appNote: 'These are levels 3, 22, 49 and 92 of the PRISM app.',

    page2H: 'The physics hidden in the boards',
    concepts: [
      {
        h: 'Reflection',
        body: 'Light that hits a mirror at a slant bounces off to the other side. A periscope uses two mirrors to turn the light twice, so you can see over a wall.',
        q: 'On board 1, how many times did the light turn before it reached the crystal? By how many degrees did it turn each time?',
        lines: 2,
        preview: {
          h: 'Going further',
          body: 'The angle between the incoming light and the line perpendicular to the mirror (the normal) equals the angle of the outgoing light. That is why a mirror at 45 degrees turns light through 90 degrees.',
        },
      },
      {
        h: 'Beam splitter',
        extra: true,
        body: 'Coat glass with a very thin layer of silver and half the light passes through while half is reflected. Beam splitters are at the heart of LIGO, the instrument that first detected gravitational waves.',
        q: 'On board 2, what fraction of the original light reaches crystals E3, C2 and A5? (Ignore any light the glass absorbs.)',
        blanks: ['E3', 'C2', 'A5'],
      },
      {
        h: 'Prism',
        body: 'White light is a mixture of colors. A prism bends each color by a different amount, red the least and blue and violet the most, so the colors fan apart. Newton used this to show that white light is made of colors. The game simplifies the spread to red, green and blue.',
        q: 'On board 3, where did the blue light go? If there were a blue crystal too, which cell would it need to be on?',
        lines: 2,
      },
      {
        h: 'Mixing light',
        body: 'Paint gets darker as you mix it, but light gets brighter. Your phone screen makes every color from tiny red, green and blue dots.',
        q: 'What color do you get when these lights overlap?',
        table: [
          ['red + green', ''],
          ['red + blue', ''],
          ['green + blue', ''],
          ['red + green + blue', ''],
        ],
        q2: 'Yellow and blue paint make green. What do yellow and blue light make?',
        lines: 1,
      },
    ],
    qrH: 'Try it without the app',
    qrBody: 'Scan with a phone camera to play chapter 1 (14 levels) in the browser.',
    qrUrl: 'prism.adriven.co/play',
    curriculum: 'For ages about 10 to 14. Connects to NGSS 4-PS4-2 and MS-PS4-2, and to KS2 Light and KS3 Light waves.',
    license: 'Free to print and copy for classroom and home use.',
    copyright: '© 2026 A Driven Inc. · PRISM',

    answersTitle: 'Answers and explanations',
    answersKicker: 'For teachers',
    beamLegendH: 'Light in the answer diagrams',
    beamLegend: { white: 'white', r: 'red', g: 'green', b: 'blue', tap: 'number of taps' },
    answers: [
      { taps: 'Turn A3 and C5 once each. Leave C3 alone.', path: 'The light turns up at C5, left at C3 and up again at A3, reaching the crystal at A1.' },
      { taps: 'Turn A4, C4 and D4 once each. Leave D3 alone.', path: 'The beam splitter at D3 sends one beam to E3. The rest turns left at the D4 mirror and splits again at C4, reaching C2 and, by way of the A4 mirror, A5.' },
      { taps: 'Turn D4 and D5 once each. Leave C5 alone.', path: 'The C5 mirror sends white light into the base of the prism. Red goes straight on to F5, green leaves upward and turns at the D4 mirror to F4, and blue runs off the bottom of the board.' },
      { taps: 'Turn D3 and F4 once each. Leave D1 and E4 alone.', path: 'Green light from the top right source splits at D1: one beam reaches the A1 crystal, the other turns at the D3 mirror toward F3. Blue light reaches the same F3 crystal by way of the E4 and F4 mirrors, making cyan.' },
    ],
    conceptAnswersH: 'Back page answers',
    conceptAnswers: [
      '1. Three times, by 90 degrees each time.',
      '2. E3 gets one half; C2 and A5 get one quarter each. Every pass through a beam splitter divides the light in two.',
      '3. It ran off the bottom of the board. A blue crystal on D6 would have lit up.',
      '4. Yellow, magenta, cyan, white. Yellow and blue light make white, because yellow light already contains red and green.',
    ],
  },
};
