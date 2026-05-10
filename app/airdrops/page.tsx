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
    const [{ data: mainData, error: mainError }, { data: submittedData, error: submittedError }] =
      await Promise.all([
        supabase.from("airdrops").select("*").order("id", { ascending: false }),
        supabase.from("submitted_airdrops").select("*").order("id", { ascending: false }),
      ])

    if (mainError && submittedError) {
      console.warn(
        "Supabase fetch error for both tables, using local data:",
        mainError?.message || submittedError?.message
      )
    } else {
      const normalizedAirdrops: Airdrop[] = []

      if (mainData && mainData.length > 0) {
        normalizedAirdrops.push(...mainData.map(normalizeAirdrop))
      }

      if (submittedData && submittedData.length > 0) {
        normalizedAirdrops.push(...submittedData.map(normalizeAirdrop))
      }

      if (normalizedAirdrops.length > 0) {
        airdrops = normalizedAirdrops
      }
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
