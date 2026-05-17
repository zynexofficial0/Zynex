import { createClient } from "@supabase/supabase-js"

let supabaseClientInstance: ReturnType<typeof createClient> | null = null
let supabaseServerInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (supabaseClientInstance) return supabaseClientInstance

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error("Missing Supabase credentials")
  }

  supabaseClientInstance = createClient(url, anonKey)
  return supabaseClientInstance
}

export const getSupabaseServer = () => {
  if (supabaseServerInstance) return supabaseServerInstance

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase server credentials")
  }

  supabaseServerInstance = createClient(url, serviceKey)
  return supabaseServerInstance
}

// For backwards compatibility
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

export type SubmitAirdrop = {
  id?: string
  project_name: string
  website_url: string
  twitter_url?: string
  telegram_url?: string
  discord_url?: string
  blockchain: string
  description: string
  category: string
  reward: string
  end_date: string
  logo_url?: string
  created_at?: string
  status?: string
  ip_address?: string
}
