/**
 * `/about/`: 에이드리븐 소개와 패밀리 서비스(사용자 결정 2026-11-10: 바닥글 + 소개 페이지).
 * 바닥글에서만 연결한다(주 메뉴에 두지 않는다. 운영 주체 소개는 방문 목적이 아니다).
 *
 * 회사 소개는 확인한 사실만 쓴다. 서비스 설명은 각 서비스가 자기 페이지에 쓴 말에서 왔다
 * (`site.mjs`의 FAMILY). 링크는 서비스 이름 하나만(카드 전체를 링크로 만들지 않는다:
 * 스크린 리더가 카드 글 전체를 링크 이름으로 읽는다).
 */

import { ORIGIN, ORG, LANGS, UI, EMAIL, FAMILY, esc, homeOf, aboutPath, familyName, familyNameLang, familyHref } from '../site.mjs';
import { page } from '../ui/page.mjs';

export const ABOUT_UPDATED = '2026-11-26';

const T = {
  ko: {
    title: '에이드리븐',
    sub: 'PRISM을 만든 곳',
    desc: '에이드리븐(A Driven Inc.)은 빛의 퍼즐 게임 PRISM을 만든 회사입니다. 에이드리븐이 만들어 운영하는 서비스를 소개합니다.',
    intro: '에이드리븐(A Driven Inc.)은 PRISM을 만든 회사입니다. 아래는 에이드리븐이 만들어 운영하는 서비스입니다. 이름을 누르면 그 서비스의 사이트로 갑니다.',
    servicesH: '에이드리븐이 만든 서비스',
    prismDesc: '빛을 접어 결정을 밝히는 퍼즐 게임과, 빛을 배우는 학습 자료',
    current: '지금 보고 있는 사이트',
    contactH: '연락처',
    contact: 'PRISM에 관한 문의',
  },
  en: {
    title: 'A Driven',
    sub: 'The company behind PRISM',
    desc: 'A Driven Inc. is the company that makes PRISM, the light puzzle game. Here are the services A Driven builds and runs.',
    intro: 'A Driven Inc. (에이드리븐) is the company that makes PRISM. Below are the services A Driven builds and runs. Select a name to visit that service.',
    servicesH: 'Services by A Driven',
    prismDesc: 'A light puzzle game, and learning material about light',
    current: 'You are here',
    contactH: 'Contact',
    contact: 'Questions about PRISM',
  },
  ja: {
    title: 'A Driven',
    sub: 'PRISMをつくった会社',
    desc: 'A Driven Inc.（에이드리븐）は光のパズルゲームPRISMをつくった会社です。A Drivenがつくり運営しているサービスを紹介します。',
    intro: 'A Driven Inc.（에이드리븐）はPRISMをつくった会社です。以下はA Drivenがつくり運営しているサービスです。名前を選ぶとそのサービスのサイトへ移動します。',
    servicesH: 'A Driven のサービス',
    prismDesc: '光を折って結晶を灯すパズルゲームと、光を学ぶ教材',
    current: 'いま見ているサイト',
    contactH: 'お問い合わせ',
    contact: 'PRISMについてのお問い合わせ',
  },
  'zh-Hans': {
    title: 'A Driven',
    sub: '制作 PRISM 的公司',
    desc: 'A Driven Inc.（에이드리븐）是制作光线解谜游戏 PRISM 的公司。这里介绍 A Driven 制作并运营的服务。',
    intro: 'A Driven Inc.（에이드리븐）是制作 PRISM 的公司。以下是 A Driven 制作并运营的服务。选择名称即可前往该服务的网站。',
    servicesH: 'A Driven 的服务',
    prismDesc: '折转光线、点亮结晶的解谜游戏，以及学习光的资料',
    current: '你正在浏览的网站',
    contactH: '联系',
    contact: '关于 PRISM 的问题',
  },
};

export function aboutPages() {
  return LANGS.map((lang) => {
    const t = T[lang];
    const u = UI[lang];
    const path = aboutPath(lang);
    const card = (name, desc, extra) =>
      `        <li class="card"><h3>${name}</h3><p>${esc(desc)}</p><p class="card__meta">${extra}</p></li>`;
    const cards = [
      card(`<a href="${homeOf(lang)}">PRISM</a>`, t.prismDesc, `prism.adriven.co · ${esc(t.current)}`),
      ...FAMILY.map((f) => {
        const nl = familyNameLang(f, lang);
        const name = `<a href="${familyHref(f, lang, 'about')}"${nl !== lang ? ` lang="${nl}" hreflang="ko"` : ''}>${esc(familyName(f, lang))}</a>`;
        return card(name, f.desc[lang], `${f.host}${f.koOnly && lang !== 'ko' ? ` · ${esc(u.koOnly)}` : ''}`);
      }),
    ];
    return {
      path,
      updated: ABOUT_UPDATED,
      html: page({
        lang,
        title: `${t.title}: ${t.sub} | PRISM`,
        h1: t.title,
        desc: t.desc,
        path,
        alternates: Object.fromEntries(LANGS.map((l) => [l, aboutPath(l)])),
        crumbs: [[u.home, homeOf(lang)]],
        ld: [{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `${t.title}: ${t.sub}`,
          inLanguage: lang,
          url: ORIGIN + path,
          mainEntity: { ...ORG, email: EMAIL },
        }],
        main: `      <header class="page-head">
        <h1>${esc(t.title)}</h1>
        <p class="page-head__sub">${esc(t.sub)}</p>
        <p class="lead">${esc(t.intro)}</p>
      </header>
      <section class="section">
        <h2>${esc(t.servicesH)}</h2>
        <ul class="card-list grid" style="--grid-min: 15rem">
${cards.join('\n')}
        </ul>
      </section>
      <section class="section">
        <h2>${esc(t.contactH)}</h2>
        <p>${esc(t.contact)}: <a href="mailto:${EMAIL}">${EMAIL}</a></p>
      </section>`,
      }),
    };
  });
}
