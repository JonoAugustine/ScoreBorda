import { nanoid } from "nanoid"
import { BordaStage, type Borda } from "./Borda"
import { BordaAction, StageAction } from "./BordaAction"

export default function stageReducer(
  borda: Borda,
  action: BordaAction<StageAction, undefined>
): Borda {
  switch (action.type) {
    case "STAGE_NEXT":
      return {
        ...borda,
        stage: borda.stage + 1,
      }
    case "STAGE_BACK":
      return {
        ...borda,
        stage: borda.stage - 1,
      }
    case "STAGE_FIRST_WITH_RESET":
      return {
        ...borda,
        features: [],
        candidates: [],
        stage: BordaStage.SETUP,
      }
    case "STAGE_FIRST_WITHOUT_RESET":
      const _id = nanoid()
      return {
        ...borda,
        _id,
        name: `Borda ${_id}`,
        features: borda.features.map((f) => ({ ...f, weight: 0 })),
        candidates: borda.candidates.map((c) => ({
          ...c,
          featureScores: undefined,
          score: 0,
        })),
        stage: BordaStage.SETUP,
      }
    default:
      throw Error(`Unknown action type: ${action.type}`)
  }
}
