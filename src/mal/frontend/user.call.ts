"client only"

import { MalUser } from "../User"

export async function clientGetMalUser(): Promise<MalUser | undefined> {
  console.log("fetching user")
  const res = await fetch(location.origin + "/api/mal/user")
  if (!res.ok) {
    try {
      console.error("failed to fetch user", await res.text())
    } catch (e) {
      console.error("failed to fetch user, no error text received", e)
    }
    return undefined
  }
  return res.json()
}
