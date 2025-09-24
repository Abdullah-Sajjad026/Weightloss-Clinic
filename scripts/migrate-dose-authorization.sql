-- Migration script to add dose authorization fields to risk_assessments table
-- Run this SQL script in your database when you have access

-- Add dose authorization columns to risk_assessments table
ALTER TABLE risk_assessments 
ADD COLUMN IF NOT EXISTS "authorizedMounjaroDose" TEXT,
ADD COLUMN IF NOT EXISTS "authorizedWegovyDose" TEXT;

-- Update any existing records to have default values
UPDATE risk_assessments 
SET 
  "authorizedMounjaroDose" = NULL,
  "authorizedWegovyDose" = NULL
WHERE "authorizedMounjaroDose" IS NULL OR "authorizedWegovyDose" IS NULL;

-- Verify the changes
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'risk_assessments' 
  AND column_name IN ('authorizedMounjaroDose', 'authorizedWegovyDose')
ORDER BY column_name;