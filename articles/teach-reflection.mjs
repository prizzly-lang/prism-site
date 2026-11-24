/**
 * 수업안 「게임으로 빛의 반사 가르치기: 20분 수업」.
 *
 * 왜 이 글인가: 2026-11-24 AI 답변 기록(prism 저장소 docs/ai-answers/)에서 「how to teach reflection of light with a
 * game」(14번)의 출처가 전부 수업 활동 모음 글(Science Buddies, education.com, study.com 등)이었고, 우리 사이트에는
 * 수업 순서를 적은 글이 없었다. 개념 페이지(`/learn/reflection/`)는 「무엇인가」를, 이 글은 「수업에서 어떻게」를 맡는다.
 * 한국어·영어만 쓴다(학습지가 두 언어에 있다).
 *
 * 사실 확인: 체험판 `/play/`는 1챕터 14판, 회원가입 없음(learn/reflection.mjs 머리 주석과 같은 근거).
 * 학습지 `reflection-basics`는 한·영, 2쪽 + 정답 1쪽. 가격과 스토어 버튼은 넣지 않는다(수업에는 체험판이면 된다).
 */

const SLUG = 'teach-reflection';
const DATE = '2026-11-24';
const UPDATED = '2026-11-24';

const TEXT = {
  ko: {
    title: '게임으로 빛의 반사 가르치기: 20분 수업안',
    navTitle: '빛의 반사 20분 수업안',
    desc: '손거울 실험 5분, 빛 퍼즐 게임으로 반사 방향 예측하기 8분, 그림으로 정리 5분, 확인 2분. 초등 5~6학년과 중학교 1학년이 쓸 수 있는 빛의 반사 수업안입니다. 준비물과 발문, 흔한 오개념까지 담았습니다.',
    lead: '빛의 반사는 손으로 해 보면 금방 이해되지만, 「반사된 빛이 어디로 갈지 <strong>예측</strong>하기」는 연습이 필요합니다. 이 수업안은 그 예측을 게임으로 여러 번 반복하게 합니다. 쓰는 게임은 에이드리븐(A Driven)이 만든 빛 퍼즐 PRISM의 1챕터로, 브라우저에서 설치나 회원가입 없이 바로 열립니다.',
    dateLabel: '2026년 11월 24일',
    body: [
      ['h2', '한눈에 보기'],
      ['table', [
        ['항목', '내용'],
        ['대상', '초등 5~6학년 「빛의 성질」, 중학교 1학년 「빛과 파동」 도입'],
        ['시간', '20분 (한 차시 안에 넣거나 앞 20분으로)'],
        ['목표', '빛은 곧게 나아가다 거울에서 방향을 바꾼다는 것을 알고, 거울의 방향을 보고 반사된 빛의 방향을 예측한다'],
        ['준비물', '모둠마다 손거울 1개와 손전등 1개, 태블릿이나 컴퓨터 1대(브라우저), 인쇄한 학습지'],
      ]],
      ['h2', '흐름'],
      ['table', [
        ['시간', '활동', '교사가 할 일'],
        ['0~5분', '손거울 실험: 거울을 눕혀 놓고 손전등을 비춰 천장의 빛 점을 찾는다. 손전등을 기울이고, 거울을 기울여 본다', '「빛 점은 왜 생겼을까?」 「거울을 기울이면 빛 점은 어디로 갈까?」를 하기 전에 먼저 묻는다'],
        ['5~13분', '게임으로 예측하기: 짝과 함께 PRISM 1챕터를 푼다. 한 사람이 탭하기 전에 다른 사람이 「빛이 위로/아래로 꺾인다」를 말한다', '맞힌 횟수를 세게 한다. 막힌 모둠에는 「빛이 지금 어디서 멈추는지 손가락으로 따라가 봐」라고만 말한다'],
        ['13~18분', '그림으로 정리: 학습지 앞면 판 하나에 빛의 길을 연필로 그린다. 중학교는 법선을 그리고 입사각과 반사각을 표시한다', '두세 모둠의 그림을 화면에 띄워 「빛은 곧게 가다가 거울에서만 꺾인다」를 함께 말로 정리한다'],
        ['18~20분', '확인: 출구 질문 하나에 답을 쓴다', '아래 「출구 질문」 가운데 하나를 칠판에 쓴다'],
      ]],
      ['h2', '준비'],
      ['ul', [
        '<a href="/play/">PRISM 체험판</a>을 미리 열어 두세요. 1챕터 14판이 들어 있고, 앞의 판일수록 쉽습니다. 처음 4~5판이면 이 수업에 충분합니다.',
        '학습지는 <a href="/worksheets/reflection-basics/">「거울로 빛 보내기」(초등용, 정답지 포함)</a>를 씁니다. 흑백으로 인쇄해도 빛의 색이 도형으로 표시되어 구별됩니다.',
        '개념 설명이 더 필요하면 <a href="/learn/reflection/">빛의 반사 개념 페이지</a>에 손거울 실험과 반사 법칙, 확인 문제가 있습니다.',
      ]],
      ['note', '<strong>안전</strong>: 손전등 빛이나 거울에 반사된 빛을 친구의 눈에 비추지 않게 미리 약속합니다. 금이 간 거울은 쓰지 않습니다.'],
      ['h2', '왜 게임을 쓰나'],
      ['p', '손거울 실험은 「반사가 일어난다」는 것을 보여 주지만, 한 번 해 보면 끝납니다. 게임에서는 거울을 탭할 때마다 빛의 길이 즉시 바뀌므로, 「예측하고 확인하기」를 몇 분 안에 수십 번 반복할 수 있습니다. 판마다 정답이 하나뿐이라 우연히 풀리지 않고, 틀리면 빛이 어디서 어긋났는지 화면에 그대로 보입니다.'],
      ['p', '게임은 실제보다 단순합니다. 빛은 위·아래·왼쪽·오른쪽으로만 가고, 거울은 「/」와 「\\」 두 자세만 있어 빛은 언제나 90도 꺾입니다. 수업 마지막에 「실제 거울은 어떤 각도든 들어온 각과 같은 각으로 반사한다」를 꼭 짚어 주세요.'],
      ['h2', '흔한 오개념과 짚어 줄 말'],
      ['ul', [
        '<strong>「빛은 거울 속으로 들어간다」</strong>: 거울을 손으로 가리면 천장의 빛 점이 사라지는 것을 보여 줍니다. 빛은 거울 표면에서 되돌아 나옵니다.',
        '<strong>「눈에서 무언가가 나가서 물체를 본다」</strong>: 물체에서 반사된 빛이 눈으로 들어오기 때문에 보인다고 정리합니다. 불을 끄면 보이지 않는 것이 근거입니다.',
        '<strong>(중학교) 「각도는 거울면에서 잰다」</strong>: 입사각과 반사각은 거울면이 아니라 법선에서 잽니다. 학습지에 법선을 먼저 그리게 하면 줄어듭니다.',
      ]],
      ['h2', '출구 질문'],
      ['ol', [
        '손전등 빛을 거울에 똑바로(수직으로) 비추면 반사된 빛은 어디로 갈까요? (정답: 온 길로 그대로 되돌아온다)',
        '게임에서 오른쪽으로 가던 빛이 「/」 거울을 만나면 어느 쪽으로 갈까요? (정답: 위)',
        '(중학교) 입사각이 40도이면 반사각은 몇 도인가요? (정답: 40도)',
      ]],
      ['h2', '더 하고 싶다면'],
      ['ul', [
        '빠른 모둠: 체험판 1챕터의 뒤쪽 판, 또는 학습지 <a href="/worksheets/reflection-two-mirrors/">「거울 두 장으로 빛 돌리기」</a>(잠망경 원리).',
        '다음 차시: 반투명 거울과 프리즘으로 이어지는 순서는 <a href="/optics/">교사용 안내 글(일곱 챕터)</a>에 있습니다.',
      ]],
    ],
  },

  en: {
    title: 'How to teach reflection of light with a game: a 20-minute lesson plan',
    navTitle: 'Teaching reflection: 20-minute lesson',
    desc: 'A 20-minute lesson on reflection of light for ages 9 to 12: a 5-minute mirror and flashlight demo, 8 minutes predicting reflected beams in a free browser puzzle game, 5 minutes drawing ray paths, and a 2-minute exit question. Materials, questions to ask and common misconceptions included.',
    lead: 'Students get the idea of reflection quickly once they try it with a mirror, but <strong>predicting</strong> where reflected light will go takes practice. This lesson uses a puzzle game to make students predict, check and predict again many times in a few minutes. The game is chapter 1 of PRISM, a light puzzle by A Driven, which opens in a web browser with nothing to install and no sign-up.',
    dateLabel: 'November 24, 2026',
    body: [
      ['h2', 'At a glance'],
      ['table', [
        ['Item', 'Details'],
        ['For', 'Ages 9 to 12 (KS2 Light, NGSS 4-PS4-2); also works as an opener at ages 11 to 14 (KS3 Light waves, MS-PS4-2)'],
        ['Time', '20 minutes'],
        ['Goal', 'Students know that light travels in straight lines and changes direction at a mirror, and can predict which way a reflected beam will go from the way a mirror faces'],
        ['You need', 'Per group: one hand mirror, one flashlight (torch) and one tablet or computer with a browser; printed worksheets'],
      ]],
      ['h2', 'Lesson flow'],
      ['table', [
        ['Time', 'Students', 'Teacher'],
        ['0 to 5 min', 'Mirror demo: lay a mirror flat, shine a flashlight on it and find the bright spot on the ceiling. Tilt the flashlight, then tilt the mirror', 'Ask before each step: "Why is there a spot?" "If we tilt the mirror, where will the spot go?"'],
        ['5 to 13 min', 'Predict with the game: in pairs, play PRISM chapter 1. Before one partner taps a mirror, the other says "the beam will turn up" or "down"', 'Have pairs count correct predictions. If a pair is stuck, only say: "Follow the beam with your finger. Where does it stop now?"'],
        ['13 to 18 min', 'Draw it: on the worksheet, trace the path of light on one board in pencil. Older students draw the normal and mark the angles of incidence and reflection', 'Show two or three drawings to the class and agree together: "Light goes straight, and only turns at a mirror."'],
        ['18 to 20 min', 'Check: write an answer to one exit question', 'Put one of the exit questions below on the board'],
      ]],
      ['h2', 'Before the lesson'],
      ['ul', [
        'Open the <a href="/play/">PRISM browser demo</a>. It has all 14 boards of chapter 1, easiest first. The first four or five are plenty for this lesson.',
        'Print the worksheet <a href="/en/worksheets/reflection-basics/">Steering Light with Mirrors</a> (two A4 pages plus an answer key). Colors are also marked with shapes, so it works on a black and white printer.',
        'For background, the <a href="/en/learn/reflection/">reflection of light concept page</a> has the mirror experiment, the law of reflection and check questions.',
      ]],
      ['note', '<strong>Safety:</strong> agree beforehand that nobody shines a flashlight, or light bounced off a mirror, into anyone\'s eyes. Do not use cracked mirrors.'],
      ['h2', 'Why use a game?'],
      ['p', 'The mirror demo shows that reflection happens, but once you have seen it, it is done. In the game, every tap changes the beam\'s path at once, so students can predict and check dozens of times in a few minutes. Each board has exactly one solution, so nothing is solved by luck, and when a prediction is wrong the screen shows exactly where the beam went instead.'],
      ['p', 'The game is simpler than real light. Beams only travel up, down, left or right, and a mirror has only two positions, "/" and "\\", so light always turns through exactly 90 degrees. End the lesson by pointing out that a real mirror reflects light arriving at any angle, with the angle of reflection equal to the angle of incidence.'],
      ['h2', 'Common misconceptions and what to say'],
      ['ul', [
        '<strong>"Light goes into the mirror."</strong> Cover the mirror with a hand and the spot on the ceiling disappears. The light bounces off the surface.',
        '<strong>"Something comes out of our eyes so we can see."</strong> We see objects because light reflected from them enters our eyes. Turn off the lights and we cannot see them.',
        '<strong>(Older students) "Measure the angles from the mirror."</strong> Both angles are measured from the normal. Having students draw the normal first on the worksheet helps.',
      ]],
      ['h2', 'Exit questions'],
      ['ol', [
        'If you shine a flashlight straight at a mirror, at right angles, where does the reflected light go? (Answer: straight back the way it came.)',
        'In the game, a beam heading right meets a "/" mirror. Which way does it go? (Answer: up.)',
        '(Older students) The angle of incidence is 40 degrees. What is the angle of reflection? (Answer: 40 degrees.)',
      ]],
      ['h2', 'Extension'],
      ['ul', [
        'Fast finishers: the later boards of chapter 1, or the worksheet <a href="/en/worksheets/reflection-two-mirrors/">Light Around Corners</a> (how a periscope works).',
        'Next lessons: half-silvered mirrors and prisms follow in the same order as the game. See the <a href="/en/optics/">teacher\'s guide to all seven chapters</a>.',
      ]],
    ],
  },
};

export default {
  slug: SLUG,
  date: DATE,
  updated: UPDATED,
  langs: ['ko', 'en'],
  type: 'Article',
  ld: () => ({
    learningResourceType: 'lesson plan',
    timeRequired: 'PT20M',
    educationalUse: 'instruction',
    audience: { '@type': 'EducationalAudience', educationalRole: 'teacher' },
  }),
  text: TEXT,
};
