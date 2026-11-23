import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Reveal, SectionLabel, SplitHeading } from "../components/Reveal";
import { projects, type Project } from "../data/content";

// Asymmetric editorial grid: wide/narrow alternating rows
const spans = [
  "md:col-span-7",
  "md:col-span-5 md:mt-28",
  "md:col-span-5",
  "md:col-span-7 md:mt-28",
];
// A tile left alone in the last row gets offset instead of leaving an empty column
const lonelySpan = "md:col-span-7 md:col-start-4";

function spanFor(index: number, count: number) {
  return index === count - 1 && index % 2 === 0
    ? lonelySpan
    : spans[index % spans.length];
}

// macOS-style browser title bar: traffic lights plus an address pill with the site's domain
function MacWindowBar({
  href,
  screens,
}: {
  href?: string;
  screens?: { count: number; active: number };
}) {
  const domain = href
    ? new URL(href).hostname.replace(/^www\./, "")
    : undefined;
  return (
    <div
      className="border-line relative flex h-9 items-center border-b bg-[#1a1a1d] px-3.5"
      aria-hidden="true"
    >
      <div className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      {domain && (
        <div className="text-muted absolute left-1/2 flex h-5 w-2/5 max-w-60 -translate-x-1/2 items-center justify-center gap-1.5 rounded-md bg-white/5 font-mono text-[10px]">
          <svg viewBox="0 0 16 16" className="size-2.5 fill-current opacity-70">
            <path d="M4 7V5a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
          </svg>
          {domain}
        </div>
      )}
      {screens && <ScreenDots {...screens} className="ml-auto" />}
    </div>
  );
}

function ScreenDots({
  count,
  active,
  className = "",
}: {
  count: number;
  active: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "bg-fg/80 w-4" : "bg-fg/25 w-1.5"}`}
        />
      ))}
    </div>
  );
}

const SCREEN_INTERVAL = 3200;

// Cycles through the screens while the card is on screen
function useScreenCycle(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (count < 2 || !inView) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % count),
      SCREEN_INTERVAL,
    );
    return () => clearInterval(id);
  }, [count, inView]);

  return { ref, active };
}

function ProjectCard({ project }: { project: Project }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  const images = Array.isArray(project.image) ? project.image : [project.image];
  const { ref: screensRef, active } = useScreenCycle(images.length);
  const screens =
    images.length > 1 ? { count: images.length, active } : undefined;
  const imageClass =
    "w-full object-cover duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]";

  const Wrapper = project.href ? "a" : "div";
  const linkProps = project.href
    ? {
        href: project.href,
        target: "_blank",
        rel: "noreferrer",
        "data-cursor": "view",
      }
    : {};

  return (
    <Wrapper
      {...linkProps}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className="group block perspective-[1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="border-line bg-surface relative overflow-hidden rounded-2xl border transform-3d"
      >
        {project.frame === "mac" && (
          <MacWindowBar href={project.href} screens={screens} />
        )}
        <div ref={screensRef} className="relative overflow-hidden">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? `Screenshot of ${project.title}` : ""}
              loading="lazy"
              style={{ aspectRatio: project.ratio ?? "16 / 10" }}
              className={`${imageClass} ${i > 0 ? "absolute inset-0" : ""} ${
                screens
                  ? `transition-[transform,opacity] ${i === active ? "opacity-100" : "opacity-0"}`
                  : "transition-transform"
              }`}
            />
          ))}
          {screens && project.frame !== "mac" && (
            <ScreenDots
              {...screens}
              className="bg-bg/60 absolute top-3 right-3 rounded-full px-2 py-1.5 backdrop-blur-sm"
            />
          )}
        </div>
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
          <p className="text-muted mt-2 max-w-md text-sm leading-relaxed">
            {project.description}
          </p>
        </div>
        {project.year && (
          <span className="text-muted pt-2 font-mono text-xs">
            {project.year}
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export function Projects() {
  return (
    <section id="projects" className="container-page py-28 md:py-44">
      <SectionLabel index="03">Selected work</SectionLabel>
      <SplitHeading
        text="Things I’ve built recently"
        className="mb-14 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none md:mb-20"
      />

      <div className="grid gap-16 md:grid-cols-12 md:gap-x-10 md:gap-y-20">
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            className={spanFor(i, projects.length)}
            delay={(i % 2) * 0.1}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
