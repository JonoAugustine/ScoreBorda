import { createContext, Dispatch } from "react"
import { FCBorda, FCBordaStage } from "./FCBorda"
import { FCBordaAction } from "./FCBAction"

export const FCBordaCtx = createContext<FCBorda>({
  stage: FCBordaStage.SETUP,
  features: [],
  candidates: [],
  _id: "",
  name: "",
})

export const FCBordaDispatchCtx = createContext<Dispatch<FCBordaAction>>(() => {
  throw new Error("FCBordaDispatchCtx not provided")
})
