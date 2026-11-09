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

## 3. 답변 엔진 2차 측정 (2026-11-09)

9/21 1차 측정 뒤 7주. **Perplexity는 이제 회원가입해야 답을 준다**(「가입한 뒤 요청을
다시 보내주세요」)라서 빠졌고, Google AI 개요와 검색 상위 8개로 쟀다. 사용자의 Google
계정으로 로그인된 Chrome이라 결과에 개인화가 섞였을 수 있다. ChatGPT는 사용자가 따로 확인.

**일반 질문 13개: PRISM 0회.** AI 개요에도, 상위 8개에도 없다.

| 언어 | 질문 | AI 개요가 든 앱 |
|---|---|---|
| ko | 광고 없는 오프라인 퍼즐 게임 추천 | (개요 없음) 스도쿠류, 레딧, 네이버 블로그 목록 |
| ko | 빛 반사 퍼즐 게임 앱 | Lumina, Laser Mind |
| ko | 색약도 할 수 있는 퍼즐 게임 | Colorcube, Colorzzle |
| ko | 광원리 배우는 퍼즐 게임 학생 | God of Light |
| en | light reflection puzzle game app | Lumina, Laser Puzzle: Mirror & Light, Light Ignite |
| en | optics puzzle game for students | Scientific Project: Optic, physicsfundamentals |
| en | ad-free offline puzzle game for iPhone | Puzzles - Offline & no Ads |
| en | colorblind friendly color puzzle game mobile | Color Sort Challenge |
| ja | 光 反射 パズルゲーム アプリ | Lazors, LASERBREAK |
| ja | 広告なし オフライン パズルゲーム おすすめ | ジグソーパズル 등 |
| zh | 光线反射 解谜游戏 app | Lazors, Lumina |
| zh | 无广告 离线 解谜游戏 推荐 | The Room, Cats in Time |

**이름으로 물으면 안다**(「PRISM + 빛 퍼즐」을 각 언어로):

- ko: AI 개요가 규칙을 정확히 설명하고 App Store와 사이트를 인용. 상위 8개 중 4개가 우리
- zh: 「PRISM (Adriven)」이라고 정확히 짚고 사이트로 안내. 사이트 3위
- ja: 우리를 알지만 **다른 앱 「PRISM — 光を導くパズル」와 섞어서** 설명. 사이트 3위
- en: AI 개요 없음. Play 페이지 1위, **사이트는 8위 안에 없다**

**색인**: `site:` 검색에 8쪽이 다 잡힌다(`support.html`만 없음).

### 읽은 것

1. **일반 질문에서 인용되는 쪽은 앱 스토어 페이지와 「추천 목록」 글이다.** 일본어는
   「おすすめランキング」, 한국어는 네이버 블로그와 레딧. 우리 사이트 한 곳의 주장으로는
   부족하고 **제3자 목록에 올라야 한다.** Educational App Store의 「Puzzle Apps」 목록이
   정확히 그 자리다(유료, 가격 문의 중. prism 저장소 docs/MARKETING.md)
2. **이름이 겹친다.** 검색에 걸린 다른 앱만 Prism - Daily Light Puzzle, Prismlight,
   Prism Out, Prismelle, PRISM 光を導くパズル, Prism Riddle. 「PRISM」만으로는 구별되지 않아
   일본어 AI 개요가 실제로 섞었다. 글과 바깥 게시물에서 **PRISM을 쓸 때 A Driven과 함께**
   쓴다
3. **영어 사이트 제목에 「light puzzle」이 없다.** 한국어 제목은 「빛을 접어」, 영어는
   「Bend beams/light. Wake the crystals.」뿐이라 영어로 「PRISM light puzzle」을 찾을 때
   걸릴 말이 없다. Play 이름은 「PRISM: Light Puzzle」이다
4. **「학생·광학」 질문은 비어 있다.** 영어·한국어 모두 PC 게임이나 웹 시뮬레이터가
   나온다. 챕터를 광학 개념에 맞춘 교사용 글이 들어갈 자리다

다음 측정은 글을 올리고 4주 뒤에 같은 질문으로 한다.

**ChatGPT (사용자가 로그인해서 확인, 2026-11-09)**

- 「광고 없는 오프라인 퍼즐 게임 추천」: Mini Metro, Monument Valley 2, The Room Three,
  Baba Is You, Hidden Folks, Simon Tatham's Puzzles. PRISM 없음(9월과 거의 같은 목록)
- 「optics puzzle game for student」: 앱이 아니라 Laser Maze 보드게임, PhET 시뮬레이터,
  일반 개념. PRISM 없음
- 「PRISM light puzzle game by A Driven」: **안다.** A Driven Inc.(에이드리븐 주식회사),
  ₩3,900, 광고 없음·오프라인, 6챕터를 개념별로(반사·분열·분산·혼합·필터·수렴) 정확히 나열하고
  「학생에게 흥미로운 이유」까지 붙인다. 다만 **오래된 정보**(240판, iPhone만, iOS 15)이고,
  「How the game works」 그림은 **우리 게임이 아닌 나무 상자 화면**이다

Google과 같은 그림이다. 이름을 알면 정확히(교육적 가치까지) 설명하지만, 이름 없이는 떠올리지
않는다. 교사용 글은 「학생·광학」 질문에서 이름 없이 걸리게 하려는 것이다.
