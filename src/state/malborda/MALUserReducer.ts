import { Reducer } from "react"
import { MalUserAction } from "./MALUserAction"
import { MalUserContextType } from "./MALUserProvider"

export const malUserReducer: Reducer<MalUserContextType, MalUserAction> = (
  ctx: MalUserContextType,
  action: MalUserAction
) => {
  switch (action.type) {
    case "LOADING_COMPLETE":
      return { ...ctx, loading: false }
    default:
      break
  }
  switch (action.type.split("_")[0]) {
    case "USER":
      return userReducer(ctx, action)
    // case "AUTH":
    //   return authReducer(ctx, action)
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
    case "USER_DELETE":
      return { ...ctx, user: undefined }
    default:
      throw Error(`Unknown action type ${action.type}`)
  }
}

// const authReducer: Reducer<MalUserContextType, MalUserAction> = (
//   ctx: MalUserContextType,
//   action: MalUserAction
// ) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload.user }
//     case "LOGOUT":
//       return {}
//     default:
//       throw Error(`Unknown action type ${action.type}`)
//   }
// }
