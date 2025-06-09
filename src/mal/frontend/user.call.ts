"client only"

import { MalUser } from "../User"

export async function clientGetMalUser(): Promise<MalUser> {
  const res = await fetch(location.origin + "/api/mal/user")
  return await res.json()
}
