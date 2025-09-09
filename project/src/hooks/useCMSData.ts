import { useState, useEffect } from 'react';
import { supabase, DatabaseAircraft, HeroContent } from '../lib/supabase';

export const useAircraftData = () => {
  const [aircraft, setAircraft] = useState<DatabaseAircraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAircraft = async () => {
      try {
        const { data, error } = await supabase
          .from('aircraft')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (error) {
          setError(error.message);
          // Fallback to static data if database fails
          const { aircraft: fallbackAircraft } = await import('../data/aircraft');
          setAircraft(fallbackAircraft.map((item, index) => ({
            ...item,
            id: `fallback-${index}`,
            image_url: item.image,
            is_active: true,
            display_order: index,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })));
        } else {
          setAircraft(data || []);
        }
      } catch {
        setError('Failed to load aircraft data');
        // Fallback to static data
        const { aircraft: fallbackAircraft } = await import('../data/aircraft');
        setAircraft(fallbackAircraft.map((item, index) => ({
          ...item,
          id: `fallback-${index}`,
          image_url: item.image,
          is_active: true,
          display_order: index,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })));
      } finally {
        setLoading(false);
      }
    };

    loadAircraft();
  }, []);

  return { aircraft, loading, error };
};

export const useHeroContent = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_content')
          .select('*')
          .eq('is_active', true)
          .single();

        if (error) {
          setError(error.message);
          // Fallback to default content
          setHeroContent({
            id: 'fallback',
            title: 'Discover Aviation!',
            subtitle: 'Experience the magnificent Los Angeles coast from the air as you take off from Torrance and fly over the stunning Palos Verdes Peninsula.',
            button_text: 'Choose Your Aircraft',
            background_image_url: '/palos-verdes-coastline-aerial.jpg',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        } else {
          // Auto-migrate old background image filename to new one
          if (data.background_image_url === '/pxl_20250507_223858595.jpg') {
            data.background_image_url = '/palos-verdes-coastline-aerial.jpg';
            // Update in database
            supabase
              .from('hero_content')
              .update({ background_image_url: '/palos-verdes-coastline-aerial.jpg' })
              .eq('id', data.id)
              .then(() => console.log('Auto-migrated background image filename'));
          }
          setHeroContent(data);
        }
      } catch {
        setError('Failed to load hero content');
        // Fallback to default content
        setHeroContent({
          id: 'fallback',
          title: 'Discover Aviation!',
          subtitle: 'Experience the magnificent Los Angeles coast from the air as you take off from Torrance and fly over the stunning Palos Verdes Peninsula.',
          button_text: 'Choose Your Aircraft',
          background_image_url: '/palos-verdes-coastline-aerial.jpg',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    loadHeroContent();
  }, []);

  return { heroContent, loading, error };
};

export const useSiteSettings = (forceReload = false) => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = async () => {
    setLoading(true);
    try {
      console.log('Loading site settings for BookingModal... (forceReload:', forceReload, ')');
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      console.log('Site settings load result:', { data, error });

      if (error) {
        setError(error.message);
        console.log('Using fallback settings due to error');
        // Fallback to default settings
        setSettings({
          contact_phone: '(310) 754-5676',
          contact_email: 'ted@flybz.net',
          location_name: 'Zamperini Field, Torrance, California',
          location_link: 'https://maps.app.goo.gl/Vg4yEELYLeREJKwK9',
          booking_form_includes_text: 'Includes: 1-hour flight time, pre-flight briefing, instructor guidance, and post-flight debrief'
        });
      } else {
        const settingsMap = (data || []).reduce((acc, setting) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {} as Record<string, string>);
        
        // If no booking_form_includes_text in database, use default
        if (!settingsMap.booking_form_includes_text) {
          settingsMap.booking_form_includes_text = 'Includes: 1-hour flight time, pre-flight briefing, instructor guidance, and post-flight debrief';
        }
        
        console.log('Mapped settings:', settingsMap);
        console.log('Booking form includes text from settings:', settingsMap.booking_form_includes_text);
        setSettings(settingsMap);
      }
    } catch (error) {
      setError('Failed to load site settings');
      console.error('Settings loading error:', error);
      // Fallback to default settings
      setSettings({
        contact_phone: '(310) 754-5676',
        contact_email: 'ted@flybz.net',
        location_name: 'Zamperini Field, Torrance, California',
        location_link: 'https://maps.app.goo.gl/Vg4yEELYLeREJKwK9',
        booking_form_includes_text: 'Includes: 1-hour flight time, pre-flight briefing, instructor guidance, and post-flight debrief'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, [forceReload]);

  return { settings, loading, error, reloadSettings: loadSettings };
};