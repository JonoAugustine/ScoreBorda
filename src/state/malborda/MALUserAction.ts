export type MalUserActionType =
  | "LOADING_COMPLETE"
  | "USER_DELETE"
  | "USER_SET"
  | "USER_UPDATE"

export type MalUserAction<
  T extends MalUserActionType = MalUserActionType,
  P = any,
> = {
  type: T
  payload?: P
}
