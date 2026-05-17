import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Privacy Policy | Airdrop Hunt",
  description: "Privacy policy for Airdrop Hunt.",
}

export default function PrivacyPolicyPage() {
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
            <h1 className="font-display text-4xl font-bold text-foreground">Privacy <span className="text-primary glow-text">Policy</span></h1>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                Airdrop Hunt ("we", "us", "our", or "Company") operates the airdrophunt.com website (the "Service"). 
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Personal Data (name, email address, etc.)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Usage Data (pages visited, time spent, etc.)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Data</h2>
              <p>
                Airdrop Hunt uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
                While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at contact@airdrophunt.com
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
