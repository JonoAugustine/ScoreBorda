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
    default:
      throw Error(`Unknown action type: ${action.type}`)
  }
}
