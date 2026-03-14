"use client"

import { AnimeListCache } from "@/mal/AnimeListCache"
import { clientGetAllAnime } from "@/mal/frontend"
import { STORAGE_KEYS } from "@/mal/malUtil"
import { AnimeSearchResponse } from "@/mal/Anime"
import { PropsWithChildren, useContext, useEffect, useState } from "react"
import {
  AnimeListCacheContextType,
  AnimeListCacheCtx,
  AnimeListCacheStatus,
} from "./AnimeListCacheContext"
import { MalUserCtx } from "./MALUserProvider"

function cacheKey(username: string) {
  return `${STORAGE_KEYS.LOCAL.ANIME_LIST}_${username}`
}

function loadCached(username: string): AnimeSearchResponse[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(username))
    return raw ? (JSON.parse(raw) as AnimeSearchResponse[]) : null
  } catch {
    return null
  }
}

function saveCached(username: string, entries: AnimeSearchResponse[]) {
  try {
    localStorage.setItem(cacheKey(username), JSON.stringify(entries))
  } catch {
    // storage quota exceeded or unavailable — ignore
  }
}

export function AnimeListCacheProvider({ children }: PropsWithChildren) {
  const { user, loading: userLoading } = useContext(MalUserCtx)
  const [state, setState] = useState<AnimeListCacheContextType>({
    cache: new AnimeListCache(),
    status: "idle",
  })

  useEffect(() => {
    if (userLoading || !user) return

    const cached = loadCached(user.name)
    if (cached) {
      setState({ cache: new AnimeListCache(cached), status: "complete" })
      return
    }

    console.log("loading anime list cache")
    setState((s) => ({ ...s, status: "loading" as AnimeListCacheStatus }))

    clientGetAllAnime({ fields: ["list_status"] })
      .then((entries) => {
        saveCached(user.name, entries)
        setState({ cache: new AnimeListCache(entries), status: "complete" })
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
