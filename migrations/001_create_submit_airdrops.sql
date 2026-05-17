-- Create submit_airdrops table
CREATE TABLE IF NOT EXISTS submit_airdrops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  website_url VARCHAR(255) NOT NULL,
  twitter_url VARCHAR(255),
  telegram_url VARCHAR(255),
  discord_url VARCHAR(255),
  blockchain VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  reward VARCHAR(100) NOT NULL,
  end_date TIMESTAMP NOT NULL,
  logo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active',
  ip_address VARCHAR(45)
);

-- Create storage bucket for airdrop logos
-- Note: Run this in Supabase Storage directly or via SDK

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS submit_airdrops_status_idx ON submit_airdrops(status);
CREATE INDEX IF NOT EXISTS submit_airdrops_created_at_idx ON submit_airdrops(created_at);
