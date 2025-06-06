"use client"

import { COOKIE_KEYS } from "@/mal"
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function MalAuthCallback() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const [verifier, setVerifier] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function getIDToken() {
      const response = await fetch(`${window.location.origin}/api/mal/token`, {
        method: "POST",
        body: JSON.stringify({
          code,
          verifier,
        }),
      })
      if (response.status === 201) {
        const { idToken } = await response.json()
        localStorage[COOKIE_KEYS.ID_TOKEN] = idToken
        console.log(idToken)
      }
      redirect(`${window.location.origin}/malborda`)
    }
    if (!verifier) {
      const _verifier = localStorage.getItem(COOKIE_KEYS.CODE_VERIFIER)
      if (_verifier) setVerifier(_verifier)
      else {
        try {
          redirect(`${location.origin}/malborda`)
        } catch (error) {
          console.error(error)
        }
      }
    } else {
      getIDToken()
    }
  }, [searchParams, verifier, setVerifier, getIDToken])

  return <div>Loading...</div>
}
