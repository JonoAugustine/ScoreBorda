"server only"

import { cookies } from "next/headers"
import { buildMalUrl } from ".."
import { STORAGE_KEYS } from "../auth"
import { MalUser } from "../User"

export async function getUser(accessToken?: string): Promise<MalUser> {
  let _token = accessToken
  if (!_token) {
    const cookieStore = await cookies()
    if (!cookieStore.has(STORAGE_KEYS.ACCESS_TOKEN))
      throw Error("missing access token")
    _token = cookieStore.get(STORAGE_KEYS.ACCESS_TOKEN)?.value
  }

  const res = await fetch(buildMalUrl("users/@me", "v2"), {
    headers: { Authorization: `Bearer ${_token}` },
  })

  return res.json()
}
