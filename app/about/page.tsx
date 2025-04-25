import Image from "next/image"
import { createClient } from "@/lib/prismic"
import { PrismicContent } from "@/components/prismic-content"

export const metadata = {
  title: "About | EcoBytes",
  description: "Learn more about EcoBytes and our mission to promote sustainable technology.",
}

export default async function AboutPage() {
  const client = createClient()

  // Try to get the about page
  const about = await client.getSingle("about").catch(() => null)

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        {/* About Title */}
        <h1 className="text-4xl font-bold mb-8">{about?.data?.title || "About EcoBytes"}</h1>

        {/* Featured Image */}
        {about?.data?.featured_image?.url ? (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
            <Image
              src={about.data.featured_image.url}
              alt={about.data.title || "About EcoBytes"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
            <p className="text-gray-500">Featured image not available</p>
          </div>
        )}

        {/* About Content */}
        <div className="prose prose-green max-w-none mb-12">
          {about?.data?.content ? (
            <PrismicContent field={about.data.content} />
          ) : (
            <p>
              Welcome to EcoBytes, your source for information on sustainable technology and eco-friendly digital
              solutions. Our mission is to explore and promote technologies that help create a more sustainable future.
            </p>
          )}
        </div>

        {/* Team Section */}
        {about?.data?.team_members?.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {about.data.team_members.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    {member.photo?.url ? (
                      <Image
                        src={member.photo.url || "/placeholder.svg"}
                        fill
                        className="object-cover"
                        alt={member.name || "Team Member"}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No photo</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{member.name || "Team Member"}</h3>
                  <p className="text-gray-600">{member.role || "Role"}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="mt-16 p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have questions or want to collaborate? Reach out to us using the contact information below.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:contact@ecobytes.com" className="text-green-600 hover:underline">
                contact@ecobytes.com
              </a>
            </p>
            <p>
              <strong>Follow us:</strong>{" "}
              <a href="#" className="text-green-600 hover:underline">Twitter</a>
              {", "}
              <a href="#" className="text-green-600 hover:underline">LinkedIn</a>
              {", "}
              <a href="#" className="text-green-600 hover:underline">Instagram</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
