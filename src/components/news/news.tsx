"use client"

import axios from "axios"
import { NewsSlider } from "../reusableComp/reusable"

export default function NewsSection(prop: any) {
  return (
    <div className="pt-[2.6em]">
      <div>
        <div className="pt-[3.8em] lg:pt-[5em]">
          <NewsSlider />
        </div>
      </div>
    </div>
  )
}
