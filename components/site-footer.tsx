import Link from "next/link"
import { Leaf } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="font-bold text-xl">EcoBytes</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Exploring sustainable technology and eco-friendly digital solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm transition hover:text-green-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-sm transition hover:text-green-600">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm transition hover:text-green-600">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-sm text-gray-600">
              Follow us on social media for the latest updates on sustainable tech.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-green-600">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                LinkedIn
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} EcoBytes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
