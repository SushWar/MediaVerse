"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function MovieSection({ }: any) {
  
  useEffect(() => {
    const tempCall = async () => {
      try {
        const callData = await axios.get("api/media")
        console.log(callData)
        
      } catch (error) {
        console.log(error)
      }
    }
    tempCall()
  }, [])
  
    return (
      <div>Movie Section
        
      </div >)
  

}
