export type Page<T> = {
  data: T[]
  paging: {
    previous: string
    next: string
  }
}
