"use client"

import { SearchQuery } from "../reusableComp/reusable"

export default function SearchSection({}: any) {
  return (
    <div className="pt-[2.6em]">
      <div className="pt-[2.8em] lg:pt-[4em]">
        <SearchQuery />
      </div>
    </div>
  )
}
