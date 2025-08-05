import { decode } from "jsonwebtoken"
import env from "../../env"
import { MalUser } from "../User"
import { buildMalUrl, STORAGE_KEYS } from "../malUtil"

;("client only")

// GENERATING CODE VERIFIER
function dec2hex(dec: number) {
  return ("0" + dec.toString(16)).substr(-2)
}

export function generateCodeVerifier(): string {
  const array = new Uint32Array(56 / 2)
  window.crypto.getRandomValues(array)
  return Array.from(array, dec2hex).join("")
}

/**
 * https://myanimelist.net/v1/oauth2/authorize
 *    ?response_type=code
 *    &code_challenge=52762b90a964dd8ab4a0a85361d371410f1df47ece37f7674c341b8a
 *    &state=sb_mal_auth
 *    &redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmalborda%2Fauth
 *    &code_challenge_method=plain
 * @param code_challenge
 * @param redirect_uri
 */
export function generateMalAuthUrl(
  code_challenge: string,
  redirect_uri?: string
): string {
  return buildMalUrl("oauth2/authorize", "v1", {
    client_id: env.mal.clientID,
    response_type: "code",
    code_challenge,
    state: "sb_mal_auth",
    redirect_uri,
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
  console.debug("logging in with auth code")
  const response = await fetch(`${window.location.origin}/api/mal/token`, {
    method: "POST",
    body: JSON.stringify({
      code: authCode,
      verifier,
    }),
  })
  console.debug("login response", response)
  if (!response.ok) {
    throw new Error("Failed to login")
  }
  return response.json()
}

export async function malLogout(): Promise<boolean> {
  console.info("logging out")
  const response = await fetch(`${window.location.origin}/api/mal/token`, {
    method: "DELETE",
  })
  console.debug("logout response", response)
  return response.ok
}

/** Load the user from a saved id token */
export function loadUserFromIdToken(): MalUser | null {
  console.info("loading user from id token")
  const token = window.localStorage[STORAGE_KEYS.LOCAL.ID_TOKEN]
  if (!token) {
    console.info("no id token found")
    return null
  }
  try {
    const jwt = decode(token, { json: true })
    if (jwt) {
      console.debug("id token decoded", jwt)
      return jwt.user
    } else {
      console.error("id token decode failed")
    }
  } catch (error) {
    console.error(error)
  }
  return null
}

export function saveIdToken(token: string) {
  window.localStorage[STORAGE_KEYS.LOCAL.ID_TOKEN] = token
}

/** Deletes the ID token from localstorage */
export function deleteIdToken() {
  delete window.localStorage[STORAGE_KEYS.LOCAL.ID_TOKEN]
}
