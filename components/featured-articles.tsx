import { ArticleCard } from "@/components/article-card"

export function FeaturedArticles({ articles }) {
  if (!articles.length) return null

  const [featured, ...rest] = articles

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ArticleCard article={featured} featured />
        {rest.slice(0, 2).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
