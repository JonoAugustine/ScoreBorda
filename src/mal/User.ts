export type MalUser = {
  id: number
  name: string
  picture: string
  gender?: string
  birthday?: string
  location?: string
  joined_at?: Date
  time_zone?: string
  is_supporter?: boolean
  anime_statistics?: AnimeStatistics
}

export type AnimeStatistics = {
  num_items_watching: number
  num_items_completed: number
  num_items_on_hold: number
  num_items_dropped: number
  num_items_plan_to_watch: number
  num_items: number
  num_days_watched: number
  num_days_watching: number
  num_days_completed: number
  num_days_on_hold: number
  num_days_dropped: number
  /** num_watching_days + num_completed_days + num_on_hold_days + num_dropped_days */
  num_days: number
  num_episodes: number
  num_times_rewatched: number
  mean_score: number
}
