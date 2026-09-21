/**
 * 언어별 페이지 생성기.
 *
 * 페이지를 언어마다 손으로 관리하면 **반드시 어긋난다.** 한국어에만 문단을
 * 하나 고치고 나머지 셋을 잊는 날이 오고, 그 어긋남은 화면에 아무 표시도
 * 나지 않는다. 그래서 내용은 아래 `L` 한 곳에만 두고 HTML은 전부 여기서
 * 만든다 — **언어를 늘리는 일이 항목 하나를 더하는 일**이 되어야 한다.
 *
 * AEO/GEO 관점에서 이 파일이 하는 일(자세한 근거는 AEO.md):
 *
 *  1. 언어마다 **독립된 문서**를 만든다. 지금까지는 한 페이지에 한국어와
 *     영어를 쌓고 `lang="ko"` 하나로 묶어뒀는데, 그러면 스크린 리더가 영어를
 *     한국어 발음으로 읽고 답변 엔진은 어느 언어 문서인지 판단하지 못한다.
 *  2. `hreflang` 상호 링크 + `x-default`.
 *  3. JSON-LD 세 덩어리 — 앱(`MobileApplication`), 자주 묻는 질문
 *     (`FAQPage`), 영상(`VideoObject`). 답변 엔진이 "무엇이고 얼마이고
 *     어디서 받나"를 추측하지 않아도 되게 한다.
 *
 * 실행: `node build.mjs`
 */

import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ORIGIN = 'https://prism.adriven.co';
const APPSTORE = 'https://apps.apple.com/kr/app/id6803019903';
const PLAYSTORE = 'https://play.google.com/store/apps/details?id=co.adriven.prism';

/** 앱이 지원하는 언어와 같다. **앱이 못 하는 언어로 사이트를 만들지 않는다** — AEO.md 참고. */
const LANGS = ['ko', 'en', 'ja', 'zh-Hans'];

/** 언어별 경로. 기본 언어는 루트에 둔다. */
const pathOf = (l) => (l === 'ko' ? '/' : `/${l}/`);
const urlOf = (l) => ORIGIN + pathOf(l);

/*
  영상은 앱 UI가 그대로 찍혀 있어 **언어별**이다. 일본어·중국어 영상은 아직
  없으므로 영어 영상을 쓴다 — 앱이 실제로 영어를 지원하므로 거짓은 아니지만,
  그 언어 영상을 만드는 것이 다음 개선이다.
*/
const videoOf = (l) => (l === 'ko' ? 'ko' : 'en');

const L = {
  ko: {
    dir: 'ltr',
    title: 'PRISM: 빛을 접어 결정을 밝힌다',
    desc: '탭하면 빛이 꺾입니다. 규칙이 하나뿐인 미니멀 퍼즐. 240레벨, 정답은 모두 하나. 광고 없음, 인앱결제 없음, 완전 오프라인.',
    /*
      「접어」다. 「꺾어」가 아니다.

      동작 자체는 90도 반사이므로 설명문에서는 「꺾인다」를 쓴다(아래 lead,
      Play 짧은 설명). 하지만 이 한 줄은 설명이 아니라 **어조**이고, 앱의
      타이틀 화면과 App Store 부제가 같은 말을 한다. 세 곳이 한 목소리여야
      한다. 한때 여기만 「꺾어」로 바꿨다가 되돌렸다.
    */
    tagline: '빛을 접어 결정을 밝힌다',
    cta: 'App Store에서 받기',
    ctaAndroid: 'Google Play에서 받기',
    langName: '한국어',
    ruleH: '규칙은 하나입니다',
    lead: '탭하면 조각이 90° 돌고, 빛은 그 즉시 새로운 길을 찾습니다. 모든 결정에 정확히 요구된 색을 동시에 비추면 그 판은 풀립니다. 그것뿐이고, 설명서는 없습니다. 레벨이 규칙을 가르칩니다.',
    videoH: '30초면 무슨 게임인지 압니다',
    videoCap: '실제 플레이 화면입니다. 소리는 없습니다.',
    ruleCap: '첫 번째 레벨. 거울을 한 번 탭하면 풀립니다.',
    facts: [
      '<strong>240개</strong> 퍼즐, 여섯 개의 챕터',
      '모든 퍼즐의 <strong>정답은 하나뿐</strong>입니다',
      '표시되는 최소 탭 수는 <strong>전수 탐색으로 증명한</strong> 실제 최솟값입니다',
      '광고 없음 · 인앱결제 없음 · 회원가입 없음',
      '네트워크를 쓰지 않습니다. 완전 오프라인',
    ],
    stats: [
      ['240', '퍼즐'],
      ['6', '챕터'],
      ['1', '판마다 정답'],
      ['0', '광고 · 결제 · 가입'],
    ],
    badges: ['광고 없음', '인앱결제 없음', '회원가입 없음', '완전 오프라인'],
    chaptersH: '여섯 개의 챕터',
    chaptersLead: '레벨이 순서대로 광학을 가르칩니다. 새 조각은 챕터가 시작될 때 하나씩만 들어옵니다.',
    chapters: [
      ['반사', '거울이 빛을 90도로 꺾습니다'],
      ['분열', '반투명 거울은 빛을 통과시키면서 동시에 반사합니다'],
      ['분산', '프리즘이 흰 빛을 빨강·초록·파랑으로 가릅니다'],
      ['혼합', '두 빛이 한 결정에서 겹치면 새로운 색이 됩니다'],
      ['정제', '필터는 원하는 성분만 남깁니다'],
      ['수렴', '배운 모든 것이 한 판에서 만납니다'],
    ],
    opticsH: '진짜 광학입니다',
    opticsP: '거울의 반사각, 프리즘의 분산, 빛의 가산혼합은 실제 물리 그대로입니다. 챕터마다 원리 카드가 열리고, 탭하기 전과 후를 그림 두 장으로 나란히 보여줍니다. 초등학생이 읽을 수 있게 썼습니다. 게임이 실제 물리와 어디서 달라지는지도 함께 적어뒀습니다.',
    a11yH: '색을 구분하기 어려워도 끝까지 풀 수 있습니다',
    a11yP: '모든 결정에는 요구하는 색이 도형으로 함께 각인되어 있습니다. 섞인 색은 성분 도형이 나란히 놓입니다. 노란 결정에는 삼각형과 사각형이 함께 새겨집니다. 색을 전혀 보지 못해도 240개 퍼즐 전부를 풀 수 있습니다.',
    a11yMore: [
      '글자 크기를 보통 · 크게 · 아주 크게 중에서 고를 수 있습니다',
      '기기의 「동작 줄이기」를 켜면 화면 연출이 줄어듭니다',
      '탭이 조금 빗나가도 가장 가까운 조각이 돌아갑니다',
    ],
    mixCap: '빨강과 초록을 함께 보내면 노랑이 됩니다. 결정에 삼각형과 사각형이 함께 새겨진 이유입니다.',
    glyphs: [['빨강', '삼각형'], ['초록', '사각형'], ['파랑', '원']],
    langsH: '네 가지 언어',
    langsP: '한국어, English, 日本語, 简体中文을 지원합니다. 기기 언어를 따르거나 설정에서 직접 고를 수 있습니다.',
    faqH: '자주 묻는 것',
    faq: [
      ['광고가 정말 없나요?', '없습니다. 인앱결제도, 회원가입도, 로그인도 없습니다. 한 번 결제하면 240개 퍼즐 전부가 처음부터 열려 있습니다. 광고 없는 퍼즐 게임을 찾고 계셨다면 그것이 이 앱을 만든 이유입니다.'],
      ['인터넷 없이 되나요?', '됩니다. 네트워크를 아예 쓰지 않는 완전 오프라인 게임입니다. 비행기 안에서도, 지하철에서도, 신호가 없는 곳에서도 그대로 동작합니다. 진행 상황은 이 기기 안에만 저장되고 어디로도 전송되지 않습니다.'],
      ['색약인데 할 수 있나요?', '할 수 있습니다. 모든 결정에 요구하는 색이 도형으로 함께 새겨져 있어(빨강은 삼각형, 초록은 사각형, 파랑은 원) 색을 전혀 보지 못해도 240판 전부를 풀 수 있습니다.'],
      ['몇 판이고 얼마나 어렵나요?', '여섯 챕터에 240판입니다. 모든 판에 정답이 하나뿐이라 운으로 풀리지 않고, 막히면 반드시 이유가 있습니다. 표시되는 최소 탭 수는 전수 탐색으로 증명한 실제 최솟값입니다.'],
      ['안드로이드 버전이 있나요?', '있습니다. iOS와 Android 모두에서 같은 가격, 같은 240판으로 받으실 수 있습니다.'],
      ['용량이 얼마나 되나요?', '5MB가 되지 않습니다. 이미지 파일이 한 장도 없기 때문입니다. 화면의 빛과 도형은 전부 코드로 그립니다.'],
    ],
    privacy: '개인정보 처리방침',
    support: '지원 · 문의',
    otherLangs: '다른 언어',
  },

  en: {
    dir: 'ltr',
    title: 'PRISM: Bend beams. Wake the crystals.',
    desc: 'Tap and the light bends. A minimal puzzle with exactly one rule. 240 levels, one solution each. No ads, no in-app purchases, fully offline.',
    tagline: 'Bend beams. Wake the crystals.',
    cta: 'Get it on the App Store',
    ctaAndroid: 'Get it on Google Play',
    langName: 'English',
    ruleH: 'There is only one rule',
    lead: 'Tap a piece and it turns 90°; the light finds a new path instantly. Light every crystal with exactly the color it asks for, all at once, and the board is solved. That is the only rule, and there is no manual. The levels teach it.',
    videoH: 'Thirty seconds and you know the game',
    videoCap: 'Real gameplay. No sound.',
    ruleCap: 'The first level. One tap on a mirror solves it.',
    facts: [
      '<strong>240</strong> puzzles across six chapters',
      'Every puzzle has <strong>exactly one solution</strong>',
      'The par shown is the <strong>true minimum</strong>, found by exhaustive search',
      'No ads · no in-app purchases · no sign-up',
      'No networking at all. Fully offline',
    ],
    stats: [
      ['240', 'puzzles'],
      ['6', 'chapters'],
      ['1', 'solution each'],
      ['0', 'ads · IAP · sign-ups'],
    ],
    badges: ['No ads', 'No in-app purchases', 'No sign-up', 'Fully offline'],
    chaptersH: 'Six chapters',
    chaptersLead: 'The levels teach optics in order. Each chapter introduces exactly one new piece.',
    chapters: [
      ['Reflect', 'a mirror turns light by 90 degrees'],
      ['Split', 'a half-silvered mirror passes light and reflects it at the same time'],
      ['Disperse', 'a prism splits white light into red, green and blue'],
      ['Mix', 'two beams meeting at one crystal make a new color'],
      ['Refine', 'a filter keeps only the component you want'],
      ['Converge', 'everything you have learned meets on one board'],
    ],
    opticsH: 'Real optics',
    opticsP: 'The angle of reflection, dispersion through a prism, and additive color mixing are real physics. Each chapter opens a principle card that shows the board before and after a single tap, side by side, written so a child can follow it. Where the game simplifies real physics, we say so.',
    a11yH: 'Playable without seeing color',
    a11yP: 'Every crystal also shows its required color as a shape, and mixed colors show their component shapes side by side: a yellow crystal carries a triangle and a square together. All 240 puzzles can be finished without distinguishing color.',
    a11yMore: [
      'Text size can be set to normal, large or extra large',
      'Turning on Reduce Motion cuts down the effects',
      'A tap that misses a piece by a little still rotates the nearest one',
    ],
    mixCap: 'Send red and green together and you get yellow. That is why the crystal carries both a triangle and a square.',
    glyphs: [['red', 'triangle'], ['green', 'square'], ['blue', 'circle']],
    langsH: 'Four languages',
    langsP: 'Korean, English, Japanese and Simplified Chinese. Follows your device language, or pick one in Settings.',
    faqH: 'Questions people ask',
    faq: [
      ['Are there really no ads?', 'None. No in-app purchases, no sign-up, no sign-in. One purchase opens all 240 puzzles from the start. If you were looking for a puzzle game with no ads, that is why this one exists.'],
      ['Does it work without internet?', 'Yes. It does no networking at all, so it is fully offline. It works on a plane, underground, anywhere with no signal. Your progress is stored only on this device and is never sent anywhere.'],
      ['Can I play if I am colorblind?', 'Yes. Every crystal carries its required color as a shape as well (red is a triangle, green a square, blue a circle), so all 240 puzzles can be finished without distinguishing color at all.'],
      ['How many levels, and how hard?', 'Six chapters, 240 boards. Every board has exactly one solution, so nothing is solved by luck, and if you are stuck there is always a reason. The par shown is the true minimum, proven by exhaustive search.'],
      ['Is there an Android version?', 'Yes. It is available on both iOS and Android, same price, same 240 puzzles.'],
      ['How big is it?', 'Under 5 MB. There is not a single image file in the app. Every beam and shape is drawn in code.'],
    ],
    privacy: 'Privacy Policy',
    support: 'Support',
    otherLangs: 'Other languages',
  },

  ja: {
    dir: 'ltr',
    title: 'PRISM：光を折り、結晶を灯す',
    desc: 'タップすると光が曲がります。ルールがひとつだけのミニマルなパズル。240レベル、答えはすべてひとつ。広告なし、アプリ内課金なし、完全オフライン。',
    tagline: '光を折り、結晶を灯す',
    cta: 'App Store で入手',
    ctaAndroid: 'Google Play で入手',
    langName: '日本語',
    ruleH: 'ルールはひとつだけ',
    lead: 'ピースをタップすると90°回り、光はその場で新しい道を見つけます。すべての結晶に求められた色をちょうど同時に当てると、その盤面はクリアです。ルールはそれだけで、説明書はありません。レベルが教えてくれます。',
    videoH: '30秒でどんなゲームかわかります',
    videoCap: '実際のプレイ画面です。音はありません。',
    ruleCap: '最初のレベル。鏡を一度タップすると解けます。',
    facts: [
      '<strong>240</strong>のパズル、6つのチャプター',
      'すべてのパズルに<strong>答えはひとつだけ</strong>',
      '表示される最小タップ数は<strong>全探索で証明した</strong>本当の最小値です',
      '広告なし · アプリ内課金なし · 会員登録なし',
      'ネットワークを一切使いません。完全オフライン',
    ],
    stats: [
      ['240', 'パズル'],
      ['6', 'チャプター'],
      ['1', '盤面ごとの答え'],
      ['0', '広告 · 課金 · 登録'],
    ],
    badges: ['広告なし', 'アプリ内課金なし', '会員登録なし', '完全オフライン'],
    chaptersH: '6つのチャプター',
    chaptersLead: 'レベルが順に光のしくみを教えます。新しいピースはチャプターごとにひとつずつ増えます。',
    chapters: [
      ['反射', '鏡が光を90度曲げます'],
      ['分割', 'ハーフミラーは光を通しながら同時に反射します'],
      ['分散', 'プリズムが白い光を赤・緑・青に分けます'],
      ['混色', '2本の光が1つの結晶で重なると新しい色になります'],
      ['フィルター', 'フィルターは必要な成分だけを残します'],
      ['収束', '学んだすべてが1つの盤面で出会います'],
    ],
    opticsH: '本物の光学です',
    opticsP: '鏡の反射角、プリズムの分散、光の加法混色は実際の物理そのままです。チャプターごとに「しくみカード」が開き、タップの前と後を2枚の絵で並べて見せます。小学生が読めるように書きました。ゲームが実際の物理とどこで違うのかも一緒に書いてあります。',
    a11yH: '色が見分けにくくても最後まで解けます',
    a11yP: 'すべての結晶には求める色が図形としても刻まれています。混ざった色は成分の図形が並びます。黄色の結晶には三角と四角が一緒に刻まれます。色がまったく見えなくても240のパズルすべてを解けます。',
    a11yMore: [
      '文字の大きさを 標準・大・特大 から選べます',
      '端末の「視差効果を減らす」をオンにすると演出が控えめになります',
      'タップが少しずれても、いちばん近いピースが回ります',
    ],
    mixCap: '赤と緑を一緒に届けると黄色になります。結晶に三角と四角が一緒に刻まれているのはそのためです。',
    glyphs: [['赤', '三角'], ['緑', '四角'], ['青', '円']],
    langsH: '4つの言語',
    langsP: '한국어、English、日本語、简体中文に対応しています。端末の言語に従うか、設定で直接選べます。',
    faqH: 'よくある質問',
    faq: [
      ['本当に広告はありませんか？', 'ありません。アプリ内課金も、会員登録も、ログインもありません。一度購入すれば240のパズルすべてが最初から開いています。広告のないパズルゲームを探していたなら、それがこのアプリを作った理由です。'],
      ['インターネットなしで遊べますか？', '遊べます。ネットワークを一切使わない完全オフラインのゲームです。飛行機の中でも、地下鉄でも、電波のない場所でもそのまま動きます。進行状況はこの端末の中だけに保存され、どこにも送信されません。'],
      ['色覚に特性がありますが遊べますか？', '遊べます。すべての結晶に求める色が図形としても刻まれているので（赤は三角、緑は四角、青は円）、色がまったく見えなくても240面すべてを解けます。'],
      ['何面あって、どのくらい難しいですか？', '6チャプターに240面です。すべての面に答えがひとつだけなので運では解けず、詰まったときは必ず理由があります。表示される最小タップ数は全探索で証明した本当の最小値です。'],
      ['Android版はありますか？', 'あります。iOS・Android どちらでも同じ価格、同じ240面で遊べます。'],
      ['容量はどのくらいですか？', '5MB もありません。画像ファイルが1枚もないからです。画面の光も図形もすべてコードで描いています。'],
    ],
    privacy: 'プライバシーポリシー',
    support: 'サポート・お問い合わせ',
    otherLangs: '他の言語',
  },

  'zh-Hans': {
    dir: 'ltr',
    title: 'PRISM：折转光线，点亮结晶',
    desc: '点一下，光就会拐弯。只有一条规则的极简解谜。240 个关卡，每关只有一个答案。没有广告，没有内购，完全离线。',
    tagline: '折转光线，点亮结晶',
    cta: '在 App Store 获取',
    ctaAndroid: '在 Google Play 获取',
    langName: '简体中文',
    ruleH: '只有一条规则',
    lead: '点击元件，它会转 90 度，光立刻找到新的路径。让每个结晶都恰好收到它要求的颜色，同时点亮，这一关就解开了。规则只有这一条，也没有说明书——关卡自己会教你。',
    videoH: '三十秒就知道这是什么游戏',
    videoCap: '真实的游戏画面。没有声音。',
    ruleCap: '第一关。点一次镜子就能解开。',
    facts: [
      '<strong>240</strong> 个谜题，六个章节',
      '每个谜题<strong>只有一个答案</strong>',
      '显示的最少点击次数是<strong>穷举验证过</strong>的真实最小值',
      '没有广告 · 没有内购 · 无需注册',
      '完全不联网。彻底离线',
    ],
    stats: [
      ['240', '谜题'],
      ['6', '章节'],
      ['1', '每关唯一解'],
      ['0', '广告 · 内购 · 注册'],
    ],
    badges: ['没有广告', '没有内购', '无需注册', '完全离线'],
    chaptersH: '六个章节',
    chaptersLead: '关卡会按顺序教你光的原理。每个章节只引入一种新元件。',
    chapters: [
      ['反射', '镜子把光转 90 度'],
      ['分束', '半透镜让光通过的同时也把它反射'],
      ['色散', '棱镜把白光分成红、绿、蓝'],
      ['混色', '两束光在同一个结晶上相遇会变成新的颜色'],
      ['滤光', '滤光片只留下你需要的成分'],
      ['汇聚', '学过的一切在一个盘面上相遇'],
    ],
    opticsH: '这是真实的光学',
    opticsP: '镜子的反射角、棱镜的色散、光的加法混色，都是真实的物理。每个章节会打开一张原理卡片，把点击前和点击后的两幅图并排放在一起，写得连小学生都能看懂。游戏在哪里简化了真实物理，我们也一并写出来。',
    a11yH: '分不清颜色也能通关',
    a11yP: '每个结晶都把它要求的颜色同时刻成了图形。混合色会把成分图形并排放着——黄色结晶上同时刻着三角形和方形。即使完全看不到颜色，240 个谜题也都能解开。',
    a11yMore: [
      '文字大小可以选择 标准 · 大 · 特大',
      '打开设备的「减弱动态效果」后，画面特效会减少',
      '点击稍微偏一点，最近的元件也会转动',
    ],
    mixCap: '把红和绿一起送到，就得到黄色。这就是结晶上同时刻着三角形和方形的原因。',
    glyphs: [['红', '三角形'], ['绿', '方形'], ['蓝', '圆形']],
    langsH: '四种语言',
    langsP: '支持 한국어、English、日本語、简体中文。跟随设备语言，也可以在设置里直接选择。',
    faqH: '常见问题',
    faq: [
      ['真的没有广告吗？', '没有。也没有内购、注册和登录。一次购买，240 个谜题从一开始就全部开放。如果你在找一款没有广告的解谜游戏，这就是它存在的理由。'],
      ['没有网络能玩吗？', '能。它完全不联网，是彻底离线的游戏。在飞机上、地铁里、没有信号的地方都照常运行。进度只保存在这台设备上，不会发送到任何地方。'],
      ['我有色觉障碍，能玩吗？', '能。每个结晶都把要求的颜色同时刻成了图形（红是三角形，绿是方形，蓝是圆形），即使完全看不到颜色，240 关也都能解开。'],
      ['一共多少关？难吗？', '六个章节，240 关。每关只有一个答案，所以不会靠运气解开；卡住的时候一定有原因。显示的最少点击次数是穷举验证过的真实最小值。'],
      ['有 Android 版本吗？', '有。iOS 和 Android 上都能获取，价格相同，同样 240 关。'],
      ['占多大空间？', '不到 5MB。因为应用里连一张图片文件都没有——画面上的光和图形全部由代码绘制。'],
    ],
    privacy: '隐私政策',
    support: '支持与联系',
    otherLangs: '其他语言',
  },
};

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** 태그가 들어 있는 문자열에서 JSON-LD에 넣을 평문을 뽑는다. */
const plain = (s) => String(s).replace(/<[^>]+>/g, '');

const GLYPH_SVG = [
  '<polygon points="10,3 18,17 2,17" fill="#ff2d55" />',
  '<rect x="3" y="3" width="14" height="14" rx="2" fill="#32ff9a" />',
  '<circle cx="10" cy="10" r="7.5" fill="#2d8cff" />',
];

/*
  히어로의 분광 그림.

  여기 있던 것은 112px짜리 앱 아이콘이었다. 아이콘은 App Store에서 이미 보고
  오는 그림이라 페이지에서 한 번 더 보여줄 이유가 없고, 무엇보다 **제품 이름의
  뜻을 설명하지 않는다.** 흰 빛 하나가 프리즘을 지나 빨강·초록·파랑으로
  갈라지는 것이 PRISM이라는 이름이자 3챕터의 내용이다. 그걸 그린다.

  이미지 파일이 아니라 인라인 SVG인 이유: 앱이 "이미지 파일이 한 장도 없다"를
  주장하는데 사이트가 PNG로 빛을 그리면 말과 물건이 어긋난다. 여기도 코드로
  그린다. 요청도 한 번 줄어든다.

  색은 palette.ts와 같은 값이다.
*/
/*
  섹션 구분선.

  가운데가 밝고 양끝으로 사라지는 1px 선에 결정 하나를 얹었다. 밑줄 하나로
  끊던 자리를 "빛이 지나가다 결정을 만난다"로 바꾼 것이고, 페이지를 위에서
  아래로 읽는 동안 같은 사건이 여섯 번 반복된다.

  스크롤해서 화면에 들어올 때 켜진다. **JS가 없으면 처음부터 켜져 있다** —
  `.js`가 붙은 뒤에만 어두워지므로, 스크립트가 막힌 방문자에게 빈 선이
  남지 않는다. 움직임을 줄이라고 설정한 방문자에게는 트랜지션이 통째로
  꺼진다(파일 아래 prefers-reduced-motion 규칙).
*/
const BEAM = '<div class="beam" aria-hidden="true"><i></i></div>';

/** 챕터 번호. 스토어 설명도 로마자를 쓴다. */
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const SPECTRUM_SVG = `<svg class="spectrum" viewBox="0 0 640 280" aria-hidden="true" focusable="false">
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <g filter="url(#glow)" opacity="0.55">
          <path d="M24 206 L266 136" stroke="#ffffff" stroke-width="7" fill="none" />
          <path d="M330 128 L616 66" stroke="#ff2d55" stroke-width="7" fill="none" />
          <path d="M330 128 L616 124" stroke="#32ff9a" stroke-width="7" fill="none" />
          <path d="M330 128 L616 182" stroke="#2d8cff" stroke-width="7" fill="none" />
        </g>
        <path d="M24 206 L266 136" stroke="#ffffff" stroke-width="2" fill="none" />
        <path d="M266 136 L330 128" stroke="#ffffff" stroke-width="1.4" opacity="0.5" fill="none" />
        <path d="M330 128 L616 66" stroke="#ff2d55" stroke-width="2" fill="none" />
        <path d="M330 128 L616 124" stroke="#32ff9a" stroke-width="2" fill="none" />
        <path d="M330 128 L616 182" stroke="#2d8cff" stroke-width="2" fill="none" />
        <path d="M300 52 L358 196 L242 196 Z" stroke="rgba(255,255,255,0.5)" stroke-width="2"
              stroke-linejoin="round" fill="rgba(255,255,255,0.03)" />
      </svg>`;

function page(lang) {
  const t = L[lang];
  const up = lang === 'ko' ? '' : '../';
  const vid = videoOf(lang);

  /*
    JSON-LD. 답변 엔진이 인용할 때 필요한 것은 정해져 있다 — 무엇인지,
    어느 플랫폼인지, 얼마인지, 누가 만들었는지, 어디서 받는지. 다섯 가지를
    추측하게 두면 인용되지 않거나 틀리게 인용된다.

    `aggregateRating`은 **넣지 않는다.** 리뷰가 쌓이기 전에 넣으면 거짓이다.
  */
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'PRISM',
      // 제목을 잘라 'PRISM'을 다시 만들던 자리다. `name`과 같은 값이라 아무것도
      // 보태지 않았고, 구분자를 바꾸면 조용히 깨지는 코드였다. 언어별 제목을
      // 그대로 넣는다. 답변 엔진이 그 언어로 이 앱을 부르는 이름이 이것이다.
      alternateName: t.title,
      description: t.desc,
      url: urlOf(lang),
      inLanguage: lang,
      applicationCategory: 'GameApplication',
      applicationSubCategory: 'PuzzleGame',
      operatingSystem: 'iOS 15.0 or later, Android 7.0 or later',
      downloadUrl: [APPSTORE, PLAYSTORE],
      installUrl: [APPSTORE, PLAYSTORE],
      fileSize: '5MB',
      softwareVersion: '1.2',
      availableOnDevice: ['iPhone', 'iPad'],
      countriesSupported: 'Worldwide',
      offers: {
        '@type': 'Offer',
        price: '3900',
        priceCurrency: 'KRW',
        availability: 'https://schema.org/InStock',
        url: APPSTORE,
      },
      author: { '@type': 'Organization', name: 'A Driven Inc.', url: ORIGIN + '/' },
      publisher: { '@type': 'Organization', name: 'A Driven Inc.', url: ORIGIN + '/' },
      screenshot: [
        `${ORIGIN}/img/board-prism.png`,
        `${ORIGIN}/img/board-rule.png`,
        `${ORIGIN}/img/board-mixing.png`,
      ],
      featureList: t.facts.map(plain),
      // 이 앱이 팔리는 이유 자체다. 구조화해두면 "광고 없는 유료 퍼즐" 질의에 걸린다.
      isAccessibleForFree: false,
      accessibilityFeature: ['highContrastDisplay', 'largePrint', 'reducedMotion'],
      accessibilityHazard: ['noFlashingHazard', 'noMotionSimulationHazard', 'noSoundHazard'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: t.faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: t.videoH,
      description: t.videoCap,
      thumbnailUrl: `${ORIGIN}/media/preview-${vid}.jpg`,
      contentUrl: `${ORIGIN}/media/preview-${vid}.mp4`,
      uploadDate: '2026-09-11',
      duration: 'PT22S',
      inLanguage: vid,
    },
  ];

  const alternates = LANGS.map(
    (l) => `    <link rel="alternate" hreflang="${l}" href="${urlOf(l)}" />`,
  ).join('\n');

  const otherLangLinks = LANGS.filter((l) => l !== lang)
    .map((l) => `<a href="${ORIGIN}${pathOf(l)}" hreflang="${l}" lang="${l}">${L[l].langName}</a>`)
    .join('\n          ');

  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(t.title)}</title>
    <meta name="description" content="${esc(t.desc)}" />
    <meta name="theme-color" content="#06070C" />${lang === 'ko' ? '\n    <meta name="naver-site-verification" content="f0f2912db3453f625329e38789dbbe62ee563db2" />' : ''}
    <link rel="canonical" href="${urlOf(lang)}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${urlOf('en')}" />
    <meta property="og:title" content="${esc(t.title)}" />
    <meta property="og:description" content="${esc(t.desc)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${lang.replace('-', '_')}" />
    <meta property="og:url" content="${urlOf(lang)}" />
    <meta property="og:image" content="${ORIGIN}/img/board-prism.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="${up}style.css" />
    <link rel="icon" href="${up}icon.svg" type="image/svg+xml" />
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
  </head>
  <body>
    <main>
      <!--
        언어 전환은 **맨 위**에 둔다. 자기 언어가 아닌 페이지에 떨어진 사람이
        가장 먼저 찾는 것이고, 그 사람은 페이지를 읽지 못하므로 끝까지
        스크롤하지 않는다. 아래에 두면 없는 것과 같다.
      -->
      <nav class="langs" aria-label="${esc(t.otherLangs)}">
        ${otherLangLinks}
      </nav>

      <header class="hero">
        ${SPECTRUM_SVG}
        <h1>PRISM</h1>
        <p class="tagline">${esc(t.tagline)}</p>
        <div class="cta-row">
          <a class="cta cta-lg" href="${APPSTORE}">${esc(t.cta)}</a>
          <a class="cta cta-lg" href="${PLAYSTORE}">${esc(t.ctaAndroid)}</a>
        </div>

        <!--
          숫자 넷으로 제품 전체를 말한다. 240판, 6챕터, 판마다 정답 하나,
          그리고 0(광고·결제·가입). 답변 엔진이 인용할 때 필요한 것도
          문장이 아니라 이 숫자들이다.
        -->
        <ul class="stats">
${t.stats.map(([v, k]) => `          <li><b>${esc(v)}</b><span>${esc(k)}</span></li>`).join('\n')}
        </ul>
      </header>

      ${BEAM}

      <section>
        <h2>${esc(t.videoH)}</h2>
        <video
          class="preview"
          src="${up}media/preview-${vid}.mp4"
          poster="${up}media/preview-${vid}.jpg"
          width="540"
          height="818"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        ></video>
        <p class="cap">${esc(t.videoCap)}</p>
      </section>

      <section>
        <h2>${esc(t.ruleH)}</h2>
        <p class="lead">${esc(t.lead)}</p>

        <figure>
          <img class="board" src="${up}img/board-rule.png" alt="${esc(t.ruleCap)}"
               width="720" height="720" loading="lazy" />
          <figcaption>${esc(t.ruleCap)}</figcaption>
        </figure>

        <ul class="facts">
${t.facts.map((f) => `          <li>${f}</li>`).join('\n')}
        </ul>
      </section>

      ${BEAM}

      <section>
        <h2>${esc(t.chaptersH)}</h2>
        <p>${esc(t.chaptersLead)}</p>
        <!--
          카드 왼쪽 띠가 그 챕터에서 배우는 것이다. 반사는 흰 한 줄,
          분산은 빨강·초록·파랑 세 칸, 혼합은 빨강에서 노랑을 지나 초록으로,
          수렴은 전부. 장식이 아니라 목록의 내용을 한 번 더 말한다.
        -->
        <ol class="chapters">
${t.chapters
  .map(
    ([n, d], i) => `          <li class="chapter chapter-${i + 1}">
            <span class="ch-num">${ROMAN[i]}</span>
            <strong>${esc(n)}</strong>
            <span class="ch-desc">${esc(d)}</span>
          </li>`,
  )
  .join('\n')}
        </ol>
      </section>

      ${BEAM}

      <section>
        <h2>${esc(t.opticsH)}</h2>
        <p>${esc(t.opticsP)}</p>
      </section>

      <section>
        <h2>${esc(t.a11yH)}</h2>
        <p>${esc(t.a11yP)}</p>

        <ul class="legend">
${t.glyphs
  .map(
    ([color, shape], i) => `          <li>
            <svg class="glyph" viewBox="0 0 20 20" aria-hidden="true">${GLYPH_SVG[i]}</svg>
            ${esc(color)} = ${esc(shape)}
          </li>`,
  )
  .join('\n')}
        </ul>

        <figure>
          <img class="board" src="${up}img/board-mixing.png" alt="${esc(t.mixCap)}"
               width="720" height="720" loading="lazy" />
          <figcaption>${esc(t.mixCap)}</figcaption>
        </figure>

        <ul class="facts">
${t.a11yMore.map((f) => `          <li>${esc(f)}</li>`).join('\n')}
        </ul>
      </section>

      <section>
        <h2>${esc(t.langsH)}</h2>
        <p>${esc(t.langsP)}</p>
      </section>

      ${BEAM}

      <section>
        <h2>${esc(t.faqH)}</h2>
        <!--
          접어 둔다. 여섯 문답을 펼쳐 두면 페이지 끝이 글 벽이 되고, 여기까지
          내려온 사람은 이미 살지 말지를 정한 뒤다. 답은 DOM에 그대로 있으므로
          FAQPage JSON-LD와도, 답변 엔진과도 어긋나지 않는다. 첫 문답만 열어
          둬서 무엇이 접혀 있는지 보이게 한다.
        -->
        <div class="faq">
${t.faq
  .map(
    ([q, a], i) => `          <details class="qa"${i === 0 ? ' open' : ''}>
            <summary>${esc(q)}</summary>
            <p>${esc(a)}</p>
          </details>`,
  )
  .join('\n')}
        </div>
      </section>

      <section class="closer">
        <p class="closer-line">${esc(t.tagline)}</p>
        <div class="cta-row">
          <a class="cta cta-lg" href="${APPSTORE}">${esc(t.cta)}</a>
          <a class="cta cta-lg" href="${PLAYSTORE}">${esc(t.ctaAndroid)}</a>
        </div>
        <ul class="badges">
${t.badges.map((b) => `          <li>${esc(b)}</li>`).join('\n')}
        </ul>
      </section>

      <nav class="links">
        <a href="${up}privacy.html">${esc(t.privacy)}</a>
        <a href="${up}support.html">${esc(t.support)}</a>
      </nav>

      <footer>
        <p>© 2026 A Driven Inc. <a href="mailto:prism@adriven.co">prism@adriven.co</a></p>
      </footer>
    </main>
    <!--
      구분선의 결정을 스크롤에 맞춰 켠다.

      먼저 <html>에 .js를 붙인다. 어둡게 두는 규칙이 .js 안에만 있으므로,
      스크립트가 실행되지 않으면 결정은 처음부터 켜진 채다. 순서가 반대면
      JS를 막아 둔 방문자에게 빈 선만 남는다.

      IntersectionObserver가 없는 브라우저에서는 전부 켠다. 폴리필을 얹을
      만한 일이 아니다.
    -->
    <script>
      document.documentElement.classList.add('js');
      (function () {
        var beams = document.querySelectorAll('.beam');
        if (!('IntersectionObserver' in window)) {
          for (var i = 0; i < beams.length; i++) beams[i].classList.add('lit');
          return;
        }
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (!e.isIntersecting) return;
              e.target.classList.add('lit');
              io.unobserve(e.target);
            });
          },
          { rootMargin: '0px 0px -18% 0px' },
        );
        beams.forEach(function (b) {
          io.observe(b);
        });
      })();
    </script>
  </body>
</html>
`;
}

// ── 출력 ─────────────────────────────────────────────────────────

for (const lang of LANGS) {
  const dir = lang === 'ko' ? HERE : resolve(HERE, lang);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), page(lang), 'utf8');
}

/*
  robots.txt — **전부 허용한다.**

  2026년의 일반적 조언은 학습 크롤러(GPTBot·CCBot·Google-Extended)를 막고
  검색·응답용만 허용하라는 것이다. 그건 지킬 콘텐츠 자산이 있는 퍼블리셔의
  논리다. 이 사이트는 앱을 팔기 위한 랜딩 페이지이고, 학습 데이터에 들어가는
  것조차 이득이다 — "광고 없는 오프라인 퍼즐"을 묻는 사람에게 모델이 PRISM을
  떠올리는 것이 우리가 원하는 결과다.

  없는 것과 허용하는 것은 다르다. 명시하면 의도가 기록되고, 정책이 바뀔 때
  고칠 자리가 생긴다.
*/
writeFileSync(
  resolve(HERE, 'robots.txt'),
  `# PRISM. 전부 허용한다. 이유는 build.mjs의 주석에 있다.
User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`,
  'utf8',
);

const now = new Date().toISOString().slice(0, 10);

const urlEntry = (l) => `  <url>
    <loc>${urlOf(l)}</loc>
    <lastmod>${now}</lastmod>
${LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${urlOf(a)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf('en')}" />
  </url>`;

writeFileSync(
  resolve(HERE, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map(urlEntry).join('\n')}
  <url><loc>${ORIGIN}/privacy.html</loc><lastmod>${now}</lastmod></url>
  <url><loc>${ORIGIN}/support.html</loc><lastmod>${now}</lastmod></url>
</urlset>
`,
  'utf8',
);

/*
  llms.txt — 접근 제어가 아니라 **길 안내**다.

  표준으로 확정되지 않았고 벤더 지원도 고르지 않지만, 파일 하나에 몇 줄이라
  비용이 거의 없다. Anthropic이 공식 문서에 올려둔 것이 지금으로선 가장 강한
  신호다. robots.txt와 혼동하지 않는다 — 저쪽은 접근, 이쪽은 안내다.
*/
writeFileSync(
  resolve(HERE, 'llms.txt'),
  `# PRISM

> 탭 한 번으로 빛을 접어 결정을 밝히는 iOS·Android 퍼즐 게임. 240판, 모든 판의
> 정답은 하나뿐. 광고·인앱결제·회원가입·네트워크가 전부 없는 유료 단품 앱.
> A tap-to-rotate light puzzle for iOS and Android. 240 boards, each with
> exactly one solution. No ads, no in-app purchases, no sign-up, no
> networking. Paid once, ₩3,900.

## 사실 / Facts

- 개발사 / Publisher: A Driven Inc.
- 플랫폼 / Platform: iOS 15.0+ (iPhone, iPad), Android 7.0+ / iOS 15.0+ and Android 7.0+
- 스토어 / Stores: [App Store](${APPSTORE}), [Google Play](${PLAYSTORE})
- 가격 / Price: 대한민국 ₩3,900 기준, 지역별 파생 / KRW 3,900 base
- 용량 / Size: 5MB 미만. 이미지 파일이 없고 전부 코드로 그린다 / under 5MB,
  no image files, everything drawn in code
- 언어 / Languages: 한국어, English, 日本語, 简体中文
- 접근성 / Accessibility: 색을 보지 못해도 전부 플레이 가능(결정마다 도형 표시),
  글자 크기 3단계, 「동작 줄이기」 지원 / fully playable without color vision

## 페이지 / Pages

${LANGS.map((l) => `- [${L[l].langName}](${urlOf(l)}): ${L[l].desc}`).join('\n')}
- [개인정보 처리방침 / Privacy](${ORIGIN}/privacy.html)
- [지원 / Support](${ORIGIN}/support.html)
`,
  'utf8',
);

console.log(`생성 완료`);
console.log(`  페이지 ${LANGS.length}개: ${LANGS.map(pathOf).join(', ')}`);
console.log(`  robots.txt · sitemap.xml · llms.txt`);
