import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { resolve } from "path"

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
} catch (err) {}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  envConfig.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const projectsData = JSON.parse(readFileSync(resolve(process.cwd(), "projects_seed_data.json"), "utf-8"))

async function seed() {
  console.log(`Seeding ${projectsData.length} projects into Supabase...`)

  for (const project of projectsData) {
    const { data, error } = await supabase
      .from("projects")
      .upsert(
        {
          title: project.title,
          slug: project.slug,
          description: project.description,
          content: project.content,
          tags: project.tags,
          featured: project.featured,
          github_url: project.github_url,
          live_url: project.live_url,
          contributors: project.contributors || [],
          images: [],
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      )
      .select()

    if (error) {
      console.warn(`Note on "${project.title}": ${error.message}`)
      console.log("If RLS is enabled, please execute seed_projects.sql in the Supabase SQL editor.")
    } else {
      console.log(`✓ Upserted project: ${project.title}`)
    }
  }

  console.log("Projects seeding complete!")
}

seed()
