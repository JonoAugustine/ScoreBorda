"use client"

import { createContext, Dispatch } from "react"
import { MALBAction } from "./MALBAction"
import { MalBorda } from "./MalBorda"

export const MalBordaCtx = createContext<MalBorda>({
  stage: 0,
  anime: [],
  _id: "",
  name: "",
})
export const MalBordaDispatchCtx = createContext<Dispatch<MALBAction>>(() => {
  throw new Error("MalBDispatchCtx not provided")
})
