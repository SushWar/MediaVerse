const pages = [
  {
    name: "Home",
    link: "/",
    openPage: false,
  },
  {
    name: "Movies",
    link: "/movies",
    openPage: false,
  },
  {
    name: "TV Shows",
    link: "/tv",
    openPage: false,
  },
  {
    name: "Reel Talk",
    link: "/entertainmentnews",
    openPage: false,
  },
]

const homeLayout = [
  {
    func: `<RewindSwiper type={"movie"} find={"popularity"} genre={"null"} page={"1"}/>`,
  },
  {
    func: `<HorizontalList type={"movie"} find={"revenue"} genre={"null"} page={"1"} listHead = {"Today's Hot Picks"}/>`,
  },
  {
    func: `<NewsLayoutOne country={"in"} pages={"1"} />`,
  },
]

export { pages, homeLayout }
