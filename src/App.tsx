import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { PixelBackground } from "@/components/pixel-background"
import { TerminalHeader } from "@/components/terminal-header"
import { SideNav } from "@/components/side-nav"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

gsap.registerPlugin(ScrollTrigger)

export function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="scanline noise-bg pixel-bg relative min-h-screen">
      <PixelBackground />
      <TerminalHeader />
      <SideNav />
      <main className="relative z-10">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
