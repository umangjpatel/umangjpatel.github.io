import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { personalInfo } from "@/lib/data"
import { Mail, Globe, ArrowUpRight } from "lucide-react"
import { useTilt } from "@/hooks/use-tilt"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const {
    ref: tiltRef,
    handleMouseMove,
    handleMouseLeave,
  } = useTilt<HTMLDivElement>({
    maxTilt: 4,
    scale: 1.01,
  })

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

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  const links = [
    {
      icon: Mail,
      label: "email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "text-terminal-green",
      hoverBorder: "hover:border-terminal-green/30",
    },

    {
      icon: Globe,
      label: "web",
      value: "umangjpatel.dev",
      href: personalInfo.website,
      color: "text-terminal-orange",
      hoverBorder: "hover:border-terminal-orange/30",
    },
  ]

  const title = "Get In Touch"

  return (
    <section id="contact" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-xs text-[#6272a4]">
            <span className="text-terminal-green">$</span>
            <span>open ./contact --interactive</span>
          </div>
          <h2 ref={headerRef} className="text-2xl font-bold md:text-4xl">
            <span className="text-terminal-green">&gt; </span>
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
            // let's connect and build something together
          </p>
        </div>

        <div ref={cardRef} className="max-w-2xl opacity-0">
          <div
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="rounded-lg border border-[#44475a] bg-[#313342]/50 p-5 transition-colors will-change-transform hover:border-terminal-green/20 hover:bg-[#313342] hover:shadow-[0_0_30px_rgba(80,250,123,0.05)] md:p-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Window chrome */}
            <div className="mb-4 flex items-center gap-2 border-b border-[#44475a]/50 pb-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5555]/60" />
                <span className="size-2.5 rounded-full bg-[#f1fa8c]/60" />
                <span className="size-2.5 rounded-full bg-[#50fa7b]/60" />
              </div>
              <span className="ml-2 text-[10px] text-[#6272a4]">
                contact.sh
              </span>
            </div>

            {/* Links */}
            <div className="space-y-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "web" ? "_blank" : undefined}
                  rel={
                    link.label === "web" ? "noopener noreferrer" : undefined
                  }
                  className={`group/link flex items-center gap-3 rounded-md border border-[#44475a]/50 bg-[#282a36]/50 px-4 py-3 transition-all ${link.color} ${link.hoverBorder}`}
                >
                  <link.icon className="size-4 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-[#6272a4]">
                      {link.label}:
                    </span>
                    <p className="truncate text-xs text-foreground md:text-sm">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 text-[#6272a4] opacity-0 transition-all group-hover/link:opacity-100" />
                </a>
              ))}
            </div>

            {/* Footer message */}
            <div className="mt-4 border-t border-[#44475a]/50 pt-3">
              <p className="text-[10px] text-[#6272a4] md:text-xs">
                <span className="text-terminal-green">→</span> Always open to
                discussing distributed systems, cloud-native architecture, or
                new opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
