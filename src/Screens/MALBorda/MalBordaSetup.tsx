import { AnimeSearchParams, AnimeWatchStatus, AnimeWatchStatusType } from "@/mal"
import { useContext, useState } from "react"
import { MalUserCtx, MalUserDispatchCtx } from "@/state/malborda"

export function MalBordaSetup() {
  const userCtx = useContext(MalUserCtx)
  const dispatch = useContext(MalUserDispatchCtx)
  const [params, setParams] = useState<AnimeSearchParams | undefined>({})

  return (
    <div>
      <div>
        <label htmlFor="status">
          Anime Status:
          <select
            onChange={(e) => {
              setParams({
                ...params,
                status:
                  e.target.value == "none"
                    ? undefined
                    : (e.target.value as AnimeWatchStatusType),
              })
            }}
            name="status"
            id="status"
          >
            <option value="none">none</option>
            {AnimeWatchStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
