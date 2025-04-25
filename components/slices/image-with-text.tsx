import { PrismicNextImage } from "@prismicio/next"
import { PrismicRichText } from "@prismicio/react"

export function ImageWithText({ slice }) {
  const { primary } = slice

  return (
    <div className="py-8 md:py-12">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${primary.image_position === "right" ? "md:flex-row-reverse" : ""}`}
      >
        <div className="relative aspect-square md:aspect-auto md:h-[400px] rounded-lg overflow-hidden">
          <PrismicNextImage field={primary.image} fill className="object-cover" alt={primary.title || ""} />
        </div>
        <div>
          {primary.title && <h2 className="text-2xl font-bold mb-4">{primary.title}</h2>}
          <div className="prose prose-green max-w-none">
            <PrismicRichText field={primary.content} />
          </div>
        </div>
      </div>
    </div>
  )
}
