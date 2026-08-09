import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { FolderGit2 } from "lucide-react"
import { useTilt } from "@/hooks/use-tilt"

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>({
    maxTilt: 6,
    scale: 1.02,
  })

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-card={index}
      className="group relative overflow-hidden rounded-lg border border-[#44475a] bg-[#313342]/50 p-5 transition-colors will-change-transform hover:border-terminal-cyan/30 hover:bg-[#313342] hover:shadow-[0_0_30px_rgba(139,233,253,0.06)] md:p-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Top bar decoration */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5555]/60" />
          <span className="size-2.5 rounded-full bg-[#f1fa8c]/60" />
          <span className="size-2.5 rounded-full bg-[#50fa7b]/60" />
        </div>
        <span className="ml-2 text-[10px] text-[#6272a4]">
          ~/{project.name}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4 flex items-start gap-3">
        <FolderGit2 className="mt-0.5 size-5 shrink-0 text-terminal-cyan" />
        <div>
          <h3 className="mb-1 text-sm font-semibold text-foreground md:text-base">
            {project.name}
          </h3>
          <p className="text-xs leading-relaxed text-[#6272a4] md:text-sm">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="border border-terminal-cyan/20 bg-terminal-cyan/5 text-[10px] text-terminal-cyan md:text-xs"
          >
            {tech}
          </Badge>
        ))}
      </div>

      {/* Hover glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/[0.04] to-transparent" />
      </div>
    </div>
  )
}

export function ProjectsSection() {
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
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
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

  const title = "Projects"

  return (
    <section id="projects" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-xs text-[#6272a4]">
            <span className="text-terminal-cyan">$</span>
            <span>ls ~/projects/</span>
          </div>
          <h2 ref={headerRef} className="text-2xl font-bold md:text-4xl">
            <span className="text-terminal-cyan">&gt; </span>
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
            // things I've built for fun and learning
          </p>
        </div>

        {/* Project cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
