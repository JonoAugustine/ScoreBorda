"use client"

import {
  COOKIE_KEYS,
  generateCodeVerifier,
  generateMalAuthUrl,
  MalUser,
} from "@/mal"
import { decode, JwtPayload } from "jsonwebtoken"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MalBorda() {
  const [authurl, setAuthUrl] = useState<string | undefined>(undefined)
  const [userPartial, setUserPartial] = useState<Partial<MalUser> | undefined>(
    undefined
  )

  async function getAuthUrl() {
    const verifier = generateCodeVerifier()
    //const challenge = await generateCodeChallenge(verifier)
    window.localStorage.setItem(COOKIE_KEYS.CODE_VERIFIER, verifier)
    console.log(
      verifier,
      generateMalAuthUrl(verifier, `${location.origin}/malborda/callback`)
    )
    setAuthUrl(
      generateMalAuthUrl(verifier, `${location.origin}/malborda/callback`)
    )
  }

  useEffect(() => {
    const idToken = localStorage[COOKIE_KEYS.ID_TOKEN]
    if (!idToken) getAuthUrl()
    else {
      const decoded = decode(idToken) as JwtPayload
      console.log(decoded)
      setUserPartial({
        id: (decoded?.sub && Number.parseInt(decoded.sub)) || undefined,
        name: decoded?.name,
        picture: decoded?.pfp,
      })
    }
  }, [setAuthUrl, setUserPartial])

  return (
    (userPartial && (
      <div>
        {userPartial.picture && (
          <Image src={userPartial.picture} width={250} height={250} alt="" />
        )}
        <p>{userPartial.name}</p>
      </div>
    )) ||
    (authurl && (
      <div>
        <Link href={authurl}>
          <button>Login To My Anime List</button>
        </Link>
      </div>
    )) || <div>Loading...</div>
  )
}
