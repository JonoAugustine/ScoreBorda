import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navbar">
      <header>
        <Link href="/">
          <h1>{""}</h1>
        </Link>
      </header>
      <ul className="nav-links">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/borda">New Borda</Link>
        </li>
      </ul>
    </nav>
  )
}
