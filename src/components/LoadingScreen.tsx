"use client"

import { Treadmill } from "ldrs/react"
import "ldrs/react/Treadmill.css"

export function LoadingScreen({ text }: { text?: string }) {
  return (
    <div className="loading">
      <Treadmill size="70" speed="1.25" color="white" />
      <h2>{text ?? "Loading"}</h2>
    </div>
  )
}
