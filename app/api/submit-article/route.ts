import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-client"

const SUBMISSION_RATE_LIMIT = 60000
const rateLimitMap = new Map<string, number>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const direct = request.headers.get("x-real-ip")
  return forwarded?.split(",")[0] || direct || "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const lastSubmission = rateLimitMap.get(ip)

  if (!lastSubmission) {
    rateLimitMap.set(ip, now)
    return true
  }

  if (now - lastSubmission < SUBMISSION_RATE_LIMIT) {
    return false
  }

  rateLimitMap.set(ip, now)
  return true
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Please wait before submitting another article. (1 submission per minute)" },
        { status: 429 }
      )
    }

    const body = await request.json()

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Article title is required" }, { status: 400 })
    }

    if (!body.excerpt?.trim()) {
      return NextResponse.json({ error: "Excerpt is required" }, { status: 400 })
    }

    if (!body.author?.trim()) {
      return NextResponse.json({ error: "Author name is required" }, { status: 400 })
    }

    if (!body.category?.trim()) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 })
    }

    if (!body.content?.trim()) {
      return NextResponse.json({ error: "Article content is required" }, { status: 400 })
    }

    const supabase = getSupabaseServer()
    const { data, error } = await supabase
      .from("submitted_articles")
      .insert([
        {
          title: body.title.trim(),
          excerpt: body.excerpt.trim(),
          author: body.author.trim(),
          category: body.category.trim(),
          content: body.content.trim(),
          published_at: new Date().toISOString(),
          ip_address: clientIp,
        },
      ])
      .select()

    if (error) {
      console.error("Article submission error:", error)
      return NextResponse.json(
        { error: "Failed to submit article. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Your article has been submitted successfully and will be reviewed shortly.",
      data,
    })
  } catch (error) {
    console.error("Article submission exception:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your submission." },
      { status: 500 }
    )
  }
}
