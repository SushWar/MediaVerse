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
    }

    const getData = await axios.get(
      `${tmdbDomain}${extractParams.type}/${extractParams.id}?api_key=${tmdbApiKey}&append_to_response=images,videos,credits&language=en`
    )

    return NextResponse.json({ data: getData.data, message: "allow" })
  } catch (error: any) {
    return NextResponse.json({ data: error, message: "notallow" })
  }
}
