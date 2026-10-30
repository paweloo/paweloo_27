import Lenis from 'lenis'

let lenis: Lenis | null = null

export function startSmoothScroll() {
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

/** Scrolls to a selector (e.g. "#about"), smoothly when Lenis is running. */
export function scrollToTarget(target: string) {
  if (lenis) {
    lenis.scrollTo(target === '#top' ? 0 : target, { duration: 1.4 })
    return
  }
  if (target === '#top') window.scrollTo({ top: 0, behavior: 'smooth' })
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}
