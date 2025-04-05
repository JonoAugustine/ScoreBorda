import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../style/index.scss"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="root-header">
          <h1>ScoreBorda</h1>
          <p>The ultimate decision making tool for the troubled mind</p>
        </header>
        {children}
        <footer className="page-footer">
          <a
            href="https://jonoaugustine.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {""}
          </a>
        </footer>
      </body>
    </html>
  )
}
