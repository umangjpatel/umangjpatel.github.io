export const personalInfo = {
  name: "Umang Patel",
  handle: "umangjpatel",
  title: "Senior Cloud Engineer",
  location: "Ottawa, ON",
  email: "umangpatel1947@gmail.com",

  website: "https://www.umangjpatel.dev",
  bio: [
    "Senior Cloud Engineer at Wind River, building scalable cloud-native platforms.",
    "Passionate about distributed systems, reactive architectures, and developer tooling.",
    "Previously shipped event-driven microservices at Ericsson serving millions of topology updates.",
  ],
}

export interface Experience {
  company: string
  role: string
  location: string
  period: string
  highlights: string[]
}

export const experiences: Experience[] = [
  {
    company: "Wind River",
    role: "Senior Cloud Engineer",
    location: "Ottawa, ON",
    period: "Mar 2026 - Present",
    highlights: [
      "Supporting the Elastic stack for the Wind River cloud platform enabling near real-time updates and improving system responsiveness at scale.",
      "Driving development of test automation framework for the Analytics team.",
    ],
  },
  {
    company: "Ericsson",
    role: "Software Developer",
    location: "Ottawa, ON",
    period: "Aug 2022 - Mar 2026",
    highlights: [
      "Built Kafka-based event streaming workflows into Spring Boot microservices for topology handling, enabling near real-time updates at scale.",
      "Led application-wide refactor from Spring MVC to Spring WebFlux + Reactive Kafka Streams, improving throughput with backpressure-aware processing.",
      "Optimized deployment workflows, reducing manual overhead by 30% and saving 20+ engineering hours per release cycle.",
      "Acted as Security Master and 3PP SPoC, driving threat modeling and secure coding reviews.",
      "Designed internal testing frameworks enabling shift-left testing and faster feedback cycles.",
    ],
  },
  {
    company: "Societe Generale",
    role: "Software Developer Analyst Intern",
    location: "Montreal, QC",
    period: "Sept 2021 - May 2022",
    highlights: [
      "Designed and optimized data extraction pipelines within the Shadow financial system.",
      "Automated dev/testing workflows with Python and BAT scripts, reducing execution time by 30-40%.",
      "Collaborated on CI/CD pipeline development in Jenkins.",
      "Built internal full-stack tool using Streamlit and FastAPI with speech-to-text for training video transcription.",
    ],
  },
]

export interface Education {
  institution: string
  degree: string
  location: string
  period: string
  gpa: string
}

export const education: Education[] = [
  {
    institution: "Concordia University",
    degree: "Master of Applied Computer Science",
    location: "Montreal, QC",
    period: "Sept 2020 - May 2022",
    gpa: "3.33",
  },
  {
    institution: "Charotar University of Science and Technology",
    degree: "Bachelor of Information Technology",
    location: "Nadiad, India",
    period: "July 2016 - May 2020",
    gpa: "3.69 (9.23/10.0)",
  },
]

export interface Project {
  name: string
  description: string
  tech: string[]
}

export const projects: Project[] = [
  {
    name: "deep-learning-framework",
    description:
      "A lightweight deep learning framework inspired by JAX and Keras, enabling flexible model experimentation with custom layers, training loops, and differentiable operations.",
    tech: ["Python", "NumPy", "Autograd"],
  },
  {
    name: "personal-finance-app",
    description:
      "A full-stack personal finance application that securely manages budgets, visualizes spending, and delivers actionable financial insights.",
    tech: ["React", "FastAPI", "PostgreSQL"],
  },
]

export const skills = {
  languages: ["Java", "Python", "SQL", "Cypher"],
  technologies: [
    "Kubernetes",
    "Docker",
    "Spring Boot",
    "Kafka",
    "Neo4J",
    "Elasticsearch",
    "React",
    "PostgreSQL",
  ],
  practices: [
    "Event-Driven Architecture",
    "Reactive Systems",
    "CI/CD",
    "Shift-Left Testing",
    "Threat Modeling",
  ],
}

export const navItems = [
  { label: "home", href: "#home" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "education", href: "#education" },
  { label: "contact", href: "#contact" },
]
