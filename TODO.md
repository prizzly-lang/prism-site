# 남은 것

2026-09-21 기준, 우선순위 순. AEO/GEO 작업의 배경과 이유는 `AEO.md`에
있다 — 여기는 지금 무엇이 안 끝났는지만 모아둔 목록이다. 끝난 일의
자세한 경위는 git 히스토리와 커밋 메시지에 있으므로 여기 다시 옮기지
않는다.

**최근에 끝난 것** (자세한 기록은 각 커밋 참고):

- 커스텀 도메인 이전(`prism.adriven.co`) + 네이버·다음 검색등록 —
  `prism/docs/ROADMAP-1.4.md`①번
- 연락처 이메일을 세 곳(사이트·Play·App Store) 다 `prism@adriven.co`로
  통일, 메일함 생존 확인
- 안드로이드 1.3 출시 후 사이트 반영 (FAQ·CTA 버튼·JSON-LD) +
  JSON-LD `softwareVersion` 고정값 버그 수정
- Google Search Console — `adriven.co`가 이미 **도메인 속성**으로
  인증돼 있어서(회사 본 사이트 등록 당시 설정) 별도 속성을 새로 만들
  필요가 없었다. 도메인 속성은 모든 서브도메인·프로토콜을 자동으로
  포함하므로 `prism.adriven.co`도 이미 그 안에 있다. 「Sitemaps」에
  `https://prism.adriven.co/sitemap.xml`만 제출했다(2026-09-21,
  「제출된 사이트맵」 목록에서 확인됨). 제출 직후라 상태는 아직 "가져올
  수 없음"으로 뜬다 — 사이트 자체는 http/https 둘 다 정상 응답하니
  첫 크롤링 전 placeholder일 가능성이 높다. **며칠 뒤 상태가
  "성공"으로 바뀌는지 다시 확인할 것.**

---

## 1. ~~측정 체계~~ — 이번 라운드 완료 (2026-09-21)

Search Console 등록 + 답변 엔진 수동 확인까지 끝났다.

**Perplexity**: 「광고 없는 오프라인 퍼즐 게임 추천」에 Puzzledom·오프라인
퍼즐 모음 앱·99 Games만 나옴.

**ChatGPT**: 사용자가 로그인 후 같은 질문에 Monument Valley·The Room
시리즈·Baba Is You·Mini Metro·Gorogoa·Simon Tatham's Puzzle Collection을
추천 — 역시 **PRISM은 아직 안 나온다.**

**둘 다 예상된 결과다** — 도메인을 옮기고 Search Console에 막 등록한 지
며칠 안 됐다. 색인이 어느 정도 쌓인 뒤(2주 이상 지나서) 다시 확인해봐야
의미가 있다. 그때 가서 또 한 번 이 두 질문을 반복하면 된다.

분석 스크립트를 넣는 것은 "개인정보 수집 없음" 주장과 충돌하므로 하지
않기로 확정했다(`AEO.md` "하지 않기로 한 것" 참고).

## 2. ~~일본어·중국어 미리보기 영상~~ — 완료 (2026-09-21)

전에 "브라우저를 해당 언어로 띄워 녹화하면 된다"고 적어뒀던 건 틀렸다는
걸 확인했었다(`requestAnimationFrame`이 자동화·헤드리스 브라우저에서
정상적으로 안 돈다, `tools/capture-scenes.js` 참고) — 대신 **사용자가
연결해둔 실제 Android 기기**로 세션이 직접 녹화했다.

절차: `adb`로 기기 확인(`co.adriven.prism` 설치돼 있었음) → 앱 설정에서
언어를 中文/日本語로 바꿔가며 → 레벨 1을 초기화하고 `adb shell
screenrecord`로 실제 풀이 과정을 녹화 → `adb pull`로 내려받아 ffmpeg로
540×818 30fps로 크롭·인코딩 → `media/preview-{ja,zh-Hans}.mp4`·`.jpg`로
저장(원본은 `media/orig/`에) → `build.mjs`의 `videoOf()`가 이제 언어별
파일을 그대로 쓰도록 수정(`l === 'ko' ? 'ko' : 'en'` → `l`). 로컬
서버로 두 페이지 다 실제 재생까지 확인했다.

**되돌린 것**: 녹화 중 기기의 앱 설정(언어·진동)을 건드렸던 걸 원래
값(简体中文, 진동 켜짐)으로 정확히 복원해뒀다 — 사용자의 실기기라서
작업 전 상태 그대로 남겨야 했다.
