import { NavLink } from 'react-router-dom';
import {
  Activity,
  ClipboardPlus,
  Home,
  LayoutDashboard,
  Mic,
  ShieldCheck,
  Users,
  Stethoscope,
  FileText,
  Brain,
  BarChart3,
  Settings,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const mainNavItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/consultations', label: 'Consultations', icon: Stethoscope },
];

const toolsNavItems = [
  { to: '/voice', label: 'Voice Intake', icon: Mic },
  { to: '/doctor', label: 'Doctor Review', icon: FileText },
  { to: '/clinical-review', label: 'Clinical Review', icon: Brain },
];

const analyticsNavItems = [
  { to: '/history', label: 'History', icon: ClipboardPlus },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
];

const systemNavItems = [
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
];

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavSection = ({ items, label }) => (
    <div className="sidebar-section">
      {label && <div className="sidebar-section-label">{label}</div>}
      <div className="nav-links">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );

  return (
    <div className="layout-wrapper">
      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isOpen ? 'active' : ''}`}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">⚕️</div>
          <div className="sidebar-title">VaidyaOS</div>
        </div>

        {/* Navigation */}
        <NavSection items={mainNavItems} label="MAIN" />
        <NavSection items={toolsNavItems} label="DOCTOR TOOLS" />
        <NavSection items={analyticsNavItems} label="INSIGHTS" />
        <NavSection items={systemNavItems} label="SYSTEM" />

        {/* Doctor Profile Card */}
        <div className="doctor-profile">
          <div className="doctor-avatar">👨‍⚕️</div>
          <div className="doctor-name">Dr. Aarav Sharma</div>
          <div className="doctor-title">Cardiologist</div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
