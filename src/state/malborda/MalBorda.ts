import { BaseBorda } from "../types"
import { Anime } from "@/mal"

export const enum MalBordaStage {
  SETUP = 0,
  SCORING = 1,
  COMPLETE = 2,
}

export type MalBorda = BaseBorda<MalBordaStage> & {
  stage: MalBordaStage
  anime: Anime[]
}
