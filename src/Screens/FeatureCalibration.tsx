import { useState } from "react"
import { Feature } from "../state/BordaEntities"
import { BordaIterable } from "../state/BordaIterable"

type FeatureCalibrationProps = {
  iterable: BordaIterable<Feature>
  increaseFeatureScore: (feature: Feature, value: number) => void
  onComplete: () => void
  cancel: () => void
  restart: () => void
}

export default function FeatureCalibration({
  restart,
  cancel,
  iterable,
  increaseFeatureScore,
  onComplete,
}: FeatureCalibrationProps) {
  const [left, setLeft] = useState<Feature>(iterable.currentPair[0])
  const [right, setRight] = useState<Feature>(iterable.currentPair[1])

  const nextPair = () => {
    if (iterable.hasNext) {
      const [_left, _right] = iterable.step()
      setLeft(_left)
      setRight(_right)
    } else {
      onComplete()
    }
  }

  const addToLeft = () => {
    increaseFeatureScore(left as Feature, 1)
    nextPair()
  }

  const addToRight = () => {
    increaseFeatureScore(right as Feature, 1)
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
