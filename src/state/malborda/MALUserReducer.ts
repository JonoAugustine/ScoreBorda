import { Reducer } from "react"
import { MalUserAction } from "./MALUserAction"
import { MalUserContextType } from "./MALUserContext"

export const malUserReducer: Reducer<MalUserContextType, MalUserAction> = (
  ctx: MalUserContextType,
  action: MalUserAction
) => {
  switch (action.type.split("_")[0]) {
    case "USER":
      return userReducer(ctx, action)
    case "AUTH":
      return authReducer(ctx, action)
    default:
      throw Error(`Unknown action type ${action.type}`)
  }
}

const userReducer: Reducer<MalUserContextType, MalUserAction> = (
  ctx: MalUserContextType,
  action: MalUserAction
) => {
  switch (action.type) {
    case "USER_SET":
      return { ...ctx, user: action.payload }
    case "USER_UPDATE":
      return { ...ctx, user: { ...ctx.user, ...action.payload.user } }
    default:
      throw Error(`Unknown action type ${action.type}`)
  }
}

const authReducer: Reducer<MalUserContextType, MalUserAction> = (
  ctx: MalUserContextType,
  action: MalUserAction
) => {
  switch (action.type) {
    case "LOGIN":
      return { idToken: action.payload.idToken, user: action.payload.user }
    default:
      throw Error(`Unknown action type ${action.type}`)
  }
}
