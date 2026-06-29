export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="hero">Analytics</h1>
      <p className="muted">Operational and clinical insights for administrators.</p>
      <div className="grid grid-2" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="muted">Critical Cases</div>
          <div className="stat">1</div>
        </div>
        <div className="card">
          <div className="muted">Average Intake Time</div>
          <div className="stat">8 min</div>
        </div>
        <div className="card">
          <div className="muted">Multi-language Coverage</div>
          <div className="stat">4</div>
        </div>
        <div className="card">
          <div className="muted">AI Draft Approval Rate</div>
          <div className="stat">92%</div>
        </div>
      </div>
    </div>
  );
}
