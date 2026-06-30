import { useState } from 'react';
import api from '../lib/api';

export default function VoicePage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/speech/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="hero">Voice Intake & Transcript Review</h1>
      <p className="muted">Upload a recording and review the AI-generated transcript before sending it to the doctor.</p>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
        <div className="card">
          <h3>Upload Recording</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
            <input className="input" type="file" accept="audio/*" onChange={(event) => setFile(event.target.files[0])} />
            <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Processing…' : 'Process Audio'}</button>
          </form>
        </div>
        <div className="card">
          <h3>Transcript Preview</h3>
          {result ? (
            <>
              <div className="muted">File: {result.filename}</div>
              <div style={{ marginTop: 12, padding: 12, background: '#f8fafc', borderRadius: 12 }}>{result.transcript}</div>
              <div style={{ marginTop: 12, color: '#2563eb' }}>Detected language: {result.language}</div>
              <div className="muted">Confidence: {result.confidence}</div>
            </>
          ) : (
            <div className="muted">No transcript yet. Upload an audio sample to begin.</div>
          )}
        </div>
      </div>
    </div>
  );
}
