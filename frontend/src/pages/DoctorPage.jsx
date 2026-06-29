import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function DoctorPage() {
  const [consultations, setConsultations] = useState([]);
  const [soap, setSoap] = useState({ subjective: '', objective: '', assessment: '', plan: '' });
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const loadConsultations = () => {
    api.get('/consultations').then((res) => {
      setConsultations(res.data);
      if (res.data.length) {
        setSelectedConsultation(res.data[0]);
      }
    });
  };

  useEffect(() => { loadConsultations(); }, []);

  const handleSaveSoap = async (event) => {
    event.preventDefault();
    await api.post(
      '/soap',
      null,
      {
        params: {
          consultation_id: selectedConsultation.id,
          subjective: soap.subjective,
          objective: soap.objective,
          assessment: soap.assessment,
          plan: soap.plan,
        },
      }
    );
    alert('SOAP note saved.');
  };

  return (
    <div>
      <h1 className="hero">Doctor Review Workspace</h1>
      <p className="muted">Review consultations, draft SOAP notes, and approve AI-generated summaries.</p>
      <div className="grid" style={{ gridTemplateColumns: '0.8fr 1.2fr', gap: 20, marginTop: 20 }}>
        <div className="card">
          <h3>Pending Consultations</h3>
          {consultations.map((item) => (
            <div key={item.id} onClick={() => setSelectedConsultation(item)} style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <strong>#{item.consultation_id}</strong>
              <div className="muted">{item.chief_complaint}</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Status: {item.status}</div>
            </div>
          ))}
        </div>
        <div className="card">
          {selectedConsultation ? (
            <>
              <h3>SOAP Note</h3>
              <div className="muted" style={{ marginBottom: 12 }}>Selected: {selectedConsultation.chief_complaint}</div>
              <form onSubmit={handleSaveSoap} style={{ display: 'grid', gap: 10 }}>
                <textarea className="input" rows={3} placeholder="Subjective" value={soap.subjective} onChange={(e) => setSoap({ ...soap, subjective: e.target.value })} />
                <textarea className="input" rows={3} placeholder="Objective" value={soap.objective} onChange={(e) => setSoap({ ...soap, objective: e.target.value })} />
                <textarea className="input" rows={3} placeholder="Assessment" value={soap.assessment} onChange={(e) => setSoap({ ...soap, assessment: e.target.value })} />
                <textarea className="input" rows={3} placeholder="Plan" value={soap.plan} onChange={(e) => setSoap({ ...soap, plan: e.target.value })} />
                <button className="btn btn-primary" type="submit">Save SOAP Note</button>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
