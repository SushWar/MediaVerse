import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    const reqPref = req.nextUrl.search.split("?")[1].split("&")
    const extractParams = {
      id: reqPref[0].split("=")[1],
      season: reqPref[1].split("=")[1],
    }

    const getData = await axios.get(
      `${tmdbDomain}tv/${extractParams.id}/season/${extractParams.season}?api_key=${tmdbApiKey}&language=en`
    )

    return NextResponse.json({ data: getData.data, message: "allow" })
  } catch (error) {
    return NextResponse.json({ data: error, message: "notallow" })
  }
}
