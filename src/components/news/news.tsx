"use client"

import axios from "axios"

export default function NewsSection({}: any) {
  const dynamicLocater = async () => {
    try {
      const sendParams = {
        type: "movie",
        find: "revenue",
        genre: "null",
        year: "2023",
        page: "1",
      }
      const dynamicData = await axios.get("/api/media/ott/locate", {
        params: sendParams,
      })
      console.log("Inside News section")
      console.log(dynamicData)
      return dynamicData.data
    } catch (error) {
      return null
    }
  }

  return (
    <div className=" min-h-screen flex justify-center items-center">
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
