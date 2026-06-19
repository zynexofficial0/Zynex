import { NextRequest, NextResponse } from "next/server"

// In-memory storage for submissions (will reset on server restart)
// For production, this should use a real database
const submissions: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["project_name", "website_url", "blockchain", "category", "description", "reward", "end_date"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Get client IP for rate limiting
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Simple rate limiting: 1 submission per minute per IP
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    const recentSubmissions = submissions.filter(
      (s) => s.ip_address === clientIp && s.created_at > oneMinuteAgo
    )

    if (recentSubmissions.length > 0) {
      return NextResponse.json(
        { error: "Please wait at least 1 minute before submitting another airdrop." },
        { status: 429 }
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

    // Create submission object
    const submission = {
      id: Date.now().toString(),
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
      logo_url: body.logo_url || null,
      status: "active",
      ip_address: clientIp,
      created_at: new Date().toISOString(),
    }

    // Store in memory
    submissions.push(submission)

    // Log submission
    console.log("[v0] New airdrop submission:", submission.project_name)

    return NextResponse.json({
      success: true,
      message: "Your airdrop has been submitted successfully and is now live!",
      data: submission,
    })
  } catch (error) {
    console.error("[v0] Submission error:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your submission." },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve submissions (for testing)
export async function GET() {
  return NextResponse.json({
    submissions: submissions,
    count: submissions.length,
  })
}

