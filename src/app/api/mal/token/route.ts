import env from "@/env"
import { buildMalUrl, MalUser, queryParamBuilder, TokenPayload } from "@/mal"
import {
  clearSessionCookies,
  getMalUser,
  setSessionCookies,
} from "@/mal/backend"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { code, verifier } = await req.json()

  if (!verifier) {
    return NextResponse.json("missing verifier", { status: 401 })
  }
  if (!code) {
    return NextResponse.json("missing authcode", { status: 401 })
  }

  // get access token
  let malApiResponse: Response
  try {
    malApiResponse = await fetch(buildMalUrl("oauth2/token", "v1"), {
      method: "POST",
      body: queryParamBuilder({
        client_id: env.mal.clientID,
        client_secret: env.mal.clientSecret,
        code,
        code_verifier: verifier,
        grant_type: "authorization_code",
        redirect_uri: `http${env.ssl ? "s" : ""}://${env.domain}/malborda/auth`,
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  } catch (e) {
    console.error(e)
    return Response.json("MAL API Error", { status: 500 })
  }

  if (malApiResponse.status >= 500) {
    console.error(malApiResponse)
    if (malApiResponse.headers.get("Content-Type") == "application/json") {
      console.error(await malApiResponse.json())
    }
    return NextResponse.json("MAL API Error", { status: 529 })
  }

  if (malApiResponse.status >= 400) {
    console.debug(malApiResponse)
    if (malApiResponse.headers.get("Content-Type") == "application/json") {
      console.log(await malApiResponse.json())
    }
    return NextResponse.json("MAL Unauthorized", { status: 401 })
  }

  const tokens: TokenPayload = await malApiResponse.json()

  const cookieStore = await cookies()
  setSessionCookies(cookieStore, tokens)

  // generate ID token
  const user = (await getMalUser(tokens.access_token)) as MalUser

  const idToken = sign({ sub: user.id, user }, env.jwtSecret, {
    algorithm: "HS256",
  })

  // The ID token goes back in the body for the client to keep in localStorage. It used to also
  // be written to a non-httpOnly cookie that nothing ever read and logout never cleared, so a
  // signed token carrying the whole user object outlived the session it belonged to.
  return NextResponse.json({ user, idToken }, { status: 201 })
}

export async function DELETE() {
  const cookieStore = await cookies()
  clearSessionCookies(cookieStore)
  return NextResponse.json("logged out")
}
