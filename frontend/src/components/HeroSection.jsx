import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <motion.div
      className="hero-section"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-content">
        <motion.div
          className="hero-greeting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Welcome back, Doctor! 👋
        </motion.div>
        <motion.div
          className="hero-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Your AI-powered medical assistant is ready to help you provide the best care for your patients.
        </motion.div>
        <motion.div
          className="hero-quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          "The best medicine is the one that treats not just the disease, but the patient." — Dr. William Osler
        </motion.div>
      </div>

      {/* Animated heartbeat indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          color: '#10b981',
          fontWeight: 600,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart size={18} fill="currentColor" />
        </motion.div>
        <span>System Online</span>
      </motion.div>
    </motion.div>
  );
}
