import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState([]);
  const [form, setForm] = useState({ patient_id: '', chief_complaint: '', notes: '', priority: 'high' });

  const loadConsultations = () => {
    api.get('/consultations').then((res) => setConsultations(res.data));
  };

  useEffect(() => { loadConsultations(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post('/consultations', { ...form, patient_id: Number(form.patient_id) });
    setForm({ patient_id: '', chief_complaint: '', notes: '', priority: 'high' });
    loadConsultations();
  };

  return (
    <div>
      <h1 className="hero">Consultation Intake</h1>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card">
          <h3>Open Consultation</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
            <input className="input" placeholder="Patient ID" value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} required />
            <input className="input" placeholder="Chief complaint" value={form.chief_complaint} onChange={(e) => setForm({ ...form, chief_complaint: e.target.value })} required />
            <textarea className="input" rows={4} placeholder="Clinical notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </div>
        <div className="card">
          <h3>Recent Consultations</h3>
          {consultations.map((item) => (
            <div key={item.id} style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <strong>#{item.consultation_id}</strong>
              <div className="muted">{item.chief_complaint}</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Status: {item.status} · Priority: {item.priority}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
