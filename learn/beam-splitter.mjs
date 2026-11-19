/**
 * 개념 페이지 2/7 「반투명 거울(빔 스플리터)」(`/learn/beam-splitter/`)의 한·영 문구. 틀은 prism
 * 저장소 `docs/OPTICS-SITE.md` 3절. 확인 문제(`check`)와 게임과 다른 점(`differs`)은 템플릿이
 * 본문 뒤에 그리므로 `body`에 되풀이하지 않는다.
 *
 * ## 게임 규칙의 출처 (prism 저장소, v1.6 브랜치)
 * - 자세: `src/engine/types.ts`의 `ORIENTATIONS.splitter = 2`("/"와 "\"), 탭하면 둘을 오간다.
 * - 빛: `src/engine/beam.ts`의 `case 'splitter'`가 같은 색의 빛을 둘 낸다. 하나는 오던 방향
 *   그대로, 하나는 거울과 같은 `REFLECT` 표대로. 네 방향 어디서 와도 같다(양면). 밝기는 없다.
 * - 2챕터 「분열」은 32판이고 조각은 광원·거울·반투명 거울·결정·벽이다(`src/levels.json`을 셈).
 * - 원리 카드: `/img/optics/ko-ch2.webp` 680×960, `en-ch2.webp` 680×1052(sips로 잼). 카드 속
 *   판은 초록 광원이 왼쪽, 결정이 반투명 거울 위쪽이다(`src/game/optics.ts`의 CMP_SPLITTER).
 * - 체험판(`/play/`)은 1챕터뿐이라 반투명 거울이 없다. 그래서 「오늘의 퍼즐」과 학습지로 보낸다.
 *   11/16~11/19 나흘 모두 반투명 거울이 있었다(12판 가운데 9판)(prism `daily/*.json`).
 *
 * ## 교육과정 (prism `docs/WORKSHEETS.md` 4절 표)
 * - 반투명 거울은 한국 2022 개정, NGSS, 영국 어디에도 직접 맞는 기준이 없다. 「심화」라고 쓰고,
 *   바탕이 되는 반사([6과02-02], [9과10-01], MS-PS4-2, KS3 Light waves)만 잇는다.
 *
 * ## 물리 (교과서 수준에서 확인한 것만)
 * - 굴절률 1.5쯤인 유리·투명 플라스틱은 정면에 가깝게 들어온 빛을 면 하나에서 약 4% 반사한다
 *   (프레넬 반사, ((n-1)/(n+1))^2 = 0.04). 판은 면이 둘이라 합쳐 8%쯤. 비스듬하면 더 늘어난다.
 * - 통과 + 반사 + 흡수 = 들어온 빛. 금속 막은 조금 흡수한다.
 * - LIGO: 팔 길이 4km의 간섭계, 첫 검출 2015년 9월 14일.
 *
 * ## 쓰지 않은 것
 * - 가격, 스토어 배지. 원리 카드의 문장(그림으로만 보인다). `articles/optics.mjs`와
 *   `worksheets/path-of-light.mjs`의 「두 장을 연달아 지나면 4분의 1」 문항(여기서는 70:30과
 *   세 갈래 문제로 바꿨다).
 * - 앞면·뒷면 반사가 둘로 겹쳐 보인다는 관찰. 손전등 빛 점에서는 어긋남이 1mm 안쪽이라 보이지 않는다
 *   (2026-11-19 검수). 2챕터의 벽은 세 판(25·41·46)뿐이고 결정을 가려 주는 벽은 없다(같은 검수).
 * - 편광에 따라 반사율이 달라지는 이야기(7챕터 개념 페이지에서 다룬다).
 */
export default {
  slug: 'beam-splitter',
  order: 2,
  chapter: 2,
  date: '2026-11-19',
  updated: '2026-11-19',
  langs: ['ko', 'en'],
  worksheet: 'path-of-light',
  text: {
    ko: {
      title: '반투명 거울(빔 스플리터)',
      subtitle: 'PRISM 2챕터 「분열」',
      desc: '반투명 거울(빔 스플리터)이 빛 한 줄기를 둘로 나누는 원리를 투명 판과 손전등 실험, 밤의 유리창, 프롬프터와 LIGO, 빛 퍼즐 PRISM 2챕터로 알아봅니다.',
      definition: '반투명 거울(빔 스플리터)은 들어온 빛의 일부는 통과시키고 일부는 반사해서, 빛 한 줄기를 두 줄기로 나누는 광학 부품입니다.',
      level: '초등 5~6학년 · 중학교 (교과 밖 심화)',
      minutes: '10분',
      materials: '손전등, 투명한 플라스틱 판(빈 CD 케이스 뚜껑이나 투명 책받침), 흰 종이 한 장.',
      curriculum: '2022 개정 과학과 교육과정에는 반투명 거울을 직접 다루는 내용이 없습니다. 교과 밖 심화 주제입니다. 바탕이 되는 빛의 반사는 초등 5~6학년 「빛의 성질」([6과02-02])과 중학교 「빛과 파동」([9과10-01])에서 배웁니다.',
      body: [
        ['h2', '작은 실험'],
        ['p', '진짜 반투명 거울이 없어도 됩니다. 투명한 플라스틱 판도 빛을 조금은 반사하기 때문입니다. 방을 어둡게 할수록 잘 보입니다.'],
        ['ol', [
          '손전등을 책상에 눕혀 놓고 벽을 비춥니다. 벽에 생긴 <strong>빛 점</strong>을 확인합니다.',
          '손전등과 벽 사이에 투명 판을 세워서, 빛이 판에 비스듬히(45도쯤) 닿게 듭니다. 벽의 빛 점이 그대로 있는지 봅니다.',
          '판을 반쯤 열린 문이라고 생각합니다. 손전등 쪽에서 보이는 면이 왼쪽으로 돌아가 있으면 판의 왼쪽 옆에, 오른쪽이면 오른쪽 옆에 흰 종이를 세웁니다. 종이는 판에서 한 뼘쯤 떨어뜨립니다. 종이 위에서 <strong>두 번째 빛 점</strong>을 찾습니다. 벽의 빛 점보다 훨씬 희미합니다. 안 보이면 종이를 판 둘레로 천천히 옮기며 찾습니다.',
          '판을 조금씩만 돌려 봅니다. 두 빛 점 가운데 어느 것이 움직이는지 봅니다. 빛 점이 종이 밖으로 나가면 종이를 따라 옮깁니다.',
        ]],
        ['note', '<strong>안전</strong>: 깨질 수 있는 유리 조각 대신 플라스틱 판을 씁니다. 손전등 빛이나 판에 반사된 빛을 사람의 눈에 비추지 않습니다. 레이저 포인터는 쓰지 않습니다.'],

        ['h2', '무슨 일이 일어났나'],
        ['p', '빛 한 줄기가 판에서 둘로 나뉘었습니다. 대부분은 판을 <strong>통과</strong>해 벽까지 곧게 갔고, 일부는 판의 표면에서 <strong>반사</strong>되어 옆의 종이로 갔습니다. 투명해 보이는 물체도 빛을 전부 통과시키지는 않습니다.'],
        ['p', '판을 돌리면 종이 위의 빛 점만 움직이고 벽의 빛 점은 거의 제자리에 있습니다. 반사된 빛은 판이 놓인 방향을 따라가지만, 통과한 빛은 오던 방향 그대로 나아가기 때문입니다.'],
        ['p', '유리나 투명 플라스틱은 정면에 가깝게 들어온 빛을 면 하나에서 약 4% 반사합니다. 판에는 앞면과 뒷면이 있으니 합쳐서 8%쯤이고, 비스듬히 비추면 조금 더 늘어납니다. 종이 위의 빛 점이 희미한 까닭입니다. 반사는 앞면과 뒷면에서 한 번씩 일어나지만, 손전등 빛 점에서는 둘이 거의 겹쳐서 하나로 보입니다.'],
        ['p', '<strong>밤의 유리창.</strong> 같은 일을 매일 밤 볼 수 있습니다. 불을 켠 방에서 밤에 창문을 보면 내 모습이 비칩니다. 낮에도 유리는 똑같이 반사하지만, 바깥에서 들어오는 빛이 훨씬 밝아서 희미한 반사가 묻혀 버립니다.'],

        ['h2', '진짜 반투명 거울'],
        ['p', '이름은 반투명이지만 기름종이처럼 뿌옇지 않습니다. 건너편이 맑게 보이면서 거울처럼 비치기도 하는 판입니다.'],
        ['p', '실험실의 반투명 거울은 유리판에 금속을 아주 얇게 입히거나, 투명한 막을 여러 겹 쌓아서 만듭니다. 막의 두께와 재료를 조절해 반사되는 빛과 통과하는 빛의 비율을 정합니다. 반반으로 나누는 것(50:50)이 가장 널리 쓰이고, 70:30이나 90:10처럼 한쪽으로 치우치게 만든 것도 있습니다. 빛줄기(beam)를 나눈다(split)는 뜻으로 영어로는 빔 스플리터라고 부릅니다.'],
        ['p', '어떻게 나누든 빛이 새로 생기지는 않습니다. <strong>통과한 빛과 반사된 빛, 그리고 판이 흡수한 약간의 빛을 더하면 들어온 빛과 같습니다.</strong> 그래서 나뉜 빛은 둘 다 들어온 빛보다 어둡습니다. 50:50 반투명 거울에서 나온 빛은 각각 처음 밝기의 절반쯤입니다.'],
        ['h3', '어디에 쓰일까'],
        ['ul', [
          '<strong>프롬프터</strong>: 뉴스 진행자가 카메라를 보면서 원고를 읽을 수 있게 하는 장치입니다. 카메라 렌즈 앞에 비스듬히 놓은 유리가 아래 화면의 글자를 진행자 쪽으로 반사합니다. 카메라는 유리 뒤에서 유리를 통과한 빛으로 진행자를 찍습니다.',
          '<strong>한쪽에서만 보이는 거울</strong>: 금속을 얇게 입힌 유리를 밝은 방과 어두운 방 사이에 둡니다. 밝은 방에서는 자기 쪽 빛의 반사가 훨씬 밝아 거울로 보이고, 어두운 방에서는 건너온 빛이 더 밝아 창문으로 보입니다. 밤의 유리창과 같은 원리입니다.',
          '<strong>자동차 앞유리 표시 장치(헤드업 디스플레이)</strong>: 속도 같은 정보를 앞유리에 비춥니다. 유리가 그 빛을 운전자 쪽으로 반사하고, 길에서 오는 빛은 그대로 통과합니다.',
          '<strong>간섭계</strong>: 반투명 거울로 빛을 둘로 나눠 서로 다른 길로 보냈다가 다시 합치면, 두 길의 길이가 아주 조금만 달라져도 알아챌 수 있습니다. 2015년 9월 14일에 중력파를 처음 검출한 LIGO가 바로 이런 간섭계입니다. 두 팔의 길이가 각각 4km입니다.',
        ]],

        ['h2', '게임 속 장면'],
        ['p', 'A Driven의 빛 퍼즐 PRISM은 2챕터 「분열」에서 반투명 거울을 처음 내놓습니다. 반투명 거울은 거울처럼 격자 한 칸에 대각선으로 놓이고, 탭하면 「/」 모양과 「\\」 모양이 번갈아 바뀝니다. 거울과 구별되도록 선 두 줄로 그립니다.'],
        ['p', '빛이 반투명 거울에 닿으면 둘이 됩니다. 하나는 오던 방향으로 <strong>그대로 직진</strong>하고, 하나는 같은 모양의 거울을 만났을 때처럼 <strong>90도 꺾입니다</strong>. 두 빛의 색은 들어온 빛과 같습니다. 탭하면 꺾이는 쪽만 반대로 바뀌고 직진하는 빛은 그대로입니다. 실험에서 판을 돌려도 벽의 빛 점이 제자리였던 것과 같습니다.'],
        ['img', {
          src: '/img/optics/ko-ch2.webp',
          alt: 'PRISM 2챕터 「분열」 원리 카드. 왼쪽 「탭 전」 판에서는 왼쪽 광원의 초록 빛이 「\\」 모양 반투명 거울에서 둘로 나뉘어 하나는 오른쪽으로 직진하고 하나는 아래로 꺾입니다. 위쪽 결정은 꺼져 있습니다. 오른쪽 「탭 후」 판에서는 반투명 거울이 「/」 모양으로 바뀌어, 직진하는 빛은 그대로이고 꺾인 빛이 위로 올라가 초록 결정을 켭니다. 아래에 반투명 거울 설명과 게임 규칙이 적혀 있습니다.',
          w: 680,
          h: 960,
        }],
        ['p', '빛줄기가 늘어나니 광원 하나로 결정 여러 개를 켤 수 있습니다. 반투명 거울 하나를 지나면 빛이 두 갈래, 그 가운데 하나가 또 반투명 거울을 지나면 세 갈래가 됩니다. 2챕터의 32판은 「이 빛을 어디서 나눠야 모든 결정에 닿을까」를 묻는 문제입니다. 벽이 놓인 판도 몇 개 있습니다. 벽은 닿은 빛을 흡수해서, 빛이 거기서 끝납니다.'],
        ['p', '<a href="/play/">브라우저 체험판</a>은 거울만 나오는 1챕터까지입니다. 반투명 거울은 매일 세 판씩 새로 나오는 <a href="/daily/">오늘의 빛 퍼즐</a>에 자주 나오고, 아래 인쇄용 학습지의 둘째 판에도 있습니다. 수업에서는 탭하기 <em>전에</em> 「빛이 몇 갈래가 되고, 각각 어디에 닿을까?」를 그려 보게 합니다.'],
      ],
      check: [
        {
          q: '들어온 빛의 30%를 반사하는 반투명 거울이 있습니다. 판이 흡수하는 빛을 무시하면, 통과하는 빛은 몇 %일까요?',
          a: '70%입니다. 통과한 빛과 반사된 빛을 더하면 들어온 빛과 같아야 하므로 100% - 30% = 70%입니다. 실제로는 판이 조금 흡수해서 이보다 약간 적습니다.',
        },
        {
          q: '불을 켠 방에서 밤에는 유리창에 내 모습이 비치는데, 낮에는 왜 잘 보이지 않을까요?',
          a: '유리는 낮에도 밤에도 똑같이 빛의 일부를 반사합니다. 낮에는 바깥에서 유리를 통과해 들어오는 빛이 훨씬 밝아서, 희미한 반사가 눈에 띄지 않을 뿐입니다. 밤에는 바깥이 어두워 반사된 내 모습만 남습니다.',
        },
        {
          q: 'PRISM에서 오른쪽으로 가던 빛이 「\\」 모양 반투명 거울을 만나면 어떻게 될까요? 한 번 탭하면요?',
          a: '빛이 둘로 나뉘어 하나는 오른쪽으로 계속 가고 하나는 아래로 꺾입니다. 한 번 탭하면 「/」 모양이 되어, 오른쪽으로 가는 빛은 그대로이고 꺾이는 빛만 위로 바뀝니다.',
        },
      ],
      differs: [
        '실제 반투명 거울을 지난 빛은 둘 다 들어온 빛보다 어둡습니다. 게임은 빛의 밝기를 따지지 않습니다. 몇 번을 나눠도 나뉜 빛 하나하나가 결정을 온전히 켭니다.',
        '실제 반투명 거울은 나누는 비율이 제품마다 다르고, 빛이 닿는 각도와 빛의 색에 따라서도 조금씩 달라집니다. 판이 빛을 조금 흡수하기도 합니다. 게임의 반투명 거울은 어떤 색의 빛이든 언제나 똑같이 직진하는 빛 하나와 꺾이는 빛 하나로 나눕니다.',
        '실제 판은 두께가 있어서 뒷면에서도 약한 반사가 한 번 더 생기고, 비스듬히 통과한 빛은 옆으로 살짝 밀려납니다. 게임에서는 빛이 칸의 한가운데에서 정확히 두 갈래로 나뉩니다.',
        '실제로는 반투명 거울을 어떤 각도로든 놓을 수 있습니다. 게임에서는 거울처럼 「/」와 「\\」 두 자세뿐이어서 꺾이는 빛은 언제나 90도로 갈라집니다.',
        '실제로 나눈 빛을 다시 한곳에 모으면 밝고 어두운 간섭 무늬가 생길 수 있고, 간섭계는 이것을 이용합니다. 게임에는 간섭이 없습니다.',
      ],
    },

    en: {
      title: 'Beam splitters (half-silvered mirrors)',
      subtitle: 'PRISM chapter 2 “Split”',
      desc: 'How a beam splitter, or half-silvered mirror, turns one beam of light into two: a clear plastic and flashlight experiment, windows at night, teleprompters, LIGO and chapter 2 of the PRISM light puzzle.',
      definition: 'A beam splitter, also called a half-silvered mirror, is an optical part that lets part of the light that hits it pass through and reflects part of it, turning one beam into two.',
      level: 'Ages 10 to 14 (extension topic)',
      minutes: '10 minutes',
      materials: 'A flashlight (torch), a sheet of clear plastic such as the lid of an empty CD case, and a sheet of white paper.',
      curriculum: 'An extension topic: NGSS and the national curriculum for England do not name beam splitters. It builds on reflection of light, which connects to NGSS MS-PS4-2 (waves are reflected, absorbed or transmitted) and KS3 Light waves.',
      body: [
        ['h2', 'A small experiment'],
        ['p', 'You do not need a real beam splitter. A sheet of clear plastic reflects a little light too. The darker the room, the easier this is to see.'],
        ['ol', [
          'Lay the flashlight on a table so that it shines on a wall. Find the <strong>spot of light</strong> on the wall.',
          'Hold the clear sheet upright between the flashlight and the wall, turned so that the light meets it at a slant of about 45 degrees. Is the spot on the wall still there?',
          'Think of the sheet as a door standing half open. If the side facing the flashlight is turned to the left, stand the white paper to the left of the sheet; if to the right, on the right. Keep the paper about a hand\'s width from the sheet. Look for a <strong>second spot</strong> on the paper. It is much fainter than the one on the wall. If you cannot find it, move the paper slowly around the sheet.',
          'Turn the sheet just a little at a time. Which of the two spots moves? If a spot slides off the paper, move the paper to follow it.',
        ]],
        ['note', '<strong>Safety:</strong> use plastic, not a loose piece of glass that could break. Never shine the flashlight, or light bounced off the sheet, into anyone\'s eyes. Do not use a laser pointer.'],

        ['h2', 'What happened?'],
        ['p', 'One beam became two at the sheet. Most of the light <strong>passed through</strong> and carried straight on to the wall. A small part was <strong>reflected</strong> off the surface and landed on the paper. Even something that looks perfectly clear does not let all the light through.'],
        ['p', 'When you turned the sheet, only the spot on the paper moved; the spot on the wall hardly shifted. Reflected light follows the way the sheet is facing. Light that passes through keeps the direction it already had.'],
        ['p', 'Glass and clear plastic reflect about 4% of the light that meets one surface nearly head-on. A sheet has a front surface and a back surface, so that makes roughly 8%, and a little more when the light arrives at a slant. That is why the second spot is faint. There is one reflection from each surface, but with a flashlight the two land almost on top of each other and look like one spot.'],
        ['p', '<strong>A window at night.</strong> You see the same thing every evening. Stand in a lit room after dark and the window shows your reflection. The glass reflects just as much in the daytime, but the daylight coming in from outside is far brighter and drowns the faint reflection out.'],

        ['h2', 'Real beam splitters'],
        ['p', 'A beam splitter is not cloudy like tracing paper. You can see clearly through it, and it also reflects like a mirror.'],
        ['p', 'A laboratory beam splitter is a glass plate with a very thin coating of metal, or with a stack of thin transparent layers. Choosing the thickness and material of the coating sets how much light is reflected and how much passes through. An even split (50:50) is the most common. Others are made uneven on purpose, such as 70:30 or 90:10. The older name, half-silvered mirror, comes from coating the glass with only a thin film of silver.'],
        ['p', 'However the light is divided, no new light is made. <strong>The light that passes through, the light that is reflected and the small amount the plate absorbs always add up to the light that arrived.</strong> So each of the two beams is dimmer than the original. A 50:50 beam splitter gives two beams of about half the brightness each.'],
        ['h3', 'Where are they used?'],
        ['ul', [
          '<strong>Teleprompters:</strong> these let a news presenter read a script while looking into the camera. A slanted sheet of glass in front of the lens reflects the words from a screen below towards the presenter. The camera sits behind the glass and films the presenter with the light that passes through it.',
          '<strong>One-way mirrors:</strong> a thinly coated sheet of glass stands between a bright room and a dark one. In the bright room the reflection of that room\'s own light is much brighter than anything coming through, so the glass looks like a mirror. In the dark room the light coming through wins, so it looks like a window. It is the window at night again.',
          '<strong>Head-up displays in cars:</strong> the speed is projected onto the windshield. The glass reflects that light towards the driver while light from the road passes straight through.',
          '<strong>Interferometers:</strong> split a beam in two, send the halves along different paths and bring them back together, and you can detect a tiny change in the length of either path. LIGO, which made the first detection of gravitational waves on 14 September 2015, is an interferometer of this kind with arms 4 km long.',
        ]],

        ['h2', 'In the game'],
        ['p', 'PRISM, a light puzzle game by A Driven, introduces the beam splitter in chapter 2, “Split”. Like a mirror, it sits diagonally in one square of the grid, and a tap switches it between a “/” shape and a “\\” shape. It is drawn as two parallel lines so that you can tell it from a mirror.'],
        ['p', 'When a beam reaches a beam splitter, it becomes two. One <strong>carries straight on</strong> in the direction it was going. The other <strong>turns through 90 degrees</strong>, exactly as it would at a mirror of the same shape. Both keep the color of the beam that came in. A tap flips only the beam that turns; the straight one stays where it was, just as the spot on the wall stayed put when you turned the sheet.'],
        ['img', {
          src: '/img/optics/en-ch2.webp',
          alt: 'The PRISM chapter 2 Splitting card. In the “Before tap” board, a green beam from a light source on the left is divided by a beam splitter shaped like “\\”: one beam carries straight on to the right and the other turns down. The crystal above is unlit. In the “After tap” board, the beam splitter has become “/”. The straight beam is unchanged, and the other beam now turns up and lights the green crystal. Below are a short explanation of half-silvered mirrors and the game rule.',
          w: 680,
          h: 1052,
        }],
        ['p', 'More beams mean that one light source can light several crystals. One beam splitter makes two beams; if one of those meets a second beam splitter, there are three. The 32 boards of chapter 2 ask the same question again and again: where should this beam be divided so that it reaches every crystal? A few boards also have a wall. A wall absorbs any beam that reaches it, so the beam ends there.'],
        ['p', 'The <a href="/play/">browser demo</a> covers chapter 1, which has mirrors only. Beam splitters turn up often in the <a href="/en/daily/">daily light puzzle</a>, three new boards every day, and on the second board of the printable worksheet below. In class, ask students to sketch how many beams there will be, and where each one ends up, <em>before</em> they tap.'],
      ],
      check: [
        {
          q: 'A beam splitter reflects 30% of the light that hits it. Ignoring any light the plate absorbs, what percentage passes through?',
          a: '70%. The light that passes through and the light that is reflected must add up to the light that arrived, so 100% - 30% = 70%. A real plate absorbs a little, so the true figure is slightly lower.',
        },
        {
          q: 'In a lit room at night you can see your reflection in the window. Why is it hard to see in the daytime?',
          a: 'The glass reflects the same small share of the light by day and by night. In the daytime, the light coming in through the glass from outside is far brighter, so the faint reflection goes unnoticed. At night it is dark outside and your reflection is all that is left.',
        },
        {
          q: 'In PRISM, a beam heading right meets a beam splitter shaped like “\\”. What happens? And after one tap?',
          a: 'The beam is divided in two: one beam carries on to the right and the other turns down. After one tap the shape is “/”. The beam heading right is unchanged and the other one now turns up.',
        },
      ],
      differs: [
        'After a real beam splitter, both beams are dimmer than the beam that went in. The game does not track brightness. However many times a beam is divided, every branch lights a crystal fully.',
        'Real beam splitters come in different ratios, and the ratio shifts a little with the angle and the color of the light. The plate also absorbs a little. In the game a beam splitter treats every color the same way: one beam straight on, one beam turned.',
        'A real plate has thickness, so its back surface adds a second, weaker reflection, and a beam passing through at a slant comes out shifted slightly sideways. In the game the beam divides cleanly at the center of the square.',
        'A real beam splitter can be set at any angle. In the game it has only the two positions “/” and “\\”, like a mirror, so the turned beam always leaves at 90 degrees.',
        'When real beams that have been divided are brought back together, they can make a pattern of bright and dark bands called interference, which is what an interferometer measures. There is no interference in the game.',
      ],
    },
  },
};
