export type BordaEntity = {
  name: string
  score: number
}

/**
 * Features help ScoreBorda(TM) understand what is most important to you.
 * They can be anything from "*red*" to "*votes for president of space*"
 * to "*likes kittens*"; as long as it describes some aspect of a candidate,
 * it's a valid feature.
 */
export type Feature = BordaEntity

/**
 * Whether people, clothes, insurance plans, or quite literally anything else.
 * SB's purpose is to aid you in understanding how you feel about about these
 * candidates. Candidates consist of a name, score, and set of features.
 */
export type Candidate = BordaEntity & { features: Feature[] }

export function scoreOf(candidate: Candidate): number {
  return candidate.features.reduce((sum, ftr) => sum + ftr.score, 0)
}
