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
  {
    id: "7",
    name: "Arbitrum",
    symbol: "ARB",
    description: "Arbitrum is an optimistic rollup Layer 2 scaling solution for Ethereum.",
    status: "active",
    chain: "Ethereum L2",
    estimatedValue: "$400 - $4,000",
    endDate: "2026-06-15",
    requirements: ["Bridge to Arbitrum", "Swap on GMX or Camelot", "Provide liquidity"],
    website: "https://arbitrum.io",
    featured: true,
  },
  {
    id: "8",
    name: "Optimism",
    symbol: "OP",
    description: "Optimism is an optimistic rollup and general-purpose L2 for Ethereum.",
    status: "active",
    chain: "Ethereum L2",
    estimatedValue: "$250 - $2,500",
    endDate: "2026-05-25",
    requirements: ["Bridge ETH to Optimism", "Use Uniswap on Optimism", "Deploy contract"],
    website: "https://optimism.io",
    featured: false,
  },
  {
    id: "9",
    name: "Polygon",
    symbol: "MATIC",
    description: "Polygon is a Layer 2 scaling solution that offers fast and inexpensive transactions.",
    status: "active",
    chain: "Layer 1",
    estimatedValue: "$100 - $1,000",
    endDate: "2026-07-10",
    requirements: ["Bridge assets to Polygon", "Swap on QuickSwap", "Use dApps"],
    website: "https://polygon.technology",
    featured: false,
  },
  {
    id: "10",
    name: "Starknet",
    symbol: "STRK",
    description: "Starknet is a General Purpose validity-rollup (ZK-Rollup) built on Ethereum.",
    status: "upcoming",
    chain: "Ethereum L2",
    estimatedValue: "$300 - $3,000",
    endDate: "2026-08-20",
    requirements: ["Use Starknet testnet", "Deploy Cairo contracts", "Join community"],
    website: "https://starknet.io",
    featured: true,
  },
  {
    id: "11",
    name: "Mantle",
    symbol: "MNT",
    description: "Mantle is a high-performance Ethereum L2 with a focus on developer experience.",
    status: "upcoming",
    chain: "Ethereum L2",
    estimatedValue: "$200 - $2,000",
    endDate: "2026-07-30",
    requirements: ["Bridge to Mantle", "Interact with Mantle DEX", "Participate in testnet"],
    website: "https://mantle.xyz",
    featured: false,
  },
  {
    id: "12",
    name: "Base",
    symbol: "BASE",
    description: "Base is a secure, low-cost Ethereum Layer 2 built on the OP Stack.",
    status: "upcoming",
    chain: "Ethereum L2",
    estimatedValue: "$150 - $1,500",
    endDate: "2026-06-30",
    requirements: ["Bridge assets to Base", "Use dApps on Base", "Complete activities"],
    website: "https://base.org",
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
  {
    id: "6",
    title: "Getting Started with Layer 2 Solutions",
    excerpt: "A beginner's guide to navigating Ethereum Layer 2 ecosystems.",
    content: "Full article content here...",
    author: "Jessica Moore",
    publishedAt: "2026-03-25",
    readTime: "6 min read",
    category: "Guide",
    slug: "getting-started-layer2",
  },
  {
    id: "7",
    title: "Common Airdrop Scams and How to Avoid Them",
    excerpt: "Protect yourself from fraudulent airdrop schemes and phishing attacks.",
    content: "Full article content here...",
    author: "Robert Chen",
    publishedAt: "2026-03-20",
    readTime: "5 min read",
    category: "Security",
    slug: "avoid-airdrop-scams",
  },
  {
    id: "8",
    title: "The Future of DeFi: What's Coming in 2026",
    excerpt: "Exploring the emerging trends and technologies shaping decentralized finance.",
    content: "Full article content here...",
    author: "Lisa Anderson",
    publishedAt: "2026-03-15",
    readTime: "10 min read",
    category: "Analysis",
    slug: "defi-future-2026",
  },
  {
    id: "9",
    title: "Zero-Knowledge Proofs Explained Simply",
    excerpt: "Understanding zk-proofs and their role in blockchain privacy.",
    content: "Full article content here...",
    author: "Thomas Kumar",
    publishedAt: "2026-03-10",
    readTime: "9 min read",
    category: "Education",
    slug: "zero-knowledge-proofs",
  },
  {
    id: "10",
    title: "Staking Rewards: Maximize Your Passive Income",
    excerpt: "Learn strategies to earn the best returns from staking your crypto.",
    content: "Full article content here...",
    author: "Michelle Zhang",
    publishedAt: "2026-03-05",
    readTime: "7 min read",
    category: "Guide",
    slug: "staking-rewards-guide",
  },
  {
    id: "11",
    title: "NFT Airdrops: Opportunities and Risks",
    excerpt: "A comprehensive look at NFT airdrop strategies and potential pitfalls.",
    content: "Full article content here...",
    author: "Brandon Lee",
    publishedAt: "2026-02-28",
    readTime: "8 min read",
    category: "Analysis",
    slug: "nft-airdrops-guide",
  },
  {
    id: "12",
    title: "Web3 Wallets: Security Best Practices",
    excerpt: "Essential tips for keeping your cryptocurrency wallets secure.",
    content: "Full article content here...",
    author: "Sarah Johnson",
    publishedAt: "2026-02-20",
    readTime: "6 min read",
    category: "Security",
    slug: "web3-wallet-security",
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
