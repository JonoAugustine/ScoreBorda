"use client"

import { AnimeListEntryDetail, AnimeNode, Page } from "@/mal"
import { clientGetAnimeList, deleteIdToken } from "@/mal/frontend"
import { MalUserCtx, MalUserDispatchCtx } from "@/state/malborda"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function MalBorda() {
  const { user, loading } = useContext(MalUserCtx)
  const dispatch = useContext(MalUserDispatchCtx)!
  const [animeList, setAnimeList] = useState<
    Page<{ node: AnimeNode; list_status: AnimeListEntryDetail }> | undefined
  >()

  useEffect(() => {
    if (user && !loading)
      clientGetAnimeList()
        .then((al) => setAnimeList(al))
        .catch((e) => console.error(e))
  }, [setAnimeList, user, loading])

  if (loading) return <p>Loading MAL User...</p>

  if (!user) return redirect(window.location.origin + "/malborda/auth")

  return (
    <div>
      {user.picture && (
        <Image src={user.picture} width={100} height={100} alt="" />
      )}
      <p>{user.name}</p>
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
      <br />
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          deleteIdToken()
          dispatch({ type: "USER_DELETE" })
        }}
      >
        Logout
      </button>
    </div>
  )
}
