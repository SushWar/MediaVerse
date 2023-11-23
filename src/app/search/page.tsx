import SearchSection from "@/components/search/search"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Explorer: Find Your Entertainment Treasure`,
    description: `Navigate the world of entertainment with ease using MediaVerse's Content Compass, your personalized guide to finding the perfect content for every mood and occasion. 
    With simple search options and intuitive recommendations, you'll effortlessly discover movies, TV shows, and entertainment news that align with your preferences. 
    Let MediaVerse be your compass as you explore the vast landscape of entertainment.`,
  }
}

export default function Search() {
  return (
    <div>
      <SearchSection />
    </div>
  )
}
