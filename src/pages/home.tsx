import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { SideNav } from "@/components/side-nav"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  // Scroll to section on initial load or when hash changes
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""))
      if (el) {
        // Small delay to ensure DOM is fully painted
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" })
        }, 150)
      }
    }
  }, [hash])

  return (
    <>
      <SideNav />
      <main className="relative z-10">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  )
}
