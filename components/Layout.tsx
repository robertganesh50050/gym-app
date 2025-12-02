import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  Utensils, 
  CreditCard, 
  QrCode, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Activity
} from 'lucide-react';

interface LayoutProps {
  role: UserRole;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ role, currentView, onNavigate, onLogout, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminMenu = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  const userMenu = [
    { id: 'my-profile', label: 'My Dashboard', icon: Activity },
    { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
    { id: 'diet', label: 'Diet & Nutrition', icon: Utensils },
    { id: 'checkin', label: 'Check-In', icon: QrCode },
  ];

  const menuItems = role === UserRole.ADMIN ? adminMenu : userMenu;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-slate-900/50">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            FitNexus
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-900/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
              {role === UserRole.ADMIN ? 'AD' : 'ME'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">
                {role === UserRole.ADMIN ? 'Admin User' : 'Alex Johnson'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {role === UserRole.ADMIN ? 'Owner' : 'Pro Member'}
              </p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-md">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">FitNexus</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-0 z-50 bg-slate-900 p-4">
             <div className="flex justify-end mb-4">
               <button onClick={() => setIsMobileMenuOpen(false)}><X className="text-slate-400" /></button>
             </div>
             <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-lg ${
                    currentView === item.id
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-300'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-4 text-lg text-red-400 mt-8"
              >
                <LogOut className="w-6 h-6" />
                Logout
              </button>
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
