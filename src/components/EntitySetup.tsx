import TagInput from "./TagInput"

type EntitySetupProps = {
  /** The type of entity to setup */
  entityType: "feature" | "candidate"
  /** The list of entities */
  entities: Array<{ name: string; score?: number }>
  /** The function to add an entity */
  addEntity: (entityName: string) => void
  /** The function to remove an entity */
  removeEntity: (entityName: string) => void
  /** The function to confirm the setup */
  confirm: () => void
  /** The function to go back to the previous state */
  back: () => void
  /** The function to reset the setup */
  reset: () => void
}

export default function EntitySetup(props: EntitySetupProps) {
  const {
    entityType,
    entities,
    addEntity,
    removeEntity,
    confirm,
    back,
    reset,
  } = props

  return (
    <div>
      <header>
        <h2>
          <span>Add </span>
          <span>{entityType}</span>
        </h2>
        {entityType === "feature" ? (
          <p>
            Features help SB understand what is most important to you. They can
            be anything from red to votes for president of space to likes
            kittens; as long as it describes some aspect of a candidate, it&aposs a
            valid feature.
          </p>
        ) : (
          <p>
            Whether people, clothes, insurance plans, or quite literally
            anything else. SB works to aid you in understanding how you feel
            about about these candidates.
          </p>
        )}
      </header>
      <TagInput
        name={`Add ${entityType}...`}
        values={entities.map((e) => e.name)}
        add={addEntity}
        remove={removeEntity}
      />
      <button onClick={confirm}>Confirm</button>
      <button onClick={back} className="invert">Back</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
