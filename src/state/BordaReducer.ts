import { type } from "os"
import { type Borda } from "./Borda"
import {
  BordaAction,
  CandidateAction,
  FeatureAction,
  StageAction,
} from "./BordaAction"
import candidateReducer from "./CandidateReducer"
import featureReducer from "./FeatureReducer"
import stageReducer from "./StageReducer"

export default function bordaReducer(borda: Borda, action: BordaAction): Borda {
  console.log("BordaReducer", action)
  switch (action.type.split("_")[0]) {
    case "FEATURE":
      return featureReducer(borda, action as BordaAction<FeatureAction>)
    case "CANDIDATE":
      return candidateReducer(borda, action as BordaAction<CandidateAction>)
    case "STAGE":
      return stageReducer(borda, action as BordaAction<StageAction>)
    default:
      throw Error(`Unknown action type: ${type}`)
  }
}
