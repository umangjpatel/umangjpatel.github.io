/**
 * Pixel art logos for technologies in the Skills section.
 * Each is a 16x16 grid rendered as SVG rects.
 */

interface PixelLogoProps {
  className?: string
}

// Java - Coffee cup icon
export function PixelJava({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Java">
      {/* Steam */}
      <rect x="6" y="0" width="1" height="1" fill="#ffb86c" />
      <rect x="8" y="0" width="1" height="1" fill="#ffb86c" />
      <rect x="7" y="1" width="1" height="1" fill="#ffb86c" />
      <rect x="9" y="1" width="1" height="1" fill="#ffb86c" />
      {/* Cup */}
      <rect x="4" y="3" width="8" height="7" fill="#ff5555" />
      <rect x="5" y="4" width="6" height="5" fill="#282a36" />
      <rect x="6" y="5" width="1" height="3" fill="#f8f8f2" />
      <rect x="8" y="5" width="1" height="3" fill="#f8f8f2" />
      <rect x="7" y="7" width="1" height="1" fill="#f8f8f2" />
      {/* Handle */}
      <rect x="12" y="4" width="1" height="1" fill="#ff5555" />
      <rect x="13" y="5" width="1" height="3" fill="#ff5555" />
      <rect x="12" y="8" width="1" height="1" fill="#ff5555" />
      {/* Saucer */}
      <rect x="3" y="11" width="10" height="1" fill="#6272a4" />
      <rect x="4" y="12" width="8" height="1" fill="#6272a4" />
    </svg>
  )
}

// Python - Snake icon
export function PixelPython({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Python">
      {/* Blue half */}
      <rect x="4" y="1" width="4" height="1" fill="#8be9fd" />
      <rect x="3" y="2" width="1" height="5" fill="#8be9fd" />
      <rect x="4" y="2" width="4" height="1" fill="#8be9fd" />
      <rect x="4" y="3" width="1" height="4" fill="#8be9fd" />
      <rect x="5" y="6" width="4" height="1" fill="#8be9fd" />
      <rect x="8" y="2" width="1" height="5" fill="#8be9fd" />
      {/* Eye blue */}
      <rect x="5" y="3" width="1" height="1" fill="#f8f8f2" />
      {/* Yellow half */}
      <rect x="7" y="8" width="4" height="1" fill="#f1fa8c" />
      <rect x="7" y="9" width="1" height="5" fill="#f1fa8c" />
      <rect x="11" y="8" width="1" height="5" fill="#f1fa8c" />
      <rect x="8" y="12" width="4" height="1" fill="#f1fa8c" />
      <rect x="12" y="9" width="1" height="4" fill="#f1fa8c" />
      <rect x="8" y="13" width="4" height="1" fill="#f1fa8c" />
      {/* Eye yellow */}
      <rect x="10" y="10" width="1" height="1" fill="#282a36" />
    </svg>
  )
}

// Kubernetes - Helm wheel
export function PixelKubernetes({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Kubernetes">
      {/* Circle */}
      <rect x="6" y="1" width="4" height="1" fill="#8be9fd" />
      <rect x="4" y="2" width="2" height="1" fill="#8be9fd" />
      <rect x="10" y="2" width="2" height="1" fill="#8be9fd" />
      <rect x="3" y="3" width="1" height="2" fill="#8be9fd" />
      <rect x="12" y="3" width="1" height="2" fill="#8be9fd" />
      <rect x="2" y="5" width="1" height="4" fill="#8be9fd" />
      <rect x="13" y="5" width="1" height="4" fill="#8be9fd" />
      <rect x="3" y="9" width="1" height="2" fill="#8be9fd" />
      <rect x="12" y="9" width="1" height="2" fill="#8be9fd" />
      <rect x="4" y="11" width="2" height="1" fill="#8be9fd" />
      <rect x="10" y="11" width="2" height="1" fill="#8be9fd" />
      <rect x="6" y="12" width="4" height="1" fill="#8be9fd" />
      {/* Center */}
      <rect x="7" y="6" width="2" height="2" fill="#f8f8f2" />
      {/* Spokes */}
      <rect x="7" y="3" width="2" height="1" fill="#f8f8f2" />
      <rect x="7" y="10" width="2" height="1" fill="#f8f8f2" />
      <rect x="4" y="7" width="1" height="1" fill="#f8f8f2" />
      <rect x="11" y="7" width="1" height="1" fill="#f8f8f2" />
    </svg>
  )
}

// Docker - Whale with containers
export function PixelDocker({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Docker">
      {/* Containers on whale */}
      <rect x="3" y="3" width="2" height="2" fill="#8be9fd" />
      <rect x="6" y="3" width="2" height="2" fill="#8be9fd" />
      <rect x="9" y="3" width="2" height="2" fill="#8be9fd" />
      <rect x="3" y="6" width="2" height="2" fill="#8be9fd" />
      <rect x="6" y="6" width="2" height="2" fill="#8be9fd" />
      <rect x="9" y="6" width="2" height="2" fill="#8be9fd" />
      <rect x="6" y="1" width="2" height="2" fill="#8be9fd" />
      {/* Whale body */}
      <rect x="1" y="8" width="13" height="3" fill="#6272a4" />
      <rect x="2" y="11" width="11" height="2" fill="#6272a4" />
      <rect x="4" y="13" width="7" height="1" fill="#6272a4" />
      {/* Eye */}
      <rect x="13" y="9" width="1" height="1" fill="#f8f8f2" />
      {/* Water */}
      <rect x="0" y="14" width="3" height="1" fill="#8be9fd" opacity="0.4" />
      <rect x="5" y="14" width="4" height="1" fill="#8be9fd" opacity="0.4" />
      <rect x="11" y="14" width="3" height="1" fill="#8be9fd" opacity="0.4" />
    </svg>
  )
}

// Spring Boot - Leaf
export function PixelSpringBoot({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Spring Boot">
      {/* Leaf shape */}
      <rect x="10" y="2" width="3" height="1" fill="#50fa7b" />
      <rect x="8" y="3" width="5" height="1" fill="#50fa7b" />
      <rect x="6" y="4" width="6" height="1" fill="#50fa7b" />
      <rect x="5" y="5" width="6" height="1" fill="#50fa7b" />
      <rect x="4" y="6" width="6" height="1" fill="#50fa7b" />
      <rect x="3" y="7" width="6" height="1" fill="#50fa7b" />
      <rect x="3" y="8" width="5" height="1" fill="#50fa7b" />
      <rect x="3" y="9" width="4" height="1" fill="#50fa7b" />
      <rect x="3" y="10" width="3" height="1" fill="#50fa7b" />
      <rect x="4" y="11" width="2" height="1" fill="#50fa7b" />
      {/* Vein */}
      <rect x="10" y="4" width="1" height="1" fill="#282a36" />
      <rect x="9" y="5" width="1" height="1" fill="#282a36" />
      <rect x="8" y="6" width="1" height="1" fill="#282a36" />
      <rect x="7" y="7" width="1" height="1" fill="#282a36" />
      <rect x="6" y="8" width="1" height="1" fill="#282a36" />
      <rect x="5" y="9" width="1" height="1" fill="#282a36" />
      <rect x="4" y="10" width="1" height="1" fill="#282a36" />
      {/* Stem */}
      <rect x="4" y="12" width="1" height="1" fill="#6272a4" />
      <rect x="3" y="13" width="1" height="1" fill="#6272a4" />
    </svg>
  )
}

// Kafka - Streaming arrows
export function PixelKafka({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Kafka">
      {/* K shape */}
      <rect x="3" y="2" width="2" height="12" fill="#f8f8f2" />
      {/* Top diagonal */}
      <rect x="5" y="5" width="1" height="1" fill="#f8f8f2" />
      <rect x="6" y="4" width="1" height="1" fill="#f8f8f2" />
      <rect x="7" y="3" width="1" height="1" fill="#f8f8f2" />
      <rect x="8" y="2" width="2" height="1" fill="#f8f8f2" />
      {/* Bottom diagonal */}
      <rect x="5" y="8" width="1" height="1" fill="#f8f8f2" />
      <rect x="6" y="9" width="1" height="1" fill="#f8f8f2" />
      <rect x="7" y="10" width="1" height="1" fill="#f8f8f2" />
      <rect x="8" y="11" width="1" height="1" fill="#f8f8f2" />
      <rect x="9" y="12" width="2" height="2" fill="#f8f8f2" />
      {/* Stream dots */}
      <rect x="12" y="3" width="1" height="1" fill="#bd93f9" />
      <rect x="13" y="6" width="1" height="1" fill="#bd93f9" />
      <rect x="12" y="9" width="1" height="1" fill="#bd93f9" />
      <rect x="13" y="12" width="1" height="1" fill="#bd93f9" />
    </svg>
  )
}

// Neo4J - Graph nodes
export function PixelNeo4j({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Neo4J">
      {/* Nodes */}
      <rect x="2" y="2" width="3" height="3" rx="1" fill="#50fa7b" />
      <rect x="10" y="2" width="3" height="3" rx="1" fill="#8be9fd" />
      <rect x="6" y="10" width="3" height="3" rx="1" fill="#ff79c6" />
      {/* Edges */}
      <rect x="5" y="3" width="1" height="1" fill="#6272a4" />
      <rect x="6" y="3" width="1" height="1" fill="#6272a4" />
      <rect x="7" y="3" width="1" height="1" fill="#6272a4" />
      <rect x="8" y="3" width="1" height="1" fill="#6272a4" />
      <rect x="9" y="3" width="1" height="1" fill="#6272a4" />
      {/* Diagonal edge to bottom */}
      <rect x="4" y="5" width="1" height="1" fill="#6272a4" />
      <rect x="5" y="6" width="1" height="1" fill="#6272a4" />
      <rect x="5" y="7" width="1" height="1" fill="#6272a4" />
      <rect x="6" y="8" width="1" height="1" fill="#6272a4" />
      <rect x="6" y="9" width="1" height="1" fill="#6272a4" />
      {/* Right edge to bottom */}
      <rect x="11" y="5" width="1" height="1" fill="#6272a4" />
      <rect x="10" y="6" width="1" height="1" fill="#6272a4" />
      <rect x="10" y="7" width="1" height="1" fill="#6272a4" />
      <rect x="9" y="8" width="1" height="1" fill="#6272a4" />
      <rect x="9" y="9" width="1" height="1" fill="#6272a4" />
    </svg>
  )
}

// Elasticsearch - Magnifying glass
export function PixelElasticsearch({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Elasticsearch">
      {/* Lens circle */}
      <rect x="4" y="2" width="4" height="1" fill="#f1fa8c" />
      <rect x="3" y="3" width="1" height="1" fill="#f1fa8c" />
      <rect x="8" y="3" width="1" height="1" fill="#f1fa8c" />
      <rect x="2" y="4" width="1" height="3" fill="#f1fa8c" />
      <rect x="9" y="4" width="1" height="3" fill="#f1fa8c" />
      <rect x="3" y="7" width="1" height="1" fill="#f1fa8c" />
      <rect x="8" y="7" width="1" height="1" fill="#f1fa8c" />
      <rect x="4" y="8" width="4" height="1" fill="#f1fa8c" />
      {/* Glass interior lines */}
      <rect x="4" y="4" width="4" height="1" fill="#ffb86c" />
      <rect x="4" y="6" width="4" height="1" fill="#ffb86c" />
      {/* Handle */}
      <rect x="9" y="8" width="1" height="1" fill="#6272a4" />
      <rect x="10" y="9" width="1" height="1" fill="#6272a4" />
      <rect x="11" y="10" width="2" height="1" fill="#6272a4" />
      <rect x="12" y="11" width="2" height="1" fill="#6272a4" />
      <rect x="13" y="12" width="1" height="1" fill="#6272a4" />
    </svg>
  )
}

// React - Atom/orbits
export function PixelReact({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="React">
      {/* Center dot */}
      <rect x="7" y="7" width="2" height="2" fill="#8be9fd" />
      {/* Horizontal orbit */}
      <rect x="2" y="7" width="2" height="1" fill="#8be9fd" opacity="0.7" />
      <rect x="4" y="7" width="1" height="1" fill="#8be9fd" opacity="0.5" />
      <rect x="12" y="7" width="2" height="1" fill="#8be9fd" opacity="0.7" />
      <rect x="11" y="7" width="1" height="1" fill="#8be9fd" opacity="0.5" />
      {/* Top-left to bottom-right orbit */}
      <rect x="4" y="3" width="1" height="1" fill="#8be9fd" opacity="0.6" />
      <rect x="5" y="4" width="1" height="1" fill="#8be9fd" opacity="0.5" />
      <rect x="10" y="10" width="1" height="1" fill="#8be9fd" opacity="0.5" />
      <rect x="11" y="11" width="1" height="1" fill="#8be9fd" opacity="0.6" />
      {/* Top-right to bottom-left orbit */}
      <rect x="11" y="3" width="1" height="1" fill="#8be9fd" opacity="0.6" />
      <rect x="10" y="4" width="1" height="1" fill="#8be9fd" opacity="0.5" />
      <rect x="5" y="10" width="1" height="1" fill="#8be9fd" opacity="0.5" />
      <rect x="4" y="11" width="1" height="1" fill="#8be9fd" opacity="0.6" />
      {/* Outer orbit hints */}
      <rect x="3" y="2" width="1" height="1" fill="#8be9fd" opacity="0.3" />
      <rect x="12" y="2" width="1" height="1" fill="#8be9fd" opacity="0.3" />
      <rect x="3" y="12" width="1" height="1" fill="#8be9fd" opacity="0.3" />
      <rect x="12" y="12" width="1" height="1" fill="#8be9fd" opacity="0.3" />
    </svg>
  )
}

// PostgreSQL - Elephant head
export function PixelPostgresql({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="PostgreSQL">
      {/* Head */}
      <rect x="5" y="2" width="5" height="1" fill="#6272a4" />
      <rect x="4" y="3" width="7" height="1" fill="#6272a4" />
      <rect x="3" y="4" width="8" height="3" fill="#6272a4" />
      <rect x="4" y="7" width="7" height="2" fill="#6272a4" />
      <rect x="5" y="9" width="5" height="1" fill="#6272a4" />
      {/* Eye */}
      <rect x="6" y="5" width="1" height="1" fill="#f8f8f2" />
      {/* Trunk */}
      <rect x="8" y="9" width="2" height="1" fill="#6272a4" />
      <rect x="9" y="10" width="2" height="1" fill="#6272a4" />
      <rect x="10" y="11" width="2" height="1" fill="#6272a4" />
      <rect x="9" y="12" width="2" height="1" fill="#6272a4" />
      <rect x="8" y="13" width="2" height="1" fill="#6272a4" />
      {/* Tusk */}
      <rect x="4" y="8" width="1" height="2" fill="#f8f8f2" />
      <rect x="3" y="10" width="1" height="1" fill="#f8f8f2" />
    </svg>
  )
}

// SQL - Database cylinder
export function PixelSQL({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="SQL">
      {/* Top ellipse */}
      <rect x="4" y="1" width="8" height="1" fill="#bd93f9" />
      <rect x="3" y="2" width="10" height="1" fill="#bd93f9" />
      <rect x="4" y="3" width="8" height="1" fill="#bd93f9" />
      {/* Body */}
      <rect x="3" y="3" width="1" height="9" fill="#bd93f9" />
      <rect x="12" y="3" width="1" height="9" fill="#bd93f9" />
      {/* Middle band */}
      <rect x="4" y="6" width="8" height="1" fill="#44475a" />
      {/* Bottom ellipse */}
      <rect x="4" y="11" width="8" height="1" fill="#bd93f9" />
      <rect x="3" y="12" width="10" height="1" fill="#bd93f9" />
      <rect x="4" y="13" width="8" height="1" fill="#bd93f9" />
      {/* Data rows */}
      <rect x="5" y="4" width="3" height="1" fill="#50fa7b" opacity="0.5" />
      <rect x="5" y="8" width="4" height="1" fill="#8be9fd" opacity="0.5" />
      <rect x="5" y="9" width="2" height="1" fill="#f1fa8c" opacity="0.5" />
    </svg>
  )
}

// Cypher - Graph query braces
export function PixelCypher({ className }: PixelLogoProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className={className} aria-label="Cypher">
      {/* Left parenthesis ( */}
      <rect x="2" y="3" width="1" height="1" fill="#ff79c6" />
      <rect x="1" y="4" width="1" height="7" fill="#ff79c6" />
      <rect x="2" y="11" width="1" height="1" fill="#ff79c6" />
      {/* Node circle */}
      <rect x="5" y="5" width="4" height="1" fill="#50fa7b" />
      <rect x="4" y="6" width="1" height="3" fill="#50fa7b" />
      <rect x="9" y="6" width="1" height="3" fill="#50fa7b" />
      <rect x="5" y="9" width="4" height="1" fill="#50fa7b" />
      {/* Center label */}
      <rect x="6" y="7" width="2" height="1" fill="#f8f8f2" />
      {/* Right parenthesis ) */}
      <rect x="12" y="3" width="1" height="1" fill="#ff79c6" />
      <rect x="13" y="4" width="1" height="7" fill="#ff79c6" />
      <rect x="12" y="11" width="1" height="1" fill="#ff79c6" />
      {/* Arrow --> */}
      <rect x="10" y="7" width="2" height="1" fill="#6272a4" />
    </svg>
  )
}

// Map skill names to their pixel logos
export const skillPixelLogos: Record<string, React.FC<PixelLogoProps>> = {
  Java: PixelJava,
  Python: PixelPython,
  SQL: PixelSQL,
  Cypher: PixelCypher,
  Kubernetes: PixelKubernetes,
  Docker: PixelDocker,
  "Spring Boot": PixelSpringBoot,
  Kafka: PixelKafka,
  Neo4J: PixelNeo4j,
  Elasticsearch: PixelElasticsearch,
  React: PixelReact,
  PostgreSQL: PixelPostgresql,
}
