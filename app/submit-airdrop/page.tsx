"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const blockchains = [
  "Ethereum",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "zkSync",
  "Scroll",
  "Base",
  "Avalanche",
  "Solana",
  "TON",
  "Cosmos",
  "Multi-chain",
]

const categories = [
  "Layer 2",
  "DeFi",
  "NFT",
  "Gaming",
  "Metaverse",
  "Infrastructure",
  "Social",
  "Privacy",
]

type FormData = {
  project_name: string
  website_url: string
  twitter_url: string
  telegram_url: string
  discord_url: string
  blockchain: string
  description: string
  category: string
  reward: string
  end_date: string
}

export default function SubmitAirdropPage() {
  const [formData, setFormData] = useState<FormData>({
    project_name: "",
    website_url: "",
    twitter_url: "",
    telegram_url: "",
    discord_url: "",
    blockchain: "",
    description: "",
    category: "",
    reward: "",
    end_date: "",
  })

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")
  const [logoUrl, setLogoUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

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

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file")
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setErrorMessage("File size must be less than 5MB")
      return
    }

    setLogoFile(file)
    setErrorMessage("")

    // Create preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) {
      setErrorMessage("Logo is required")
      return null
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", logoFile)

      const response = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const data = await response.json()
      setUploadProgress(100)
      return data.url
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to upload logo"
      )
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    // Validate all fields
    if (!formData.project_name.trim()) {
      setErrorMessage("Project name is required")
      return
    }

    if (!formData.website_url.trim()) {
      setErrorMessage("Website URL is required")
      return
    }

    if (!formData.blockchain) {
      setErrorMessage("Blockchain is required")
      return
    }

    if (!formData.description.trim()) {
      setErrorMessage("Description is required")
      return
    }

    if (!formData.category) {
      setErrorMessage("Category is required")
      return
    }

    if (!formData.reward.trim()) {
      setErrorMessage("Reward amount is required")
      return
    }

    if (!formData.end_date) {
      setErrorMessage("End date is required")
      return
    }

    // Upload logo first
    let uploadedLogoUrl = logoUrl
    if (!uploadedLogoUrl && logoFile) {
      uploadedLogoUrl = await uploadLogo()
      if (!uploadedLogoUrl) return
    } else if (!uploadedLogoUrl) {
      setErrorMessage("Logo is required")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-airdrop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          logo_url: uploadedLogoUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Submission failed")
      }

      const result = await response.json()
      setSuccessMessage(result.message)
      setLogoUrl("")
      setLogoFile(null)
      setLogoPreview("")
      setFormData({
        project_name: "",
        website_url: "",
        twitter_url: "",
        telegram_url: "",
        discord_url: "",
        blockchain: "",
        description: "",
        category: "",
        reward: "",
        end_date: "",
      })

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/airdrops"
      }, 2000)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit airdrop"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/airdrops"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Airdrops
          </Link>

          <Card className="border-primary/30 glow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Submit Your Airdrop</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Fill in the details below to submit your airdrop. It will be published immediately and appear live on our platform.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                {successMessage && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-sm text-foreground">{successMessage}</p>
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    <p className="text-sm text-foreground">{errorMessage}</p>
                  </div>
                )}

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Project Logo *
                  </label>
                  <div className="space-y-3">
                    {logoPreview ? (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-primary/30">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setLogoFile(null)
                            setLogoPreview("")
                          }}
                          className="absolute top-1 right-1 bg-destructive rounded-full p-1 text-destructive-foreground"
                        >
                          ✕
                        </button>
                      </div>
                    ) : null}

                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-card/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-primary mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="project_name"
                    value={formData.project_name}
                    onChange={handleInputChange}
                    placeholder="e.g., LayerZero"
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                {/* Website URL */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Twitter/X Link
                    </label>
                    <input
                      type="url"
                      name="twitter_url"
                      value={formData.twitter_url}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/..."
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telegram Link
                    </label>
                    <input
                      type="url"
                      name="telegram_url"
                      value={formData.telegram_url}
                      onChange={handleInputChange}
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
                      name="discord_url"
                      value={formData.discord_url}
                      onChange={handleInputChange}
                      placeholder="https://discord.gg/..."
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Blockchain & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Blockchain *
                    </label>
                    <select
                      name="blockchain"
                      value={formData.blockchain}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    >
                      <option value="">Select a blockchain</option>
                      {blockchains.map((chain) => (
                        <option key={chain} value={chain}>
                          {chain}
                        </option>
                      ))}
                    </select>
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
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your airdrop, requirements, and rewards..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                  />
                </div>

                {/* Reward & End Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Reward Amount *
                    </label>
                    <input
                      type="text"
                      name="reward"
                      value={formData.reward}
                      onChange={handleInputChange}
                      placeholder="e.g., $100 - $1000"
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      End Date *
                    </label>
                    <input
                      type="datetime-local"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-6">
                  <Link href="/airdrops" className="flex-1">
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
                    disabled={isSubmitting || isUploading}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all"
                  >
                    {isSubmitting || isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Airdrop"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
