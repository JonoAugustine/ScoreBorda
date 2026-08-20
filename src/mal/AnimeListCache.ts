import { AnimeSearchResponse, AnimeWatchStatusType } from "./Anime"

export type AnimeListCacheQuery = {
  status?: AnimeWatchStatusType
  minScore?: number
}

export class AnimeListCache {
  private readonly _entries: Map<number, AnimeSearchResponse>

  constructor(entries: AnimeSearchResponse[] = []) {
    this._entries = new Map(entries.map((e) => [e.node.id, e]))
  }

  getById(id: number): AnimeSearchResponse | undefined {
    return this._entries.get(id)
  }

  all(): AnimeSearchResponse[] {
    return Array.from(this._entries.values())
  }

  filter({ status, minScore }: AnimeListCacheQuery): AnimeSearchResponse[] {
    return this.all().filter((entry) => {
      const ls = entry.list_status
      if (status !== undefined && ls?.status !== status) return false
      return !(minScore !== undefined && (ls?.score ?? 0) < minScore)
    })
  }

  get size(): number {
    return this._entries.size
  }
}
