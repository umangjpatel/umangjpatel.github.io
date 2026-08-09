import { useRef, useCallback } from "react"
import gsap from "gsap"

interface TiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const {
    maxTilt = 8,
    perspective = 1000,
    scale = 1.02,
    speed = 0.4,
  } = options

  const ref = useRef<T>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      gsap.to(ref.current, {
        rotateX,
        rotateY,
        scale,
        transformPerspective: perspective,
        duration: speed,
        ease: "power2.out",
      })
    },
    [maxTilt, perspective, scale, speed]
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    })
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}
