# Submit Airdrop Feature Setup Guide

## Overview

This document outlines the setup required to get the Submit Airdrop feature working with Supabase.

## Prerequisites

- Supabase project already connected (✓ Environment variables are set)
- Node.js 18+ installed
- npm or yarn package manager

## Setup Steps

### 1. Create Supabase Storage Bucket

First, create a storage bucket for airdrop logos:

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Name it: `airdrop-logos`
5. Set visibility to **Public**
6. Click **Create**

### 2. Create Database Table

Run the migration SQL to create the `submit_airdrops` table:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the contents of `migrations/001_create_submit_airdrops.sql`
5. Click **Run**

Or paste this SQL directly:

```sql
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

CREATE INDEX IF NOT EXISTS submit_airdrops_status_idx ON submit_airdrops(status);
CREATE INDEX IF NOT EXISTS submit_airdrops_created_at_idx ON submit_airdrops(created_at);
```

### 3. Enable Storage Public Access (Optional)

To allow direct access to uploaded logos:

1. Go to **Storage** → **airdrop-logos**
2. Click the three dots menu and select **Edit policies**
3. Click **Add policy** for SELECT
4. Create a policy that allows public read access:
   - Policy name: "Public access"
   - For queries with: `(bucket_id = 'airdrop-logos')`
   - Click **Create**

### 4. Environment Variables

All required environment variables are automatically set:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_URL
```

## Features Implemented

✓ **Submit Airdrop Form** at `/submit-airdrop`
- Project details (name, website, blockchain, category)
- Social links (Twitter, Telegram, Discord)
- Description and reward information
- End date selection
- Direct logo upload from device

✓ **Logo Upload**
- Automatic upload to Supabase Storage
- Public URL generation
- File validation (image type, 5MB max size)
- Preview before submission

✓ **Form Validation**
- Required field validation
- URL format validation
- File size and type checking

✓ **Spam Protection**
- 1 submission per minute per IP address
- Rate limiting via in-memory cache

✓ **Auto-Publishing**
- Submissions set to `status = 'active'` immediately
- No admin approval required
- Instant appearance on website

✓ **Success Confirmation**
- Success message after submission
- Auto-redirect to airdrops page
- Instant live visibility

## Testing

1. Navigate to `http://localhost:3000/submit-airdrop`
2. Fill in all required fields
3. Upload a logo image
4. Click "Submit Airdrop"
5. After success, check `/airdrops` to see your submission live

## File Structure

```
app/
├── api/
│   ├── submit-airdrop/
│   │   └── route.ts          # Form submission handler
│   └── upload-logo/
│       └── route.ts          # Logo upload handler
└── submit-airdrop/
    └── page.tsx             # Submit form page

lib/
└── supabase-client.ts       # Supabase initialization

migrations/
└── 001_create_submit_airdrops.sql  # Database migration
```

## Database Schema

### submit_airdrops Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| project_name | VARCHAR(255) | Project/airdrop name |
| website_url | VARCHAR(255) | Project website |
| twitter_url | VARCHAR(255) | Twitter/X profile URL |
| telegram_url | VARCHAR(255) | Telegram channel URL |
| discord_url | VARCHAR(255) | Discord server URL |
| blockchain | VARCHAR(100) | Blockchain network |
| description | TEXT | Airdrop details |
| category | VARCHAR(100) | Airdrop category |
| reward | VARCHAR(100) | Reward amount/range |
| end_date | TIMESTAMP | Submission deadline |
| logo_url | VARCHAR(500) | Public logo URL |
| created_at | TIMESTAMP | Submission timestamp |
| status | VARCHAR(20) | Active/inactive status |
| ip_address | VARCHAR(45) | Submitter IP for rate limiting |

## Troubleshooting

### "Logo upload failed"
- Check if the `airdrop-logos` bucket exists in Supabase Storage
- Verify bucket is set to public
- Check file size (max 5MB) and type (must be image)

### "Submission failed"
- Verify all required fields are filled
- Check internet connection
- Check Supabase credentials in `.env.local`

### "Rate limit exceeded"
- Wait 1 minute before submitting another airdrop
- Rate limiting is per IP address

### Database errors
- Run the migration SQL to create the table
- Check Supabase project is running
- Verify service role key has database access

## Next Steps

1. Display submitted airdrops in the airdrops feed (integrate with existing airdrops list)
2. Add admin moderation dashboard (optional)
3. Add email notification for new submissions
4. Add analytics tracking
5. Implement webhook notifications to Discord/Telegram
