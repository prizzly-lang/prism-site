/**
 * 「Lazors 같은 게임」 안내 글.
 *
 * 왜 이 글인가: 2026-11-24 AI 답변 기록(prism 저장소 docs/ai-answers/2026-11-24.md)에서 「Lazors 같은 게임」,
 * 「God of Light 비슷한 게임」 같은 경쟁 질문 8개에 PRISM이 한 번도 나오지 않았다. 그 답의 출처는
 * thinkygames 목록, lumear.app의 「games like Lazors」 안내, alternativeto 같은 **비교·목록 글**이었다.
 * 답변 엔진이 인용하는 모양의 글을 우리 사이트에도 둔다. 질문이 네 언어에 다 있어서 네 언어로 쓴다.
 *
 * 지킬 것: 다른 게임에 대한 사실은 각 게임의 스토어·공식 페이지에서 확인한 것만 적는다. 가격처럼 자주
 * 바뀌는 것은 적지 않는다. PRISM이 우리 게임이라는 것을 글 첫머리에 밝힌다. PRISM 가격도 적지 않는다
 * (1.6 출시 전후로 바뀐다).
 *
 * 확인한 곳(2026-11-24): Lazors App Store id386458926, Play net.pyrosphere.lazors, Steam 341290 /
 * God of Light App Store id735128536, Nintendo·Xbox의 Remastered 페이지 / Chromatron: Silver Spaceship
 * Software, 무료 공개(2007) / Laser Puzzle: Mirror & Light, Play net.bohush.lasers.logic.puzzle /
 * Prism Out, Play com.vibeinc.prismout / Prism Riddle, prismriddle.com / Lumear, lumear.app.
 * 다음 점검 때 각 게임이 아직 있는지 본다.
 */

const SLUG = 'light-beam-games';
const DATE = '2026-11-24';
const UPDATED = '2026-11-24';

const LAZORS = 'https://apps.apple.com/app/lazors/id386458926';
const GOL = 'https://apps.apple.com/app/god-of-light/id735128536';

const TEXT = {
  ko: {
    title: 'Lazors·God of Light 같은 게임: 빛을 반사시키는 퍼즐 게임 8가지',
    navTitle: 'Lazors 같은 빛 퍼즐 게임',
    desc: 'Lazors, God of Light처럼 거울과 프리즘으로 빛을 보내는 퍼즐 게임을 모았습니다. 기기, 규칙, 어떤 사람에게 맞는지를 표로 비교합니다. 이 글은 PRISM을 만든 에이드리븐이 썼습니다.',
    lead: '레이저나 빛을 거울에 튕겨 목표에 닿게 하는 퍼즐을 좋아한다면 고를 게임이 꽤 많습니다. 아래는 휴대폰과 PC에서 할 수 있는 것들입니다. <strong>이 글은 빛 퍼즐 게임 PRISM을 만든 에이드리븐(A Driven)이 썼습니다.</strong> 우리 게임도 목록에 있지만, 다른 게임이 더 맞는 경우도 그대로 적었습니다.',
    dateLabel: '2026년 11월 24일',
    body: [
      ['h2', '한눈에 보기'],
      [
        'table',
        [
          ['게임', '만든 곳', '기기', '이런 사람에게'],
          ['Lazors', 'Pyrosphere', 'iPhone·iPad, Android, PC(Steam)', '블록을 옮겨 레이저를 모든 목표에 닿게 하는 원조 격 퍼즐'],
          ['God of Light', 'Playmous', 'iPhone·iPad, Android, Switch·Xbox(리마스터)', '이야기와 분위기가 있는 빛 퍼즐'],
          ['Chromatron', 'Silver Spaceship Software', 'Windows', '색 있는 빛을 같은 색 목표에 보내는 고전 PC 퍼즐'],
          ['Laser Puzzle: Mirror & Light', 'Bohush', 'Android', '판 수가 아주 많은 거울 회전 퍼즐'],
          ['Prism Out', 'Vibe Inc.', 'Android', '흰 빛을 갈라 색별로 목표를 맞히는 퍼즐'],
          ['Prism Riddle', 'prismriddle.com', '웹 브라우저', '렌즈·굴절까지 다루는 브라우저 광학 퍼즐'],
          ['Lumear', 'lumear.app', '웹 브라우저', '하루 한 판, 색 필터가 있는 레이저 퍼즐'],
          ['PRISM: 빛의 퍼즐', '에이드리븐(이 글을 쓴 곳)', 'iPhone·iPad, Android', '정답이 하나뿐인 판, 실제 광학 순서로 배우는 퍼즐'],
        ],
      ],
      ['h2', 'Lazors'],
      ['p', `블록을 옮겨 레이저를 튕기고, 모든 목표에 빛이 닿으면 풀립니다. 판이 100개가 넘고 하루 한 판 퍼즐도 있습니다. 「Lazors 같은 게임」을 찾는다면 이 규칙이 기준입니다. <a href="${LAZORS}">App Store</a>, Google Play, Steam에 있습니다.`],
      ['h2', 'God of Light'],
      ['p', `빛의 정령 「Shiny」를 도와 거울, 프리즘, 분할기, 필터로 빛줄기를 목표까지 보냅니다. 퍼즐보다 분위기와 진행을 좋아하는 사람에게 맞습니다. <a href="${GOL}">휴대폰판</a>과 Switch·Xbox용 리마스터가 있습니다.`],
      ['h2', 'Chromatron'],
      ['p', 'Sean Barrett가 만든 Windows용 고전입니다. 거울과 분할기를 놓아 색 있는 빛을 같은 색 목표에 보냅니다. 네 편이 2007년에 무료로 풀렸습니다. 색을 섞고 나누는 퍼즐을 좋아한다면 뿌리가 여기 있습니다.'],
      ['h2', 'Laser Puzzle: Mirror & Light'],
      ['p', '거울을 탭해 돌려 레이저를 목표로 보내는 Android 퍼즐입니다. 스토어 설명에 따르면 손으로 만든 판이 300개가 넘습니다. 오래 붙잡을 판 수가 중요하다면 고를 만합니다.'],
      ['h2', 'Prism Out, Prism Riddle (이름이 비슷한 다른 게임)'],
      ['p', '「Prism」이라는 이름의 빛 퍼즐이 여럿 있습니다. Prism Out은 흰 빛을 거울·프리즘·렌즈로 갈라 색별로 목표를 맞히는 Android 게임이고, Prism Riddle은 렌즈와 굴절까지 다루는 브라우저 게임입니다. 둘 다 에이드리븐의 PRISM과는 다른 게임입니다.'],
      ['h2', 'Lumear'],
      ['p', '브라우저에서 하루 한 판씩 푸는 레이저 퍼즐입니다. 거울, 프리즘, 색 필터를 씁니다. 앱을 깔지 않고 짧게 하고 싶을 때 맞습니다.'],
      ['h2', 'PRISM: 빛의 퍼즐 (우리 게임)'],
      ['p', '조각을 탭하면 90도 돌고, 빛이 바로 새 길을 찾습니다. 모든 결정에 요구된 색을 비추면 풀립니다. 다른 게임과 다른 점은 세 가지입니다.'],
      [
        'ul',
        [
          '<strong>판마다 정답이 하나뿐입니다.</strong> 300판 모두 전수 탐색으로 증명했고, 표시되는 최소 탭 수도 실제 최솟값입니다(<a href="/proven-unique/">만든 방법</a>).',
          '<strong>챕터가 실제 광학 순서를 따릅니다.</strong> 반사, 반투명 거울, 분산, 색의 합성, 필터, 분광, 편광. 챕터마다 원리 카드가 있어 수업에도 씁니다(<a href="/optics/">교사용 안내</a>).',
          '<strong>색을 못 봐도 끝까지 할 수 있습니다.</strong> 결정마다 색이 도형(빨강 삼각형, 초록 사각형, 파랑 원)으로도 표시됩니다. 광고가 없고 인터넷 없이 됩니다.',
        ],
      ],
      ['p', '<a href="/">PRISM 소개와 스토어 링크</a>'],
      ['h2', '어떻게 고를까'],
      [
        'ul',
        [
          'Lazors의 규칙 그대로 더 하고 싶다: Laser Puzzle: Mirror & Light, Lumear',
          '분위기와 이야기: God of Light',
          '색을 나누고 섞는 퍼즐: Chromatron, Prism Out, PRISM',
          '아이와 함께, 또는 빛의 원리를 배우면서: PRISM',
          '색약이 있어도 할 수 있는 것: PRISM(색을 도형으로도 표시)',
        ],
      ],
    ],
  },

  en: {
    title: 'Games like Lazors and God of Light: 8 light-beam puzzle games',
    navTitle: 'Games like Lazors',
    desc: 'Puzzle games where you bounce light or lasers off mirrors and prisms, like Lazors and God of Light, compared by platform, rules and who each one suits. Written by A Driven, the maker of PRISM.',
    lead: 'If you like bouncing a laser off mirrors until it hits every target, there is more to play than you might think. Here are the ones on phones and PCs. <strong>This page is written by A Driven, the company that makes the light puzzle game PRISM.</strong> Our game is on the list, and we say plainly where another game is the better fit.',
    dateLabel: 'November 24, 2026',
    body: [
      ['h2', 'At a glance'],
      [
        'table',
        [
          ['Game', 'Made by', 'Platforms', 'Best for'],
          ['Lazors', 'Pyrosphere', 'iPhone, iPad, Android, PC (Steam)', 'The classic: move blocks so the laser hits every target'],
          ['God of Light', 'Playmous', 'iPhone, iPad, Android, Switch and Xbox (Remastered)', 'Light puzzles with a story and atmosphere'],
          ['Chromatron', 'Silver Spaceship Software', 'Windows', 'Classic PC puzzles sending colored beams to matching targets'],
          ['Laser Puzzle: Mirror & Light', 'Bohush', 'Android', 'A very large number of mirror-rotation levels'],
          ['Prism Out', 'Vibe Inc.', 'Android', 'Splitting white light and hitting targets by color'],
          ['Prism Riddle', 'prismriddle.com', 'Web browser', 'Browser optics puzzles that include lenses and refraction'],
          ['Lumear', 'lumear.app', 'Web browser', 'One daily laser puzzle with color filters'],
          ['PRISM: Light Puzzle', 'A Driven (author of this page)', 'iPhone, iPad, Android', 'One proven solution per board, chapters that follow real optics'],
        ],
      ],
      ['h2', 'Lazors'],
      ['p', `Move blocks to bounce a laser, and the level is solved when the beam reaches every target. Over a hundred levels plus a daily puzzle. If you are searching for "games like Lazors", these are the rules you mean. On the <a href="${LAZORS}">App Store</a>, Google Play and Steam.`],
      ['h2', 'God of Light'],
      ['p', `Help a light creature called Shiny send beams to their goal with mirrors, prisms, splitters and filters. A good pick if you care about mood and progression as much as the puzzles. On <a href="${GOL}">phones</a>, with a Remastered edition for Switch and Xbox.`],
      ['h2', 'Chromatron'],
      ['p', 'A Windows classic by Sean Barrett. Place mirrors and splitters to send colored beams into targets of the same color. All four games were released free in 2007. If you like puzzles that split and mix color, this is where the idea comes from.'],
      ['h2', 'Laser Puzzle: Mirror & Light'],
      ['p', 'An Android game where you tap mirrors to rotate them and guide a laser to the goal. Its store listing promises more than 300 handcrafted levels. Worth it if sheer number of levels matters to you.'],
      ['h2', 'Prism Out and Prism Riddle (similar names, different games)'],
      ['p', 'Several light puzzles are called Prism. Prism Out is an Android game where you split white light with mirrors, prisms and lenses and hit targets by color. Prism Riddle is a browser game that goes as far as lenses and refraction. Neither is A Driven\'s PRISM.'],
      ['h2', 'Lumear'],
      ['p', 'A daily laser puzzle in the browser, with mirrors, prisms and color filters. Good for a short session without installing anything.'],
      ['h2', 'PRISM: Light Puzzle (our game)'],
      ['p', 'Tap a piece and it turns 90 degrees, and the light finds its new path at once. Light every crystal with exactly the color it asks for and the board is solved. Three things set it apart.'],
      [
        'ul',
        [
          '<strong>Every board has exactly one solution.</strong> All 300 are proven by exhaustive search, and the tap count shown is the true minimum (<a href="/en/proven-unique/">how we built them</a>).',
          '<strong>The chapters follow real optics.</strong> Reflection, half-silvered mirrors, dispersion, additive color, filters, spectroscopy and polarization, each opened by a card on the real physics, so teachers use it in class (<a href="/en/optics/">teacher\'s guide</a>).',
          '<strong>You can finish it without seeing color.</strong> Every crystal shows its color as a shape too (red triangle, green square, blue circle). No ads, and it works offline.',
        ],
      ],
      ['p', '<a href="/en/">About PRISM and store links</a>'],
      ['h2', 'Which one to pick'],
      [
        'ul',
        [
          'More of exactly what Lazors does: Laser Puzzle: Mirror & Light, Lumear',
          'Atmosphere and story: God of Light',
          'Splitting and mixing color: Chromatron, Prism Out, PRISM',
          'Playing with a child, or learning how light works: PRISM',
          'Colorblind friendly: PRISM (colors are also shown as shapes)',
        ],
      ],
    ],
  },

  ja: {
    title: 'Lazorsに似たゲーム：光を反射させるパズルゲーム8選',
    navTitle: 'Lazorsに似たゲーム',
    desc: 'LazorsやGod of Lightのように、鏡やプリズムで光を導くパズルゲームを集めました。対応機種、ルール、向いている人を表で比べます。PRISMを作るA Drivenが書いています。',
    lead: 'レーザーや光を鏡で反射させて目標に届けるパズルが好きなら、選べるゲームは意外と多くあります。スマホとPCで遊べるものを並べました。<strong>この記事は光のパズルゲームPRISMを作るA Driven（エイドリブン）が書いています。</strong>自社のゲームも入っていますが、ほかのゲームのほうが合う場合もそのまま書きました。',
    dateLabel: '2026年11月24日',
    body: [
      ['h2', '一覧'],
      [
        'table',
        [
          ['ゲーム', '開発', '機種', '向いている人'],
          ['Lazors', 'Pyrosphere', 'iPhone・iPad、Android、PC（Steam）', 'ブロックを動かしてレーザーを全部の目標に当てる定番'],
          ['God of Light', 'Playmous', 'iPhone・iPad、Android、Switch・Xbox（リマスター）', '物語と雰囲気のある光のパズル'],
          ['Chromatron', 'Silver Spaceship Software', 'Windows', '色のついた光を同じ色の目標へ送るPCの古典'],
          ['Laser Puzzle: Mirror & Light', 'Bohush', 'Android', 'とにかく面数の多い鏡回転パズル'],
          ['Prism Out', 'Vibe Inc.', 'Android', '白い光を分けて色ごとに目標を当てる'],
          ['Prism Riddle', 'prismriddle.com', 'ウェブブラウザ', 'レンズや屈折まで扱うブラウザの光学パズル'],
          ['Lumear', 'lumear.app', 'ウェブブラウザ', '毎日1問、色フィルター付きのレーザーパズル'],
          ['PRISM：光のパズル', 'A Driven（この記事の筆者）', 'iPhone・iPad、Android', '答えがひとつだけの盤面、本物の光学の順に学べる'],
        ],
      ],
      ['h2', 'Lazors'],
      ['p', `ブロックを動かしてレーザーを反射させ、すべての目標に光が届けばクリア。100面以上に加えて毎日のパズルもあります。「Lazorsに似たゲーム」の基準はこのルールです。<a href="${LAZORS}">App Store</a>、Google Play、Steamにあります。`],
      ['h2', 'God of Light'],
      ['p', `光の精「Shiny」を助け、鏡、プリズム、スプリッター、フィルターで光を目標まで導きます。パズルだけでなく雰囲気や進行も楽しみたい人に。<a href="${GOL}">スマホ版</a>と、Switch・Xbox向けのリマスター版があります。`],
      ['h2', 'Chromatron'],
      ['p', 'Sean BarrettによるWindowsの古典です。鏡やスプリッターを置いて、色のついた光を同じ色の目標へ送ります。4作すべてが2007年に無料公開されました。色を分けて混ぜるパズルの源流です。'],
      ['h2', 'Laser Puzzle: Mirror & Light'],
      ['p', '鏡をタップして回し、レーザーをゴールへ導くAndroidのパズルです。ストアの説明では手作りの面が300以上。長く遊べる面数を重視するなら。'],
      ['h2', 'Prism OutとPrism Riddle（名前が似た別のゲーム）'],
      ['p', '「Prism」という名前の光のパズルはいくつもあります。Prism Outは白い光を鏡・プリズム・レンズで分けて色ごとに目標を当てるAndroidのゲーム、Prism Riddleはレンズや屈折まで扱うブラウザゲームです。どちらもA DrivenのPRISMとは別のゲームです。'],
      ['h2', 'Lumear'],
      ['p', 'ブラウザで毎日1問解くレーザーパズルです。鏡、プリズム、色フィルターを使います。アプリを入れずに短く遊びたいときに。'],
      ['h2', 'PRISM：光のパズル（自社のゲーム）'],
      ['p', 'ピースをタップすると90度回り、光がすぐに新しい道を探します。すべての結晶に求められた色を当てればクリア。ほかのゲームとの違いは三つです。'],
      [
        'ul',
        [
          '<strong>どの盤面も答えはひとつだけ。</strong>300面すべてを全探索で証明し、表示される最少タップ数も本当の最小値です。',
          '<strong>章が本物の光学の順に並んでいます。</strong>反射、ハーフミラー、分散、加法混色、フィルター、分光、偏光。章ごとに原理のカードがあり、授業にも使えます（<a href="/ja/optics/">先生向けの案内</a>）。',
          '<strong>色が見えなくても最後まで遊べます。</strong>結晶の色は図形（赤は三角、緑は四角、青は丸）でも示されます。広告はなく、オフラインで遊べます。',
        ],
      ],
      ['p', '<a href="/ja/">PRISMの紹介とストアへのリンク</a>'],
      ['h2', '選び方'],
      [
        'ul',
        [
          'Lazorsと同じルールをもっと：Laser Puzzle: Mirror & Light、Lumear',
          '雰囲気と物語：God of Light',
          '色を分けて混ぜるパズル：Chromatron、Prism Out、PRISM',
          '子どもと一緒に、または光の仕組みを学びながら：PRISM',
          '色覚に関係なく遊べるもの：PRISM（色を図形でも表示）',
        ],
      ],
    ],
  },

  'zh-Hans': {
    title: '类似 Lazors 的游戏：8 款光线反射解谜游戏',
    navTitle: '类似 Lazors 的游戏',
    desc: '像 Lazors、God of Light 那样用镜子和棱镜引导光线的解谜游戏合集，按平台、规则和适合人群对比。本文由 PRISM 的开发商 A Driven 撰写。',
    lead: '如果你喜欢把激光或光线用镜子反射到目标上，可选的游戏其实不少。下面列出手机和电脑上能玩的几款。<strong>本文由光线解谜游戏 PRISM 的开发商 A Driven（에이드리븐）撰写。</strong>列表里有我们自己的游戏，但其他游戏更合适的情况也照实写出。',
    dateLabel: '2026年11月24日',
    body: [
      ['h2', '一览'],
      [
        'table',
        [
          ['游戏', '开发者', '平台', '适合'],
          ['Lazors', 'Pyrosphere', 'iPhone、iPad、Android、PC（Steam）', '移动方块让激光照到所有目标的经典之作'],
          ['God of Light', 'Playmous', 'iPhone、iPad、Android、Switch 和 Xbox（重制版）', '有故事和氛围的光线解谜'],
          ['Chromatron', 'Silver Spaceship Software', 'Windows', '把彩色光送到同色目标的经典 PC 解谜'],
          ['Laser Puzzle: Mirror & Light', 'Bohush', 'Android', '关卡数量非常多的旋转镜子解谜'],
          ['Prism Out', 'Vibe Inc.', 'Android', '分开白光、按颜色命中目标'],
          ['Prism Riddle', 'prismriddle.com', '网页浏览器', '涉及透镜和折射的浏览器光学解谜'],
          ['Lumear', 'lumear.app', '网页浏览器', '每天一题、带颜色滤镜的激光解谜'],
          ['PRISM：光线解谜', 'A Driven（本文作者）', 'iPhone、iPad、Android', '每关唯一解，章节按真实光学顺序编排'],
        ],
      ],
      ['h2', 'Lazors'],
      ['p', `移动方块反射激光，光线照到所有目标即过关。一百多个关卡，另有每日谜题。搜索“类似 Lazors 的游戏”时，指的就是这套规则。可在 <a href="${LAZORS}">App Store</a>、Google Play 和 Steam 获取。`],
      ['h2', 'God of Light'],
      ['p', `帮助光之精灵 Shiny，用镜子、棱镜、分光器和滤镜把光线送到终点。适合除了解谜也在意氛围和流程的玩家。有<a href="${GOL}">手机版</a>以及 Switch、Xbox 重制版。`],
      ['h2', 'Chromatron'],
      ['p', 'Sean Barrett 制作的 Windows 经典游戏。放置镜子和分光器，把彩色光送进同色目标。四部作品已于 2007 年免费公开。喜欢分色、混色解谜的人，可以从这里追溯源头。'],
      ['h2', 'Laser Puzzle: Mirror & Light'],
      ['p', '点击镜子使其旋转、把激光引向终点的 Android 解谜游戏。商店介绍称有 300 多个手工关卡。看重关卡数量的话值得一试。'],
      ['h2', 'Prism Out 和 Prism Riddle（名字相近的其他游戏）'],
      ['p', '名叫 Prism 的光线解谜有好几款。Prism Out 是用镜子、棱镜、透镜分开白光并按颜色命中目标的 Android 游戏；Prism Riddle 是涉及透镜和折射的浏览器游戏。两者都不是 A Driven 的 PRISM。'],
      ['h2', 'Lumear'],
      ['p', '在浏览器里每天解一题的激光解谜，使用镜子、棱镜和颜色滤镜。适合不想安装应用、只想玩一会儿的时候。'],
      ['h2', 'PRISM：光线解谜（我们的游戏）'],
      ['p', '点击零件会旋转 90 度，光线立即寻找新的路径。让每个结晶都照到要求的颜色即过关。与其他游戏的不同有三点。'],
      [
        'ul',
        [
          '<strong>每关只有一个答案。</strong>300 关全部经穷举搜索证明，显示的最少点击数也是真正的最小值。',
          '<strong>章节按真实光学顺序编排。</strong>反射、半透镜、色散、加色混合、滤色、分光、偏振，每章开头有原理卡片，也可用于课堂（<a href="/zh-Hans/optics/">教师指南</a>）。',
          '<strong>看不清颜色也能玩到最后。</strong>每个结晶的颜色同时用形状表示（红色三角、绿色方块、蓝色圆形）。没有广告，可离线游玩。',
        ],
      ],
      ['p', '<a href="/zh-Hans/">PRISM 介绍与商店链接</a>'],
      ['h2', '怎么选'],
      [
        'ul',
        [
          '想玩更多和 Lazors 一样的规则：Laser Puzzle: Mirror & Light、Lumear',
          '氛围与故事：God of Light',
          '分色、混色解谜：Chromatron、Prism Out、PRISM',
          '和孩子一起玩，或边玩边学光的原理：PRISM',
          '色弱也能玩：PRISM（颜色也用形状表示）',
        ],
      ],
    ],
  },
};

export default {
  slug: SLUG,
  date: DATE,
  updated: UPDATED,
  langs: ['ko', 'en', 'ja', 'zh-Hans'],
  type: 'Article',
  text: TEXT,
};
