import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { skills } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Code, Layers, Workflow } from "lucide-react"
import { useTilt } from "@/hooks/use-tilt"
import { SkillLogoCarousel } from "@/components/skill-logo-carousel"

gsap.registerPlugin(ScrollTrigger)

function SkillCard({
  group,
  index,
}: {
  group: {
    title: string
    icon: typeof Code
    items: string[]
    color: string
    badgeColor: string
    glowColor: string
  }
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
      className="group rounded-lg border border-[#44475a] bg-[#313342]/50 p-5 transition-colors will-change-transform hover:border-[#44475a] hover:bg-[#313342] md:p-6"
      style={
        {
          transformStyle: "preserve-3d",
          "--glow": group.glowColor,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <group.icon className={`size-4 ${group.color}`} />
        <h3 className={`text-sm font-semibold ${group.color}`}>
          {group.title}
        </h3>
      </div>

      {/* Pixel logo carousel */}
      <div className="mb-4">
        <SkillLogoCarousel items={group.items} color={group.color} />
      </div>

      {/* JSON-like display */}
      <div className="mb-4 rounded-md bg-[#282a36]/80 p-3">
        <pre className="text-[10px] leading-relaxed text-[#6272a4] md:text-xs">
          <span className="text-terminal-pink">{"{"}</span>
          {"\n"}
          {group.items.map((item, i) => (
            <span key={item}>
              {"  "}
              <span className={group.color}>"{item}"</span>
              {i < group.items.length - 1 ? "," : ""}
              {"\n"}
            </span>
          ))}
          <span className="text-terminal-pink">{"}"}</span>
        </pre>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <Badge
            key={item}
            variant="outline"
            className={`text-[10px] ${group.badgeColor}`}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const groupsRef = useRef<HTMLDivElement>(null)

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

    if (groupsRef.current) {
      const cards = groupsRef.current.querySelectorAll("[data-card]")
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: groupsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  const skillGroups = [
    {
      title: "Languages",
      icon: Code,
      items: skills.languages,
      color: "text-terminal-green",
      badgeColor:
        "border-terminal-green/20 bg-terminal-green/5 text-terminal-green",
      glowColor: "rgba(80, 250, 123, 0.05)",
    },
    {
      title: "Technologies",
      icon: Layers,
      items: skills.technologies,
      color: "text-terminal-cyan",
      badgeColor:
        "border-terminal-cyan/20 bg-terminal-cyan/5 text-terminal-cyan",
      glowColor: "rgba(139, 233, 253, 0.05)",
    },
    {
      title: "Practices",
      icon: Workflow,
      items: skills.practices,
      color: "text-terminal-purple",
      badgeColor:
        "border-terminal-purple/20 bg-terminal-purple/5 text-terminal-purple",
      glowColor: "rgba(189, 147, 249, 0.05)",
    },
  ]

  const title = "Skills & Technologies"

  return (
    <section id="skills" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-xs text-[#6272a4]">
            <span className="text-terminal-purple">$</span>
            <span>echo $SKILLS | jq .</span>
          </div>
          <h2 ref={headerRef} className="text-2xl font-bold md:text-4xl">
            <span className="text-terminal-purple">&gt; </span>
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
            // tools in my development toolkit
          </p>
        </div>

        {/* Skill groups */}
        <div
          ref={groupsRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
        >
          {skillGroups.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
