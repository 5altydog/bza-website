import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const AdminRouteDebug: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionTest, setConnectionTest] = useState<string>('Testing...');
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('aircraft')
        .select('count')
        .limit(1);

      if (error) {
        console.error('Supabase error:', error);
        setError(`Database error: ${error.message}`);
        setConnectionTest(`Failed: ${error.message}`);
      } else {
        console.log('Supabase connection successful');
        setConnectionTest('Connection successful!');
        
        // Test auth
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error('Auth error:', authError);
          setError(`Auth error: ${authError.message}`);
        } else {
          console.log('Auth check completed, user:', user);
        }
      }
    } catch (err) {
      console.error('Connection test failed:', err);
      setError(`Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setConnectionTest('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    setShowLogin(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Testing Supabase connection...</p>
          <p className="text-sm text-gray-500 mt-2">{connectionTest}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-left bg-gray-100 p-4 rounded text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>URL: {import.meta.env.VITE_SUPABASE_URL}</p>
            <p>Key: {import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
          </div>
          <button
            onClick={testConnection}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};