import env from "@/env"
import { APPLICATION_FORM_URL_ENCODED } from "@/util"
import { TokenPayload } from "../TokenPayload"
import { buildMalUrl, MalApiError, queryParamBuilder } from "../malUtil"

export async function refreshTokens(
  refresh_token: string
): Promise<{ status: number; data: TokenPayload | MalApiError } | undefined> {
  const res = await fetch(buildMalUrl("/oauth2/token", "v1"), {
    method: "POST",
    body: queryParamBuilder({ grant_type: "refresh_token", refresh_token }),
    headers: {
      Authorization: `Basic ${env.mal.clientSecret}`,
      "Content-Type": APPLICATION_FORM_URL_ENCODED,
    },
  })
  return { status: res.status, data: await res.json() }
}
