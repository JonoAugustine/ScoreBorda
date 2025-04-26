"use client"

import { useState } from "react"
import {
  BordaAction,
  BordaIterable,
  Candidate,
  CandidateAction,
  Feature,
  StageAction,
} from "../state"

type ScoringProps = {
  candidates: Candidate[]
  features: Feature[]
  dispatch: React.Dispatch<BordaAction<CandidateAction | StageAction>>
}

// TODO option to have features in random order.
// e.g. F1 -> F2 -> F1 -> F4 -> F5 -> F1
export default function Scoring({
  candidates,
  features,
  dispatch,
}: ScoringProps) {
  const [featureIndex, setFeatureIndex] = useState(0)
  const [iterable, setIterable] = useState<BordaIterable<Candidate>>(
    new BordaIterable<Candidate>(candidates, true)
  )
  const [left, setLeft] = useState<Candidate>(iterable.currentPair[0])
  const [right, setRight] = useState<Candidate>(iterable.currentPair[1])

  const nextPair = () => {
    if (iterable.hasNext) {
      // next candidate pair
      const [_left, _right] = iterable.step()
      setLeft(_left)
      setRight(_right)
    } else if (featureIndex >= features.length - 1) {
      // if all candidates have scored all features,
      // move to the next stage
      dispatch({ type: "STAGE_NEXT" })
    } else {
      // once all candidates have scored the current feature,
      // move to the next feature
      setFeatureIndex(featureIndex + 1)
      setIterable(new BordaIterable<Candidate>(candidates, true))
      const [_left, _right] = iterable.step()
      setLeft(_left)
      setRight(_right)
    }
    console.log(
      "total steps",
      iterable.totalSteps,
      "remaining steps",
      iterable.stepsRemaining
    )
  }

  const featureScoreUp = (name: string, value: number) =>
    dispatch({
      type: "CANDIDATE_FEATURE_SCORE_UP",
      payload: { name, value },
    })

  const addToLeft = () => {
    featureScoreUp(left.name, 1)
    nextPair()
  }

  const addToRight = () => {
    featureScoreUp(right.name, 1)
    nextPair()
  }

  return (
    <div className="screen scoring">
      <header>
        <h2>
          Candidate Scoring:{" "}
          <span className="main text-no-wrap">
            {features[featureIndex].name}
          </span>
        </h2>
        <p>
          Click which Candidate is prefered for{" "}
          <span className="main text-no-wrap">
            {features[featureIndex].name}
          </span>
          .
        </p>
        <p className="underline">Go with your first instinct.</p>
      </header>
      <section className="calibration-buttons">
        <button onClick={addToLeft}>{left.name}</button>
        <button onClick={addToRight}>{right.name}</button>
      </section>
    </div>
  )
}
