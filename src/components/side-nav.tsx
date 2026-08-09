import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { navItems } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

// Dracula-themed section colors
const sectionColors: Record<string, string> = {
  home: "bg-terminal-green",
  experience: "bg-terminal-orange",
  projects: "bg-terminal-cyan",
  skills: "bg-terminal-purple",
  education: "bg-terminal-pink",
  contact: "bg-terminal-green",
}

const sectionTextColors: Record<string, string> = {
  home: "text-terminal-green",
  experience: "text-terminal-orange",
  projects: "text-terminal-cyan",
  skills: "text-terminal-purple",
  education: "text-terminal-pink",
  contact: "text-terminal-green",
}

export function SideNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 2 }
      )
    }
  }, [])

  useEffect(() => {
    const sections = navItems.map((item) => item.href.replace("#", ""))

    sections.forEach((sectionId) => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      })
    })

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)

      // If scrolled near the bottom, force-activate the last section
      if (progress > 0.95) {
        const lastSection = sections[sections.length - 1]
        setActiveSection(lastSection)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 opacity-0 xl:flex"
      aria-label="Section navigation"
    >
      <div className="relative flex flex-col items-end gap-4">
        {/* Scroll progress line */}
        <div className="absolute top-0 right-[5px] h-full w-px bg-[#44475a]">
          <div
            className="w-full bg-terminal-purple/60 transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {navItems.map((item) => {
          const sectionId = item.href.replace("#", "")
          const isActive = activeSection === sectionId
          const dotColor = sectionColors[sectionId] || "bg-terminal-green"
          const textColor =
            sectionTextColors[sectionId] || "text-terminal-green"

          return (
            <a
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-3"
              aria-label={item.label}
            >
              {/* Label */}
              <span
                className={`text-[10px] uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? `${textColor} opacity-100`
                    : "text-[#6272a4] opacity-0 group-hover:opacity-100"
                }`}
              >
                {item.label}
              </span>

              {/* Dot indicator */}
              <span
                className={`relative z-10 rounded-full transition-all duration-300 ${
                  isActive
                    ? `size-3 ${dotColor} shadow-[0_0_10px_currentColor]`
                    : "size-2 bg-[#6272a4]/40 group-hover:bg-[#6272a4]"
                }`}
              />
            </a>
          )
        })}
      </div>
    </nav>
  )
}
