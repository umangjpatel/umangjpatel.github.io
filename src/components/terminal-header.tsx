import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { navItems } from "@/lib/data"

// Dracula-themed section colors
const sectionAccentColors: Record<string, string> = {
  "#home": "text-terminal-green",
  "#experience": "text-terminal-orange",
  "#projects": "text-terminal-cyan",
  "#skills": "text-terminal-purple",
  "#education": "text-terminal-pink",
  "#contact": "text-terminal-green",
}

const sectionAccentBg: Record<string, string> = {
  "#home": "bg-terminal-green/10 text-terminal-green",
  "#experience": "bg-terminal-orange/10 text-terminal-orange",
  "#projects": "bg-terminal-cyan/10 text-terminal-cyan",
  "#skills": "bg-terminal-purple/10 text-terminal-purple",
  "#education": "bg-terminal-pink/10 text-terminal-pink",
  "#contact": "bg-terminal-green/10 text-terminal-green",
}

export function TerminalHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("#home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""))

      // If near the bottom of the page, force-select the last section
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0 && scrollTop / docHeight > 0.95) {
        setActiveSection(`#${sections[sections.length - 1]}`)
        return
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(`#${sections[i]}`)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const accentColor =
    sectionAccentColors[activeSection] || "text-terminal-green"

  return (
    <header
      ref={headerRef}
      className="fixed top-0 right-0 left-0 z-50 border-b border-[#44475a]/50 bg-[#282a36]/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <a
          href="#home"
          className={`group flex items-center gap-2 text-sm font-bold transition-all ${accentColor}`}
        >
          <span className="text-[#6272a4]">~/</span>
          <span>umangjpatel</span>
          <span className="animate-blink">_</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href
            const activeBg = sectionAccentBg[item.href] || ""
            const activePrefix =
              sectionAccentColors[item.href] || "text-terminal-green"

            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 text-xs transition-all ${
                  isActive
                    ? activeBg
                    : "text-[#6272a4] hover:bg-[#44475a]/50 hover:text-foreground"
                }`}
              >
                <span
                  className={`${isActive ? activePrefix : "text-[#6272a4]/40"} mr-0.5`}
                >
                  ./
                </span>
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col gap-1 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-5 transition-all ${accentColor.replace("text-", "bg-")} ${mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 transition-all ${accentColor.replace("text-", "bg-")} ${mobileMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 transition-all ${accentColor.replace("text-", "bg-")} ${mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="border-t border-[#44475a]/50 bg-[#282a36]/95 px-4 py-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href
              const activeBg = sectionAccentBg[item.href] || ""
              const activePrefix =
                sectionAccentColors[item.href] || "text-terminal-green"

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-md px-3 py-2 text-xs transition-all ${
                    isActive
                      ? activeBg
                      : "text-[#6272a4] hover:bg-[#44475a]/50 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`${isActive ? activePrefix : "text-[#6272a4]/40"} mr-0.5`}
                  >
                    ./
                  </span>
                  {item.label}
                </a>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
