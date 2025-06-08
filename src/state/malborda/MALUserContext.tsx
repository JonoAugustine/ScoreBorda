import { MalUser } from "@/mal"
import { createContext, Dispatch, PropsWithChildren, useReducer } from "react"
import { MalUserAction } from "./MALUserAction"
import { malUserReducer } from "./MALUserReducer"

export type MalUserContextType = {
  idToken?: string
  user?: MalUser
}

export const MalUserCtx = createContext<MalUserContextType>({})
export const MalUserDispatchCtx = createContext<
  Dispatch<MalUserAction> | undefined
>(undefined)

export function MalUserProvider({ children }: PropsWithChildren) {
  const [userCtx, dispatch] = useReducer(malUserReducer, {})

  return (
    <MalUserCtx.Provider value={userCtx}>
      <MalUserDispatchCtx.Provider value={dispatch}>
        {children}
      </MalUserDispatchCtx.Provider>
    </MalUserCtx.Provider>
  )
}
