import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, X } from 'lucide-react';
import { supabase, DatabaseAircraft } from '../../lib/supabase';

interface AircraftManagerProps {
  aircraft: DatabaseAircraft[];
  onAircraftUpdate: () => void;
}

interface AircraftFormData {
  name: string;
  model: string;
  tail_number: string;
  price: number;
  capacity: string;
  avionics: string;
  description: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
}

export const AircraftManager: React.FC<AircraftManagerProps> = ({
  aircraft,
  onAircraftUpdate
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingAircraftId, setUploadingAircraftId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AircraftFormData>({
    name: '',
    model: '',
    tail_number: '',
    price: 0,
    capacity: '',
    avionics: '',
    description: '',
    image_url: '',
    is_active: true,
    display_order: 0
  });

  const resetForm = () => {
    setFormData({
      name: '',
      model: '',
      tail_number: '',
      price: 0,
      capacity: '',
      avionics: '',
      description: '',
      image_url: '',
      is_active: true,
      display_order: 0
    });
    setEditingId(null);
    setShowForm(false);
    setIsSubmitting(false);
    setSelectedFile(null);
    setPreviewUrl('');
    setIsUploading(false);
    setUploadingAircraftId(null);
  };

  const handleEdit = (aircraft: DatabaseAircraft) => {
    setFormData({
      name: aircraft.name,
      model: aircraft.model,
      tail_number: aircraft.tail_number,
      price: aircraft.price,
      capacity: aircraft.capacity,
      avionics: aircraft.avionics,
      description: aircraft.description,
      image_url: aircraft.image_url,
      is_active: aircraft.is_active,
      display_order: aircraft.display_order
    });
    setPreviewUrl(aircraft.image_url);
    setSelectedFile(null);
    setEditingId(aircraft.id);
    setShowForm(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeSelectedFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(editingId ? formData.image_url : '');
  };

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `aircraft/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('aircraft-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('aircraft-images')
        .getPublicUrl(data.path);

      return publicUrl;
    } finally {
      setIsUploading(false);
    }
  };

  const handleQuickImageUpload = (aircraftId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Validate file
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file.');
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB.');
          return;
        }

        setUploadingAircraftId(aircraftId);
        
        try {
          // Upload the file
          const imageUrl = await uploadFile(file);
          
          // Update the aircraft with the new image
          const { error } = await supabase
            .from('aircraft')
            .update({ image_url: imageUrl })
            .eq('id', aircraftId);

          if (error) {
            console.error('Error updating aircraft image:', error);
            alert('Error updating aircraft image. Please try again.');
          } else {
            onAircraftUpdate();
            alert('Aircraft image updated successfully!');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image. Please try again.');
        } finally {
          setUploadingAircraftId(null);
        }
      }
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting || isUploading) {
      console.log('Already submitting, ignoring...');
      return;
    }

    // Validate form data
    if (!formData.name.trim() || !formData.model.trim() || !formData.tail_number.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.price < 0) {
      alert('Price cannot be negative');
      return;
    }

    if (formData.display_order < 0) {
      alert('Display order cannot be negative');
      return;
    }

    // Validate that we have an image (either existing URL or new file)
    if (!formData.image_url && !selectedFile) {
      alert('Please provide an aircraft image');
      return;
    }

    setIsSubmitting(true);
    console.log('Form submitted:', { editingId, formData });

    // Add timeout to prevent getting stuck
    const timeoutId = setTimeout(() => {
      console.error('Operation timed out after 30 seconds');
      alert('Operation timed out. Please try again.');
      setIsSubmitting(false);
    }, 30000);

    try {
      let finalImageUrl = formData.image_url;

      // Upload new file if selected
      if (selectedFile) {
        finalImageUrl = await uploadFile(selectedFile);
        console.log('File uploaded successfully:', finalImageUrl);
      }
      const finalFormData = { ...formData, image_url: finalImageUrl };

      if (editingId) {
        // Update existing aircraft
        console.log('Updating aircraft with ID:', editingId);
        console.log('Update payload:', finalFormData);
        
        const { data, error } = await supabase
          .from('aircraft')
          .update(finalFormData)
          .eq('id', editingId)
          .select();

        console.log('Update response:', { data, error });

        if (error) {
          console.error('Supabase update error:', error);
          console.error('Error details:', error.details, error.hint, error.code);
          throw error;
        }
        console.log('Aircraft updated successfully:', data);
      } else {
        // Create new aircraft
        console.log('Creating new aircraft');
        console.log('Insert payload:', finalFormData);
        
        const { data, error } = await supabase
          .from('aircraft')
          .insert([finalFormData])
          .select();

        console.log('Insert response:', { data, error });

        if (error) {
          console.error('Supabase insert error:', error);
          console.error('Error details:', error.details, error.hint, error.code);
          throw error;
        }
        console.log('Aircraft created successfully:', data);
      }

      clearTimeout(timeoutId);
      onAircraftUpdate();
      resetForm();
      alert('Aircraft saved successfully!');
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Error saving aircraft:', error);
      
      // Show more detailed error message
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error);
      }
      
      alert(`Error saving aircraft: ${errorMessage}`);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this aircraft?')) return;

    try {
      const { error } = await supabase
        .from('aircraft')
        .delete()
        .eq('id', id);

      if (error) throw error;
      onAircraftUpdate();
    } catch (error) {
      console.error('Error deleting aircraft:', error);
      alert('Error deleting aircraft. Please try again.');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('aircraft')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      onAircraftUpdate();
    } catch (error) {
      console.error('Error updating aircraft status:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Aircraft Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Aircraft
        </button>
      </div>

      {/* Aircraft Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {editingId ? 'Edit Aircraft' : 'Add New Aircraft'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aircraft Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tail Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.tail_number}
                      onChange={(e) => setFormData(prev => ({ ...prev, tail_number: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., N1234A"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = value === '' ? 0 : parseFloat(value);
                        setFormData(prev => ({ ...prev, price: isNaN(numValue) ? 0 : numValue }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.display_order}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = value === '' ? 0 : parseInt(value);
                        setFormData(prev => ({ ...prev, display_order: isNaN(numValue) ? 0 : numValue }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 4-seat aircraft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avionics
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.avionics}
                    onChange={(e) => setFormData(prev => ({ ...prev, avionics: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Traditional instruments"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aircraft Image
                  </label>
                  
                  {/* Current Image Preview */}
                  {previewUrl && (
                    <div className="mb-4">
                      <img 
                        src={previewUrl} 
                        alt="Aircraft preview" 
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      {selectedFile && (
                        <div className="flex justify-between items-center mt-2 p-2 bg-blue-50 rounded">
                          <span className="text-sm text-blue-700">New file: {selectedFile.name}</span>
                          <button
                            type="button"
                            onClick={removeSelectedFile}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="space-y-3">
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <Upload className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-gray-600">
                          {selectedFile ? 'Change Image' : editingId ? 'Replace Image' : 'Upload Aircraft Image'}
                        </span>
                      </label>
                    </div>

                    {/* Manual URL Input (Alternative) */}
                    <div className="relative">
                      <div className="text-center text-sm text-gray-500 mb-2">OR</div>
                      <input
                        type="text"
                        value={formData.image_url}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, image_url: e.target.value }));
                          if (e.target.value && !selectedFile) {
                            setPreviewUrl(e.target.value);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter image URL manually"
                      />
                    </div>

                    <p className="text-sm text-gray-500">
                      Upload an image file (max 5MB) or enter an image URL. Supported formats: JPG, PNG, WebP
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                    Active (visible on website)
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading 
                      ? 'Uploading Image...' 
                      : isSubmitting 
                        ? 'Saving...' 
                        : editingId ? 'Update Aircraft' : 'Add Aircraft'
                    }
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSubmitting || isUploading}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Aircraft List */}
      <div className="space-y-4">
        {aircraft.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image_url} 
                  alt={`Thumbnail image of ${item.name} aircraft`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.model} ({item.tail_number}) - ${item.price}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(item.id, item.is_active)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    item.is_active 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                  title={item.is_active ? 'Hide from website' : 'Show on website'}
                >
                  {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleQuickImageUpload(item.id)}
                  disabled={uploadingAircraftId === item.id}
                  className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Upload new image"
                >
                  {uploadingAircraftId === item.id ? (
                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                  title="Edit aircraft details"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                  title="Delete aircraft"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {aircraft.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No aircraft configured yet. Add your first aircraft to get started.
          </div>
        )}
      </div>
    </div>
  );
};