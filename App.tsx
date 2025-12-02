import React, { useState } from 'react';
import { UserRole } from './types';
import { MOCK_MEMBERS } from './constants';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

const App: React.FC = () => {
  // State for Role Management (Simulating Login)
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [currentView, setCurrentView] = useState('my-profile'); // Default user view
  
  // State for Navigation
  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    // Simple reset for demo
    alert("Logged out successfully");
    setRole(UserRole.USER);
    setCurrentView('my-profile');
  };

  // Mock toggle for demo purposes
  const toggleRole = () => {
    if (role === UserRole.USER) {
      setRole(UserRole.ADMIN);
      setCurrentView('dashboard');
    } else {
      setRole(UserRole.USER);
      setCurrentView('my-profile');
    }
  };

  return (
    <div className="relative">
      <Layout 
        role={role} 
        currentView={currentView} 
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      >
        {role === UserRole.ADMIN ? (
          <AdminDashboard currentView={currentView} />
        ) : (
          <UserDashboard member={MOCK_MEMBERS[0]} currentView={currentView} />
        )}
      </Layout>

      {/* Demo Role Switcher - Floating Button */}
      <button
        onClick={toggleRole}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-full shadow-2xl font-bold text-sm transition-transform hover:scale-105"
      >
        Switch to {role === UserRole.ADMIN ? 'User' : 'Admin'} View
      </button>
    </div>
  );
};

export default App;
