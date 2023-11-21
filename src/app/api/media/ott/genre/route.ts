export const dynamic = "force-dynamic"
export const dynamicParams = true
import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    console.log("Inside GENRE server TRY block :- Getting params from url")

    const extractParams = {
      type: req.nextUrl.searchParams.get("type"),
    }
    console.log("Inside GENRE server TRY block :- Sending TMDB API call")

    const getData = await axios.get(
      `${tmdbDomain}genre/${extractParams.type}/list?api_key=${tmdbApiKey}`
    )

    console.log("Inside GENRE server TRY block :-sending Data to client")
    return NextResponse.json(getData.data)
  } catch (error: any) {
    console.error("Inside GENRE server CATCH block :- " + error.message)
    return NextResponse.json(error)
  }

  // const reqPref = req.nextUrl.search.split("?")[1].split("&")
  // const extractParams = {
  //   type: reqPref[0].split("=")[1],
  // }
}
