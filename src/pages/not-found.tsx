import { useEffect, useRef } from "react"
import { useLocation, Link } from "react-router-dom"
import gsap from "gsap"

export function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }
      )
    }
  }, [])

  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-24 pb-16 md:px-8">
      <div ref={containerRef} className="mx-auto max-w-lg text-center">
        <p className="mb-4 text-xs text-[#6272a4]">
          <span className="text-terminal-green">$</span> cd {location.pathname}
        </p>

        <h1 className="mb-2 text-4xl font-bold text-terminal-red md:text-5xl">
          404
        </h1>

        <p className="mb-6 font-mono text-sm text-foreground">
          <span className="text-terminal-red">zsh: command not found:</span>{" "}
          <span className="text-[#6272a4]">{location.pathname}</span>
        </p>

        <div className="mb-8 rounded-lg border border-[#44475a] bg-[#313342]/60 p-4 text-left">
          <p className="text-xs text-[#6272a4]">
            <span className="text-terminal-orange">hint:</span> The path you
            requested doesn't exist. Try one of these:
          </p>
          <div className="mt-3 space-y-1 text-xs">
            <p>
              <span className="text-terminal-green">~</span>{" "}
              <span className="text-[#6272a4]">→</span>{" "}
              <Link to="/" className="text-terminal-cyan hover:underline">
                /
              </Link>{" "}
              <span className="text-[#6272a4]">(home)</span>
            </p>
            <p>
              <span className="text-terminal-green">~</span>{" "}
              <span className="text-[#6272a4]">→</span>{" "}
              <Link to="/goodies" className="text-terminal-cyan hover:underline">
                /goodies
              </Link>{" "}
              <span className="text-[#6272a4]">(toy projects)</span>
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-terminal-purple/10 px-4 py-2 text-xs font-medium text-terminal-purple transition-colors hover:bg-terminal-purple/20"
        >
          <span>cd ~</span>
        </Link>
      </div>
    </main>
  )
}
