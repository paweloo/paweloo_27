import { MotionConfig, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { startSmoothScroll } from './lib/scroll'
import { About } from './sections/About'
import { Career } from './sections/Career'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'

function App() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    return startSmoothScroll()
  }, [reduced])

  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Career />
        <Projects />
        <Contact />
      </main>
      <div aria-hidden className="grain" />
    </MotionConfig>
  )
}

export default App
