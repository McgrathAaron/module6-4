import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/prismic"
import { formatDate } from "@/lib/utils"
import { PrismicContent } from "@/components/prismic-content"

export async function generateMetadata({ params }) {
  const client = createClient()

  try {
    const article = await client.getByUID("article", params.uid)

    return {
      title: article.data.title || "Article",
      description: article.data.summary?.[0]?.text || "",
    }
  } catch (error) {
    return {
      title: "Article Not Found",
    }
  }
}

export default async function ArticlePage({ params }) {
  const client = createClient()

  try {
    const article = await client.getByUID("article", params.uid)

    // Try to get related articles
    const relatedArticles = await client
      .getAllByType("article", {
        predicates: [["document.id", "not", article.id]],
        limit: 3,
      })
      .catch(() => [])

    return (
      <article className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="text-sm text-gray-600 mb-2">{formatDate(article.first_publication_date)}</div>
            <h1 className="text-4xl font-bold mb-4">{article.data.title || "Untitled Article"}</h1>
            <p className="text-xl text-gray-600">{article.data.summary?.[0]?.text || "No summary available"}</p>
          </div>

          {article.data.featured_image?.url && (
            <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
              <Image
                src={article.data.featured_image.url || "/placeholder.svg"}
                alt={article.data.title || ""}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <PrismicContent field={article.data.content} />

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
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
          </div>
        )}
      </article>
    )
  } catch (error) {
    notFound()
  }
}
