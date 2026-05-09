"use client"

import { useMemo, useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AirdropCard } from "@/components/airdrop-card"
import type { Airdrop, AirdropStatus } from "@/lib/data"

const statusFilters: { value: AirdropStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "upcoming", label: "Upcoming" },
  { value: "ended", label: "Ended" },
]

const chainFilters = [
  "All Chains",
  "Multi-chain",
  "Ethereum L2",
  "Layer 1",
]

interface AirdropsListProps {
  airdrops: Airdrop[]
  error?: string | null
}

export function AirdropsList({ airdrops, error }: AirdropsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<AirdropStatus | "all">("all")
  const [chainFilter, setChainFilter] = useState("All Chains")

  const filteredAirdrops = useMemo(
    () =>
      airdrops.filter((airdrop) => {
        const matchesSearch =
          airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          airdrop.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          airdrop.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || airdrop.status === statusFilter
        const matchesChain = chainFilter === "All Chains" || airdrop.chain === chainFilter

        return matchesSearch && matchesStatus && matchesChain
      }),
    [airdrops, searchQuery, statusFilter, chainFilter]
  )

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setChainFilter("All Chains")
  }

  const hasActiveFilters = searchQuery || statusFilter !== "all" || chainFilter !== "All Chains"

  return (
    <>
      <section className="border-b border-border bg-card/30 sticky top-16 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search airdrops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={statusFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(filter.value)}
                  className={statusFilter === filter.value ? "bg-primary text-primary-foreground glow-sm" : "hover:border-primary/50"}
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            <select
              value={chainFilter}
              onChange={(e) => setChainFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              {chainFilters.map((chain) => (
                <option key={chain} value={chain}>
                  {chain}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredAirdrops.length}</span> airdrops
            </p>
          </div>

          {error ? (
            <div className="text-center py-16">
              <p className="text-foreground mb-3">Unable to load airdrops.</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : filteredAirdrops.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAirdrops.map((airdrop) => (
                <AirdropCard key={airdrop.id} airdrop={airdrop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">No airdrops found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
