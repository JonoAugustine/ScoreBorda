"use client"

import { Borda, testBorda } from "@/state/fcborda/Borda"
import BordaProvider from "@/state/fcborda/BordaContext"
import { useState } from "react"

export default function BordaLayout(props: any) {
  const [borda] = useState<Borda | undefined>(
    process.env.NODE_ENV === "development" ? testBorda(4) : undefined
  )

  return <BordaProvider borda={borda}>{props.children}</BordaProvider>
}
