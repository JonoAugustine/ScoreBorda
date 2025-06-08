"use client"

import { deleteIdToken, loadUser, MalUser } from "@/mal"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function MalBorda() {
  const [loading, setLoading] = useState(true)
  const [userPartial, setUserPartial] = useState<Partial<MalUser> | undefined>()

  // on window load, check if
  useEffect(() => {
    const user = loadUser()
    if (user) setUserPartial(user)
    setLoading(false)
  }, [setUserPartial, setLoading])

  console.debug("user partial", userPartial)

  if (loading) return <p>Loading MAL User...</p>

  if (!userPartial) return redirect(window.location.origin + "/malborda/auth")

  return (
    <div>
      {userPartial.picture && (
        <Image src={userPartial.picture} width={150} height={150} alt="" />
      )}
      <p>{userPartial.name}</p>
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
