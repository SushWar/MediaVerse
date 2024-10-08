"use client"
import { ListByGenre, RewindSwiper } from "@/components/reusableComp/reusable"

export default function MovieSection({}: any) {
  return (
    <div className="pt-[2.6em]">
      <div>
        <div className="pt-[2.8em] lg:pt-[4em]">
          <RewindSwiper
            type={"movie"}
            find={"popularity"}
            genre={"28"}
            page={"1"}
          />
        </div>
        <div>
          <ListByGenre type={"movie"} />
        </div>
      </div>
    </div>
  )
}
