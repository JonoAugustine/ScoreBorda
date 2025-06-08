import { createContext, Dispatch } from "react"
import { MALBAction } from "./MALBAction"
import { MalBorda } from "./MalBorda"

export const MalBordaCtx = createContext<MalBorda | null>(null)
export const MalBDispatchCtx = createContext<Dispatch<MALBAction> | null>(null)
