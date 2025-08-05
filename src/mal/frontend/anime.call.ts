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
