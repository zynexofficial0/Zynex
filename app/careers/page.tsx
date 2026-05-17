import Link from "next/link"
import { ArrowLeft, Briefcase, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Careers | Airdrop Hunt",
  description: "Join our team and help us build the future of airdrop discovery.",
}

const positions = [
  {
    title: "Smart Contract Developer",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Community Manager",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Content Writer",
    location: "Remote",
    type: "Part-time",
  },
  {
    title: "Full Stack Developer",
    location: "Remote",
    type: "Full-time",
  },
]

export default function CareersPage() {
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
            <h1 className="font-display text-4xl font-bold text-foreground">Join Our <span className="text-primary glow-text">Team</span></h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Help us build the future of crypto airdrops.</p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Work With Us</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Remote-First</h3>
                  <p className="text-sm text-muted-foreground">Work from anywhere in the world</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Competitive Pay</h3>
                  <p className="text-sm text-muted-foreground">Salary + crypto rewards</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Growth Opportunity</h3>
                  <p className="text-sm text-muted-foreground">Be part of something big</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position) => (
                <div key={position.title} className="p-6 rounded-xl border border-border hover:border-primary/50 transition-colors bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{position.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span>{position.location}</span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
