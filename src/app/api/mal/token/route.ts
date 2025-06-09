import env from "@/env"
import {
  buildMalUrl,
  MalUser,
  queryParamBuilder,
  STORAGE_KEYS,
  TokenPayload,
} from "@/mal"
import { getMalUser } from "@/mal/backend"
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
  const malApiResponse = await fetch(buildMalUrl("oauth2/token", "v1"), {
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

  if (malApiResponse.status >= 500) {
    console.error(malApiResponse)
    if (malApiResponse.headers.get("Content-Type") == "application/json") {
      console.error(await malApiResponse.json())
    }
    return NextResponse.json("MAL API Error", { status: 529 })
  }

  if (malApiResponse.status >= 400) {
    console.log(malApiResponse)
    if (malApiResponse.headers.get("Content-Type") == "application/json") {
      console.log(await malApiResponse.json())
    }
    return NextResponse.json("MAL Unauthorized", { status: 401 })
  }

  console.log("successful login")

  const tokens: TokenPayload = await malApiResponse.json()

  const cookieStore = await cookies()

  cookieStore.set(STORAGE_KEYS.COOKIES.ACCESS_TOKEN, tokens.access_token, {
    httpOnly: true,
    secure: env.environment !== "local",
    expires: tokens.expires_in / 2,
    maxAge: tokens.expires_in / 2,
  })

  cookieStore.set(STORAGE_KEYS.COOKIES.REFRESH_TOKEN, tokens.refresh_token, {
    httpOnly: true,
    secure: env.environment !== "local",
    maxAge: tokens.expires_in,
    expires: tokens.expires_in,
  })

  // generate ID token
  const user = (await getMalUser(tokens.access_token)) as MalUser

  console.log(`uid: ${user.id}`)

  const idToken = sign({ sub: user.id, user }, env.jwtSecret, {
    algorithm: "HS256",
  })

  cookieStore.set(STORAGE_KEYS.LOCAL.ID_TOKEN, idToken, {
    secure: env.environment !== "local",
    httpOnly: false,
  })

  return NextResponse.json({ user, idToken }, { status: 201 })
}
