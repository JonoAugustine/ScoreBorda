"use client"

import {
  generateCodeVerifier,
  generateMalAuthUrl,
  loadCodeVerifier,
  malLogin,
  saveCodeVerifier,
  saveIdToken,
} from "@/mal/frontend"
import { MalUserCtx, MalUserDispatchCtx } from "@/state/malborda"
import Link from "next/link"
import { redirect, RedirectType, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function MalAuth() {
  const user = useContext(MalUserCtx)
  const [loading, setLoading] = useState(true)
  const [verifier, setVerifier] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  useEffect(() => {
    setVerifier(loadCodeVerifier())
    setLoading(false)
  }, [setVerifier, setLoading])

  if (loading || user.loading) return <LoadingScreen />

  if (user.user) {
    return redirect(window.location.origin + "/malborda", RedirectType.push)
  }

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
    <Link href={authurl}>
      <button>Login to MAL</button>
    </Link>
  ) : (
    <LoadingScreen text="Redirecting to MAL Login" />
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
    console.info("requesting access token")
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
    <LoadingScreen text="Logging In" />
  )
}
