import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ full_name: '', age: '', gender: 'male', phone: '', language: 'Hindi', address: '' });

  const loadPatients = () => {
    api.get('/patients').then((res) => setPatients(res.data));
  };

  useEffect(() => { loadPatients(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post('/patients', { ...form, age: Number(form.age) });
    setForm({ full_name: '', age: '', gender: 'male', phone: '', language: 'Hindi', address: '' });
    loadPatients();
  };

  return (
    <div>
      <h1 className="hero">Patient Registration</h1>
      <div className="grid" style={{ gridTemplateColumns: '1.1fr 0.9fr', gap: 20 }}>
        <div className="card">
          <h3>Existing Patients</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                <th>Name</th><th>Phone</th><th>Language</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td>{patient.full_name}</td><td>{patient.phone}</td><td>{patient.language}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Register Patient</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
            <input className="input" placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
            <input className="input" placeholder="Age" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
            <select className="input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            <input className="input" placeholder="Preferred language" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} required />
            <input className="input" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <button className="btn btn-primary" type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
