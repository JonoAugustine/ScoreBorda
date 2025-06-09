"use client"

import {
  AnimeListEntryDetail,
  AnimeNode,
  AnimeSearchParams,
  AnimeWatchStatus,
  AnimeWatchStatusType,
  Page,
} from "@/mal"
import { clientGetAnimeList } from "@/mal/frontend"
import { MalUserCtx } from "@/state/malborda"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function MalBorda() {
  const userCtx = useContext(MalUserCtx)
  const { user, loading } = userCtx
  const [params, setParams] = useState<AnimeSearchParams | undefined>({})
  const [animeList, setAnimeList] = useState<
    Page<{ node: AnimeNode; list_status: AnimeListEntryDetail }> | undefined
  >()

  useEffect(() => {
    if (user && !loading && params)
      clientGetAnimeList(params)
        .then((al) => setAnimeList(al))
        .catch((e) => console.error(e))
  }, [setAnimeList, user, loading, params])

  if (loading) return <p>Loading MAL User...</p>

  if (!user) return redirect(window.location.origin + "/malborda/auth")

  return (
    <div>
      <section>
        <h1></h1>
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
        </div>
      </section>
      <section>
        <ul>
          {animeList?.data?.map((listing) => (
            <li key={listing.node.id}>
              <p>{listing.node.title}</p>
              {listing.node.main_picture?.medium && (
                <Image
                  src={listing.node.main_picture!.medium!}
                  width={50}
                  height={50}
                  alt={listing.node.title}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
