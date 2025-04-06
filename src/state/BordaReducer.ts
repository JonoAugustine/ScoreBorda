import { BordaState, type Borda } from "./Borda"

type BordaActionType =
  | "ADD_FEATURE"
  | "REMOVE_FEATURE"
  | "ADD_CANDIDATE"
  | "REMOVE_CANDIDATE"
  | "NEXT_STATE"
  | "LAST_STATE"
  | "RESET"
  | "SET_ITERABLE"

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
    case "NEXT_STATE":
      return borda.state === BordaState.COMPLETE
        ? borda
        : {
            ...borda,
            state: borda.state + 1,
          }
    case "LAST_STATE":
      return borda.state === BordaState.FEATURES
        ? borda
        : {
            ...borda,
            state: borda.state - 1,
          }
    case "RESET":
      return {
        ...borda,
        features: [],
        candidates: [],
        state: BordaState.FEATURES,
      }
    default:
      throw Error(`Unknown action type: ${type}`)
  }
}
