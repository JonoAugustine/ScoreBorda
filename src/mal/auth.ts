import env from "../env"
import { buildMalUrl } from "./util"

export const COOKIE_KEYS = Object.freeze({
  CODE_VERIFIER: "sbCodeChallenge",
  ACCESS_TOKEN: "sbAccesToken",
  REFRESH_TOKEN: "sbRefreshToken",
  ID_TOKEN: "sbIdToken",
})

// GENERATING CODE VERIFIER
function dec2hex(dec: number) {
  return ("0" + dec.toString(16)).substr(-2)
}

export function generateCodeVerifier() {
  const array = new Uint32Array(56 / 2)
  window.crypto.getRandomValues(array)
  return Array.from(array, dec2hex).join("")
}

function base64urlencode(a: any) {
  let str = ""
  const bytes = new Uint8Array(a)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i])
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function sha256(plain: string) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest("SHA-256", data)
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const hashed = await sha256(verifier)
  const base64encoded = base64urlencode(hashed)
  return base64encoded
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
