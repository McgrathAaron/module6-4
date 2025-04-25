import Link from "next/link"
import { PrismicNextImage } from "@prismicio/next"
import { formatDate } from "@/lib/utils"

export function ArticleCard({ article, featured = false }) {
  return (
    <div className={`group overflow-hidden rounded-lg border ${featured ? "col-span-2 md:col-span-2" : ""}`}>
      <Link href={`/articles/${article.uid}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <PrismicNextImage
            field={article.data.featured_image}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            alt={article.data.title || ""}
          />
        </div>
        <div className="p-4 md:p-6">
          <div className="text-sm text-gray-600 mb-2">{formatDate(article.first_publication_date)}</div>
          <h3 className="text-xl font-semibold leading-tight mb-2 group-hover:text-green-600 transition-colors">
            {article.data.title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{article.data.summary[0]?.text}</p>
          <div className="mt-4">
            <span className="text-sm font-medium text-green-600 group-hover:underline">Read More</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
