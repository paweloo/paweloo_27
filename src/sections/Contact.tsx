import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Magnetic } from "../components/Magnetic";
import { Reveal, SectionLabel, SplitHeading } from "../components/Reveal";
import { SocialIcon } from "../components/SocialIcon";
import { profile } from "../data/content";
import { scrollToTarget } from "../lib/scroll";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Magnetic>
      <button
        type="button"
        onClick={copy}
        className="group border-line hover:border-accent flex items-center gap-4 rounded-full border py-3 pr-3 pl-6 text-base transition-colors duration-300 md:text-xl"
      >
        <span>{profile.email}</span>
        <span className="bg-accent text-bg relative grid size-10 place-items-center overflow-hidden rounded-full md:size-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="sr-only" aria-live="polite">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </button>
    </Magnetic>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="container-page flex min-h-svh flex-col pt-28 md:pt-44"
    >
      <SectionLabel index="04">Contact</SectionLabel>
      <SplitHeading
        text="Let’s build something good."
        className="max-w-5xl font-serif text-[clamp(3rem,10vw,8.5rem)] leading-[0.92]"
      />
      <Reveal
        delay={0.2}
        className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12"
      >
        <div className="md:col-span-6">
          <p className="text-muted mb-8 max-w-md leading-relaxed">
            Have a project in mind, a role to fill, or just want to say hi? My
            inbox is always open. I'll get back to you within a day or two.
          </p>
          <CopyEmail />
        </div>

        <ul className="divide-line border-line divide-y self-end border-y md:col-span-4 md:col-start-9">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group hover:text-accent flex items-center justify-between py-4 transition-colors duration-300"
              >
                <span className="flex items-center gap-3">
                  <SocialIcon icon={social.icon} />
                  {social.label}
                </span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <footer className="border-line text-muted mt-auto flex flex-col gap-4 border-t py-8 font-mono text-xs sm:flex-row sm:items-center sm:justify-between md:mt-32">
        <p>
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <button
          type="button"
          onClick={() => scrollToTarget("#top")}
          className="hover:text-fg flex items-center gap-2 transition-colors"
        >
          Back to top <ArrowUp className="size-3.5" />
        </button>
      </footer>
    </section>
  );
}
