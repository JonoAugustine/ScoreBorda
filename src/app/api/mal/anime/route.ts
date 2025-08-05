import { AnimeListSort, AnimeWatchStatusType, STORAGE_KEYS } from "@/mal"
import { getUserAnimeList } from "@/mal/backend"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { parseIntOrDefault } from "@/util"

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get(STORAGE_KEYS.COOKIES.ACCESS_TOKEN)?.value

  if (!token) return NextResponse.json("Missing Token", { status: 401 })

  const page: number = parseIntOrDefault(
    req.nextUrl.searchParams.get("page"),
    0
  )
  const status = req.nextUrl.searchParams.get("status") || undefined
  const limit = parseIntOrDefault(req.nextUrl.searchParams.get("limit"), 10)
  const sort = req.nextUrl.searchParams.get("sort") || "list_score"

  const animeList = await getUserAnimeList(token, {
    limit: limit,
    offset: page,
    status: status as AnimeWatchStatusType | undefined,
    sort: sort as AnimeListSort,
    fields: ["list_status"],
  })

  console.debug(animeList)

  return NextResponse.json(animeList)
}
