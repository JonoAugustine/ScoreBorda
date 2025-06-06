"use client"

import { Calibration, Complete, EntitySetup, Scoring } from "@/Screens"
import {
  Borda,
  BordaAction,
  BordaCtx,
  BordaDispatchCtx,
  BordaStage,
} from "@/state/fcborda"
import { Dispatch, useContext, useEffect } from "react"

export default function BordaPage() {
  const borda = useContext(BordaCtx)!
  const dispatch: Dispatch<BordaAction> = useContext(BordaDispatchCtx)!

  useEffect(() => console.log(borda), [borda])

  return (
    <div className="page borda">
      <header className="borda-header">
        <h2>{borda.name}</h2>
      </header>
      {ScreenController(borda, dispatch)}
    </div>
  )
}

/** Renders the appropriate borda screen based on the state. */
function ScreenController(borda: Borda, dispatch: React.Dispatch<BordaAction>) {
  const back = () => dispatch({ type: "STAGE_BACK" })

  switch (borda.stage) {
    case BordaStage.CALIBRATION:
      return <Calibration features={borda.features} dispatch={dispatch} />
    case BordaStage.SCORING:
      return (
        <Scoring
          features={borda.features}
          candidates={borda.candidates}
          dispatch={dispatch}
        />
      )
    case BordaStage.COMPLETE:
      return <Complete borda={borda} dispatch={dispatch} />
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
