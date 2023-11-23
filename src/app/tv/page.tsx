import TvShowsSection from "@/components/tv/tvShows"

import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `TVverse: Explore a Universe of Engaging TV Shows`,
    description: `Unleash your inner TV fanatic with MediaVerse's Serial Delights, a treasure trove of captivating TV shows waiting to be discovered. 
    Dive into the world of compelling storylines, unforgettable characters, and captivating plot twists as you navigate through a diverse array of genres, 
    from heartwarming comedies to edge-of-your-seat thrillers.`,
  }
}

export default function TvShows() {
  return (
    <div>
      <TvShowsSection />
    </div>
  )
}
