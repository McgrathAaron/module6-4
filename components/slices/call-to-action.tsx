import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PrismicRichText } from "@prismicio/react"

export function CallToAction({ slice }) {
  const { primary } = slice

  return (
    <div className="py-12 md:py-16 bg-muted rounded-lg text-center">
      <div className="container max-w-3xl mx-auto">
        {primary.title && <h2 className="text-3xl font-bold mb-4">{primary.title}</h2>}
        <div className="prose prose-green max-w-none mb-8 mx-auto">
          <PrismicRichText field={primary.content} />
        </div>
        {primary.button_text && primary.button_link && (
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href={primary.button_link.url || "#"}>{primary.button_text}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
