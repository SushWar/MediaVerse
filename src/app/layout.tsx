import type { Metadata } from "next"
import { Inter, Kanit, Noto_Serif_Balinese } from "next/font/google"
import "./globals.css"
import NavPanel from "@/components/header/navPanel"
import Footer from "@/components/footer/footer"
import TanstackProvider from "@/lib/ReactQueryProvider/ReactQuery"

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
})

const navpanel = Noto_Serif_Balinese({
  subsets: ["latin"],
  weight: "400",
})
const customFont = Kanit({
  subsets: ["latin"],
  weight: "500",
})

export const metadata: Metadata = {
  title: "MediaVerse - Stream Movies, TV Shows, and Entertainment News",
  description: `Experience entertainment like never before with MediaVerse, your gateway to a world of captivating stories, thrilling adventures, and endless laughs. 
    Stream your favorite movies and TV shows whenever, wherever you want, and discover new gems that will keep you coming back for more. 
    Plus, stay informed and entertained with our daily dose of entertainment news, curated to bring you the most exciting stories from the world of entertainment`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <TanstackProvider>
          <header className={`${navpanel.className}`}>
            <NavPanel />
          </header>
          <main className={`${customFont.className}`}>{children}</main>
          <footer>
            <Footer />
          </footer>
        </TanstackProvider>
      </body>
    </html>
  )
}
