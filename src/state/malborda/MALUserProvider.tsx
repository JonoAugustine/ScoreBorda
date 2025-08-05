"use client"

import { MalUser } from "@/mal"
import { clientGetMalUser, loadUserFromIdToken } from "@/mal/frontend"
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react"
import { MalUserAction } from "./MALUserAction"
import { malUserReducer } from "./MALUserReducer"

export type MalUserContextType = {
  loading: boolean
  user?: MalUser
}

export const MalUserCtx = createContext<MalUserContextType>({ loading: true })
export const MalUserDispatchCtx = createContext<Dispatch<MalUserAction>>(() => {
  throw new Error("MalUserDispatchCtx not provided")
})

export function MalUserProvider({ children }: PropsWithChildren) {
  const [userCtx, dispatch] = useReducer(malUserReducer, { loading: true })

  useEffect(() => {
    const savedUser = loadUserFromIdToken()
    if (savedUser !== null) {
      // when no id token found, assume an access token exists & attempt to fetch user
      clientGetMalUser()
        .then((user) => user && dispatch({ type: "USER_SET", payload: user }))
        .catch((e) => console.error(e))
    } else {
      dispatch({ type: "USER_SET", payload: savedUser })
    }
    dispatch({ type: "LOADING_COMPLETE" })
  }, [dispatch])

  return (
    <MalUserCtx.Provider value={userCtx}>
      <MalUserDispatchCtx.Provider value={dispatch}>
        {children}
      </MalUserDispatchCtx.Provider>
    </MalUserCtx.Provider>
  )
}
