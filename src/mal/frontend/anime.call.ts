"client only"

import { AnimeSearchParams, AnimeSearchResponse } from "../Anime"
import { queryParamBuilder } from "../malUtil"
import { Page } from "../Page"

const _path = "/api/mal/anime"

export async function clientGetAnimeList(
  params: AnimeSearchParams = {}
): Promise<Page<AnimeSearchResponse>> {
  const res = await fetch(
    location.origin + _path + "?" + queryParamBuilder(params)
  )
  if (!res.ok)
    throw new Error(
      `Failed to fetch anime list: ${res.status} ${res.statusText}`
    )

  return await res.json()
}

/**
 * Fetches every page of the user's anime list and returns all entries.
 * Uses offset-based pagination, stopping when `paging.next` is absent.
 */
export async function clientGetAllAnime(
  params: Omit<AnimeSearchParams, "offset"> = {}
): Promise<AnimeSearchResponse[]> {
  const limit = 1000
  const results: AnimeSearchResponse[] = []
  let offset = 0

  while (true) {
    const page = await clientGetAnimeList({ ...params, limit, offset })
    results.push(...page.data)
    if (!page.paging?.next) break
    offset += limit
  }

  return results
}
