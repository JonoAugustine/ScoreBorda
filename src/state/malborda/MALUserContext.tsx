"use client"

import { MalUser } from "@/mal"
import { loadUserFromIdToken } from "@/mal/frontend"
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react"
import { clientGetMalUser } from "../../mal/frontend/user.call"
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

  useEffect(() => {
    const savedUser = loadUserFromIdToken()
    if (!savedUser) {
      // when no idtoken found
      clientGetMalUser()
        .then((user) => dispatch({ type: "USER_SET", payload: user }))
        .catch((e) => console.error(e))
    } else {
      dispatch({ type: "USER_SET", payload: savedUser })
    }
  }, [dispatch])

  return (
    <MalUserCtx.Provider value={userCtx}>
      <MalUserDispatchCtx.Provider value={dispatch}>
        {children}
      </MalUserDispatchCtx.Provider>
    </MalUserCtx.Provider>
  )
}
