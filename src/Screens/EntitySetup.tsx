import { useState } from "react"
import { Accordian, ScoreBordaText, TagInput } from "../components"
import { FCBordaAction, Candidate, Feature } from "../state/fcborda"

type EntitySetupSectionProps = {
  title: string
  values: string[]
  add: (name: string) => void
  remove: (name: string) => void
  isActive: boolean
  id: string
  children: React.ReactNode
}

function EntitySetupSection(props: EntitySetupSectionProps) {
  return (
    <section className="setup" id={props.id} data-active={props.isActive}>
      <h2>{props.title}</h2>
      <Accordian title={`What are ${props.title}?`}>
        <p>{props.children}</p>
      </Accordian>
      <TagInput
        name={`Add ${props.title}...`}
        values={props.values}
        add={props.add}
        remove={props.remove}
      />
    </section>
  )
}

type EntitySetupProps = {
  features: Feature[]
  candidates: Candidate[]
  dispatch: React.Dispatch<FCBordaAction>
}

export default function EntitySetup({
  features,
  candidates,
  dispatch,
}: EntitySetupProps) {
  const [view, setView] = useState<"features" | "candidates">("features")

  return (
    <div className="screen entity-setup">
      <section className="setup-container">
        <EntitySetupSection
          id="feature-setup"
          title="Features"
          isActive={view === "features"}
          values={features.map((e) => e.name)}
          add={(name) =>
            dispatch({
              type: "FEATURE_NEW",
              payload: { name, weight: 0 },
            })
          }
          remove={(name) => dispatch({ type: "FEATURE_REMOVE", payload: name })}
        >
          <span className="italic">Features</span> help <ScoreBordaText />{" "}
          understand what{"'"}s most important to you. They can be anything from
          colors to presidential endorsments.
        </EntitySetupSection>
        <EntitySetupSection
          id="candidate-setup"
          title="Candidates"
          isActive={view === "candidates"}
          values={candidates.map((e) => e.name)}
          add={(name) =>
            dispatch({
              type: "CANDIDATE_NEW",
              payload: { name, score: 0 },
            })
          }
          remove={(name) =>
            dispatch({ type: "CANDIDATE_REMOVE", payload: name })
          }
        >
          People, clothes, insurance plans, or quite literally anything else.{" "}
          <ScoreBordaText /> works to aid you in understanding how you feel
          about these <span className="italic">Candidates</span>.
        </EntitySetupSection>
      </section>
      <div className="progress-buttons">
        <button
          className="accent"
          id="toggle-view"
          onClick={() =>
            setView(view === "features" ? "candidates" : "features")
          }
        >
          {view === "features" ? "Set Candidates" : "Set Features"}
        </button>
        <button
          hidden={features.length < 2 || candidates.length < 2}
          id="confirm"
          disabled={features.length < 2 || candidates.length < 2}
          onClick={() => dispatch({ type: "STAGE_NEXT" })}
        >
          Go To Calibration
        </button>
      </div>
    </div>
  )
}
