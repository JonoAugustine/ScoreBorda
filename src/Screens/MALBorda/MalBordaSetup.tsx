"use client"

import {
  AnimeSearchParams,
  AnimeSearchResponse,
  AnimeWatchStatus,
  AnimeWatchStatusType,
  Page,
} from "@/mal"
import { useContext, useEffect, useState } from "react"
import { MalBordaCtx, MalUserCtx, MalUserDispatchCtx } from "@/state/malborda"
import { clientGetAnimeList } from "@/mal/frontend"
import Image from "next/image"
import { parseIntOrDefault } from "@/util"

export function MalBordaSetup() {
  const { user, loading } = useContext(MalUserCtx)
  const borda = useContext(MalBordaCtx)
  const dispatch = useContext(MalUserDispatchCtx)
  const [params, setParams] = useState<AnimeSearchParams | undefined>({})
  const [score, setScore] = useState(10)

  const [animeList, setAnimeList] = useState<
    Page<AnimeSearchResponse> | undefined
  >()

  useEffect(() => {
    if (user && !loading && params)
      clientGetAnimeList(params)
        .then((al) => setAnimeList(al))
        .catch((e) => console.error(e))
  }, [setAnimeList, user, loading, params])

  return (
    <div>
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
            {new Array(11).fill(0).map((_, score) => (
              <option key={10 - score} value={10 - score}>
                {10 - score}
              </option>
            ))}
          </select>
        </label>
      </div>
      <section>
        <ul>
          {animeList?.data?.map(({ node }) => (
            <li key={node.id}>
              <p>{node.title}</p>
              {node.main_picture?.medium && (
                <Image
                  src={node.main_picture!.medium!}
                  width={50}
                  height={50}
                  alt={node.title}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
