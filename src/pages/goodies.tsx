import { useEffect, useRef } from "react"
import gsap from "gsap"

export function GoodiesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      )
    }
  }, [])

  return (
    <main className="relative z-10 min-h-screen px-4 pt-24 pb-16 md:px-8">
      <div
        ref={containerRef}
        className="mx-auto max-w-4xl"
      >
        {/* Section header */}
        <div className="mb-8">
          <p className="mb-2 text-xs text-[#6272a4]">
            <span className="text-terminal-cyan">$</span> ls ~/goodies/
          </p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            <span className="text-terminal-cyan">&gt;</span> Toy Projects
          </h1>
          <p className="mt-3 text-sm text-[#6272a4]">
            // Side quests, experiments, and things built for fun.
          </p>
        </div>

        {/* Empty state */}
        <div className="rounded-lg border border-[#44475a] bg-[#313342]/60 p-8 text-center">
          <p className="font-mono text-sm text-[#6272a4]">
            <span className="text-terminal-yellow">⚠</span>{" "}
            No entries yet. Check back soon.
          </p>
          <p className="mt-2 font-mono text-xs text-[#6272a4]/60">
            {`// TODO: add toy projects`}
          </p>
        </div>
      </div>
    </main>
  )
}
