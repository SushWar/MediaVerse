export const dynamic = "force-dynamic"
export const dynamicParams = true
import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    console.log(
      "Inside DETAILS/SEASON server TRY block :- Getting params from url"
    )
    const extractParams = {
      season: req.nextUrl.searchParams.get("season"),
      id: req.nextUrl.searchParams.get("id"),
    }

    console.log(
      "Inside DETAILS/SEASON server TRY block :- Sending TMDB API call"
    )
    const getData = await axios.get(
      `${tmdbDomain}tv/${extractParams.id}/season/${extractParams.season}?api_key=${tmdbApiKey}&language=en`
    )

    console.log(
      "Inside DETAILS/SEASON server TRY block :-sending Data to client"
    )
    return NextResponse.json({ data: getData.data, message: "allow" })
  } catch (error: any) {
    console.error(
      "Inside DETAILS/SEASON server CATCH block :- " + error.message
    )
    return NextResponse.json({ data: error, message: "notallow" })
  }

  //  const reqPref = req.nextUrl.search.split("?")[1].split("&")
  //  const extractParams = {
  //    id: reqPref[0].split("=")[1],
  //    season: reqPref[1].split("=")[1],
  //  }
}
