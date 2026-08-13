import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { Gamepad2, LayoutGrid } from "lucide-react"

interface GoodieItem {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  tags: string[]
}

const goodies: GoodieItem[] = [
  {
    title: "Tic-Tac-Toe",
    description:
      "Classic 3×3 grid game with two-player and AI modes. Features minimax algorithm for the hard difficulty.",
    href: "/goodies/tictactoe",
    icon: <Gamepad2 className="h-6 w-6 text-terminal-cyan" />,
    tags: ["game", "ai", "react"],
  },
  {
    title: "Sequence",
    description:
      "Classic card-based strategy board game. Two players compete to form sequences of 5 chips in a row on a 10×10 board.",
    href: "/goodies/sequence",
    icon: <LayoutGrid className="h-6 w-6 text-terminal-cyan" />,
    tags: ["game", "strategy", "cards"],
  },
]

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
      <div ref={containerRef} className="mx-auto max-w-4xl">
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

        {/* Goodies grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {goodies.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group rounded-lg border border-[#44475a] bg-[#313342]/60 p-5 transition-all hover:border-terminal-cyan hover:bg-[#313342]"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <h2 className="font-bold text-foreground">{item.title}</h2>
              </div>
              <p className="mb-3 text-xs text-[#6272a4]">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#44475a] px-1.5 py-0.5 text-[10px] text-[#6272a4]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
