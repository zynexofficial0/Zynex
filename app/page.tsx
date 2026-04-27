import Link from "next/link"
import { ArrowRight, Zap, Shield, TrendingUp, Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AirdropCard } from "@/components/airdrop-card"
import { ArticleCard } from "@/components/article-card"
import { airdrops, articles } from "@/lib/data"
import dynamic from "next/dynamic"

// Dynamically import the 3D component to avoid SSR issues
const Falling3DObjects = dynamic(() => import("@/components/f3d-objects"), {
  ssr: false,
})

const features = [
  {
    icon: Zap,
    title: "Real-time Tracking",
    description: "Stay updated with the latest airdrops as they launch across all major chains.",
  },
  {
    icon: Shield,
    title: "Verified Projects",
    description: "We verify each project to protect you from scams and rug pulls.",
  },
  {
    icon: TrendingUp,
    title: "Value Estimates",
    description: "Get accurate value estimates based on market data and tokenomics.",
  },
]

export default function HomePage() {
  const featuredAirdrops = airdrops.filter((a) => a.featured).slice(0, 3)
  const latestArticles = articles.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* 3D Falling Objects Background */}
          <Falling3DObjects />
          
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
                Discover the Latest{" "}
                <span className="text-primary glow-text">Crypto Airdrops</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-balance">
                Your gateway to free token distributions. Track, claim, and never miss an airdrop opportunity with Airdrop Hunt.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/airdrops">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all w-full sm:w-auto">
                    Explore Airdrops
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="border-primary/50 hover:border-primary hover:bg-primary/10 w-full sm:w-auto transition-all">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "250+", label: "Active Airdrops" },
                { value: "$2.5M+", label: "Total Value" },
                { value: "50K+", label: "Users" },
                { value: "15+", label: "Chains" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
                  <p className="font-display text-3xl md:text-4xl font-bold text-primary glow-text">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Why Choose Airdrop Hunt?
              </h2>
              <p className="mt-4 text-muted-foreground">
                The most trusted platform for discovering crypto airdrops
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="relative p-6 rounded-2xl border border-border bg-card/80 hover:border-primary/50 hover:glow-sm transition-all group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Airdrops Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  Featured Airdrops
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {"Don't miss these high-value opportunities"}
                </p>
              </div>
              <Link href="/airdrops">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAirdrops.map((airdrop) => (
                <AirdropCard key={airdrop.id} airdrop={airdrop} featured />
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Link href="/airdrops">
                <Button variant="outline" className="w-full">
                  View All Airdrops
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl border border-primary/40 bg-card p-8 md:p-12 overflow-hidden glow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    Never Miss an Airdrop
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Get weekly updates on the hottest airdrops delivered to your inbox.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full md:w-64"
                  />
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  Latest Articles
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Insights and guides from our crypto experts
                </p>
              </div>
              <Link href="/articles">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Link href="/articles">
                <Button variant="outline" className="w-full">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
