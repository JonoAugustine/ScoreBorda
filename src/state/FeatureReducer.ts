import { type Borda } from "./Borda"
import { BordaAction, FeatureAction } from "./BordaAction"

export default function featureReducer(
  borda: Borda,
  action: BordaAction<FeatureAction>
): Borda {
  switch (action.type) {
    case "FEATURE_NEW":
      return {
        ...borda,
        features: [...borda.features, action.payload],
      }
    case "FEATURE_REMOVE":
      return {
        ...borda,
        features: borda.features.filter(
          (feature) => feature.name !== action.payload
        ),
      }
    case "FEATURE_SCORE_UP":
      return {
        ...borda,
        features: borda.features.map((feature) =>
          feature.name === action.payload.name
            ? { ...feature, score: feature.score + action.payload.value }
            : feature
        ),
      }
    case "FEATURE_SCORE_CLEAR_ALL":
      return {
        ...borda,
        features: borda.features.map((feature) => ({
          ...feature,
          score: 0,
        })),
      }
    default:
      throw Error(`Unknown action type: ${action}`)
  }
}
