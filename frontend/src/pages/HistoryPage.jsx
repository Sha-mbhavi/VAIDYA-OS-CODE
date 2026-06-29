import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function HistoryPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get('/patients').then((res) => setPatients(res.data));
  }, []);

  return (
    <div>
      <h1 className="hero">Patient History</h1>
      <p className="muted">Review recent patient records and clinical context.</p>
      <div className="card" style={{ marginTop: 20 }}>
        {patients.map((patient) => (
          <div key={patient.id} style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <strong>{patient.full_name}</strong>
            <div className="muted">{patient.phone} · {patient.language}</div>
            <div style={{ fontSize: '0.95rem' }}>Age: {patient.age} · Gender: {patient.gender}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
