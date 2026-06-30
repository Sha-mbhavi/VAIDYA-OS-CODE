import { motion } from 'framer-motion';
import { MoreVertical, Calendar, Clock, User } from 'lucide-react';

export default function RecentAppointments({ appointments = [] }) {
  const defaultAppointments = [
    {
      id: 1,
      patient: 'Rahul Verma',
      age: '32 yrs, Male',
      date: '30 Jun 2025',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'Confirmed',
      avatar: '👨'
    },
    {
      id: 2,
      patient: 'Priya Singh',
      age: '28 yrs, Female',
      date: '30 Jun 2025',
      time: '11:30 AM',
      type: 'Consultation',
      status: 'Pending',
      avatar: '👩'
    },
    {
      id: 3,
      patient: 'Amit Kumar',
      age: '45 yrs, Male',
      date: '30 Jun 2025',
      time: '02:00 PM',
      type: 'Check-up',
      status: 'Confirmed',
      avatar: '👨'
    },
    {
      id: 4,
      patient: 'Neha Patel',
      age: '31 yrs, Female',
      date: '30 Jun 2025',
      time: '03:30 PM',
      type: 'Consultation',
      status: 'Confirmed',
      avatar: '👩'
    },
  ];

  const data = appointments.length > 0 ? appointments : defaultAppointments;

  const getStatusBadge = (status) => {
    const statusClass = status === 'Confirmed' ? 'success' : status === 'Pending' ? 'pending' : 'info';
    return <span className={`badge ${statusClass}`}>{status}</span>;
  };

  const getTypeBadge = (type) => {
    const colors = {
      'Follow-up': '#3b82f6',
      'Consultation': '#06b6d4',
      'Check-up': '#10b981',
    };
    return (
      <span style={{
        background: `${colors[type] || '#9ca3af'}20`,
        color: colors[type] || '#9ca3af',
        padding: '4px 10px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
      }}>
        {type}
      </span>
    );
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3>Recent Appointments</h3>
        <a href="/consultations" style={{ color: '#3b82f6', fontSize: 14, fontWeight: 600 }}>View All</a>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((apt, idx) => (
              <motion.tr
                key={apt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
              >
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                    }}>
                      {apt.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#111827' }}>{apt.patient}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{apt.age}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={14} style={{ color: '#6b7280' }} />
                    <span>{apt.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                    <Clock size={12} />
                    <span>{apt.time}</span>
                  </div>
                </td>
                <td>{getTypeBadge(apt.type)}</td>
                <td>{getStatusBadge(apt.status)}</td>
                <td style={{ textAlign: 'right' }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: 4,
                  }}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
