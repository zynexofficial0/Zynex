'use client'

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  "Guide",
  "Education",
  "Analysis",
  "Security",
  "Trends",
  "News",
]

type FormData = {
  title: string
  excerpt: string
  author: string
  category: string
  content: string
}

export default function SubmitArticlePage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    author: "",
    category: "",
    content: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrorMessage("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    if (!formData.title.trim()) {
      setErrorMessage("Article title is required")
      return
    }

    if (!formData.excerpt.trim()) {
      setErrorMessage("Excerpt is required")
      return
    }

    if (!formData.author.trim()) {
      setErrorMessage("Author name is required")
      return
    }

    if (!formData.category) {
      setErrorMessage("Category is required")
      return
    }

    if (!formData.content.trim()) {
      setErrorMessage("Article content is required")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          result.error || `Failed to submit article (${response.status})`
        )
      }

      setSuccessMessage(result.message || "Article submitted successfully.")
      setFormData({
        title: "",
        excerpt: "",
        author: "",
        category: "",
        content: "",
      })
      setTimeout(() => {
        window.location.href = "/articles"
      }, 1800)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit article")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>

          <div className="grid grid-cols-1 gap-8">
            {/* Form */}
            <div>
              <Card className="border-primary/30 glow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Submit an Article</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Share your latest crypto insights, airdrop reviews, or educational guides with the community.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {successMessage && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <p className="text-sm text-foreground">{successMessage}</p>
                  </div>
                )}

                {errorMessage && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    <p className="text-sm text-foreground">{errorMessage}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Write a compelling headline"
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Summarize the article in one or two sentences"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Your name or pen name"
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Article Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write the full article content here."
                    rows={10}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-vertical"
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <Link href="/articles" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full hover:border-primary/50 hover:text-primary"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Article"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
