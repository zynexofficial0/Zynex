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
  logo?: string
  telegramLink?: string
  discordLink?: string
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
  logo?: string
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
    logo: "https://images.g2crowd.com/user_avatars/4471222/original.png",
    telegramLink: "https://t.me/layerzero",
    discordLink: "https://discord.gg/layerzero",
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
    logo: "https://avatars.githubusercontent.com/u/58751634?s=200&v=4",
    telegramLink: "https://t.me/zksync",
    discordLink: "https://discord.gg/zksync",
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
    logo: "https://avatars.githubusercontent.com/u/100604879?s=200&v=4",
    telegramLink: "https://t.me/Scroll_ZK",
    discordLink: "https://discord.gg/scroll",
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
    logo: "https://avatars.githubusercontent.com/u/126126067?s=200&v=4",
    telegramLink: "https://t.me/lineaprotocol",
    discordLink: "https://discord.gg/linea",
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
    logo: "https://pbs.twimg.com/profile_images/1737890546255200256/Aqf6KvPX_400x400.jpg",
    telegramLink: "https://t.me/monad_xyz",
    discordLink: "https://discord.gg/monad",
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
    logo: "https://avatars.githubusercontent.com/u/144033505?s=200&v=4",
    telegramLink: "https://t.me/blast",
    discordLink: "https://discord.gg/blast",
  },
  {
    id: "7",
    name: "KuCoin",
    symbol: "KCS",
    description: "KuCoin is launching an exclusive airdrop campaign for traders and early adopters across its ecosystem.",
    status: "active",
    chain: "Multi-chain",
    estimatedValue: "$75 - $1,200",
    endDate: "2026-06-25",
    requirements: ["Create a KuCoin account", "Complete trading missions", "Join KuCoin community"],
    website: "https://www.kucoin.com",
    featured: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/KuCoin-logo.svg",
    telegramLink: "https://t.me/kucoinexchange",
    discordLink: "https://discord.com/invite/kucoin",
  },
  {
    id: "8",
    name: "IoTraders",
    symbol: "IOTR",
    description: "IoTraders is rewarding early adopters with utility tokens for engaging its AI trading platform.",
    status: "active",
    chain: "Multi-chain",
    estimatedValue: "$120 - $2,000",
    endDate: "2026-07-05",
    requirements: ["Sign up on IoTraders", "Complete onboarding tasks", "Engage with the community"],
    website: "https://www.iotraders.io",
    featured: true,
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80",
    telegramLink: "https://t.me/iotraders",
    discordLink: "https://discord.gg/iotraders",
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
    logo: "https://avatars.githubusercontent.com/u/1?s=200&v=4",
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
    logo: "https://avatars.githubusercontent.com/u/2?s=200&v=4",
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
    logo: "https://avatars.githubusercontent.com/u/3?s=200&v=4",
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
    logo: "https://avatars.githubusercontent.com/u/4?s=200&v=4",
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
    logo: "https://avatars.githubusercontent.com/u/5?s=200&v=4",
  },
  {
    id: "6",
    title: "KuCoin and IoTraders: What Their Latest Airdrops Mean for Traders",
    excerpt: "A breakdown of the KuCoin and IoTraders airdrops, eligibility, and strategy for crypto participants.",
    content: "Full article content here...",
    author: "Crypto Insights",
    publishedAt: "2026-05-12",
    readTime: "6 min read",
    category: "News",
    slug: "kucoin-iotraders-airdrop-analysis",
    logo: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
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
