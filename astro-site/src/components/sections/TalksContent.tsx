import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TalksMap from './TalksMap';

interface Talk {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  venue: string;
  categories: string[];
  slides?: string;
  video?: string;
  event?: string;
}

interface TalksContentProps {
  talks: Talk[];
}

const ITEMS_PER_PAGE = 9;

export default function TalksContent({ talks }: TalksContentProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title'>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);

  // Get unique locations and categories
  const locations = useMemo(() => {
    const locs = [...new Set(talks.map(t => t.location))].sort();
    return ['all', ...locs];
  }, [talks]);

  const categories = useMemo(() => {
    const cats = [...new Set(talks.flatMap(t => t.categories))].sort();
    return ['all', ...cats];
  }, [talks]);

  // Filter and sort talks
  const filteredTalks = useMemo(() => {
    let result = [...talks];

    if (selectedLocation !== 'all') {
      result = result.filter(t => t.location === selectedLocation);
    }

    if (selectedCategory !== 'all') {
      result = result.filter(t => t.categories.includes(selectedCategory));
    }

    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [talks, selectedLocation, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredTalks.length / ITEMS_PER_PAGE);
  const paginatedTalks = filteredTalks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleFilterChange = (type: 'location' | 'category', value: string) => {
    setCurrentPage(1);
    if (type === 'location') setSelectedLocation(value);
    else setSelectedCategory(value);
  };

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* World Map */}
      <TalksMap talks={talks} onLocationClick={handleLocationClick} selectedLocation={selectedLocation} />

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-teal-500"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>
                {loc === 'all' ? 'All Locations' : loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-400 mb-2">Topic</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-teal-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Topics' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-400 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-teal-500"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-slate-400">
        Showing {paginatedTalks.length} of {filteredTalks.length} talks
        {selectedLocation !== 'all' && <span> in <span className="text-teal-400">{selectedLocation}</span></span>}
        {selectedCategory !== 'all' && <span> about <span className="text-purple-400">{selectedCategory}</span></span>}
      </div>

      {/* Talks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnimatePresence mode="popLayout">
          {paginatedTalks.map((talk, index) => (
            <motion.article
              key={talk.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden hover:border-teal-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedTalk(talk)}
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {talk.categories.slice(0, 2).map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs font-medium">
                      {cat}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg font-bold mb-3 text-white group-hover:text-teal-400 transition-colors line-clamp-2">
                  {talk.title}
                </h2>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {talk.description}
                </p>

                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{talk.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={talk.date}>
                      {new Date(talk.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>

                {/* Quick links */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
                  {talk.slides && (
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs">Slides</span>
                  )}
                  {talk.video && (
                    <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs">Video</span>
                  )}
                  {talk.event && (
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">Event</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-teal-500 transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-teal-500'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-teal-500 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Talk Detail Modal */}
      <AnimatePresence>
        {selectedTalk && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedTalk(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                {/* Close button */}
                <button
                  onClick={() => setSelectedTalk(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTalk.categories.map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm font-medium">
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {selectedTalk.title}
                </h2>

                {/* Description */}
                <p className="text-slate-300 text-lg mb-6">
                  {selectedTalk.description}
                </p>

                {/* Meta info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Location</p>
                      <p className="text-white font-medium">{selectedTalk.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Date</p>
                      <p className="text-white font-medium">
                        {new Date(selectedTalk.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Venue</p>
                      <p className="text-white font-medium">{selectedTalk.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  {selectedTalk.slides && (
                    <a
                      href={selectedTalk.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      View Slides
                    </a>
                  )}
                  {selectedTalk.video && (
                    <a
                      href={selectedTalk.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch Video
                    </a>
                  )}
                  {selectedTalk.event && (
                    <a
                      href={selectedTalk.event}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-600 text-slate-300 font-medium hover:border-teal-500 hover:text-teal-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Event Page
                    </a>
                  )}
                  <a
                    href={`/talks/${selectedTalk.id}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Full Details
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
