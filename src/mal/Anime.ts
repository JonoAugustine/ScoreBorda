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

export type AnimeSearchParams = {
  status?: AnimeWatchStatusType
  sort?: AnimeListSort
  limit?: number
  offset?: number
}

/**
 * Genre object as returned by MyAnimeList API.
 */
export type AnimeGenre = {
  id: number
  name: string
}

/**
 * Studio object as returned by MyAnimeList API.
 */
export type AnimeStudio = {
  id: number
  name: string
}

/**
 * Picture object as returned by MyAnimeList API.
 */
export type AnimePicture = {
  medium: string
  large: string
}

export type AnimeNode = {
  id: number
  title: string
  main_picture?: AnimePicture
}

/**
 * Related anime object as returned by MyAnimeList API.
 */
export type RelatedAnime = {
  relation_type: string
  relation_type_formatted: string
}

/**
 * Related manga object as returned by MyAnimeList API.
 */
export type RelatedManga = {
  node: AnimeNode
  relation_type: string
  relation_type_formatted: string
}

/**
 * Recommendation object as returned by MyAnimeList API.
 */
export type AnimeRecommendation = {
  node: {
    id: number
    title: string
    main_picture?: AnimePicture
  }
  num_recommendations: number
}

export const AnimeWatchStatus = [
  "watching",
  "completed",
  "on_hold",
  "dropped",
  "plan_to_watch",
] as const

/** @see https://stackoverflow.com/questions/44480644/string-union-to-string-array */
type _animewatchstatustypeconversion = typeof AnimeWatchStatus

export type AnimeWatchStatusType = _animewatchstatustypeconversion[number]

export type AnimeListEntryDetail = {
  status: AnimeWatchStatusType
  score: number
  num_episodes_watched: number
  is_rewatching: boolean
  updated_at: string
}

/**
 * Main Anime type as returned by MyAnimeList API.
 */
export type Anime = {
  /** Unique MyAnimeList ID for the anime. */
  id: number
  /** Title of the anime. */
  title: string
  /** Main picture URLs for the anime. */
  main_picture?: AnimePicture
  /** Alternative titles for the anime. */
  alternative_titles?: {
    synonyms: string[]
    en: string
    ja: string
  }
  /** Start date of airing (ISO8601). */
  start_date?: string | null
  /** End date of airing (ISO8601). */
  end_date?: string | null
  /** Synopsis/description of the anime. */
  synopsis?: string
  /** Mean user score (0-10). */
  mean?: number | null
  /** Ranking position. */
  rank?: number | null
  /** Popularity ranking. */
  popularity?: number | null
  /** Number of users who have this anime in their list. */
  num_list_users?: number | null
  /** Number of users who have scored this anime. */
  num_scoring_users?: number | null
  /** NSFW rating ("white", "gray", "black"). */
  nsfw?: "white" | "gray" | "black"
  /** Creation timestamp (ISO8601). */
  created_at?: string
  /** Last update timestamp (ISO8601). */
  updated_at?: string
  /** Media type (tv, ova, movie, etc). */
  media_type?: "unknown" | "tv" | "ova" | "movie" | "special" | "ona" | "music"
  /** Airing status. */
  status?: "finished_airing" | "currently_airing" | "not_yet_aired"
  /** List of genres. */
  genres?: AnimeGenre[]
  /** User's list status for this anime. */
  my_list_status?: AnimeListEntryDetail
  /** Total number of episodes. */
  num_episodes?: number | null
  /** Season and year the anime started airing. */
  start_season?: {
    year: number
    season: "winter" | "spring" | "summer" | "fall"
  }
  /** Broadcast schedule. */
  broadcast?: {
    day_of_the_week: string
    start_time: string
  }
  /** Source material (e.g., manga, light novel). */
  source?: string
  /** Average episode duration in seconds. */
  average_episode_duration?: number | null
  /** Age rating (e.g., PG-13, R). */
  rating?: string
  /** List of additional pictures. */
  pictures?: AnimePicture[]
  /** Background information. */
  background?: string
  /** List of related anime. */
  related_anime?: RelatedAnime[]
  /** List of related manga. */
  related_manga?: RelatedManga[]
  /** List of recommendations. */
  recommendations?: AnimeRecommendation[]
  /** List of studios. */
  studios?: AnimeStudio[]
  /** Statistics about user statuses. */
  statistics?: {
    status: {
      watching: number
      completed: number
      on_hold: number
      dropped: number
      plan_to_watch: number
    }
    num_list_users: number
  }
}
