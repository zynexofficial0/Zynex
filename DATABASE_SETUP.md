# Database Setup Instructions

## Fix "Batch Failed" Error

The "Batch failed" error typically means the `submit_airdrops` table doesn't exist or has permission issues in your Supabase database.

### Step 1: Run the SQL Migration

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `migrations/002_fix_submit_airdrops_table.sql`
5. Click **Run**

### Step 2: Verify Table Creation

The script will:
- Create the `submit_airdrops` table with all required columns
- Add indexes for better query performance
- Enable Row Level Security (RLS)
- Create policies to allow public read/write access

### Step 3: Configure RLS Policies

Make sure the following RLS policies are enabled on the `submit_airdrops` table:
- ✅ Allow public INSERT
- ✅ Allow public SELECT
- ✅ Allow service role full access

### Column Details

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | BIGSERIAL | Primary Key | Auto-incrementing ID |
| project_name | VARCHAR(255) | Yes | Name of the project |
| website_url | VARCHAR(500) | Yes | Project website URL |
| twitter_url | VARCHAR(500) | No | Twitter/X profile URL |
| telegram_url | VARCHAR(500) | No | Telegram group/channel URL |
| discord_url | VARCHAR(500) | No | Discord server URL |
| blockchain | VARCHAR(100) | Yes | Blockchain network |
| description | TEXT | Yes | Airdrop description |
| category | VARCHAR(100) | Yes | Airdrop category |
| reward | VARCHAR(255) | Yes | Reward amount |
| end_date | TIMESTAMP | Yes | Airdrop end date/time |
| logo_url | VARCHAR(500) | No | Logo image URL |
| status | VARCHAR(50) | Yes | Status (active/inactive) - defaults to 'active' |
| ip_address | VARCHAR(50) | No | Submitter IP address for rate limiting |
| created_at | TIMESTAMP | Yes | Creation timestamp |
| updated_at | TIMESTAMP | Yes | Last update timestamp |

### Step 4: Set Up Storage Bucket

For logo uploads, you need a storage bucket:

1. Go to Supabase **Storage**
2. Create a new public bucket named `airdrop-logos`
3. Set the bucket to **Public**
4. Create a policy to allow public uploads

### Step 5: Test the Submission

1. Navigate to `/submit-airdrop`
2. Fill in the form with test data
3. Upload a test logo
4. Click "Submit Airdrop"
5. Check your database for the new entry

### Troubleshooting

If you still get errors:

1. **Check RLS Policies**: Make sure the policies allow INSERT and SELECT
2. **Check Storage Permissions**: Ensure `airdrop-logos` bucket is public
3. **Check Service Role Key**: Verify `SUPABASE_SERVICE_ROLE_KEY` is set in your environment
4. **Check Logs**: Look at the browser console and Supabase logs for specific errors

## 3D Falling Coins Animation

The falling coins 3D animation has been added to the website background using Three.js:

- ✅ Automatically renders on all pages
- ✅ Features glowing green coins that fall continuously
- ✅ Coins have realistic rotation and swaying motion
- ✅ Optimized with WebGL rendering
- ✅ Responsive to window resize

### Configuration

To customize the coins animation, edit `/components/falling-coins.tsx`:

- `coinCount`: Number of coins (default: 15)
- Color: `0x00ff88` (neon green)
- Size: `geometry(2, 2, 0.2)` - adjust first value for diameter
- Speed: `velocity` parameter (default: 0.3-0.8)
- Sway: `swayAmount` parameter (default: 0.02)
