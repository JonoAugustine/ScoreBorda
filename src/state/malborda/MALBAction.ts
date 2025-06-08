export type StageAction =
  | "STAGE_NEXT"
  | "STAGE_BACK"
  | "STAGE_FIRST_WITH_RESET"
  | "STAGE_FIRST_WITHOUT_RESET"

export type MALBActionType = StageAction

export type MALBAction<T extends MALBActionType = MALBActionType, P = any> = {
  type: T
  payload?: P
}
