"use client"

import {
  MalBorda,
  MalBordaCtx,
  MalBordaDispatchCtx,
  MalBordaStage,
  MalUserCtx,
} from "@/state/malborda"
import { redirect } from "next/navigation"
import { useContext } from "react"
import { LoadingScreen } from "@/components/LoadingScreen"
import { MalBordaSetup } from "@/Screens/MALBorda"

export default function MalBordaPage() {
  const { user, loading } = useContext(MalUserCtx)
  const borda = useContext(MalBordaCtx)

  if (loading) return <LoadingScreen text="Loading User" />

  if (!user) return redirect(window.location.origin + "/malborda/auth")

  return <div className="page mal-borda">{ScreenController(borda)}</div>
}

function ScreenController(borda: MalBorda) {
  const dispatch = useContext(MalBordaDispatchCtx)
  const back = () => dispatch({ type: "STAGE_BACK" })

  switch (borda.stage) {
    case MalBordaStage.SETUP:
      return <MalBordaSetup />
    default:
      return (
        <div>
          <h1>Unknown state: {borda.stage}</h1>
          <button onClick={back}>back</button>
          <button onClick={() => dispatch({ type: "STAGE_FIRST_WITH_RESET" })}>
            Setup
          </button>
        </div>
      )
  }
}
