import { parseEmphasis } from '../lib/emphasis'

export function Emphasis({ text }: { text: string }) {
  return parseEmphasis(text).map((seg, i) =>
    seg.em ? (
      <em key={i} className="text-accent italic">
        {seg.text}
      </em>
    ) : (
      <span key={i}>{seg.text}</span>
    ),
  )
}
