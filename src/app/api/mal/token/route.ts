import env from "@/env"
import { buildMalUrl, queryParamBuilder, STORAGE_KEYS } from "@/mal"
import { getUser } from "@/mal/backend"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

type TokenPayload = {
  token_type: "Bearer"
  expires_in: number
  access_token: string
  refresh_token: string
}

export async function POST(req: NextRequest) {
  const { code, verifier } = await req.json()

  const cookieStore = await cookies()

  if (!verifier) {
    return NextResponse.json("Unauthorized", { status: 401 })
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
      //redirect_uri: `${env.domain}/malborda`, this breaks auth idk why
    }).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })

  if (malApiResponse.status >= 500) {
    console.log(malApiResponse)
    if (malApiResponse.headers.get("Content-Type") == "application/json") {
      console.log(await malApiResponse.json())
    }
    return NextResponse.json("MAL API Error", { status: 529 })
  }

  if (malApiResponse.status >= 400) {
    if (malApiResponse.headers.get("Content-Type") == "application/json") {
      console.log(await malApiResponse.json())
    }
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  console.log("successful login")

  const tokens: TokenPayload = await malApiResponse.json()

  cookieStore.set(STORAGE_KEYS.COOKIES.ACCESS_TOKEN, tokens.access_token, {
    httpOnly: true,
    secure: env.environment !== "local",
    expires: tokens.expires_in,
  })

  cookieStore.set(STORAGE_KEYS.COOKIES.ACCESS_TOKEN, tokens.access_token, {
    httpOnly: true,
    secure: env.environment !== "local",
  })

  // generate ID token
  const user = await getUser(tokens.access_token)

  console.log(`uid: ${user.id}`)

  const idToken = sign(
    { sub: user.id, name: user.name, picture: user.picture },
    env.jwtSecret,
    { algorithm: "HS256" }
  )

  cookieStore.set(STORAGE_KEYS.LOCAL.ID_TOKEN, idToken, {
    secure: env.environment !== "local",
    httpOnly: false,
  })

  return NextResponse.json({ user, idToken }, { status: 201 })
}
