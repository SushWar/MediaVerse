export const dynamic = "force-dynamic"
export const dynamicParams = true
import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    const reqPref = req.nextUrl.search.split("?")[1].split("&")
    const extractParams = {
      type: reqPref[0].split("=")[1],
      id: reqPref[1].split("=")[1],
      page: reqPref[2].split("=")[1],
    }

    const getData = await axios.get(
      `${tmdbDomain}${extractParams.type}/${extractParams.id}/recommendations?api_key=${tmdbApiKey}&page=${extractParams.page}`
    )

    const filterData = getData.data.results.map((item: any) => {
      if (item.backdrop_path && item.poster_path) {
        return {
          id: item.id,
          backdrop: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path}`,
          title: item.name || item.title,
          poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }
      }
    })

    return NextResponse.json(filterData)
  } catch (error: any) {
    return NextResponse.json(error)
  }
}
