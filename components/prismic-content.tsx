import { PrismicRichText } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

export function PrismicContent({ field }) {
  if (!field) {
    return null
  }

  return (
    <div className="prose prose-green max-w-none">
      <PrismicRichText
        field={field}
        components={{
          image: ({ node }) => (
            <div className="my-8 overflow-hidden rounded-lg">
              <PrismicNextImage field={node} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
          ),
          hyperlink: ({ node, children }) => (
            <a href={node.data.url} className="text-green-600 hover:underline">
              {children}
            </a>
          ),
          heading1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
          heading2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
          heading3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
          paragraph: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        }}
      />
    </div>
  )
}
