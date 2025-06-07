import { createContext } from "react"
import { FCBorda } from "./FCBorda"
import { FCBordaAction } from "./FCBAction"

export const FCBordaCtx = createContext<FCBorda | null>(null)
export const FCBordaDispatchCtx =
  createContext<React.Dispatch<FCBordaAction> | null>(null)
