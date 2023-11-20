import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const newsApiKey = process.env.NEWS_API_KEY!
const newsDomain = process.env.NEWS_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    const reqPref = req.nextUrl.search.split("?")[1].split("&")
    const extractParams = {
      country: reqPref[0].split("=")[1],
      page: reqPref[1].split("=")[1],
    }

    const getData = await axios(
      `${newsDomain}top-headlines?apiKey=${newsApiKey}&category=entertainment&country=${extractParams.country}&page=${extractParams.page}`
    )

    return NextResponse.json(getData.data)
  } catch (error) {
    return NextResponse.json(error)
  }
}
