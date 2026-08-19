-- Add is_published to projects (run in SQL Editor)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;
UPDATE projects SET is_published = true WHERE is_published IS NULL;
