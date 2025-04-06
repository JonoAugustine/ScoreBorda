import React, { Dispatch, SetStateAction, createContext, useState } from "react"
import { Candidate, Feature } from "../models"
import { BordaEntity } from "../models/BordaEntities"

const BordaState = {
  SETUP: {
    FEATURES: "Features",
    CANDIDATES: "Candidates",
    CONFIRM: "Confirm",
  },
  RUNNING: {
    CALIBRATION: "Calibration",
    SCORING: "Scoring",
  },
  COMPLETE: "Complete",
  flatMap: function (): string[] {
    return [
      this.SETUP.FEATURES,
      this.SETUP.CANDIDATES,
      this.SETUP.CONFIRM,
      this.RUNNING.CALIBRATION,
      this.RUNNING.SCORING,
      this.COMPLETE,
    ]
  },
}

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
  setIterable: Dispatch<SetStateAction<Iterable<BordaEntity> | null>>
}

export const BordaStateCtx = createContext<BordaStateCtxType | null>(null)

export const BordaStateCtxProvider = (props: React.PropsWithChildren) => {
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
    setFeatures([...features, { name: featureName, score: 0 }])
  }

  const addCandidate = (candidateName: string) => {
    setCandidates([
      ...candidates,
      { name: candidateName, score: 0, features: [] },
    ])
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
