"server only"

import { buildMalUrl, MalApiError } from ".."
import { MalUser } from "../User"

export async function getMalUser(
  accessToken: string
): Promise<MalUser | MalApiError> {
  const res = await fetch(buildMalUrl("users/@me", "v2"), {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return res.json()
}
