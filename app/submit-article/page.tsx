'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FormData {
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  logo?: File
  logoPreview?: string
}

const CATEGORIES = ['Guide', 'Education', 'Analysis', 'Security', 'Trends', 'News', 'Tutorial']

export default function SubmitArticlePage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Guide',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logoPreview: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
        setSubmitMessage({ type: 'error', text: 'Please fill in all required fields' })
        setIsSubmitting(false)
        return
      }

      // Calculate read time based on content length
      const wordCount = formData.content.split(/\s+/).length
      const readTime = `${Math.ceil(wordCount / 200)} min read`

      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

      console.log('Article submitted:', formData)

      // Store in localStorage for demo purposes
      const existingArticles = JSON.parse(localStorage.getItem('userArticles') || '[]')
      const newArticle = {
        id: (Math.max(...existingArticles.map((a: any) => parseInt(a.id)), 5) + 1).toString(),
        ...formData,
        publishedAt: new Date().toISOString(),
        readTime,
        slug,
      }
      existingArticles.push(newArticle)
      localStorage.setItem('userArticles', JSON.stringify(existingArticles))

      setSubmitMessage({ type: 'success', text: 'Article published successfully! It will appear on the site immediately.' })
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'Guide',
      })
    } catch (error) {
      console.error('Error submitting article:', error)
      setSubmitMessage({ type: 'error', text: 'Failed to publish article. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
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

        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Write an <span className="text-primary glow-text">Article</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Share your insights and knowledge with the airdrop hunting community. Your article will be published immediately.
              </p>
            </div>

            {submitMessage && (
              <Card className={`mb-6 border-2 ${submitMessage.type === 'success' ? 'border-primary/50 bg-primary/5' : 'border-destructive/50 bg-destructive/5'}`}>
                <CardContent className="pt-6">
                  <p className={submitMessage.type === 'success' ? 'text-primary' : 'text-destructive'}>
                    {submitMessage.text}
                  </p>
                </CardContent>
              </Card>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Article Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., How to Maximize Your Airdrop Earnings"
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      placeholder="A short summary of your article (1-2 sentences)"
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {formData.logoPreview && (
                      <img
                        src={formData.logoPreview}
                        alt="Preview"
                        className="h-24 w-32 rounded-lg object-cover border border-primary/30"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG or GIF (recommended: 1200x600px)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Article Content *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your article here... Use markdown for formatting:
- # for headings
- ## for subheadings
- **bold** for bold text
- [link](url) for links"
                      rows={12}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none font-mono text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Word count: {formData.content.split(/\s+/).filter(w => w).length} words ({Math.ceil(formData.content.split(/\s+/).filter(w => w).length / 200)} min read)
                  </p>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all flex-1"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Article'}
                </Button>
                <Link href="/articles" className="flex-1">
                  <Button type="button" variant="outline" className="w-full hover:border-primary/50 hover:text-primary">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
