import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function ClinicalReviewPage() {
  const [consultations, setConsultations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [symptoms, setSymptoms] = useState(null);
  const [summary, setSummary] = useState(null);

  const loadConsultations = () => {
    api.get('/consultations').then((res) => {
      setConsultations(res.data);
      if (res.data.length) {
        setSelected(res.data[0]);
      }
    });
  };

  useEffect(() => { loadConsultations(); }, []);

  const loadAnalysis = async (consultation) => {
    setSelected(consultation);
    const symptomResponse = await api.post('/symptoms', null, {
      params: { text: consultation.chief_complaint },
    });
    setSymptoms(symptomResponse.data);
    setSummary({
      summary: `AI Generated Draft: ${consultation.chief_complaint}`,
      risk_level: symptomResponse.data.risk.level,
      follow_up_questions: ['Any worsening symptoms?', 'Any chest pain or shortness of breath?'],
    });
  };

  return (
    <div>
      <h1 className="hero">Clinical Review Panel</h1>
      <p className="muted">Inspect symptoms, review AI risk flags, and approve the draft summary before sign-off.</p>
      <div className="grid" style={{ gridTemplateColumns: '0.8fr 1.2fr', gap: 20, marginTop: 20 }}>
        <div className="card">
          <h3>Consultations for Review</h3>
          {consultations.map((item) => (
            <div key={item.id} onClick={() => loadAnalysis(item)} style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <strong>#{item.consultation_id}</strong>
              <div className="muted">{item.chief_complaint}</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Status: {item.status}</div>
            </div>
          ))}
        </div>
        <div className="card">
          {selected ? (
            <>
              <h3>{selected.chief_complaint}</h3>
              <div className="muted">Patient ID: {selected.patient_id}</div>
              {symptoms ? (
                <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
                  <div>
                    <strong>Detected symptoms</strong>
                    <div>{symptoms.symptoms.join(', ') || 'None'}</div>
                  </div>
                  <div>
                    <strong>Severity</strong>
                    <div>{symptoms.severity}</div>
                  </div>
                  <div>
                    <strong>Risk</strong>
                    <div>{symptoms.risk.level} ({symptoms.risk.score})</div>
                  </div>
                  {summary ? (
                    <div>
                      <strong>Draft Summary</strong>
                      <div style={{ marginTop: 8, padding: 12, background: '#f8fafc', borderRadius: 12 }}>{summary.summary}</div>
                      <div style={{ marginTop: 8 }}><strong>Follow-up questions</strong><ul>{summary.follow_up_questions.map((question) => <li key={question}>{question}</li>)}</ul></div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="muted">Select a consultation to analyze.</div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
