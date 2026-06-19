-- Create submitted_articles table for article submission
CREATE TABLE IF NOT EXISTS submitted_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt VARCHAR(500) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45)
);

CREATE INDEX IF NOT EXISTS submitted_articles_category_idx ON submitted_articles(category);
CREATE INDEX IF NOT EXISTS submitted_articles_published_at_idx ON submitted_articles(published_at);
