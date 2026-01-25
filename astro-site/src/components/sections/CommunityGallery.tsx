import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Community photos from public/community folder
const communityPhotos = [
  '/community/20250807_153913 Medium.jpeg',
  '/community/20250823_160659 Medium.jpeg',
  '/community/20250823_171218 Medium.jpeg',
  '/community/20250906_101953 Medium.jpeg',
  '/community/20250913_103314 Medium.jpeg',
  '/community/20251102_133834 Medium.jpeg',
  '/community/20251116_110243 Medium.jpeg',
  '/community/20251206_133443 Medium.jpeg',
  '/community/Copy of GDG Blr-563 Medium.jpeg',
  '/community/DSC01119 Medium.jpeg',
  '/community/IMG20251220161007 Medium.jpeg',
  '/community/WhatsApp Image 2025-11-22 at 18.56.33 Medium.jpeg',
  '/community/WhatsApp Image 2025-11-30 at 8.45.26 PM-3 Medium.jpeg',
];

// Frame styles for variety
const frameStyles = [
  'rotate-[-3deg]',
  'rotate-[2deg]',
  'rotate-[-2deg]',
  'rotate-[3deg]',
  'rotate-[-1deg]',
  'rotate-[1deg]',
];

const frameColors = [
  'from-teal-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-blue-500 to-indigo-500',
  'from-orange-500 to-amber-500',
  'from-emerald-500 to-green-500',
];

export default function CommunityGallery() {
  const [displayedPhotos, setDisplayedPhotos] = useState<string[]>([]);
  const [swapIndex, setSwapIndex] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Initialize with shuffled photos
  useEffect(() => {
    const shuffled = [...communityPhotos].sort(() => Math.random() - 0.5);
    setDisplayedPhotos(shuffled.slice(0, 8)); // Show 8 photos at a time
  }, []);

  // Periodically swap photos
  useEffect(() => {
    const interval = setInterval(() => {
      const indexToSwap = Math.floor(Math.random() * 8);
      setSwapIndex(indexToSwap);

      setTimeout(() => {
        setDisplayedPhotos((prev) => {
          const newPhotos = [...prev];
          // Find a photo not currently displayed
          const availablePhotos = communityPhotos.filter((p) => !prev.includes(p));
          if (availablePhotos.length > 0) {
            const randomNew = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
            newPhotos[indexToSwap] = randomNew;
          }
          return newPhotos;
        });
        setSwapIndex(null);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4"
          >
            Community Moments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Memories from <span className="gradient-text">Our Events</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Snapshots from meetups, conferences, and community gatherings across India
          </motion.p>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
          {displayedPhotos.map((photo, index) => (
            <motion.div
              key={`${photo}-${index}`}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{
                opacity: swapIndex === index ? 0 : 1,
                scale: swapIndex === index ? 0.8 : 1,
                rotate: 0,
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.2 },
              }}
              className={`relative cursor-pointer ${frameStyles[index % frameStyles.length]}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Polaroid-style frame */}
              <div className="bg-white p-2 pb-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
                {/* Gradient border effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-br ${frameColors[index % frameColors.length]} rounded-lg opacity-0 hover:opacity-50 transition-opacity blur-sm`}
                />

                {/* Image container */}
                <div className="relative aspect-square overflow-hidden rounded bg-slate-200">
                  <img
                    src={photo}
                    alt={`Community event ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="text-white text-sm font-medium">View</span>
                  </div>
                </div>

                {/* Tape decoration */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-yellow-200/80 rotate-[-2deg]"
                  style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }}
                />
              </div>

              {/* Floating animation for some frames */}
              {index % 3 === 0 && (
                <motion.div
                  className="absolute -z-10 inset-0"
                  animate={{
                    y: [0, -5, 0, 5, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Decorative scattered photos in background */}
        <div className="absolute -z-10 top-1/4 -left-20 w-24 h-24 opacity-20 rotate-12">
          <div className="bg-white p-1 rounded shadow-lg">
            <div className="aspect-square bg-slate-300 rounded" />
          </div>
        </div>
        <div className="absolute -z-10 bottom-1/4 -right-16 w-20 h-20 opacity-20 -rotate-12">
          <div className="bg-white p-1 rounded shadow-lg">
            <div className="aspect-square bg-slate-300 rounded" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large image in frame */}
              <div className="bg-white p-3 pb-12 rounded-lg shadow-2xl">
                <img
                  src={selectedPhoto}
                  alt="Community event"
                  className="max-h-[70vh] w-auto rounded"
                />
              </div>

              {/* Navigation hint */}
              <p className="text-center text-white/60 mt-4 text-sm">Click outside to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
