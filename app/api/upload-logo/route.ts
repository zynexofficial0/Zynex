import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase-client"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      )
    }

    // Create unique filename
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 9)
    const extension = file.name.split(".").pop()
    const filename = `logo-${timestamp}-${random}.${extension}`

    // Supabase upload
    const supabase = getSupabaseServer()

    const { data, error } = await supabase.storage
      .from("airdrop-logos")
      .upload(filename, file, {
        contentType: file.type,
        upsert: false,
      })

    // Detailed error logging
    if (error) {
      console.error("Storage upload error:", error)

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
        },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("airdrop-logos")
      .getPublicUrl(filename)

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      filename,
      data,
    })
  } catch (error: any) {
    console.error("Upload route error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown upload error",
      },
      { status: 500 }
    )
  }
}