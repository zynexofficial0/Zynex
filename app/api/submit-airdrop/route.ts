import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://kmhtrtkblpxmowcibrjf.supabase.co",
  "sb_publishable_QnmZnH13G6a6Ny0pCuN8Xw_qlGevC7O"
)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.project_name || !body.website || !body.blockchain) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Try to insert into Supabase
    try {
      const { error } = await supabase
        .from("submitted_airdrops")
        .insert([
          {
            project_name: body.project_name,
            website: body.website,
            twitter: body.twitter || null,
            telegram: body.telegram || null,
            discord: body.discord || null,
            blockchain: body.blockchain,
            description: body.description || null,
            created_at: new Date().toISOString(),
          },
        ])

      if (error) {
        console.error("Supabase error:", error)
        // Still return success to client so they can save locally
        return Response.json(
          { success: true, message: "Submission saved locally" },
          { status: 200 }
        )
      }
    } catch (supabaseError) {
      console.error("Supabase connection error:", supabaseError)
      // Return success anyway - client will handle local storage
      return Response.json(
        { success: true, message: "Submission saved locally" },
        { status: 200 }
      )
    }

    return Response.json(
      { success: true, message: "Airdrop submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing submission:", error)
    return Response.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}
