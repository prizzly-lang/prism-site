// 학습지 PDF를 쪽마다 흑백 PNG로 그린다. check-worksheets.mjs가 부른다(macOS 전용, PDFKit).
//
//   swift tools/pdf-gray.swift <PDF> <출력 폴더> [dpi]
//
// 학교 프린터는 대부분 흑백이다. 색으로만 구분되는 곳(빛의 색, 회색 칸)이 흑백에서 뭉개지는지
// 눈으로 보려고 실제 PDF를 회색조로 찍는다. 화면용 CSS 필터가 아니라 인쇄된 결과물을 본다.
import Foundation
import PDFKit
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let a = CommandLine.arguments
guard a.count >= 3, let doc = PDFDocument(url: URL(fileURLWithPath: a[1])) else {
  FileHandle.standardError.write("사용법: pdf-gray.swift <PDF> <출력 폴더> [dpi]\n".data(using: .utf8)!)
  exit(2)
}
let dpi = a.count > 3 ? (Double(a[3]) ?? 100) : 100
let outDir = URL(fileURLWithPath: a[2])
try? FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)
let base = URL(fileURLWithPath: a[1]).deletingPathExtension().lastPathComponent

for i in 0..<doc.pageCount {
  guard let page = doc.page(at: i)?.pageRef else { continue }
  let box = page.getBoxRect(.mediaBox)
  let s = dpi / 72
  let w = Int(box.width * s), h = Int(box.height * s)
  guard let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0,
                            space: CGColorSpaceCreateDeviceGray(), bitmapInfo: CGImageAlphaInfo.none.rawValue) else { exit(1) }
  ctx.setFillColor(gray: 1, alpha: 1)
  ctx.fill(CGRect(x: 0, y: 0, width: w, height: h))
  ctx.scaleBy(x: s, y: s)
  ctx.drawPDFPage(page)
  guard let img = ctx.makeImage() else { exit(1) }
  let url = outDir.appendingPathComponent("\(base)-p\(i + 1).png")
  guard let dest = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(1) }
  CGImageDestinationAddImage(dest, img, nil)
  CGImageDestinationFinalize(dest)
  print(url.path)
}
