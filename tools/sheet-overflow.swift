// 학습지 A4 장(.sheet)에서 내용이 넘쳐 잘린 곳을 찾는다. check-worksheets.mjs가 부른다(macOS 전용, WebKit).
//
//   swift tools/sheet-overflow.swift <URL>…
//
// .sheet는 화면과 인쇄 모두 297mm 높이에 overflow:hidden이라(css/sheet.css), 내용이 넘치면 쪽이
// 늘지 않고 조용히 잘린다. 그래서 PDF 쪽 수로는 못 잡고 DOM에서 잰다: 장마다 scrollHeight가
// clientHeight보다 크거나, 자손의 아래 끝이 장의 안쪽 아래 끝(padding 제외)을 넘으면 넘친 것이다.
// 창 폭은 A4(210mm ≈ 794px)보다 넓게 두어 장이 흘러내리지 않는 화면 배치로 잰다.
//
// 출력: URL마다 한 줄 JSON {"url", "sheets", "overflow": [{"sheet", "by", "what"}]}
import AppKit
import WebKit

let urls = CommandLine.arguments.dropFirst().compactMap(URL.init(string:))
if urls.isEmpty { FileHandle.standardError.write("사용법: sheet-overflow.swift <URL>…\n".data(using: .utf8)!); exit(2) }

let probe = """
(() => {
  const out = [];
  const sheets = [...document.querySelectorAll('.sheet')];
  sheets.forEach((s, i) => {
    const cs = getComputedStyle(s);
    const r = s.getBoundingClientRect();
    const inner = r.bottom - parseFloat(cs.paddingBottom) - parseFloat(cs.borderBottomWidth);
    let worst = null, by = s.scrollHeight - s.clientHeight;
    for (const el of s.querySelectorAll('*')) {
      if (!el.getClientRects().length) continue;
      const b = el.getBoundingClientRect().bottom - inner;
      if (b > 1 && (!worst || b > worst.b)) worst = { b, el };
    }
    if (by > 1 || worst) out.push({ sheet: i + 1, by: Math.round(Math.max(by, worst ? worst.b : 0)),
      what: worst ? (worst.el.tagName + '.' + (worst.el.getAttribute('class') || '') + ' ' + (worst.el.textContent || '').trim().slice(0, 40)) : '' });
  });
  return JSON.stringify({ sheets: sheets.length, overflow: out });
})()
"""

final class Runner: NSObject, WKNavigationDelegate {
  var queue: [URL]
  let web = WKWebView(frame: NSRect(x: 0, y: 0, width: 1200, height: 1200))
  init(_ q: [URL]) { queue = q; super.init(); web.navigationDelegate = self }
  func next() {
    guard let u = queue.first else { exit(0) }
    web.load(URLRequest(url: u))
  }
  func webView(_ w: WKWebView, didFinish n: WKNavigation!) {
    // 글꼴이 다 내려온 뒤에 잰다. 시스템 글꼴로 재면 줄바꿈이 달라진다.
    w.evaluateJavaScript("document.fonts.ready.then(() => 1)") { _, _ in
      DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
        w.evaluateJavaScript(probe) { r, e in
          let u = self.queue.removeFirst()
          if let s = r as? String { print("{\"url\":\"\(u.absoluteString)\",\(s.dropFirst())") }
          else { print("{\"url\":\"\(u.absoluteString)\",\"error\":\"\(e?.localizedDescription ?? "?")\"}") }
          self.next()
        }
      }
    }
  }
  func webView(_ w: WKWebView, didFail n: WKNavigation!, withError e: Error) { fail(e) }
  func webView(_ w: WKWebView, didFailProvisionalNavigation n: WKNavigation!, withError e: Error) { fail(e) }
  func fail(_ e: Error) {
    let u = queue.removeFirst()
    print("{\"url\":\"\(u.absoluteString)\",\"error\":\"\(e.localizedDescription)\"}")
    next()
  }
}

let app = NSApplication.shared
let runner = Runner(Array(urls))
let win = NSWindow(contentRect: runner.web.frame, styleMask: [.borderless], backing: .buffered, defer: false)
win.contentView = runner.web
runner.next()
DispatchQueue.main.asyncAfter(deadline: .now() + 120) { print("{\"error\":\"timeout\"}"); exit(3) }
app.run()
