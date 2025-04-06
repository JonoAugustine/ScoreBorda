import Link from "next/link"

export default function Home() {
  return (
    <div className="page home">
      <header>
        <h1>{""}</h1>
        <h4>The ultimate decision making tool for the troubled mind</h4>
      </header>
      <main>
        <p>
          SB scores Features and Candidates through a series of binary choices.
          By presenting only two options in each comparison, SB is able to
          remove many of the overwhelming aspects of comparing several choices
          at once
        </p>
        <Link href="/borda">
          <button>Start</button>
        </Link>
      </main>
    </div>
  )
}
