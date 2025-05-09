"use client"

import { Borda, testBorda } from "@/state/Borda"
import BordaProvider from "@/state/BordaContext"
import { useState } from "react"

export default function BordaLayout(props: any) {
  const [borda] = useState<Borda | undefined>(
    process.env.NODE_ENV === "development" ? testBorda(4) : undefined
  )

  return <BordaProvider borda={borda}>{props.children}</BordaProvider>
}
