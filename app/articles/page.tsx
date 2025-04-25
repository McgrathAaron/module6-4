import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/prismic"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Articles | EcoBytes",
  description: "Browse all articles about sustainable technology and eco-friendly digital solutions.",
}

export default async function ArticlesPage() {
  const client = createClient()

  const articles = await client
    .getAllByType("article", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
    })
    .catch(() => [])

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>
      <p className="text-xl text-gray-600 mb-12 max-w-3xl">
        Explore our collection of articles on sustainable technology, eco-friendly digital solutions, and green
        innovation.
      </p>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="border rounded-lg overflow-hidden group">
              <Link href={`/articles/${article.uid}`}>
                <div className="aspect-video relative">
                  {article.data.featured_image?.url ? (
                    <Image
                      src={article.data.featured_image.url || "/placeholder.svg"}
                      alt={article.data.title || ""}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-600 mb-2">{formatDate(article.first_publication_date)}</div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-green-600 transition-colors">
                    {article.data.title || "Untitled Article"}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {article.data.summary?.[0]?.text || "No summary available"}
                  </p>
                  <p className="mt-4 text-sm text-green-600 font-medium group-hover:underline">Read more</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No articles found. Create some in your Prismic repository.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      )}
    </div>
  )
}
