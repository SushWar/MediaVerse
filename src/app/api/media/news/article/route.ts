export const dynamic = "force-dynamic"
export const dynamicParams = true
import { NextResponse, NextRequest } from "next/server"
import axios from "axios"

const newsApiKey = process.env.NEWS_API_KEY!
const newsDomain = process.env.NEWS_DOMAIN!

export async function GET(req: NextRequest) {
  try {
    console.log("Inside ARTICLE server TRY block :- Getting params from url")

    const createParams = {
      apiKey: newsApiKey,
      category: "entertainment",
      country: req.nextUrl.searchParams.get("country"),
      page: req.nextUrl.searchParams.get("pages"),
    }

    console.log("Inside ARTICLE server TRY block :- Sending News API call")
    const getData = await axios.get(`${newsDomain}top-headlines`, {
      params: createParams,
    })

    console.log("Inside ARTICLE server TRY block :- Sending data to client")
    return NextResponse.json(getData.data)
  } catch (error: any) {
    console.error("Inside ARTICLE server CATCH block :- " + error.message)
    return NextResponse.json(error)
  }
}
