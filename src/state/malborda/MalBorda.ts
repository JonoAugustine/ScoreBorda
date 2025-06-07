import { BaseBorda } from "../types"

export const enum MalBordaStage {
  SETUP = 0,
  SCORING = 1,
  COMPLETE = 2,
}

export type MalBorda = BaseBorda<MalBordaStage> & {
  stage: MalBordaStage
  candidates: any[]
}
