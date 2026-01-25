import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import cncfData from '../../data/cncf-events.json';

interface Event {
  title: string;
  date: string;
  dateObj: Date;
  url: string;
  community: string;
  location: string;
  source: 'meetup' | 'luma' | 'cncf';
}

// Event sources we're tracking (auto-fetched via APIs)
const eventSources = [
  {
    name: 'HashiCorp User Group Bengaluru',
    type: 'meetup' as const,
    rssUrl: 'https://www.meetup.com/hug-bangalore/events/rss/',
    location: 'Bengaluru',
  },
  {
    name: 'Cloud Computing Circle (C3)',
    type: 'luma' as const,
    calendarId: 'cal-FyA57P0WETdwJVU', // From lu.ma/cloudevents
    location: 'Bengaluru',
  },
];

// CNCF events loaded from JSON file (auto-updated by GitHub Action)
const cncfEvents: Event[] = cncfData.events.map(event => ({
  title: event.title,
  date: event.displayDate,
  dateObj: new Date(event.date),
  url: event.url,
  community: event.community,
  location: event.location,
  source: 'cncf' as const,
}));

// CNCF Community Sources (for display)
const cncfSources = cncfData.sources;

export default function CommunityEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      // Start with CNCF events from JSON (auto-updated by GitHub Action)
      const allEvents: Event[] = [...cncfEvents];

      // Fetch Meetup events via RSS
      for (const source of eventSources.filter(s => s.type === 'meetup')) {
        try {
          const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.rssUrl!)}`
          );
          const data = await response.json();

          if (data.status === 'ok' && data.items) {
            const meetupEvents = data.items.slice(0, 2).map((item: any) => {
              const dateObj = new Date();
              dateObj.setDate(dateObj.getDate() + 14); // Placeholder for sorting
              return {
                title: item.title.replace(/&amp;/g, '&'),
                date: 'View event for date →',
                dateObj,
                url: item.link,
                community: source.name,
                location: source.location,
                source: 'meetup' as const,
              };
            });
            allEvents.push(...meetupEvents);
          }
        } catch (err) {
          console.error(`Failed to fetch Meetup events for ${source.name}:`, err);
        }
      }

      // Fetch Luma events via their API
      for (const source of eventSources.filter(s => s.type === 'luma')) {
        try {
          const response = await fetch(
            `https://api.lu.ma/calendar/get-items?calendar_api_id=${source.calendarId}`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.entries) {
              const lumaEvents = data.entries.slice(0, 3).map((entry: any) => {
                const event = entry.event;
                const dateObj = new Date(event.start_at);
                return {
                  title: event.name,
                  date: dateObj.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }),
                  dateObj,
                  url: `https://lu.ma/${event.url}`,
                  community: source.name,
                  location: event.geo_address_info?.city || source.location,
                  source: 'luma' as const,
                };
              });
              allEvents.push(...lumaEvents);
            }
          }
        } catch (err) {
          console.error(`Failed to fetch Luma events for ${source.name}:`, err);
        }
      }

      // Dedupe by URL, sort by date (upcoming first), and take top 6
      const seenUrls = new Set<string>();
      const uniqueEvents = allEvents.filter(e => {
        if (seenUrls.has(e.url)) return false;
        seenUrls.add(e.url);
        return e.dateObj >= new Date(Date.now() - 24 * 60 * 60 * 1000);
      });

      const sortedEvents = uniqueEvents
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
        .slice(0, 6);

      setEvents(sortedEvents);
      setLoading(false);
    };

    fetchAllEvents();
  }, []);

  const getSourceBadge = (source: Event['source']) => {
    switch (source) {
      case 'luma':
        return <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">Luma</span>;
      case 'meetup':
        return <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">Meetup</span>;
      case 'cncf':
        return <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">CNCF</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Upcoming Events */}
      {events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <motion.a
              key={`${event.source}-${event.url}`}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 transition-colors group shadow-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-blue-400 font-medium">{event.date}</div>
                {getSourceBadge(event.source)}
              </div>
              <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                {event.title}
              </h4>
              <div className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                <span>📍</span> {event.location}
              </div>
              <div className="text-xs text-slate-500 mt-1">{event.community}</div>
            </motion.a>
          ))}
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-slate-400">
          Loading upcoming events...
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          No upcoming events at the moment. Check back soon!
        </div>
      )}

      {/* CNCF Community Sources */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <p className="text-sm text-slate-500 mb-3">
          CNCF Communities I'm part of:
        </p>
        <div className="flex flex-wrap gap-2">
          {cncfSources.map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-full text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
            >
              {source.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
