"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { Theatre } from "../reusableComp/reusable"
import { CircularProgress } from "@mui/material"

export default function WatchSection({ params }: any) {
  const [detail, setDetails] = useState({
    type: "",
    id: "",
  })
  const [error, setError] = useState(false)

  useEffect(() => {
    if (params.searchParams.movie) {
      setDetails({ ...detail, id: params.searchParams.movie, type: "movie" })
    } else {
      setDetails({ ...detail, id: params.searchParams.tv, type: "tv" })
    }
  }, [])

  const dynamicDetail = async () => {
    try {
      const sendParams = {
        type: detail.type,
        id: detail.id,
      }
      const dynamicData = await axios.get("/api/media/ott/details", {
        params: sendParams,
      })

      if (dynamicData.data.message === "notallow") {
        setError(true)
      } else {
        setError(false)
      }

      return dynamicData.data
    } catch (error) {
      return null
    }
  }

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [detail.id],
    queryFn: dynamicDetail,
    staleTime: 1000 * 60 * 60,
  })

  if (isLoading || isError) {
    return (
      <div className=" min-h-screen flex justify-center items-center">
        <div>
          <CircularProgress />
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="pt-[6.6em]">
        {data.message === "notallow" ? (
          "Error...."
        ) : (
          <Theatre type={detail.type} id={detail.id} />
        )}
      </div>
    )
  }

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  )
}
