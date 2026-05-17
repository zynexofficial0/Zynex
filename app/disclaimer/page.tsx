import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Disclaimer | Airdrop Hunt",
  description: "Disclaimer for Airdrop Hunt.",
}

export default function DisclaimerPage() {
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
            <h1 className="font-display text-4xl font-bold text-foreground"><span className="text-primary glow-text">Disclaimer</span></h1>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Important Disclaimer</h2>
              <p>
                The information provided on Airdrop Hunt is for informational purposes only and should not be construed as financial advice, 
                investment advice, or any other type of advice. We are not licensed financial advisors or investment professionals.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cryptocurrency Risk</h2>
              <p>
                Cryptocurrency and blockchain projects are highly experimental and involve substantial risk of loss. 
                Airdrops, in particular, can be subject to various risks including fraud, scams, and total loss of value.
                We do not guarantee the legitimacy, safety, or profitability of any airdrop listed on our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Endorsement</h2>
              <p>
                The listing of an airdrop on Airdrop Hunt does not constitute an endorsement, recommendation, or sponsorship of that project. 
                We conduct due diligence efforts to identify scams, but we cannot guarantee that all projects listed are legitimate or risk-free.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Due Diligence</h2>
              <p>
                We strongly recommend that you conduct your own thorough research and due diligence before participating in any airdrop. 
                This includes verifying project legitimacy, checking official sources, and understanding all terms and conditions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Security Warning</h2>
              <p>
                Beware of phishing attempts, fake websites, and scams claiming to be associated with airdrops. 
                Always verify URLs directly and never share your private keys or seed phrases with anyone. Airdrop Hunt will never ask for such information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                In no event shall Airdrop Hunt be liable for any indirect, incidental, special, consequential, or punitive damages, 
                or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of or inability to use the website or content.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Accuracy of Information</h2>
              <p>
                While we strive to provide accurate and up-to-date information, Airdrop Hunt does not warrant the accuracy, completeness, 
                or timeliness of any information on the website. Information may change rapidly in the cryptocurrency space.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">External Links</h2>
              <p>
                Our website may contain links to external websites. We are not responsible for the content, accuracy, or practices of these external sites. 
                Your use of external websites is at your own risk and subject to their terms and conditions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
