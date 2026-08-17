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

    // The ID token is the cheap path: it is already in localStorage, so there is no request to
    // wait on. The branches used to be the wrong way round — a saved token sent us to the
    // network anyway, and the no-token case dispatched USER_SET with the null it had just
    // failed to load.
    if (savedUser) {
      dispatch({ type: "USER_SET", payload: savedUser })
      dispatch({ type: "LOADING_COMPLETE" })
      return
    }

    // No ID token, but the httpOnly access cookie may still be live. LOADING_COMPLETE has to
    // wait for that to settle: firing it up front left `loading` false with no user, which is
    // indistinguishable from logged out, so every fresh load bounced to the login screen.
    clientGetMalUser()
      .then((user) => {
        if (user) dispatch({ type: "USER_SET", payload: user })
      })
      .catch((e) => console.error(e))
      .finally(() => dispatch({ type: "LOADING_COMPLETE" }))
  }, [dispatch])

  return (
    <MalUserCtx.Provider value={userCtx}>
      <MalUserDispatchCtx.Provider value={dispatch}>
        {children}
      </MalUserDispatchCtx.Provider>
    </MalUserCtx.Provider>
  )
}
