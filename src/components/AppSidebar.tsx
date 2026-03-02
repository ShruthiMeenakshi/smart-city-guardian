import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Brain,
  Users,
  LogOut,
  Eye,
  Truck,
  ClipboardCheck,
  Route,
  ClipboardList,
  Sparkles,
  Camera,
  Gift,
  Bell,
} from 'lucide-react';

import { useRole, Role } from '@/contexts/RoleContext';

const allNavItems = [
    { path: '/revenue-calculator', label: 'Revenue Calculator', icon: Recycle, roles: ['Commissioner', 'Inspector', 'Public'] as Role[] },
  { path: '/rewards', label: 'Rewards', icon: Trophy, roles: ['Commissioner', 'Inspector', 'Public'] as Role[] },
  { path: '/', label: 'Command Center', icon: LayoutDashboard, roles: ['Commissioner'] as Role[] },
  { path: '/inspector', label: 'Inspector Panel', icon: Shield, roles: ['Inspector'] as Role[] },
  { path: '/inspector#complaints', label: 'Ward Complaints', icon: Eye, roles: ['Inspector'] as Role[] },
  { path: '/inspector#vehicles', label: 'Assign Vehicles', icon: Truck, roles: ['Inspector'] as Role[] },
  { path: '/inspector#resolution', label: 'Mark Resolution', icon: ClipboardCheck, roles: ['Inspector'] as Role[] },
  { path: '/inspector#predictions', label: 'Validate AI', icon: Brain, roles: ['Inspector'] as Role[] },
  { path: '/inspector#routes', label: 'Truck Routes', icon: Route, roles: ['Inspector'] as Role[] },
  { path: '/public', label: 'My Ward', icon: Users, roles: ['Public'] as Role[] },
  { path: '/public#report', label: 'Report Garbage', icon: FileWarning, roles: ['Public'] as Role[] },
  { path: '/public#track', label: 'Track Status', icon: ClipboardList, roles: ['Public'] as Role[] },
  { path: '/public#cleanliness', label: 'Ward Cleanliness', icon: Sparkles, roles: ['Public'] as Role[] },
  { path: '/public#classify', label: 'AI Classifier', icon: Camera, roles: ['Public'] as Role[] },
  { path: '/public#rewards', label: 'Rewards & Ranks', icon: Gift, roles: ['Public'] as Role[] },
  { path: '/public#info', label: 'Ward Info', icon: Bell, roles: ['Public'] as Role[] },
  { path: '/reports', label: 'Reports', icon: FileWarning, roles: ['Commissioner', 'Inspector'] as Role[] },
  { path: '/map', label: 'Route & Map', icon: Map, roles: ['Commissioner', 'Inspector'] as Role[] },
  { path: '/intelligence', label: 'Intelligence Hub', icon: Brain, roles: ['Commissioner'] as Role[] },
  { path: '/governance', label: 'Governance', icon: Trophy, roles: ['Commissioner', 'Public'] as Role[] },
  { path: '/circular', label: 'Circular Economy', icon: Recycle, roles: ['Commissioner', 'Public'] as Role[] },
  { path: '/chatbot', label: 'AI Assistant', icon: MessageSquare, roles: ['Commissioner', 'Inspector', 'Public'] as Role[] },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { role, setRole, userName, logout } = useRole();
  const navItems = allNavItems.filter(item => item.roles.includes(role));

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

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const [pathname, hash] = item.path.split('#');
          const active = hash
            ? location.pathname === pathname && location.hash === `#${hash}`
            : location.pathname === item.path && !location.hash;
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

      {/* Bottom controls */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        {!collapsed && userName && (
          <div className="px-3 py-2 rounded-md bg-sidebar-accent/30">
            <p className="text-xs font-medium text-sidebar-foreground truncate">{userName}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{role}</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs text-destructive hover:bg-destructive/10 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign Out</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
