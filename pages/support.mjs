/**
 * 지원 · 문의. 그리는 쪽은 `pages/doc-page.mjs`. 스토어에 등록된 주소가 `/support.html`이다.
 *
 * 1.6 기준(iOS 무료+앱 안 결제, Android 유료). 판매 방식이 바뀌면 `privacy.mjs`와 같이 고친다.
 * 블록: ['h2', 글] ['h3', 글] ['p', HTML] ['ul', [HTML…]].
 */

export default {
  slug: 'support',
  updated: '2026-11-26',
  text: {
    ko: {
      title: '지원 · 문의',
      desc: 'PRISM 문의와 자주 묻는 질문.',
      summary: '무엇이든 <a href="mailto:prism@adriven.co">prism@adriven.co</a>로 보내 주세요. 영업일 기준 2일 안에 답장합니다.',
      body: [
        ['h2', '자주 묻는 질문'],
        ['h3', '퍼즐이 안 풀립니다. 혹시 못 푸는 레벨인가요?'],
        ['p', '아닙니다. 300개 레벨 전부가 <strong>정답이 정확히 하나 존재함을 기계로 증명한 뒤에</strong> 수록되었습니다. 화면에 표시되는 최소 탭 수도 추정값이 아니라 전수 탐색으로 구한 실제 최솟값입니다. 다만 막혔을 때 그 레벨에 갇히지 않도록, 열려 있는 판은 순서대로 깨지 않아도 됩니다. 레벨 목록에서 다음 퍼즐로 바로 넘어가셔도 됩니다.'],
        ['h3', '결정에 빛이 닿는데도 켜지지 않습니다.'],
        ['p', '결정은 <strong>요구된 색과 정확히 일치</strong>해야 켜집니다. 빨강을 원하는 결정에 빨강과 초록이 함께 도달하면 노랑이 되어 실패입니다. 필요 없는 빛이 섞여 들어오고 있는지 경로를 확인해 보세요. 버그가 아니라 규칙입니다.'],
        ['h3', '색을 구분하기 어렵습니다.'],
        ['p', '모든 결정에 요구하는 색이 도형으로도 새겨져 있습니다. <strong>빨강은 삼각형, 초록은 사각형, 파랑은 원</strong>입니다. 노랑처럼 섞인 색은 삼각형과 사각형이 나란히 놓입니다. 색을 전혀 보지 못해도 300개 퍼즐 전부를 풀 수 있습니다. 더 개선할 부분이 있다면 알려 주세요. 접근성 관련 제안은 최우선으로 반영합니다.'],
        ['h3', '진행 상황이 사라졌습니다.'],
        ['p', '진행 상황은 기기 안에만 저장되며 서버에 백업되지 않습니다(회원가입이 없고, 결제할 때 말고는 네트워크를 쓰지 않기 때문입니다). 앱을 삭제하면 기록도 함께 지워집니다. 기기를 바꿀 때는 iCloud 기기 백업(iPhone·iPad)이나 Android 기기 백업으로 함께 옮겨질 수 있습니다.'],
        ['h3', '이미 샀는데 잠겨 있습니다. (iPhone·iPad)'],
        ['p', '유료로 팔리던 1.5까지 받으신 분은 아무것도 하지 않으셔도 자동으로 열립니다. 다른 기기에서 결제하셨다면 설정의 「구매 복원」을 눌러 주세요. 그래도 잠겨 있으면 구매 영수증과 함께 <a href="mailto:prism@adriven.co">prism@adriven.co</a>로 알려 주세요. Android판은 받을 때 결제하므로 처음부터 300판이 전부 열려 있습니다.'],
        ['h3', '광고나 구독이 생기나요?'],
        ['p', '아니요. 광고와 구독은 넣지 않습니다. 한 번 결제가 거래의 전부입니다(iOS는 1챕터 뒤를 여는 앱 안 결제, Android는 받을 때 결제).'],
        ['h3', '환불하고 싶습니다.'],
        ['p', 'App Store 구매의 환불은 Apple이 처리합니다. <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a>에서 신청하실 수 있습니다. Google Play 구매의 환불은 Google Play 환불 정책을 따릅니다. <a href="https://support.google.com/googleplay/answer/2479637" rel="noopener">Google Play 고객센터의 환불 안내</a>를 보시고, 도움이 필요하면 <a href="mailto:prism@adriven.co">prism@adriven.co</a>로 알려 주세요.'],
      ],
    },

    en: {
      title: 'Support',
      desc: 'Contact PRISM and answers to common questions.',
      summary: 'Email <a href="mailto:prism@adriven.co">prism@adriven.co</a> about anything. We reply within two business days.',
      body: [
        ['h2', 'Common questions'],
        ['h3', 'I cannot solve a puzzle. Is the level impossible?'],
        ['p', 'No. Every one of the 300 levels was <strong>machine-proven to have exactly one solution</strong> before it shipped. The minimum tap count shown is not an estimate but the true minimum found by exhaustive search. So that you never get stuck on one level, open levels do not have to be cleared in order: you can go straight to the next puzzle from the level list.'],
        ['h3', 'Light reaches a crystal but it does not turn on.'],
        ['p', 'A crystal lights only for an <strong>exact</strong> colour match. If a crystal that wants red receives red and green together, that makes yellow and it fails. Check whether stray light is mixing in. This is the rule, not a bug.'],
        ['h3', 'Colours are hard for me to tell apart.'],
        ['p', 'Every crystal also shows its required colour as a shape: <strong>red is a triangle, green a square, blue a circle</strong>. A mixed colour such as yellow shows a triangle and a square side by side. All 300 puzzles can be finished without seeing colour at all. If something could be better, please tell us; accessibility suggestions come first.'],
        ['h3', 'My progress is gone.'],
        ['p', 'Progress is stored only on your device and is not backed up to any server (there is no sign-up, and the app goes online only to make a purchase). Deleting the app deletes your progress. When you change devices, it may move across with an iCloud device backup (iPhone and iPad) or an Android device backup.'],
        ['h3', 'I already bought it, but levels are locked. (iPhone and iPad)'],
        ['p', 'If you got PRISM while it was a paid app (through version 1.5), it unlocks by itself. If you paid on another device, tap Restore Purchase in Settings. If it is still locked, email your receipt to <a href="mailto:prism@adriven.co">prism@adriven.co</a>. On Android you pay when you get the app, so all 300 levels are open from the start.'],
        ['h3', 'Will there be ads or a subscription?'],
        ['p', 'No. There will be no ads and no subscription. One payment is the whole deal (on iOS an in-app purchase that opens everything after chapter 1, on Android the price of the app).'],
        ['h3', 'I would like a refund.'],
        ['p', 'Refunds for App Store purchases are handled by Apple at <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a>. Refunds for Google Play purchases follow Google Play\'s refund policy; see <a href="https://support.google.com/googleplay/answer/2479637" rel="noopener">Google Play Help on refunds</a>, and email <a href="mailto:prism@adriven.co">prism@adriven.co</a> if you need help.'],
      ],
    },

    ja: {
      title: 'サポート・お問い合わせ',
      desc: 'PRISMへのお問い合わせと、よくある質問。',
      summary: 'どんなことでも<a href="mailto:prism@adriven.co">prism@adriven.co</a>までお送りください。2営業日以内にお返事します。',
      body: [
        ['h2', 'よくある質問'],
        ['h3', 'パズルが解けません。解けないレベルなのでしょうか？'],
        ['p', 'いいえ。300のレベルはすべて、<strong>正解がちょうど一つだけ存在することを機械で証明してから</strong>収録しています。画面に表示される最小タップ数も推定値ではなく、全探索で求めた実際の最小値です。ただし、行き詰まってもそのレベルから先に進めなくならないよう、開いているレベルは順番どおりにクリアしなくてもかまいません。レベル一覧から次のパズルへそのまま進んでいただけます。'],
        ['h3', '光が結晶に当たっているのに灯りません。'],
        ['p', '結晶は<strong>求められた色とぴったり一致</strong>したときだけ灯ります。赤を求める結晶に赤と緑が一緒に届くと黄色になり、失敗です。不要な光が混ざっていないか、光の通り道を確かめてみてください。バグではなく、ルールです。'],
        ['h3', '色の区別がしにくいです。'],
        ['p', 'すべての結晶には、求める色が図形でも刻まれています。<strong>赤は三角形、緑は四角形、青は円</strong>です。黄色のような混ざった色は、三角形と四角形が並んで表示されます。色がまったく見えなくても、300のパズルすべてを解くことができます。さらに改善できる点があればお知らせください。アクセシビリティに関するご提案は最優先で反映します。'],
        ['h3', '進行状況が消えてしまいました。'],
        ['p', '進行状況は端末の中だけに保存され、サーバーにはバックアップされません（会員登録がなく、購入するとき以外は通信しないためです）。アプリを削除すると記録も一緒に消えます。端末を買い替えるときは、iCloudの端末バックアップ（iPhone・iPad）やAndroid端末のバックアップで一緒に移せる場合があります。'],
        ['h3', '購入したのにロックされています。（iPhone・iPad）'],
        ['p', '有料で販売されていたバージョン1.5までに入手された方は、何もしなくても自動的に開きます。別の端末で購入された場合は、「設定」の「購入を復元」をタップしてください。それでもロックされている場合は、購入のレシートを添えて<a href="mailto:prism@adriven.co">prism@adriven.co</a>までお知らせください。Android版は入手するときに購入するため、最初から300のレベルがすべて開いています。'],
        ['h3', '広告やサブスクリプションは追加されますか？'],
        ['p', 'いいえ。広告とサブスクリプションは入れません。一度のお支払いがすべてです（iOSはチャプター2以降を開くアプリ内課金、Androidは入手するときのお支払い）。'],
        ['h3', '返金を希望します。'],
        ['p', 'App Storeでの購入の返金はAppleが行います。<a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a>から申請できます。Google Playでの購入の返金は、Google Playの返金ポリシーに従います。<a href="https://support.google.com/googleplay/answer/2479637" rel="noopener">Google Play ヘルプの払い戻しについて</a>をご覧いただき、お手伝いが必要な場合は<a href="mailto:prism@adriven.co">prism@adriven.co</a>までお知らせください。'],
      ],
    },

    'zh-Hans': {
      title: '支持与联系',
      desc: 'PRISM 联系方式与常见问题。',
      summary: '有任何问题，请发送邮件至 <a href="mailto:prism@adriven.co">prism@adriven.co</a>。我们会在 2 个工作日内回复。',
      body: [
        ['h2', '常见问题'],
        ['h3', '谜题解不开。这一关是不是无解？'],
        ['p', '不是。全部 300 个关卡都是<strong>经过机器证明恰好只有一个解之后</strong>才收录的。画面上显示的最少点击次数也不是估算值，而是通过穷举搜索得出的真实最小值。另外，为了避免您卡在某一关，已开放的关卡不必按顺序通关，您可以直接从关卡列表进入下一个谜题。'],
        ['h3', '光照到了结晶，结晶却没有点亮。'],
        ['p', '只有与<strong>要求的颜色完全一致</strong>时，结晶才会点亮。如果要求红色的结晶同时收到红光和绿光，就会变成黄色，因而失败。请检查光路，看看是否混入了多余的光。这不是程序错误，而是规则。'],
        ['h3', '我很难分辨颜色。'],
        ['p', '每个结晶要求的颜色也会以图形标示：<strong>红色是三角形，绿色是正方形，蓝色是圆形</strong>。黄色这类混合色会并排显示三角形和正方形。即使完全看不到颜色，也能解开全部 300 个谜题。如果还有可以改进的地方，请告诉我们。无障碍方面的建议我们会优先采纳。'],
        ['h3', '我的进度不见了。'],
        ['p', '进度只保存在设备上，不会备份到服务器（因为无需注册，而且除购买外不联网）。删除应用后，记录也会一并删除。更换设备时，进度可能会通过 iCloud 设备备份（iPhone、iPad）或 Android 设备备份一起迁移。'],
        ['h3', '已经购买了，但关卡仍被锁定。（iPhone、iPad）'],
        ['p', '在付费销售期间（1.5 及之前的版本）下载的用户，无需任何操作即可自动解锁。如果是在其他设备上购买的，请点击“设置”中的“恢复购买”。如果仍然锁定，请将购买收据发送至 <a href="mailto:prism@adriven.co">prism@adriven.co</a>。Android 版在下载时付款，因此 300 个关卡从一开始就全部开放。'],
        ['h3', '会加入广告或订阅吗？'],
        ['p', '不会。我们不会加入广告和订阅。一次付款就是全部（iOS 为解锁第 2 章起所有内容的 App 内购买，Android 为下载时付款）。'],
        ['h3', '我想申请退款。'],
        ['p', 'App Store 购买的退款由 Apple 处理，您可以在 <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a> 申请。Google Play 购买的退款遵循 Google Play 的退款政策。请参阅<a href="https://support.google.com/googleplay/answer/2479637" rel="noopener">Google Play 帮助中心的退款说明</a>，如需帮助，请发送邮件至 <a href="mailto:prism@adriven.co">prism@adriven.co</a>。'],
      ],
    },
  },
};
