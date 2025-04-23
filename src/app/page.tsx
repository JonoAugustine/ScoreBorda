import Link from "next/link"
import { ScoreBordaText } from "../components"

export default function Home() {
  return (
    <div className="page home">
      <header>
        <h1>
          The <span className="highlight-ultimate">Ultimate</span> Decision
          Making Tool for the{" "}
          <span className="highlight-troubled">Troubled Mind</span>
        </h1>
        <div className="divisor">{""}</div>
      </header>
      <main>
        <p>
          <ScoreBordaText /> calibrates and scores
          <span className="italic"> Features</span> &
          <span className="italic"> Candidates</span> through a series of binary
          choices, removing the overwhelming burden of comparing several choices
          at once.
        </p>
        <Link className="link-button" href="/borda">
          Start
        </Link>
      </main>
    </div>
  )
}
