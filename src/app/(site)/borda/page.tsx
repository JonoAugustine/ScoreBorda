"use client"

import { Calibration, EntitySetup, Scoring } from "@/Screens"
import {
  Borda,
  BordaAction,
  BordaCtx,
  BordaDispatchCtx,
  BordaStage,
} from "@/state"
import { Dispatch, useContext, useEffect } from "react"

export default function BordaPage() {
  const borda = useContext(BordaCtx)!
  const dispatch: Dispatch<BordaAction> = useContext(BordaDispatchCtx)!

  useEffect(() => console.log(borda), [borda])

  return ScreenController(borda, dispatch)
}

/** Renders the appropriate borda screen based on the state. */
function ScreenController(borda: Borda, dispatch: React.Dispatch<BordaAction>) {
  const back = () => dispatch({ type: "STAGE_BACK" })

  switch (borda.stage) {
    case BordaStage.CALIBRATION:
      return <Calibration features={borda.features} dispatch={dispatch} />
    case BordaStage.SCORING:
      // TODO implement scoring screen
      return (
        <Scoring
          features={borda.features}
          candidates={borda.candidates}
          dispatch={dispatch}
        />
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
        />
      )
    default:
      return (
        <div>
          <h1>Unknown state: {borda.stage}</h1>
          <button onClick={back}>back</button>
          <button onClick={() => dispatch({ type: "STAGE_FIRST_WITH_RESET" })}>
            Feature & Candidate Setup
          </button>
        </div>
      )
  }
}
