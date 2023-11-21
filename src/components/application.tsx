"use client"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import CircularProgress from "@mui/material/CircularProgress"
import {
  HorizontalList,
  NewsLayoutOne,
  RewindSwiper,
} from "./reusableComp/reusable"

const homeLayout = [
  {
    func: (
      <RewindSwiper
        type={"movie"}
        find={"popularity"}
        genre={"null"}
        page={"1"}
      />
    ),
  },
  {
    func: (
      <HorizontalList
        type={"movie"}
        find={"revenue"}
        genre={"null"}
        page={"1"}
        listHead={"Today's Hot Picks"}
      />
    ),
  },
  {
    func: (
      <HorizontalList
        type={"movie"}
        find={"vote_count"}
        genre={"null"}
        page={"1"}
        listHead={"People's Choice"}
      />
    ),
  },
  {
    func: <NewsLayoutOne country={"in"} pages={1} />,
  },
  {
    func: (
      <RewindSwiper type={"tv"} find={"popularity"} genre={"null"} page={"1"} />
    ),
  },
  {
    func: (
      <HorizontalList
        type={"tv"}
        find={"vote_count"}
        genre={"null"}
        page={"1"}
        listHead={"Binge-Worthy TV Shows"}
      />
    ),
  },
  {
    func: (
      <HorizontalList
        type={"tv"}
        find={"popularity"}
        genre={"null"}
        page={"2"}
        listHead={"TV Shows for Every Mood"}
      />
    ),
  },
  {
    func: <NewsLayoutOne country={"in"} pages={3} />,
  },
]

export default function HomeSection({}: any) {
  const { ref, inView } = useInView()

  const fetchProjects = async ({ pageParam }: any) => {
    return homeLayout.slice((pageParam - 1) * 2, pageParam * 2)
  }
  const {
    data,
    isLoading,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["HomeLayout"],
    queryFn: fetchProjects,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.length ? pages.length + 1 : undefined
      return nextPage
    },
    staleTime: 1000 * 60 * 60,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isLoading || isFetchingNextPage) {
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
      <div className="pt-[2.6em]">
        {/* {data.pages.map((page, i) => {
          return (
            <div key={i}>
              {page &&
                page.map((item: any, key: any) => {
                  return (
                    <div key={key} ref={ref} className="pt-[4em]">
                      {item.func}
                    </div>
                  )
                })}
            </div>
          )
        })} */}
        {/* {isFetchingNextPage && <div>Loading more...</div>} */}
      </div>
    )
  }

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div>
        <div>Testing</div>
        <CircularProgress />
      </div>
    </div>
  )
}
