import * as prismic from "@prismicio/client"
import * as prismicNext from "@prismicio/next"

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || ""

export function createClient({
  previewData,
  req,
  ...config
}: {
  previewData?: any
  req?: Request
  [key: string]: any
} = {}) {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData,
    req,
  })

  return client
}
