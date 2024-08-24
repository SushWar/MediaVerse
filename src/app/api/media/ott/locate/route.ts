export const dynamic = "force-dynamic"
export const dynamicParams = true
import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    console.log("Inside LOCATE server TRY block :- Getting params from url")

    const extractParams = {
      type: req.nextUrl.searchParams.get("type"),
      find: req.nextUrl.searchParams.get("find"),
      genre: req.nextUrl.searchParams.get("genre"),
      year: req.nextUrl.searchParams.get("year"),
      page: req.nextUrl.searchParams.get("page"),
    }

    console.log(
      "Inside LOCATE server TRY block :- creating params obj for API call"
    )

    const getParams = {
      api_key: tmdbApiKey,
      include_adult: false,
      language: "en-US",
      page: extractParams.page,
      sort_by: `${extractParams.find}.desc`,
      watch_region: "IN",
      // with_watch_monetization_types: "free|ads|flatrate",
      with_genres: extractParams.genre,
      primary_release_year: extractParams.year,
    }

    console.log("Inside LOCATE server TRY block :- Sending TMDB API call")

    const getData = await axios.get(
      `${tmdbDomain}discover/${extractParams.type}`,
      { params: getParams }
    )
    console.log("Inside LOCATE server TRY block :- Filtering the Data")
    const filterData = getData.data.results.map((item: any) => {
      if (item.backdrop_path && item.poster_path) {
        return {
          id: item.id,
          backdrop: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path}`,
          title: item.name || item.title,
          poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          type: extractParams.type,
        }
      }
    })

    console.log("Inside LOCATE server TRY block :- sending Data to client")

    return NextResponse.json(filterData, { status: 200 })
  } catch (error: any) {
    console.error("Inside LOCATE server CATCH block :- " + error.message)
    return NextResponse.json(error)
  }
}
