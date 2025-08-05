import { MalUser, STORAGE_KEYS } from "@/mal"
import { getMalUser } from "@/mal/backend"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

/**
 * Accepts a request with a MAL access token in the cookies.
 * Responds with the MalUser if found.
 */
export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(STORAGE_KEYS.COOKIES.ACCESS_TOKEN)?.value

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
