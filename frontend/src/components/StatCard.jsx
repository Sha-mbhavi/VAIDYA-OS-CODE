import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ label, value, change, positive, icon: Icon }) {
  return (
    <motion.div
      className="card"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="stat-card">
          <div className="stat-label">{label}</div>
          <div className="stat-value">{value}</div>
          {change && (
            <div className={`stat-change ${positive ? 'positive' : 'negative'}`}>
              {positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div style={{
            width: 48,
            height: 48,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3b82f6'
          }}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
