import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { resolve } from "path"

// Parse .env if available
let envConfig = {}
try {
  const envContent = readFileSync(resolve(process.cwd(), ".env"), "utf-8")
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...rest] = trimmed.split("=")
      if (key && rest.length > 0) {
        envConfig[key.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "")
      }
    }
  })
} catch (err) {
  // Ignore if no .env
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  envConfig.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const experiencesToSeed = [
  {
    title: "SDE & Tech Lead",
    company: "Clustrix Tech Solutions",
    location: "Durgapur, West Bengal, India · Hybrid",
    start_date: "2025-08-01",
    end_date: null,
    current: true,
    description:
      "Leading the architecture and development of scalable web platforms, internal tools, and high-performance infrastructure.",
    achievements: [
      "Built and led multiple production systems across web, backend, and cloud infrastructure, focusing on scalability, security, performance, and maintainability.",
      "Developed reusable platforms and engineering tools that accelerated development and reduced boilerplate across projects.",
      "Designed high-performance systems in Next.js, Go, Rust, Cloudflare, and modern database technologies.",
      "Owned technical decisions across architecture, development, deployment, optimization, and production operations.",
    ],
    technologies: [
      "Web Application Security",
      "Node.js",
      "Next.js",
      "Go",
      "Rust",
      "Cloudflare",
      "TypeScript",
      "PostgreSQL",
      "System Architecture",
      "Cloud Infrastructure",
      "Docker",
      "REST APIs",
      "Microservices",
      "DevOps",
      "Performance Optimization",
    ],
    order_index: 0,
  },
  {
    title: "Security Researcher",
    company: "Freelance",
    location: "Durgapur, West Bengal, India · Remote",
    start_date: "2023-04-01",
    end_date: "2024-08-31",
    current: false,
    description:
      "Conducted security testing and responsible vulnerability disclosure across 20+ organizations, including government systems, universities, colleges, and private organizations. Identified and reported security issues, collaborated on remediation, and contributed to improving the security and reliability of web applications.",
    achievements: [
      "Conducted security testing and responsible vulnerability disclosure across 20+ organizations, including government systems, universities, colleges, and private organizations.",
      "Identified and reported critical security vulnerabilities, focusing on Broken Access Control, authentication bypass, and injection flaws.",
      "Collaborated directly with organization security and engineering teams on remediation, patch verification, and application hardening.",
    ],
    technologies: [
      "Web Application Security",
      "Broken Access Control",
      "Vulnerability Assessment",
      "Penetration Testing",
      "OWASP Top 10",
      "Burp Suite",
      "API Security",
      "Responsible Disclosure",
      "Authentication & Authorization",
      "Network Security",
    ],
    order_index: 2,
  },
]

async function seed() {
  console.log("Seeding experience data into Supabase...")

  for (const exp of experiencesToSeed) {
    // Delete existing entry if present
    await supabase.from("experience").delete().match({ title: exp.title, company: exp.company })

    const { data, error } = await supabase.from("experience").insert(exp).select()
    if (error) {
      console.warn(`Note for "${exp.title}": ${error.message}`)
      console.log(
        "If RLS is enabled, please execute seed_experience.sql in the Supabase SQL editor instead."
      )
    } else {
      console.log(`✓ Inserted: ${exp.title} @ ${exp.company}`)
    }
  }

  // Update order_index for any existing Prime Dev Technologies record
  await supabase
    .from("experience")
    .update({ order_index: 1 })
    .ilike("company", "%Prime Dev%")

  console.log("Done!")
}

seed()
