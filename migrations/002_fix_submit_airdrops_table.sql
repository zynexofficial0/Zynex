-- Create submit_airdrops table
CREATE TABLE IF NOT EXISTS public.submit_airdrops (
  id BIGSERIAL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  website_url VARCHAR(500) NOT NULL,
  twitter_url VARCHAR(500),
  telegram_url VARCHAR(500),
  discord_url VARCHAR(500),
  blockchain VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  reward VARCHAR(255) NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  logo_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'active' NOT NULL,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_submit_airdrops_status ON public.submit_airdrops(status);
CREATE INDEX IF NOT EXISTS idx_submit_airdrops_created_at ON public.submit_airdrops(created_at);
CREATE INDEX IF NOT EXISTS idx_submit_airdrops_blockchain ON public.submit_airdrops(blockchain);

-- Enable RLS (Row Level Security) - allow public read/write
ALTER TABLE public.submit_airdrops ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert
CREATE POLICY "Allow public insert on submit_airdrops"
  ON public.submit_airdrops
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public select
CREATE POLICY "Allow public select on submit_airdrops"
  ON public.submit_airdrops
  FOR SELECT
  USING (true);

-- Create policy to allow service role full access
CREATE POLICY "Allow service role full access on submit_airdrops"
  ON public.submit_airdrops
  USING (true)
  WITH CHECK (true);
