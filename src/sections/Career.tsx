import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Reveal, SectionLabel, SplitHeading } from '../components/Reveal'
import { experience } from '../data/content'
import { easeOutExpo } from '../lib/motion'

const panel = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
}

export function Career() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const job = experience[active]

  const select = (index: number) => {
    setActive(index)
    tabRefs.current[index]?.focus()
    tabRefs.current[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const last = experience.length - 1
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }
    if (e.key in keys) {
      e.preventDefault()
      select(keys[e.key])
    }
  }

  return (
    <section id="career" className="container-page py-28 md:py-44">
      <SectionLabel index="02">Career</SectionLabel>
      <SplitHeading text="Where I’ve worked" className="mb-14 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none md:mb-20" />

      <Reveal>
        <div
          role="tablist"
          aria-label="Companies"
          onKeyDown={onKeyDown}
          className="no-scrollbar border-line -mx-5 flex overflow-x-auto border-b px-5 md:mx-0 md:px-0"
        >
          {experience.map((exp, i) => (
            <button
              key={exp.company}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`tab-${i}`}
              aria-selected={active === i}
              aria-controls={`panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative shrink-0 px-1 pt-2 pb-4 text-left transition-colors duration-300 not-last:mr-8 md:not-last:mr-14 ${
                active === i ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              <span className="block font-serif text-2xl md:text-4xl">{exp.company}</span>
              <span className="mt-1 block font-mono text-[11px] tracking-wide">
                {exp.start} — {exp.end}
              </span>
              {active === i && (
                <motion.span
                  layoutId="career-indicator"
                  className="bg-accent absolute inset-x-0 -bottom-px h-0.5"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 min-h-[22rem] md:mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid gap-12 md:grid-cols-12 md:gap-10"
          >
            <motion.div variants={item} className="md:col-span-4">
              {job.lead && <p className="mb-5 font-serif text-3xl leading-[1.1] md:text-4xl">{job.lead}</p>}
              <p className={`leading-relaxed ${job.lead ? 'text-muted' : 'text-fg/85'}`}>{job.summary}</p>

              {job.highlights && (
                <dl className="mt-8 flex gap-10">
                  {job.highlights.map((h) => (
                    <div key={h.label}>
                      <dt className="sr-only">{h.label}</dt>
                      <dd className="text-accent font-serif text-5xl leading-none">{h.value}</dd>
                      <dd className="text-muted mt-2 max-w-[9rem] font-mono text-[11px] leading-snug tracking-wide uppercase">{h.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {job.awards && (
                <ul className="text-muted mt-6 space-y-3 text-sm leading-relaxed">
                  {job.awards.map((award) => (
                    <li key={award} className="flex gap-3">
                      <span aria-hidden className="bg-accent mt-[0.6rem] h-px w-3 shrink-0" />
                      {award}
                    </li>
                  ))}
                </ul>
              )}

              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group text-accent mt-8 inline-flex items-center gap-1.5 text-sm"
                >
                  Visit {job.company}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </motion.div>

            <div className="md:col-span-7 md:col-start-6">
              {/* Role timeline: a dot per position on a shared vertical rule */}
              <ol className="border-line relative space-y-12 border-l pl-7 md:pl-9">
                {job.roles.map((role, r) => (
                  <motion.li key={role.title} variants={item} className="relative">
                    <span
                      aria-hidden
                      className={`absolute top-2.5 -left-7 size-2.5 -translate-x-1/2 rounded-full md:-left-9 ${
                        r === 0 ? 'bg-accent shadow-[0_0_0_4px_rgb(77_124_255/0.2)]' : 'bg-line ring-bg ring-4'
                      }`}
                    />
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="font-serif text-2xl leading-tight md:text-3xl">{role.title}</h3>
                      <p className="text-muted shrink-0 font-mono text-xs tracking-wide">
                        {role.start} — {role.end}
                      </p>
                    </div>
                    <ul className="mt-5 space-y-4">
                      {role.bullets.map((b) => (
                        <li key={b.label} className="leading-relaxed">
                          <span className="text-fg">{b.label}.</span> <span className="text-muted">{b.text}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </ol>
              <motion.ul variants={item} className="mt-12 flex flex-wrap gap-x-4 gap-y-2 pl-7 md:pl-9" aria-label="Technologies">
                {job.tech.map((t) => (
                  <li key={t} className="text-muted font-mono text-xs">
                    #{t.toLowerCase().replace(/\s+/g, '-')}
                  </li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
