export const APPLICATION_FORM_URL_ENCODED = "application/x-www-form-urlencoded"
export const APPLICATION_JSON = "application/json"

export function parseIntOrDefault(any: any, defaultValue: number): number {
  try {
    return parseInt(any) || defaultValue
  } catch (e) {
    return defaultValue
  }
}
