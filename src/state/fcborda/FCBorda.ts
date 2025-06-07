import { nanoid } from "nanoid"
import { BaseBorda } from "../types"
import { Candidate, Feature } from "./FCBEntities"

export const enum FCBordaStage {
  SETUP = 0,
  CALIBRATION = 1,
  SCORING = 2,
  COMPLETE = 3,
}

export type FCBorda = BaseBorda<FCBordaStage> & {
  features: Feature[]
  candidates: Candidate[]
}

export function testFcBorda(
  size: number = 5,
  stage: FCBordaStage = FCBordaStage.SETUP
): FCBorda {
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
