import type { Metadata } from "next"
import "../style/index.scss"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import Link from "next/link"
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
        <nav className="navbar">
          <header className="page-header">
            <Link href="/">
              <h1>{""}</h1>
            </Link>
          </header>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/borda">Borda</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
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
