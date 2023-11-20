import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    const reqPref = req.nextUrl.search.split("?")[1].split("&")
    const extractParams = {
      type: reqPref[0].split("=")[1],
    }
    const getData = await axios.get(
      `${tmdbDomain}genre/${extractParams.type}/list?api_key=${tmdbApiKey}`
    )
    return NextResponse.json(getData.data)
  } catch (error) {
    return NextResponse.json(error)
  }
}
