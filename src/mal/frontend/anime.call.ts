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

const PAGE_LIMIT = 1000

/**
 * MAL caps a page at 1000 entries, so 50 pages is 50,000 — far past any real list. This is a
 * backstop, not a policy: the loop used to have `paging.next` as its only exit, which made a
 * server-side offset bug an unbounded fetch that hung the tab.
 */
const MAX_PAGES = 50

/**
 * Fetches every page of the user's anime list and returns all entries.
 * Uses offset-based pagination, stopping on a short page or when `paging.next` is absent.
 */
export async function clientGetAllAnime(
  params: Omit<AnimeSearchParams, "offset"> = {}
): Promise<AnimeSearchResponse[]> {
  const results: AnimeSearchResponse[] = []

  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await clientGetAnimeList({
      ...params,
      limit: PAGE_LIMIT,
      offset: page * PAGE_LIMIT,
    })
    results.push(...res.data)
    // A page shorter than the limit is the last one, whatever `paging` claims.
    if (res.data.length < PAGE_LIMIT || !res.paging?.next) return results
  }

  console.warn(
    `Stopped paginating the anime list at ${MAX_PAGES} pages (${results.length} entries); ` +
      `there may be more.`
  )
  return results
}
