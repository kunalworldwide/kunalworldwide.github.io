#!/usr/bin/env node

/**
 * CNCF Events Fetcher
 *
 * Scrapes upcoming events from CNCF community pages and updates cncf-events.json
 * Run via: node scripts/fetch-cncf-events.js
 *
 * Used by GitHub Action to auto-update events daily
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/cncf-events.json');

// CNCF communities to track
const CNCF_SOURCES = [
  { name: 'Cloud Native Kolkata', slug: 'cloud-native-kolkata' },
  { name: 'Cloud Native Mumbai', slug: 'cloud-native-mumbai' },
  { name: 'Cloud Native Hooghly', slug: 'cloud-native-hooghly' },
  { name: 'Cloud Native Bengaluru', slug: 'cloud-native-bangalore' },
];

/**
 * Fetch events from a CNCF community page
 * Uses Bevy's embedded JSON data in the page
 */
async function fetchCommunityEvents(slug, communityName) {
  const url = `https://community.cncf.io/${slug}/`;
  console.log(`Fetching events from ${communityName}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`  Failed to fetch ${url}: ${response.status}`);
      return [];
    }

    const html = await response.text();
    const events = [];

    // Try to extract events from the page
    // Bevy pages have event links in format: /events/details/cncf-{slug}-presents-{event-slug}/
    const eventPattern = new RegExp(
      `href="(https://community\\.cncf\\.io/events/details/cncf-${slug}-presents-[^"]+)"[^>]*>([^<]+)`,
      'gi'
    );

    // Also look for event data in JSON-LD or embedded scripts
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/gi);
    if (jsonLdMatch) {
      for (const match of jsonLdMatch) {
        try {
          const jsonStr = match.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
          const data = JSON.parse(jsonStr);
          if (data['@type'] === 'Event') {
            events.push({
              title: data.name,
              date: data.startDate?.split('T')[0],
              displayDate: formatDate(data.startDate),
              url: data.url,
              community: communityName,
              location: data.location?.address?.addressLocality || getLocationFromSlug(slug),
            });
          }
        } catch (e) {
          // Ignore JSON parse errors
        }
      }
    }

    // Fallback: Parse HTML for event cards
    // Look for upcoming events section
    const upcomingMatch = html.match(/upcoming[^{]*events/i);
    if (upcomingMatch) {
      let match;
      while ((match = eventPattern.exec(html)) !== null) {
        const eventUrl = match[1];
        const eventTitle = match[2].trim();

        // Skip if already added or if it's navigation text
        if (events.some(e => e.url === eventUrl) || eventTitle.length < 5) continue;

        events.push({
          title: decodeHTMLEntities(eventTitle),
          date: '', // Will need manual update or additional parsing
          displayDate: 'Check event page',
          url: eventUrl,
          community: communityName,
          location: getLocationFromSlug(slug),
        });
      }
    }

    console.log(`  Found ${events.length} events`);
    return events;
  } catch (error) {
    console.error(`  Error fetching ${communityName}:`, error.message);
    return [];
  }
}

/**
 * Alternative: Fetch from Bevy API (if accessible)
 */
async function fetchFromBevyAPI(slug) {
  // Bevy sometimes exposes events at these endpoints
  const endpoints = [
    `https://community.cncf.io/api/chapter/${slug}/events/`,
    `https://community.cncf.io/api/event/?chapter__slug=${slug}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      // Continue to next endpoint
    }
  }
  return null;
}

function getLocationFromSlug(slug) {
  const locations = {
    'cloud-native-kolkata': 'Kolkata',
    'cloud-native-mumbai': 'Mumbai',
    'cloud-native-hooghly': 'Kolkata Region',
    'cloud-native-bangalore': 'Bengaluru',
  };
  return locations[slug] || 'India';
}

function formatDate(isoDate) {
  if (!isoDate) return 'TBD';
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function decodeHTMLEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function main() {
  console.log('CNCF Events Fetcher\n');

  // Load existing data
  let existingData = { sources: [], events: [] };
  try {
    existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    console.log('No existing data file, creating new one.');
  }

  // Fetch events from all sources
  const allEvents = [];
  for (const source of CNCF_SOURCES) {
    const events = await fetchCommunityEvents(source.slug, source.name);
    allEvents.push(...events);
  }

  // Merge with existing events (keep manually added ones, update/add new ones)
  const existingUrls = new Set(existingData.events.map(e => e.url));
  const newUrls = new Set(allEvents.map(e => e.url));

  // Keep existing events that weren't found (might be manually added or past events we want to keep)
  const mergedEvents = [...existingData.events];

  // Add new events that don't exist
  for (const event of allEvents) {
    if (!existingUrls.has(event.url)) {
      mergedEvents.push(event);
      console.log(`  + Added: ${event.title}`);
    }
  }

  // Filter out past events (more than 1 day old)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const upcomingEvents = mergedEvents.filter(event => {
    if (!event.date) return true; // Keep events without dates
    const eventDate = new Date(event.date);
    return eventDate >= yesterday;
  });

  // Sort by date
  upcomingEvents.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Save updated data
  const outputData = {
    lastUpdated: new Date().toISOString(),
    sources: CNCF_SOURCES.map(s => ({
      name: s.name,
      slug: s.slug,
      url: `https://community.cncf.io/${s.slug}/`,
    })),
    events: upcomingEvents,
  };

  fs.writeFileSync(DATA_FILE, JSON.stringify(outputData, null, 2));
  console.log(`\nSaved ${upcomingEvents.length} events to ${DATA_FILE}`);

  // Check if there were changes
  const hasChanges = JSON.stringify(existingData.events) !== JSON.stringify(upcomingEvents);
  if (hasChanges) {
    console.log('Changes detected!');
    process.exit(0);
  } else {
    console.log('No changes detected.');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
