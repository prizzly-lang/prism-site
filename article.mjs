/**
 * 기술 글 한 편.
 *
 * 왜 랜딩 페이지가 아니라 별도 글인가: 답변 엔진이 인용하는 것은 제품 소개가
 * 아니라 **설명**이다. 그리고 긱뉴스·Hacker News·개발자 커뮤니티는 앱 링크를
 * 싫어하고 글을 좋아한다. 거기에 올릴 물건이 여기 있어야 한다
 * (`prism/docs/MARKETING-ROADMAP.md` 2단계).
 *
 * 한국어와 영어만 쓴다. 랜딩 페이지는 앱이 지원하는 네 언어를 따라가지만,
 * 이 글의 독자는 개발자 커뮤니티고 그 커뮤니티는 두 언어에 있다. 일본어·중국어
 * 커뮤니티에 올릴 계획이 생기면 그때 번역한다. 미리 하지 않는다.
 *
 * 본문에 적힌 사실은 전부 코드에서 확인한 것이다. 근거 파일을 각 절에 적어뒀다.
 * 숫자가 바뀌면 `prism` 저장소의 `tools/level-stats.ts`를 다시 돌려 고친다.
 */

/** 글이 사는 경로. 언어별 규칙은 랜딩 페이지와 같다(한국어는 루트). */
export const ARTICLE_SLUG = 'proven-unique';

/** 최초 게시일. JSON-LD의 `datePublished`가 이 값을 쓴다. */
export const ARTICLE_DATE = '2026-09-22';

/** 이 글을 쓴 근거가 되는 소스. 내용을 고칠 때 같이 열어볼 파일들이다. */
export const SOURCES = [
  'prism/tools/generate-levels.ts',
  'prism/src/engine/solver.ts',
  'prism/tests/levels.test.ts',
];

export const ARTICLE = {
  ko: {
    title: '240판을 손으로 만들지 않았습니다',
    desc: 'PRISM의 레벨은 정답에서 거꾸로 생성됩니다. 판마다 정답이 정확히 하나뿐임을 전수 탐색으로 증명한 뒤에만 출하하고, 표시되는 최소 탭 수도 너비 우선 탐색으로 구한 실제 최솟값입니다.',
    lead: '퍼즐 게임을 만들 때 가장 비싼 일은 판을 짜는 게 아니라 <strong>그 판이 정말 풀리는지 확인하는 일</strong>입니다. 240판이면 사람이 할 수 있는 규모가 아닙니다. 그래서 순서를 뒤집었습니다.',
    backHome: '← PRISM 소개로',
    dateLabel: '2026년 9월 22일',
    body: [
      ['h2', '문제: 손으로 만들면 검증할 수 없다'],
      [
        'p',
        'PRISM의 규칙은 하나입니다. 조각을 탭하면 90도 돌고, 빛이 그 즉시 새 길을 찾습니다. 모든 결정에 정확히 요구된 색을 동시에 비추면 그 판이 풀립니다.',
      ],
      [
        'p',
        '규칙이 단순하다고 판을 짜기 쉬운 건 아닙니다. 조각을 늘어놓고 "이게 풀리긴 하나"를 사람이 확인하려면 결국 직접 풀어봐야 하고, 못 풀었을 때 그게 <em>어려운 판</em>인지 <em>불가능한 판</em>인지 구별할 방법이 없습니다. 240판을 그렇게 만들 수는 없습니다.',
      ],

      ['h2', '뒤집기: 정답에서 출발한다'],
      [
        'p',
        '회전 퍼즐 생성기의 표준 접근을 썼습니다. 판을 만들고 정답을 찾는 대신, <strong>정답을 먼저 만들고 흐트러뜨립니다.</strong>',
      ],
      [
        'ol',
        [
          '광원과 조각을 배치하고 빛을 흘려봅니다.',
          '빛이 <strong>실제로 도달한 자리</strong>에 그 색의 결정을 놓습니다. 이 순간 정답 상태가 구성적으로 완성됩니다.',
          '목표 탭 수만큼 거꾸로 회전시켜 흐트러뜨립니다.',
        ],
      ],
      [
        'p',
        '이렇게 하면 <strong>풀 수 없는 레벨이 존재할 수 없습니다.</strong> 정답에서 출발했기 때문입니다. 흐트러뜨린 회전을 되돌리는 것이 곧 정답입니다.',
      ],

      ['h2', '"풀린다"로는 부족합니다'],
      [
        'p',
        '여기서 멈추면 나쁜 퍼즐이 잔뜩 나옵니다. 풀리기는 하는데 <strong>정답이 여러 개</strong>인 판이 섞이기 때문입니다. 정답이 둘이면 논리로 좁혀지지 않고, 아무렇게나 돌리다 맞는 일이 생깁니다.',
      ],
      [
        'p',
        '그래서 후보마다 전수 조사를 합니다. 회전 가능한 조각들의 <strong>모든 조합</strong>을 만들어 보고, 클리어 상태가 몇 개인지 셉니다. 정확히 1이 아니면 그 후보는 버립니다.',
      ],
      [
        'pre',
        `let total = 1;
for (let i = 0; i < n; i++) {
  total *= radix[i];          // 조각별 회전 상태 수를 곱한다
  if (total > maxStates) return null;
}
for (let state = 0; state < total; state++) {
  // state를 각 조각의 회전값으로 풀어 넣고
  if (tracer.isSolved(scratch)) count++;
}`,
      ],
      [
        'p',
        '상태 공간이 20만을 넘으면 세는 것을 포기하고, <strong>그 후보도 버립니다.</strong> "아마 유일할 것"으로 통과시키지 않습니다. 증명하지 못한 판은 출하하지 않습니다.',
      ],
      [
        'p',
        '이 검사에는 예상하지 못한 부수 효과가 하나 있었습니다. <strong>놀고 있는 조각이 자동으로 걸러집니다.</strong> 빛이 닿지 않는 조각은 어떻게 돌려도 결과가 같습니다. 그러면 클리어 상태가 그 조각의 회전 수만큼 배로 잡히고, 해가 2개 이상이 되어 탈락합니다. 화면에 있는 모든 회전 조각은 반드시 쓰입니다.',
      ],

      ['h2', '최소 탭 수는 추정이 아닙니다'],
      [
        'p',
        '각 레벨에는 최소 탭 수가 표시됩니다. 그 수 안에 풀면 「완벽」입니다. 이 값은 대략 잡은 목표치가 아니라 <strong>실제 최솟값</strong>입니다.',
      ],
      [
        'p',
        '정답이 유일하다는 것이 여기서 다시 일합니다. 정답이 하나뿐이면 "각 조각을 정답까지 몇 번 더 돌려야 하는가"의 합이 곧 최소 탭 수입니다. 그래서 생성기는 최소 탭 수를 <em>추정</em>하지 않고 <strong>지정</strong>할 수 있습니다. 목표치를 정하고 그만큼만 거꾸로 돌리면 됩니다.',
      ],
      [
        'p',
        '그리고 그 지정이 맞았는지를 <strong>독립적으로 다시 확인합니다.</strong> 흐트러진 판을 너비 우선 탐색으로 처음부터 풀어보고, 나온 최단 길이가 지정한 값과 다르면 그 후보를 버립니다. 생성기에 버그가 있으면 여기서 잡힙니다.',
      ],

      ['h2', '대부분은 버려집니다'],
      [
        'p',
        '증명을 통과해도 재미없으면 소용이 없습니다. 그래서 품질 게이트가 더 붙습니다. 너무 쉬운 판, 이미 풀려 있는 판, 결정이 모자란 판, 빛이 한 번도 꺾이지 않는 판, 그 챕터가 가르치려는 현상(분산, 혼합색)이 실제로 안 일어나는 판을 전부 떨어뜨립니다.',
      ],
      [
        'p',
        '통과율은 낮습니다. 조각이 많아지는 후반 챕터에서는 빛이 지나갈 빈 칸이 귀해지고 결정 배치가 시도 대부분을 잡아먹습니다. <strong>6챕터 45판을 채우는 데 백만 회 규모의 시도가 듭니다.</strong> 릴리스 준비 때 한 번 돌리는 스크립트라 시간보다 결과가 중요합니다.',
      ],
      [
        'p',
        '어느 게이트가 후보를 얼마나 떨어뜨렸는지는 집계해서 출력합니다. 챕터 설정을 조율할 근거가 그것밖에 없기 때문입니다.',
      ],

      ['h2', '출하물에서 다시 증명합니다'],
      [
        'p',
        '생성기가 옳게 돌았다는 것과 <strong>실제로 나간 파일이 옳다는 것</strong>은 다른 사실입니다. 그래서 같은 검사를 최종 레벨 데이터에 대고 다시 합니다. 매 커밋마다 240판 전부에 대해 세 가지를 확인합니다. 풀리는가, 솔버가 낸 경로대로 탭하면 진짜로 클리어되는가, 그리고 해가 정확히 하나인가.',
      ],
      [
        'p',
        '이 테스트가 없어서 한 번 사고가 났습니다. 빛줄기를 흡수 조각 앞에서 조금 일찍 끊는 <em>렌더링</em> 개선이 빛 세그먼트의 끝점을 정수가 아닌 값으로 만들었는데, 생성기의 게이트가 끝점의 정수 여부로 "빛이 여기 닿았는가"를 판정하고 있었습니다. 그 순간부터 벽이 있는 레벨은 전부 탈락하게 됐습니다. 그런데도 테스트는 전부 초록이었습니다. <strong>이미 커밋된 결과물만 검증하고 생성 규칙은 검증하지 않았기 때문입니다.</strong>',
      ],
      [
        'p',
        '지금은 도달 판정을 끝점 좌표가 아니라 <strong>위치와 진행 방향</strong>으로 합니다. 렌더링이 빛줄기를 얼마나 짧게 끊든 결과가 달라지지 않습니다.',
      ],

      ['h2', '결과'],
      [
        'p',
        '6개 챕터에 240판입니다. 평균 최소 탭 수가 챕터마다 단조 증가합니다.',
      ],
      [
        'table',
        [
          ['챕터', '판 수', '최소 탭 수', '평균'],
          ['I 반사', '14', '1–4', '2.6'],
          ['II 분열', '32', '1–6', '3.7'],
          ['III 분산', '44', '1–8', '5.1'],
          ['IV 혼합', '52', '1–8', '5.7'],
          ['V 정제', '53', '1–11', '7.2'],
          ['VI 수렴', '45', '2–11', '8.3'],
        ],
      ],
      [
        'p',
        '플레이어에게 이 이야기가 의미하는 것은 하나입니다. <strong>막히면 반드시 이유가 있습니다.</strong> 운으로 풀리는 판이 없고, 표시된 탭 수는 실제로 도달 가능한 값입니다. 못 푸는 판이 있다면 그건 버그가 아니라 아직 안 보인 논리입니다.',
      ],
    ],
  },

  en: {
    title: 'I did not hand-build 240 puzzle levels',
    desc: "PRISM's levels are generated backwards from their solved state. A board ships only after brute force proves it has exactly one solution, and the par shown is the true minimum from breadth-first search.",
    lead: 'The expensive part of making a puzzle game is not laying out the board. It is <strong>proving the board can be solved at all</strong>. At 240 levels that is not something a person can do. So I reversed the order.',
    backHome: '← Back to PRISM',
    dateLabel: '22 September 2026',
    body: [
      ['h2', 'The problem: a hand-built board cannot be checked'],
      [
        'p',
        'PRISM has one rule. Tap a piece and it rotates 90°, and the light instantly finds a new path. Light every crystal with exactly the color it asks for, all at once, and the board is solved.',
      ],
      [
        'p',
        'A simple rule does not make boards easy to author. To check a hand-placed board you have to solve it yourself, and when you fail there is no way to tell a <em>hard</em> board from an <em>impossible</em> one. You cannot build 240 levels that way.',
      ],

      ['h2', 'Reversing it: start from the answer'],
      [
        'p',
        'This is the standard approach for rotation puzzle generators. Instead of building a board and searching for its solution, <strong>build the solution and then break it.</strong>',
      ],
      [
        'ol',
        [
          'Place emitters and pieces, then trace the light.',
          'Put a crystal of the matching color <strong>wherever the light actually lands</strong>. The solved state is now complete by construction.',
          'Rotate pieces backwards by the target number of taps to scramble it.',
        ],
      ],
      [
        'p',
        'With this order an <strong>unsolvable level cannot exist</strong>, because the board started from a solution. Undoing the scramble is the solution.',
      ],

      ['h2', '"Solvable" is not good enough'],
      [
        'p',
        'Stopping there produces a lot of bad puzzles, because some boards have <strong>more than one</strong> solution. When two arrangements both work, the board cannot be narrowed down by logic and players stumble into the answer by spinning pieces.',
      ],
      [
        'p',
        'So every candidate is brute-forced. The generator enumerates <strong>every combination</strong> of the rotatable pieces and counts how many of them are solved states. Anything other than exactly one is thrown away.',
      ],
      [
        'pre',
        `let total = 1;
for (let i = 0; i < n; i++) {
  total *= radix[i];          // multiply each piece's rotation count
  if (total > maxStates) return null;
}
for (let state = 0; state < total; state++) {
  // unpack state into per-piece rotations, then
  if (tracer.isSolved(scratch)) count++;
}`,
      ],
      [
        'p',
        'If the state space exceeds 200,000 the count is abandoned and <strong>the candidate is discarded too</strong>. Nothing ships on "it is probably unique". A board that could not be proven does not go in.',
      ],
      [
        'p',
        'The check turned out to have a second effect I did not plan for. It <strong>eliminates dead pieces automatically.</strong> A piece the light never reaches gives the same result at every rotation, which multiplies the number of solved states by that piece\'s rotation count, pushes the total above one, and fails the board. Every rotatable piece on screen is load-bearing.',
      ],

      ['h2', 'Par is not an estimate'],
      [
        'p',
        'Each level displays a minimum tap count. Solve within it and you earn Perfect. That number is not a designer\'s guess, it is the <strong>true minimum</strong>.',
      ],
      [
        'p',
        'Uniqueness does the work again here. When exactly one solution exists, the minimum tap count is simply the sum of how many more turns each piece needs to reach it. That means the generator does not have to <em>estimate</em> par, it can <strong>choose</strong> it: pick a target and rotate backwards by exactly that much.',
      ],
      [
        'p',
        'Then it <strong>verifies the choice independently.</strong> The scrambled board is solved from scratch with breadth-first search, and if the shortest path found does not match the intended par, the candidate is dropped. Generator bugs surface right here.',
      ],

      ['h2', 'Most candidates are thrown away'],
      [
        'p',
        'Passing the proof is not enough to be worth playing, so more gates follow. Boards that are too easy, boards that arrive already solved, boards with too few crystals, boards where the light never bends, and boards where the phenomenon the chapter is meant to teach (dispersion, color mixing) never actually happens are all rejected.',
      ],
      [
        'p',
        'The pass rate is low. In later chapters there are more pieces, empty cells for the light to travel through get scarce, and crystal placement eats most attempts. <strong>Filling the 45 levels of chapter VI takes on the order of a million tries.</strong> This script runs once while preparing a release, so the result matters more than the runtime.',
      ],
      [
        'p',
        'The generator tallies which gate rejected how many candidates and prints it, because that tally is the only evidence available for tuning a chapter\'s settings.',
      ],

      ['h2', 'Proving it again on the shipped data'],
      [
        'p',
        '"The generator ran correctly" and <strong>"the file that shipped is correct"</strong> are two different facts. So the same checks run against the final level data on every commit, across all 240 levels: is it solvable, does tapping the solver\'s path actually clear the board, and is there exactly one solution.',
      ],
      [
        'p',
        'Not having that test cost me once. A <em>rendering</em> change that stops beams slightly short of absorbing pieces made beam segment endpoints non-integral, and the generator gate was deciding "did the light reach here" by testing whether the endpoint was an integer. From that moment every level containing a wall was rejected. The tests stayed green the whole time, <strong>because they validated the committed output and never the generation rules.</strong>',
      ],
      [
        'p',
        'Reachability is now decided by <strong>position and travel direction</strong> instead of endpoint coordinates, so it no longer matters how short the renderer draws a beam.',
      ],

      ['h2', 'The result'],
      ['p', '240 levels across six chapters, with average par rising monotonically.'],
      [
        'table',
        [
          ['Chapter', 'Levels', 'Par', 'Average'],
          ['I Reflection', '14', '1–4', '2.6'],
          ['II Splitting', '32', '1–6', '3.7'],
          ['III Dispersion', '44', '1–8', '5.1'],
          ['IV Mixing', '52', '1–8', '5.7'],
          ['V Filtering', '53', '1–11', '7.2'],
          ['VI Convergence', '45', '2–11', '8.3'],
        ],
      ],
      [
        'p',
        'For a player all of this reduces to one promise. <strong>If you are stuck, there is a reason.</strong> No board yields to luck, and the tap count on screen is genuinely reachable. A level you cannot solve is not a bug, it is logic you have not seen yet.',
      ],
    ],
  },
};
