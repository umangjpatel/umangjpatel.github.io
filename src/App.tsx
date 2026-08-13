import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { PixelBackground } from "@/components/pixel-background"
import { TerminalHeader } from "@/components/terminal-header"
import { Footer } from "@/components/footer"

gsap.registerPlugin(ScrollTrigger)

export function App() {
  const { pathname, hash } = useLocation()

  // Scroll to top on route change unless navigating to a hash target
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <div className="scanline noise-bg pixel-bg relative min-h-screen">
      <PixelBackground />
      <TerminalHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
