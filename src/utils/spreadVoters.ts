export const spreadVoters = <T>(
  voters: ReadonlyArray<T>
): {
  top: T[]
  right: T[]
  bottom: T[]
  left: T[]
} => {
  const votersCopy = [...voters]
  const right: T[] = []
  const left: T[] = []

  if (votersCopy.length >= 2) {
    right.push(votersCopy.pop()!)
  }
  if (votersCopy.length >= 2) {
    left.push(votersCopy.pop()!)
  }

  const top :T[] = votersCopy.slice(0, Math.ceil(votersCopy.length / 2))
  const bottom :T[] = votersCopy.slice(Math.ceil(votersCopy.length / 2))

  return {
    top,
    right,
    bottom,
    left,
  }
}