import { NavLink } from 'react-router-dom';
import { Activity, ClipboardPlus, Home, LayoutDashboard, Mic, ShieldCheck, Users } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/consultations', label: 'Consultations', icon: ClipboardPlus },
  { to: '/voice', label: 'Voice Intake', icon: Mic },
  { to: '/history', label: 'History', icon: ClipboardPlus },
  { to: '/doctor', label: 'Doctor Review', icon: Activity },
  { to: '/clinical-review', label: 'Clinical Review', icon: Activity },
  { to: '/analytics', label: 'Analytics', icon: LayoutDashboard },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
];

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside className="sidebar">
        <h2 style={{ marginTop: 0, marginBottom: 24 }}>VaidyaOS</h2>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Icon size={16} />
              {label}
            </span>
          </NavLink>
        ))}
      </aside>
      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
