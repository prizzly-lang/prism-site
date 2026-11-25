/**
 * 개념 페이지 4/7 「빛의 합성」(`/learn/light-mixing/`)의 한·영 문구. 틀은 prism 저장소
 * `docs/OPTICS-SITE.md` 3절, 순서는 `site.mjs`의 CONCEPTS. 확인 문제(`check`)와 게임과
 * 다른 점(`differs`)은 템플릿이 본문 뒤에 그리므로 `body`에 되풀이하지 않는다.
 *
 * ## 게임 규칙의 출처 (prism 저장소, v1.6 브랜치)
 * - `src/engine/types.ts`: 색은 빨강 1, 초록 2, 파랑 4의 비트다. 노랑=빨강+초록, 마젠타=빨강+파랑,
 *   시안=초록+파랑, 흰색=셋 모두.
 * - `src/engine/beam.ts`의 `case 'crystal'`: 결정에 닿은 빛의 색을 비트 합(OR)으로 쌓는다.
 *   결과가 결정의 목표 색과 **정확히 같을 때만** 켜진다. 모자라도, 남는 색이 섞여 들어와도 꺼진다.
 *   빛줄기끼리는 공중에서 섞이지 않고, 결정에서만 합쳐진다.
 * - 4챕터 이름은 `src/engine/levels.ts`의 CHAPTER_NAMES에서 「혼합」(영어 Mixing).
 * - 원리 그림은 `src/game/optics.ts`의 CMP_MIX(`/img/optics/<lang>-ch4.webp`).
 *
 * ## 물리 (교과서 수준에서 확인한 것만)
 * - 빛의 삼원색은 빨강, 초록, 파랑이다. 겹치면 밝아지는 가산혼합이다.
 * - 사람 눈에는 색을 구별하는 원뿔세포가 세 종류 있다. 노랑 파장이 새로 생기는 것이 아니라,
 *   빨강과 초록이 함께 자극될 때 뇌가 노랑으로 해석한다(`optics.ts`의 ADDITIVE 설명과 같은 내용).
 * - 화면은 빨강·초록·파랑의 작은 점으로 색을 만든다.
 *
 * ## 교육과정 (prism `docs/WORKSHEETS.md` 4절 표)
 * - 한국 2022 개정 과학과 중학교 [9과10-03]에 빛의 합성이 있다. 표의 NGSS·영국 칸은 「없음」이라
 *   영어 쪽에는 대응 표준을 지어내지 않고 「표준에 이름이 없다」고 쓴다.
 *
 * ## 쓰지 않은 것
 * - 가격, 스토어 배지, 물감(감산혼합)의 자세한 설명(다음 개념 「색 필터」에서). 「계정」.
 */
export default {
  slug: 'light-mixing',
  order: 4,
  chapter: 4,
  date: '2026-11-26',
  updated: '2026-11-26',
  langs: ['ko', 'en'],
  worksheet: null,
  text: {
    ko: {
      title: '빛의 합성',
      subtitle: 'PRISM 4챕터 「혼합」',
      desc: '빨강, 초록, 파랑 빛을 겹치면 왜 노랑, 마젠타, 시안, 흰색이 될까요? 손전등 실험, 눈의 세 가지 원뿔세포, 화면의 색, 빛 퍼즐 PRISM 4챕터로 빛의 합성을 알아봅니다.',
      definition: '빛의 합성은 서로 다른 색의 빛을 겹쳐 새로운 색으로 보이게 하는 것으로, 빨강·초록·파랑 빛 가운데 두 가지를 겹치면 노랑·마젠타·시안이 되고 셋을 모두 겹치면 흰빛에 가깝게 보입니다.',
      level: '중학교 (초등 5~6학년은 실험으로)',
      minutes: '10분',
      materials: '손전등 3개, 빨강·초록·파랑 셀로판지(없으면 색 투명 필름), 고무줄, 흰 벽이나 흰 종이, 어두운 방.',
      curriculum: '2022 개정 과학과 중학교 「빛과 파동」의 [9과10-03]에서 빛의 합성을 다룹니다. 미국의 NGSS와 영국(잉글랜드) KS3 표준에는 이 주제의 이름이 따로 없어서, 영어권 학생에게는 색에 관한 심화 활동으로 읽으면 됩니다.',
      body: [
        ['h2', '작은 실험'],
        ['p', '손전등 세 개의 앞을 각각 빨강, 초록, 파랑 셀로판지로 막고 고무줄로 고정합니다. 어두운 방에서 세 손전등을 흰 벽에 비춥니다. 처음에는 한 번에 하나씩, 그다음에는 둘씩, 마지막에는 셋을 겹쳐 봅니다.'],
        ['ol', [
          '한 번에 한 손전등만 켭니다. 벽에 빨강, 초록, 파랑 빛 점이 하나씩 생깁니다.',
          '빨강과 초록 손전등을 같은 자리에 겹쳐 비춥니다. 어떤 색이 되는지 봅니다. 같은 방법으로 빨강과 파랑, 초록과 파랑도 해 봅니다.',
          '세 손전등을 모두 한 자리에 겹칩니다. 색이 어떻게 보이는지 봅니다. 벽에서 1m쯤 떨어져 책이나 테이프로 손전등을 받쳐 두면 빛을 한 자리에 모으기 쉽습니다. 셀로판지는 한 겹씩만 쓰고(두 겹이면 많이 어두워집니다), 완전한 흰색이 아니어도 흰색에 가깝게 보이면 성공입니다.',
        ]],
        ['note', '<strong>안전</strong>: 손전등 빛을 사람의 눈에 직접 비추지 않습니다. 레이저 포인터는 쓰지 않습니다. 셀로판지가 뜨거워지지 않도록 LED 손전등처럼 열이 적은 것을 씁니다.'],

        ['h2', '무슨 일이 일어났나'],
        ['p', '빨강과 초록이 겹친 곳은 <strong>노랑</strong>, 빨강과 파랑이 겹친 곳은 <strong>마젠타</strong>(자홍색), 초록과 파랑이 겹친 곳은 <strong>시안</strong>(청록색)으로 보입니다. 세 빛을 모두 겹치면 <strong>흰색</strong>에 가깝게 보입니다. 빨강·초록·파랑을 <strong>빛의 삼원색</strong>이라고 부릅니다.'],
        ['p', '이 섞임은 물감과 반대입니다. 물감은 섞을수록 어두워지지만, 빛은 겹칠수록 밝아집니다. 이렇게 빛을 더하는 섞임을 「합성」(가산혼합)이라고 합니다. 앞에서 본 <a href="/learn/dispersion/">빛의 분산</a>이 흰 빛을 색으로 나누는 일이라면, 합성은 그 색들을 다시 모아 흰빛으로 되돌리는 일입니다.'],
        ['h3', '노란 빛은 정말 노란 빛일까'],
        ['p', '벽에 생긴 노랑은 노란색 파장의 빛이 새로 생겨서가 아닙니다. 사람 눈의 망막에는 색을 구별하는 <strong>원뿔세포</strong>가 세 종류 있고, 각각 빨강, 초록, 파랑 계열 빛에 가장 잘 반응하고 그 범위는 서로 겹칩니다. 빨강 빛과 초록 빛이 함께 들어와 두 세포가 같이 자극되면, 뇌가 그 신호를 노랑으로 해석합니다. 그러니 같은 노랑으로 보여도 노란 파장 하나일 수도, 빨강과 초록의 합일 수도 있습니다.'],

        ['h2', '합성은 어디에 쓰일까'],
        ['ul', [
          '<strong>텔레비전, 휴대폰, 컴퓨터 화면</strong>: 빨강, 초록, 파랑 세 가지 작은 점의 밝기를 조절해서 모든 색을 만듭니다. 확대경으로 화면을 보면 이 점들이 보입니다.',
          '<strong>무대 조명</strong>: 빨강, 초록, 파랑 조명의 세기를 바꿔 원하는 색의 빛을 만듭니다.',
          '<strong>프린터와 물감</strong>은 다른 원리를 씁니다. 색이 빛을 흡수해 가며 어두워지는 쪽으로 섞입니다. 다음 개념 「색 필터」에서 이어집니다.',
        ]],

        ['h2', '게임 속 장면'],
        ['p', 'A Driven의 빛 퍼즐 PRISM은 4챕터 「혼합」에서 노랑, 마젠타, 시안 결정을 본격적으로 다룹니다. 결정에는 켜야 할 목표 색이 정해져 있습니다. 빨강 결정에는 빨강 빛이, 노랑 결정에는 <strong>빨강과 초록이 함께</strong> 닿아야 합니다.'],
        ['img', {
          src: '/img/optics/ko-ch4.webp',
          alt: 'PRISM 4챕터 「혼합」 원리 카드. 왼쪽 「탭 전」 판에서는 왼쪽 빨강 광원의 빛이 오른쪽으로 가서 노란 결정에 닿지만, 오른쪽 아래 초록 광원의 빛은 왼쪽 거울에서 아래로 꺾여 결정을 지나칩니다. 결정은 꺼져 있습니다. 오른쪽 「탭 후」 판에서는 거울을 돌려 초록 빛이 위로 올라가 같은 결정에 닿고, 노란 결정이 켜집니다. 아래에 빛의 합성 설명과 게임 규칙이 적혀 있습니다.',
          w: 680,
          h: 1052,
        }],
        ['p', '규칙은 두 가지입니다. 첫째, 빛줄기끼리는 공중에서 섞이지 않습니다. 빛이 한 결정에 닿았을 때 비로소 색이 합쳐집니다. 둘째, 결정은 합쳐진 색이 목표 색과 <strong>정확히 같을 때만</strong> 켜집니다. 노랑 결정에 빨강만 닿으면 모자라서 꺼지고, 빨강과 초록과 파랑이 모두 닿으면 흰색이 되어 노랑이 아니니 역시 꺼집니다.'],
        ['p', '그래서 4챕터는 「어느 색 빛을 어느 결정으로 보낼까」와 「이 결정에 닿으면 안 되는 색은 누가 막을까」를 함께 푸는 문제가 됩니다. 한 빛줄기를 <a href="/learn/beam-splitter/">반투명 거울</a>로 나누면 같은 색을 두 결정에 보낼 수 있어서, 앞의 개념이 함께 쓰입니다. <a href="/daily/">오늘의 빛 퍼즐</a>에도 색 결정이 자주 나옵니다. 수업에서는 탭하기 전에 「이 결정에는 어떤 색 빛이 와야 하고, 어떤 색은 오면 안 될까?」를 먼저 말해 보게 하세요.'],
      ],
      check: [
        {
          q: '빨강 빛과 초록 빛을 겹치면 어떤 색이 되고, 파랑과 초록을 겹치면 어떤 색이 될까요?',
          a: '빨강과 초록은 노랑, 초록과 파랑은 시안(청록색)이 됩니다. 빨강과 파랑은 마젠타(자홍색)가 됩니다.',
        },
        {
          q: '물감을 섞는 것과 빛을 섞는 것은 어떻게 다른가요?',
          a: '물감은 섞을수록 빛을 더 많이 흡수해서 어두워지고, 빛은 겹칠수록 밝아집니다. 그래서 빛의 삼원색을 모두 겹치면 어두운 색이 아니라 흰빛이 됩니다.',
        },
        {
          q: 'PRISM에서 노란 결정에 빨강, 초록, 파랑 빛이 모두 닿으면 켜질까요?',
          a: '켜지지 않습니다. 세 색이 합쳐지면 흰색이 되어 목표 색인 노랑과 다릅니다. 결정은 합쳐진 색이 목표 색과 정확히 같을 때만 켜집니다.',
        },
      ],
      differs: [
        '게임에는 빨강, 초록, 파랑과 그 합 네 가지(노랑, 마젠타, 시안, 흰색)만 있습니다. 실제 빛은 무한히 많은 파장과 밝기를 가집니다.',
        '게임의 색은 켜짐과 꺼짐뿐이어서 밝기를 따지지 않습니다. 실제로는 세 빛의 세기를 달리하면 주황, 분홍, 연두처럼 더 많은 색을 만들 수 있습니다.',
        '게임에서는 빛줄기끼리 공중에서 섞이지 않고 결정에서만 합쳐집니다. 실제로도 빛줄기는 공중에서 서로 섞이지 않고 그대로 지나갑니다. 다만 두 빛이 같은 벽이나 같은 눈에 닿으면 그 자리에서 합쳐진 색으로 보입니다. 게임에서는 결정이 그 자리 역할을 합니다.',
        '게임의 결정은 합쳐진 색이 정확히 같아야 켜집니다. 실제 눈은 비슷한 색을 같은 색으로 보기도 합니다.',
      ],
    },

    en: {
      title: 'Mixing colored light',
      subtitle: 'PRISM chapter 4 “Mixing”',
      desc: 'Why red, green and blue light make yellow, magenta, cyan and white when they overlap: a flashlight experiment, the three cone cells in the eye, screen colors and chapter 4 of the PRISM light puzzle.',
      definition: 'Mixing colored light means overlapping lights of different colors so the eye sees a new color: overlapping two of red, green and blue light makes yellow, magenta or cyan, and all three together look white.',
      level: 'Ages 10 to 14 (the topic itself is middle school; younger students can try the experiment)',
      minutes: '10 minutes',
      materials: 'Three flashlights (torches), red, green and blue cellophane (or colored transparent film), rubber bands, a white wall or sheet of white paper, and a dark room.',
      curriculum: 'The national standards of the United States (NGSS) and England (KS3) do not name this topic on its own, so this page works as an extension activity about color. Korea’s 2022 middle school science curriculum includes it as the composition of light.',
      body: [
        ['h2', 'A small experiment'],
        ['p', 'Cover the front of each of three flashlights with red, green and blue cellophane, and hold it on with a rubber band. In a dark room, shine the three flashlights at a white wall. First try one at a time, then two at a time, and finally all three overlapping.'],
        ['ol', [
          'Turn on one flashlight at a time. You get a red, a green and a blue spot on the wall.',
          'Shine the red and green flashlights on the same spot and look at the color. Try red with blue, and green with blue, in the same way.',
          'Overlap all three flashlights on one spot and look at the color. Prop the flashlights on books or tape about a meter from the wall so the spots are easy to overlap. Use one layer of cellophane (two layers make the light much dimmer). It is a success if the spot looks close to white, even if not perfectly white.',
        ]],
        ['note', '<strong>Safety</strong>: do not shine a flashlight into anyone’s eyes. Do not use a laser pointer. Avoid flashlights whose bulbs get hot, so the cellophane cannot heat up.'],

        ['h2', 'What happened'],
        ['p', 'Where red and green overlap, you see <strong>yellow</strong>. Red and blue make <strong>magenta</strong> (a purplish pink), and green and blue make <strong>cyan</strong> (blue-green). All three together look close to <strong>white</strong>. Red, green and blue are called the <strong>primary colors of light</strong>.'],
        ['p', 'This is the opposite of mixing paint. Paint gets darker the more you mix it, but light gets brighter the more you overlap it. Mixing by adding light together is called additive mixing. The page on <a href="/learn/dispersion/">dispersion of light</a> showed white light splitting into colors; mixing gathers those colors back into white.'],
        ['h3', 'Is yellow light really yellow?'],
        ['p', 'The yellow on the wall is not a new yellow wavelength of light. The retina of the human eye has three kinds of <strong>cone cells</strong> for color, and they respond most to red, green and blue light. When red and green light arrive together and stimulate two kinds of cone, the brain reads the signal as yellow. So the same yellow can come from one yellow wavelength, or from red and green added together.'],

        ['h2', 'Where mixing light is used'],
        ['ul', [
          '<strong>TV, phone and computer screens</strong>: they make every color by changing the brightness of tiny red, green and blue dots. A magnifying glass held to a screen shows the dots.',
          '<strong>Stage lighting</strong>: lamps in red, green and blue are turned up and down to make light of any color.',
          '<strong>Printers and paint</strong> work differently. Colors absorb light, so mixing them gets darker. The next concept, color filters, picks this up.',
        ]],

        ['h2', 'A scene in the game'],
        ['p', 'In the light puzzle PRISM, chapter 4 “Mixing” puts yellow, magenta and cyan crystals at the center. Each crystal has a target color to light up. A red crystal needs red light, and a yellow crystal needs <strong>red and green together</strong>.'],
        ['img', {
          src: '/img/optics/en-ch4.webp',
          alt: 'The principle card for PRISM chapter 4, Mixing. In the left board, before a tap, the red beam from the left emitter travels right to a yellow crystal, but the green beam from the lower right is bent down by a mirror and misses the crystal, so the crystal stays off. In the right board, after a tap, the mirror has turned and the green beam goes up to the same crystal, which lights up. Below are an explanation of mixing light and the game rule.',
          w: 680,
          h: 1144,
        }],
        ['p', 'There are two rules. First, beams do not mix in mid air. Colors combine only when light reaches a crystal. Second, a crystal lights up only when the combined color is <strong>exactly</strong> its target. If only red reaches a yellow crystal, there is too little, so it stays off. If red, green and blue all reach it, the result is white, not yellow, so it stays off as well.'],
        ['p', 'So chapter 4 asks two questions together: which colored beam goes to which crystal, and what stops a color from reaching a crystal that must not get it. Splitting a beam with a <a href="/learn/beam-splitter/">beam splitter</a> lets one color serve two crystals, so the earlier concept is used here too. <a href="/daily/">Today’s light puzzles</a> often include colored crystals. In class, ask students what colors a crystal needs, and which colors it must not get, before they tap anything.'],
      ],
      check: [
        {
          q: 'What color do red and green light make when they overlap, and what do green and blue make?',
          a: 'Red and green make yellow, and green and blue make cyan (blue-green). Red and blue make magenta (a purplish pink).',
        },
        {
          q: 'How is mixing light different from mixing paint?',
          a: 'Paint absorbs more light the more you mix it, so it gets darker. Light gets brighter the more you overlap it. That is why all three primary colors of light make white, not a dark color.',
        },
        {
          q: 'In PRISM, does a yellow crystal light up if red, green and blue light all reach it?',
          a: 'No. The three colors combine into white, which is different from the target yellow. A crystal lights only when the combined color is exactly its target.',
        },
      ],
      differs: [
        'The game has only red, green and blue and their combinations: yellow, magenta, cyan and white. Real light has endless wavelengths and brightnesses.',
        'Each color in the game is simply on or off, with no brightness. In reality, changing the strength of the three lights makes many more colors, such as orange, pink and lime.',
        'In the game, beams do not mix in mid air and combine only at crystals. In reality too, light beams pass through each other in mid air without mixing. The combined color appears where both lights land on the same wall or enter the same eye. In the game, the crystal plays that role.',
        'A game crystal lights only on an exact color match. A real eye can treat similar colors as the same color.',
      ],
    },
  },
};
