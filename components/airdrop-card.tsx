import Link from "next/link"
import { ExternalLink, Clock, Layers, Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Airdrop } from "@/lib/data"
import { getStatusColor } from "@/lib/data"

interface AirdropCardProps {
  airdrop: Airdrop
  featured?: boolean
}

export function AirdropCard({ airdrop, featured = false }: AirdropCardProps) {
  return (
    <Card className={`relative overflow-hidden transition-all hover:border-primary/50 hover:glow-sm group ${featured ? 'border-primary/30 glow-sm' : ''}`}>
      {airdrop.featured && (
        <div className="absolute top-3 right-3">
          <Star className="h-5 w-5 text-primary fill-primary drop-shadow-[0_0_8px_var(--primary)]" />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary border border-primary/20 text-xl font-bold text-primary group-hover:border-primary/40 transition-colors">
              {airdrop.symbol.slice(0, 2)}
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">{airdrop.name}</h3>
              <p className="text-sm text-muted-foreground">{airdrop.symbol}</p>
            </div>
          </div>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(airdrop.status)}`}>
            {airdrop.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {airdrop.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers className="h-4 w-4" />
            <span>{airdrop.chain}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{new Date(airdrop.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Est. Value</p>
            <p className="font-semibold text-primary">{airdrop.estimatedValue}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/airdrops/${airdrop.id}`}>
              <Button variant="outline" size="sm" className="hover:border-primary/50 hover:text-primary">
                Details
              </Button>
            </Link>
            <a href={airdrop.website} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm hover:glow transition-all">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
