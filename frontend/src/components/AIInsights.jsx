import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, AlertTriangle, Heart } from 'lucide-react';

export default function AIInsights() {
  const insights = [
    {
      id: 1,
      icon: AlertTriangle,
      title: 'High risk of hypertension detected',
      description: 'In 5 patients. Recommended: Lifestyle modification',
      time: '2h ago',
      severity: 'warning'
    },
    {
      id: 2,
      icon: TrendingUp,
      title: '3 patients showing improvement',
      description: 'in treatment. Progress rate: 85%',
      time: '5h ago',
      severity: 'success'
    },
    {
      id: 3,
      icon: Heart,
      title: 'New drug interaction alert',
      description: 'in 2 prescriptions. Review recommended',
      time: '1d ago',
      severity: 'danger'
    },
  ];

  const getInsightColor = (severity) => {
    const colors = {
      warning: { bg: '#f59e0b20', border: '#f59e0b40', text: '#b45309' },
      success: { bg: '#10b98120', border: '#10b98140', text: '#065f46' },
      danger: { bg: '#ef444420', border: '#ef444440', text: '#7f1d1d' },
      info: { bg: '#06b6d420', border: '#06b6d440', text: '#164e63' },
    };
    return colors[severity] || colors.info;
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3>🤖 AI Medical Insights</h3>
        <a href="#" style={{ color: '#3b82f6', fontSize: 14, fontWeight: 600 }}>View All Insights</a>
      </div>

      <div>
        {insights.map((insight, idx) => {
          const colors = getInsightColor(insight.severity);
          const IconComponent = insight.icon;

          return (
            <motion.div
              key={insight.id}
              className="insight-item"
              style={{
                background: colors.bg,
                borderColor: colors.border,
                borderLeftColor: colors.text,
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
            >
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  color: colors.text,
                  marginTop: 2,
                  flexShrink: 0,
                }}>
                  <IconComponent size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="insight-title" style={{ color: colors.text }}>
                    {insight.title}
                  </div>
                  <div className="insight-description">{insight.description}</div>
                  <div className="insight-time">{insight.time}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
