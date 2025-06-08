import { BordaReducerType } from "../types"
import candidateReducer from "./CandidateReducer"
import {
  CandidateAction,
  FCBordaAction,
  FeatureAction,
  StageAction,
} from "./FCBAction"
import { type FCBorda } from "./FCBorda"
import stageReducer from "./FCBordaStageReducer"
import featureReducer from "./FeatureReducer"

export const fcBordaReducer: BordaReducerType<FCBorda, FCBordaAction> = (
  borda: FCBorda,
  action: FCBordaAction
): FCBorda => {
  console.debug("BordaReducer", action)
  switch (action.type.split("_")[0]) {
    case "FEATURE":
      return featureReducer(borda, action as FCBordaAction<FeatureAction>)
    case "CANDIDATE":
      return candidateReducer(borda, action as FCBordaAction<CandidateAction>)
    case "STAGE":
      return stageReducer(borda, action as FCBordaAction<StageAction>)
    default:
      throw Error(`Unknown action type: ${action.type}`)
  }
}
