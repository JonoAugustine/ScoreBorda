import { Footer, Navbar } from "@/components"
import { MalUserProvider } from "@/state/malborda"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import type { Metadata } from "next"
import "../style/index.scss"

config.autoAddCss = false

export const metadata: Metadata = {
  title: "ScoreBorda",
  description: "The ultimate decision making tool for the troubled mind",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <MalUserProvider>
          <Navbar />
          {children}
          <Footer />
        </MalUserProvider>
      </body>
    </html>
  )
}
