"use client"

import { AnimeListCache } from "@/mal/AnimeListCache"
import { createContext } from "react"

export type AnimeListCacheStatus = "idle" | "loading" | "complete" | "error"

export type AnimeListCacheContextType = {
  cache: AnimeListCache
  status: AnimeListCacheStatus
  error?: string
}

export const AnimeListCacheCtx = createContext<AnimeListCacheContextType>({
  cache: new AnimeListCache(),
  status: "idle",
})
