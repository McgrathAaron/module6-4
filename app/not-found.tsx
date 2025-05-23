import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
