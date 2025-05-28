import { useEffect, useState } from "react"
import {
  BordaAction,
  BordaIterable,
  Feature,
  FeatureAction,
  StageAction,
} from "../state"

type FeatureCalibrationProps = {
  features: Feature[]
  dispatch: React.Dispatch<BordaAction<FeatureAction | StageAction>>
}

export default function Calibration({
  features,
  dispatch,
}: FeatureCalibrationProps) {
  const [iterable, setIterable] = useState<BordaIterable<Feature>>(
    new BordaIterable<Feature>(features, true)
  )
  const [left, setLeft] = useState<Feature>(iterable.currentPair[0])
  const [right, setRight] = useState<Feature>(iterable.currentPair[1])

  useEffect(() => {
    dispatch({ type: "FEATURE_WEIGHT_CLEAR_ALL" })
    setLeft(iterable.currentPair[0])
    setRight(iterable.currentPair[1])
  }, [iterable])

  const nextPair = () => {
    if (iterable.hasNext) {
      const [_left, _right] = iterable.step()
      setLeft(_left)
      setRight(_right)
      console.log(
        "total steps",
        iterable.totalSteps,
        "remaining steps",
        iterable.stepsRemaining
      )
    } else {
      dispatch({ type: "STAGE_NEXT" })
    }
  }

  const featureWeightUp = (name: string, value: number) =>
    dispatch({
      type: "FEATURE_WEIGHT_UP",
      payload: { name, value },
    })

  const addToLeft = () => {
    featureWeightUp(left.name, 1)
    nextPair()
  }

  const addToRight = () => {
    featureWeightUp(right.name, 1)
    nextPair()
  }

  const restart = () => {
    setIterable(new BordaIterable<Feature>(features, true))
  }

  const backToSetup = () => {
    dispatch({ type: "FEATURE_WEIGHT_CLEAR_ALL" })
    dispatch({ type: "STAGE_BACK" })
  }

  return (
    <div className="screen calibration">
      <header>
        <h2>Feature Calibration</h2>
        <p>Click which feature is more important to you.</p>
        <p className="underline">Go with your first instinct.</p>
      </header>
      <section className="calibration-buttons">
        <button onClick={addToLeft}>{left.name}</button>
        <button onClick={addToRight}>{right.name}</button>
      </section>
      <div className="progress-buttons">
        <button
          onClick={backToSetup}
          style={{ alignSelf: "flex-start" }}
          className="warn"
        >
          Back to Setup
        </button>
        <button
          onClick={restart}
          style={{ alignSelf: "flex-start" }}
          className="invert"
        >
          Restart
        </button>
      </div>
    </div>
  )
}
