import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
  author: string;
}

interface MediumPostsProps {
  limit?: number;
  showViewMore?: boolean;
}

export default function MediumPosts({ limit, showViewMore = false }: MediumPostsProps) {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<MediumPost | null>(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kunaldaskd&api_key=cqyi5gqvz1lx78fprpnqrdaugi9r0mzixemzw3zz&count=50'
        );
        const data = await response.json();

        if (data.status === 'ok') {
          const formattedPosts = data.items.map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            thumbnail: item.thumbnail || extractFirstImage(item.content) || '',
            description: stripHtml(item.description).slice(0, 200) + '...',
            content: item.content,
            categories: item.categories || [],
            author: item.author || 'Kunal Das',
          }));

          setPosts(limit ? formattedPosts.slice(0, limit) : formattedPosts);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (err) {
        setError('Failed to load Medium posts');
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, [limit]);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const extractFirstImage = (content: string) => {
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit || 6)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-slate-800 h-72 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || posts.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>Unable to load Medium posts. Visit my profile directly:</p>
        <a
          href="https://kunaldaskd.medium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 font-medium mt-2 inline-block"
        >
          @kunaldaskd on Medium →
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.article
            key={post.link}
            className="group rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden cursor-pointer card-hover shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedPost(post)}
            whileHover={{ y: -5 }}
          >
            {post.thumbnail && (
              <div className="aspect-video overflow-hidden bg-slate-700">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
                <span className="text-xs text-slate-400">{post.pubDate}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-2">
                {post.description}
              </p>
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.categories.slice(0, 3).map((cat) => (
                    <span key={cat} className="px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full text-xs font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                <span>Read article</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {showViewMore && (
        <div className="text-center mt-8">
          <a
            href="/posts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600 hover:border-blue-500 transition-colors font-medium text-slate-200 hover:text-blue-400"
          >
            View all posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="h-full bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      KD
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{selectedPost.author}</p>
                      <p className="text-xs text-slate-400">{selectedPost.pubDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedPost.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                      </svg>
                      Open in Medium
                    </a>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="p-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {/* Hero Image */}
                  {selectedPost.thumbnail && (
                    <div className="aspect-[21/9] overflow-hidden bg-slate-800">
                      <img
                        src={selectedPost.thumbnail}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="max-w-3xl mx-auto px-6 py-8">
                    {/* Categories */}
                    {selectedPost.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedPost.categories.map((cat) => (
                          <span key={cat} className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white">
                      {selectedPost.title}
                    </h1>

                    {/* Article Body */}
                    <div
                      className="medium-content"
                      dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                    />

                    {/* Footer CTA */}
                    <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center">
                      <h3 className="text-xl font-bold mb-2">Enjoyed this article?</h3>
                      <p className="opacity-90 mb-4">Follow me on Medium for more content like this</p>
                      <a
                        href={selectedPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-slate-100 transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                        </svg>
                        Read on Medium & Follow
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
