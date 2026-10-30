import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Emphasis } from '../components/Emphasis'
import { Reveal, SectionLabel } from '../components/Reveal'
import { about } from '../data/content'
import { parseEmphasis, stripEmphasis } from '../lib/emphasis'

type Word = { text: string; em: boolean }

const words: Word[] = parseEmphasis(about.statement).flatMap((seg) =>
  seg.text
    .split(' ')
    .filter(Boolean)
    .map((text) => ({ text, em: seg.em })),
)

function ScrollWord({ word, index, progress }: { word: Word; index: number; progress: MotionValue<number> }) {
  const start = index / words.length
  const opacity = useTransform(progress, [start, start + 1 / words.length], [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={word.em ? 'text-accent italic' : undefined}>
      {word.text}{' '}
    </motion.span>
  )
}

/** Statement whose words light up one by one as it scrolls through the viewport. */
function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const className = 'font-serif text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.08] tracking-[-0.01em]'

  if (reduced) {
    return (
      <p className={className}>
        <Emphasis text={about.statement} />
      </p>
    )
  }
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{stripEmphasis(about.statement)}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <ScrollWord key={i} word={word} index={i} progress={scrollYProgress} />
        ))}
      </span>
    </p>
  )
}

export function About() {
  return (
    <section id="about" className="container-page py-28 md:py-44">
      <SectionLabel index="01">About</SectionLabel>

      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <ScrollStatement />
        </div>

        <div className="space-y-10 md:col-span-4 md:col-start-9 md:pt-3">
          <Reveal className="text-muted space-y-5 leading-relaxed">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-line border-line divide-y border-y">
              {about.facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3.5 text-sm">
                  <dt className="text-muted font-mono text-xs tracking-wide uppercase">{fact.label}</dt>
                  <dd className="text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="text-muted mb-4 font-mono text-xs tracking-wide uppercase">Tools I reach for</h3>
            <ul className="flex flex-wrap gap-2">
              {about.stack.map((tool) => (
                <li
                  key={tool}
                  className="border-line hover:border-accent hover:text-accent rounded-full border px-3 py-1 text-sm transition-colors duration-300"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
