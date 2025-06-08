"use client"

import {
  generateCodeVerifier,
  generateMalAuthUrl,
  loadCodeVerifier,
  malLogin,
  saveCodeVerifier,
  saveIdToken,
} from "@/mal"
import { MalUserCtx, MalUserDispatchCtx } from "@/state/malborda"
import Link from "next/link"
import { redirect, RedirectType, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function MalAuth() {
  const [loading, setLoading] = useState(true)
  const [verifier, setVerifier] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  useEffect(() => {
    setVerifier(loadCodeVerifier())
    setLoading(false)
  }, [setVerifier])

  if (loading) return <p>Loading...</p>

  return code && verifier ? (
    <MalAuthCallback code={code} verifier={verifier} />
  ) : (
    <MalLogin />
  )
}

function MalLogin() {
  const [authurl, setAuthUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const verifier = generateCodeVerifier()
    saveCodeVerifier(verifier)
    const url = generateMalAuthUrl(verifier, `${location.origin}/malborda/auth`)
    setAuthUrl(url)
  }, [setAuthUrl])

  return authurl ? (
    redirect(authurl, RedirectType.push)
  ) : (
    <p>Redirecting to MAL Login...</p>
  )
}

function MalAuthCallback({
  code,
  verifier,
}: {
  code: string
  verifier: string
}) {
  const userCtx = useContext(MalUserCtx)
  const userDispatch = useContext(MalUserDispatchCtx)!
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {
    malLogin(code, verifier)
      .then(({ idToken, user }) => {
        saveIdToken(idToken)
        userDispatch({ type: "USER_SET", payload: user })
      })
      .catch((e) => {
        console.error(e)
        setError(e)
      })
  }, [code, verifier, userDispatch, setError])

  return error ? (
    <div>
      <p>
        Uh somethings not right...{" "}
        <span>
          <Link href={"/malborda/auth"}>
            <button>try again?</button>
          </Link>
        </span>
      </p>
    </div>
  ) : userCtx.user ? (
    redirect(window.location.origin + "/malborda")
  ) : (
    <div>Logining In...</div>
  )
}
