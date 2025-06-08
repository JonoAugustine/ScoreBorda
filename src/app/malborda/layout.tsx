"use client"

import { BordaProvider } from "@/state"
import {
  MALBAction,
  MalBDispatchCtx,
  MalBorda,
  MalBordaCtx,
  MalBordaStage,
  MalUserProvider,
} from "@/state/malborda"
import { nanoid } from "nanoid"
import { PropsWithChildren, Suspense } from "react"

export default function MalBordaLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <MalUserProvider>
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
      </MalUserProvider>
    </Suspense>
  )
}
