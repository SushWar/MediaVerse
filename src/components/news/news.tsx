"use client"

import axios from "axios"

export default function NewsSection({}: any) {
  const dynamicLocater = async () => {
    try {
      console.log("Inside NEWS TRY 1")
      const sendParams = {
        type: "movie",
        find: "revenue",
        genre: "null",
        year: "2023",
        page: "1",
      }
      console.log("Inside NEWS TRY 2")
      const dynamicData = await axios.get("/api/media/ott/locate", {
        params: sendParams,
      })
      console.log("Inside NEWS TRY 3")
      console.log("Inside News section")
      console.log(dynamicData)
      return dynamicData.data
    } catch (error) {
      console.log("Inside NEWS CATCH 1")
      return null
    }
  }

  return (
    <div className=" min-h-screen flex justify-center items-center text-red-700">
      <div>
        <div>News Section</div>
        <div>
          <span
            onClick={() => {
              dynamicLocater()
            }}
          >
            Test
          </span>
        </div>
      </div>
    </div>
  )
}
