"use client"

import Link from "next/link"

export default function NavPanel() {
  return (
    <div className=" bg-red-300">
      <div className="w-[95%] m-auto py-4">
        <div className=" flex justify-between">
          <div className="flex gap-8">
            <div>Brand Logo</div>
            <div>
              <Link href={"/"}>Home </Link>
            </div>
            <div>
              <Link href={"/movies"}> Movies</Link>
            </div>
            <div>
              <Link href={"/tv"}>TV Shows</Link>
            </div>
            <div>
              <Link href={"/entertainmentnews"}>Reel Talk</Link>
            </div>
            <div>Search Area</div>
          </div>
          <div className="flex gap-4">
            <div>bell</div>
            <div>Profile</div>
          </div>
        </div>
      </div>
    </div>
  )
}
