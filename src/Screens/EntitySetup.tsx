import { useState } from "react"
import { Accordian, ScoreBordaText } from "../components"
import TagInput from "../components/TagInput"
import { Candidate, Feature } from "../state/BordaEntities"
import { BordaAction } from "../state/BordaReducer"

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
  dispatch: React.Dispatch<BordaAction>
  confirm: () => void
}

export default function EntitySetup({
  features,
  candidates,
  dispatch,
  confirm,
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
              type: "ADD_FEATURE",
              payload: { name, score: 0 },
            })
          }
          remove={(name) =>
            dispatch({ type: "REMOVE_FEATURE", payload: { name } })
          }
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
              type: "ADD_CANDIDATE",
              payload: { name, features: [], score: 0 },
            })
          }
          remove={(name) =>
            dispatch({ type: "REMOVE_CANDIDATE", payload: { name } })
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
          onClick={confirm}
        >
          Go To Calibration
        </button>
      </div>
    </div>
  )
}
