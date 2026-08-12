import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { personalInfo } from "@/lib/data"
import { Mail, MapPin, ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const gridLayerRef = useRef<HTMLDivElement>(null)
  const scanlineLayerRef = useRef<HTMLDivElement>(null)
  const glowLayerRef = useRef<HTMLDivElement>(null)
  const [typedText, setTypedText] = useState("")
  const fullText = `> hello world. I'm ${personalInfo.name}.`

  // Typewriter effect
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [fullText])

  // Staggered text reveal
  useEffect(() => {
    if (textRef.current) {
      const children = textRef.current.querySelectorAll("[data-animate]")
      gsap.fromTo(
        children,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 1.8,
        }
      )
    }
  }, [])

  // Parallax depth layers
  useEffect(() => {
    if (!sectionRef.current) return

    if (gridLayerRef.current) {
      gsap.to(gridLayerRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }

    if (scanlineLayerRef.current) {
      gsap.to(scanlineLayerRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      })
    }

    if (glowLayerRef.current) {
      gsap.to(glowLayerRef.current, {
        y: -120,
        scale: 0.95,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden px-4 pt-28 pb-12 md:min-h-screen md:px-8 md:pt-36 md:pb-16"
    >
      {/* Parallax Layer 1: Deep grid (Dracula comment color) */}
      <div
        ref={gridLayerRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="h-[120%] w-full opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(98, 114, 164, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(98, 114, 164, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Parallax Layer 2: Diagonal scanlines */}
      <div
        ref={scanlineLayerRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="h-[120%] w-full opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              rgba(189, 147, 249, 0.4),
              rgba(189, 147, 249, 0.4) 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
        />
      </div>

      {/* Parallax Layer 3: Radial glow (Dracula purple + green) */}
      <div
        ref={glowLayerRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bd93f9]/[0.04] blur-[100px]" />
        <div className="absolute top-2/3 right-1/4 h-[300px] w-[300px] rounded-full bg-[#50fa7b]/[0.03] blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[200px] w-[200px] rounded-full bg-[#ff79c6]/[0.02] blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Terminal prompt typed effect */}
        <div className="mb-8 font-mono text-lg text-terminal-green md:text-2xl lg:text-3xl">
          <span className="terminal-glow">{typedText}</span>
          <span className="animate-blink ml-1 inline-block h-6 w-2.5 bg-terminal-green align-middle md:h-7 md:w-3" />
        </div>

        <div ref={textRef} className="space-y-6">
          {/* Title block */}
          <div data-animate className="opacity-0">
            <p className="text-sm text-[#6272a4] md:text-base">
              <span className="text-terminal-pink">const</span>{" "}
              <span className="text-terminal-cyan">role</span>{" "}
              <span className="text-[#6272a4]">=</span>{" "}
              <span className="text-terminal-yellow">
                "{personalInfo.title}"
              </span>
              ;
            </p>
          </div>

          {/* Location */}
          <div data-animate className="opacity-0">
            <p className="text-sm text-[#6272a4] md:text-base">
              <span className="text-terminal-pink">const</span>{" "}
              <span className="text-terminal-cyan">location</span>{" "}
              <span className="text-[#6272a4]">=</span>{" "}
              <span className="text-terminal-yellow">
                "{personalInfo.location}"
              </span>
              ;
            </p>
          </div>

          {/* Bio */}
          <div data-animate className="max-w-3xl space-y-3 opacity-0">
            {personalInfo.bio.map((line, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-foreground/80 md:text-base"
              >
                <span className="mr-2 text-[#6272a4]">//</span>
                {line}
              </p>
            ))}
          </div>

          {/* Info badges */}
          <div data-animate className="flex flex-wrap gap-3 opacity-0">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 rounded-md border border-[#44475a] bg-[#313342] px-3 py-2 text-xs text-[#6272a4] transition-all hover:border-terminal-green/30 hover:text-terminal-green hover:shadow-[0_0_15px_rgba(80,250,123,0.1)]"
            >
              <Mail className="size-3.5" />
              {personalInfo.email}
            </a>
            <span className="flex items-center gap-2 rounded-md border border-[#44475a] bg-[#313342] px-3 py-2 text-xs text-[#6272a4]">
              <MapPin className="size-3.5" />
              {personalInfo.location}
            </span>
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-[#44475a] bg-[#313342] px-3 py-2 text-xs text-[#6272a4] transition-all hover:border-terminal-cyan/30 hover:text-terminal-cyan hover:shadow-[0_0_15px_rgba(139,233,253,0.1)]"
            >
              <ExternalLink className="size-3.5" />
              umangjpatel.dev
            </a>
          </div>

          {/* Scroll indicator */}
          <div data-animate className="pt-12 opacity-0">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#6272a4]/50">
                scroll to explore
              </span>
              <div className="h-8 w-px animate-pulse bg-gradient-to-b from-terminal-purple/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
