import {
  AnimeSearchParams,
  AnimeSearchResponse,
  buildMalUrl,
  Page,
} from "@/mal"

export async function getUserAnimeList(
  accessToken: string,
  params?: AnimeSearchParams
): Promise<Page<AnimeSearchResponse>> {
  const url = buildMalUrl("users/@me/animelist", "v2", {
    ...params,
    /** @see https://myanimelist.net/apiconfig/references/api/v2#section/Common-parameters */
    fields: params?.fields
      ?.map((field) => {
        if (Array.isArray(field)) return `my_list_status{${field.join(",")}}`
        else return field
      })
      .join(","),
  })

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
