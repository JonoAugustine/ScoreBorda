"use client"

import dynamic from "next/dynamic"
import "ldrs/react/Treadmill.css"

const Treadmill = dynamic(
  () => import("ldrs/react").then((m) => ({ default: m.Treadmill })),
  { ssr: false }
)

export function LoadingScreen({ text }: { text?: string }) {
  return (
    <div className="loading">
      <Treadmill size="70" speed="1.25" color="white" />
      <h2>{text ?? "Loading"}</h2>
    </div>
  )
}
