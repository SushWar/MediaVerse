"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
export default function MovieSection({ }: any) {
  // const[getData,setData]= useState()
  // useEffect(() => {
  //   const tempCall = async () => {
  //     try {
  //       const callData = await axios.get("api/media")
  //       console.log(callData)
  //       setData(callData.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   tempCall()
  // }, [])
  const dynamicLocater = async () => {
    try {
      const callData = await axios.get("api/media")
      return callData.data
    } catch (error) {
      return null
    }
  }
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['testing'],
    queryFn: dynamicLocater,
    staleTime: 1000 * 60 * 60,
  })
  if (isLoading) { return (<div className="min-h-screen flex justify-center items-center"><div>Loading....</div></div>) }
  if (isSuccess) {
    return (
      <div>Movie Section
        <div>
          {data.results.map((item: any, key: any) => {
            return (
              <div key={key}><img src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path}`} /></div>
            )
          })}
        </div>

      </div >)
  }

}
