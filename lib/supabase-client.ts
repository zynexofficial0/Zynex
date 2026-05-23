import { createClient } from "@supabase/supabase-js"

let supabaseClientInstance: ReturnType<typeof createClient> | null = null
let supabaseServerInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (supabaseClientInstance) return supabaseClientInstance

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL

  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error("Missing Supabase client credentials")
  }

  supabaseClientInstance = createClient(url, anonKey)
  return supabaseClientInstance
}

export const getSupabaseServer = () => {
  if (supabaseServerInstance) return supabaseServerInstance

  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL

  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase server credentials")
  }

  supabaseServerInstance = createClient(url, serviceKey)
  return supabaseServerInstance
}

// Backwards compatibility
export const supabaseClient = {
  get client() {
    return getSupabaseClient()
  },
}

export const supabaseServer = {
  get client() {
    return getSupabaseServer()
  },
}