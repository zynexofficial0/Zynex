import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArticleCard } from "@/components/article-card"
import { articles } from "@/lib/data"

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Sample full content for demonstration
const sampleContent = `
## Introduction

The world of crypto airdrops continues to evolve in 2026, with projects finding new and innovative ways to distribute tokens to early adopters and community members. Understanding how to maximize your airdrop earnings can significantly impact your crypto portfolio.

## Understanding Airdrops

Airdrops are a marketing strategy used by blockchain projects to distribute free tokens to wallet addresses. They serve multiple purposes:

- **Building awareness** for new projects
- **Rewarding early adopters** and loyal community members
- **Decentralizing token distribution** to avoid concentration
- **Creating network effects** by getting tokens into many hands

## Key Strategies for Maximizing Earnings

### 1. Diversify Across Chains

Don't limit yourself to just one blockchain. The most successful airdrop hunters are active across:

- Ethereum mainnet and L2s (Arbitrum, Optimism, zkSync, Scroll)
- Solana ecosystem
- Cosmos ecosystem
- Emerging chains like Monad and Sei

### 2. Be an Active User

Projects reward genuine users. Make sure to:

- Perform regular transactions
- Try different dApps and protocols
- Provide liquidity where possible
- Participate in governance

### 3. Join Communities Early

Many airdrops reward early community members. Follow projects on:

- Twitter/X
- Discord servers
- Telegram groups

### 4. Use Multiple Wallets Strategically

While staying within project guidelines, using multiple wallets can help you:

- Test different strategies
- Reduce risk of missing opportunities
- Experiment with new protocols

## Security Considerations

Always prioritize security:

- Never share your private keys or seed phrases
- Use hardware wallets for large holdings
- Be wary of phishing attempts
- Verify official links before connecting wallets

## Conclusion

Airdrop hunting can be a profitable activity, but it requires patience, dedication, and a strategic approach. Stay informed, stay secure, and never invest more than you can afford to lose.
`

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <Link 
              href="/articles" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-balance">
              {article.title}
            </h1>
            
            <p className="mt-4 text-lg text-muted-foreground">
              {article.excerpt}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary font-semibold">
                  {article.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-foreground">{article.author}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-invert prose-gold max-w-none">
              <div className="text-muted-foreground leading-relaxed space-y-6">
                {sampleContent.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="font-display text-2xl font-bold text-foreground mt-12 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={index} className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n").filter(Boolean)
                    return (
                      <ul key={index} className="space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{item.replace("- ", "")}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  if (paragraph.trim()) {
                    return <p key={index}>{paragraph}</p>
                  }
                  return null
                })}
              </div>
            </article>

            {/* Newsletter CTA */}
            <Card className="mt-12 border-primary/30">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Enjoyed this article?
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Subscribe to get the latest articles and airdrop updates delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 border-t border-border bg-card/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
