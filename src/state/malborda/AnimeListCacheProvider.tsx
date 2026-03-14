"use client"

import { AnimeListCache } from "@/mal/AnimeListCache"
import { clientGetAllAnime } from "@/mal/frontend"
import { PropsWithChildren, useContext, useEffect, useState } from "react"
import {
  AnimeListCacheContextType,
  AnimeListCacheCtx,
  AnimeListCacheStatus,
} from "./AnimeListCacheContext"
import { MalUserCtx } from "./MALUserProvider"

export function AnimeListCacheProvider({ children }: PropsWithChildren) {
  const { user, loading: userLoading } = useContext(MalUserCtx)
  const [state, setState] = useState<AnimeListCacheContextType>({
    cache: new AnimeListCache(),
    status: "idle",
  })

  useEffect(() => {
    if (userLoading || !user) return
    console.log("loading anime list cache")

    setState((s) => ({ ...s, status: "loading" as AnimeListCacheStatus }))

    clientGetAllAnime({ fields: ["list_status"] })
      .then((entries) => {
        setState({
          cache: new AnimeListCache(entries),
          status: "complete",
        })
      })
      .catch((e) => {
        console.error("Failed to load anime list cache", e)
        setState((s) => ({
          ...s,
          status: "error",
          error: e instanceof Error ? e.message : String(e),
        }))
      })
  }, [user, userLoading])

  return (
    <AnimeListCacheCtx.Provider value={state}>
      {children}
    </AnimeListCacheCtx.Provider>
  )
}
