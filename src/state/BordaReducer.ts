import { BordaStage, type Borda } from "./Borda"

type BordaActionType =
  | "ADD_FEATURE"
  | "INCREASE_FEATURE_SCORE"
  | "CLEAR_FEATURE_SCORES"
  | "REMOVE_FEATURE"
  | "ADD_CANDIDATE"
  | "REMOVE_CANDIDATE"
  | "INCREASE_CANDIDATE_FEATURE_SCORE"
  | "CLEAR_CANDIDATE_SCORES"
  | "NEXT_STATE"
  | "LAST_STATE"
  | "RESET"

export type BordaAction<T = any> = { type: BordaActionType; payload?: T }

export default function bordaReducer(
  borda: Borda,
  { type, payload }: BordaAction
): Borda {
  switch (type) {
    case "ADD_FEATURE":
      return {
        ...borda,
        features: [...borda.features, payload],
      }
    case "REMOVE_FEATURE":
      return {
        ...borda,
        features: borda.features.filter(
          (feature) => feature.name !== payload.name
        ),
      }
    case "INCREASE_FEATURE_SCORE":
      return {
        ...borda,
        features: borda.features.map((feature) =>
          feature.name === payload.name
            ? { ...feature, score: feature.score + payload.value }
            : feature
        ),
      }
    case "CLEAR_FEATURE_SCORES":
      return {
        ...borda,
        features: borda.features.map((feature) => ({
          ...feature,
          score: 0,
        })),
      }
    case "ADD_CANDIDATE":
      return {
        ...borda,
        candidates: [...borda.candidates, payload],
      }
    case "REMOVE_CANDIDATE":
      return {
        ...borda,
        candidates: borda.candidates.filter(
          (candidate) => candidate.name !== payload.name
        ),
      }
    case "INCREASE_CANDIDATE_FEATURE_SCORE":
      return {
        ...borda,
        candidates: borda.candidates.map((candidate) =>
          candidate.name !== payload.name
            ? candidate
            : {
                ...candidate,
                featureScores: candidate.featureScores.map((score, index) =>
                  index === payload.featureIndex ? score + payload.value : score
                ),
              }
        ),
      }
    case "CLEAR_CANDIDATE_SCORES":
      return {
        ...borda,
        candidates: borda.candidates.map((candidate) => ({
          ...candidate,
          featureScores: candidate.featureScores.map((_) => 0),
          score: 0,
        })),
      }
    case "NEXT_STATE":
      return borda.stage === BordaStage.COMPLETE
        ? borda
        : {
            ...borda,
            stage: borda.stage + 1,
          }
    case "LAST_STATE":
      return borda.stage === BordaStage.SETUP
        ? borda
        : {
            ...borda,
            stage: borda.stage - 1,
          }
    case "RESET":
      return {
        ...borda,
        features: [],
        candidates: [],
        stage: BordaStage.SETUP,
      }
    default:
      throw Error(`Unknown action type: ${type}`)
  }
}
