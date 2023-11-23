import MovieSection from "@/components/movie/movie"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Movieverse: Your Gateway to Timeless Stories`,
    description: `From heartwarming comedies to action-packed blockbusters, 
    there's something for every movie enthusiast to discover. Explore timeless classics and uncover hidden gems as you immerse yourself in the captivating world of cinema.`,
  }
}

export default function Movies() {
  return (
    <div>
      <MovieSection />
    </div>
  )
}
