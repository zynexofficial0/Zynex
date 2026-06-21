import Link from "next/link"
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AirdropCard } from "@/components/airdrop-card"
import { ArticleCard } from "@/components/article-card"
import Hero3D from "@/components/hero-3d"
import RotatingSphere from "@/components/rotating-sphere"
import Envelope3D from "@/components/envelope-3d"
import { airdrops, articles } from "@/lib/data"

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
        {/* Hero Section with 3D Visuals */}
        <section className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
                  Discover the Latest{" "}
                  <span className="text-primary glow-text">Crypto Airdrops</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground text-balance">
                  Your gateway to free token distributions. Track, claim, and never miss an airdrop opportunity with Airdrop Hunt.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/airdrops">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all w-full sm:w-auto">
                      Explore Airdrops
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/submit-airdrop">
                    <Button size="lg" variant="outline" className="border-primary/50 hover:border-primary hover:bg-primary/10 w-full sm:w-auto transition-all">
                      Submit Airdrop
                    </Button>
                  </Link>
                  <Link href="/submit-article">
                    <Button size="lg" variant="outline" className="border-primary/50 hover:border-primary hover:bg-primary/10 w-full sm:w-auto transition-all">
                      Watchlist
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right 3D Visual */}
              <div className="hidden lg:block h-96 rounded-2xl border border-primary/20 overflow-hidden glow-sm">
                <Hero3D />
              </div>
            </div>

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

        {/* Features Section with 3D */}
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

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Features List */}
              <div className="space-y-6">
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
              {featuredAirdrops.map((airdrop, idx) => (
                <div key={airdrop.id} className="relative overflow-hidden rounded-lg border border-primary/20 bg-card/80 glow-sm hover:border-primary/40 hover:glow transition-all group">
                  {/* 3D Sphere Background */}
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-40">
                    <RotatingSphere 
                      color={['#3b82f6', '#8b5cf6', '#ec4899'][idx % 3]}
                      emissiveColor={['#1e40af', '#5b21b6', '#be185d'][idx % 3]}
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-foreground text-lg">{airdrop.name}</h3>
                        <p className="text-sm text-muted-foreground">{airdrop.symbol}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {airdrop.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Value</p>
                        <p className="font-semibold text-primary">{airdrop.estimatedValue}</p>
                      </div>
                      <Link href={`/airdrops/${airdrop.id}`}>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm">
                          Join
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
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
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    Never Miss an Airdrop
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Get weekly updates on the hottest airdrops delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all flex-1"
                    />
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all whitespace-nowrap">
                      Subscribe
                    </Button>
                  </div>
                </div>
                
                {/* 3D Envelope */}
                <div className="hidden lg:block h-56 rounded-lg overflow-hidden">
                  <Envelope3D />
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
