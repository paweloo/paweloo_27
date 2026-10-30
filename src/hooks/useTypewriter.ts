import { useEffect, useState } from 'react'

type Options = {
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
  startDelay?: number
  loop?: boolean
  enabled?: boolean
  instant?: boolean
}

type State = { index: number; length: number; deleting: boolean; started: boolean }

/**
 * Types `words` character by character. With `loop`, it deletes and moves on
 * to the next word forever; otherwise it stops after the last word is typed.
 */
export function useTypewriter(
  words: string[],
  {
    typeSpeed = 70,
    deleteSpeed = 35,
    pause = 1800,
    startDelay = 0,
    loop = true,
    enabled = true,
    instant = false,
  }: Options = {},
) {
  const [state, setState] = useState<State>({ index: 0, length: 0, deleting: false, started: false })
  const word = words[state.index % words.length]
  const isLast = state.index === words.length - 1
  const done = instant || (!loop && isLast && state.length === word.length)

  useEffect(() => {
    if (!enabled || instant || done) return

    let delay: number
    let next: State
    if (!state.started) {
      delay = startDelay
      next = { ...state, started: true }
    } else if (!state.deleting && state.length < word.length) {
      // Slight jitter makes the typing feel human
      delay = typeSpeed + Math.random() * typeSpeed * 0.6
      next = { ...state, length: state.length + 1 }
    } else if (!state.deleting) {
      delay = pause
      next = { ...state, deleting: true }
    } else if (state.length > 0) {
      delay = deleteSpeed
      next = { ...state, length: state.length - 1 }
    } else {
      delay = 300
      next = { index: (state.index + 1) % words.length, length: 0, deleting: false, started: true }
    }

    const timer = setTimeout(() => setState(next), delay)
    return () => clearTimeout(timer)
  }, [state, word, words.length, enabled, instant, done, startDelay, typeSpeed, deleteSpeed, pause])

  if (instant) return { text: words[words.length - 1], length: words[words.length - 1].length, done: true }
  return { text: word.slice(0, state.length), length: state.length, done }
}
