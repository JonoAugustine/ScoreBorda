"client only"

import { decode } from "jsonwebtoken"
import env from "../env"
import { MalUser } from "./User"
import { buildMalUrl } from "./util"

export const STORAGE_KEYS = Object.freeze({
  SESSION: {
    CODE_VERIFIER: "sbCodeChallenge",
  },
  LOCAL: {
    ID_TOKEN: "sbIdToken",
  },
  COOKIES: {
    ACCESS_TOKEN: "sbAccesToken",
    REFRESH_TOKEN: "sbRefreshToken",
  },
})

// GENERATING CODE VERIFIER
function dec2hex(dec: number) {
  return ("0" + dec.toString(16)).substr(-2)
}

export function generateCodeVerifier(): string {
  const array = new Uint32Array(56 / 2)
  window.crypto.getRandomValues(array)
  return Array.from(array, dec2hex).join("")
}

export function generateMalAuthUrl(
  code_challenge: string,
  redirect_url?: string
): string {
  return buildMalUrl("oauth2/authorize", "v1", {
    client_id: env.mal.clientID,
    response_type: "code",
    code_challenge,
    state: "sb_mal_auth",
    redirect_url,
    code_challenge_method: "plain",
  })
}

export function saveCodeVerifier(verifier: string) {
  window.sessionStorage[STORAGE_KEYS.SESSION.CODE_VERIFIER] = verifier
}

export function loadCodeVerifier(): string {
  return window.sessionStorage[STORAGE_KEYS.SESSION.CODE_VERIFIER]
}

export async function malLogin(
  authCode: string,
  verifier: string
): Promise<{ idToken: string; user: string }> {
  const response = await fetch(`${window.location.origin}/api/mal/token`, {
    method: "POST",
    body: JSON.stringify({
      code: authCode,
      verifier,
    }),
  })
  return response.json()
}

export function loadUser(): Partial<MalUser> | null {
  const token = window.localStorage[STORAGE_KEYS.LOCAL.ID_TOKEN]
  try {
    const jwt = decode(token, { json: true })
    console.debug(jwt)
    return (
      jwt && {
        id: jwt?.sub ? parseInt(jwt!.sub!) : undefined,
        name: jwt?.name,
        picture: jwt?.picture,
      }
    )
  } catch (error) {
    console.error(error)
    return null
  }
}

export function saveIdToken(token: string) {
  window.localStorage[STORAGE_KEYS.LOCAL.ID_TOKEN] = token
}

export function deleteIdToken() {
  delete window.localStorage[STORAGE_KEYS.LOCAL.ID_TOKEN]
}
