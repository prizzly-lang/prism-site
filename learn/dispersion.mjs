/**
 * 개념 페이지 3/7 「빛의 분산」(`/learn/dispersion/`)의 한·영 문구. 틀은 prism 저장소
 * `docs/OPTICS-SITE.md` 3절, 순서는 `site.mjs`의 CONCEPTS. 확인 문제(`check`)와 게임과
 * 다른 점(`differs`)은 템플릿이 본문 뒤에 그리므로 `body`에 되풀이하지 않는다.
 *
 * ## 게임 규칙의 출처 (prism 저장소, v1.6 브랜치)
 * - `src/engine/beam.ts`의 `case 'prism'`: 흰 빛이 밑면 쪽(꼭짓점 방향과 같은 진행 방향)으로
 *   들어올 때만 빨강은 그대로, 초록은 왼쪽으로, 파랑은 오른쪽으로 갈라진다. 이미 색이 있는
 *   빛과 다른 면으로 들어온 빛은 갈라지지 않고 한 줄기로 나간다.
 * - 3챕터 이름은 `src/engine/levels.ts`의 CHAPTER_NAMES에서 「분산」.
 * - 원리 그림은 `src/game/optics.ts`의 PRISM, CMP_PRISM. (CMP_PRISM의 「탭 전」 그림은 옆면으로
 *   들어온 흰 빛을 세 갈래로 그리는데, 게임 규칙과 다르다. 게임 쪽에서 고쳐야 한다. 보고 참고.)
 *
 * ## 물리 (교과서 수준에서 확인한 것만)
 * - 유리의 굴절률은 파장에 따라 다르다. 파장이 짧은 쪽(보라, 파랑)일수록 굴절률이 크다. 그래서
 *   같은 각도로 들어온 빛도 보라와 파랑이 더 많이 꺾인다(정상 분산).
 * - 빗방울 속 무지개도 같은 원리다. 비가 내리거나 막 그친 뒤, 햇빛을 등지고 빗방울을 볼 때 보인다.
 * - 뉴턴은 1660년대 후반 프리즘 실험으로 흰 빛이 여러 색의 혼합이라는 것을 보였다. 결과는
 *   『광학』(Opticks, 1704)에 정리되었다.
 *
 * ## 교육과정 (prism `docs/WORKSHEETS.md` 4절 표)
 * - 한국 2022 개정 과학과에 분산이라는 낱말은 없다. 프리즘과 흰 빛은 고1 탐구 활동 정도에서만
 *   다루므로, 이 페이지는 심화 내용이다.
 * - 바탕이 되는 빛의 직진·반사는 초등 「빛의 성질」([6과02-02])에서, 반사 법칙과 빛의 굴절은
 *   중학교 「빛과 파동」([9과10-01])에서 배운다.
 * - 영국 KS3 Light waves 단원에는 白光과 프리즘이 나오지만 분산이라는 낱말은 없다. NGSS MS-PS4-2는
 *   반사·흡수·투과를 다룬다. 그래서 「extension topic」으로 쓴다.
 *
 * ## 쓰지 않은 것
 * - 가격, 스토어 배지. 무지개의 각도 숫자(약 42도 등). 「계정」(회원가입만 쓴다).
 */
export default {
  slug: 'dispersion',
  order: 3,
  chapter: 3,
  date: '2026-11-21',
  updated: '2026-11-21',
  langs: ['ko', 'en'],
  worksheet: null,
  text: {
    ko: {
      title: '빛의 분산',
      subtitle: 'PRISM 3챕터 「분산」',
      desc: '빛이 프리즘을 지나면 색이 갈라지는 까닭을 손전등과 유리 프리즘 실험, 무지개, 뉴턴의 프리즘 실험, 빛 퍼즐 PRISM 3챕터로 알아봅니다.',
      definition: '빛의 분산은 파장(색)에 따라 물질 속에서 빛의 굴절 정도가 달라서, 흰 빛이 프리즘 같은 물체를 지나며 여러 색으로 갈라지는 현상입니다.',
      level: '초등 5~6학년 · 중학교 (교과 밖 심화)',
      minutes: '10분',
      materials: '손전등, 꼭짓점이 있는 유리 프리즘(없으면 물을 채운 삼각형 투명 용기), 흰 종이 한 장, 어두운 방.',
      curriculum: '2022 개정 과학과 교육과정에는 분산이라는 낱말이 없습니다. 프리즘과 흰 빛은 고1 탐구 활동 정도에서 다루므로, 이 페이지는 심화 내용입니다. 바탕이 되는 빛의 직진·반사는 초등 「빛의 성질」([6과02-02])에서, 반사 법칙과 빛의 굴절은 중학교 「빛과 파동」([9과10-01])에서 배웁니다.',
      body: [
        ['h2', '작은 실험'],
        ['p', '어두운 방에서 손전등 빛을 흰 종이에 비춥니다. 빛은 흰색으로 보입니다. 이제 꼭짓점이 있는 유리 프리즘을 빛 길에 세웁니다(없으면 물을 채운 삼각형 투명 용기도 됩니다). 종이 위의 빛이 어떻게 바뀌는지 봅니다.'],
        ['ol', [
          '손전등을 책상에 눕혀 놓고, 빛이 흰 종이에 비치도록 합니다. 흰 빛 한 줄기를 확인합니다.',
          '빛 길 한가운데에 프리즘을 세웁니다. 빛이 프리즘의 한 면으로 비스듬히 들어가도록 합니다.',
          '프리즘을 천천히 돌려 봅니다. 종이 위에 생기는 빛 띠의 색 순서를 봅니다. 색이 옅어서 잘 안 보이면 방을 더 어둡게 합니다.',
        ]],
        ['note', '<strong>안전</strong>: 유리 모서리는 날카로우니 손을 베지 않게 조심합니다. 빛이나 유리에 비친 빛을 사람의 눈에 직접 비추지 않습니다. 레이저 포인터는 쓰지 않습니다.'],

        ['h2', '무슨 일이 일어났나'],
        ['p', '흰 빛은 사실 여러 색의 빛이 섞여 있는 빛입니다. 빨강에서 보라까지 여러 파장이 한데 모여 흰색으로 보이는 것입니다. 유리 속에서는 빛의 속도가 공기보다 느려지며 방향이 꺾이는데, 색마다 꺾이는 정도가 조금씩 다릅니다. 그래서 같은 각도로 들어온 빛도 색마다 나가는 방향이 달라지고, 종이 위에 색 띠가 생깁니다.'],
        ['p', '유리는 보라와 파랑 쪽 빛을 빨강 쪽보다 더 많이 꺾습니다. 그래서 색 띠에서 보라와 파랑은 많이 꺾여 나가고 빨강은 가장 적게 꺾여 나갑니다. 색 띠의 순서는 빨강, 주황, 노랑, 초록, 파랑, 남색, 보라입니다.'],
        ['h3', '물방울의 무지개'],
        ['p', '비가 내리거나 막 그친 뒤, 햇빛을 등지고 공중의 물방울을 바라보면 무지개가 보입니다. 물방울 하나하나가 작은 프리즘처럼 빛을 굴절시키고 반사하면서 색을 나눕니다. 수많은 물방울이 함께 그 일을 하는 것입니다.'],

        ['h2', '뉴턴의 프리즘 실험'],
        ['p', '17세기 후반 아이작 뉴턴은 햇빛을 어두운 방의 좁은 구멍으로 들여보내, 프리즘에 통과시켰습니다. 색 띠가 벽에 나타났습니다. 이어서 그는 색 띠 가운데 한 색만 골라 두 번째 프리즘에 통과시켰습니다. 그 색은 더 갈라지지 않았습니다. 마지막으로 색 띠를 한 점에 다시 모아 흰빛을 되돌렸습니다.'],
        ['p', '이 실험은 흰 빛이 여러 색의 합이라는 것을 보여 줍니다. 그전까지는 프리즘이 색을 「만들어 낸다」고 생각하는 사람이 많았습니다. 뉴턴의 결과는 1704년에 낸 『광학』에 정리되었습니다.'],

        ['h2', '분산은 어디에 쓰일까'],
        ['ul', [
          '<strong>분광기</strong>: 빛을 색별로 펼쳐 어떤 빛이 들었는지 알아냅니다. 천문학자는 별빛을 같은 방식으로 펼쳐, 빠진 색을 찾아 별의 성분을 알아냅니다.',
          '<strong>카메라 렌즈</strong>: 색마다 초점이 조금씩 달라서 사진 가장자리에 색 번짐이 생기기도 합니다. 좋은 렌즈는 여러 유리를 겹쳐 이 차이를 줄입니다.',
          '<strong>광섬유 통신</strong>: 색(파장)마다 전달 속도가 조금씩 달라 신호가 퍼지는 원인이 됩니다. 설계할 때 이 차이를 고려합니다.',
        ]],
        ['p', '<a href="/learn/reflection/">빛의 반사</a>와 <a href="/learn/beam-splitter/">반투명 거울</a>에서는 빛의 방향만 다뤘습니다. 분산은 같은 빛이라도 색에 따라 방향이 달라진다는 점을 더합니다.'],

        ['h2', '게임 속 장면'],
        ['p', 'A Driven의 빛 퍼즐 PRISM은 3챕터 「분산」에서 프리즘을 내놓습니다. 프리즘은 삼각형 모양이고, 꼭짓점이 향하는 방향이 판마다 정해져 있습니다. 탭하면 꼭짓점이 네 방향 가운데 하나로 돌아갑니다.'],
        ['p', '흰 빛이 프리즘의 <strong>밑면 쪽에서</strong> 들어오면 세 줄기로 갈라집니다. 빨강은 오던 방향으로 그대로, 초록은 왼쪽으로, 파랑은 오른쪽으로 나갑니다. 프리즘의 다른 면으로 들어온 흰 빛은 갈라지지 않고 한 줄기로 나갑니다. 이미 색이 있는 빛, 예를 들어 빨강만 있는 빛도 갈라지지 않고 한 줄기로 나갑니다.'],
        ['p', '3챕터의 판은 프리즘을 알맞게 돌리고, 빛이 들어가는 면을 골라서 세 색이 모두 목표 결정에 닿게 하는 문제입니다. 세 색이 서로 다른 결정을 켜야 하면 흰 빛을 어느 면으로 어떻게 들여보낼지가 관건입니다. <a href="/daily/">오늘의 빛 퍼즐</a>에도 프리즘이 든 판이 자주 나옵니다. 수업에서는 판을 풀기 전에 「이 흰 빛은 세 갈래 가운데 어디에 닿을까?」를 먼저 그리게 해 보세요.'],
      ],
      check: [
        {
          q: '흰 빛이 프리즘을 지날 때 가장 많이 꺾여 나가는 색과 가장 적게 꺾이는 색은 무엇일까요?',
          a: '보라와 파랑 쪽이 가장 많이 꺾이고, 빨강이 가장 적게 꺾입니다. 유리는 파장이 짧은 빛일수록 굴절률을 조금 더 크게 가지기 때문입니다.',
        },
        {
          q: '빨강만 나오는 빛을 프리즘에 비추면 어떻게 될까요?',
          a: '색 띠로 갈라지지 않고 한 줄기로 나갑니다. 유리에서 조금 꺾이기는 합니다. 분산은 여러 색이 섞인 흰 빛에서 색 띠를 만듭니다. PRISM에서도 이미 색이 있는 빛은 갈라지지 않습니다.',
        },
        {
          q: '무지개는 어떻게 생길까요? 프리즘 실험과 같은 원리가 어디에 있나요?',
          a: '비가 내리거나 막 그친 뒤, 햇빛이 공중의 물방울 속에서 굴절되고 반사되면서 색마다 나가는 방향이 달라져 색 띠로 보입니다. 물방울 하나하나가 작은 프리즘처럼 색을 나눕니다.',
        },
      ],
      differs: [
        '실제 유리의 분산은 완만하고 연속적입니다. 빨강에서 보라까지 모든 파장이 조금씩 다르게 꺾입니다. 게임의 프리즘은 빨강·초록·파랑 세 줄기로만 가릅니다.',
        '게임에서는 흰 빛이 밑면 쪽에서 들어올 때만 갈라집니다. 실제 프리즘은 어느 면으로 들어와도 색이 갈라지고, 들어오는 각도가 달라지면 갈라진 색의 각도도 달라집니다.',
        '게임의 갈라진 빛은 정해진 방향(직진, 왼쪽, 오른쪽)으로만 나갑니다. 실제로는 아무 각도로나 나갑니다.',
        '실제 프리즘에서는 색 띠가 한 점에서 시작하지 않고 조금씩 어긋나며, 밝기도 색마다 다릅니다. 게임은 밝기를 따지지 않습니다.',
      ],
    },

    en: {
      title: 'Dispersion of light',
      subtitle: 'PRISM chapter 3 “Dispersion”',
      desc: 'Why a prism splits white light into colors: a flashlight and glass prism experiment, rainbows, Newton’s prism experiment and chapter 3 of the PRISM light puzzle.',
      definition: 'Dispersion of light is the spreading of white light into its colors, because the amount that a material bends light depends on the wavelength (color), so a prism or a drop of water separates the colors.',
      level: 'Ages 10 to 14 (extension topic)',
      minutes: '10 minutes',
      materials: 'A flashlight (torch), a glass prism with a pointed edge (or a triangular clear container filled with water), a sheet of white paper, and a dark room.',
      curriculum: 'An extension topic: England’s KS3 Light waves unit includes white light and prisms, but it does not name dispersion. NGSS MS-PS4-2 covers reflection, absorption and transmission. The page builds on reflection and refraction.',
      body: [
        ['h2', 'A small experiment'],
        ['p', 'In a dark room, shine a flashlight onto a sheet of white paper. The light looks white. Now stand a glass prism in the path of the light (a triangular clear container of water also works). Watch how the light on the paper changes.'],
        ['ol', [
          'Lay the flashlight on its side on a table so that its beam hits the white paper. Check that you have one white spot.',
          'Put the prism in the middle of the beam, so the light enters one face at an angle.',
          'Turn the prism slowly. Look at the order of the colored band that appears on the paper. If the colors are faint, make the room darker.',
        ]],
        ['note', '<strong>Safety</strong>: glass edges can be sharp, so handle with care. Do not shine the light, or light reflected from glass, into anyone’s eyes. Do not use a laser pointer.'],

        ['h2', 'What happened'],
        ['p', 'White light is really a mixture of many colors. Wavelengths from red to violet mix together, and the result looks white. In glass, light slows down and bends, and each color bends by a slightly different amount. So light entering at the same angle leaves in a different direction for each color, and a band of colors appears on the paper.'],
        ['p', 'Glass bends violet and blue light more than red light. In the colored band, violet and blue are bent the most and red the least. The order across the band is red, orange, yellow, green, blue, indigo and violet.'],
        ['h3', 'Rainbows in raindrops'],
        ['p', 'During or just after rain, stand with the sun behind you and look at the droplets in the air, and you can see a rainbow. Each droplet acts like a small prism, bending and reflecting light and separating its colors. Countless droplets do this together.'],

        ['h2', 'Newton’s prism experiment'],
        ['p', 'In the late 1600s, Isaac Newton let sunlight enter a dark room through a small hole and passed it through a prism. A band of colors appeared on the wall. He then chose one color from the band and passed it through a second prism. That color did not split any further. Finally he gathered the colors back into one spot to make white light again.'],
        ['p', 'The experiment showed that white light is a mixture of colors. Before this, many people believed that the prism was creating the colors. Newton’s results were collected in his book Opticks, published in 1704.'],

        ['h2', 'Where dispersion is used'],
        ['ul', [
          '<strong>Spectrometers</strong>: spread light by color to find out what it contains. Astronomers spread starlight in the same way and find which colors are missing, which tells them what the star is made of.',
          '<strong>Camera lenses</strong>: each color focuses at a slightly different point, so photos can show colored fringes at the edges. Good lenses combine several kinds of glass to reduce this.',
          '<strong>Optical fiber communication</strong>: different colors (wavelengths) travel at slightly different speeds, which can spread a signal out. Designers take this into account.',
        ]],
        ['p', 'The pages on <a href="/learn/reflection/">reflection of light</a> and <a href="/learn/beam-splitter/">beam splitters</a> covered only the direction of light. Dispersion adds that the direction can depend on the color of the same light.'],

        ['h2', 'A scene in the game'],
        ['p', 'In the light puzzle PRISM, chapter 3 “Dispersion” introduces the prism. A prism is triangular, and the direction of its tip is set by each puzzle. Tapping it turns the prism to one of four directions.'],
        ['p', 'When white light enters through the <strong>base side</strong> of the prism, it splits into three beams. Red goes straight on, green turns left, and blue turns right. White light that enters through any other face leaves as one beam without splitting. Light that already has a color, for example red-only light, also leaves as one beam.'],
        ['p', 'In chapter 3, the puzzle asks you to turn the prism and choose which face the light enters, so that all three colors reach their target crystals. When the three colors must light different crystals, the question is which face the white light should enter, and from which direction. <a href="/daily/">Today’s light puzzles</a> often include a prism. In class, ask students to draw where the three beams will go before they solve the board.'],
      ],
      check: [
        {
          q: 'When white light passes through a prism, which colors bend the most and which bends the least?',
          a: 'Violet and blue bend the most, and red bends the least. Glass has a slightly larger refractive index for shorter wavelengths.',
        },
        {
          q: 'What happens if you shine red-only light into a prism?',
          a: 'It does not spread into a band. It leaves as one beam, although the glass still bends it a little. Dispersion makes a band of colors from a mixture such as white light. In PRISM, light that already has a color also leaves as one beam.',
        },
        {
          q: 'How does a rainbow form, and where is the same principle at work?',
          a: 'During or just after rain, sunlight bends and reflects inside the droplets in the air, and each color leaves in a slightly different direction, so it appears as a band of colors. Each droplet separates the colors like a small prism.',
        },
      ],
      differs: [
        'In real glass, dispersion is gradual and continuous: every wavelength from red to violet bends by a slightly different amount. The prism in the game splits light into only three beams: red, green and blue.',
        'In the game, white light splits only when it enters through the base side. A real prism splits light through any face, and a change in the angle of entry changes the angles of the colors.',
        'In the game, the split beams leave only in fixed directions (straight, left, or right), in 90-degree steps. In reality, they leave at any angle.',
        'In a real prism, the colored band does not start from one point, and its brightness varies from color to color. The game does not model brightness.',
      ],
    },
  },
};
