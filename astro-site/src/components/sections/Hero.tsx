import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Typewriter hook
function useTypewriter(text: string, speed: number = 100, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          startTyping();
        }, speed);
      } else {
        setIsComplete(true);
      }
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);

  return { displayText, isComplete };
}

const socialLinks = [
  { href: 'https://github.com/kunalworldwide', label: 'GitHub' },
  { href: 'https://twitter.com/kunald_official', label: 'Twitter' },
  { href: 'https://linkedin.com/in/kunaldaskd', label: 'LinkedIn' },
  { href: 'https://medium.com/@kunaldaskd', label: 'Medium' },
  { href: 'mailto:contactkunalmail.region943@passinbox.com', label: 'Email' },
];

// Floating background shapes
const floatingShapes = [
  { size: 300, x: '10%', y: '20%', duration: 20, delay: 0, color: 'from-teal-500/10 to-cyan-500/10' },
  { size: 200, x: '80%', y: '60%', duration: 25, delay: 2, color: 'from-violet-500/10 to-purple-500/10' },
  { size: 150, x: '70%', y: '10%', duration: 18, delay: 1, color: 'from-blue-500/10 to-indigo-500/10' },
  { size: 100, x: '20%', y: '70%', duration: 22, delay: 3, color: 'from-pink-500/10 to-rose-500/10' },
  { size: 80, x: '50%', y: '80%', duration: 15, delay: 0.5, color: 'from-teal-500/10 to-emerald-500/10' },
];

export default function Hero() {
  const { displayText: greeting, isComplete: greetingComplete } = useTypewriter("Hi, I'm", 80, 500);
  const { displayText: name, isComplete: nameComplete } = useTypewriter("Kunal Das", 100, 1100);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-teal-950" />
      <div className="absolute inset-0 animated-gradient opacity-20" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating background shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span
                className="inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Developer Advocate APAC
              </motion.span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 text-white">
                <span>{greeting}</span>
                {greetingComplete && ' '}
                <span className="gradient-text">{name}</span>
                {!nameComplete && (
                  <motion.span
                    className="inline-block w-1 h-12 sm:h-14 lg:h-16 xl:h-20 bg-teal-400 ml-1 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  />
                )}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Building the future of cloud infrastructure at{' '}
              <span className="text-teal-400 font-semibold">CAST AI</span>.
              <br className="hidden sm:block" />
              Cloud Native & Kubernetes Enthusiast.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href="/posts"
                className="px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-teal-500/25"
              >
                Read Blog
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold text-lg hover:bg-slate-700 transition-colors border border-slate-700 shadow-lg"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-md bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-teal-500/50"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Floating animation wrapper */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-teal-500 via-violet-500 to-cyan-500 opacity-20 blur-2xl animate-pulse" />

                {/* Rotating border */}
                <motion.div
                  className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-teal-500 via-violet-500 to-cyan-500 opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{ padding: '3px' }}
                />

                {/* Modern frame container */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  {/* Frame background */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700/50 shadow-2xl overflow-hidden">
                    {/* Inner gradient border */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/10 via-transparent to-violet-500/10" />

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-teal-500/50 rounded-tl-3xl" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-violet-500/50 rounded-tr-3xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-violet-500/50 rounded-bl-3xl" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-teal-500/50 rounded-br-3xl" />

                    {/* Image */}
                    <div className="absolute inset-3 rounded-2xl overflow-hidden">
                      <img
                        src="/profile_hq.png"
                        alt="Kunal Das"
                        className="w-full h-full object-cover"
                      />
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                    </div>
                  </div>

                  {/* Floating particles around frame */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-teal-400/60"
                      style={{
                        top: `${20 + i * 15}%`,
                        left: i % 2 === 0 ? '-8px' : 'auto',
                        right: i % 2 === 1 ? '-8px' : 'auto',
                      }}
                      animate={{
                        y: [0, -10, 0, 10, 0],
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Status badge */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-slate-300 font-medium">Available for speaking</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
