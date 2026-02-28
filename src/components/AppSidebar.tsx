import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileWarning,
  Map,
  Trophy,
  Recycle,
  MessageSquare,
  Shield,
  ChevronLeft,
  Zap,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Command Center', icon: LayoutDashboard },
  { path: '/reports', label: 'Reports', icon: FileWarning },
  { path: '/map', label: 'Route & Map', icon: Map },
  { path: '/governance', label: 'Governance', icon: Trophy },
  { path: '/circular', label: 'Circular Economy', icon: Recycle },
  { path: '/chatbot', label: 'AI Assistant', icon: MessageSquare },
];

const roles = ['Inspector', 'Commissioner', 'Public'];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState('Commissioner');

  return (
    <aside className={`h-screen sticky top-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
              <h1 className="text-sm font-bold text-foreground leading-tight">MadurAI</h1>
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Urban Intelligence Grid</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Role Selector */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-sidebar-border">
          <label className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mt-1 bg-sidebar-accent text-sidebar-accent-foreground text-xs rounded-md px-2 py-1.5 border border-sidebar-border outline-none"
          >
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all ${
                active
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className={`h-4 w-4 flex-shrink-0 ${active ? 'text-primary' : ''}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {active && !collapsed && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
