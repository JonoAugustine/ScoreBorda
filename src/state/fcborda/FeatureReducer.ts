import { type FCBorda } from "./FCBorda"
import { FCBordaAction, FeatureAction } from "./FCBAction"

export default function featureReducer(
  borda: FCBorda,
  action: FCBordaAction<FeatureAction>
): FCBorda {
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
    case "FEATURE_WEIGHT_UP":
      return {
        ...borda,
        features: borda.features.map((feature) =>
          feature.name === action.payload.name
            ? { ...feature, weight: feature.weight + action.payload.value }
            : feature
        ),
      }
    case "FEATURE_WEIGHT_CLEAR_ALL":
      return {
        ...borda,
        features: borda.features.map((feature) => ({
          ...feature,
          weight: 0,
        })),
      }
    default:
      throw Error(`Unknown action type: ${action}`)
  }
}
