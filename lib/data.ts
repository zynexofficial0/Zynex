export type AirdropStatus = "active" | "upcoming" | "ended"

export interface Airdrop {
  id: string
  name: string
  symbol: string
  description: string
  status: AirdropStatus
  chain: string
  estimatedValue: string
  endDate: string
  requirements: string[]
  website: string
  featured: boolean
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: string
  category: string
  slug: string
}

export const airdrops: Airdrop[] = [
  {
    id: "1",
    name: "LayerZero",
    symbol: "ZRO",
    description: "LayerZero is an omnichain interoperability protocol designed for lightweight message passing across chains.",
    status: "active",
    chain: "Multi-chain",
    estimatedValue: "$500 - $5,000",
    endDate: "2026-05-15",
    requirements: ["Bridge assets using LayerZero", "Use Stargate Finance", "Interact with multiple chains"],
    website: "https://layerzero.network",
    featured: true,
  },
  {
    id: "2",
    name: "zkSync Era",
    symbol: "ZK",
    description: "zkSync Era is a Layer 2 scaling solution for Ethereum using zero-knowledge proofs.",
    status: "active",
    chain: "Ethereum L2",
    estimatedValue: "$300 - $3,000",
    endDate: "2026-06-01",
    requirements: ["Bridge ETH to zkSync", "Use DEX on zkSync", "Deploy smart contract"],
    website: "https://zksync.io",
    featured: true,
  },
  {
    id: "3",
    name: "Scroll",
    symbol: "SCR",
    description: "Scroll is a native zkEVM Layer 2 solution built on Ethereum with complete EVM equivalence.",
    status: "active",
    chain: "Ethereum L2",
    estimatedValue: "$200 - $2,000",
    endDate: "2026-05-30",
    requirements: ["Bridge to Scroll", "Swap on native DEX", "Provide liquidity"],
    website: "https://scroll.io",
    featured: false,
  },
  {
    id: "4",
    name: "Linea",
    symbol: "LINEA",
    description: "Linea is a developer-ready zkEVM rollup built by ConsenSys for scaling Ethereum.",
    status: "upcoming",
    chain: "Ethereum L2",
    estimatedValue: "$100 - $1,500",
    endDate: "2026-07-01",
    requirements: ["Bridge assets to Linea", "Use Linea DEX", "Participate in testnet"],
    website: "https://linea.build",
    featured: false,
  },
  {
    id: "5",
    name: "Monad",
    symbol: "MON",
    description: "Monad is a high-performance EVM-compatible Layer 1 blockchain with parallel execution.",
    status: "upcoming",
    chain: "Layer 1",
    estimatedValue: "$500 - $10,000",
    endDate: "2026-08-01",
    requirements: ["Join Discord", "Complete testnet tasks", "Follow on Twitter"],
    website: "https://monad.xyz",
    featured: true,
  },
  {
    id: "6",
    name: "Blast",
    symbol: "BLAST",
    description: "Blast is an Ethereum L2 with native yield for ETH and stablecoins.",
    status: "ended",
    chain: "Ethereum L2",
    estimatedValue: "$150 - $2,500",
    endDate: "2026-03-01",
    requirements: ["Bridge to Blast", "Hold ETH on Blast", "Use Blast dApps"],
    website: "https://blast.io",
    featured: false,
  },
]

export const articles: Article[] = [
  {
    id: "1",
    title: "How to Maximize Your Airdrop Earnings in 2026",
    excerpt: "Learn the strategies that successful airdrop hunters use to maximize their token rewards.",
    content: "Full article content here...",
    author: "Alex Chen",
    publishedAt: "2026-04-10",
    readTime: "5 min read",
    category: "Guide",
    slug: "maximize-airdrop-earnings-2026",
  },
  {
    id: "2",
    title: "Understanding zkEVM: The Future of Layer 2 Scaling",
    excerpt: "A deep dive into zero-knowledge technology and how it's revolutionizing blockchain scalability.",
    content: "Full article content here...",
    author: "Sarah Williams",
    publishedAt: "2026-04-08",
    readTime: "8 min read",
    category: "Education",
    slug: "understanding-zkevm-layer2",
  },
  {
    id: "3",
    title: "Top 10 Airdrops to Watch This Month",
    excerpt: "Our curated list of the most promising airdrops happening this month.",
    content: "Full article content here...",
    author: "Mike Johnson",
    publishedAt: "2026-04-05",
    readTime: "4 min read",
    category: "Analysis",
    slug: "top-10-airdrops-april-2026",
  },
  {
    id: "4",
    title: "Airdrop Security: How to Protect Your Wallet",
    excerpt: "Essential security tips to keep your crypto safe while participating in airdrops.",
    content: "Full article content here...",
    author: "Emma Davis",
    publishedAt: "2026-04-02",
    readTime: "6 min read",
    category: "Security",
    slug: "airdrop-security-tips",
  },
  {
    id: "5",
    title: "The Rise of Multi-Chain Airdrops",
    excerpt: "How cross-chain protocols are changing the airdrop landscape.",
    content: "Full article content here...",
    author: "David Park",
    publishedAt: "2026-03-28",
    readTime: "7 min read",
    category: "Trends",
    slug: "multi-chain-airdrops-rise",
  },
]

export function getStatusColor(status: AirdropStatus): string {
  switch (status) {
    case "active":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "upcoming":
      return "bg-primary/20 text-primary border-primary/30"
    case "ended":
      return "bg-muted text-muted-foreground border-border"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}
