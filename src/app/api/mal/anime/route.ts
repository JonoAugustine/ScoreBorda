import { AnimeListSort, AnimeWatchStatusType } from "@/mal"
import { getUserAnimeList, readAccessToken } from "@/mal/backend"
import { NextRequest, NextResponse } from "next/server"
import { parseIntOrDefault } from "@/util"

export async function GET(req: NextRequest) {
  const token = await readAccessToken()

  if (!token) {
    return NextResponse.json("Missing Token", { status: 401 })
  }

  const page: number = parseIntOrDefault(
    req.nextUrl.searchParams.get("page"),
    0
  )
  const status = req.nextUrl.searchParams.get("status") || undefined
  const limit = parseIntOrDefault(req.nextUrl.searchParams.get("limit"), 10)
  const sort = req.nextUrl.searchParams.get("sort") || "list_score"
  const fields = req.nextUrl.searchParams.get("fields") || undefined
  console.log(`Fields ${fields}`)

  try {
    const animeList = await getUserAnimeList(token, {
      limit: limit,
      offset: page,
      status: status as AnimeWatchStatusType | undefined,
      sort: sort as AnimeListSort,
      fields: ["list_status"],
    })
    return NextResponse.json(animeList)
  } catch (e) {
    console.error(e)
    return NextResponse.json("Failed to fetch user anime list")
  }
}
