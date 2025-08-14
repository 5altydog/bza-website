import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Settings, 
  LogOut, 
  Home
} from 'lucide-react';
import { supabase, signOut, DatabaseAircraft } from '../../lib/supabase';
import { AircraftManager } from './AircraftManager';
import { HeroContentManager } from './HeroContentManager';
import { SettingsManager } from './SettingsManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveTab = 'aircraft' | 'hero' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('aircraft');
  const [aircraft, setAircraft] = useState<DatabaseAircraft[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    loadAircraft();
  }, []);

  const loadAircraft = async () => {
    try {
      const { data, error } = await supabase
        .from('aircraft')
        .select('*')
        .order('display_order');

      if (error) {
        console.error('Error loading aircraft:', error);
      } else {
        setAircraft(data || []);
      }
    } catch (error) {
      console.error('Error loading aircraft:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const tabs = [
    { id: 'aircraft' as const, label: 'Aircraft', icon: Plane },
    { id: 'hero' as const, label: 'Hero Content', icon: Home },
    { id: 'settings' as const, label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Plane className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Flight School Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              {activeTab === 'aircraft' && (
                <AircraftManager 
                  aircraft={aircraft} 
                  onAircraftUpdate={loadAircraft}
                />
              )}
              {activeTab === 'hero' && <HeroContentManager />}
              {activeTab === 'settings' && <SettingsManager />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};