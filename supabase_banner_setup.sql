-- NAEBAK Platform Banner Setup Script
-- This script sets up the banners_public table and inserts the default banner record

-- Create banners_public table if it doesn't exist
CREATE TABLE IF NOT EXISTS banners_public (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    image_path TEXT NOT NULL,
    page_type TEXT NOT NULL CHECK (page_type IN ('landing', 'candidates', 'mps', 'complaints')),
    governorate_id TEXT NULL, -- NULL means it applies to all governorates
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    title TEXT NULL, -- Optional title for the banner
    description TEXT NULL, -- Optional description
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_banners_public_page_type ON banners_public(page_type);
CREATE INDEX IF NOT EXISTS idx_banners_public_governorate_id ON banners_public(governorate_id);
CREATE INDEX IF NOT EXISTS idx_banners_public_is_default ON banners_public(is_default);
CREATE INDEX IF NOT EXISTS idx_banners_public_is_active ON banners_public(is_active);
CREATE INDEX IF NOT EXISTS idx_banners_public_composite ON banners_public(page_type, governorate_id, is_active);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_banners_public_updated_at ON banners_public;
CREATE TRIGGER update_banners_public_updated_at
    BEFORE UPDATE ON banners_public
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default banner record (sisi-banner.jpg)
-- First, remove any existing default banner to avoid conflicts
DELETE FROM banners_public WHERE is_default = TRUE;

-- Insert the new default banner
INSERT INTO banners_public (
    image_path,
    page_type,
    governorate_id,
    is_default,
    is_active,
    title,
    description
) VALUES (
    'sisi-banner.jpg',
    'landing',
    NULL, -- Applies to all governorates
    TRUE, -- This is the default banner
    TRUE, -- Active
    'Default Platform Banner',
    'Default banner for the NAEBAK platform'
);

-- Insert additional default banners for other page types using the same image
INSERT INTO banners_public (
    image_path,
    page_type,
    governorate_id,
    is_default,
    is_active,
    title,
    description
) VALUES 
(
    'sisi-banner.jpg',
    'candidates',
    NULL,
    FALSE, -- Not the main default, but default for candidates page
    TRUE,
    'Candidates Page Banner',
    'Default banner for candidates page'
),
(
    'sisi-banner.jpg',
    'mps',
    NULL,
    FALSE,
    TRUE,
    'MPs Page Banner',
    'Default banner for MPs page'
),
(
    'sisi-banner.jpg',
    'complaints',
    NULL,
    FALSE,
    TRUE,
    'Complaints Page Banner',
    'Default banner for complaints page'
);

-- Enable Row Level Security (RLS) for the table
ALTER TABLE banners_public ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to active banners
CREATE POLICY "Allow public read access to active banners" ON banners_public
    FOR SELECT USING (is_active = TRUE);

-- Create policy for authenticated users to manage banners (for admin panel)
CREATE POLICY "Allow authenticated users to manage banners" ON banners_public
    FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT SELECT ON banners_public TO anon;
GRANT ALL ON banners_public TO authenticated;
GRANT ALL ON banners_public TO service_role;

-- Verify the setup
SELECT 
    id,
    image_path,
    page_type,
    governorate_id,
    is_default,
    is_active,
    title,
    created_at
FROM banners_public 
ORDER BY is_default DESC, page_type, created_at;
