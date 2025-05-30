import { nanoid } from "nanoid"
import { Candidate, Feature } from "./BordaEntities"

export const enum BordaStage {
  SETUP = 0,
  CALIBRATION = 1,
  SCORING = 2,
  COMPLETE = 3,
}

export type Borda = {
  _id: string
  date?: Date
  name: string
  features: Feature[]
  candidates: Candidate[]
  stage: BordaStage
}

export function testBorda(
  size: number = 5,
  stage: BordaStage = BordaStage.SETUP
): Borda {
  "use client"
  const zeroArray = [0]
  while (zeroArray.length < size) {
    zeroArray.push(0)
  }
  const _id = nanoid()
  return {
    _id,
    date: new Date(),
    name: `Test Borda ${_id}`,
    stage,
    features: zeroArray.map((_, i) => ({
      name: `Feature ${i}`,
      weight: 0,
    })),
    candidates: zeroArray.map((_, i) => ({
      name: `Candidate ${i}`,
      score: 0,
    })),
  }
}
