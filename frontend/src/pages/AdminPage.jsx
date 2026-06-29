import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [overview, setOverview] = useState({ active_users: 0, doctors: 0, receptionists: 0, patients: 0 });

  useEffect(() => {
    api.get('/admin/users').then((res) => setUsers(res.data));
    api.get('/admin/overview').then((res) => setOverview(res.data));
  }, []);

  return (
    <div>
      <h1 className="hero">Admin Control Center</h1>
      <p className="muted">Manage platform users and monitor operational health.</p>
      <div className="grid grid-2" style={{ marginTop: 20 }}>
        <div className="card"><div className="muted">Active Users</div><div className="stat">{overview.active_users}</div></div>
        <div className="card"><div className="muted">Doctors</div><div className="stat">{overview.doctors}</div></div>
        <div className="card"><div className="muted">Receptionists</div><div className="stat">{overview.receptionists}</div></div>
        <div className="card"><div className="muted">Patients</div><div className="stat">{overview.patients}</div></div>
      </div>
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Registered Users</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
              <th>Name</th><th>Email</th><th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td>{user.full_name}</td><td>{user.email}</td><td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
