import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-client"

const SUBMISSION_RATE_LIMIT = 60000 // 1 minute in milliseconds
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

    // Rate limiting
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Please wait before submitting another airdrop. (1 submission per minute)" },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validation
    if (!body.project_name?.trim()) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      )
    }

    if (!body.website_url?.trim()) {
      return NextResponse.json(
        { error: "Website URL is required" },
        { status: 400 }
      )
    }

    if (!body.blockchain?.trim()) {
      return NextResponse.json(
        { error: "Blockchain is required" },
        { status: 400 }
      )
    }

    if (!body.description?.trim()) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      )
    }

    if (!body.category?.trim()) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      )
    }

    if (!body.reward?.trim()) {
      return NextResponse.json(
        { error: "Reward amount is required" },
        { status: 400 }
      )
    }

    if (!body.end_date?.trim()) {
      return NextResponse.json(
        { error: "End date is required" },
        { status: 400 }
      )
    }

    if (!body.logo_url?.trim()) {
      return NextResponse.json(
        { error: "Logo is required" },
        { status: 400 }
      )
    }

    // Validate URLs
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    if (!urlPattern.test(body.website_url)) {
      return NextResponse.json(
        { error: "Invalid website URL" },
        { status: 400 }
      )
    }

    if (body.twitter_url && !body.twitter_url.includes("twitter.com") && !body.twitter_url.includes("x.com")) {
      return NextResponse.json(
        { error: "Invalid Twitter/X URL" },
        { status: 400 }
      )
    }

    // Save to database
    const supabase = getSupabaseServer()
    const { data, error } = await supabase
      .from("submit_airdrops")
      .insert([
        {
          project_name: body.project_name.trim(),
          website_url: body.website_url.trim(),
          twitter_url: body.twitter_url?.trim() || null,
          telegram_url: body.telegram_url?.trim() || null,
          discord_url: body.discord_url?.trim() || null,
          blockchain: body.blockchain.trim(),
          description: body.description.trim(),
          category: body.category.trim(),
          reward: body.reward.trim(),
          end_date: body.end_date,
          logo_url: body.logo_url,
          status: "active",
          ip_address: clientIp,
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Failed to submit airdrop. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Your airdrop has been submitted successfully and is now live.",
      data,
    })
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your submission." },
      { status: 500 }
    )
  }
}
