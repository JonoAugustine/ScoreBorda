import Link from "next/link"
import { NavMalProfileSection } from "./NavMalProfileSection"

export function Navbar() {
  return (
    <nav className="navbar">
      <header>
        <Link href="/">
          <h1>{""}</h1>
        </Link>
      </header>
      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <Link href="/borda">FC Borda</Link>
          </li>
          <li>
            <Link href="/malborda">MAL Borda</Link>
          </li>
        </ul>
        <NavMalProfileSection />
      </div>
    </nav>
  )
}
