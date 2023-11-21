import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc'
    const showData = await axios.get(
      `${tmdbDomain}discover/movie?api_key=${tmdbApiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    )

    return NextResponse.json(showData.data)
  } catch (error: any) {
    return NextResponse.json(error)
  }
}
