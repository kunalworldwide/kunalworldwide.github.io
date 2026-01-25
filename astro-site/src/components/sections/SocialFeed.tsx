import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Tweet {
  title: string;
  link: string;
  pubDate: string;
  content: string;
}

interface SocialFeedProps {
  twitterHandle?: string;
  twitterRssFeed?: string;
  linkedinWidgetId?: string;
}

export default function SocialFeed({
  twitterHandle = 'kunald_official',
  twitterRssFeed = 'https://rss.app/feeds/J7oevvf9aNIe1O4l.xml',
  linkedinWidgetId = '25647453',
}: SocialFeedProps) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [tweetsLoading, setTweetsLoading] = useState(true);
  const [tweetsError, setTweetsError] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(twitterRssFeed)}`
        );
        const data = await response.json();

        if (data.status === 'ok' && data.items) {
          const parsedTweets = data.items.slice(0, 5).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            content: item.content || item.description || '',
          }));
          setTweets(parsedTweets);
        } else {
          setTweetsError(true);
        }
      } catch (error) {
        console.error('Failed to fetch tweets:', error);
        setTweetsError(true);
      } finally {
        setTweetsLoading(false);
      }
    };

    fetchTweets();
  }, [twitterRssFeed]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Latest <span className="gradient-text">Updates</span>
          </h2>
          <p className="text-lg text-slate-300">
            Follow me on social media for the latest content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Twitter/X Feed */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Header with gradient accent */}
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-700 via-teal-500 to-slate-700" />
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">X / Twitter</h3>
                    <p className="text-sm text-teal-400">@{twitterHandle}</p>
                  </div>
                </div>
                <a
                  href={`https://twitter.com/${twitterHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-teal-500/20"
                >
                  Follow
                </a>
              </div>
            </div>

            {/* Tweet list */}
            <div className="h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {tweetsLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-teal-500 animate-spin mb-4" />
                  <p className="text-slate-400">Loading tweets...</p>
                </div>
              )}

              {tweetsError && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2">Could not load tweets</h4>
                  <a
                    href={`https://twitter.com/${twitterHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    View on X →
                  </a>
                </div>
              )}

              {!tweetsLoading && !tweetsError && tweets.length > 0 && (
                <div className="p-2">
                  {tweets.map((tweet, index) => (
                    <motion.a
                      key={index}
                      href={tweet.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl hover:bg-slate-700/30 transition-all group mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-full gradient-bg p-0.5">
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">KD</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-white text-sm group-hover:text-teal-400 transition-colors">Kunal Das</span>
                            <span className="text-slate-500 text-sm">@{twitterHandle}</span>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-500 text-sm">{formatDate(tweet.pubDate)}</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors">
                            {stripHtml(tweet.content || tweet.title)}
                          </p>

                          {/* Engagement hint */}
                          <div className="flex items-center gap-4 mt-3 text-slate-500">
                            <span className="flex items-center gap-1.5 text-xs hover:text-teal-400 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              Reply
                            </span>
                            <span className="flex items-center gap-1.5 text-xs hover:text-green-400 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Repost
                            </span>
                            <span className="flex items-center gap-1.5 text-xs hover:text-pink-400 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              Like
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
              <a
                href={`https://twitter.com/${twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-teal-400 hover:text-teal-300 font-medium text-sm transition-colors"
              >
                View more on X
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* LinkedIn Feed */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Header with gradient accent */}
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-700 via-blue-500 to-slate-700" />
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">LinkedIn</h3>
                    <p className="text-sm text-blue-400">Kunal Das</p>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/kunaldaskd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
                >
                  Connect
                </a>
              </div>
            </div>

            {/* LinkedIn Widget */}
            <div className="h-[480px] bg-slate-900/50">
              <iframe
                src={`https://widgets.sociablekit.com/linkedin-profile-posts/iframe/${linkedinWidgetId}`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="LinkedIn Posts"
                loading="lazy"
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
              <a
                href="https://linkedin.com/in/kunaldaskd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
              >
                View LinkedIn Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
