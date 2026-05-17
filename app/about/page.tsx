import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About Us | Airdrop Hunt",
  description: "Learn about Airdrop Hunt and our mission to help crypto enthusiasts discover airdrops.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="border-b border-border bg-card/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="font-display text-4xl font-bold text-foreground">About <span className="text-primary glow-text">Airdrop Hunt</span></h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Discover our story and mission to empower crypto enthusiasts worldwide.</p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              Airdrop Hunt is dedicated to helping the crypto community discover and participate in token airdrops. We believe in democratizing access to blockchain opportunities and making it easy for everyone to find legitimate airdrops.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">What We Do</h2>
            <p className="text-muted-foreground mb-6">
              We aggregate the latest airdrop opportunities across multiple blockchain networks, provide expert analysis, and share educational content to help you make informed decisions in the crypto space.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">Why Choose Us</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Curated airdrop listings verified for legitimacy</li>
              <li>Expert guides and tutorials</li>
              <li>Community-driven insights and analysis</li>
              <li>Multi-chain support</li>
              <li>Free access for everyone</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
