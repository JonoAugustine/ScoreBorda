import { Candidate, Feature } from "./BordaEntities"

export const enum BordaStage {
  SETUP = 0,
  CALIBRATION = 1,
  SCORING = 2,
  COMPLETE = 3,
}

export type Borda = {
  features: Feature[]
  candidates: Candidate[]
  stage: BordaStage
}
