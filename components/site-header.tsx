import Link from "next/link"
import { Leaf } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl">EcoBytes</span>
        </Link>
        <nav className="ml-auto flex gap-6 font-medium">
          <Link href="/" className="transition hover:text-green-600">
            Home
          </Link>
          <Link href="/articles" className="transition hover:text-green-600">
            Articles
          </Link>
          <Link href="/about" className="transition hover:text-green-600">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
