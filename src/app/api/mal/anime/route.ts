import {
  AnimeListSort,
  AnimeSearchParams,
  AnimeWatchStatusType,
  MalRequestError,
} from "@/mal"
import { getUserAnimeList, readAccessToken } from "@/mal/backend"
import { NextRequest, NextResponse } from "next/server"
import { parseIntOrDefault } from "@/util"

/** What to ask MAL for when the caller does not say. */
const DEFAULT_FIELDS: AnimeSearchParams["fields"] = ["list_status"]

export async function GET(req: NextRequest) {
  const token = await readAccessToken()

  if (!token) {
    return NextResponse.json("Missing Token", { status: 401 })
  }

  // The client sends `offset`, and so does MAL. This used to read `page`, which meant every
  // request ran with offset 0 — identical pages forever, and `paging.next` never absent.
  const offset = parseIntOrDefault(req.nextUrl.searchParams.get("offset"), 0)
  const status = req.nextUrl.searchParams.get("status") || undefined
  const limit = parseIntOrDefault(req.nextUrl.searchParams.get("limit"), 10)
  const sort = req.nextUrl.searchParams.get("sort") || "list_score"
  // `fields` arrives comma joined, because that is what URLSearchParams does to an array.
  const fields = req.nextUrl.searchParams
    .get("fields")
    ?.split(",")
    .filter(Boolean)

  try {
    const animeList = await getUserAnimeList(token, {
      limit,
      offset,
      status: status as AnimeWatchStatusType | undefined,
      sort: sort as AnimeListSort,
      fields: (fields as AnimeSearchParams["fields"]) ?? DEFAULT_FIELDS,
    })
    return NextResponse.json(animeList)
  } catch (e) {
    console.error(e)
    // This used to return 200 with a string body, so the client parsed a failure as a page and
    // fell over on `page.data` with an unrelated TypeError.
    if (e instanceof MalRequestError && e.status === 401) {
      return NextResponse.json("MAL rejected the access token", { status: 401 })
    }
    return NextResponse.json("Failed to fetch user anime list", { status: 502 })
  }
}
