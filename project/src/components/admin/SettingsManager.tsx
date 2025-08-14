import React, { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { supabase, SiteSettings } from '../../lib/supabase';

interface SettingsFormData {
  contact_phone: string;
  contact_email: string;
  location_name: string;
  location_link: string;
}

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings[]>([]);
  const [formData, setFormData] = useState<SettingsFormData>({
    contact_phone: '',
    contact_email: '',
    location_name: '',
    location_link: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('key', ['contact_phone', 'contact_email', 'location_name', 'location_link']);

      if (error) {
        console.error('Error loading settings:', error);
      } else {
        setSettings(data || []);
        
        // Populate form data
        const settingsMap = (data || []).reduce((acc, setting) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {} as Record<string, string>);

        setFormData({
          contact_phone: settingsMap.contact_phone || '',
          contact_email: settingsMap.contact_email || '',
          location_name: settingsMap.location_name || '',
          location_link: settingsMap.location_link || ''
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const settingsToUpdate = [
        {
          key: 'contact_phone',
          value: formData.contact_phone,
          description: 'Main contact phone number'
        },
        {
          key: 'contact_email',
          value: formData.contact_email,
          description: 'Main contact email'
        },
        {
          key: 'location_name',
          value: formData.location_name,
          description: 'Business location'
        },
        {
          key: 'location_link',
          value: formData.location_link,
          description: 'Google Maps link'
        }
      ];

      for (const setting of settingsToUpdate) {
        const existingSetting = settings.find(s => s.key === setting.key);
        
        if (existingSetting) {
          // Update existing setting
          const { error } = await supabase
            .from('site_settings')
            .update({ value: setting.value })
            .eq('key', setting.key);

          if (error) throw error;
        } else {
          // Insert new setting
          const { error } = await supabase
            .from('site_settings')
            .insert([setting]);

          if (error) throw error;
        }
      }

      await loadSettings();
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Settings</h2>
        <p className="text-gray-600">
          Manage your contact information and business details that appear throughout the website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Contact Phone
            </label>
            <input
              type="tel"
              required
              value={formData.contact_phone}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(310) 754-5676"
            />
            <p className="text-sm text-gray-500 mt-1">
              The main phone number for your business
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Contact Email
            </label>
            <input
              type="email"
              required
              value={formData.contact_email}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ted@flybz.net"
            />
            <p className="text-sm text-gray-500 mt-1">
              The main email address for customer inquiries
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Business Location
          </label>
          <input
            type="text"
            required
            value={formData.location_name}
            onChange={(e) => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Zamperini Field, Torrance, California"
          />
          <p className="text-sm text-gray-500 mt-1">
            Your business location as it should appear on the website
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ExternalLink className="w-4 h-4 inline mr-2" />
            Google Maps Link
          </label>
          <input
            type="url"
            required
            value={formData.location_link}
            onChange={(e) => setFormData(prev => ({ ...prev, location_link: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://maps.app.goo.gl/..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Link to your business location on Google Maps
          </p>
        </div>

        {/* Preview Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          <div className="bg-blue-900 text-white p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-4">Ready to Take Flight?</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-blue-200 text-sm">{formData.location_name || 'Location not set'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-blue-200 text-sm">{formData.contact_phone || 'Phone not set'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-blue-200 text-sm">{formData.contact_email || 'Email not set'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};