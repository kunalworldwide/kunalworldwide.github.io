import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function CalendlyButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Dismiss button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsDismissed(true)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
              aria-label="Dismiss"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main button */}
        <a
          href="https://calendly.com/kunalworldwide/quick-chat"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-3 bg-slate-800/90 backdrop-blur-sm border border-slate-700 hover:border-teal-500/50 rounded-full shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </span>

          {/* Icon */}
          <svg
            className="w-5 h-5 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          {/* Text - expands on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium text-slate-200 whitespace-nowrap overflow-hidden"
              >
                Schedule a chat
              </motion.span>
            )}
          </AnimatePresence>
        </a>
      </div>
    </motion.div>
  );
}
