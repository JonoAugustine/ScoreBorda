"server only"

import { buildMalUrl } from ".."
import { MalUser } from "../User"

export async function getUser(accessToken: string): Promise<MalUser> {
  const res = await fetch(buildMalUrl("users/@me", "v2"), {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return res.json()
}
