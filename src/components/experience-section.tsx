import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { experiences } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { useTilt } from "@/hooks/use-tilt"

gsap.registerPlugin(ScrollTrigger)

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number]
  index: number
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>({
    maxTilt: 5,
    scale: 1.01,
  })

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-card={index}
      className="group relative rounded-lg border border-[#44475a] bg-[#313342]/50 p-5 transition-colors will-change-transform hover:border-terminal-orange/20 hover:bg-[#313342] hover:shadow-[0_0_30px_rgba(255,184,108,0.05)] md:ml-10 md:p-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Timeline dot */}
      <div className="absolute top-7 -left-[29px] hidden size-3 rounded-full border-2 border-terminal-orange bg-[#282a36] shadow-[0_0_8px_rgba(255,184,108,0.4)] md:block" />

      {/* Header */}
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground md:text-lg">
            <Briefcase className="size-4 text-terminal-orange" />
            {exp.company}
          </h3>
          <p className="text-sm text-terminal-cyan">{exp.role}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="border-terminal-orange/20 bg-terminal-orange/5 text-xs text-terminal-orange"
          >
            <Calendar className="mr-1 size-3" />
            {exp.period}
          </Badge>
          <Badge
            variant="outline"
            className="border-[#44475a] text-xs text-[#6272a4]"
          >
            <MapPin className="mr-1 size-3" />
            {exp.location}
          </Badge>
        </div>
      </div>

      {/* Highlights */}
      <ul className="space-y-2">
        {exp.highlights.map((highlight, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs leading-relaxed text-foreground/70 md:text-sm"
          >
            <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-terminal-orange/50" />
            {highlight}
          </li>
        ))}
      </ul>

      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-terminal-orange/[0.03] to-transparent" />
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      const chars = headerRef.current.querySelectorAll("[data-char]")
      gsap.fromTo(
        chars,
        { opacity: 0, y: 20, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll("[data-card]")
      gsap.fromTo(
        cards,
        { opacity: 0, x: -40, rotateY: -5 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  const title = "Work Experience"

  return (
    <section ref={sectionRef} id="experience" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-xs text-[#6272a4]">
            <span className="text-terminal-orange">$</span>
            <span>cat ./experience.log</span>
          </div>
          <h2 ref={headerRef} className="text-2xl font-bold md:text-4xl">
            <span className="text-terminal-orange">&gt; </span>
            {title.split("").map((char, i) => (
              <span
                key={i}
                data-char
                className="inline-block text-foreground"
                style={{ transformOrigin: "bottom" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="mt-3 text-sm text-[#6272a4]">
            // where I've contributed and shipped things
          </p>
        </div>

        {/* Timeline */}
        <div ref={cardsRef} className="relative space-y-6">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-3 hidden w-px bg-gradient-to-b from-terminal-orange/50 via-terminal-orange/20 to-transparent md:left-4 md:block" />

          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
