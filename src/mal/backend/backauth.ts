"server only"

import env from "@/env"
import { APPLICATION_FORM_URL_ENCODED } from "@/util"
import { TokenPayload } from "../TokenPayload"
import { buildMalUrl, MalApiError, queryParamBuilder } from "../malUtil"

export async function refreshTokens(
  refresh_token: string
): Promise<{ status: number; data: TokenPayload | MalApiError }> {
  // MAL wants the client credentials in the body, the same way the initial code exchange in
  // /api/mal/token sends them. The header this used to set was `Basic <client_secret>` — no
  // client id, and not base64 — so MAL rejected every refresh.
  const res = await fetch(buildMalUrl("oauth2/token", "v1"), {
    method: "POST",
    body: queryParamBuilder({
      client_id: env.mal.clientID,
      client_secret: env.mal.clientSecret,
      grant_type: "refresh_token",
      refresh_token,
    }).toString(),
    headers: { "Content-Type": APPLICATION_FORM_URL_ENCODED },
  })
  return { status: res.status, data: await res.json() }
}
