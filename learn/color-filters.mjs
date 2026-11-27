/**
 * 개념 페이지 5/7 「색 필터」(`/learn/color-filters/`)의 한·영 문구. 틀은 prism 저장소
 * `docs/OPTICS-SITE.md` 3절, 순서는 `site.mjs`의 CONCEPTS. 확인 문제(`check`)와 게임과
 * 다른 점(`differs`)은 템플릿이 본문 뒤에 그리므로 `body`에 되풀이하지 않는다.
 *
 * ## 게임 규칙의 출처 (prism 저장소, v1.6 브랜치)
 * - `src/engine/beam.ts`의 `case 'filter'`: 필터에 닿은 빛은 방향을 바꾸지 않고
 *   `color & 필터의 통과 마스크`만 남아 직진한다. 남는 색이 없으면(0) 그 자리에서 빛이 끝난다.
 * - `src/levels.json`: 필터는 5챕터(53판)와 6챕터(18판)에만 나오고 색은 빨강(1)·초록(2)·파랑(4) 셋뿐이다.
 * - 5챕터 이름은 `src/engine/levels.ts`의 CHAPTER_NAMES에서 「정제」(영어 Filtering).
 * - 결정은 합쳐진 색이 목표와 정확히 같을 때만 켜지므로, 흰 빛 그대로는 빨강 결정을 켜지 못한다
 *   (`src/game/optics.ts` CMP_FILTER 주석).
 * - 원리 그림은 `optics.ts`의 CMP_FILTER(`/img/optics/<lang>-ch5.webp`).
 *
 * ## 물리 (교과서 수준에서 확인한 것만)
 * - 색 필터(셀로판지 등)는 자기 색 파장대의 빛은 대부분 통과시키고 나머지는 흡수한다.
 *   그래서 겹칠수록 어두워진다(감산). 노랑 필터는 빨강+초록을, 시안 필터는 초록+파랑을 통과시키므로
 *   둘을 겹치면 초록이 남는다.
 * - 필터 뒤에서 물체의 색은 「그 필터가 통과시키는 색을 물체가 얼마나 반사하느냐」로 밝기가 정해진다.
 *
 * ## 교육과정 (prism `docs/WORKSHEETS.md` 4절 표)
 * - 색 필터: 한국 없음(심화), NGSS 없음, 영국 KS3 「흡수·반사에 따른 색」.
 *
 * ## 쓰지 않은 것
 * - 가격, 스토어 배지, 「계정」. 게임에 없는 노랑·시안 필터를 게임이 다룬다는 말.
 */
export default {
  slug: 'color-filters',
  order: 5,
  chapter: 5,
  date: '2026-11-28',
  updated: '2026-11-28',
  langs: ['ko', 'en'],
  worksheet: null,
  text: {
    ko: {
      title: '색 필터',
      subtitle: 'PRISM 5챕터 「정제」',
      desc: '빨간 셀로판지를 통해 보면 왜 세상이 빨갛게 보일까요? 색 필터가 빛을 걸러 내는 원리를 손전등과 셀로판지 실험, 겹칠수록 어두워지는 이유, 빛 퍼즐 PRISM 5챕터로 알아봅니다.',
      definition: '색 필터는 빛 가운데 자기 색의 성분만 통과시키고 나머지는 대부분 흡수하는 투명한 재료로, 흰빛이 빨간 필터를 지나면 빨강만 남고 파란 빛은 빨간 필터를 지나지 못합니다.',
      level: '초등 5~6학년부터 중학생',
      minutes: '10분',
      materials: '흰색 LED 손전등 1개, 빨강·초록·파랑 셀로판지(노랑·시안이 있으면 더 좋습니다), 고무줄, 흰 벽이나 흰 종이, 색깔이 있는 물건 몇 개(빨간 컵, 초록 잎 등), 어두운 방.',
      curriculum: '한국 2022 개정 과학과와 미국 NGSS에는 색 필터를 따로 다루는 성취기준이 없어서 심화 활동으로 읽으면 됩니다. 영국(잉글랜드) KS3 빛 단원은 물체의 색이 빛을 흡수하고 반사하는 방식에 따라 정해진다는 내용과 이어집니다.',
      body: [
        ['h2', '작은 실험'],
        ['p', '흰색 손전등의 앞을 빨간 셀로판지로 막고 고무줄로 고정한 뒤, 어두운 방에서 흰 벽에 비춥니다. 손전등은 흰빛을 내는데, 벽에는 빨간 빛 점이 생깁니다. 셀로판지를 바꿔 가며 아래를 해 봅니다.'],
        ['ol', [
          '빨간 셀로판지 한 겹으로 벽을 비춥니다. 벽에 빨간 점이 생기는지 봅니다. 초록, 파랑 셀로판지로도 해 봅니다.',
          '빨간 셀로판지 위에 초록 셀로판지를 한 겹 더 겹쳐 손전등을 막고 비춥니다. 벽의 점이 얼마나 밝은지 보고, 한 겹일 때와 비교합니다. 셀로판지는 완벽하지 않아서 완전히 깜깜해지지 않을 수 있지만, 눈에 띄게 어두워집니다.',
          '손전등을 끄고 방을 밝게 한 뒤, 빨간 셀로판지를 눈앞에 대고 빨간 물건과 초록 물건을 봅니다. 어느 쪽이 더 밝게 보이는지, 어느 쪽이 어둡게 보이는지 말해 봅니다.',
          '(더 해 보기) 노랑과 시안 셀로판지가 있다면 둘을 겹쳐서 흰 벽을 비춰 봅니다. 초록에 가까운 색이 보입니다.',
        ]],
        ['note', '<strong>안전</strong>: 손전등 빛을 사람의 눈에 직접 비추지 않습니다. 레이저 포인터는 쓰지 않습니다. 셀로판지가 뜨거워지지 않도록 LED 손전등처럼 열이 적은 것을 씁니다.'],

        ['h2', '무슨 일이 일어났나'],
        ['p', '흰빛에는 여러 색의 빛이 섞여 있습니다(<a href="/learn/dispersion/">빛의 분산</a>에서 본 것처럼 프리즘이 이 색들을 갈라 줍니다). 빨간 셀로판지는 이 가운데 <strong>빨강은 통과시키고 나머지 색은 흡수</strong>합니다. 그래서 벽에는 빨강만 닿습니다. 셀로판지가 빨강을 새로 만든 것이 아니라, 다른 색을 걸러 낸 것입니다.'],
        ['p', '두 번째 실험에서 초록 셀로판지를 겹치면 어두워지는 이유도 같습니다. 빨간 셀로판지를 지나온 빛은 거의 빨강만 남았는데, 초록 셀로판지는 빨강을 흡수합니다. 겹칠 때마다 통과하는 빛이 줄어들 뿐 늘어나지는 않으므로 필터를 겹칠수록 어두워집니다. 노랑 셀로판지는 빨강과 초록을, 시안 셀로판지는 초록과 파랑을 통과시키므로, 둘을 겹치면 둘 다 통과시키는 초록만 남습니다.'],
        ['p', '이것은 <a href="/learn/light-mixing/">빛의 합성</a>과 반대 방향입니다. 합성은 색을 더해서 밝아지고, 필터는 색을 빼서 어두워집니다. 이렇게 빛을 빼는 섞임을 「감산」이라고 합니다. 물감과 프린터 잉크가 섞을수록 어두워지는 것도 같은 종류의 일입니다.'],
        ['h3', '물체의 색도 비슷한 발상일까'],
        ['p', '세 번째 실험에서 빨간 셀로판지를 통해 보면 빨간 물건은 밝게, 초록 물건은 어둡게 보입니다. 빨간 물건은 빨강 빛을 잘 반사하고, 초록 물건은 빨강 빛을 별로 반사하지 않기 때문입니다. 물체의 색도 「어떤 색 빛을 반사하고 어떤 색 빛을 흡수하느냐」에서 나옵니다.'],

        ['h2', '필터는 어디에 쓰일까'],
        ['ul', [
          '<strong>사진과 영화</strong>: 렌즈 앞에 색 필터를 달아 분위기를 바꾸거나 필요 없는 색을 줄입니다.',
          '<strong>무대 조명</strong>: 흰 조명 앞에 색 필름을 끼워 빨강, 파랑 같은 색 조명을 만듭니다.',
          '<strong>신호등</strong>: 색 덮개가 램프의 빛 가운데 정해진 색만 내보냅니다.',
        ]],

        ['h2', '게임 속 장면'],
        ['p', 'A Driven의 빛 퍼즐 PRISM은 5챕터 「정제」에서 필터 조각이 처음 나옵니다. 필터는 빛을 꺾지 않고 곧게 통과시키되, <strong>필터의 색 성분만 남깁니다</strong>. 흰빛이 빨간 필터를 지나면 빨강이 되고, 파란 빛이 빨간 필터에 닿으면 남는 것이 없어서 그 자리에서 빛이 끝납니다. 게임의 필터는 빨강, 초록, 파랑 세 가지입니다.'],
        ['img', {
          src: '/img/optics/ko-ch5.webp',
          alt: 'PRISM 5챕터 「정제」 원리 카드. 왼쪽 「탭 전」 판에서는 왼쪽 광원의 흰 빛이 거울에서 아래로 꺾여 빨간 필터와 빨간 결정에서 멀어집니다. 오른쪽 「탭 후」 판에서는 거울을 돌려 흰 빛이 위로 올라가 빨간 필터를 지나 빨강만 남고, 빨간 결정이 켜집니다. 아래에 필터 설명과 게임 규칙이 적혀 있습니다.',
          w: 680,
          h: 1004,
        }],
        ['p', '4챕터에서 배운 대로 결정은 합쳐진 색이 목표와 <strong>정확히 같을 때만</strong> 켜집니다. 흰 빛이 빨강 결정에 그대로 닿으면 빨강, 초록, 파랑이 모두 있어서 꺼집니다. 빨간 필터를 한 번 지나 빨강만 남겨야 켜집니다. 필터는 「이 결정에 닿으면 안 되는 색을 막는 장치」입니다.'],
        ['p', '원리 카드의 장면은 필터 하나뿐이지만, 5챕터의 판은 모두 <a href="/learn/dispersion/">프리즘</a>으로 흰빛을 색으로 나누고, <a href="/learn/beam-splitter/">반투명 거울</a>로 빛줄기를 갈라, 필요한 색만 필터로 골라 각 결정에 보내는 판입니다. 필터는 6챕터에도 나옵니다. <a href="/daily/">오늘의 빛 퍼즐</a>에서도 만날 수 있습니다. 수업에서는 탭하기 전에 「이 빛이 필터를 지나면 무슨 색이 남을까, 남는 것이 없으면 어디서 끝날까?」를 먼저 말해 보게 하세요.'],
      ],
      check: [
        {
          q: '빨간 필터에 흰빛을 비추면 무슨 색 빛이 나오고, 파란 빛을 비추면 어떻게 될까요?',
          a: '흰빛은 빨강만 남아 빨간 빛이 나옵니다. 파란 빛은 빨간 필터에 흡수되어 거의 아무것도 나오지 않습니다.',
        },
        {
          q: '색 필터를 여러 장 겹칠수록 왜 어두워질까요?',
          a: '필터는 자기 색이 아닌 빛을 흡수해서 걸러 내기만 하고 빛을 새로 만들지는 못합니다. 겹칠 때마다 통과하는 빛이 줄기만 하므로 어두워집니다.',
        },
        {
          q: 'PRISM에서 흰빛이 빨강 결정에 그대로 닿으면 켜질까요? 켜려면 무엇이 필요할까요?',
          a: '켜지지 않습니다. 흰빛은 빨강, 초록, 파랑이 모두 있어서 목표 색인 빨강과 다릅니다. 빨간 필터를 먼저 지나 빨강만 남겨서 보내야 합니다.',
        },
      ],
      differs: [
        '게임의 필터는 빨강, 초록, 파랑 세 가지이고, 자기 색은 그대로, 나머지는 완전히 없앱니다. 실제 필터는 자기 색 빛도 조금 흡수해서 약간 어두워지고, 다른 색도 조금 통과시킵니다.',
        '게임의 빛에는 밝기가 없고 색이 켜져 있거나 꺼져 있을 뿐입니다. 실제로는 필터를 지날 때마다 빛의 세기가 줄어듭니다.',
        '게임에는 노랑이나 시안 필터가 없습니다. 실제 노랑 필터는 빨강과 초록을 함께 통과시킵니다.',
        '실제 필터는 한 가지 색이 아니라 어느 정도 넓은 범위의 파장을 통과시킵니다. 게임은 이를 빨강, 초록, 파랑 세 가지로 단순하게 나눕니다.',
      ],
    },

    en: {
      title: 'Color filters',
      subtitle: 'PRISM chapter 5 “Filtering”',
      desc: 'Why does the world look red through red cellophane? A flashlight and cellophane experiment shows how a color filter removes light, why stacking filters makes things darker, and how chapter 5 of the PRISM light puzzle uses them.',
      definition: 'A color filter is a transparent material that lets through only light of its own color and mostly absorbs the rest, so white light that passes a red filter comes out red, while blue light cannot pass a red filter.',
      level: 'Ages 10 to 14',
      minutes: '10 minutes',
      materials: 'One white LED flashlight (torch), red, green and blue cellophane (yellow and cyan too if you have them), rubber bands, a white wall or sheet of white paper, a few colored objects (a red cup, a green leaf), and a dark room.',
      curriculum: 'The Korean 2022 science curriculum and the US NGSS have no standard for color filters on their own, so treat this as an extension activity. In England, the KS3 light unit connects to the idea that the color of an object depends on how it absorbs and reflects light.',
      body: [
        ['h2', 'A small experiment'],
        ['p', 'Cover the front of a white flashlight with red cellophane, hold it on with a rubber band, and shine it at a white wall in a dark room. The flashlight gives white light, but the spot on the wall is red. Swap the cellophane to try the steps below.'],
        ['ol', [
          'Shine the flashlight through one layer of red cellophane and look at the spot. Try green and blue cellophane too.',
          'Cover the flashlight with red cellophane and a layer of green cellophane on top of it, and shine it. Compare how bright the spot is with the single-layer one. Cellophane is not perfect, so it may not go fully dark, but it is clearly dimmer.',
          'Turn off the flashlight and light the room. Hold red cellophane in front of your eye and look at a red object and a green object. Say which one looks brighter and which looks darker.',
          '(Extra) If you have yellow and cyan cellophane, stack them and shine the light on the wall. You see a color close to green.',
        ]],
        ['note', '<strong>Safety</strong>: do not shine a flashlight into anyone’s eyes. Do not use a laser pointer. Use a cool LED flashlight so the cellophane cannot heat up.'],

        ['h2', 'What happened'],
        ['p', 'White light is a mixture of many colors (the page on <a href="/learn/dispersion/">dispersion of light</a> showed a prism pulling them apart). Red cellophane <strong>lets red through and absorbs the other colors</strong>, so only red reaches the wall. The cellophane did not make red. It removed the rest.'],
        ['p', 'Stacking green cellophane on top makes the spot darker for the same reason. Light that passed the red cellophane is nearly all red, and green cellophane absorbs red. Each extra layer can only take light away, never add it, so more filters means a darker result. Yellow cellophane passes red and green, and cyan cellophane passes green and blue, so stacking them leaves only green, the one color both let through.'],
        ['p', 'This is the opposite direction from <a href="/learn/light-mixing/">mixing colored light</a>. Mixing adds colors and gets brighter, while filtering removes colors and gets darker. Mixing by taking light away is called subtractive mixing. Paint and printer ink get darker as you mix them for the same kind of reason.'],
        ['h3', 'Is the color of an object a similar idea?'],
        ['p', 'In the third step, a red object looks bright through red cellophane and a green object looks dark. The red object reflects red light well, and the green object reflects little red light. The color of an object also comes from which colors of light it reflects and which it absorbs.'],

        ['h2', 'Where filters are used'],
        ['ul', [
          '<strong>Photography and film</strong>: a colored filter on the lens changes the mood or cuts out an unwanted color.',
          '<strong>Stage lighting</strong>: a sheet of colored film in front of a white lamp makes red or blue light.',
          '<strong>Traffic lights</strong>: a colored cover lets only one color of the lamp’s light out.',
        ]],

        ['h2', 'A scene in the game'],
        ['p', 'In the light puzzle PRISM, filter pieces first appear in chapter 5 “Filtering”. A filter does not bend light. It lets it straight through but <strong>keeps only the filter’s own color</strong>. White light that passes a red filter becomes red, and blue light that reaches a red filter has nothing left, so the beam ends right there. The game has red, green and blue filters.'],
        ['img', {
          src: '/img/optics/en-ch5.webp',
          alt: 'The principle card for PRISM chapter 5, Filtering. In the left board, before a tap, white light from the left emitter is bent down by a mirror, away from the red filter and the red crystal. In the right board, after a tap, the mirror has turned and the white light goes up through the red filter, leaving only red, and the red crystal lights up. Below are an explanation of filtering and the game rule.',
          w: 680,
          h: 1052,
        }],
        ['p', 'As in chapter 4, a crystal lights up only when the combined color is <strong>exactly</strong> its target. White light that hits a red crystal directly contains red, green and blue, so the crystal stays off. The light has to pass a red filter first, leaving only red. A filter is the piece that stops a color from reaching a crystal that must not get it.'],
        ['p', 'The principle card shows a single filter, but every chapter 5 board splits white light into colors with a <a href="/learn/dispersion/">prism</a>, divide beams with a <a href="/learn/beam-splitter/">beam splitter</a>, and use filters to send just the right colors to each crystal. Filters appear in chapter 6 as well, and you can meet them in <a href="/daily/">today’s light puzzles</a>. In class, ask students what color is left after a beam passes a filter, and where the beam ends if nothing is left, before they tap anything.'],
      ],
      check: [
        {
          q: 'What comes out when white light shines on a red filter, and what happens to blue light?',
          a: 'White light comes out red, because only the red part is left. Blue light is absorbed by the red filter, so almost nothing comes out.',
        },
        {
          q: 'Why does stacking more color filters make the light darker?',
          a: 'A filter only absorbs the colors that are not its own and never makes new light. Each extra layer can only reduce the light that gets through.',
        },
        {
          q: 'In PRISM, does a red crystal light up if white light hits it directly? What does it need?',
          a: 'No. White light has red, green and blue together, which is different from the target red. The light has to pass a red filter first so only red is left.',
        },
      ],
      differs: [
        'Game filters are red, green or blue, and keep their own color fully while removing the rest completely. Real filters absorb a little of their own color too, so they dim it slightly, and they let a little of other colors through.',
        'Light in the game has no brightness, only colors that are on or off. In reality the light gets weaker every time it passes a filter.',
        'The game has no yellow or cyan filters. A real yellow filter lets red and green through together.',
        'A real filter passes a fairly wide range of wavelengths, not one exact color. The game simplifies this into red, green and blue.',
      ],
    },
  },
};
