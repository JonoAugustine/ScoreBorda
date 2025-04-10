"use client"

import { BordaStage } from "@/state/Borda"
import BordaProvider from "@/state/BordaContext"
import { useState } from "react"

export default function BordaLayout(props: any) {
  const [testBorda] = useState(
    (() => {
      const zeroArray = [0]
      while (zeroArray.length < 30) {
        zeroArray.push(0)
      }
      return {
        stage: BordaStage.SETUP,
        features: zeroArray.map((_, i) => ({
          name: `Feature ${i}`,
          score: 0,
        })),
        candidates: zeroArray.map((_, i) => ({
          name: `Candidate ${i}`,
          featureScores: zeroArray,
          score: 0,
        })),
      }
    })()
  )
  return (
    <BordaProvider borda={testBorda}>
      <div className="page borda">
        <header className="borda-header">
          <h2>Active Borda</h2>
        </header>
        {props.children}
      </div>
    </BordaProvider>
  )
}
