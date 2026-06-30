import { motion } from 'framer-motion';

export default function HealthOverview() {
  const categories = [
    { label: 'Healthy', value: 45, color: '#10b981' },
    { label: 'Diagnosed', value: 30, color: '#f59e0b' },
    { label: 'Under Treatment', value: 15, color: '#06b6d4' },
    { label: 'Critical', value: 10, color: '#ef4444' },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h3 style={{ marginBottom: 24 }}>Patient Health Overview</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {/* Pie Chart */}
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
            {categories.map((cat, idx) => {
              const offset = categories.slice(0, idx).reduce((sum, c) => sum + (c.value / total) * 100, 0);
              const percent = (cat.value / total) * 100;
              const circumference = 2 * Math.PI * 63;
              const strokeDashoffset = circumference - (percent / 100) * circumference;

              return (
                <motion.circle
                  key={idx}
                  cx="100"
                  cy="100"
                  r="63"
                  fill="none"
                  stroke={cat.color}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transformOrigin: '100px 100px',
                    transform: `rotate(${(offset / 100) * 360}deg)`,
                  }}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              );
            })}
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#001a4d' }}>1,248</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Patients</div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1 }}>
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
            >
              <div style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: cat.color,
              }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{cat.label}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{cat.value}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
