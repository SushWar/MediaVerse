import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const tmdbApiKey = process.env.TMDB_API_KEY!
const tmdbDomain = process.env.TMDB_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    console.log("Inside server TRY 1")
    const reqPref = req.nextUrl.search.split("?")[1].split("&")
    console.log("Inside server TRY 2")
    const extractParams = {
      type: reqPref[0].split("=")[1],
      find: reqPref[1].split("=")[1],
      genre: reqPref[2].split("=")[1],
      year: reqPref[3].split("=")[1],
      page: reqPref[4].split("=")[1],
    }
    console.log("Inside server TRY 3")
    const getParams = {
      api_key: tmdbApiKey,
      include_adult: false,
      language: "en - US",
      page: extractParams.page,
      sort_by: `${extractParams.find}.desc`,
      watch_region: "IN",
      with_watch_monetization_types: "free|ads|flatrate",
      with_genres: extractParams.genre,
      primary_release_year: extractParams.year,
    }
    console.log("Inside server TRY 4")
    const getData = await axios.get(
      `${tmdbDomain}discover/${extractParams.type}`,
      { params: getParams }
    )
    console.log("Inside server TRY 5")
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

    console.log("Inside server TRY 6")
    console.log(filterData)
    return NextResponse.json(filterData, { status: 200 })
  } catch (error: any) {
    console.log("Inside server CATCH 1")
    console.log(error.message)
    return NextResponse.json(error)
  }
}
