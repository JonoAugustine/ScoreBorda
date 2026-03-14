"use client"

import {
  AnimeSearchParams,
  AnimeSearchResponse,
  AnimeWatchStatus,
  AnimeWatchStatusType,
  Page,
} from "@/mal"
import { useContext, useEffect, useState } from "react"
import {
  AnimeListCacheCtx,
  MalBordaCtx,
  MalBordaDispatchCtx,
  MalUserCtx,
} from "@/state/malborda"
import { clientGetAnimeList } from "@/mal/frontend"
import Image from "next/image"
import { parseIntOrDefault } from "@/util"

export function MalBordaSetup() {
  const { cache, status } = useContext(AnimeListCacheCtx)
  const borda = useContext(MalBordaCtx)
  const dispatch = useContext(MalBordaDispatchCtx)
  const [params, setParams] = useState<AnimeSearchParams | undefined>({})
  const [score, setScore] = useState(10)

  return (
    <div className="screen mal-setup">
      <div>
        <label htmlFor="status">
          Anime Status:
          <select
            onChange={(e) => {
              setParams({
                ...params,
                status:
                  e.target.value == "none"
                    ? undefined
                    : (e.target.value as AnimeWatchStatusType),
              })
            }}
            name="status"
            id="status"
          >
            <option value="none">none</option>
            {AnimeWatchStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="score">
          Anime Score:
          <select
            onChange={(e) => {
              setScore(parseIntOrDefault(e.target.value, 10))
            }}
            name="score"
            id="score"
            defaultValue={10}
          >
            <option value="none">none</option>
            {new Array(10).fill(0).map((_, i) => (
              <option key={10 - i} value={10 - i}>
                {10 - i}
              </option>
            ))}
          </select>
        </label>
      </div>
      <section>
        <ul className="anime-grid">
          {cache.all().map(({ node }) => (
            <li key={node.id}>
              {node.main_picture?.medium && (
                <div
                  className="image-container"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={node.main_picture!.medium!}
                    fill
                    objectFit="contain"
                    alt={node.title}
                  />
                </div>
              )}
              <p>{node.title}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
