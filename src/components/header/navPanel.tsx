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
import SearchIcon from "@mui/icons-material/Search"
import { usePathname } from "next/navigation"

export default function NavPanel() {
  const matches = useMediaQuery("(min-width:1024px)")

  return (
    <div className="navBar_bg fixed w-full z-20">
      {matches ? <BigScreen /> : <SmallScreen />}
    </div>
  )
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function BigScreen() {
  return (
    <div className="w-[95%] m-auto py-4">
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
  const pathname = usePathname()

  return (
    <div className="flex gap-8">
      {pages.map((item: any, key: any) => {
        return (
          <div key={key} className=" text-center">
            <div
              className={`lg:text-xl xl:text-2xl 2xl:text-2xl ${
                pathname === item.link
                  ? " text-[#141414] font-extrabold"
                  : "text-[#515151]"
              }`}
            >
              <Link href={item.link}>{item.name}</Link>
            </div>
          </div>
        )
      })}
      <Link href={"/search"}>
        <SearchIcon
          style={{
            width: "2rem",
            height: "2rem",
            color: `${pathname === "/search" ? "#141414" : "#515151"}`,
          }}
        />
      </Link>
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
        className={`absolute top-[6px] -left-[6px] w-full z-10 sidePanel_bg ${
          open ? "" : "-translate-x-full"
        } duration-700 min-h-[99vh] rounded-lg`}
      >
        <SidePanel setOpen={setOpen} tablet={tablet} />
      </div>
      <div className="w-[95%] m-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src={"/logo.png"}
              alt="Media Verse"
              width={33}
              height={33}
              priority={true}
              className="w-auto h-auto"
            ></Image>
          </div>
          <div className=" text-2xl font-extrabold text-[#0e111c]">
            MediaVerse
          </div>
          <div>
            <span
              onClick={() => {
                setOpen(true)
              }}
            >
              <MenuOpenIcon
                style={{ width: "2.5rem", height: "2.5rem", color: "#0e111c" }}
              />
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
          <CloseIcon
            style={{ width: "2.5rem", height: "2.5rem", color: "#d0e9ff" }}
          />
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
          <div className="flex justify-center"></div>
          <SidePanelNavPageName setOpen={setOpen} />
        </div>
      </div>
    </div>
  )
}

function SidePanelNavPageName({ setOpen }: any) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-8">
      <Link
        href={"/search"}
        onClick={() => {
          setOpen(false)
        }}
      >
        <SearchIcon
          style={{
            width: "2rem",
            height: "2rem",
            color: `${pathname === "/search" ? "#dcd2d2" : "#7d7b7b"}`,
          }}
        />
      </Link>
      {pages.map((item: any, key: any) => {
        return (
          <div key={key} className=" text-center">
            <div
              className={` text-2xl ${
                pathname === item.link
                  ? " text-[#dcd2d2] font-extrabold"
                  : "text-[#7d7b7b]"
              }`}
            >
              <Link
                href={item.link}
                onClick={() => {
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
