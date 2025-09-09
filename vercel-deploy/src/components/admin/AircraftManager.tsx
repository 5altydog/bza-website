import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase, DatabaseAircraft } from '../../lib/supabase';

interface AircraftManagerProps {
  aircraft: DatabaseAircraft[];
  onAircraftUpdate: () => void;
}

interface AircraftFormData {
  name: string;
  model: string;
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
  const [formData, setFormData] = useState<AircraftFormData>({
    name: '',
    model: '',
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
  };

  const handleEdit = (aircraft: DatabaseAircraft) => {
    setFormData({
      name: aircraft.name,
      model: aircraft.model,
      price: aircraft.price,
      capacity: aircraft.capacity,
      avionics: aircraft.avionics,
      description: aircraft.description,
      image_url: aircraft.image_url,
      is_active: aircraft.is_active,
      display_order: aircraft.display_order
    });
    setEditingId(aircraft.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      console.log('Already submitting, ignoring...');
      return;
    }

    setIsSubmitting(true);
    console.log('Form submitted:', { editingId, formData });

    try {
      if (editingId) {
        // Update existing aircraft
        console.log('Updating aircraft with ID:', editingId);
        const { error } = await supabase
          .from('aircraft')
          .update(formData)
          .eq('id', editingId);

        if (error) {
          console.error('Supabase update error:', error);
          throw error;
        }
        console.log('Aircraft updated successfully');
      } else {
        // Create new aircraft
        console.log('Creating new aircraft');
        const { error } = await supabase
          .from('aircraft')
          .insert([formData]);

        if (error) {
          console.error('Supabase insert error:', error);
          throw error;
        }
        console.log('Aircraft created successfully');
      }

      onAircraftUpdate();
      resetForm();
      alert('Aircraft saved successfully!');
    } catch (error) {
      console.error('Error saving aircraft:', error);
      alert(`Error saving aircraft: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
                      Price ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
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
                    Image URL
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/aircraft-image.jpg or https://example.com/image.jpg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Use relative paths like "/image.jpg" for local images, or full URLs for external images
                  </p>
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
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting 
                      ? 'Saving...' 
                      : editingId ? 'Update Aircraft' : 'Add Aircraft'
                    }
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSubmitting}
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
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.model} - ${item.price}</p>
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
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
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