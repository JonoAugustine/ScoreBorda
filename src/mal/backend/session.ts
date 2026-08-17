"server only"

import env from "@/env"
import { cookies } from "next/headers"
import { TokenPayload } from "../TokenPayload"
import { STORAGE_KEYS } from "../malUtil"
import { refreshTokens } from "./backauth"

type CookieStore = Awaited<ReturnType<typeof cookies>>

/**
 * Writes the MAL tokens to httpOnly cookies. The access cookie deliberately lives half as long
 * as MAL says the token is good for, which gives `readAccessToken` a window to refresh in
 * before anything the user does actually fails.
 */
export function setSessionCookies(store: CookieStore, tokens: TokenPayload) {
  const secure = env.environment !== "local"
  // `maxAge` is a second count; `expires` is a Date. Both cookies used to be given the second
  // count for *both* options, which put `expires` in January 1970 — the cookie only survived
  // at all because browsers let Max-Age win when the two disagree.
  store.set(STORAGE_KEYS.COOKIES.ACCESS_TOKEN, tokens.access_token, {
    httpOnly: true,
    secure,
    maxAge: Math.floor(tokens.expires_in / 2),
  })
  store.set(STORAGE_KEYS.COOKIES.REFRESH_TOKEN, tokens.refresh_token, {
    httpOnly: true,
    secure,
    maxAge: tokens.expires_in,
  })
}

export function clearSessionCookies(store: CookieStore) {
  store.delete(STORAGE_KEYS.COOKIES.ACCESS_TOKEN)
  store.delete(STORAGE_KEYS.COOKIES.REFRESH_TOKEN)
  // The ID token is no longer mirrored into a cookie, but sessions that logged in before that
  // change still carry one, and logout never used to clear it.
  store.delete(STORAGE_KEYS.LOCAL.ID_TOKEN)
}

/**
 * The access token for the current session, refreshed if it has aged out while the refresh
 * token is still good. Null means there is nothing left to authenticate with.
 */
export async function readAccessToken(): Promise<string | null> {
  const store = await cookies()

  const access = store.get(STORAGE_KEYS.COOKIES.ACCESS_TOKEN)?.value
  if (access) return access

  const refresh = store.get(STORAGE_KEYS.COOKIES.REFRESH_TOKEN)?.value
  if (!refresh) return null

  const { status, data } = await refreshTokens(refresh)

  if (status >= 400 || !("access_token" in data)) {
    console.error(`token refresh failed with ${status}`)
    clearSessionCookies(store)
    return null
  }

  setSessionCookies(store, data)
  return data.access_token
}
