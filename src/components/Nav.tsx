import { motion, useScroll, useSpring } from 'motion/react'
import type { MouseEvent } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToTarget } from '../lib/scroll'
import { easeOutExpo } from '../lib/motion'
import { Magnetic } from './Magnetic'

const links = [
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]
const sectionIds = ['top', ...links.map((l) => l.id)]

function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const hash = e.currentTarget.getAttribute('href')!
  scrollToTarget(hash)
  history.replaceState(null, '', hash === '#top' ? location.pathname : hash)
}

export function Nav() {
  const active = useActiveSection(sectionIds)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  return (
    <>
      <motion.div aria-hidden className="bg-accent fixed inset-x-0 top-0 z-50 h-px origin-left" style={{ scaleX: progress }} />
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: easeOutExpo, delay: 0.4 }}
      >
        <nav
          aria-label="Main"
          className="border-line bg-bg/70 pointer-events-auto flex items-center gap-0.5 rounded-full border p-1.5 shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-md"
        >
          <Magnetic>
            <a href="#top" onClick={onAnchorClick} aria-label="Back to top" className="block px-3 font-serif text-xl leading-none italic">
              P<span className="text-accent">.</span>
            </a>
          </Magnetic>
          {links.map((link) => (
            <Magnetic key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={onAnchorClick}
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative block rounded-full px-3 py-1.5 text-[13px] transition-colors duration-300 sm:px-4 sm:text-sm ${
                  active === link.id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="bg-fg/10 absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </Magnetic>
          ))}
        </nav>
      </motion.header>
    </>
  )
}
