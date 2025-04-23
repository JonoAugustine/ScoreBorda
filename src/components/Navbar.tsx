import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navbar">
      <header>
        <h1>{""}</h1>
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
  )
}
