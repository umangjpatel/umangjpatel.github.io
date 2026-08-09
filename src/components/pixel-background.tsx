import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Pixel art decorative elements scattered in the background.
 * Each element is an SVG drawn with small rects to simulate pixel art.
 */

// Pixel art: small terminal/monitor
function PixelTerminal({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      {/* Monitor body */}
      <rect x="2" y="2" width="12" height="9" fill="#44475a" />
      <rect x="3" y="3" width="10" height="7" fill="#282a36" />
      {/* Screen content - green cursor */}
      <rect x="4" y="5" width="2" height="1" fill="#50fa7b" />
      <rect x="7" y="5" width="3" height="1" fill="#6272a4" />
      <rect x="4" y="7" width="4" height="1" fill="#bd93f9" />
      {/* Stand */}
      <rect x="6" y="11" width="4" height="1" fill="#44475a" />
      <rect x="5" y="12" width="6" height="1" fill="#44475a" />
    </svg>
  )
}

// Pixel art: coffee cup
function PixelCoffee({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 12 12"
      className={className}
      aria-hidden="true"
    >
      {/* Steam */}
      <rect x="4" y="0" width="1" height="1" fill="#6272a4" opacity="0.5" />
      <rect x="6" y="1" width="1" height="1" fill="#6272a4" opacity="0.4" />
      <rect x="3" y="1" width="1" height="1" fill="#6272a4" opacity="0.3" />
      {/* Cup */}
      <rect x="2" y="3" width="7" height="6" fill="#ffb86c" />
      <rect x="3" y="4" width="5" height="4" fill="#44475a" />
      {/* Handle */}
      <rect x="9" y="4" width="1" height="1" fill="#ffb86c" />
      <rect x="10" y="5" width="1" height="2" fill="#ffb86c" />
      <rect x="9" y="7" width="1" height="1" fill="#ffb86c" />
      {/* Saucer */}
      <rect x="1" y="9" width="9" height="1" fill="#6272a4" />
    </svg>
  )
}

// Pixel art: code brackets
function PixelBrackets({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 14 14"
      className={className}
      aria-hidden="true"
    >
      {/* Left bracket < */}
      <rect x="1" y="3" width="1" height="1" fill="#ff79c6" />
      <rect x="0" y="4" width="1" height="1" fill="#ff79c6" />
      <rect x="0" y="5" width="1" height="1" fill="#ff79c6" />
      <rect x="1" y="6" width="1" height="1" fill="#ff79c6" />
      {/* Slash / */}
      <rect x="6" y="2" width="1" height="1" fill="#f1fa8c" />
      <rect x="5" y="3" width="1" height="2" fill="#f1fa8c" />
      <rect x="4" y="5" width="1" height="2" fill="#f1fa8c" />
      <rect x="3" y="7" width="1" height="1" fill="#f1fa8c" />
      {/* Right bracket > */}
      <rect x="9" y="3" width="1" height="1" fill="#ff79c6" />
      <rect x="10" y="4" width="1" height="1" fill="#ff79c6" />
      <rect x="10" y="5" width="1" height="1" fill="#ff79c6" />
      <rect x="9" y="6" width="1" height="1" fill="#ff79c6" />
    </svg>
  )
}

// Pixel art: heart
function PixelHeart({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 10 10"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="2" width="2" height="1" fill="#ff5555" />
      <rect x="4" y="2" width="2" height="1" fill="#ff5555" />
      <rect x="0" y="3" width="4" height="1" fill="#ff5555" />
      <rect x="3" y="3" width="4" height="1" fill="#ff5555" />
      <rect x="0" y="4" width="7" height="1" fill="#ff5555" />
      <rect x="1" y="5" width="5" height="1" fill="#ff5555" />
      <rect x="2" y="6" width="3" height="1" fill="#ff5555" />
      <rect x="3" y="7" width="1" height="1" fill="#ff5555" />
    </svg>
  )
}

// Pixel art: star
function PixelStar({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 10 10"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="0" width="1" height="1" fill="#f1fa8c" />
      <rect x="4" y="1" width="1" height="1" fill="#f1fa8c" />
      <rect x="2" y="2" width="1" height="1" fill="#f1fa8c" />
      <rect x="3" y="2" width="3" height="1" fill="#f1fa8c" />
      <rect x="6" y="2" width="1" height="1" fill="#f1fa8c" />
      <rect x="0" y="3" width="9" height="1" fill="#f1fa8c" />
      <rect x="2" y="4" width="5" height="1" fill="#f1fa8c" />
      <rect x="3" y="5" width="3" height="1" fill="#f1fa8c" />
      <rect x="2" y="6" width="2" height="1" fill="#f1fa8c" />
      <rect x="5" y="6" width="2" height="1" fill="#f1fa8c" />
    </svg>
  )
}

// Pixel art: cloud
function PixelCloud({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="24"
      viewBox="0 0 18 12"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="2" width="3" height="1" fill="#6272a4" />
      <rect x="3" y="3" width="5" height="1" fill="#6272a4" />
      <rect x="9" y="3" width="3" height="1" fill="#6272a4" />
      <rect x="2" y="4" width="13" height="1" fill="#6272a4" />
      <rect x="1" y="5" width="15" height="2" fill="#6272a4" />
      <rect x="2" y="7" width="13" height="1" fill="#6272a4" />
    </svg>
  )
}

// Pixel art: arrow/cursor
function PixelCursor({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 10 12"
      className={className}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="1" height="1" fill="#8be9fd" />
      <rect x="0" y="1" width="2" height="1" fill="#8be9fd" />
      <rect x="0" y="2" width="3" height="1" fill="#8be9fd" />
      <rect x="0" y="3" width="4" height="1" fill="#8be9fd" />
      <rect x="0" y="4" width="5" height="1" fill="#8be9fd" />
      <rect x="0" y="5" width="6" height="1" fill="#8be9fd" />
      <rect x="0" y="6" width="7" height="1" fill="#8be9fd" />
      <rect x="0" y="7" width="4" height="1" fill="#8be9fd" />
      <rect x="0" y="8" width="2" height="1" fill="#8be9fd" />
      <rect x="3" y="8" width="2" height="1" fill="#8be9fd" />
      <rect x="4" y="9" width="2" height="1" fill="#8be9fd" />
    </svg>
  )
}

interface PixelItem {
  component: React.FC<{ className?: string }>
  x: string
  y: string
  opacity: number
  delay: number
  floatDistance: number
}

const pixelItems: PixelItem[] = [
  // Left side scattered
  { component: PixelTerminal, x: "5%", y: "15%", opacity: 0.15, delay: 0, floatDistance: 12 },
  { component: PixelCoffee, x: "8%", y: "45%", opacity: 0.12, delay: 0.5, floatDistance: 8 },
  { component: PixelBrackets, x: "3%", y: "70%", opacity: 0.1, delay: 1, floatDistance: 10 },
  { component: PixelStar, x: "12%", y: "88%", opacity: 0.12, delay: 1.5, floatDistance: 6 },
  // Right side scattered
  { component: PixelCloud, x: "88%", y: "12%", opacity: 0.1, delay: 0.3, floatDistance: 10 },
  { component: PixelHeart, x: "92%", y: "38%", opacity: 0.12, delay: 0.8, floatDistance: 8 },
  { component: PixelCursor, x: "85%", y: "60%", opacity: 0.15, delay: 1.2, floatDistance: 12 },
  { component: PixelTerminal, x: "90%", y: "82%", opacity: 0.1, delay: 1.8, floatDistance: 7 },
  // Middle area (sparse)
  { component: PixelStar, x: "30%", y: "25%", opacity: 0.06, delay: 2, floatDistance: 5 },
  { component: PixelBrackets, x: "70%", y: "30%", opacity: 0.06, delay: 2.3, floatDistance: 6 },
  { component: PixelHeart, x: "45%", y: "55%", opacity: 0.05, delay: 2.5, floatDistance: 4 },
  { component: PixelCloud, x: "60%", y: "75%", opacity: 0.06, delay: 2.8, floatDistance: 5 },
  { component: PixelCoffee, x: "25%", y: "92%", opacity: 0.08, delay: 3, floatDistance: 7 },
  { component: PixelCursor, x: "75%", y: "95%", opacity: 0.08, delay: 3.2, floatDistance: 6 },
]

export function PixelBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll("[data-pixel-item]")

    items.forEach((item, index) => {
      const { delay, floatDistance } = pixelItems[index]

      // Fade in
      gsap.fromTo(
        item,
        { opacity: 0, scale: 0.5 },
        {
          opacity: pixelItems[index].opacity,
          scale: 1,
          duration: 1.5,
          delay: delay + 1,
          ease: "power2.out",
        }
      )

      // Gentle floating animation
      gsap.to(item, {
        y: `+=${floatDistance}`,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay,
      })

      // Subtle parallax on scroll
      gsap.to(item, {
        y: -30 - index * 5,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1 + index * 0.2,
        },
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {pixelItems.map((item, index) => {
        const Component = item.component
        return (
          <div
            key={index}
            data-pixel-item
            className="absolute opacity-0"
            style={{ left: item.x, top: item.y }}
          >
            <Component />
          </div>
        )
      })}
    </div>
  )
}
