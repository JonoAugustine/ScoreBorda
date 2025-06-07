"use client"

import BordaProvider from "@/state/BordaProvider"
import { FCBordaCtx, FCBordaDispatchCtx, fcBordaReducer } from "@/state/fcborda"
import { FCBorda, FCBordaStage, testFcBorda } from "@/state/fcborda/FCBorda"
import { FCBordaAction } from "@/state/fcborda/FCBAction"
import { nanoid } from "nanoid"
import { useState } from "react"

export default function FCBordaLayout(props: any) {
  const [borda] = useState<FCBorda | undefined>(
    process.env.NODE_ENV === "development" ? testFcBorda(4) : undefined
  )

  return (
    <BordaProvider<FCBorda, FCBordaStage, FCBordaAction>
      borda={borda}
      default={{
        _id: nanoid(),
        name: "New Borda",
        features: [],
        candidates: [],
        stage: FCBordaStage.SETUP,
      }}
      bordaContext={FCBordaCtx}
      dispatchContext={FCBordaDispatchCtx}
      reducer={fcBordaReducer}
    >
      {props.children}
    </BordaProvider>
  )
}
