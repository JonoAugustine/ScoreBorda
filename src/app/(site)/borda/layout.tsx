"use client"

import BordaProvider from "@/state/BordaContext"

export default function BordaLayout(props: any) {
  return (
    <BordaProvider>
      <div className="borda-layout">
        <div className="borda-layout_header">
          <h2>Active Borda</h2>
        </div>
        <div className="borda-layout__content">{props.children}</div>
      </div>
    </BordaProvider>
  )
}
