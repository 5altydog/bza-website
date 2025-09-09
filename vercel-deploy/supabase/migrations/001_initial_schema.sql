-- Enable RLS
ALTER DATABASE postgres SET row_security = on;

-- Create aircraft table
CREATE TABLE aircraft (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  model VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  capacity VARCHAR(100) NOT NULL,
  avionics TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create hero_content table
CREATE TABLE hero_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'Discover Aviation!',
  subtitle TEXT NOT NULL DEFAULT 'Experience the magnificent Los Angeles coast from the air as you take off from Torrance and fly over the stunning Palos Verdes Peninsula.',
  button_text VARCHAR(100) NOT NULL DEFAULT 'Choose Your Aircraft',
  background_image_url TEXT NOT NULL DEFAULT '/pxl_20250507_223858595.jpg',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create site_settings table
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default aircraft data
INSERT INTO aircraft (name, model, price, capacity, avionics, description, image_url, display_order) VALUES
('Cessna 172S', 'C172S', 195.00, '4-seat aircraft', 'Traditional instruments', 'Perfect for beginners', '/cessna-172s.jpg', 1),
('Cessna 172S G1000', 'C172S G1000', 225.00, '4-seat aircraft', 'Modern glass cockpit', 'Advanced training experience', '/cessna-172s-g1000.jpg', 2),
('Cessna 152', 'C152', 175.00, '2-seat aircraft', 'Classic training aircraft', 'Most affordable option', '/cessna-152.jpg', 3);

-- Insert default hero content
INSERT INTO hero_content (title, subtitle, button_text, background_image_url, is_active) VALUES
('Discover Aviation!', 'Experience the magnificent Los Angeles coast from the air as you take off from Torrance and fly over the stunning Palos Verdes Peninsula.', 'Choose Your Aircraft', '/pxl_20250507_223858595.jpg', true);

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES
('contact_phone', '(310) 754-5676', 'Main contact phone number'),
('contact_email', 'ted@flybz.net', 'Main contact email'),
('location_name', 'Zamperini Field, Torrance, California', 'Business location'),
('location_link', 'https://maps.app.goo.gl/Vg4yEELYLeREJKwK9', 'Google Maps link');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_aircraft_updated_at BEFORE UPDATE ON aircraft FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE aircraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on aircraft" ON aircraft FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on hero_content" ON hero_content FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on site_settings" ON site_settings FOR SELECT USING (true);

-- Create policies for admin access
CREATE POLICY "Allow admin full access on aircraft" ON aircraft FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Allow admin full access on hero_content" ON hero_content FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Allow admin full access on site_settings" ON site_settings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Allow admin read access on admin_users" ON admin_users FOR SELECT USING (
  user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);