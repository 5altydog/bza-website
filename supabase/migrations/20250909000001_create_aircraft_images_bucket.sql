-- Create storage bucket for aircraft images
INSERT INTO storage.buckets (id, name, public)
VALUES ('aircraft-images', 'aircraft-images', true);

-- Create storage policy for public read access
CREATE POLICY "Allow public read access on aircraft images"
ON storage.objects FOR SELECT
USING (bucket_id = 'aircraft-images');

-- Create storage policy for admin upload/update/delete
CREATE POLICY "Allow admin upload access on aircraft images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'aircraft-images' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Allow admin update access on aircraft images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'aircraft-images' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Allow admin delete access on aircraft images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'aircraft-images' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);