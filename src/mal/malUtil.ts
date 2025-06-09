export const STORAGE_KEYS = Object.freeze({
  SESSION: {
    CODE_VERIFIER: "sbCodeChallenge",
  },
  LOCAL: {
    ID_TOKEN: "sbIdToken",
  },
  COOKIES: {
    ACCESS_TOKEN: "sbAccesToken",
    REFRESH_TOKEN: "sbRefreshToken",
  },
})

export type MalApiError = { error?: string; message?: string }

export const malDomain = "myanimelist.net/"

/**
 *
 * @param relativePath
 * @param version will include `api.` subbdomain if v2
 * @param queryParams
 * @returns
 */
export function buildMalUrl(
  relativePath: string = "",
  version: "v2" | "v1" = "v2",
  queryParams?: Record<string, any>
): string {
  return (
    "https://" +
    (version == "v2" ? "api." : "") +
    malDomain +
    `${version}/${relativePath}${queryParams ? `?${queryParamBuilder(queryParams)}` : ""}`
  )
}

/** Filters undefined params then uses the rest to build a URLSearchParams instance */
export function queryParamBuilder(
  params: Record<string, any>
): URLSearchParams {
  return new URLSearchParams(
    Object.entries(params)
      .filter((e) => e[1] != undefined)
      .map((e) => [e[0], e[1].toString()])
  )
}
