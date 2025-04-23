"use client"

import { EntitySetup, FeatureCalibration } from "@/Screens"
import { Borda, BordaStage } from "@/state/Borda"
import { BordaCtx, BordaDispatchCtx } from "@/state/BordaContext"
import { Feature } from "@/state/BordaEntities"
import { BordaIterable } from "@/state/BordaIterable"
import { BordaAction } from "@/state/BordaReducer"
import { Dispatch, useContext, useEffect } from "react"

export default function BordaPage() {
  const borda = useContext(BordaCtx)!
  const dispatch: Dispatch<BordaAction> = useContext(BordaDispatchCtx)!

  useEffect(() => console.log(borda), [borda])

  return ScreenController(borda, dispatch)
}

/** Renders the appropriate borda screen based on the state. */
function ScreenController(borda: Borda, dispatch: React.Dispatch<any>) {
  const confirm = () => dispatch({ type: "NEXT_STATE" })
  const back = () => dispatch({ type: "LAST_STATE" })
  const reset = () => dispatch({ type: "RESET" })

  switch (borda.stage) {
    case BordaStage.CALIBRATION:
      return (
        <FeatureCalibration
          iterable={new BordaIterable<Feature>(borda.features, true)}
          increaseFeatureScore={(name, value) =>
            dispatch({
              type: "INCREASE_FEATURE_SCORE",
              payload: { name, value },
            })
          }
          onComplete={confirm}
          cancel={back}
          restart={() => {
            dispatch({ type: "RESET" })
          }}
        />
      )
    // TODO case BordaState.SCORING:
    // TODO case BordaState.COMPLETE:
    case BordaStage.SETUP:
      return (
        <EntitySetup
          features={borda.features}
          candidates={borda.candidates}
          addFeature={(name) =>
            dispatch({
              type: "ADD_FEATURE",
              payload: { name, score: 0 },
            })
          }
          removeFeature={(name) =>
            dispatch({ type: "REMOVE_FEATURE", payload: { name } })
          }
          addCandidate={(name) =>
            dispatch({
              type: "ADD_CANDIDATE",
              payload: { name, features: [], score: 0 },
            })
          }
          removeCandidate={(name) =>
            dispatch({ type: "REMOVE_CANDIDATE", payload: { name } })
          }
          confirm={confirm}
        />
      )
    default:
      return (
        <div>
          <h1>Unknown state: {borda.stage}</h1>
          <button onClick={back}>back</button>
          <button onClick={reset}>Reset</button>
        </div>
      )
  }
}
