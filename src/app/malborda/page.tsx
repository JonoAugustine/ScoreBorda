"use client"

import {
  AnimeListEntryDetail,
  AnimeNode,
  deleteIdToken,
  loadUser,
  MalUser,
  Page,
} from "@/mal"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function MalBorda() {
  const [loading, setLoading] = useState(true)
  const [userPartial, setUserPartial] = useState<Partial<MalUser> | undefined>()
  const [animeList, setAnimeList] = useState<
    Page<{ node: AnimeNode; list_status: AnimeListEntryDetail }> | undefined
  >()

  // on window load, check if
  useEffect(() => {
    const user = loadUser()
    if (user) setUserPartial(user)
    setLoading(false)
  }, [setUserPartial, setLoading])

  useEffect(() => {
    fetch(window.origin + "/api/mal/anime")
      .then((res) => res.json())
      .then((al) => setAnimeList(al))
      .catch((e) => console.error(e))
  }, [setAnimeList])

  console.debug("user partial", userPartial)

  if (loading) return <p>Loading MAL User...</p>

  if (!userPartial) return redirect(window.location.origin + "/malborda/auth")

  return (
    <div>
      {userPartial.picture && (
        <Image src={userPartial.picture} width={100} height={100} alt="" />
      )}
      <p>{userPartial.name}</p>
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
          setUserPartial(undefined)
        }}
      >
        Logout
      </button>
    </div>
  )
}
