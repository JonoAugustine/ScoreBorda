import { MalUser } from "@/mal"
import { getMalUser, readAccessToken } from "@/mal/backend"
import { NextResponse } from "next/server"

/**
 * Accepts a request with a MAL access token in the cookies.
 * Responds with the MalUser if found.
 */
export async function GET() {
  const accessToken = await readAccessToken()

  if (!accessToken) {
    return NextResponse.json("missing access token", { status: 401 })
  }

  const userOrError = await getMalUser(accessToken)

  if ("error" in userOrError) {
    return NextResponse.json(userOrError.error ?? "Unknown MAL Error", {
      status: 400,
    })
  }

  const user = userOrError as MalUser

  return NextResponse.json(user, { status: 200 })
}
