import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Clock, Layers, CheckCircle2, AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { airdrops, getStatusColor } from "@/lib/data"

export function generateStaticParams() {
  return airdrops.map((airdrop) => ({
    id: airdrop.id,
  }))
}

export default async function AirdropDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const airdrop = airdrops.find((a) => a.id === id)

  if (!airdrop) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <Link 
              href="/airdrops" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Airdrops
            </Link>
          </div>
        </div>

        {/* Airdrop Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-primary">
                  {airdrop.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-display text-3xl font-bold text-foreground">
                      {airdrop.name}
                    </h1>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium capitalize ${getStatusColor(airdrop.status)}`}>
                      {airdrop.status}
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground mt-1">{airdrop.symbol}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <a href={airdrop.website} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {airdrop.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {airdrop.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Disclaimer</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Airdrop values are estimates and not guaranteed. Always do your own research before participating. Never share your private keys or seed phrases.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Layers className="h-4 w-4" />
                        <span className="text-sm">Chain</span>
                      </div>
                      <span className="font-medium text-foreground">{airdrop.chain}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">End Date</span>
                      </div>
                      <span className="font-medium text-foreground">
                        {new Date(airdrop.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Value</p>
                      <p className="text-2xl font-bold text-primary">{airdrop.estimatedValue}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Want to get notified when this airdrop launches?
                    </p>
                    <Link href="/signup">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Create Free Account
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
