import NewsSection from "@/components/news/news"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Celeb Scoop: Uncover the Hottest Celebrity Gossip`,
    description: `Stay ahead of the curve with MediaVerse's Entertainment Buzz, your one-stop shop for the latest industry news, hottest celebrity gossip, and exclusive insights into the world of entertainment. 
    Get daily updates on upcoming releases, award shows, red carpet events, and everything in between. 
    Plus, uncover the latest celebrity trends, controversies, and behind-the-scenes stories that will keep you entertained and informed.`,
  }
}

export default function EntertainmentNews() {
  return (
    <div>
      <NewsSection />
    </div>
  )
}
