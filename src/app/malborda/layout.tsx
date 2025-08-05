"use client"

import { BordaProvider } from "@/state"
import {
  MALBAction,
  MalBDispatchCtx,
  MalBorda,
  MalBordaCtx,
  MalBordaStage,
  MalUserCtx,
} from "@/state/malborda"
import { nanoid } from "nanoid"
import { PropsWithChildren, Suspense, useContext } from "react"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function MalBordaLayout({ children }: PropsWithChildren) {
  const userCtx = useContext(MalUserCtx)
  const { loading } = userCtx

  if (loading) return <LoadingScreen text="Loading User" />

  return (
    <Suspense>
      <BordaProvider<MalBorda, MalBordaStage, MALBAction>
        default={{
          _id: nanoid(),
          name: "New MAL Borda",
          stage: MalBordaStage.SETUP,
          anime: [],
        }}
        bordaContext={MalBordaCtx}
        dispatchContext={MalBDispatchCtx}
        reducer={function (_: MalBorda, __: MALBAction): MalBorda {
          delete _.date
          delete __.payload
          throw new Error("Function not implemented.")
        }}
      >
        {children}
      </BordaProvider>
    </Suspense>
  )
}
