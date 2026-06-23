export default function NotFound() {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">页面未找到 / Page Not Found</p>
          <a href="/" className="text-orange-500 hover:text-orange-600 font-medium">← 返回首页 / Back to Home</a>
        </div>
      </body>
    </html>
  )
}
