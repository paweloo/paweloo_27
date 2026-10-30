import { ArrowDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Fragment, useRef } from "react";
import { AsciiPortrait } from "../components/AsciiPortrait";
import { Magnetic } from "../components/Magnetic";
import { profile } from "../data/content";
import { useTypewriter } from "../hooks/useTypewriter";
import { parseEmphasis, stripEmphasis } from "../lib/emphasis";
import { easeOutExpo } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";

const headline = [stripEmphasis(profile.headline)];
const segments = parseEmphasis(profile.headline);

function Caret({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`bg-accent animate-blink inline-block align-baseline ${className}`}
    />
  );
}

/** Renders the first `length` characters of the headline, keeping the *emphasis* styling. */
function TypedHeadline({ length }: { length: number }) {
  let remaining = length;
  return segments.map((seg, i) => {
    const text = seg.text.slice(0, Math.max(0, remaining));
    remaining -= seg.text.length;
    if (!text) return null;
    return seg.em ? (
      <em key={i} className="text-accent italic">
        {text}
      </em>
    ) : (
      <Fragment key={i}>{text}</Fragment>
    );
  });
}

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const title = useTypewriter(headline, {
    loop: false,
    startDelay: 700,
    typeSpeed: 75,
    instant: reduced,
  });
  const tagline = useTypewriter(profile.taglines, {
    enabled: title.done,
    startDelay: 400,
    typeSpeed: 45,
    instant: reduced,
  });

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden">
      <div className="container-page grid min-h-svh items-center gap-6 pt-20 pb-24 md:grid-cols-[1.15fr_1fr] md:gap-10 md:pt-28">
        <motion.div
          className="order-2 md:order-1"
          style={{ opacity: contentOpacity }}
        >
          <motion.p
            className="text-muted mb-6 flex items-center gap-2.5 font-mono text-xs tracking-wide"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
          >
            <span className="relative flex size-2">
              <span className="bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-60" />
              <span className="bg-accent relative inline-flex size-2 rounded-full" />
            </span>
            {profile.status}
          </motion.p>

          <h1 className="font-serif text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em]">
            <span className="sr-only">{headline[0]}</span>
            {/* Invisible full text reserves the final size so typing never shifts the layout */}
            <span aria-hidden className="grid">
              <span className="invisible [grid-area:1/1]">{headline[0]}</span>
              <span className="[grid-area:1/1]">
                <TypedHeadline length={title.length} />
                {!title.done && (
                  <Caret className="ml-1 h-[0.78em] w-[0.06em] translate-y-[0.08em]" />
                )}
              </span>
            </span>
          </h1>

          <p
            className="text-muted mt-6 h-6 font-mono text-sm md:text-base"
            aria-live="off"
          >
            <span className="text-accent">&gt;</span> {tagline.text}
            <Caret className="ml-0.5 h-[1.1em] w-[0.55em] translate-y-[0.2em]" />
          </p>
          <p className="sr-only">{profile.taglines.join(" ")}</p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: easeOutExpo,
              delay: reduced ? 0 : 2.4,
            }}
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToTarget("#projects")}
                className="bg-accent text-bg rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 hover:scale-[1.03]"
              >
                See my work
              </button>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToTarget("#contact")}
                className="border-line hover:border-fg/40 rounded-full border px-6 py-3 text-sm transition-colors duration-300"
              >
                Get in touch
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-1 md:order-2"
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: easeOutExpo }}
        >
          <AsciiPortrait
            src={profile.portrait}
            label={`ASCII portrait of ${profile.name}`}
            className="mx-auto aspect-[4/5] w-[min(64vw,22rem)] md:w-full md:max-w-[34rem]"
          />
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToTarget("#about")}
        className="text-muted hover:text-fg absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        Scroll
        <motion.span
          animate={reduced ? undefined : { y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="size-3.5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
