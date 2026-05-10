import { createClient } from "@supabase/supabase-js"
import type { Airdrop, AirdropStatus } from "@/lib/data"

export const supabase = createClient(
  "https://kmhtrtkblpxmowcibrjf.supabase.co",
  "sb_publishable_QnmZnH13G6a6Ny0pCuN8Xw_qlGevC7O"
)

export function normalizeAirdrop(record: any): Airdrop {
  const requirements = record.requirements

  return {
    id: String(record.id),
    name: record.name ?? "",
    symbol: record.symbol ?? "",
    description: record.description ?? "",
    status: ["active", "upcoming", "ended"].includes(record.status)
      ? (record.status as AirdropStatus)
      : "upcoming",
    chain: record.chain ?? "",
    estimatedValue: record.estimatedValue ?? record.estimated_value ?? "",
    endDate: record.endDate ?? record.end_date ?? "",
    requirements: Array.isArray(requirements)
      ? requirements
      : typeof requirements === "string"
      ? requirements.split(",").map((req: string) => req.trim()).filter(Boolean)
      : [],
    website: record.website ?? "",
    featured: Boolean(record.featured),
  }
}

export function normalizeArticle(record: any) {
  const slug = record.slug ??
    (record.title || "")
      .toLowerCase()
      .replace(/[^
\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

  return {
    id: String(record.id),
    title: record.title ?? "",
    excerpt: record.excerpt ?? record.summary ?? "",
    content: record.content ?? "",
    author: record.author ?? "",
    publishedAt: record.publishedAt ?? record.published_at ?? record.created_at ?? new Date().toISOString(),
    readTime: record.read_time ?? record.readTime ?? "5 min read",
    category: record.category ?? "Guide",
    slug: slug,
  }
}
