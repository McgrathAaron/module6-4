import * as prismic from "@prismicio/client"
import * as prismicNext from "@prismicio/next"

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN

export function createClient({ previewData, req, ...config } = {}) {
  const client = prismic.createClient(repositoryName, {
    accessToken,
    routes: [
      {
        type: "article",
        path: "/articles/:uid",
      },
    ],
    ...config,
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData,
    req,
  })

  return client
}
