export function catMaybes<A>(xs: (A | undefined)[]): A[] {
  return xs.filter(x => x !== undefined) as A[]
}
