export const dynamic = "force-dynamic"
export const dynamicParams = true
import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    console.log("Inside DETAILS server TRY block :- Getting params from url")
    const extractParams = {
      type: req.nextUrl.searchParams.get("type"),
      id: req.nextUrl.searchParams.get("id"),
    }

    console.log("Inside DETAILS server TRY block :- Sending TMDB API call")

    const getData = await axios.get(
      `${tmdbDomain}${extractParams.type}/${extractParams.id}?api_key=${tmdbApiKey}&append_to_response=images,videos,credits&language=en`
    )

    console.log("Inside DETAILS server TRY block :-sending Data to client")
    return NextResponse.json({ data: getData.data, message: "allow" })
  } catch (error: any) {
    console.error("Inside DETAILS server CATCH block :- " + error.message)
    return NextResponse.json({ data: error, message: "notallow" })
  }

  //  const reqPref = req.nextUrl.search.split("?")[1].split("&")
  //  const extractParams = {
  //    type: reqPref[0].split("=")[1],
  //    id: reqPref[1].split("=")[1],
  //  }
}
