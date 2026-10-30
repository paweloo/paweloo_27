import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { easeOutExpo } from '../lib/motion'

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Heading whose words rise out of a mask one after another. */
export function SplitHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <h2 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.06 }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <Reveal className="text-muted mb-10 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase md:mb-14">
      <span className="text-accent">{index}</span>
      <span className="bg-line h-px w-10" />
      {children}
    </Reveal>
  )
}
