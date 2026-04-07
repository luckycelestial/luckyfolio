"use client"

import { ChevronDown, Download, ExternalLink, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { useEffect, useRef } from "react"

// Nested Honeycomb Pattern - 3D depth honeycomb with concentric hexagons
function NestedHoneycombBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let mouseX = -1000
    let mouseY = -1000
    let scrollY = 0

    const resizeCanvas = () => {
      // Cover entire document height
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 3 // Minimum 3 screens tall
      )
      canvas.width = window.innerWidth
      canvas.height = docHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY + window.scrollY // Account for scroll position
    }
    window.addEventListener("mousemove", handleMouseMove)

    const handleScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener("scroll", handleScroll)

    // Hexagon geometry
    const hexRadius = 40
    const hexHeight = hexRadius * Math.sqrt(3)
    const hexWidth = hexRadius * 2

    // Define glow zones - areas where hexagons are brighter
    const glowZones = [
      { x: 0, y: 0, radius: 500 }, // Top-left corner (hero area)
      { x: window.innerWidth, y: window.innerHeight * 2.5, radius: 600 }, // Bottom-right (projects/footer area)
    ]

    // Calculate glow intensity based on distance from glow zones
    const getGlowIntensity = (cx: number, cy: number) => {
      let maxIntensity = 0
      for (const zone of glowZones) {
        const dx = cx - zone.x
        const dy = cy - zone.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < zone.radius) {
          const intensity = 1 - dist / zone.radius
          maxIntensity = Math.max(maxIntensity, intensity)
        }
      }
      return maxIntensity
    }

    // Generate hexagon points
    const getHexPoints = (cx: number, cy: number, radius: number) => {
      const points = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        points.push({
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle),
        })
      }
      return points
    }

    // Draw a single hexagon
    const drawHex = (cx: number, cy: number, radius: number, color: string, lineWidth: number) => {
      const points = getHexPoints(cx, cy, radius)
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < 6; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.stroke()
    }

    // Draw nested hexagon cell with depth effect and zone-based brightness
    const drawNestedHex = (cx: number, cy: number, distFromMouse: number, glowIntensity: number) => {
      const hoverRadius = 200
      const isHovered = distFromMouse < hoverRadius
      const hoverIntensity = isHovered ? 1 - distFromMouse / hoverRadius : 0

      // Base colors: very dark (almost invisible) by default
      // Glow zones make them brighter
      const darkBase = [15, 15, 20] // Almost black
      const brightBase = [45, 45, 60] // Visible grey-blue
      const hoverColor = [100, 100, 130] // Bright on hover

      // Nested rings from outer to inner
      const rings = [
        { radiusFactor: 1, lineWidth: 1.5 },
        { radiusFactor: 0.8, lineWidth: 1.2 },
        { radiusFactor: 0.6, lineWidth: 1 },
        { radiusFactor: 0.4, lineWidth: 0.8 },
        { radiusFactor: 0.2, lineWidth: 0.6 },
      ]

      rings.forEach((ring, index) => {
        // Calculate base color based on glow zone intensity
        const baseR = Math.round(darkBase[0] + (brightBase[0] - darkBase[0]) * glowIntensity + index * 3 * glowIntensity)
        const baseG = Math.round(darkBase[1] + (brightBase[1] - darkBase[1]) * glowIntensity + index * 3 * glowIntensity)
        const baseB = Math.round(darkBase[2] + (brightBase[2] - darkBase[2]) * glowIntensity + index * 5 * glowIntensity)

        // Add hover effect on top
        const r = Math.round(baseR + (hoverColor[0] - baseR) * hoverIntensity * 0.6)
        const g = Math.round(baseG + (hoverColor[1] - baseG) * hoverIntensity * 0.6)
        const b = Math.round(baseB + (hoverColor[2] - baseB) * hoverIntensity * 0.6)

        const color = `rgb(${r}, ${g}, ${b})`
        drawHex(cx, cy, hexRadius * ring.radiusFactor, color, ring.lineWidth * (0.5 + glowIntensity * 0.5))
      })
    }

    // Animation loop
    const draw = () => {
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate hex grid for entire canvas
      const cols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 2
      const rows = Math.ceil(canvas.height / (hexHeight * 0.5)) + 2

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const offset = row % 2 === 0 ? 0 : hexWidth * 0.375
          const cx = col * hexWidth * 0.75 + offset
          const cy = row * hexHeight * 0.5

          // Calculate distance from mouse
          const dx = cx - mouseX
          const dy = cy - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Calculate glow intensity for this hex
          const glowIntensity = getGlowIntensity(cx, cy)

          drawNestedHex(cx, cy, dist, glowIntensity)
        }
      }
    }

    // Initial draw after a short delay to ensure document height is calculated
    setTimeout(() => {
      resizeCanvas()
      draw()
    }, 100)

    // Redraw on animation frame
    const animationId = requestAnimationFrame(function animate() {
      draw()
      requestAnimationFrame(animate)
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute left-0 top-0"
      style={{ zIndex: 0 }}
    />
  )
}

// Tech Badge Component
function TechBadge({ children, recessed = false }: { children: React.ReactNode; recessed?: boolean }) {
  if (recessed) {
    return (
      <span className="inline-flex items-center rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-400">
        {children}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-400">
      {children}
    </span>
  )
}

// Project Card Component
function ProjectCard({
  title,
  tag,
  tagType,
  description,
  techStack,
  buttonText,
  buttonIcon,
}: {
  title: string
  tag?: string
  tagType?: "gold" | "default"
  description: string
  techStack?: string[]
  buttonText: string
  buttonIcon: "github" | "external"
}) {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700/60 hover:bg-zinc-900/60">
      <div className="mb-4">
        <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
        {tag && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${
              tagType === "gold"
                ? "bg-amber-900/40 text-amber-400 ring-1 ring-amber-700/50"
                : "bg-zinc-800/50 text-zinc-400"
            }`}
          >
            {tagType === "gold" && <MapPin className="h-3 w-3" />}
            {tag}
          </span>
        )}
      </div>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-500">{description}</p>
      {techStack && techStack.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechBadge key={tech} recessed>
              {tech}
            </TechBadge>
          ))}
        </div>
      )}
      <button className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-300">
        {buttonIcon === "github" ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
        {buttonText}
      </button>
    </div>
  )
}

// Timeline Event Component
function TimelineEvent({
  title,
  subtitle,
  isCurrent = false,
  isLast = false,
}: {
  title: string
  subtitle: string
  isCurrent?: boolean
  isLast?: boolean
}) {
  return (
    <div className="relative flex gap-6">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-600 bg-black">
          <div className="h-2 w-2 rounded-full bg-zinc-500" />
        </div>
        {!isLast && <div className="h-full w-px bg-zinc-800" />}
      </div>
      {/* Content */}
      <div className={`pb-10 ${isLast ? "pb-0" : ""}`}>
        <div className="flex items-center gap-3">
          <h3 className="text-base font-medium text-white">{title}</h3>
          {isCurrent && (
            <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">Current</span>
          )}
        </div>
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      </div>
    </div>
  )
}

// V Logo Component
function VLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L2 22h20L12 2z"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

export default function PortfolioV2() {
  const techStack = ["Java", "Python", "React.js", "Next.js", "Tailwind CSS", "PostgreSQL", "Git"]

  const projects = [
    {
      title: "PRAJA",
      tag: "Civilian/Finalist — India Innovates 2023",
      tagType: "gold" as const,
      description:
        "A sophisticated government grievance redressal system that fosters citizens and author files through citizen-centric rooting and real-time status tracking.",
      techStack: ["Node.js", "AI", "Planetscale"],
      buttonText: "GitHub",
      buttonIcon: "github" as const,
    },
    {
      title: "CyberLabs",
      description:
        "Professional web and graphic design agency delivering client-ready digital products and brand identities.",
      techStack: ["Design", "Wix", "Branding"],
      buttonText: "Visit Site",
      buttonIcon: "external" as const,
    },
    {
      title: "Placely",
      description:
        "A comprehensive College Placement Cell Management System that streamlines placement activities for students and staff — featuring API-cade integration, real-time analytics dashboards with Chart.js, and a secure Supabase backend.",
      techStack: ["Flask", "Python", "Supabase", "Chart.js"],
      buttonText: "Visit Site",
      buttonIcon: "external" as const,
    },
  ]

  const timeline = [
    {
      title: "Sri Eshwar College of Engineering",
      subtitle: "AI & Data Science",
      isCurrent: true,
    },
    {
      title: "Founder",
      subtitle: "CyberLabs",
      isLast: true,
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Nested Honeycomb Background Pattern */}
      <NestedHoneycombBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
          {/* Profile Avatar */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-zinc-400 bg-zinc-900">
            <span className="text-4xl font-light text-white">P</span>
          </div>
          {/* Main Title */}
          <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {"I'm Pavithran P N"}
          </h1>
          {/* Subtitle */}
          <p className="mb-10 max-w-xl text-center text-base text-zinc-500">
            Architecting high-performance digital solutions and AI systems.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-6 py-3 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-300">
              View Projects
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-6 py-3 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-300">
              <Download className="h-4 w-4" />
              Download CV
            </button>
          </div>
          {/* Scroll Indicator */}
          <div className="absolute bottom-16 animate-bounce">
            <ChevronDown className="h-5 w-5 text-zinc-600" />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-2xl font-bold text-white">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-2xl font-bold text-white">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-12 text-center text-2xl font-bold text-white">Experience & Education</h2>
            <div className="space-y-0">
              {timeline.map((event) => (
                <TimelineEvent key={event.title} {...event} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            {/* Final CTA */}
            <h2 className="mb-8 text-2xl font-bold text-white">{"Let's Connect"}</h2>
            {/* Social Icons */}
            <div className="mb-8 flex justify-center gap-6">
              <a
                href="#"
                className="text-zinc-500 transition-colors hover:text-zinc-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-zinc-500 transition-colors hover:text-zinc-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-zinc-500 transition-colors hover:text-zinc-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            {/* Copyright */}
            <p className="text-sm text-zinc-600">© 2026 Pavithran P N. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
