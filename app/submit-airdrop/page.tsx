'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Plus, X } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FormData {
  name: string
  symbol: string
  description: string
  chain: string
  estimatedValue: string
  website: string
  telegramLink: string
  discordLink: string
  endDate: string
  requirements: string[]
  logo?: File
  logoPreview?: string
}

export default function SubmitAirdropPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    symbol: '',
    description: '',
    chain: '',
    estimatedValue: '',
    website: '',
    telegramLink: '',
    discordLink: '',
    endDate: '',
    requirements: [],
  })

  const [currentRequirement, setCurrentRequirement] = useState('')
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

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement]
      }))
      setCurrentRequirement('')
    }
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.symbol || !formData.description || !formData.chain || !formData.website || !formData.endDate) {
        setSubmitMessage({ type: 'error', text: 'Please fill in all required fields' })
        setIsSubmitting(false)
        return
      }

      // In a real app, you would upload to a backend or database
      // For now, we'll simulate the submission
      console.log('Airdrop submitted:', formData)

      // Store in localStorage for demo purposes
      const existingAirdrops = JSON.parse(localStorage.getItem('userAirdrops') || '[]')
      const newAirdrop = {
        id: Date.now().toString(),
        ...formData,
        featured: false,
        status: 'active',
      }
      existingAirdrops.push(newAirdrop)
      localStorage.setItem('userAirdrops', JSON.stringify(existingAirdrops))

      setSubmitMessage({ type: 'success', text: 'Airdrop submitted successfully! It will appear on the site immediately.' })
      setFormData({
        name: '',
        symbol: '',
        description: '',
        chain: '',
        estimatedValue: '',
        website: '',
        telegramLink: '',
        discordLink: '',
        endDate: '',
        requirements: [],
      })
    } catch (error) {
      console.error('Error submitting airdrop:', error)
      setSubmitMessage({ type: 'error', text: 'Failed to submit airdrop. Please try again.' })
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
              href="/airdrops"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Airdrops
            </Link>
          </div>
        </div>

        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Submit an <span className="text-primary glow-text">Airdrop</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Share your airdrop with the community. Your submission will be published immediately.
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
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., LayerZero"
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Token Symbol *
                      </label>
                      <input
                        type="text"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleChange}
                        placeholder="e.g., ZRO"
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the project and its airdrop..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Blockchain Chain *
                      </label>
                      <input
                        type="text"
                        name="chain"
                        value={formData.chain}
                        onChange={handleChange}
                        placeholder="e.g., Ethereum L2"
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Estimated Value
                      </label>
                      <input
                        type="text"
                        name="estimatedValue"
                        value={formData.estimatedValue}
                        onChange={handleChange}
                        placeholder="e.g., $500 - $5,000"
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {formData.logoPreview && (
                      <img
                        src={formData.logoPreview}
                        alt="Preview"
                        className="h-20 w-20 rounded-lg object-cover border border-primary/30"
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
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG or GIF (recommended: 500x500px)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Telegram Link
                      </label>
                      <input
                        type="url"
                        name="telegramLink"
                        value={formData.telegramLink}
                        onChange={handleChange}
                        placeholder="https://t.me/..."
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Discord Link
                      </label>
                      <input
                        type="url"
                        name="discordLink"
                        value={formData.discordLink}
                        onChange={handleChange}
                        placeholder="https://discord.gg/..."
                        className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentRequirement}
                      onChange={(e) => setCurrentRequirement(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      placeholder="Add requirement (e.g., Bridge assets, Use DEX, etc.)"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                    <Button
                      type="button"
                      onClick={addRequirement}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {formData.requirements.length > 0 && (
                    <div className="space-y-2">
                      {formData.requirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border"
                        >
                          <span className="text-sm text-foreground">{req}</span>
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Airdrop Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Airdrop'}
                </Button>
                <Link href="/airdrops" className="flex-1">
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
