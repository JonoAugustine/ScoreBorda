import { Candidate, Feature } from "../models"

export const enum BordaState {
  FEATURES = 0,
  CANDIDATES = 1,
  CONFIRM = 2,
  CALIBRATION = 3,
  SCORING = 4,
  COMPLETE = 5,
}

export type Borda = {
  features: Feature[]
  candidates: Candidate[]
  state: BordaState
}
