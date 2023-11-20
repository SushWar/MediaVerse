"use client"

import Link from "next/link"
import useMediaQuery from "@mui/material/useMediaQuery"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState } from "react"
import Image from "next/image"
import { pages } from "@/helper/contstant"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import { Avatar } from "@mui/material"

export default function NavPanel() {
  const matches = useMediaQuery("(min-width:1024px)")

  return (
    <div className="navBar_bg fixed w-full z-20 opacity-95">
      {matches ? <BigScreen /> : <SmallScreen />}
    </div>
  )
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function BigScreen() {
  return (
    <div className="w-[95%] m-auto py-4 ">
      <div className=" flex justify-between items-center">
        <div className="flex gap-8 xl:gap-16 items-center">
          <div>
            <Image
              src={"/logo.png"}
              alt="Media Verse"
              width={50}
              height={50}
              priority={true}
              className="w-auto h-auto"
            ></Image>
          </div>

          <NavPageName />

          <SearchContent />
        </div>
        <div className="flex gap-8 items-center">
          <div>
            <NotificationsNoneIcon />
          </div>
          <div>
            <Avatar style={{ backgroundColor: "darkorange" }}>GU</Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavPageName() {
  const [openPage, setOpenPage] = useState("")

  useEffect(() => {
    const loc = window.location.href.split("/")[3]
    setOpenPage(loc)
  }, [])
  return (
    <div className="flex gap-8">
      {pages.map((item: any, key: any) => {
        return (
          <div key={key} className=" text-center">
            <div
              className={`lg:text-lg xl:text-xl 2xl:text-2xl ${
                openPage === item.link
                  ? " text-[#141414] font-extrabold"
                  : "text-[#515151]"
              }`}
            >
              <Link
                href={"/" + item.link}
                onClick={() => {
                  setOpenPage(item.link)
                }}
              >
                {item.name}
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SearchContent() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const handlChange = (event: any) => {
    const { value } = event.target
    setQuery(value)
  }

  return (
    <div className=" relative">
      <input
        type="text"
        placeholder="What's on your mind ?"
        autoComplete="off"
        spellCheck="false"
        value={query}
        onChange={handlChange}
        className="rounded-3xl px-12 py-2 w-full text-lg text-slate-900"
        onClick={() => {
          setOpen(true)
        }}
      />
      {open && (
        <div
          id="searchArea"
          className=" absolute top-20 w-[50vw] -left-24 bg-red-300 rounded-xl h-[25rem] overflow-y-auto"
        >
          <div className="py-4 w-[95%] m-auto">
            <div className=" flex justify-end">
              <span
                className=" cursor-pointer"
                onClick={() => {
                  setOpen(false)
                }}
              >
                <CloseIcon />
              </span>
            </div>
            <div>query</div>
          </div>
        </div>
      )}
    </div>
  )
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SmallScreen() {
  const [open, setOpen] = useState(false)
  const tablet = useMediaQuery("(min-width:768px)")
  return (
    <div className="relative">
      <div
        className={`absolute top-[6px] -left-[6px] w-full z-10 bg-slate-500 ${
          open ? "" : "-translate-x-full"
        } duration-700 min-h-[95vh] rounded-lg`}
      >
        <SidePanel setOpen={setOpen} tablet={tablet} />
      </div>
      <div className="w-[95%] m-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src={"/logo.png"}
              alt="Media Verse"
              width={50}
              height={50}
              priority={true}
              className="w-auto h-auto"
            ></Image>
          </div>
          <div>MEDIAVERSE</div>
          <div>
            <span
              onClick={() => {
                setOpen(true)
              }}
            >
              <MenuOpenIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidePanel({ setOpen, tablet }: any) {
  return (
    <div className="py-4 w-[96%] m-auto">
      <div className="flex justify-end">
        <span
          onClick={() => {
            setOpen(false)
          }}
        >
          <CloseIcon />
        </span>
      </div>
      <div className=" text-center">
        <div className="flex justify-center">
          <Avatar
            style={{
              backgroundColor: "darkorange",
              height: "6rem",
              width: "6rem",
            }}
          >
            GU
          </Avatar>
        </div>
        <div className="pt-16 flex flex-col gap-8">
          <SideSearchArea />
          <SidePanelNavPageName setOpen={setOpen} />
        </div>
      </div>
    </div>
  )
}

function SidePanelNavPageName({ setOpen }: any) {
  const [openPage, setOpenPage] = useState("")

  useEffect(() => {
    const loc = window.location.href.split("/")[3]
    setOpenPage(loc)
  }, [])
  return (
    <div className="flex flex-col gap-8">
      {pages.map((item: any, key: any) => {
        return (
          <div key={key} className=" text-center">
            <div
              className={` text-2xl ${
                openPage === item.link
                  ? " text-[#141414] font-extrabold"
                  : "text-[#515151]"
              }`}
            >
              <Link
                href={"/" + item.link}
                onClick={() => {
                  setOpenPage(item.link)
                  setOpen(false)
                }}
              >
                {item.name}
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SideSearchArea() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const handlChange = (event: any) => {
    const { value } = event.target
    setQuery(value)
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="What's on your mind ?"
        autoComplete="off"
        spellCheck="false"
        value={query}
        onChange={handlChange}
        className="rounded-3xl px-12 py-2 w-full text-lg text-slate-900"
        onClick={() => {
          setOpen(true)
        }}
      />
      {open && (
        <div
          id="searchArea"
          className=" absolute top-20 w-full bg-red-300 rounded-xl h-[25rem] overflow-y-auto"
        >
          <div className="py-4 w-[95%] m-auto">
            <div className=" flex justify-end">
              <span
                className=" cursor-pointer"
                onClick={() => {
                  setOpen(false)
                }}
              >
                <CloseIcon />
              </span>
            </div>
            <div>query</div>
          </div>
        </div>
      )}
    </div>
  )
}
