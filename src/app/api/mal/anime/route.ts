import { STORAGE_KEYS } from "@/mal"
import { getUserAnimeList } from "@/mal/backend"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get(STORAGE_KEYS.COOKIES.ACCESS_TOKEN)?.value

  if (!token) return NextResponse.json("Missing Token", { status: 401 })

  const page: number = parseInt(req.nextUrl.searchParams.get("page") || "0")

  const animeList = await getUserAnimeList(token, {
    limit: 50,
    offset: page,
  })

  return NextResponse.json(animeList)
}
