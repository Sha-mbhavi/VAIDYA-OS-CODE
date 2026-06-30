import { motion } from 'framer-motion';

export default function QuickActions({ actions }) {
  return (
    <div className="quick-actions">
      {actions.map((action, idx) => (
        <motion.a
          key={idx}
          href={action.href || '#'}
          className="action-btn"
          onClick={action.onClick}
          whileHover={{ y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <div className="action-icon">
            {typeof action.icon === 'string' ? action.icon : <action.icon size={20} />}
          </div>
          <div className="action-label">{action.label}</div>
        </motion.a>
      ))}
    </div>
  );
}
