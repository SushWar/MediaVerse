import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, EffectCreative, Navigation, Grid } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-cards"
import "swiper/css/effect-creative"
import "swiper/css/grid"
import axios from "axios"
import Image from "next/image"
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { CircularProgress, useMediaQuery } from "@mui/material"
import Skeleton from "@mui/material/Skeleton"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { removeSpace } from "@/helper/stringHelper"
import CloseIcon from "@mui/icons-material/Close"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

//START----------------------------------------------------------------------------------Big Banner---------------------------------------------------------------------------------------------------

function RewindSwiper({ type, find, genre, page }: any) {
  const dynamicLocater = async () => {
    try {
      const sendParams = {
        type: type,
        find: find,
        genre: genre,
        year: "2024",
        page: page,
      }
      const dynamicData = await axios.get("/api/media/ott/locate", {
        params: sendParams,
      })
      return dynamicData.data
    } catch (error) {
      return null
    }
  }

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [type + "/" + find + "/" + page],
    queryFn: dynamicLocater,
    staleTime: 1000 * 60 * 60,
  })

  if (isLoading || isError) {
    return (
      <div className=" w-[95%] m-auto">
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"50vw"}
          style={{ backgroundColor: "grey", borderRadius: "1rem" }}
        />
      </div>
    )
  }
  if (isSuccess) {
    return (
      <div className=" text-black overflow-x-auto">
        <Swiper
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {data &&
            data.map((item: any, key: any) => {
              if (item) {
                return (
                  <SwiperSlide key={key}>
                    <Link
                      href={`/watch/${removeSpace(item.title)}?${type}=${
                        item.id
                      }`}
                    >
                      <BigPoster item={item} type={type} />
                    </Link>
                  </SwiperSlide>
                )
              }
            })}
        </Swiper>
      </div>
    )
  }
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  )
}

function BigPoster({ item, type }: any) {
  const matches = useMediaQuery("(min-width:1024px)")
  const dynamicDetail = async () => {
    try {
      const sendParams = {
        type: type,
        id: item.id,
      }
      const dynamicData = await axios.get("/api/media/ott/details", {
        params: sendParams,
      })
      return dynamicData.data.data
    } catch (error) {
      return null
    }
  }

  const { data, isSuccess } = useQuery({
    queryKey: [item.id],
    queryFn: dynamicDetail,
    staleTime: 1000 * 60 * 60,
  })

  const divImage: any = {
    backgroundImage: `url(${item.backdrop})`,
  }

  if (data && isSuccess) {
    const logo =
      data.images.logos.length > 0
        ? `https://image.tmdb.org/t/p/w500${data.images.logos[0].file_path}`
        : null

    return (
      <div className="relative">
        <div>
          <div
            className="bg-no-repeat bg-cover w-full bg-center p-[21%] h-[20em]"
            style={divImage}
          >
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="bigPoster">
                <div className="h-[100%] flex items-end">
                  <div className=" pl-3 pb-2">
                    {logo ? (
                      <Image
                        src={logo}
                        alt={item.title}
                        width={matches ? 300 : 150}
                        height={matches ? 200 : 100}
                        className="w-auto h-auto"
                      ></Image>
                    ) : (
                      <div className=" text-4xl md:text-6xl text-slate-300">
                        {data.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div>
        <div
          className="bg-no-repeat bg-cover w-full bg-center p-[21%] h-[20em]"
          style={divImage}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="bigPoster"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

//END----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//START-------------------------------------------------------------------------------------Horizontal List-----------------------------------------------------------------------------------------

function HorizontalList({ type, find, genre, page, listHead }: any) {
  const dynamicLocater = async () => {
    try {
      const sendParams = {
        type: type,
        find: find,
        genre: genre,
        year: "2023",
        page: page,
      }
      const dynamicData = await axios.get("/api/media/ott/locate", {
        params: sendParams,
      })
      return dynamicData.data
    } catch (error) {
      return null
    }
  }

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [type + "/" + find + "/" + genre + "/" + page],
    queryFn: dynamicLocater,
    staleTime: 1000 * 60 * 60,
  })

  if (isLoading || isError) {
    return (
      <div className="px-5">
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"20vw"}
          style={{ backgroundColor: "grey", borderRadius: "18px" }}
        />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className=" px-5">
        <div className=" text-3xl text-[#e6efff]">
          <h2>{listHead}</h2>
        </div>
        <div className="">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={7}
            slidesPerView={1}
            breakpoints={{
              320: {
                spaceBetween: 10,
                slidesPerView: 2.2,
              },
              481: {
                spaceBetween: 10,
                slidesPerView: 2.8,
              },
              769: {
                spaceBetween: 20,
                slidesPerView: 4.5,
              },
              1025: {
                spaceBetween: 30,
                slidesPerView: 4.7,
              },
              1536: {
                spaceBetween: 40,
                slidesPerView: 5.7,
              },
            }}
            allowTouchMove={true}
            className={`rounded-2xl`}
          >
            {data &&
              data.map((item: any, key: any) => {
                if (item) {
                  return (
                    <SwiperSlide key={key}>
                      <div className=" py-2">
                        <Link
                          href={`/watch/${removeSpace(item.title)}?${type}=${
                            item.id
                          }`}
                        >
                          <Image
                            src={item.poster}
                            alt={item.title}
                            width={500}
                            height={600}
                            loading="lazy"
                            className=" rounded-2xl w-auto h-auto"
                          ></Image>
                        </Link>
                      </div>
                    </SwiperSlide>
                  )
                }
              })}
          </Swiper>
        </div>
      </div>
    )
  }
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  )
}

//END----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//START-------------------------------------------------------------------------------------2 News object together -----------------------------------------------------------------------------------------

function NewsLayoutOne({ country, pages }: any) {
  const [middle, setMiddle] = useState(0)

  const dynamicNews = async (thisPage: any) => {
    try {
      const sendParams = {
        country: country,
        pages: thisPage,
      }
      const dynamicData = await axios.get("/api/media/news/article", {
        params: sendParams,
      })
      const mid = Math.ceil(dynamicData.data.articles.length / 2)
      setMiddle(mid)

      return dynamicData.data
    } catch (error) {
      return null
    }
  }

  const firstHalf = useQuery({
    queryKey: [country + "/" + pages],
    queryFn: () => {
      return dynamicNews(pages)
    },
    staleTime: 1000 * 60 * 60,
  })
  const secondHalf = useQuery({
    queryKey: [country + "/" + pages + 1],
    queryFn: () => {
      return dynamicNews(pages + 1)
    },
    staleTime: 1000 * 60 * 60,
  })

  if (
    firstHalf.isLoading ||
    firstHalf.isError ||
    secondHalf.isLoading ||
    secondHalf.isError
  ) {
    return (
      <div className="px-5">
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"20vw"}
          style={{ backgroundColor: "grey", borderRadius: "1rem" }}
        />
      </div>
    )
  }
  if (firstHalf.isSuccess && secondHalf.isSuccess) {
    return (
      <div className="">
        <div className=" w-[95%] m-auto flex flex-col gap-20 lg:flex-row lg:justify-around">
          <div>
            <SwiperEffectCards firstHalf={firstHalf.data.articles} />
          </div>
          <div>
            <SwiperCardLeft secondHalf={secondHalf.data.articles} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  )
}

function SwiperEffectCards({ firstHalf }: any) {
  const matches = useMediaQuery("(min-width:768px)")
  const divImage: any = {
    backgroundImage: `url('No-Image-Placeholder.png')`,
  }
  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper "
        style={{
          width: matches ? "350px" : "205px",
          height: matches ? "500px" : "390px",
        }}
      >
        {firstHalf.map((item: any, key: any) => {
          return (
            <SwiperSlide key={key}>
              <div className=" bg-[#d3dfff] text-black rounded-[18px] h-full">
                <div>
                  <img
                    style={divImage}
                    className=" rounded-t-[18px] bg-no-repeat bg-cover w-full h-[11rem]"
                    src={
                      item.urlToImage
                        ? item.urlToImage
                        : "/No-Image-Placeholder.png"
                    }
                    alt={"MediaVerse"}
                    loading="lazy"
                    placeholder="/No-Image-Placeholder.png"
                  />
                </div>
                <div className="p-3">
                  <Link href={item.url || "/"} target="_blank">
                    <div className=" font-extrabold underline text-black hover:text-blue-600">
                      {item.title}
                    </div>
                  </Link>
                  {matches && (
                    <div className=" pt-5 italic">{item.content}</div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

function SwiperCardLeft({ secondHalf }: any) {
  const matches = useMediaQuery("(min-width:768px)")
  const divImage: any = {
    backgroundImage: `url('No-Image-Placeholder.png')`,
  }
  return (
    <div>
      <Swiper
        grabCursor={true}
        // navigation={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative, Navigation]}
        className="mySwiper2"
        style={{ width: matches ? "600px" : "300px", height: "500px" }}
      >
        {secondHalf.map((item: any, key: any) => {
          return (
            <SwiperSlide key={key}>
              {" "}
              <div className=" bg-[#d3dfff] text-black rounded-[18px] h-full">
                <div className=" p-3">
                  <img
                    style={divImage}
                    className={`rounded-[18px] bg-no-repeat bg-cover w-full ${
                      matches ? "h-[18rem]" : "h-[13rem]"
                    }`}
                    src={
                      item.urlToImage
                        ? item.urlToImage
                        : "/No-Image-Placeholder.png"
                    }
                    alt={"MediaVerse"}
                    loading="lazy"
                    placeholder="/No-Image-Placeholder.png"
                  />
                </div>
                <div className="p-3">
                  <Link href={item.url || "/"} target="_blank">
                    <div className=" font-extrabold underline text-black hover:text-blue-600">
                      {item.title}
                    </div>
                  </Link>
                  <div className=" pt-5 italic">{item.content}</div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

//END----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//START-------------------------------------------------------------------------------------Genre List-----------------------------------------------------------------------------------------

function ListByGenre({ type }: any) {
  const { ref, inView } = useInView()

  const fetchProjects = async ({ pageParam }: any) => {
    try {
      const sendParams = {
        type: type,
      }
      const dynamicData = await axios.get("/api/media/ott/genre", {
        params: sendParams,
      })
      const filterData = dynamicData.data.genres
      return filterData.slice((pageParam - 1) * 2, pageParam * 2)
    } catch (error) {
      return null
    }
  }
  const {
    data,
    isLoading,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [type + "/genre"],
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

  if (isLoading) {
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
      <div>
        {data.pages.map((page, i) => {
          return (
            <div key={i}>
              {page &&
                page.map((item: any, key: any) => {
                  return (
                    <div key={key} ref={ref} className="pt-[4em]">
                      <HorizontalList
                        type={type}
                        find={"popularity"}
                        genre={item.id}
                        page={"1"}
                        listHead={item.name}
                      />
                    </div>
                  )
                })}
            </div>
          )
        })}
        {isFetchingNextPage && (
          <div>
            <CircularProgress />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div>
        <div>List by genre</div>
        <CircularProgress />
      </div>
    </div>
  )
}

//END----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Start-----------------------------------------------------------------WATCH FUNCTIONS-------------------------------------------------------------------------------------------------------------

function Theatre({ type, id }: any) {
  const matches = useMediaQuery("(min-width:1024px)")

  const dynamicDetail = async () => {
    try {
      const sendParams = {
        type: type,
        id: id,
      }
      const dynamicData = await axios.get("/api/media/ott/details", {
        params: sendParams,
      })

      return dynamicData.data
    } catch (error) {
      return null
    }
  }

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: dynamicDetail,
    staleTime: 1000 * 60 * 60,
  })

  if (isLoading) {
    return (
      <div className=" min-h-screen flex justify-center items-center">
        <div>
          <CircularProgress />
        </div>
      </div>
    )
  }

  if (isSuccess) {
    const logo =
      data.data.images.logos.length > 0
        ? `https://image.tmdb.org/t/p/w500${data.data.images.logos[0].file_path}`
        : null

    const divImage: any = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data.data.backdrop_path})`,
    }

    const divImagesecond: any = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${
        data.data.images.backdrops.length > 0
          ? data.data.images.backdrops[0].file_path
          : data.data.backdrop_path
      })`,
    }

    return (
      <div>
        <div className="relative">
          <div
            className="bg-no-repeat bg-cover w-full bg-center p-[21%] h-[20em]"
            style={divImage}
          >
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="theatrePoster_down"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=" p-2">
            {logo ? (
              <Image
                src={logo}
                alt={data.data.title || data.data.name}
                width={matches ? 300 : 150}
                height={matches ? 200 : 100}
                className="w-auto h-auto"
              ></Image>
            ) : (
              <div>{data.data.title || data.data.name} </div>
            )}
          </div>
        </div>
        {type === "tv" && (
          <div className="w-[90%] m-auto py-8">
            <SeasonDetails id={id} parentSeason={data.data.seasons} />
          </div>
        )}
        <div className="relative">
          <div
            className="bg-no-repeat bg-cover w-full bg-center p-[21%] h-[50em]"
            style={divImagesecond}
          >
            <div className="theatrePoster_up absolute -top-0 left-0 w-full h-full"></div>
            <div className="theatrePoster_down absolute top-0  left-0 h-full w-full"></div>
            <div className="theatrePoster_left absolute top-0 h-full  left-0 w-full"></div>

            <div className="absolute top-1 h-full left-0 w-full">
              <div className=" w-[90%] m-auto py-8 ">
                <div>
                  <div className=" md:w-1/2 py-3 ">
                    <div className="text-[#afa2ee] text-xl">Storyline</div>
                    <div className="pl-4 pt-3 text-[#fbf0f0]">
                      {data.data.overview}
                    </div>
                  </div>
                  <div className="py-3">
                    <div className="text-[#afa2ee] text-xl">Genre</div>
                    <div className="pl-4 pt-3 flex gap-3 text-[#fbf0f0]">
                      {data.data.genres.map((item: any, key: any) => {
                        return (
                          <div key={key}>
                            {item.name} <span>{}</span>
                            {data.data.genres.length - 1 > key ? "," : ""}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="py-3">
                    <div className=" text-[#afa2ee] text-xl">Popularity</div>
                    <div className="pl-4 pt-3 text-[#fbf0f0]">
                      {data.data.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div className="py-6">
                    <CastDetails credits={data.data.credits} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" pt-14">
          <RecomendationGenre type={type} id={id} />
        </div>
      </div>
    )
  }

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  )
}

function SeasonDetails({ id, parentSeason }: any) {
  const [getSeason, setSeason] = useState(1)

  const dynamicDetail = async () => {
    try {
      const sendParams = {
        id: id,
        season: getSeason,
      }
      const dynamicData = await axios.get("/api/media/ott/details/season", {
        params: sendParams,
      })

      return dynamicData.data
    } catch (error) {
      return null
    }
  }

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [id + "/Season/" + getSeason],
    queryFn: dynamicDetail,
    staleTime: 1000 * 60 * 60,
  })

  return (
    <div>
      <div>
        <Swiper
          modules={[Navigation]}
          grabCursor={true}
          spaceBetween={5}
          slidesPerView={3}
          breakpoints={{
            320: {
              spaceBetween: 100,
              slidesPerView: 4,
            },
            481: {
              spaceBetween: 60,
              slidesPerView: 4,
            },
            769: {
              spaceBetween: 50,
              slidesPerView: 5,
            },
            1025: {
              spaceBetween: 5,
              slidesPerView: 5,
            },
            1536: {
              spaceBetween: 5,
              slidesPerView: 6,
            },
          }}
          allowTouchMove={true}
          className={`rounded-2xl`}
        >
          {parentSeason.map((item: any, key: any) => {
            if (item.season_number >= 1) {
              return (
                <SwiperSlide key={key}>
                  <div className="py-4">
                    <button
                      onClick={() => {
                        setSeason(item.season_number)
                      }}
                      className={`p-4 tracking-wider bg-slate-700 rounded-2xl text-sm xl:text-lg ${
                        getSeason === item.season_number
                          ? " text-[#fbf0f0] font-extrabold"
                          : "text-[#8f8d8d] "
                      }`}
                    >
                      <span>{item.name}</span>
                    </button>
                  </div>
                </SwiperSlide>
              )
            }
          })}
        </Swiper>
      </div>
      {isLoading && (
        <div>
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"20vw"}
            style={{ backgroundColor: "grey", borderRadius: "18px" }}
          />
        </div>
      )}
      {isSuccess && (
        <div>
          <ShowEpisode data={data.data} getSeason={getSeason} id={id} />
        </div>
      )}
    </div>
  )
}

function ShowEpisode({ data }: any) {
  const [getEpisode, setEpisode] = useState(1)
  const [getTagline, setTagline] = useState(data.episodes[0].overview)

  const divImage: any = {
    backgroundImage: `url('No-Image-Placeholder.png')`,
    width: "auto",
    height: "auto",
  }
  return (
    <div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={7}
        slidesPerView={1}
        breakpoints={{
          320: {
            spaceBetween: 10,
            slidesPerView: 2.2,
          },
          481: {
            spaceBetween: 10,
            slidesPerView: 2.8,
          },
          769: {
            spaceBetween: 20,
            slidesPerView: 4.5,
          },
          1025: {
            spaceBetween: 30,
            slidesPerView: 4.7,
          },
          1536: {
            spaceBetween: 40,
            slidesPerView: 5.7,
          },
        }}
        allowTouchMove={true}
        className={`rounded-2xl`}
      >
        {data.episodes.map((item: any, key: any) => {
          return (
            <SwiperSlide key={key}>
              <div
                className={`py-2`}
                onClick={() => {
                  setEpisode(item.episode_number)
                  setTagline(item.overview)
                }}
              >
                <Image
                  style={divImage}
                  src={
                    item.still_path
                      ? `https://image.tmdb.org/t/p/w533_and_h300_bestv2${item.still_path}`
                      : "/No-Image-Placeholder.png"
                  }
                  alt={item.name}
                  width={600}
                  height={400}
                  loading="lazy"
                  className={`rounded-2xl w-auto h-auto cursor-pointer bg-no-repeat bg-cover ${
                    getEpisode === item.episode_number ? "shadow-md" : ""
                  } shadow-slate-300`}
                ></Image>
                <div className="py-3 text-[#fbf0f0]">{item.name}</div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className=" text-center py-[5rem] text-[#8f8d8d] italic">
        {getTagline}
      </div>
    </div>
  )
}

function CastDetails({ credits }: any) {
  return (
    <div>
      <div className="text-[#afa2ee] text-xl">Cast & Crew</div>
      <Swiper
        modules={[Navigation]}
        grabCursor={true}
        spaceBetween={5}
        slidesPerView={1}
        breakpoints={{
          320: {
            spaceBetween: 10,
            slidesPerView: 2.5,
          },
          481: {
            spaceBetween: 10,
            slidesPerView: 3.5,
          },
          769: {
            spaceBetween: 10,
            slidesPerView: 3.5,
          },
          1025: {
            spaceBetween: 5,
            slidesPerView: 4.5,
          },
          1536: {
            spaceBetween: 5,
            slidesPerView: 4.5,
          },
        }}
        allowTouchMove={true}
        className={`rounded-2xl`}
      >
        {credits.cast.map((item: any, key: any) => {
          if (item && item.profile_path) {
            return (
              <SwiperSlide key={key}>
                <div className=" py-2">
                  <Image
                    src={`https://www.themoviedb.org/t/p/w138_and_h175_face${item.profile_path}`}
                    alt={item.name}
                    width={150}
                    height={170}
                    loading="lazy"
                    className="rounded-2xl"
                  ></Image>
                  <div>
                    <div className="text-[#fbf0f0]">{item.name}</div>
                    <div className=" text-slate-500">{item.character}</div>
                  </div>
                </div>
              </SwiperSlide>
            )
          }
        })}
        {credits.crew.map((item: any, key: any) => {
          if (item && item.profile_path) {
            return (
              <SwiperSlide key={key}>
                <div className=" py-2">
                  <Image
                    src={`https://www.themoviedb.org/t/p/w138_and_h175_face${item.profile_path}`}
                    alt={item.name}
                    width={150}
                    height={170}
                    loading="lazy"
                    className=" rounded-2xl"
                  ></Image>
                  <div>
                    <div>{item.name}</div>
                    <div className=" text-slate-500">
                      {item.known_for_department}
                    </div>
                    <div className="text-slate-500">{`(${item.job})`}</div>
                  </div>
                </div>
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
    </div>
  )
}

function RecomendationGenre({ type, id }: any) {
  const dynamicData = async ({ pageParam }: any) => {
    try {
      const sendParams = {
        type: type,
        id: id,
        page: pageParam,
      }
      const dynamicData = await axios.get("/api/media/ott/details/similar", {
        params: sendParams,
      })

      return dynamicData.data
    } catch (error) {
      return null
    }
  }
  const {
    data,
    isLoading,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [type + "/similar/" + id],
    queryFn: dynamicData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.length ? pages.length + 1 : undefined
      return nextPage
    },
    staleTime: 1000 * 60 * 60,
  })

  if (isLoading) {
    return (
      <div className="px-5">
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"20vw"}
          style={{ backgroundColor: "grey", borderRadius: "18px" }}
        />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="w-[90%] m-auto">
        <div className=" uppercase reccomendation_text_colour text-center text-4xl">
          More Like this
        </div>
        <div className=" py-7">
          <div className="relative">
            <div>
              {data.pages.map((page, i) => {
                return (
                  <div
                    key={i}
                    className="grid justify-items-center gap-5 grid-cols-[auto_auto_auto]"
                  >
                    {page &&
                      page.map((item: any, key: any) => {
                        if (item) {
                          return (
                            <div key={key}>
                              <div className=" py-2">
                                <Link
                                  href={`/watch/${removeSpace(
                                    item.title
                                  )}?${type}=${item.id}`}
                                >
                                  <Image
                                    src={item.poster}
                                    alt={item.title}
                                    width={500}
                                    height={600}
                                    loading="lazy"
                                    className=" rounded-2xl w-auto h-auto"
                                  ></Image>
                                </Link>
                              </div>
                            </div>
                          )
                        }
                      })}
                  </div>
                )
              })}
            </div>
            {isFetchingNextPage && (
              <div className="flex justify-center">
                <CircularProgress />
              </div>
            )}
            {hasNextPage && (
              <div>
                <div className="absolute w-full bottom-0">
                  <div className=" bg-slate-400 opacity-70 h-16"></div>
                </div>
                <div className=" absolute w-full bottom-0">
                  <div className="text-white flex justify-center h-16">
                    <button
                      onClick={() => fetchNextPage()}
                      className=" bg-[#303233] px-8"
                    >
                      MORE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  )
}

//END----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Start-----------------------------------------------------------------Search Query-------------------------------------------------------------------------------------------------------------

function SearchQuery() {
  const [getQuery, setQuery] = useState("")

  useEffect(() => {
    console.log("Search input mounted")

    return () => {
      console.log("Search input unmounted")
    }
  })
  return (
    <div className=" pt-[3em] w-[90%] m-auto ">
      <div className="flex justify-center">
        <div className=" w-full lg:w-1/2 relative">
          <input
            type="text"
            name="query"
            value={getQuery}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            autoComplete="off"
            placeholder="What's on your mind ?"
            className=" py-4 px-5 rounded-3xl w-full text-[#141414] text-xl bg-slate-100"
          />
          <span
            className=" absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              setQuery("")
            }}
          >
            <CloseIcon style={{ color: "#141414" }} />
          </span>
        </div>
      </div>
      <div className=" pt-[5em]">
        <SearchArea getQuery={getQuery} />
      </div>
    </div>
  )
}

function SearchArea({ getQuery }: any) {
  // const searchRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    console.log("SearchArea input mounted")

    return () => {
      console.log("SearchArea input unmounted")
    }
  })
  const initialDataFunc = async () => {
    try {
      const sendMovieParams = {
        type: "movie",
        find: "popularity",
        genre: "null",
        year: "2023",
        page: "1",
      }
      const dynamicMovieData = await axios.get("/api/media/ott/locate", {
        params: sendMovieParams,
      })
      const sendTvParams = {
        type: "tv",
        find: "popularity",
        genre: "null",
        year: "2023",
        page: "1",
      }
      const dynamicTvData = await axios.get("/api/media/ott/locate", {
        params: sendTvParams,
      })
      return dynamicMovieData.data.concat(dynamicTvData.data)
    } catch (error) {
      return null
    }
  }

  const searchQueryFunc = async () => {
    if (getQuery.length === 0) {
      const getData = await initialDataFunc()
      return getData
    }
    try {
      const sendMovieParams = {
        query: getQuery,
      }
      const dynamicData = await axios.get("/api/media/ott/search", {
        params: sendMovieParams,
      })

      return dynamicData.data
    } catch (error) {
      return null
    }
  }

  // const startSearchOptimal = ()=>{
  //   if(searchRef.current){
  //     clearTimeout(searchRef.current)
  //   }
  //   const id =
  // }

  const { data, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["query/" + getQuery],
    queryFn: searchQueryFunc,
    staleTime: 1000 * 60 * 60,
  })

  if (isLoading || isFetching) {
    return (
      <div className=" min-h-screen flex justify-center items-center">
        <div>
          <CircularProgress />
        </div>
      </div>
    )
  }

  return (
    <div className="grid justify-items-center gap-5 grid-cols-[auto_auto_auto] lg:grid-cols-[auto_auto_auto_auto]">
      {data &&
        data.length > 0 &&
        data.map((item: any, key: any) => {
          if (item) {
            return (
              <div key={key}>
                <div className=" py-2">
                  <Link
                    href={`/watch/${removeSpace(item.title)}?${item.type}=${
                      item.id
                    }`}
                  >
                    <Image
                      src={item.poster}
                      alt={item.title}
                      width={500}
                      height={600}
                      loading="lazy"
                      className=" rounded-2xl w-auto h-auto"
                    ></Image>
                  </Link>
                </div>
              </div>
            )
          }
        })}
    </div>
  )
}

//END----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Start-----------------------------------------------------------------News Section-------------------------------------------------------------------------------------------------------------

function NewsSlider() {
  const divImage: any = {
    backgroundImage: `url('No-Image-Placeholder.png')`,
  }
  const [getData, setData]: any = useState([])
  const dynamicData = async ({ pageParam }: any) => {
    try {
      const sendParams = {
        country: "in",
        page: pageParam,
      }
      const dynamicData = await axios.get("/api/media/news/article", {
        params: sendParams,
      })

      return dynamicData.data.articles
    } catch (error) {
      return null
    }
  }
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["articleSection"],
    queryFn: dynamicData,
    staleTime: 1000 * 60 * 60,
  })

  if (isLoading) {
    return (
      <div className="px-5">
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"20vw"}
          style={{ backgroundColor: "grey", borderRadius: "1rem" }}
        />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div>
        <div className=" w-[95%] md:w-[50%] m-auto relative">
          <Swiper
            direction={"vertical"}
            className="mySwiper"
            style={{ height: "85vh" }}
          >
            {data.map((item: any, key: any) => {
              return (
                <SwiperSlide key={key}>
                  <div className=" bg-[#d3dfff] text-black rounded-[18px] h-full">
                    <div>
                      <img
                        style={divImage}
                        className=" rounded-t-[18px] bg-no-repeat bg-cover w-auto md:h-auto h-[11rem]"
                        src={
                          item.urlToImage
                            ? item.urlToImage
                            : "/No-Image-Placeholder.png"
                        }
                        alt={"MediaVerse"}
                        loading="lazy"
                        placeholder="/No-Image-Placeholder.png"
                      />
                    </div>
                    <div className="p-[3em]">
                      <Link href={item.url || "/"} target="_blank">
                        <div className=" font-extrabold underline text-black hover:text-blue-600 text-2xl md:text-3xl">
                          {item.title}
                        </div>
                      </Link>
                      <div className=" pt-5 italic text-2xl">
                        {item.content}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className=" absolute bottom-0 left-[45%] z-10 animate-bounce opacity-50">
            <ArrowDropDownIcon
              style={{ color: "red", width: "4rem", height: "4rem" }}
            />
          </div>
        </div>
      </div>
    )
  }
}

//END----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export {
  RewindSwiper,
  HorizontalList,
  NewsLayoutOne,
  ListByGenre,
  Theatre,
  SearchQuery,
  NewsSlider,
}
