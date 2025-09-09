import React, { useState, useEffect } from 'react';
import { supabase, isAdmin } from '../../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const AdminRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authorized = await isAdmin(session.user.id);
        setIsAuthenticated(true);
        setIsAuthorized(authorized);
      } else {
        setIsAuthenticated(false);
        setIsAuthorized(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const authorized = await isAdmin(user.id);
        setIsAuthenticated(true);
        setIsAuthorized(authorized);
      } else {
        setIsAuthenticated(false);
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    // Auth state change will be handled by the listener
    checkAuth();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAuthorized(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel. Please contact your administrator.
          </p>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
};