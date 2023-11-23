"use client"

import { ListByGenre, RewindSwiper } from "../reusableComp/reusable"

export default function TvShowsSection({}: any) {
  return (
    <div className="pt-[2.6em]">
      <div>
        <div className="pt-[2.8em] lg:pt-[4em]">
          <RewindSwiper
            type={"tv"}
            find={"popularity"}
            genre={"null"}
            page={"1"}
          />
        </div>

        <div>
          <ListByGenre type={"tv"} />
        </div>
      </div>
    </div>
  )
}
