import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { skillPixelLogos } from "@/components/skill-pixel-logo-map"

interface SkillLogoCarouselProps {
  items: string[]
  color: string
}

export function SkillLogoCarousel({ items, color }: SkillLogoCarouselProps) {
  // Filter to items that have a pixel logo
  const logosAvailable = items.filter((item) => item in skillPixelLogos)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logosAvailable.length <= 1) return

    const interval = setInterval(() => {
      // Animate out
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          opacity: 0,
          scale: 0.7,
          y: -10,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setCurrentIndex((prev) => (prev + 1) % logosAvailable.length)
            // Animate in (happens via the useEffect below on index change)
          },
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [logosAvailable.length])

  // Animate in when index changes
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.7, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
      )
    }
  }, [currentIndex])

  if (logosAvailable.length === 0) return null

  const CurrentLogo = skillPixelLogos[logosAvailable[currentIndex]]
  const currentName = logosAvailable[currentIndex]

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-2 rounded-md border border-[#44475a]/50 bg-[#282a36]/60 p-4"
    >
      <div ref={logoRef} className="flex items-center justify-center">
        <CurrentLogo />
      </div>
      <span className={`text-[10px] font-medium ${color}`}>{currentName}</span>
    </div>
  )
}
