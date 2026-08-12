import { Outlet } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { PixelBackground } from "@/components/pixel-background"
import { TerminalHeader } from "@/components/terminal-header"
import { Footer } from "@/components/footer"

gsap.registerPlugin(ScrollTrigger)

export function App() {
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
