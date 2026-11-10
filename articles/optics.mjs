/**
 * 교사·부모용 글: 일곱 챕터가 각각 어떤 광학 원리를 다루는가.
 *
 * 왜 쓰는가: 2026-11-09 측정(TODO.md 3절)에서 「optics puzzle game for students」,
 * 「광원리 배우는 퍼즐 게임」 같은 질문에 답변 엔진이 PC 게임·웹 시뮬레이터·보드게임만
 * 들었다. 이름을 넣고 물으면 ChatGPT가 PRISM의 챕터를 개념별로 정확히 나열하고 「학생에게
 * 흥미로운 이유」까지 붙이는데, 이름 없이는 떠올리지 않는다. 그 질문에 걸릴 설명 글이
 * 우리 도메인에 없어서다.
 *
 * 네 언어 모두 쓴다. 이 글의 독자(교사·부모)는 앱이 지원하는 네 언어 어디에나 있고,
 * 본문의 절반이 앱의 원리 카드라 번역이 이미 있다.
 *
 * ## 본문의 출처
 *
 * - 각 챕터의 「실제」·「게임에서는」·덧붙인 이야기: prism 저장소 `src/game/optics.ts`의
 *   `OPTICS[].text`를 **글자 그대로** 옮겼다. 앱과 글이 다른 말을 하면 하나는 틀린다
 * - 「게임이 실제 광학과 다른 점」: 같은 파일의 `DIVERGENCE`
 * - 챕터 이름: `src/game/i18n.ts`의 `chapterNames`
 * - 판 수: `src/levels.json`(1.5 기준 14·32·44·52·53·45·60, 합 300)
 * - 「생각해 볼 질문」만 이 글에서 새로 썼다. 답이 게임 규칙과 갈리는 곳은 그렇다고 적었다
 *
 * **가격은 쓰지 않는다.** 1.5(유료)와 1.6(iOS 무료 + 잠금해제)이 2주 간격으로 나가서,
 * 글에 적으면 어느 한쪽에서 거짓이 된다. 가격은 랜딩 페이지와 JSON-LD가 한 곳에서 맡는다.
 * 같은 이유로 「인앱결제 없음」, 「완전 오프라인」도 쓰지 않고 두 버전 모두에서 참인
 * 「광고·회원가입 없음」, 「플레이 중에는 인터넷이 필요 없음」만 쓴다.
 */

const S = (s) => `<strong>${s}</strong>`;

/** 앱의 DIVERGENCE는 강조를 **로 적는다. 여기서는 <strong>으로 바꾼다. */
const bold = (s) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/**
 * 한 챕터 = 제목 + 원리 카드 사진 + 실제 + 게임 + (덧붙임) + 질문. 블록 순서를 네 언어가
 * 공유한다. 사진 자리(`card`)는 아래 `withCards`가 그 언어·그 챕터의 이미지로 바꾼다.
 */
const chapter = (h, real, gameLabel, game, extra, qLabel, q, a) => [
  ['h2', h],
  ['card', h],
  ['p', real],
  ['p', `${S(gameLabel)} ${game}`],
  ...(extra ? [['p', extra]] : []),
  ['p', `${S(qLabel)} ${q}`],
  ['p', a],
];

const DIVERGENCE = {
  ko: [
    '실제 빛은 어떤 각도로도 나아갑니다. 이 게임은 격자에 맞춰 위·아래·좌·우 네 방향으로만 제한했습니다.',
    '실제 프리즘은 색을 연속된 무지개로 펼칩니다. 이 게임은 빨강·초록·파랑 세 줄기로 끊었습니다. 화면이 색을 만드는 방식과 같습니다.',
    '결정이 요구한 색과 **정확히** 일치해야 켜지는 것은 게임 규칙입니다. 실제 물체는 빛을 더 받으면 그냥 더 밝아질 뿐입니다.',
    '빛줄기끼리 교차해도 서로 간섭하지 않습니다. 실제로는 간섭 무늬가 생깁니다.',
    '실제 편광판은 비스듬히 돌리면 빛을 일부만 통과시키고, 편광되지 않은 빛은 지나가면서 절반으로 어두워집니다. 이 게임의 편광판은 두 자세뿐이라 빛이 전부 지나가거나 전부 막히고, 밝기는 그대로입니다.',
  ],
  en: [
    'Real light travels at any angle. This game restricts it to four directions (up, down, left, right) to fit the grid.',
    'A real prism spreads a continuous rainbow. This game cuts it to three beams: red, green and blue, the same three your screen uses.',
    'Requiring an **exact** color match to light a crystal is a game rule. A real object hit by extra light simply gets brighter.',
    'Beams here cross without affecting each other. Real light would produce interference patterns.',
    'A real polarizer turned at a slant passes only part of the light, and unpolarized light comes out half as bright. Polarizers here have just two positions, so light either passes completely or is blocked completely, and its brightness never changes.',
  ],
  ja: [
    '本物の光はどんな角度にも進みます。このゲームは格子に合わせて、上・下・左・右の4方向だけに制限しています。',
    '本物のプリズムは色を切れ目のない虹に広げます。このゲームは赤・緑・青の3本に区切りました。画面が色を作るのと同じ3色です。',
    '結晶が求める色と**ぴったり**一致しないと灯らないのは、ゲームのルールです。実際の物体は光を余分に受ければ、ただ明るくなるだけです。',
    '光の筋どうしが交差しても、たがいに影響しません。実際には干渉縞ができます。',
    '本物の偏光板は斜めに回すと光を一部だけ通し、偏光していない光は通り抜けると半分の明るさになります。このゲームの偏光板は2つの向きしかないので、光はすべて通るかすべて遮られるかのどちらかで、明るさも変わりません。',
  ],
  'zh-Hans': [
    '真实的光可以朝任意角度前进。为了配合网格，本作只保留上、下、左、右四个方向。',
    '真实的棱镜会把颜色展开成连续的彩虹。本作把它切成红、绿、蓝三束——和屏幕造色用的三种一样。',
    '必须与结晶要求的颜色**完全**一致才会点亮，这是游戏规则。真实的物体多受一点光，只会更亮而已。',
    '这里的光束交叉时互不影响。真实的光会产生干涉条纹。',
    '真实的偏振片斜着转时只放行一部分光，未偏振的光穿过后会暗一半。本作的偏振片只有两个方向，光要么全部通过、要么全部被挡，亮度也不变。',
  ],
};

const TEXT = {
  ko: {
    title: '퍼즐로 배우는 빛: PRISM 일곱 챕터 수업 안내',
    desc: 'A Driven의 빛 퍼즐 게임 PRISM은 반사, 빔 분할, 프리즘 분산, 빛의 삼원색, 색 필터, 분광, 편광을 챕터마다 하나씩 다룹니다. 챕터별 원리와 실제 예, 생각해 볼 질문, 게임이 실제 광학을 어디서 단순화했는지를 교사와 부모를 위해 정리했습니다.',
    lead: `PRISM은 A Driven이 만든 iOS·Android 빛 퍼즐입니다. 조각을 탭해 돌려 빛의 길을 바꾸고, 모든 결정에 요구된 색을 정확히 비추면 판이 풀립니다. ${S('일곱 챕터는 각각 실제 광학 원리 하나를 들여오고,')} 챕터에 처음 들어갈 때 그 원리를 설명하는 카드가 뜹니다. 이 글은 그 카드 일곱 장을 한곳에 모으고, 수업에서 던져 볼 질문을 붙였습니다.`,
    backHome: '← PRISM 소개로',
    dateLabel: '2026년 11월 12일',
    body: [
      ['h2', '한눈에 보기'],
      [
        'table',
        [
          ['챕터', '다루는 원리', '판 수', '실제 예'],
          ['1 반사', '거울의 반사', '14', '벽에 튕기는 공'],
          ['2 분열', '반투명 거울(빔 스플리터)', '32', '중력파 검출기 LIGO'],
          ['3 분산', '프리즘이 흰 빛을 가름', '44', '뉴턴의 프리즘 실험'],
          ['4 혼합', '빛의 가산혼합(삼원색)', '52', '휴대폰 화면'],
          ['5 정제', '색 필터(빼는 장치)', '53', '빨간 셀로판지'],
          ['6 수렴', '부품을 이은 분광 장치', '45', '별빛으로 원소 찾기'],
          ['7 편광', '편광판', '60', '편광 선글라스, 액정 화면'],
        ],
      ],
      [
        'p',
        '앞 챕터에서 배운 조각은 뒤 챕터에도 계속 나옵니다. 6챕터에는 새 조각이 없고, 그때까지 배운 것을 한 판에서 전부 씁니다.',
      ],
      ...chapter(
        '1장 반사',
        '공을 비스듬히 벽에 던지면 반대쪽으로 같은 만큼 튕겨 나가죠. 빛도 거울에서 똑같이 튕깁니다. 이것을 반사라고 합니다.',
        '게임에서는',
        '거울을 탭하면 기울어진 방향이 반대로 바뀝니다. 빛은 언제나 직각으로 꺾입니다.',
        null,
        '생각해 볼 질문.',
        '45도로 기운 거울에 수평으로 들어온 빛은 어느 쪽으로 나갈까요?',
        '들어온 방향과 직각으로, 기운 방향에 따라 위나 아래로 나갑니다. 들어오는 각과 나가는 각이 둘 다 45도이기 때문입니다. 게임에서 빛이 언제나 직각으로 꺾이는 이유가 이것입니다.',
      ),
      ...chapter(
        '2장 분열',
        '유리에 은을 아주 얇게 입히면 신기한 일이 생깁니다. 빛의 절반은 그대로 통과하고, 나머지 절반은 거울처럼 튕깁니다. 실험실에서 쓰는 진짜 장비입니다.',
        '게임에서는',
        '반투명 거울은 통과와 반사를 동시에 합니다. 빛 하나가 둘이 됩니다.',
        '중력파를 처음 검출한 LIGO의 핵심 부품이 바로 이 빔 스플리터입니다. 4km 떨어진 두 팔로 빛을 쪼개 보낸 뒤 다시 합쳐, 시공간이 늘어난 흔적을 읽어냈습니다.',
        '생각해 볼 질문.',
        '반투명 거울 두 장을 연달아 그대로 통과한 빛은 처음 밝기의 얼마일까요?',
        '4분의 1입니다. 흡수를 무시하면 한 장을 지날 때마다 절반씩 남습니다. 게임은 밝기를 따지지 않고 빛이 가는 길만 따집니다.',
      ),
      ...chapter(
        '3장 분산',
        '흰 빛은 사실 여러 색이 겹쳐 있는 빛입니다. 유리를 지날 때 색마다 꺾이는 정도가 달라서, 프리즘을 지나면 색이 갈라져 나옵니다. 파랑이 가장 많이 꺾이고 빨강이 가장 적게 꺾입니다.',
        '게임에서는',
        '프리즘은 흰 빛을 빨강·초록·파랑 세 줄기로 가릅니다. 이미 색이 있는 빛은 그냥 지나갑니다.',
        '흰 빛이 여러 색의 합이라는 걸 프리즘으로 증명한 사람이 뉴턴입니다. 그전까지는 프리즘이 색을 "만들어낸다"고 믿었습니다.',
        '생각해 볼 질문.',
        '프리즘에서 나온 빨간 빛만 골라 두 번째 프리즘에 넣으면 어떻게 될까요?',
        '방향은 다시 꺾이지만 더 갈라지지 않고 빨강 그대로 나옵니다. 뉴턴이 실제로 한 실험이고, 프리즘이 색을 만드는 것이 아니라 나눌 뿐이라는 증거였습니다. 게임은 꺾이는 것까지 생략해서, 색이 있는 빛이 프리즘을 곧장 지나갑니다.',
      ),
      ...chapter(
        '4장 혼합',
        '물감은 섞을수록 어두워지는데 빛은 정반대입니다. 섞을수록 밝아집니다. 빨강과 초록을 겹치면 노랑, 빨강과 파랑은 마젠타, 초록과 파랑은 시안이 됩니다. 셋을 다 겹치면 흰빛입니다.',
        '게임에서는',
        '두 빛이 한 결정에 닿으면 색이 합쳐집니다. 노란 결정에는 빨강과 초록을, 마젠타 결정에는 빨강과 파랑을 함께 보내야 합니다.',
        '노란 파장이 새로 생기는 게 아닙니다. 사람 눈에는 색을 감지하는 세포가 세 종류뿐이라, 빨강과 초록이 함께 자극되면 뇌가 그것을 노랑으로 해석합니다. 화면도 같은 원리로 모든 색을 만듭니다. 지금 이 글자도 빨강·초록·파랑 세 점으로만 만들어져 있습니다.',
        '생각해 볼 질문.',
        '물감은 노랑과 파랑을 섞으면 초록이 됩니다. 빛은 노랑과 파랑을 겹치면 무슨 색일까요?',
        '흰색입니다. 노란 빛은 빨강과 초록의 합이라, 여기에 파랑을 더하면 세 색이 모두 모입니다. 물감과 빛이 반대로 움직인다는 걸 보여 주기 좋은 질문입니다.',
      ),
      ...chapter(
        '5장 정제',
        '빨간 셀로판지를 눈에 대면 세상이 빨갛게 보이죠. 셀로판지가 빨강을 만드는 게 아니라, 나머지 색을 삼켜서 빨강만 남기는 것입니다. 그래서 빨간 필터에 파란 빛을 넣으면 아무것도 나오지 않습니다.',
        '게임에서는',
        '필터는 자기 색 성분만 통과시킵니다. 남을 성분이 없으면 빛이 사라집니다.',
        '필터를 겹칠수록 어두워지는 이유가 이것입니다. 필터는 더하는 장치가 아니라 빼는 장치입니다.',
        '생각해 볼 질문.',
        '노란 빛을 빨간 필터에 보내면 무엇이 나올까요? 파란 필터라면요?',
        '빨간 필터에서는 빨강만 나옵니다. 노랑 안에 든 빨강 성분만 남기 때문입니다. 파란 필터에서는 아무것도 나오지 않습니다. 노랑에는 파랑 성분이 없습니다.',
      ),
      ...chapter(
        '6장 수렴',
        '진짜 광학 기계는 지금까지 본 조각들을 줄줄이 이어 붙인 것입니다. 별빛을 살펴보는 기계는 빛을 가늘게 좁히고, 프리즘으로 색을 가르고, 각 색이 얼마나 센지 잽니다. 지금까지 쓴 조각이 그대로 부품입니다.',
        '게임에서는',
        '새 조각은 없습니다. 배운 것을 한 판에서 전부 씁니다. 흰 빛을 가르고, 갈라진 색을 다시 모으고, 필요 없는 성분은 걸러냅니다.',
        '별의 성분을 어떻게 아느냐는 질문의 답이 이 구조입니다. 별빛을 프리즘으로 갈라 보면 특정 색이 검게 빠져 있고, 그 빠진 자리가 어떤 원소가 그 빛을 삼켰는지 알려줍니다. 헬륨은 지구에서 발견되기 전에 태양의 스펙트럼에서 먼저 발견됐습니다.',
        '생각해 볼 질문.',
        '별빛을 프리즘으로 갈랐더니 몇몇 색 자리가 검게 비어 있습니다. 여기서 무엇을 알 수 있을까요?',
        '빛이 지나온 별의 대기에 그 색을 삼키는 원소가 있다는 것입니다. 원소마다 삼키는 색의 자리가 정해져 있어서, 빈자리를 보고 원소를 알아냅니다. 5장의 필터가 색을 빼는 것과 같은 생각입니다.',
      ),
      ...chapter(
        '7장 편광',
        '빛은 떨리면서 나아갑니다. 햇빛은 온갖 방향으로 떨리지만, 편광판은 한 방향으로 떨리는 빛만 통과시킵니다. 편광 선글라스가 물에 반사된 눈부심을 지우는 원리입니다.',
        '게임에서는',
        '편광판은 무늬와 같은 방향으로 떨리는 빛만 통과시킵니다. 엇갈린 무늬에 닿은 빛은 사라집니다. 무늬가 새겨진 광원은 처음부터 한 방향으로 떨리는 빛을 냅니다.',
        '휴대폰 화면에도 편광판이 들어 있습니다. 액정 화면은 두 장의 편광판 사이에서 빛의 떨림 방향을 비틀어 밝기를 조절합니다. 3D 영화관 안경도 두 눈에 서로 다른 편광판을 씌웁니다.',
        '생각해 볼 질문.',
        '편광 선글라스 두 개를 겹치고 한쪽만 90도 돌리면 어떻게 보일까요?',
        '거의 깜깜해집니다. 첫 장을 지난 빛은 한 방향으로만 떨리는데, 둘째 장은 그와 직각인 방향만 통과시키기 때문입니다. 게임에서 엇갈린 무늬에 닿은 빛이 사라지는 것과 같습니다.',
      ),
      ['h2', '게임이 실제 광학과 다른 점'],
      [
        'p',
        '게임 규칙을 만들려고 단순화한 곳이 있습니다. 앱의 「빛의 원리」 화면에도 같은 내용이 있습니다. 학생과 "게임에서는 왜 이렇게 했을까"를 이야기해 보는 것도 좋은 수업이 됩니다.',
      ],
      ['ul', DIVERGENCE.ko.map(bold)],
      ['h2', '수업이나 집에서 쓸 때'],
      [
        'ul',
        [
          `1챕터 14판은 설치 없이 <a href="/play/">브라우저 체험판</a>으로 해 볼 수 있습니다. 수업 전에 미리 보기 좋습니다.`,
          `1~4챕터의 판 네 개로 만든 <a href="/worksheet/">인쇄용 학습지 「빛의 길 찾기」</a>가 있습니다. 흑백으로 인쇄해도 풀리고, 정답지가 따로 있습니다.`,
          '광고와 회원가입이 없습니다. 플레이하는 동안 인터넷이 필요 없습니다.',
          '색을 구별하기 어려워도 전부 풀 수 있습니다. 결정마다 색을 나타내는 도형이 새겨져 있습니다(빨강은 삼각형, 초록은 사각형, 파랑은 원. 노란 결정에는 삼각형과 사각형이 함께).',
          '글자 크기를 세 단계로 바꿀 수 있고, 기기의 「동작 줄이기」 설정을 따릅니다.',
          '원리 카드는 챕터에 처음 들어갈 때 뜨고, 앱의 「빛의 원리」 화면에서 언제든 다시 볼 수 있습니다. 덧붙인 이야기(LIGO, 뉴턴, 헬륨 등)는 그 화면에 있습니다.',
          '한국어, 영어, 일본어, 중국어(간체)를 지원합니다. 판마다 정답이 정확히 하나라서, 막혔을 때 운으로 넘어가지 않고 원리를 다시 따져 보게 됩니다.',
        ],
      ],
    ],
  },

  en: {
    title: 'Teaching light with a puzzle game: the seven chapters of PRISM',
    desc: 'PRISM, a light puzzle game by A Driven, introduces one optics principle per chapter: reflection, beam splitting, dispersion, additive color mixing, color filters, spectroscopy and polarization. A chapter-by-chapter guide for teachers and parents, with real-world examples, questions to ask, and where the game simplifies real optics.',
    lead: `PRISM is a light puzzle for iOS and Android by A Driven. Tap a piece to turn it, change where the light goes, and a board is solved when every crystal receives exactly the color it asks for. ${S('Each of the seven chapters brings in one real optics principle,')} and a card explaining it appears the first time you enter that chapter. This page collects all seven cards in one place and adds a question to ask in class for each.`,
    backHome: '← About PRISM',
    dateLabel: '12 November 2026',
    body: [
      ['h2', 'At a glance'],
      [
        'table',
        [
          ['Chapter', 'Principle', 'Levels', 'Real-world example'],
          ['1 Reflect', 'Reflection in a mirror', '14', 'A ball bouncing off a wall'],
          ['2 Split', 'Half-silvered mirror (beam splitter)', '32', 'The LIGO gravitational-wave detector'],
          ['3 Disperse', 'A prism separating white light', '44', "Newton's prism experiment"],
          ['4 Mix', 'Additive color mixing (RGB)', '52', 'Your phone screen'],
          ['5 Refine', 'Color filters (subtraction)', '53', 'Red cellophane'],
          ['6 Converge', 'Parts chained into a spectrometer', '45', 'Finding elements in starlight'],
          ['7 Polarize', 'Polarizers', '60', 'Polarized sunglasses, LCD screens'],
        ],
      ],
      [
        'p',
        'Pieces learned in earlier chapters keep appearing later. Chapter 6 adds no new piece; it uses everything learned so far on a single board.',
      ],
      ...chapter(
        'Chapter 1: Reflection',
        'Throw a ball at a wall on a slant and it bounces away by the same amount. Light does exactly this on a mirror. We call it reflection.',
        'In the game:',
        'Tapping a mirror flips which way it leans. Light always turns a right angle.',
        null,
        'Question to ask:',
        'Light travels horizontally into a mirror tilted at 45 degrees. Which way does it leave?',
        'At a right angle to where it came from, up or down depending on the tilt, because the angle in and the angle out are both 45 degrees. That is why light in the game always turns a right angle.',
      ),
      ...chapter(
        'Chapter 2: Splitting',
        'Coat glass with a very thin layer of silver and something odd happens. Half the light goes straight through; the other half bounces off like a mirror. This is real laboratory equipment.',
        'In the game:',
        'A half-silvered mirror passes light and reflects it at the same time. One beam becomes two.',
        'The beam splitter is the heart of LIGO, the instrument that first detected gravitational waves. It split light down two 4 km arms and recombined it to read a stretch in spacetime.',
        'Question to ask:',
        'Light passes straight through two half-silvered mirrors in a row. How bright is it compared with the start?',
        'A quarter as bright. Ignoring absorption, half is left after each mirror. The game does not track brightness, only where the light goes.',
      ),
      ...chapter(
        'Chapter 3: Dispersion',
        'White light is really many colors layered together. Glass bends each color by a different amount, so a prism spreads them apart. Blue bends the most, red the least.',
        'In the game:',
        'A prism splits white light into red, green and blue. Light that already has a color passes straight through.',
        'Newton used a prism to prove that white light is a mixture of colors. Before him, people believed the prism was creating the colors.',
        'Question to ask:',
        'Take only the red light coming out of a prism and send it into a second prism. What happens?',
        'It bends again but does not split any further: it stays red. Newton did exactly this experiment, and it showed that a prism separates colors rather than making them. The game skips even the bending, so colored light goes straight through a prism.',
      ),
      ...chapter(
        'Chapter 4: Mixing',
        'Paint gets darker the more you mix it. Light does the opposite: it gets brighter. Red and green make yellow, red and blue make magenta, green and blue make cyan. All three together make white.',
        'In the game:',
        'When two beams reach one crystal their colors combine. A yellow crystal needs red and green; a magenta one needs red and blue.',
        'No yellow wavelength appears. Human eyes have only three kinds of color-sensing cell; stimulate the red and green ones together and the brain calls it yellow. Your screen makes every color the same way. These very letters are built from nothing but red, green and blue dots.',
        'Question to ask:',
        'Mixing yellow and blue paint gives green. What do yellow and blue light give?',
        'White. Yellow light is red plus green, so adding blue brings all three together. It is a good question for showing that paint and light work in opposite directions.',
      ),
      ...chapter(
        'Chapter 5: Filtering',
        'Hold red cellophane up to your eye and everything looks red. The cellophane is not making red. It is swallowing every other color and leaving red behind. Send blue light into a red filter and nothing comes out.',
        'In the game:',
        'A filter passes only its own color component. If nothing is left, the light dies.',
        'This is why stacking filters only ever gets darker. A filter subtracts; it never adds.',
        'Question to ask:',
        'What comes out when yellow light goes into a red filter? And into a blue filter?',
        'Red comes out of the red filter, because only the red part of yellow survives. Nothing comes out of the blue filter: yellow has no blue in it.',
      ),
      ...chapter(
        'Chapter 6: Convergence',
        'A real optical instrument is just these same parts chained together. The machine that studies starlight narrows the beam, splits the colors with a prism, and measures how strong each color is. Every piece you have used is a real component.',
        'In the game:',
        'No new piece here. You use everything at once: split white light, gather the parts back together, and filter out what you do not need.',
        'This structure is how we know what stars are made of. Split starlight with a prism and certain colors are missing; the gaps say which elements swallowed them. Helium was found in the spectrum of the Sun before anyone found it on Earth.',
        'Question to ask:',
        'Starlight split by a prism shows a few dark gaps where some colors should be. What do the gaps tell us?',
        'That the star\'s atmosphere contains elements that swallow those colors. Each element absorbs its own fixed set of colors, so the gaps identify the elements. It is the same idea as a filter removing color in chapter 5.',
      ),
      ...chapter(
        'Chapter 7: Polarization',
        'Light shakes as it travels. Sunlight shakes in every direction, but a polarizer lets through only light shaking one way. That is how polarized sunglasses wipe the glare off water.',
        'In the game:',
        'A polarizer passes only light shaking the same way as its stripes. Light that meets crossed stripes disappears. A light source marked with stripes sends out light that already shakes one way.',
        'Your phone screen has polarizers inside it too. An LCD twists the direction light shakes between two polarizers to set its brightness. 3D cinema glasses put a different polarizer over each eye.',
        'Question to ask:',
        'Overlap two pairs of polarized sunglasses and turn one by 90 degrees. What do you see?',
        'Almost total darkness. Light leaving the first lens shakes in one direction only, and the second lens passes only the direction at right angles to it. It is the same as light vanishing at crossed stripes in the game.',
      ),
      ['h2', 'Where the game differs from real optics'],
      [
        'p',
        'Some things are simplified to make a game. The app\'s "How light works" screen lists the same points. Asking students why the game made each choice is a good lesson in itself.',
      ],
      ['ul', DIVERGENCE.en.map(bold)],
      ['h2', 'Using it in class or at home'],
      [
        'ul',
        [
          `Chapter 1 (14 levels) is playable in the browser with nothing to install: <a href="/play/">try the demo</a>. Handy for a look before class.`,
          `A <a href="/en/worksheet/">printable worksheet, Path of Light</a>, uses four boards from chapters 1 to 4. It works in black and white and has a separate answer key.`,
          'No ads and no sign-up. No internet connection is needed while playing.',
          'Fully playable without telling colors apart. Every crystal carries a shape for each color it needs (red is a triangle, green a square, blue a circle; a yellow crystal shows a triangle and a square).',
          'Three text sizes, and the game follows the device\'s Reduce Motion setting.',
          'Each principle card appears the first time you enter its chapter and can be reopened any time from the app\'s "How light works" screen. The extra stories (LIGO, Newton, helium and more) are on that screen.',
          'Available in English, Korean, Japanese and Simplified Chinese. Every board has exactly one solution, so a stuck student cannot luck through; they have to reason about the light again.',
        ],
      ],
    ],
  },

  ja: {
    title: 'パズルで学ぶ光のしくみ：PRISMの7つの章と本物の光学',
    desc: 'A Drivenの光のパズルゲームPRISMは、反射、ビームスプリッター、プリズムの分散、光の三原色、色フィルター、分光、偏光を章ごとにひとつずつ扱います。章ごとの原理と身近な例、考えてみる問い、ゲームが本物の光学をどこで単純化したかを、先生と保護者向けにまとめました。',
    lead: `PRISMは、A Drivenが作ったiOS・Android向けの光のパズルです。ピースをタップして回し、光の道すじを変えて、すべての結晶に求められた色をぴったり当てると盤面クリアです。${S('7つの章はそれぞれ本物の光学の原理をひとつずつ取り入れていて、')}その章に初めて入るとき、原理を説明するカードが表示されます。このページはその7枚のカードを1か所に集め、授業で投げかけられる問いを添えました。`,
    backHome: '← PRISMの紹介へ',
    dateLabel: '2026年11月12日',
    body: [
      ['h2', 'ひと目でわかる一覧'],
      [
        'table',
        [
          ['章', '扱う原理', '面数', '身近な例'],
          ['1 反射', '鏡の反射', '14', '壁にはね返るボール'],
          ['2 分割', 'ハーフミラー（ビームスプリッター）', '32', '重力波望遠鏡 LIGO'],
          ['3 分散', 'プリズムが白い光を分ける', '44', 'ニュートンのプリズム実験'],
          ['4 混色', '光の加法混色（三原色）', '52', 'スマートフォンの画面'],
          ['5 フィルター', '色フィルター（引く装置）', '53', '赤いセロハン'],
          ['6 収束', '部品をつないだ分光装置', '45', '星の光から元素を知る'],
          ['7 偏光', '偏光板', '60', '偏光サングラス、液晶画面'],
        ],
      ],
      [
        'p',
        '前の章で覚えたピースは、後の章にも出てきます。6章には新しいピースがなく、それまでに学んだことを1つの盤面で全部使います。',
      ],
      ...chapter(
        '1章 反射',
        'ボールを壁に斜めに投げると、同じだけ反対側へはね返りますよね。光も鏡の上でまったく同じようにはねます。これを反射といいます。',
        'ゲームでは',
        '鏡をタップすると、傾いている向きが反対になります。光はいつも直角に曲がります。',
        null,
        '考えてみよう。',
        '45度に傾いた鏡に、水平に入った光はどちらへ出ていくでしょう？',
        '入ってきた向きと直角に、傾きによって上か下へ出ていきます。入る角度と出る角度がどちらも45度だからです。ゲームで光がいつも直角に曲がるのはこのためです。',
      ),
      ...chapter(
        '2章 分割',
        'ガラスに銀をごく薄くのせると、不思議なことが起きます。光の半分はそのまま通り抜け、残りの半分は鏡のようにはね返るのです。実験室で使う本物の装置です。',
        'ゲームでは',
        'ハーフミラーは、通すことと反射することを同時にやります。1本の光が2本になります。',
        '重力波を初めてとらえた LIGO の心臓部が、このビームスプリッターです。4km 離れた2本の腕へ光を分けて送り、もう一度合わせて、時空が伸びた跡を読み取りました。',
        '考えてみよう。',
        'ハーフミラーを2枚続けてまっすぐ通り抜けた光は、はじめの明るさのどれくらいでしょう？',
        '4分の1です。吸収を考えなければ、1枚通るごとに半分ずつ残ります。ゲームは明るさを扱わず、光の道すじだけを扱います。',
      ),
      ...chapter(
        '3章 分散',
        '白い光は、じつはいろいろな色が重なった光です。ガラスを通るとき色ごとに曲がり方が違うので、プリズムを抜けると色が分かれて出てきます。青がいちばん大きく曲がり、赤がいちばん小さく曲がります。',
        'ゲームでは',
        'プリズムは白い光を赤・緑・青の3本に分けます。すでに色のついた光は、そのまま通り抜けます。',
        '白い光がいろいろな色の集まりだと、プリズムで証明したのがニュートンです。それまでは、プリズムが色を「作り出している」と思われていました。',
        '考えてみよう。',
        'プリズムから出た赤い光だけを取り出して、2つ目のプリズムに入れるとどうなるでしょう？',
        '向きはまた曲がりますが、それ以上は分かれず赤のまま出てきます。ニュートンが実際に行った実験で、プリズムは色を作るのではなく分けるだけだという証拠になりました。ゲームでは曲がることも省いて、色のついた光はプリズムをまっすぐ通り抜けます。',
      ),
      ...chapter(
        '4章 混色',
        '絵の具は混ぜるほど暗くなりますが、光はその逆で、混ぜるほど明るくなります。赤と緑で黄、赤と青でマゼンタ、緑と青でシアン。3つ全部を重ねると白になります。',
        'ゲームでは',
        '2本の光が同じ結晶に届くと、色が足し合わされます。黄の結晶には赤と緑を、マゼンタの結晶には赤と青を送りましょう。',
        '黄色い波長が新しく生まれるわけではありません。人の目には色を感じる細胞が3種類しかなく、赤と緑が同時に刺激されると、脳がそれを黄色と受け取るのです。画面もまったく同じしくみであらゆる色を作ります。いま読んでいるこの文字も、赤・緑・青の点だけでできています。',
        '考えてみよう。',
        '絵の具の黄と青を混ぜると緑になります。では、黄の光と青の光を重ねると何色でしょう？',
        '白です。黄の光は赤と緑の和なので、青を足すと3色がそろいます。絵の具と光が逆に働くことを示すのにぴったりの問いです。',
      ),
      ...chapter(
        '5章 フィルター',
        '赤いセロハンを目に当てると、世界が赤く見えますよね。セロハンが赤を作っているのではなく、ほかの色を飲み込んで赤だけを残しているのです。だから赤いフィルターに青い光を入れても、何も出てきません。',
        'ゲームでは',
        'フィルターは自分の色の成分だけを通します。残る成分がなければ、光は消えます。',
        'フィルターを重ねるほど暗くなるのは、このためです。フィルターは足す装置ではなく、引く装置です。',
        '考えてみよう。',
        '黄の光を赤いフィルターに入れると何が出てくるでしょう？青いフィルターなら？',
        '赤いフィルターからは赤だけが出てきます。黄に含まれる赤の成分だけが残るからです。青いフィルターからは何も出てきません。黄には青の成分がありません。',
      ),
      ...chapter(
        '6章 収束',
        '本物の光学装置は、ここまで見てきた部品をつなげただけのものです。星の光を調べる装置は、光を細く絞り、プリズムで色を分け、色ごとの強さを測ります。ここまで使ってきたピースが、そのまま部品なのです。',
        'ゲームでは',
        '新しいピースはありません。学んだことを1つの盤面で全部使います。白い光を分け、分かれた色をまた集め、いらない成分をこし取ります。',
        '星が何でできているかがなぜわかるのか、その答えがこの組み合わせです。星の光をプリズムで分けると、ある色だけが黒く抜けていて、その抜けた場所が、どの元素がその光を飲み込んだかを教えてくれます。ヘリウムは地球で見つかるより先に、太陽のスペクトルの中で見つかりました。',
        '考えてみよう。',
        '星の光をプリズムで分けたら、いくつかの色の場所が黒く抜けていました。ここから何がわかるでしょう？',
        '光が通ってきた星の大気に、その色を飲み込む元素があるということです。元素ごとに飲み込む色の場所が決まっているので、抜けた場所から元素がわかります。5章のフィルターが色を引くのと同じ考え方です。',
      ),
      ...chapter(
        '7章 偏光',
        '光は振動しながら進みます。太陽の光はあらゆる方向に振動していますが、偏光板はひとつの方向に振動する光だけを通します。偏光サングラスが水面のギラつきを消すしくみです。',
        'ゲームでは',
        '偏光板は、しま模様と同じ方向に振動する光だけを通します。しまが交差していると、光は消えます。しま模様のある光源は、はじめからひとつの方向に振動する光を出します。',
        'スマートフォンの画面にも偏光板が入っています。液晶画面は2枚の偏光板のあいだで光の振動の向きをねじって、明るさを調節しています。3D映画のメガネも、左右の目に違う偏光板をかぶせています。',
        '考えてみよう。',
        '偏光サングラスを2つ重ねて、片方だけ90度回すとどう見えるでしょう？',
        'ほとんど真っ暗になります。1枚目を通った光はひとつの方向にだけ振動していて、2枚目はそれと直角の方向しか通さないからです。ゲームで、しまが交差したところで光が消えるのと同じです。',
      ),
      ['h2', 'ゲームが本物の光学と違うところ'],
      [
        'p',
        'ゲームのルールにするために単純化したところがあります。アプリの「光のしくみ」画面にも同じ内容があります。「ゲームではなぜこうしたのか」を生徒と話し合うのも、よい授業になります。',
      ],
      ['ul', DIVERGENCE.ja.map(bold)],
      ['h2', '授業や家庭で使うとき'],
      [
        'ul',
        [
          `1章の14面は、インストールなしで<a href="/play/">ブラウザ体験版</a>で遊べます。授業の前に下見するのに便利です。`,
          '広告も会員登録もありません。遊んでいるあいだはインターネットが要りません。',
          '色の見分けがつきにくくても、すべて解けます。結晶には色ごとの図形が刻まれています（赤は三角、緑は四角、青は丸。黄の結晶には三角と四角）。',
          '文字の大きさを3段階で変えられ、端末の「視差効果を減らす」設定に従います。',
          '原理カードは章に初めて入るときに表示され、アプリの「光のしくみ」画面からいつでも見直せます。LIGO、ニュートン、ヘリウムなどの補足はその画面にあります。',
          '日本語、英語、韓国語、中国語（簡体字）に対応しています。どの盤面も答えがちょうどひとつなので、つまずいても運では進めず、光の道すじを考え直すことになります。',
        ],
      ],
    ],
  },

  'zh-Hans': {
    title: '用解谜游戏学光学：PRISM 的七个章节与真实的光',
    desc: 'A Driven 出品的光线解谜游戏 PRISM，每章讲一个光学原理：反射、分束器、棱镜色散、光的三原色、滤光片、光谱分析和偏振。本文按章节整理了原理、生活中的例子、可以提给学生的问题，以及游戏在哪些地方简化了真实的光学，供老师和家长参考。',
    lead: `PRISM 是 A Driven 为 iOS 和 Android 制作的光线解谜游戏。点一下元件让它旋转，改变光的路径；当每颗结晶都恰好收到它要求的颜色时，这一关就过了。${S('七个章节各引入一个真实的光学原理，')}第一次进入某一章时，会弹出一张讲解该原理的卡片。本文把这七张卡片集中到一起，并为每一章配了一个可以在课堂上提出的问题。`,
    backHome: '← 返回 PRISM 介绍',
    dateLabel: '2026年11月12日',
    body: [
      ['h2', '一览'],
      [
        'table',
        [
          ['章节', '原理', '关卡数', '生活中的例子'],
          ['1 反射', '镜面反射', '14', '撞墙弹回的球'],
          ['2 分束', '半透镜（分束器）', '32', '引力波探测器 LIGO'],
          ['3 色散', '棱镜把白光分开', '44', '牛顿的棱镜实验'],
          ['4 混色', '光的加色混合（三原色）', '52', '手机屏幕'],
          ['5 滤光', '滤光片（做减法）', '53', '红色玻璃纸'],
          ['6 汇聚', '串起元件的光谱仪', '45', '从星光里找元素'],
          ['7 偏振', '偏振片', '60', '偏光太阳镜、液晶屏'],
        ],
      ],
      [
        'p',
        '前面章节学到的元件，后面会继续出现。第 6 章没有新元件，要在一个盘面上用上之前学过的全部内容。',
      ],
      ...chapter(
        '第 1 章 反射',
        '把球斜着扔向墙，它会以同样的角度弹开。光碰到镜子也是这样。这就叫反射。',
        '在游戏里：',
        '点击镜子，它倾斜的方向就会反过来。光线始终转九十度。',
        null,
        '想一想：',
        '光水平射向一面倾斜 45 度的镜子，会从哪个方向出去？',
        '与入射方向成直角，根据倾斜方向朝上或朝下。因为入射角和反射角都是 45 度。游戏里光线总是转九十度，原因就在这里。',
      ),
      ...chapter(
        '第 2 章 分束',
        '在玻璃上镀一层极薄的银，就会发生奇妙的事：一半光直接穿过去，另一半像遇到镜子一样弹回来。这是实验室里真实使用的器件。',
        '在游戏里：',
        '半透镜同时做两件事：让光通过，也让光反射。一束光变成两束。',
        '首次探测到引力波的 LIGO，核心部件就是这种分束器。它把光分进两条 4 公里长的臂，再合到一起，读出时空被拉伸的痕迹。',
        '想一想：',
        '光连续直穿两片半透镜后，亮度是原来的多少？',
        '四分之一。不考虑吸收的话，每穿过一片只剩一半。游戏不计算亮度，只关心光走的路径。',
      ),
      ...chapter(
        '第 3 章 色散',
        '白光其实是很多种颜色叠在一起。光穿过玻璃时，每种颜色弯折的程度都不一样，所以经过棱镜之后颜色就分开了——蓝色弯得最多，红色最少。',
        '在游戏里：',
        '棱镜把白光分成红、绿、蓝三束。本来就带颜色的光会径直穿过去。',
        '牛顿用棱镜证明了白光是多种颜色的混合。在那之前，人们以为颜色是棱镜「造」出来的。',
        '想一想：',
        '只取棱镜射出的红光，再送进第二个棱镜，会发生什么？',
        '方向会再次弯折，但不会再分开，出来的仍然是红光。这正是牛顿做过的实验，证明棱镜只是把颜色分开，而不是制造颜色。游戏连弯折也省略了，所以带颜色的光会径直穿过棱镜。',
      ),
      ...chapter(
        '第 4 章 混色',
        '颜料越混越暗，光正好相反，越混越亮。红加绿是黄，红加蓝是品红，绿加蓝是青。三种全叠在一起就是白。',
        '在游戏里：',
        '两束光照到同一个结晶上，颜色就会相加。黄色结晶需要红和绿，品红结晶需要红和蓝。',
        '并不会凭空出现一种「黄色的波长」。人眼里只有三种感色细胞，红和绿同时被激发，大脑就把它读成黄色。屏幕也是用同样的办法造出所有颜色——你正在看的这些字，也只是红、绿、蓝三种小点。',
        '想一想：',
        '黄色颜料加蓝色颜料会变成绿色。那么黄光和蓝光叠在一起是什么颜色？',
        '白色。黄光是红光加绿光，再加上蓝光，三种颜色就齐了。这个问题很适合说明颜料和光的混合方向正好相反。',
      ),
      ...chapter(
        '第 5 章 滤光',
        '把红色玻璃纸放到眼前，整个世界都变红了。玻璃纸并不是在造红色，而是把别的颜色都吞掉，只留下红色。所以把蓝光送进红色滤光片，什么也出不来。',
        '在游戏里：',
        '滤光片只放行属于自己的颜色成分。要是什么都不剩，光就消失了。',
        '这就是滤光片越叠越暗的原因。滤光片只会做减法，从不做加法。',
        '想一想：',
        '把黄光送进红色滤光片，会出来什么？换成蓝色滤光片呢？',
        '红色滤光片只放出红光，因为黄光里只有红色成分能留下。蓝色滤光片什么也放不出来，因为黄光里没有蓝色成分。',
      ),
      ...chapter(
        '第 6 章 汇聚',
        '真正的光学仪器，就是把前面这些部件一个接一个串起来。研究星光的仪器先把光束收窄，再用棱镜把颜色分开，然后量出每种颜色有多强。你一路用过的每个元件，都是真实的部件。',
        '在游戏里：',
        '这里没有新元件。你要在一个盘面上把学过的全用上——把白光分开，把分开的颜色再合起来，把不需要的成分滤掉。',
        '我们怎么知道星星由什么构成？答案就在这个结构里。用棱镜把星光分开，会发现某些颜色缺了一道黑线，缺口告诉我们是哪种元素吞掉了那段光。氦在地球上被发现之前，先在太阳的光谱里被找到。',
        '想一想：',
        '用棱镜分开星光，发现有几处颜色变成了黑线。这说明了什么？',
        '说明光经过的恒星大气里，有吞掉这些颜色的元素。每种元素吞掉的颜色位置是固定的，所以看缺口就能认出元素。这和第 5 章滤光片减去颜色是同一个道理。',
      ),
      ...chapter(
        '第 7 章 偏振',
        '光一边振动一边前进。阳光朝各个方向振动，而偏振片只放行朝一个方向振动的光。偏光太阳镜能消除水面反光，靠的就是这个原理。',
        '在游戏里：',
        '偏振片只放行和条纹方向一致的光。遇到交叉条纹的光会消失。带条纹的光源发出的光，一开始就只朝一个方向振动。',
        '手机屏幕里也有偏振片。液晶屏在两片偏振片之间扭转光的振动方向，以此调节亮度。3D 电影眼镜也给左右眼各配了不同的偏振片。',
        '想一想：',
        '把两副偏光太阳镜叠在一起，只把其中一副转 90 度，会看到什么？',
        '几乎一片漆黑。穿过第一片的光只朝一个方向振动，而第二片只放行与之垂直的方向。这和游戏里光遇到交叉条纹就消失是一样的。',
      ),
      ['h2', '游戏与真实光学的不同之处'],
      [
        'p',
        '为了做成游戏，有些地方做了简化。应用里的「光的原理」页面也列出了同样的内容。和学生讨论「游戏为什么这样设计」，本身就是一堂好课。',
      ],
      ['ul', DIVERGENCE['zh-Hans'].map(bold)],
      ['h2', '在课堂或家里使用'],
      [
        'ul',
        [
          `第 1 章的 14 关无需安装，可以在<a href="/play/">浏览器试玩版</a>里玩。适合课前先看一看。`,
          '没有广告，无需注册。游戏过程中不需要联网。',
          '分不清颜色也能全部通关。每颗结晶上都刻有代表颜色的图形（红是三角形，绿是正方形，蓝是圆形；黄色结晶上同时有三角形和正方形）。',
          '文字大小可调三档，并遵循设备的「减弱动态效果」设置。',
          '原理卡片在第一次进入章节时出现，之后随时可以在应用的「光的原理」页面重看。LIGO、牛顿、氦等补充故事也在那个页面里。',
          '支持简体中文、英语、韩语和日语。每一关都只有唯一解，卡住时没法靠运气过关，只能重新思考光的路径。',
        ],
      ],
    ],
  },
};

/*
  원리 카드 사진(img/optics/<언어>-ch<번호>.webp).

  1.6 앱에서 카드만 잘라 찍었다: prism 저장소 v1.6을 vite dev로 띄워 `?capture=1`로 열고,
  `/src/game/i18n.ts`의 setLang과 `/src/ui/screens.ts`의 opticsCard(챕터)를 브라우저에서
  불러 #ui에 끼운 뒤 `.optics-card` 요소만 Playwright로 찍는다(2배 밀도, 680px 폭).
  Windows에는 Hiragino·PingFang이 없어 일본어는 Yu Gothic·Yu Mincho, 중국어는 Microsoft
  YaHei·SimSun으로 찍었다. 앱의 카드 문구(src/game/optics.ts)를 고치면 다시 찍는다.

  사진을 넣는 이유: 「PRISM」이라는 이름을 단 우리 그림이 우리 도메인에 있어야 답변 엔진이
  다른 「Prism」 게임의 그림을 붙이지 않는다(2026-11-09 ChatGPT가 다른 게임 화면을 붙였다).

  치수는 위 파일들의 실제 크기다. 다시 찍으면 같이 고친다(레이아웃이 밀리지 않게 하는 값).
*/
const CARD_H = {
  ko: [1084, 960, 1052, 1052, 1004, 1052, 1096],
  en: [1084, 1052, 1052, 1144, 1052, 1188, 1144],
  ja: [1188, 1060, 1108, 1060, 1108, 1152, 1152],
  'zh-Hans': [1040, 960, 1008, 1008, 1008, 1052, 1008],
};
const CARD_ALT = {
  ko: (h) => `PRISM 앱의 「${h}」 원리 카드. 탭 전과 탭 후의 판, 실제 물리와 게임 규칙 설명`,
  en: (h) => `The PRISM app's ${h} principle card: the board before and after a tap, the real physics, and the game rule`,
  ja: (h) => `PRISMアプリの「${h}」の原理カード。タップ前とタップ後の盤面、本物の物理とゲームのルール`,
  'zh-Hans': (h) => `PRISM 应用的「${h}」原理卡片：点击前后的盘面、真实的物理和游戏规则`,
};
for (const [lang, t] of Object.entries(TEXT)) {
  let n = 0;
  t.body = t.body.map(([kind, v]) => {
    if (kind !== 'card') return [kind, v];
    n += 1;
    // 제목은 「1장 반사」, 「Chapter 1: Reflection」 꼴이다. 알트에는 원리 이름만 쓴다.
    const name = v.replace(/^(\d+장 |Chapter \d+: |\d+章 |第 \d+ 章 )/, '');
    return ['img', { src: `/img/optics/${lang}-ch${n}.webp`, alt: CARD_ALT[lang](name), w: 680, h: CARD_H[lang][n - 1] }];
  });
}

/** 질문 형태의 답변 엔진 질의(「학생용 광학 게임」)에 맞춰 교육 자료임을 밝힌다. */
const TEACHES = {
  ko: ['빛의 반사', '빔 스플리터', '프리즘 분산', '빛의 가산혼합', '색 필터', '분광', '편광'],
  en: ['reflection', 'beam splitting', 'dispersion', 'additive color mixing', 'color filters', 'spectroscopy', 'polarization'],
  ja: ['光の反射', 'ビームスプリッター', 'プリズムの分散', '光の加法混色', '色フィルター', '分光', '偏光'],
  'zh-Hans': ['光的反射', '分束器', '棱镜色散', '光的加色混合', '滤光片', '光谱分析', '偏振'],
};

export default {
  slug: 'optics',
  date: '2026-11-12',
  updated: '2026-11-12',
  langs: ['ko', 'en', 'ja', 'zh-Hans'],
  type: ['Article', 'LearningResource'],
  ld: (lang) => ({
    teaches: TEACHES[lang],
    learningResourceType: 'teacher guide',
    audience: { '@type': 'EducationalAudience', educationalRole: 'teacher' },
  }),
  text: TEXT,
};
