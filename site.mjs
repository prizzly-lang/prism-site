/**
 * 사이트 구조 데이터. 머리말 메뉴, 언어 전환, 브레드크럼, 바닥글 사이트맵, 패밀리 사이트,
 * 개념 목록이 전부 여기서 나온다(Docusaurus·Starlight가 sidebars 파일 하나에서 내비를 만드는
 * 방식). 섹션 이름이나 순서를 바꿀 때 고칠 곳이 이 파일 하나여야 한다.
 * 근거와 규격: prism 저장소 docs/SITE-UX-PLAN.md 2·3절.
 */

export const ORIGIN = 'https://prism.adriven.co';
export const APPSTORE = 'https://apps.apple.com/kr/app/id6803019903';
export const PLAYSTORE = 'https://play.google.com/store/apps/details?id=co.adriven.prism';
export const EMAIL = 'prism@adriven.co';

/*
  이 앱과 회사를 가리키는 고유 식별자(@id).

  「Prism」이라는 빛 퍼즐 앱이 여럿이라 답변 엔진이 섞는다(2026-11-09 측정에서 일본어
  AI 개요가 실제로 다른 앱과 섞었다). 페이지마다 같은 @id를 쓰고 sameAs로 두 스토어
  페이지를 묶으면 「이 PRISM = 이 App Store 앱 = 이 Play 앱」이 기계에 명시된다.
  첫 화면이 12월에 허브로 바뀌어도 이 문자열은 바꾸지 않는다(SITE-UX-PLAN 2절).
*/
export const APP_ID = `${ORIGIN}/#app`;
export const ORG = {
  '@type': 'Organization',
  '@id': 'https://adriven.co/#org',
  name: 'A Driven Inc.',
  alternateName: ['A Driven', 'Adriven', '에이드리븐'],
  url: 'https://adriven.co/',
};

/** 앱이 지원하는 언어와 같다. **앱이 못 하는 언어로 사이트를 만들지 않는다**(AEO.md). */
export const LANGS = ['ko', 'en', 'ja', 'zh-Hans'];
export const LANG_NAME = { ko: '한국어', en: 'English', ja: '日本語', 'zh-Hans': '简体中文' };
const OG_LOCALE = { ko: 'ko_KR', en: 'en_US', ja: 'ja_JP', 'zh-Hans': 'zh_CN' };
export const ogLocale = (l) => OG_LOCALE[l];

/** 언어 접두어. 한국어는 루트, 나머지는 `/en` 등. */
export const prefix = (l) => (l === 'ko' ? '' : `/${l}`);
export const homeOf = (l) => `${prefix(l)}/`;

export const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** 태그가 들어 있는 문자열에서 평문만(JSON-LD, aria-label). */
export const plain = (s) => String(s).replace(/<[^>]+>/g, '');

/** 화면 글자. 페이지 내용이 아니라 틀(머리말·바닥글·내비)의 말이다. */
export const UI = {
  ko: {
    skip: '본문으로 건너뛰기',
    mainNav: '주 메뉴',
    langNav: '언어',
    crumbs: '현재 위치',
    home: 'PRISM',
    learn: '배우기',
    worksheets: '학습지',
    play: '해 보기',
    app: '앱',
    footerSite: 'PRISM',
    footerRead: '읽을거리',
    footerCompany: '에이드리븐',
    about: '에이드리븐 소개',
    privacy: '개인정보 처리방침',
    support: '지원 · 문의',
    family: '에이드리븐 패밀리 사이트',
    koOnly: '한국어',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    getIos: 'App Store에서 받기',
    getAndroid: 'Google Play에서 받기',
    conceptList: '개념 목록',
    pager: '이전·다음 개념',
    prev: '이전',
    next: '다음',
  },
  en: {
    skip: 'Skip to main content',
    mainNav: 'Main menu',
    langNav: 'Language',
    crumbs: 'You are here',
    home: 'PRISM',
    learn: 'Learn',
    worksheets: 'Worksheets',
    play: 'Play',
    app: 'App',
    footerSite: 'PRISM',
    footerRead: 'Reading',
    footerCompany: 'A Driven',
    about: 'About A Driven',
    privacy: 'Privacy Policy',
    support: 'Support',
    family: 'A Driven family sites',
    koOnly: 'Korean only',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    getIos: 'Get it on the App Store',
    getAndroid: 'Get it on Google Play',
    conceptList: 'Concepts',
    pager: 'Previous and next concept',
    prev: 'Previous',
    next: 'Next',
  },
  ja: {
    skip: '本文へ移動',
    mainNav: 'メインメニュー',
    langNav: '言語',
    crumbs: '現在の場所',
    home: 'PRISM',
    learn: '学ぶ',
    worksheets: '学習プリント',
    play: '遊んでみる',
    app: 'アプリ',
    footerSite: 'PRISM',
    footerRead: '読みもの',
    footerCompany: 'A Driven',
    about: 'A Driven について',
    privacy: 'プライバシーポリシー',
    support: 'サポート・お問い合わせ',
    family: 'A Driven のファミリーサイト',
    koOnly: '韓国語のみ',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    getIos: 'App Store で入手',
    getAndroid: 'Google Play で入手',
    conceptList: '項目一覧',
    pager: '前後の項目',
    prev: '前へ',
    next: '次へ',
  },
  'zh-Hans': {
    skip: '跳到正文',
    mainNav: '主菜单',
    langNav: '语言',
    crumbs: '当前位置',
    home: 'PRISM',
    learn: '学习',
    worksheets: '学习单',
    play: '试玩',
    app: '应用',
    footerSite: 'PRISM',
    footerRead: '文章',
    footerCompany: 'A Driven',
    about: '关于 A Driven',
    privacy: '隐私政策',
    support: '支持与联系',
    family: 'A Driven 旗下网站',
    koOnly: '仅韩语',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    getIos: '在 App Store 获取',
    getAndroid: '在 Google Play 获取',
    conceptList: '概念列表',
    pager: '上一个和下一个概念',
    prev: '上一个',
    next: '下一个',
  },
};

/**
 * 개념. 게임의 일곱 챕터 순서이자 학습 순서다. 제목은 교과 용어(교사가 검색하는 말),
 * 게임 챕터 이름은 각 페이지의 부제로 내린다. `learn/<slug>.mjs`가 있는 것만 링크가 된다.
 */
export const CONCEPTS = [
  { slug: 'reflection', ko: '빛의 반사', en: 'Reflection of light' },
  { slug: 'beam-splitter', ko: '반투명 거울', en: 'Beam splitters' },
  { slug: 'dispersion', ko: '빛의 분산', en: 'Dispersion of light' },
  { slug: 'light-mixing', ko: '빛의 합성', en: 'Mixing colored light' },
  { slug: 'color-filters', ko: '색 필터', en: 'Color filters' },
  { slug: 'spectroscopy', ko: '분광', en: 'Spectroscopy' },
  { slug: 'polarization', ko: '편광', en: 'Polarization' },
];

/** 개념·학습지 섹션이 있는 언어. 일본어·중국어는 교사 수요를 본 뒤 더한다(WORKSHEETS.md). */
export const LEARN_LANGS = ['ko', 'en'];

export const learnPath = (l, slug) => `${prefix(l)}/learn/${slug ? `${slug}/` : ''}`;
export const worksheetsPath = (l, slug) => `${prefix(l)}/worksheets/${slug ? `${slug}/` : ''}`;
export const docPath = (l, slug) => `${prefix(l)}/${slug}.html`;
export const aboutPath = (l) => `${prefix(l)}/about/`;

/**
 * 주 메뉴. 모든 페이지에서 같은 순서다(WCAG 3.2.3). `key`는 페이지가 넘기는 `section`과
 * 맞춰 현재 섹션을 표시한다. 개념·학습지가 없는 언어의 「배우기」는 그 언어의 교사용 안내
 * 글(일곱 챕터 원리)로 보낸다. 「오늘의 퍼즐」은 /daily/가 생기는 날 여기에 더한다.
 */
export function navItems(lang) {
  const u = UI[lang];
  const hasLearn = LEARN_LANGS.includes(lang);
  return [
    { key: 'learn', name: u.learn, href: hasLearn ? learnPath(lang) : `${prefix(lang)}/optics/` },
    ...(hasLearn ? [{ key: 'worksheets', name: u.worksheets, href: worksheetsPath(lang) }] : []),
    { key: 'play', name: u.play, href: '/play/' },
    { key: 'app', name: u.app, href: homeOf(lang) },
  ];
}

/*
  에이드리븐 패밀리 사이트(사용자 결정 2026-11-10: 바닥글 + 소개 페이지).

  한국 사이트 관례인 「Family Site」 드롭다운은 쓰지 않는다. 고르자마자 이동하면 WCAG 3.2.2
  위반 소지가 있고 선택지를 숨긴다. 펼친 링크 목록으로 둔다. 이름과 설명은 각 서비스가 자기
  페이지에 쓴 말에서 가져왔다(2026-11-10 확인). 하루연산·해빗리는 한국어 서비스라 다른 언어
  페이지에서는 이름을 한국어 그대로(lang="ko") 두고 「한국어」라고 밝힌다. 템플로는 언어별
  경로가 있다.

  유입은 받는 쪽 분석에서 센다(이 사이트에는 분석이 없다). 주소에 개인정보는 넣지 않는다.
    utm_source=prism · utm_medium=referral · utm_campaign=family · utm_content=footer|about
*/
export const FAMILY = [
  {
    key: 'harumath',
    name: { ko: '하루연산' },
    host: 'harumath.kr',
    url: () => 'https://harumath.kr/',
    koOnly: true,
    desc: {
      ko: '아이 맞춤 연산 문제지를 매번 새로 만들어 주는 무료 서비스. 초1~6',
      en: 'Free arithmetic worksheets made fresh for each child, grades 1 to 6',
      ja: '子どもに合わせた計算プリントを毎回新しく作る無料サービス（小1〜6）',
      'zh-Hans': '每次为孩子新出一份计算练习的免费服务（小学 1 至 6 年级）',
    },
  },
  {
    key: 'habitly',
    name: { ko: '해빗리 Habitly' },
    host: 'habitly.kr',
    url: () => 'https://habitly.kr/',
    koOnly: true,
    desc: {
      ko: '가입 없이 바로 쓰는 쉬운 습관 도장 앱',
      en: 'A simple habit stamp app you can use without signing up',
      ja: '会員登録なしですぐ使える、かんたんな習慣スタンプアプリ',
      'zh-Hans': '无需注册即可使用的简单习惯打卡应用',
    },
  },
  {
    key: 'templo',
    name: { ko: '템플로', en: 'Templo', ja: 'Templo', 'zh-Hans': 'Templo' },
    host: 'templo.kr',
    url: (l) => `https://templo.kr/${{ ko: 'ko', en: 'en', ja: 'ja', 'zh-Hans': 'zh-CN' }[l]}`,
    koOnly: false,
    desc: {
      ko: '한국 사찰 지도 · 체크인 · 순례',
      en: 'Korean temple map, check-ins and pilgrimages',
      ja: '韓国の寺院マップ・チェックイン・巡礼',
      'zh-Hans': '韩国寺院地图、打卡与巡礼',
    },
  },
  {
    key: 'adriven',
    name: { ko: '에이드리븐', en: 'A Driven', ja: 'A Driven', 'zh-Hans': 'A Driven' },
    host: 'adriven.co',
    url: () => 'https://adriven.co/',
    koOnly: false,
    desc: {
      ko: '이용자가 직접 제공한 데이터로 마케팅을 돕는 회사 사이트',
      en: 'Company site: marketing built on data people choose to share',
      ja: '会社サイト：利用者が自ら提供するデータでマーケティングを支援',
      'zh-Hans': '公司网站：用用户主动提供的数据做营销',
    },
  },
];

export const familyName = (f, l) => f.name[l] ?? f.name.ko;
/** 이름이 그 페이지 언어가 아니면 lang 속성을 단다(스크린 리더 발음). */
export const familyNameLang = (f, l) => (f.name[l] ? l : 'ko');
export const familyHref = (f, l, content) =>
  `${f.url(l)}?utm_source=prism&amp;utm_medium=referral&amp;utm_campaign=family&amp;utm_content=${content}`;
