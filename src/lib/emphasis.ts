export type Segment = { text: string; em: boolean }

/** Splits "plain *highlighted* plain" into segments. */
export function parseEmphasis(text: string): Segment[] {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('*') && part.endsWith('*')
        ? { text: part.slice(1, -1), em: true }
        : { text: part, em: false },
    )
}

export function stripEmphasis(text: string) {
  return text.replace(/\*/g, '')
}
