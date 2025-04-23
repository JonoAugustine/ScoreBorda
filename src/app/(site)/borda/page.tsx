"use client"

import { EntitySetup, FeatureCalibration } from "@/Screens"
import { Borda, BordaStage } from "@/state/Borda"
import { BordaCtx, BordaDispatchCtx } from "@/state/BordaContext"
import { BordaAction } from "@/state/BordaReducer"
import { Dispatch, useContext, useEffect } from "react"

export default function BordaPage() {
  const borda = useContext(BordaCtx)!
  const dispatch: Dispatch<BordaAction> = useContext(BordaDispatchCtx)!

  useEffect(() => console.log(borda), [borda])

  return ScreenController(borda, dispatch)
}

/** Renders the appropriate borda screen based on the state. */
function ScreenController(borda: Borda, dispatch: React.Dispatch<BordaAction>) {
  const confirm = () => dispatch({ type: "NEXT_STATE" })
  const back = () => dispatch({ type: "LAST_STATE" })
  const reset = () => dispatch({ type: "RESET" })

  switch (borda.stage) {
    case BordaStage.CALIBRATION:
      return (
        <FeatureCalibration
          features={borda.features}
          dispatch={dispatch}
          onComplete={confirm}
          cancel={back}
          restart={() => {
            dispatch({ type: "RESET" })
          }}
        />
      )
    case BordaStage.SCORING:
      // TODO implement scoring screen
      return (
        <div>
          <h1>Scoring</h1>
          <p>TODO: Implement scoring screen</p>
          <button onClick={back}>Back</button>
          <button onClick={reset}>Reset</button>
          <button onClick={confirm}>Confirm</button>
        </div>
      )
    case BordaStage.COMPLETE:
      // TODO implement complete screen
      return (
        <div>
          <h1>Complete</h1>
          <p>TODO: Implement complete screen</p>
        </div>
      )
    case BordaStage.SETUP:
      return (
        <EntitySetup
          features={borda.features}
          candidates={borda.candidates}
          dispatch={dispatch}
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
