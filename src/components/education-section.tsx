import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { education } from "@/lib/data"
import { GraduationCap, MapPin, Calendar } from "lucide-react"
import { useTilt } from "@/hooks/use-tilt"

gsap.registerPlugin(ScrollTrigger)

function EducationCard({
  edu,
  index,
}: {
  edu: (typeof education)[number]
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
      className="group rounded-lg border border-[#44475a] bg-[#313342]/50 p-5 transition-colors will-change-transform hover:border-terminal-pink/20 hover:bg-[#313342] hover:shadow-[0_0_30px_rgba(255,121,198,0.06)] md:p-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="mb-3 flex items-start gap-3">
        <GraduationCap className="mt-0.5 size-5 shrink-0 text-terminal-pink" />
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground md:text-base">
            {edu.institution}
          </h3>
          <p className="text-xs text-terminal-cyan md:text-sm">{edu.degree}</p>
        </div>
      </div>

      <div className="ml-8 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-[#6272a4]">
          <Calendar className="size-3" />
          {edu.period}
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6272a4]">
          <MapPin className="size-3" />
          {edu.location}
        </div>
        <div className="mt-2 inline-block rounded-md border border-terminal-green/20 bg-terminal-green/5 px-2 py-0.5 text-[10px] text-terminal-green md:text-xs">
          GPA: {edu.gpa}
        </div>
      </div>
    </div>
  )
}

export function EducationSection() {
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
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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

  const title = "Education"

  return (
    <section id="education" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-xs text-[#6272a4]">
            <span className="text-terminal-pink">$</span>
            <span>cat ./education.md</span>
          </div>
          <h2 ref={headerRef} className="text-2xl font-bold md:text-4xl">
            <span className="text-terminal-pink">&gt; </span>
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
            // academic background
          </p>
        </div>

        {/* Education cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
