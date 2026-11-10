/**
 * 개념 페이지 1/7 「빛의 반사」(`/learn/reflection/`)의 한·영 문구. 틀은 prism 저장소
 * `docs/OPTICS-SITE.md` 3절, 순서는 `docs/SITE-UX-PLAN.md` 5절 「개념」을 따른다.
 * 확인 문제(`check`)와 게임과 다른 점(`differs`)은 템플릿이 본문 뒤에 그리므로 `body`에
 * 되풀이하지 않는다.
 *
 * ## 게임 규칙의 출처 (prism 저장소, v1.6 브랜치)
 * - 거울의 자세: `src/engine/types.ts`의 `ORIENTATIONS.mirror = 2`("/"와 "\"),
 *   탭은 `src/engine/beam.ts`의 `rotatePiece`가 rot를 한 단계 순환시킨다. 두 자세를
 *   오가는 것이 곧 거울을 90도 돌리는 것이다.
 * - 꺾이는 방향: `beam.ts`의 `REFLECT` 표. "/"는 오른쪽→위, 왼쪽→아래, "\"는 오른쪽→아래,
 *   왼쪽→위. 네 방향 모두 반사하므로 게임의 거울은 **양면**이다. 빛을 흡수하지 않고 색도
 *   바꾸지 않는다. 벽·결정·광원은 닿은 빛을 흡수한다.
 * - 1챕터 판의 조각: `src/levels.demo.json`(체험판 = 1챕터 14판)에는 광원·거울·결정만 있다.
 * - 원리 카드: `/img/optics/{ko,en}-ch1.webp`, 둘 다 680×1084(PIL로 잼). 체험판도 같은
 *   카드를 띄운다(`src/game/optics.ts`에 IS_DEMO 분기 없음).
 *
 * ## 교육과정 (prism-site `worksheet-content.mjs` 머리 주석, prism `docs/WORKSHEETS.md` 4절)
 * - 초5~6: [6과02-01] 물체를 보려면 빛이 있어야 함, [6과02-02] 빛의 직진·반사·굴절 현상 관찰.
 *   각도 규칙은 다루지 않는다. 그래서 「무슨 일이 일어났나」는 현상으로만 쓰고, 입사각 = 반사각은
 *   「중학교」 절로 따로 뺐다.
 * - 중학교: [9과10-01] 빛의 반사·굴절 원리와 물체를 보는 과정을 빛의 경로로 나타내기(반사 법칙은
 *   여기), [9과10-02] 그 법칙으로 평면거울의 상 설명. 2026-11-10 검수에서 [9과10-02]로 잘못 적힌
 *   것을 바로잡았다(출처: 2차 자료 둘이 같은 원문을 인용. 고시 원문 대조는 아직).
 * - 성취기준 원문 문장은 옮기지 않고 다루는 내용만 적었다.
 * - 영어판은 NGSS 4-PS4-2, MS-PS4-2, 영국 KS2 Light, KS3 Light waves에 「connects to」로만 잇는다.
 *
 * ## 쓰지 않은 것
 * - 가격, 스토어 배지(학습 페이지는 체험판으로 보낸다). 체험판은 「회원가입 없이」로 적었다.
 * - `articles/optics.mjs` 1장(앱 원리 카드 문구 그대로)의 문장. 이 페이지는 반사만 더 깊게
 *   새로 썼다. 카드 문구는 그림(img)으로만 보여 준다.
 * - 난반사·정반사라는 용어. 종이로 비춰 보는 관찰 한 문단만 두고, 게임이 이를 다룬다고
 *   쓰지 않는다.
 */
export default {
  slug: 'reflection',
  order: 1,
  chapter: 1,
  date: '2026-11-26',
  updated: '2026-11-26',
  langs: ['ko', 'en'],
  worksheet: 'path-of-light',
  text: {
    ko: {
      title: '빛의 반사',
      subtitle: 'PRISM 1챕터 「반사」',
      desc: '빛의 반사가 무엇인지 손거울과 손전등 실험으로 확인하고, 중학교 반사 법칙(입사각 = 반사각)과 빛 퍼즐 PRISM 1챕터의 거울까지 이어 봅니다.',
      definition: '빛의 반사는 나아가던 빛이 거울 같은 물체의 표면에 부딪혀 방향을 바꾸어 되돌아 나오는 현상으로, 매끄러운 면에서는 입사각과 반사각이 같습니다.',
      level: '초등 5~6학년 · 중학교',
      minutes: '10분',
      materials: '손거울, 손전등. 각도 재기 활동에는 종이, 연필, 각도기, 두꺼운 종이 한 장.',
      curriculum: '2022 개정 과학과 교육과정. 초등 5~6학년 「빛의 성질」에서는 물체를 보려면 빛이 있어야 함을 알고([6과02-01]), 빛이 직진·반사·굴절하는 현상을 관찰합니다([6과02-02]). 입사각과 반사각 같은 각도 규칙은 다루지 않습니다. 중학교 「빛과 파동」 [9과10-01]에서 빛의 반사 원리(반사 법칙)와 물체를 보는 과정을 빛의 경로로 나타내는 법을 배우고, [9과10-02]에서 이 법칙으로 평면거울에 상이 생기는 까닭을 설명합니다. 이 페이지의 「중학교: 반사 법칙」 부분이 여기에 해당합니다.',
      body: [
        ['h2', '작은 실험'],
        ['p', '손거울 하나와 손전등 하나면 됩니다. 방을 조금 어둡게 하면 더 잘 보입니다.'],
        ['ol', [
          '손거울을 책상 위에 눕혀 놓습니다. 손전등을 비스듬히 들고 거울 가운데를 비춥니다. 천장이나 벽에 생긴 <strong>밝은 빛 점</strong>을 찾습니다.',
          '손전등을 조금씩 세웠다가 다시 눕혀 봅니다. 빛 점이 어느 쪽으로 움직이는지 봅니다.',
          '이번에는 손전등을 그대로 두고, 거울에서 손전등 쪽 끝 밑에 지우개를 넣어 살짝 들어 봅니다. 빛 점이 어떻게 되는지 봅니다.',
        ]],
        ['note', '<strong>안전</strong>: 손전등 빛이나 거울에 반사된 빛을 사람의 눈에 비추지 않습니다. 손전등을 거의 곧게 세우면 반사된 빛이 내 얼굴 쪽으로 돌아오므로, 거울 위로 얼굴을 내밀지 않습니다. 금이 간 거울은 쓰지 않습니다.'],

        ['h2', '무슨 일이 일어났나'],
        ['p', '빛은 곧게 나아갑니다. 거울에 부딪힌 빛은 거울을 지나가지 못하고 방향을 바꿔 되돌아 나옵니다. 이것이 <strong>빛의 반사</strong>입니다. 천장의 빛 점은 반사된 빛이 닿은 자리입니다. 거울을 손으로 가리면 빛 점이 사라지는 것으로 확인할 수 있습니다.'],
        ['p', '손전등을 기울이자 빛 점이 움직였습니다. 거울로 들어가는 빛의 방향이 바뀌면 거울에서 나오는 빛의 방향도 함께 바뀌기 때문입니다. 손전등을 세울수록 빛 점은 거울 바로 위로 다가오고, 눕힐수록 손전등의 반대쪽으로 멀어집니다.'],
        ['p', '손전등을 그대로 두고 거울만 기울여도 빛 점이 움직였습니다. 거울이 놓인 방향을 바꾸면 반사된 빛이 가는 곳도 바뀝니다. 게임에서 거울을 탭할 때 일어나는 일이 바로 이것입니다.'],
        ['p', '거울 대신 흰 종이를 놓고 비춰 봅니다. 천장에 또렷한 빛 점이 생기지 않습니다. 종이 표면은 현미경으로 크게 확대해 보면 울퉁불퉁해서 빛을 여러 방향으로 흩어 반사하기 때문입니다. 책이나 얼굴처럼 스스로 빛을 내지 않는 물체를 볼 수 있는 것도, 그 물체에서 반사된 빛이 우리 눈에 들어오기 때문입니다. 빛이 여러 방향으로 흩어지기 때문에 방 안 어느 자리에서 보아도 그 물체가 보입니다.'],

        ['h2', '중학교: 반사 법칙'],
        ['p', '빛이 거울에 닿은 점에서 거울면에 수직으로 그은 선을 <strong>법선</strong>이라고 합니다. 거울로 들어오는 빛(입사 광선)과 법선이 이루는 각을 <strong>입사각</strong>, 거울에서 나가는 빛(반사 광선)과 법선이 이루는 각을 <strong>반사각</strong>이라고 합니다.'],
        ['p', '<strong>반사 법칙</strong>: 입사각과 반사각은 언제나 같습니다. 그리고 입사 광선, 반사 광선, 법선은 한 평면 위에 있습니다. 종이처럼 거친 표면에서도 울퉁불퉁한 작은 면 하나하나에서는 이 법칙이 지켜집니다.'],
        ['ul', [
          '두 각은 거울면이 아니라 <strong>법선</strong>에서 잽니다. 거울면에서 재는 실수가 많습니다.',
          '빛을 거울에 수직으로 비추면 입사각이 0도입니다. 반사각도 0도이므로 빛은 온 길로 그대로 되돌아갑니다.',
          '거울을 어떤 각만큼 돌리면 법선도 같이 돌아갑니다. 그래서 반사된 빛은 그 <strong>두 배</strong>만큼 돌아갑니다. 3단계에서 거울을 조금만 들어도 빛 점이 크게 움직인 까닭 가운데 하나입니다. 천장이 멀수록 같은 각도에도 빛 점은 더 멀리 움직입니다.',
        ]],
        ['p', '<strong>종이 위에서 재어 보기.</strong> 손전등 앞을 두꺼운 종이로 가리고 가는 틈만 남기면 가는 빛줄기가 생깁니다. 종이 위에 거울을 종이와 수직이 되게 세우고, 거울 뒷면(은을 입힌 면)을 따라 연필로 선을 긋습니다. 빛줄기가 종이를 스치며 거울에 닿게 비춥니다. 들어온 빛과 나간 빛을 연필로 따라 긋고 법선을 그린 뒤, 각도기로 입사각과 반사각을 재 봅니다. 재어 보면 두 각이 거의 같습니다. 차이는 몇 도 안쪽입니다.'],

        ['h2', '게임 속 장면'],
        ['p', 'A Driven의 빛 퍼즐 PRISM은 1챕터 「반사」에서 거울로 시작합니다. 이 챕터의 판에는 광원, 거울, 결정 세 가지만 있습니다. 광원은 빨강·초록·파랑 가운데 한 색의 빛을 한 방향으로 쏩니다. 결정은 자기 색의 빛을 받으면 켜집니다. 모든 결정을 켜면 판이 풀립니다.'],
        ['p', '거울은 격자 한 칸에 대각선으로 놓여 있습니다. 거울을 탭하면 90도 돌아가서 「/」 모양과 「\\」 모양이 번갈아 바뀝니다. 거울의 자세는 이 둘뿐입니다. 빛은 위·아래·왼쪽·오른쪽으로만 나아가므로 거울에 언제나 45도로 닿고, 언제나 90도 꺾입니다. 어느 쪽으로 꺾일지는 거울이 기운 방향이 정합니다.'],
        ['img', {
          src: '/img/optics/ko-ch1.webp',
          alt: 'PRISM 1챕터 「반사」 원리 카드. 맨 위에 「결정을 전부 켜면 판이 끝납니다. 조각을 탭해 빛을 결정까지 보내세요.」라는 목표가 적혀 있습니다. 왼쪽 「탭 전」 판에서는 왼쪽 광원의 파란 빛이 「\\」 모양 거울에 맞아 아래로 꺾여 위쪽 결정에 닿지 못합니다. 오른쪽 「탭 후」 판에서는 거울이 「/」 모양으로 바뀌어 빛이 위로 꺾이고 파란 결정이 켜집니다. 아래에 반사 설명과 게임 규칙이 적혀 있습니다.',
          w: 680,
          h: 1084,
        }],
        ['p', '중학교 반사 법칙으로 보면, 입사각과 반사각이 모두 45도라서 들어온 빛과 나간 빛 사이가 90도가 됩니다. 또 거울이 90도 돌면 반사된 빛은 그 두 배인 180도 돌아갑니다. 위 카드에서 아래로 가던 빛이 탭 한 번에 위로 가는 것이 그 예입니다.'],
        ['p', '<a href="/play/">브라우저 체험판</a>에서 1챕터의 14판을 설치나 회원가입 없이 바로 풀어 볼 수 있습니다. 수업에서는 탭하기 <em>전에</em> 「빛이 어느 쪽으로 꺾일까?」를 말하게 해 봅니다. 반사된 빛의 방향을 예측하는 연습이 됩니다.'],
      ],
      check: [
        {
          q: '손전등 빛을 거울면에 수직으로 비추면 반사된 빛은 어디로 갈까요?',
          a: '들어온 길을 따라 손전등 쪽으로 그대로 되돌아옵니다. 빛이 법선을 따라 들어오므로 입사각이 0도이고, 반사각도 0도이기 때문입니다.',
        },
        {
          q: '입사각이 30도일 때 반사각은 몇 도일까요? 입사 광선과 반사 광선 사이의 각은 몇 도일까요?',
          a: '반사각은 30도입니다. 두 각은 법선의 양쪽에서 재므로, 두 광선 사이의 각은 30도 + 30도 = 60도입니다.',
        },
        {
          q: 'PRISM에서 오른쪽으로 가던 빛이 「/」 모양 거울을 만나면 어느 쪽으로 갈까요? 거울을 한 번 탭하면요?',
          a: '위로 꺾입니다. 한 번 탭하면 거울이 「\\」 모양이 되어 빛은 아래로 꺾입니다. 어느 쪽이든 빛이 거울에 45도로 닿으므로 90도 꺾입니다.',
        },
      ],
      differs: [
        '실제 거울은 어떤 각도로 들어온 빛이든 입사각과 같은 반사각으로 반사합니다. 거울도 조금씩 돌릴 수 있습니다. 게임에서는 빛이 위·아래·왼쪽·오른쪽으로만 나아가고 거울은 탭 한 번에 90도씩 두 자세만 오가므로, 빛은 언제나 정확히 90도 꺾입니다.',
        '집에 있는 거울은 유리 뒷면에 얇은 금속 막을 입히고 그 위를 칠한 것이라 한쪽 면만 거울입니다. 게임의 거울은 양쪽 면 모두에서 빛을 반사합니다.',
        '실제 거울은 빛을 조금 흡수해서 반사된 빛이 들어간 빛보다 약간 어둡습니다. 게임은 빛의 밝기를 따지지 않고, 거울이 빛의 색을 바꾸지도 않습니다.',
        '실제로는 거의 모든 물체가 빛을 반사하고, 거친 표면은 빛을 여러 방향으로 흩어 반사합니다. 게임에서 빛을 반사하는 조각은 거울과 2챕터의 반투명 거울뿐이고, 결정, 광원, 벽은 닿은 빛을 흡수합니다.',
      ],
    },

    en: {
      title: 'Reflection of light',
      subtitle: 'PRISM chapter 1 “Reflect”',
      desc: 'Reflection of light explained with a hand mirror and flashlight experiment, the law of reflection, and the mirrors in chapter 1 of the PRISM light puzzle.',
      definition: 'Reflection of light happens when light hits a surface, such as a mirror, and bounces back off it in a new direction; on a smooth surface the angle of reflection equals the angle of incidence.',
      level: 'Ages 10 to 14',
      minutes: '10 minutes',
      materials: 'A hand mirror and a flashlight (torch). For the measuring activity: paper, a pencil, a protractor and a piece of card.',
      curriculum: 'Connects to NGSS 4-PS4-2 (light reflecting from objects into the eye lets us see them) and MS-PS4-2 (waves are reflected, absorbed or transmitted), and to England\'s KS2 Light (Year 3: light is reflected from surfaces; Year 6: we see objects because they give out or reflect light into the eye) and KS3 Light waves.',
      body: [
        ['h2', 'A small experiment'],
        ['p', 'All you need is a hand mirror and a flashlight. It works best in a slightly darkened room.'],
        ['ol', [
          'Lay the hand mirror flat on a table. Hold the flashlight at a slant and shine it at the middle of the mirror. Find the <strong>bright spot</strong> on the ceiling or a wall.',
          'Slowly tilt the flashlight more upright, then lower it again. Watch which way the spot moves.',
          'Now keep the flashlight still and lift the edge of the mirror nearest the flashlight a little by sliding an eraser under it. What happens to the spot?',
        ]],
        ['note', '<strong>Safety:</strong> never shine the flashlight, or light bounced off the mirror, into anyone\'s eyes. If you hold the flashlight nearly upright, the reflection comes straight back up towards you, so keep your face away from above the mirror. Do not use a cracked mirror.'],

        ['h2', 'What happened?'],
        ['p', 'Light travels in straight lines. When it hits the mirror it cannot pass through, so it bounces off in a new direction. This is <strong>reflection</strong>. The spot on the ceiling is where the reflected light lands. Cover the mirror with your hand and the spot disappears.'],
        ['p', 'When you tilted the flashlight, the spot moved. If the light going into the mirror changes direction, the light coming out changes direction too. The more upright the flashlight, the closer the spot comes to the point straight above the mirror. The lower the slant, the further the spot moves away, on the side opposite the flashlight.'],
        ['p', 'Lifting the mirror moved the spot as well, even though the flashlight stayed still. Change the way a mirror faces and you change where the reflected light goes. That is exactly what you do when you tap a mirror in the game.'],
        ['p', 'Try shining the light on a sheet of white paper instead of the mirror. No sharp spot appears on the ceiling. Under a microscope, the surface of paper is bumpy, so it scatters the light in many directions. This is also how we see things that make no light of their own, like a book or a face: light bounces off them into our eyes. Because that light is scattered in every direction, you can see the object from anywhere in the room.'],

        ['h2', 'Going further (ages 11 to 14): the law of reflection'],
        ['p', 'At the point where the light hits the mirror, draw a line at right angles to the mirror surface. This line is called the <strong>normal</strong>. The angle between the incoming ray and the normal is the <strong>angle of incidence</strong>. The angle between the reflected ray and the normal is the <strong>angle of reflection</strong>.'],
        ['p', '<strong>The law of reflection:</strong> the angle of incidence always equals the angle of reflection. The incoming ray, the reflected ray and the normal also all lie in the same flat plane. Even on rough paper, each tiny bump still obeys this law; the bumps just face every which way.'],
        ['ul', [
          'Measure both angles from the <strong>normal</strong>, not from the mirror surface. Mixing these up is a very common mistake.',
          'Shine light straight at a mirror, along the normal, and the angle of incidence is 0 degrees. The angle of reflection is 0 degrees too, so the light goes straight back the way it came.',
          'Turn a mirror by some angle and the normal turns with it, so the reflected ray turns by <strong>twice</strong> that angle. That is one reason lifting the mirror just a little moved the spot so far in step 3. The other is distance: the further away the ceiling, the further the spot moves for the same angle.',
        ]],
        ['p', '<strong>Measure it on paper.</strong> Cover the front of the flashlight with card, leaving only a thin slit, to make a narrow beam. Stand the mirror upright, at right angles to the paper, and draw a pencil line along its back (silvered) face. Shine the beam so that it skims across the paper to the mirror. Trace the incoming and reflected beams in pencil, draw the normal, and measure both angles with a protractor. They should match to within a few degrees.'],

        ['h2', 'In the game'],
        ['p', 'PRISM, a light puzzle game by A Driven, begins with mirrors in chapter 1, “Reflect”. The boards in this chapter have only three kinds of piece: light sources, mirrors and crystals. A light source fires a red, green or blue beam in one direction. A crystal lights up when it receives light of its own color. Light every crystal and the board is solved.'],
        ['p', 'Each mirror sits diagonally in one square of the grid. Tap it and it turns 90 degrees, switching between a “/” shape and a “\\” shape. Those are its only two positions. Beams only travel up, down, left or right, so they always meet a mirror at 45 degrees and always turn through a right angle. Which way they turn depends on which way the mirror leans.'],
        ['img', {
          src: '/img/optics/en-ch1.webp',
          alt: 'The PRISM chapter 1 Reflection card. At the top: "Light every crystal to finish a level. Tap a piece to steer the beam." In the “Before tap” board, a blue beam from a light source on the left hits a mirror shaped like “\\” and turns down, missing the crystal above. In the “After tap” board, the mirror has become “/”, the beam turns up and the blue crystal lights. Below are a short explanation of reflection and the game rule.',
          w: 680,
          h: 1084,
        }],
        ['p', 'In terms of the law of reflection, the angle of incidence and the angle of reflection are both 45 degrees, which puts a right angle between the beam going in and the beam coming out. And when the mirror turns 90 degrees, the reflected beam turns twice as far, 180 degrees. On the card above, a beam heading down heads up after a single tap.'],
        ['p', 'You can play all 14 boards of chapter 1 <a href="/play/">in a web browser</a>, with nothing to install and no sign-up. In class, ask students to say which way the beam will turn <em>before</em> they tap. Predicting where reflected light will go is the skill this page is about.'],
      ],
      check: [
        {
          q: 'You shine a flashlight straight at a mirror, at right angles to its surface. Where does the reflected light go?',
          a: 'Straight back towards the flashlight, along the path it came in on. The light arrives along the normal, so the angle of incidence is 0 degrees, and the angle of reflection is 0 degrees too.',
        },
        {
          q: 'A ray hits a mirror with an angle of incidence of 30 degrees. What is the angle of reflection? What is the angle between the incoming ray and the reflected ray?',
          a: 'The angle of reflection is 30 degrees. Both angles are measured from the normal, on opposite sides of it, so the angle between the two rays is 30 + 30 = 60 degrees.',
        },
        {
          q: 'In PRISM, a beam heading right meets a mirror shaped like “/”. Which way does it go? And after one tap?',
          a: 'It turns and heads up. After one tap the mirror becomes “\\” and the beam heads down instead. Either way it turns through 90 degrees, because it meets the mirror at 45 degrees.',
        },
      ],
      differs: [
        'A real mirror reflects light arriving at any angle, always with the angle of reflection equal to the angle of incidence, and you can turn it a little at a time. In the game, beams only travel up, down, left or right, and a tap swaps the mirror between its two positions 90 degrees apart, so light always turns through exactly 90 degrees.',
        'A household mirror is a sheet of glass with a thin metal coating on the back, painted over, so only one side works as a mirror. Mirrors in the game reflect light from both sides.',
        'A real mirror absorbs a little of the light, so the reflected light is slightly dimmer than the light that went in. The game does not track brightness, and a mirror never changes the color of a beam.',
        'In real life almost every surface reflects some light, and rough surfaces scatter it in many directions. In the game, only mirrors and the half-silvered mirrors of chapter 2 reflect light; crystals, light sources and walls absorb whatever reaches them.',
      ],
    },
  },
};
