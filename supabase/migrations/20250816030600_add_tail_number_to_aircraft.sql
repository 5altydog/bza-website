-- Add tail_number column to aircraft table
ALTER TABLE aircraft ADD COLUMN tail_number TEXT;

-- Update existing records with tail numbers based on their names
UPDATE aircraft 
SET tail_number = CASE 
  WHEN name = 'Cessna 172S' THEN 'n2114u'
  WHEN name = 'Cessna 172S G1000' THEN 'n66083'
  WHEN name = 'Cessna 152' THEN 'n4785b'
  ELSE tail_number
END;