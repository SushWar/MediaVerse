export const dynamic = "force-dynamic"
export const dynamicParams = true
import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    console.log("Inside SEARCH server TRY block :- Getting params from url")
    const extractParams = {
      api_key: tmdbApiKey,
      query: req.nextUrl.searchParams.get("query"),
      include_adult: "false",
    }

    console.log("Inside SEACRH server TRY block :- Sending TMDB API call")

    const getData = await axios.get(`${tmdbDomain}search/multi`, {
      params: extractParams,
    })

    console.log(
      "Inside SEARCH server TRY block :- Filtering the data and checking watch providers"
    )

    let filterData: any = []

    for (let i = 0; i < getData.data.results.length; i++) {
      if (
        getData.data.results[i].media_type !== "person" &&
        getData.data.results[i].poster_path !== null
      ) {
        if (getData.data.results[i].media_type === "movie") {
          const getWatchProvider = await axios.get(
            `${tmdbDomain}movie/${getData.data.results[i].id}/watch/providers?api_key=${tmdbApiKey}`
          )
          if (Object.keys(getWatchProvider.data.results).length !== 0) {
            const obj = {
              id: getData.data.results[i].id,
              poster: `https://image.tmdb.org/t/p/w500${getData.data.results[i].poster_path}`,
              title:
                getData.data.results[i].title || getData.data.results[i].name,
              type: "movie",
            }
            filterData.push(obj)
          }
        } else {
          const obj = {
            id: getData.data.results[i].id,
            poster: `https://image.tmdb.org/t/p/w500${getData.data.results[i].poster_path}`,
            title:
              getData.data.results[i].title || getData.data.results[i].name,
            type: "tv",
          }
          filterData.push(obj)
        }
      }
    }

    console.log("Inside SEARCH server TRY block :- sending Data to client")

    return NextResponse.json(filterData, { status: 200 })
  } catch (error: any) {
    console.error("Inside SEARCH server CATCH block :- " + error.message)
    return NextResponse.json(error)
  }
}
