/**
 * 같은 회사(에이드리븐)의 다른 서비스로 가는 링크.
 *
 * 하루연산(harumath.kr)은 초등 연산 문제지를 매일 새로 만들어 주는 서비스다. 손님(초등
 * 보호자)이 PRISM의 손님(초5~중학생과 교사)과 이어져서 서로 소개한다(2026-11-10 사용자 결정).
 * 한국어 서비스라 **한국어 페이지에만** 단다. 바닥글의 패밀리 사이트 목록(site.mjs FAMILY,
 * utm_campaign=family)이 모든 페이지에서 하루연산을 소개하므로, 여기 주소는 본문 문장 속
 * 소개(학습지 화면의 「매일 연산 연습은 하루연산에서」)에만 쓴다.
 *
 * 유입을 하루연산 쪽 분석에서 구별할 수 있게 UTM을 붙인다. 이 사이트 자체에는 분석 스크립트가
 * 없다(개인정보 수집 없음 약속). 그래서 셈은 받는 쪽에서 한다.
 *   utm_source=prism      어디서 왔나
 *   utm_medium=referral   다른 사이트의 링크
 *   utm_campaign=crosslink 회사 안 서비스끼리 소개
 *   utm_content=<자리>     어느 페이지의 문장에서(지금은 worksheet)
 * 주소에 개인정보는 넣지 않는다. 자리 이름만 넣는다.
 */

export const harumathUrl = (content) =>
  `https://harumath.kr/?utm_source=prism&utm_medium=referral&utm_campaign=crosslink&utm_content=${content}`;

/** HTML 속성에 넣는 꼴(& → &amp;). */
export const harumathHref = (content) => harumathUrl(content).replace(/&/g, '&amp;');
