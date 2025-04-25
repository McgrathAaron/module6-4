import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/prismic"

export const metadata = {
  title: "EcoBytes - Sustainable Technology Blog",
  description: "Exploring sustainable technology and eco-friendly digital solutions.",
}

export default async function HomePage() {
  const client = createClient()

  // Get all documents to see what's available
  const allDocuments = await client.dangerouslyGetAll().catch((error) => {
    console.error("Prismic error:", error)
    return []
  })

  // Extract available types
  const availableTypes = [...new Set(allDocuments.map((doc) => doc.type))]

  // Try to get articles if they exist
  const articles = allDocuments.filter((doc) => doc.type === "article")

  return (
    <div className="container py-12">
      {/* Connection Status */}
      <div className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Prismic Connection Status</h2>
        {allDocuments.length > 0 ? (
          <div>
            <p className="text-green-600 font-medium mb-2">✅ Successfully connected to Prismic!</p>
            <p>
              Found {allDocuments.length} documents of types: {availableTypes.join(", ")}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-amber-600 font-medium mb-2">⚠️ No documents found in Prismic.</p>
            <p>You need to create content in your Prismic repository.</p>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">EcoBytes Blog</h1>
            <p className="text-xl text-gray-600 mb-8">
              Exploring sustainable technology and eco-friendly digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Browse Articles
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-auto md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000"
              alt="Sustainable Technology"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Articles Section */}
      {articles.length > 0 && (
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => (
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
        </section>
      )}

      {/* Next Steps */}
      <section className="py-12 bg-gray-50 rounded-lg my-12">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Next Steps</h2>
          <p className="text-gray-600 mb-8">Follow these steps to complete your EcoBytes blog setup:</p>
          <ol className="text-left list-decimal pl-8 space-y-4">
            <li>Create custom types in Prismic (Article, Homepage, About)</li>
            <li>Add content to your Prismic repository</li>
            <li>Customize the components and pages to match your design</li>
            <li>Deploy your blog to Vercel or another hosting platform</li>
          </ol>
        </div>
      </section>
    </div>
  )
}
