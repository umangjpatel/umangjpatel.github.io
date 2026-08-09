import { personalInfo } from "@/lib/data"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Separator className="mb-6 bg-[#44475a]/50" />
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-[10px] text-[#6272a4] md:text-xs">
            <span className="text-terminal-purple">©</span>{" "}
            {new Date().getFullYear()} {personalInfo.name}. Built with React +
            GSAP.
          </p>
          <p className="text-[10px] text-[#6272a4]/50 md:text-xs">
            <span className="text-terminal-green/50">$</span> exit 0
          </p>
        </div>
      </div>
    </footer>
  )
}
