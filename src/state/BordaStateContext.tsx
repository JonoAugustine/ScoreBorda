import { Dispatch, useState, SetStateAction, createContext } from "react"
import BordaState from "./BordaState"
import { Feature, Candidate, Round } from "../models"

export type BordaStateCtxType = {
  features: Feature[]
  setFeatures: Dispatch<SetStateAction<Feature[]>>
  addFeature: (featureName: string) => void
  removeFeature: (featureName: string) => void
  candidates: Candidate[]
  setCandidates: Dispatch<SetStateAction<Candidate[]>>
  addCandidate: (candidateName: string) => void
  removeCandidate: (candidateName: string) => void
  state: string
  nextState: () => string
  lastState: () => string
  reset: () => void
  iterable: Iterable<any> | null
  setIterable: Dispatch<SetStateAction<Iterable<any> | null>>
}

export const BordaStateCtx = createContext<BordaStateCtxType | null>(null)

export const BordaStateContextProvider = (props) => {
  const [features, setFeatures] = useState<Feature[]>([])

  const [candidates, setCandidates] = useState<Candidate[]>([])

  const [state, setState] = useState<string>(BordaState.SETUP.FEATURES)

  // TODO change name to iterator
  const [iterable, setIterable] = useState<Iterable<any> | null>(null)

  /** Start a new round */
  const reset = () => {
    setFeatures([])
    setCandidates([])
    setState(BordaState.SETUP.FEATURES)
  }

  const addFeature = (featureName: string) => {
    setFeatures([...features, new Feature(featureName)])
  }

  const addCandidate = (candidateName: string) => {
    setCandidates([...candidates, new Candidate(candidateName)])
  }

  const removeFeature = (featureName: string) => {
    setFeatures(features.filter((n) => n.name !== featureName))
  }

  const removeCandidate = (candidateName: string) => {
    setCandidates(candidates.filter((n) => n.name !== candidateName))
  }

  const nextState = () => {
    const map = BordaState.flatMap()
    let index = map.indexOf(state)

    if (index < map.length) {
      setState(map[index + 1])
    } else throw "No next state"

    return map[index + 1]
  }

  const lastState = () => {
    const map = BordaState.flatMap()
    let index = map.indexOf(state)

    if (index > 0) {
      setState(map[index - 1])
    } else throw "No previous state"

    return map[index - 1]
  }

  console.log(state)

  return (
    <BordaStateCtx.Provider
      value={{
        features,
        setFeatures,
        addFeature,
        removeFeature,
        candidates,
        setCandidates,
        addCandidate,
        removeCandidate,
        state,
        nextState,
        lastState,
        reset,
        iterable,
        setIterable,
      }}
    >
      {props.children}
    </BordaStateCtx.Provider>
  )
}
