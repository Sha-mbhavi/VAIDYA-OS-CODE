import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({ patients: 0, consultations: 0, pending: 0 });

  useEffect(() => {
    api.get('/patients').then((res) => {
      setStats((prev) => ({ ...prev, patients: res.data.length }));
    });
    api.get('/consultations').then((res) => {
      setStats((prev) => ({ ...prev, consultations: res.data.length, pending: res.data.filter((item) => item.status === 'pending').length }));
    });
  }, []);

  return (
    <div>
      <h1 className="hero">Clinical Operations Dashboard</h1>
      <p className="muted">Monitor patient intake, consultation status, and AI-assisted summaries.</p>
      <div className="grid grid-2" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="muted">Registered Patients</div>
          <div className="stat">{stats.patients}</div>
        </div>
        <div className="card">
          <div className="muted">Consultations</div>
          <div className="stat">{stats.consultations}</div>
        </div>
        <div className="card">
          <div className="muted">Pending Review</div>
          <div className="stat">{stats.pending}</div>
        </div>
        <div className="card">
          <div className="muted">AI Draft Ready</div>
          <div className="stat">3</div>
        </div>
      </div>
    </div>
  );
}
