export type MalUserActionType = "LOGIN" | "USER_SET" | "USER_UPDATE"

export type MalUserAction<
  T extends MalUserActionType = MalUserActionType,
  P = any,
> = {
  type: T
  payload?: P
}
