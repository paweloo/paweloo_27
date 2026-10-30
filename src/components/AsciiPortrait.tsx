import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

// Ordered dark → bright
const RAMP = ' .:-=+*o#%@'
// Glyphs shown where the cursor "disturbs" the portrait
const GLYPHS = '{}[]<>/\\=+*;:01'
const FONT_FAMILY = '"JetBrains Mono Variable", ui-monospace, monospace'
const THRESHOLD = 0.07

type Particle = {
  hx: number
  hy: number
  x: number
  y: number
  vx: number
  vy: number
  level: number
  ch: string
  glyph: string
  heat: number
}

const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0]

/**
 * Renders an image as ASCII characters on a canvas. Characters near the
 * pointer are pushed away, turn into code glyphs and spring back home.
 * When the pointer is idle (or on touch devices) a "ghost" pointer drifts
 * across the portrait so it always feels alive.
 */
export function AsciiPortrait({ src, label, className }: { src: string; label: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!wrap || !canvas || !ctx) return

    const root = getComputedStyle(document.documentElement)
    const accent = root.getPropertyValue('--color-accent').trim() || '#4d7cff'
    const fg = '237, 237, 237'
    const styles = [`rgba(${fg},0.16)`, `rgba(${fg},0.34)`, `rgba(${fg},0.58)`, `rgba(${fg},0.88)`, accent, '#b4c6ff']
    const buckets: Particle[][] = styles.map(() => [])

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let fontSize = 10
    let raf = 0
    let visible = true
    let built = false
    let disposed = false
    const pointer = { x: 0, y: 0, last: -Infinity, burst: 0 }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const bucket of buckets) bucket.length = 0
      for (const p of particles) {
        const bucket = p.heat > 0.55 ? 5 : p.heat > 0.18 ? 4 : p.level
        buckets[bucket].push(p)
      }
      for (let b = 0; b < buckets.length; b++) {
        if (!buckets[b].length) continue
        ctx.fillStyle = styles[b]
        for (const p of buckets[b]) ctx.fillText(b >= 4 ? p.glyph : p.ch, p.x, p.y)
      }
    }

    const tick = (t: number) => {
      const idle = t - pointer.last > 2200
      let px = pointer.x
      let py = pointer.y
      let strength = 1
      if (idle) {
        // Lissajous drift for the ghost pointer
        const s = t * 0.00032
        px = width * (0.5 + 0.34 * Math.sin(s * 1.3))
        py = height * (0.46 + 0.3 * Math.sin(s * 0.9 + 1))
        strength = 0.4
      }
      const radius = Math.max(56, width * 0.15) * (1 + pointer.burst)
      const r2 = radius * radius
      pointer.burst *= 0.9

      for (const p of particles) {
        const dx = p.x - px
        const dy = p.y - py
        const d2 = dx * dx + dy * dy
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 1
          const f = (1 - d / radius) * strength
          p.vx += (dx / d) * f * 3.4
          p.vy += (dy / d) * f * 3.4
          p.heat = Math.min(1, p.heat + f * 0.45)
        }
        p.vx = (p.vx + (p.hx - p.x) * 0.055) * 0.83
        p.vy = (p.vy + (p.hy - p.y) * 0.055) * 0.83
        p.x += p.vx
        p.y += p.vy
        p.heat *= 0.94
        if (p.heat > 0.18 && Math.random() < 0.12) p.glyph = randomGlyph()
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (reduced || !built || raf || !visible) return
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const build = (intro: boolean) => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (!width || !height || !img.naturalWidth) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      fontSize = width < 380 ? 6.5 : width < 520 ? 7.5 : 8.5
      const cellW = fontSize * 0.62
      const cellH = fontSize * 1.05
      const cols = Math.floor(width / cellW)
      const rows = Math.floor(height / cellH)

      // Sample the image at one pixel per character cell (object-fit: cover)
      const sample = document.createElement('canvas')
      sample.width = cols
      sample.height = rows
      const sctx = sample.getContext('2d', { willReadFrequently: true })
      if (!sctx) return
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      sctx.drawImage(img, ((width - dw) / 2) * (cols / width), ((height - dh) / 2) * (rows / height), dw * (cols / width), dh * (rows / height))
      const data = sctx.getImageData(0, 0, cols, rows).data

      // Luminance per cell; cells below the threshold (or transparent) are background
      const raw = new Float32Array(cols * rows)
      const histogram = new Uint32Array(256)
      let subject = 0
      for (let j = 0; j < raw.length; j++) {
        const i = j * 4
        const lum = ((0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255) * (data[i + 3] / 255)
        raw[j] = lum
        if (lum < THRESHOLD) continue
        histogram[Math.round(lum * 255)]++
        subject++
      }
      // Histogram-equalize the subject so mid-tone photos still use the full character ramp
      const cdf = new Float32Array(256)
      for (let k = 0, sum = 0; k < 256; k++) {
        sum += histogram[k]
        cdf[k] = subject ? sum / subject : 0
      }

      const animateIn = intro && !reduced
      particles = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const original = raw[r * cols + c]
          if (original < THRESHOLD) continue
          const lum = Math.min(0.999, 0.12 + 0.88 * (0.75 * cdf[Math.round(original * 255)] + 0.25 * original))
          const hx = c * cellW
          const hy = r * cellH
          particles.push({
            hx,
            hy,
            x: animateIn ? hx + (Math.random() - 0.5) * width * 0.8 : hx,
            y: animateIn ? hy + (Math.random() - 0.5) * height * 0.8 : hy,
            vx: 0,
            vy: 0,
            level: Math.min(3, Math.floor(lum * 4)),
            ch: RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))],
            glyph: randomGlyph(),
            heat: animateIn ? 1 : 0,
          })
        }
      }

      ctx.font = `${fontSize}px ${FONT_FAMILY}`
      ctx.textBaseline = 'top'
      built = true
      if (reduced) draw()
      else start()
    }

    const img = new Image()
    img.onload = () => {
      document.fonts
        .load(`10px ${FONT_FAMILY}`)
        .catch(() => undefined)
        .finally(() => !disposed && build(true))
    }
    img.src = src

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const margin = 80
      if (x < -margin || y < -margin || x > rect.width + margin || y > rect.height + margin) return
      pointer.x = x
      pointer.y = y
      pointer.last = performance.now()
    }
    const onPointerDown = (e: PointerEvent) => {
      onPointerMove(e)
      pointer.burst = 1.2
    }

    let resizeTimer = 0
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (Math.abs(wrap.getBoundingClientRect().width - width) > 1) build(false)
      }, 120)
    })
    resizeObserver.observe(wrap)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    visibilityObserver.observe(wrap)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('pointerdown', onPointerDown)

    return () => {
      disposed = true
      stop()
      clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
    }
  }, [src, reduced])

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} role="img" aria-label={label} className="block size-full touch-pan-y" />
    </div>
  )
}
