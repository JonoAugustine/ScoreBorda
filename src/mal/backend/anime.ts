import { AnimeListEntryDetail, AnimeListStatus, AnimeNode } from "../Anime"
import { Page } from "../Page"
import { buildMalUrl } from "../util"

/**
 * Sort options for the user's anime list, as per MyAnimeList API.
 * See: https://myanimelist.net/apiconfig/references/api/v2#operation/users_user_id_animelist_get
 */
export type AnimeListSort =
  | "list_score"
  | "list_updated_at"
  | "anime_title"
  | "anime_start_date"
  | "anime_id"

export async function getUserAnimeList(
  accessToken: string,
  params?: {
    status?: AnimeListStatus
    sort?: AnimeListSort
    limit?: number
    offset?: number
  }
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
