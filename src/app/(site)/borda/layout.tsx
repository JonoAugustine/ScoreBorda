"use client"

import { Borda, testBorda } from "@/state/Borda"
import BordaProvider from "@/state/BordaContext"
import { useState } from "react"

export default function BordaLayout(props: any) {
  const [borda] = useState<Borda>(testBorda())

  return (
    <BordaProvider borda={borda}>
      <div className="page borda">
        <header className="borda-header">
          <h1>{borda.name}</h1>
        </header>
        {props.children}
      </div>
    </BordaProvider>
  )
}
