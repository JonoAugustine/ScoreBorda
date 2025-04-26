export type FeatureAction =
  | "FEATURE_NEW"
  | "FEATURE_REMOVE"
  | "FEATURE_SCORE_UP"
  | "FEATURE_SCORE_CLEAR_ALL"

export type CandidateAction =
  | "CANDIDATE_NEW"
  | "CANDIDATE_REMOVE"
  | "CANDIDATE_FEATURE_SCORE_UP"

export type StageAction = "STAGE_NEXT" | "STAGE_BACK" | "STAGE_FIRST_WITH_RESET"

export type BordaActionType = FeatureAction | CandidateAction | StageAction

export type BordaAction<
  T extends BordaActionType = BordaActionType,
  P = any,
> = {
  type: T
  payload?: P
}
