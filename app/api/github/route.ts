import { NextResponse } from "next/server"
import { getGitHubData } from "@/lib/github"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await getGitHubData()
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch GitHub data" },
      { status: 500 }
    )
  }
}
