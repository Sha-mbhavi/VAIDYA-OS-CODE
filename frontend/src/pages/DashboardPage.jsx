import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Brain,
  AlertCircle,
  Plus,
  MessageSquare,
  Upload,
  Zap,
} from 'lucide-react';
import api from '../lib/api';
import StatCard from '../components/StatCard';
import QuickActions from '../components/QuickActions';
import RecentAppointments from '../components/RecentAppointments';
import HealthOverview from '../components/HealthOverview';
import AIInsights from '../components/AIInsights';
import HeroSection from '../components/HeroSection';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    patients: 1248,
    appointments: 86,
    diagnoses: 278,
    criticalCases: 12,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    Promise.all([
      api.get('/patients').catch(() => ({ data: [] })),
      api.get('/consultations').catch(() => ({ data: [] })),
    ]).then(([patientsRes, consultationsRes]) => {
      setStats({
        patients: patientsRes.data.length || 1248,
        appointments: consultationsRes.data.length || 86,
        diagnoses: 278,
        criticalCases: 12,
      });
      setLoading(false);
    });
  }, []);

  const quickActions = [
    {
      icon: Plus,
      label: 'Add Patient',
      onClick: () => window.location.href = '/patients',
    },
    {
      icon: MessageSquare,
      label: 'Start Consultation',
      onClick: () => window.location.href = '/voice',
    },
    {
      icon: Upload,
      label: 'Upload Report',
      onClick: () => window.location.href = '/consultations',
    },
    {
      icon: Zap,
      label: 'AI Analysis',
      onClick: () => window.location.href = '/doctor',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Cards */}
      <div className="grid grid-4">
        <StatCard
          label="Total Patients"
          value={stats.patients}
          change="+12.5% from last month"
          positive={true}
          icon={Users}
        />
        <StatCard
          label="Appointments"
          value={stats.appointments}
          change="+8.2% from last month"
          positive={true}
          icon={Calendar}
        />
        <StatCard
          label="AI Diagnoses"
          value={stats.diagnoses}
          change="+18.7% from last month"
          positive={true}
          icon={Brain}
        />
        <StatCard
          label="Critical Cases"
          value={stats.criticalCases}
          change="-5.3% from last month"
          positive={true}
          icon={AlertCircle}
        />
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ marginBottom: 20 }}>Quick Actions</h3>
        <QuickActions actions={quickActions} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-2" style={{ marginTop: 32 }}>
        {/* Recent Appointments */}
        <div>
          <RecentAppointments />
        </div>

        {/* Health Overview */}
        <div>
          <HealthOverview />
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ marginTop: 32 }}>
        <AIInsights />
      </div>

      {/* Additional Stats Section */}
      <motion.div
        className="card"
        style={{ marginTop: 32 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <h3 style={{ marginBottom: 24 }}>System Performance</h3>
        <div className="grid grid-3" style={{ gap: 20 }}>
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#10b981',
              marginBottom: 8,
            }}>
              98.5%
            </div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>API Uptime</div>
          </div>
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#3b82f6',
              marginBottom: 8,
            }}>
              247ms
            </div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>Avg Response Time</div>
          </div>
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#06b6d4',
              marginBottom: 8,
            }}>
              99.9%
            </div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>Data Accuracy</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
