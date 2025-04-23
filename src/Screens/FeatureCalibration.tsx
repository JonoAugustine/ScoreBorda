import { useState } from "react"
import { Feature } from "../state/BordaEntities"
import { BordaIterable } from "../state/BordaIterable"
import { BordaAction } from "../state/BordaReducer"

type FeatureCalibrationProps = {
  features: Feature[]
  dispatch: React.Dispatch<BordaAction>
  onComplete: () => void
  cancel: () => void
  restart: () => void
}

export default function FeatureCalibration({
  features,
  // TODO refactor restart
  restart,
  cancel,
  dispatch,
  onComplete,
}: FeatureCalibrationProps) {
  const [iterable] = useState<BordaIterable<Feature>>(
    new BordaIterable<Feature>(features, true)
  )
  const [left, setLeft] = useState<Feature>(iterable.currentPair[0])
  const [right, setRight] = useState<Feature>(iterable.currentPair[1])

  const nextPair = () => {
    if (iterable.hasNext) {
      const [_left, _right] = iterable.step()
      setLeft(_left)
      setRight(_right)
      console.log(
        "steps",
        iterable.totalSteps,
        "remaining",
        iterable.stepsRemaining
      )
    } else {
      onComplete()
    }
  }

  const increaseFeatureScore = (name: string, value: number) =>
    dispatch({
      type: "INCREASE_FEATURE_SCORE",
      payload: { name, value },
    })

  const addToLeft = () => {
    increaseFeatureScore(left.name, 1)
    nextPair()
  }

  const addToRight = () => {
    increaseFeatureScore(right.name, 1)
    nextPair()
  }

  // TODO hide buttons when no more pairs
  return (
    <div className="screen calibration">
      <h1>Feature Calibration</h1>
      <p>Click which feature is more important to you</p>
      <section className="calibration-buttons">
        <button onClick={addToLeft}>{left.name}</button>
        <button onClick={addToRight}>{right.name}</button>
      </section>
      <div className="progress-buttons">
        <button
          onClick={restart}
          style={{ alignSelf: "flex-start" }}
          className="invert"
        >
          Restart Calibration
        </button>
        <button
          onClick={cancel}
          style={{ alignSelf: "flex-start" }}
          className="invert"
        >
          Back to Setup
        </button>
      </div>
    </div>
  )
}
