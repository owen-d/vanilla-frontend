export type Maybe<T> = T | null

export function isJust<T>(x: Maybe<T>): x is T {
  return x !== null
}

export function isNothing<T>(x: Maybe<T>): x is null {
  return x === null
}

export function catMaybes<T>(xs: Maybe<T>[]) {
  return xs.filter(isJust)
}
