export type BordaEntity = {
  name: string
}

/**
 * Features help ScoreBorda(TM) understand what is most important to you.
 * They can be anything from "*red*" to "*votes for president of space*"
 * to "*likes kittens*"; as long as it describes some aspect of a candidate,
 * it's a valid feature.
 */
export type Feature = BordaEntity & { weight: number }

/**
 * Whether people, clothes, insurance plans, or quite literally anything else.
 * SB's purpose is to aid you in understanding how you feel about about these
 * candidates. Candidates consist of a name, score, and set of features.
 */
export type Candidate = BordaEntity & {
  score: number
  featureScores?: number[]
}

export function scoreOf(candidate: Candidate): number {
  return candidate.featureScores!.reduce((sum, ftr) => sum + ftr, 0)
}
