export const dynamic = "force-dynamic"
export const dynamicParams = true
import WatchSection from "@/components/watch/watch"
import type { Metadata } from "next"
const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function generateMetadata({
  params,
  searchParams,
}: any): Promise<Metadata> {
  let sendParams = {
    type: "",
    id: "",
  }

  if (searchParams.movie) {
    sendParams.type = "movie"
    sendParams.id = searchParams.movie
  } else {
    sendParams.type = "tv"
    sendParams.id = searchParams.tv
  }

  const dynamicData = await fetch(
    `${tmdbDomain}${sendParams.type}/${sendParams.id}?api_key=${tmdbApiKey}`
  )
  const data = await dynamicData.json()

  const description = data.overview

  return {
    title: `${params.name}`,
    description: `${description}`,
  }
}

export default function Watch(params: any) {
  return (
    <div>
      <WatchSection params={params} />
    </div>
  )
}
