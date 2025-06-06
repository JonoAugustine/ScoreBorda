import { type Borda } from "./Borda"
import { BordaAction, CandidateAction } from "./BordaAction"

export default function candidateReducer(
  borda: Borda,
  action: BordaAction<CandidateAction>
): Borda {
  switch (action.type) {
    case "CANDIDATE_NEW":
      return {
        ...borda,
        candidates: [...borda.candidates, action.payload],
      }
    case "CANDIDATE_REMOVE":
      return {
        ...borda,
        candidates: borda.candidates.filter(
          (candidate) => candidate.name !== action.payload
        ),
      }
    case "CANDIDATE_FEATURE_SCORE_UP":
      return {
        ...borda,
        candidates: borda.candidates.map((candidate) =>
          candidate.name === action.payload.name
            ? { ...candidate, score: candidate.score + action.payload.value }
            : candidate
        ),
      }
    default:
      throw Error(`Unknown action type: ${action.type}`)
  }
}
