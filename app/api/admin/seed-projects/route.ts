import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { readFileSync } from "fs"
import { resolve } from "path"

export async function GET() {
  try {
    const supabase = await createClient()

    // Read projects seed data
    const rawData = readFileSync(resolve(process.cwd(), "projects_seed_data.json"), "utf-8")
    const projects = JSON.parse(rawData)

    const results = []

    for (const project of projects) {
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
        results.push({ title: project.title, status: "error", error: error.message })
      } else {
        results.push({ title: project.title, status: "success" })
      }
    }

    return NextResponse.json({
      message: "Seeding finished",
      results,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 })
  }
}
