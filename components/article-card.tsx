import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Article } from "@/lib/data"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:border-primary/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{article.author}</span>
            <span className="text-border">|</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          
          <Link 
            href={`/articles/${article.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Read
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
