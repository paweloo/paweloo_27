import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

type Variant = 'default' | 'hover' | 'view' | 'hidden'

const ring: Record<Variant, { size: number; className: string }> = {
  default: { size: 34, className: 'border-fg/40 bg-transparent' },
  hover: { size: 58, className: 'border-accent bg-accent/10' },
  view: { size: 92, className: 'border-accent bg-accent' },
  hidden: { size: 0, className: 'border-transparent' },
}

/**
 * Dot + trailing ring. Links/buttons grow the ring; elements with
 * data-cursor="view" turn it into a filled "View" badge. Desktop only.
 */
export function Cursor() {
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches)
  const [variant, setVariant] = useState<Variant>('hidden')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return
    const html = document.documentElement
    html.classList.add('custom-cursor')

    const updateVariant = (el: Element | null) => {
      const target = el?.closest<HTMLElement>('[data-cursor], a, button')
      setVariant(target ? ((target.dataset.cursor as Variant | undefined) ?? 'hover') : 'default')
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      updateVariant(e.target as Element | null)
    }
    // Content scrolls under a still mouse, so re-check what is beneath it
    const onScroll = () => {
      if (x.get() < 0) return
      updateVariant(document.elementFromPoint(x.get(), y.get()))
    }
    const onLeave = () => setVariant('hidden')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    html.addEventListener('pointerleave', onLeave)
    return () => {
      html.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      html.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  const { size, className } = ring[variant]

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <motion.div
        className={`absolute top-0 left-0 flex items-center justify-center rounded-full border transition-colors duration-300 ${className}`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <motion.span
          className="font-mono text-[11px] tracking-widest text-bg uppercase"
          animate={{ opacity: variant === 'view' ? 1 : 0, scale: variant === 'view' ? 1 : 0.6 }}
        >
          View
        </motion.span>
      </motion.div>
      <motion.div
        className="bg-accent absolute top-0 left-0 size-1.5 rounded-full"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: variant === 'hidden' || variant === 'view' ? 0 : 1 }}
      />
    </div>
  )
}
