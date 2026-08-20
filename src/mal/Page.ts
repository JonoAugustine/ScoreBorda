export type Page<T> = {
  data: T[]
  /**
   * MAL omits `next` on the last page and `previous` on the first, and returns `paging` as an
   * empty object rather than filling both in. Declaring them required made "is there another
   * page?" look answerable when it is not.
   */
  paging?: {
    previous?: string
    next?: string
  }
}
