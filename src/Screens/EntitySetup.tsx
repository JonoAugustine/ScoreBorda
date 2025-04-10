import { useState } from "react"
import TagInput from "../components/TagInput"
import { Candidate, Feature } from "../state/BordaEntities"

type EntitySetupProps = {
  features: Feature[]
  candidates: Candidate[]
  addFeature: (name: string) => void
  removeFeature: (name: string) => void
  addCandidate: (name: string) => void
  removeCandidate: (name: string) => void
  confirm: () => void
}

type EntitySetupSectionProps = {
  title: string
  values: string[]
  add: (name: string) => void
  remove: (name: string) => void
  isActive: boolean
  id: string
  children: React.ReactNode
}

function EntitySetupSection({
  title,
  values,
  add,
  remove,
  isActive,
  id,
  children,
}: EntitySetupSectionProps) {
  return (
    <section className="setup" id={id} data-active={isActive}>
      <h3>{title}</h3>
      <p>{children}</p>
      <TagInput
        name={`Add ${title}...`}
        values={values}
        add={add}
        remove={remove}
      />
    </section>
  )
}

export default function EntitySetup(props: EntitySetupProps) {
  const {
    features,
    candidates,
    addFeature,
    removeFeature,
    addCandidate,
    removeCandidate,
    confirm,
  } = props

  const [view, setView] = useState<"features" | "candidates">("features")

  return (
    <div className="screen entity-setup">
      <section className="setup-container">
        <EntitySetupSection
          title="Features"
          isActive={view === "features"}
          values={features.map((e) => e.name)}
          add={addFeature}
          remove={removeFeature}
          id="feature-setup"
        >
          Features help SB understand what is most important to you. They can be
          anything from red to votes for president of space to likes kittens; as
          long as it describes some aspect of a candidate, it is a valid
          feature.
        </EntitySetupSection>
        <EntitySetupSection
          title="Candidates"
          isActive={view === "candidates"}
          values={candidates.map((e) => e.name)}
          add={addCandidate}
          remove={removeCandidate}
          id="candidate-setup"
        >
          Whether people, clothes, insurance plans, or quite literally anything
          else. SB works to aid you in understanding how you feel about these
          candidates.
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
          Confirm
        </button>
      </div>
    </div>
  )
}
