"use client"

import { deleteIdToken, malLogout } from "@/mal/frontend"
import { MalUserCtx, MalUserDispatchCtx } from "@/state/malborda"
import Image from "next/image"
import { useContext } from "react"

export function NavMalProfileSection() {
  const { user, loading } = useContext(MalUserCtx)
  const dispatch = useContext(MalUserDispatchCtx)!

  if (loading || !user) return null

  return (
    <div className="nav-mal-profile">
      <div
        className="nav-mal-profile-picture-container"
        onClick={() => console.log("do something")}
      >
        <Image
          fill
          src={user.picture}
          alt={user.name}
          placeholder="blur"
          blurDataURL={user.picture}
        />
      </div>
      <button
        onClick={() => {
          malLogout()
            .then(() => dispatch({ type: "USER_DELETE" }))
            .then(deleteIdToken)
        }}
      >
        Logout
      </button>
    </div>
  )
}
