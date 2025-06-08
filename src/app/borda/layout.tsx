"use client"

import { BordaProvider } from "@/state"
import {
  FCBorda,
  FCBordaAction,
  FCBordaCtx,
  FCBordaDispatchCtx,
  fcBordaReducer,
  FCBordaStage,
  testFcBorda,
} from "@/state/fcborda"
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
