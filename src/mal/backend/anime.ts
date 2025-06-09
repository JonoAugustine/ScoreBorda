import { AnimeListEntryDetail, AnimeNode, AnimeSearchParams } from "../Anime"
import { Page } from "../Page"
import { buildMalUrl } from "../malUtil"

export async function getUserAnimeList(
  accessToken: string,
  params?: AnimeSearchParams
): Promise<Page<{ node: AnimeNode; list_status: AnimeListEntryDetail }>> {
  const url = buildMalUrl("users/@me/animelist", "v2", params)

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    throw new Error(
      `Failed to fetch user anime list: ${res.status} ${res.statusText}`
    )
  }

  return await res.json()
}
