import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { PointerEvent } from 'react'
import { Reveal, SectionLabel, SplitHeading } from '../components/Reveal'
import { projects, type Project } from '../data/content'

// Asymmetric editorial grid: wide/narrow alternating rows
const spans = ['md:col-span-7', 'md:col-span-5 md:mt-28', 'md:col-span-5', 'md:col-span-7 md:mt-28']
// A tile left alone in the last row gets offset instead of leaving an empty column
const lonelySpan = 'md:col-span-7 md:col-start-4'

function spanFor(index: number, count: number) {
  return index === count - 1 && index % 2 === 0 ? lonelySpan : spans[index % spans.length]
}

function ProjectCard({ project }: { project: Project }) {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 })

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  const Wrapper = project.href ? 'a' : 'div'
  const linkProps = project.href ? { href: project.href, target: '_blank', rel: 'noreferrer', 'data-cursor': 'view' } : {}

  return (
    <Wrapper {...linkProps} onPointerMove={onPointerMove} onPointerLeave={reset} className="group block perspective-[1200px]">
      <motion.div
        style={{ rotateX, rotateY }}
        className="border-line bg-surface relative overflow-hidden rounded-2xl border transform-3d"
      >
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <div className="from-bg/90 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4 pt-16 opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <li
                key={tag}
                style={{ transitionDelay: `${i * 40}ms` }}
                className="border-fg/15 bg-bg/60 translate-y-4 rounded-full border px-3 py-1 font-mono text-[11px] backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 pointer-coarse:translate-y-0"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="flex items-center gap-2 font-serif text-3xl md:text-4xl">
            {project.title}
            {project.href && (
              <ArrowUpRight className="text-accent size-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 pointer-coarse:opacity-100" />
            )}
          </h3>
          <p className="text-muted mt-2 max-w-md text-sm leading-relaxed">{project.description}</p>
        </div>
        {project.year && <span className="text-muted pt-2 font-mono text-xs">{project.year}</span>}
      </div>
    </Wrapper>
  )
}

export function Projects() {
  return (
    <section id="projects" className="container-page py-28 md:py-44">
      <SectionLabel index="03">Selected work</SectionLabel>
      <SplitHeading text="Things I’ve built" className="mb-14 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none md:mb-20" />

      <div className="grid gap-16 md:grid-cols-12 md:gap-x-10 md:gap-y-20">
        {projects.map((project, i) => (
          <Reveal key={project.title} className={spanFor(i, projects.length)} delay={(i % 2) * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
