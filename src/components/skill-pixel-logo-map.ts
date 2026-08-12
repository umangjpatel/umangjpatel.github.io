import {
  PixelJava,
  PixelPython,
  PixelSQL,
  PixelCypher,
  PixelKubernetes,
  PixelDocker,
  PixelSpringBoot,
  PixelKafka,
  PixelNeo4j,
  PixelElasticsearch,
  PixelReact,
  PixelPostgresql,
} from "@/components/pixel-logos"

interface PixelLogoProps {
  className?: string
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
