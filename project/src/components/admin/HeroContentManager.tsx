import React, { useState, useEffect } from 'react';
import { Save, Eye, RefreshCw, Upload } from 'lucide-react';
import { supabase, HeroContent } from '../../lib/supabase';

export const HeroContentManager: React.FC = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    button_text: '',
    background_image_url: '',
    is_active: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async (showRefreshMessage = false) => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading hero content:', error);
      } else if (data) {
        setHeroContent(data);
        setFormData({
          title: data.title,
          subtitle: data.subtitle,
          button_text: data.button_text,
          background_image_url: data.background_image_url,
          is_active: data.is_active
        });
      }
    } catch (error) {
      console.error('Error loading hero content:', error);
    } finally {
      setLoading(false);
      if (showRefreshMessage) {
        alert('Content refreshed from database');
      }
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    loadHeroContent(true);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // For now, just show a message that this would upload the file
    alert(`File upload feature is for demo purposes. To replace the background image, you would need to:

1. Copy your new image file to the /public/ folder
2. Give it a descriptive name (like 'new-coastline-aerial.jpg')
3. Enter the path in the URL field above (like '/new-coastline-aerial.jpg')
4. Save the form

The current image is stored at: ${formData.background_image_url}`);
    
    // Clear the file input
    event.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Add timeout to prevent getting stuck
    const timeoutId = setTimeout(() => {
      setSaving(false);
      alert('Save operation timed out. Please try again.');
    }, 10000);

    try {
      if (heroContent) {
        // Update existing hero content with timeout
        const updatePromise = supabase
          .from('hero_content')
          .update(formData)
          .eq('id', heroContent.id);

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Update timeout')), 8000)
        );

        const { error } = await Promise.race([updatePromise, timeoutPromise]) as any;
        if (error) throw error;
      } else {
        // Create new hero content (deactivate any existing first)
        await supabase
          .from('hero_content')
          .update({ is_active: false })
          .neq('id', '00000000-0000-0000-0000-000000000000');

        const { error } = await supabase
          .from('hero_content')
          .insert([formData]);

        if (error) throw error;
      }

      clearTimeout(timeoutId);
      await loadHeroContent();
      alert('Hero content saved successfully!');
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Error saving hero content:', error);
      let errorMessage = 'Error saving hero content. Please try again.';
      if (error instanceof Error) {
        errorMessage += `\nDetails: ${error.message}`;
      }
      alert(errorMessage);
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
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Hero Section Content</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="w-4 h-4 mr-1" />
            This content appears on your homepage
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="Discover Aviation!"
          />
          <p className="text-sm text-gray-500 mt-1">
            The main headline that appears at the top of your homepage
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle/Description
          </label>
          <textarea
            required
            rows={4}
            value={formData.subtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Experience the magnificent Los Angeles coast from the air..."
          />
          <p className="text-sm text-gray-500 mt-1">
            The descriptive text that appears below your main title
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call-to-Action Button Text
          </label>
          <input
            type="text"
            required
            value={formData.button_text}
            onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Choose Your Aircraft"
          />
          <p className="text-sm text-gray-500 mt-1">
            The text that appears on the main action button
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Image
          </label>
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                required
                value={formData.background_image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, background_image_url: e.target.value }))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="/palos-verdes-coastline-aerial.jpg"
              />
              <div className="relative">
                <input
                  type="file"
                  id="background-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                <button
                  type="button"
                  disabled={uploading}
                  className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200 whitespace-nowrap"
                >
                  <Upload className={`w-4 h-4 mr-2 ${uploading ? 'animate-pulse' : ''}`} />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Enter a URL path or upload a new image. Use high-quality landscape images for best results.
            </p>
          </div>
        </div>

        {formData.background_image_url && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={formData.background_image_url}
                alt="Preview of hero section background image"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent flex items-center justify-center">
                <div className="text-center text-gray-900">
                  <h3 className="text-2xl font-bold mb-2">{formData.title}</h3>
                  <p className="text-sm mb-4 max-w-md">{formData.subtitle}</p>
                  <button 
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    {formData.button_text}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="hero_active"
            checked={formData.is_active}
            onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="hero_active" className="ml-2 block text-sm text-gray-700">
            Active (display this content on the website)
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Hero Content'}
          </button>
        </div>
      </form>
    </div>
  );
};