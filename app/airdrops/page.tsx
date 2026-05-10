import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AirdropsList } from "@/components/airdrops-list"
import { supabase, normalizeAirdrop } from "@/lib/supabase"
import { airdrops as defaultAirdrops } from "@/lib/data"
import type { Airdrop } from "@/lib/data"

export default async function AirdropsPage() {
  let airdrops: Airdrop[] = defaultAirdrops
  let errorMessage: string | null = null

  try {
    const { data, error } = await supabase.from("airdrops").select("*")
    
    if (error) {
      console.warn("Supabase fetch error, using local data:", error.message)
      errorMessage = null // Don't show error to user, just use local data
    } else if (data && data.length > 0) {
      airdrops = data.map(normalizeAirdrop)
    }
  } catch (err) {
    console.warn("Failed to fetch from Supabase, using local data:", err)
    errorMessage = null // Use local data silently
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <section className="border-b border-border bg-card/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              All <span className="text-primary glow-text">Airdrops</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Browse and discover the latest crypto airdrops across all chains
            </p>
          </div>
        </section>

        <AirdropsList airdrops={airdrops} error={errorMessage} />
      </main>

      <Footer />
    </div>
  )
}
