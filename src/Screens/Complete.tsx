import { Borda, BordaAction, StageAction } from "../state/fcborda"

type CompleteProps = {
  borda: Borda
  dispatch: React.Dispatch<BordaAction<StageAction>>
}

// TODO turn start over into a modal
export default function Complete({ borda, dispatch }: CompleteProps) {
  return (
    <div className="screen complete">
      <header>
        <h2>
          <span className="main">Borda</span> Complete!
        </h2>
        <p className="hide-mobile">
          The <span className="main italic">Features</span> have been
          calibrated.{" "}
        </p>
        <p className="hide-mobile">
          The <span className="main italic">Candidates</span> have been
          scored.{" "}
        </p>
      </header>
      <section className="results">
        <h3>
          The <span className="main">Results</span>
        </h3>
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {borda.candidates
              .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
              .map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      <div className="buttons">
        <button
          onClick={() => {
            /* TODO borda save */
          }}
        >
          Save Results
        </button>
        <button
          className="invert"
          onClick={() => dispatch({ type: "STAGE_FIRST_WITH_RESET" })}
        >
          Start Over With the Same Settings
        </button>
        <button className="accent">Start Over With New Settings</button>
      </div>
    </div>
  )
}
