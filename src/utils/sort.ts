export type SortingFn<T = any> = (a: T, b: T) => number
export type SortingDirection = "ASC" | "DESC" | null
export function toggleSortingDirection(
  prev: SortingDirection,
): SortingDirection {
  switch (prev) {
    case "ASC":
      return "DESC"
    case "DESC":
      return null
    case null:
      return "ASC"
  }
}

export const getInvertedSortingFn =
  <T = any>(fn: SortingFn<T>): SortingFn<T> =>
  (a, b) =>
    -fn(a, b)

export const sortByString = (a: string, b: string) => a.localeCompare(b)
export const sortByNumber = (a: number, b: number) => a - b
export const sortWithSelector =
  <T = any, R = any>(selector: (item: T) => R) =>
  (sortFn: SortingFn<R>): SortingFn<T> =>
  (a, b) =>
    sortFn(selector(a), selector(b))

export function getSortingFunction(
  fn: SortingFn,
  direction: SortingDirection,
): SortingFn {
  switch (direction) {
    case "ASC":
      return fn

    case "DESC":
      return getInvertedSortingFn(fn)

    case null:
      return () => 0
  }
}
