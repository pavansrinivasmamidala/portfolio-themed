export type Shot = { src: string; caption: string };

export type Project = {
  slug: string;
  title: string;
  kind: string; // short category label
  year: string;
  tagline: string; // one line, used on cards and at the top of the page
  tech: string[];
  image?: string; // cover image for cards; otherwise a designed cover is drawn
  cover?: 'magenta' | 'cyan' | 'lime';
  live?: string;
  repo?: string;
  availability?: string; // shown when there is no public link
  ai?: { tool: string };
  detail?: {
    phone?: boolean; // screenshots are phone-shaped
    shots: Shot[];
    highlights: string[];
    fixes: string[];
  };
};

// ─── Recent: built with AI ───────────────────────────────────────────────

const RECENT: Project[] = [
  {
    slug: 'keyclash',
    title: 'Keyclash',
    kind: 'Multiplayer typing race',
    year: '2026',
    tagline: 'A typing test you can race your friends on.',
    tech: ['JavaScript', 'Node.js', 'Socket.io', 'Canvas'],
    image: '/keyclash.png',
    live: 'https://keyclash-kz6f.onrender.com',
    ai: { tool: 'Claude Code' },
    detail: {
      shots: [
        { src: '/work/keyclash-1.jpg', caption: 'A live race: your bar, your friend’s bar, and their caret in your text.' },
        { src: '/work/keyclash-2.jpg', caption: 'Mid-test, with a typo in red.' },
        { src: '/work/keyclash-3.jpg', caption: 'Results with a per-second speed chart.' },
        { src: '/work/keyclash-4.jpg', caption: 'A private room, ready to race.' },
      ],
      highlights: [
        'Live races with everyone’s caret in your text',
        'Private rooms with a 4-letter invite code',
        'Results with a per-second speed chart',
        'The server re-checks every word, so scores are real',
      ],
      fixes: [
        'Phone keyboards broke key handling, so typing goes through a hidden input instead',
        'wpm is recomputed on the server; anything over 350 is flagged, not ranked',
        'Split out of Doodlebop into its own repo and deploy',
      ],
    },
  },
  {
    slug: 'doodlebop',
    title: 'Doodlebop',
    kind: 'Party games',
    year: '2026',
    tagline: '15 party games for up to 16 phones, with voice chat.',
    tech: ['JavaScript', 'Node.js', 'Socket.io', 'WebRTC', 'Canvas'],
    image: '/doodlebop.png',
    live: 'https://doodlebop.live',
    ai: { tool: 'Claude Code' },
    detail: {
      phone: true,
      shots: [
        { src: '/work/doodlebop-1.jpg', caption: 'Pick a game.' },
        { src: '/work/doodlebop-2.jpg', caption: 'Room settings and who’s in.' },
        { src: '/work/doodlebop-3.jpg', caption: 'Your turn to draw.' },
        { src: '/work/doodlebop-4.jpg', caption: 'A friend’s screen: guess the word.' },
      ],
      highlights: [
        'Draw it, Mafia, Poker, Ludo and 11 more',
        'Group voice chat in the browser',
        'Join from a link, no app to install',
        'A live admin panel to run rooms',
      ],
      fixes: [
        'Mafia voting redrew the whole panel 52 times in 3 seconds; now it updates in place',
        'Vote spam flooded chat with 160 lines; added a rate limit',
        'Voice for 16 phones: quiet players dropped from 13 kbit/s to about 1',
        'Dead players could still talk to the living; they now get a ghost voice room',
      ],
    },
  },
  {
    slug: 'lumiere',
    title: 'Lumière',
    kind: 'AI French tutor',
    year: '2025 — 2026',
    tagline: 'French practice and TCF exam prep, powered by AI.',
    tech: ['React', 'TypeScript', 'Express', 'Gemini', 'Supabase'],
    image: '/lumiere.png',
    repo: 'https://github.com/pavansrinivasmamidala/Lumi-re',
    ai: { tool: 'Google AI Studio' },
    detail: {
      shots: [
        { src: '/work/lumiere-1.jpg', caption: 'Pick your level, A1 to B2.' },
        { src: '/work/lumiere-2.jpg', caption: 'Spoken conversation practice and TCF speaking simulations.' },
        { src: '/work/lumiere-3.jpg', caption: 'Le ou la? Gender flashcards with spaced repetition.' },
        { src: '/work/lumiere-4.jpg', caption: '300 words per level in the vocabulary explorer.' },
      ],
      highlights: [
        'Adaptive quizzes from A1 to B2',
        'Talk out loud with an AI tutor',
        'Gender and preposition drills',
        'Read any PDF with tap-to-translate',
      ],
      fixes: [
        'Keeps working when the database is down by saving locally',
        'A cheap, fast model for quizzes; the big one only for vocab lists',
        'Feeds your weak grammar spots back into practice',
      ],
    },
  },
  {
    slug: 'bearly-wait',
    title: 'Bearly Wait',
    kind: 'Party game show',
    year: '2026',
    tagline: 'A bear-themed game show for a friend’s gender reveal.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Supabase'],
    image: '/bearly-wait.png',
    availability: 'Private event app',
    ai: { tool: 'Google AI Studio' },
    detail: {
      shots: [
        { src: '/work/bearly-wait-1.jpg', caption: 'The TV screen, waiting for the host.' },
        { src: '/work/bearly-wait-2.jpg', caption: 'Host phone: run the round and keep score.' },
        { src: '/work/bearly-wait-3.jpg', caption: 'The grand reveal, cued step by step.' },
        { src: '/work/bearly-wait-4.jpg', caption: 'Timers for every round.' },
      ],
      highlights: [
        'The host runs it from a phone; the TV follows live',
        'Guess the Price and Word Scramble rounds',
        'A staged reveal with countdowns and confetti',
        'Pink and blue light effects on the big screen',
      ],
      fixes: [
        'AI-made rounds could fail mid-party, so it falls back to built-in lists',
        'Everything is cued from the phone, so the pace follows the room',
      ],
    },
  },
  {
    slug: 'baby-tracker',
    title: 'Baby Tracker',
    kind: 'Mobile app',
    year: '2026',
    tagline: 'Log feeds, diapers and doctor visits in two taps.',
    tech: ['React', 'TypeScript', 'Firestore', 'PWA'],
    image: '/baby-tracker.png',
    availability: 'Private family app',
    ai: { tool: 'Google AI Studio' },
    detail: {
      shots: [{ src: '/baby-tracker.png', caption: 'Today: the last feed and the last diaper at a glance.' }],
      highlights: [
        'Installs to the home screen',
        'Charts, reminders and calendar sync',
        'Ask questions about the logs in plain English',
        'Every change is logged; deleted records can be restored',
      ],
      fixes: [
        'An audit log and a backup collection, so a bad tap can be undone',
        'Imports old CSV exports from another tracker',
        'Turns messy pasted notes into clean records',
      ],
    },
  },
];

// ─── Earlier: hand-coded ─────────────────────────────────────────────────

const EARLIER: Project[] = [
  {
    slug: 'blog-ai',
    title: 'Blog AI',
    kind: 'AI writing tool',
    year: '2023',
    tagline: 'Writes a blog post from a title and an audience.',
    tech: ['Next.js', 'Tailwind CSS', 'OpenAI'],
    image: '/blog-ai.png',
    repo: 'https://github.com/pavansrinivasmamidala/blog-ai',
    live: 'https://blog-ai-seven.vercel.app',
  },
  {
    slug: 'travel-nest',
    title: 'Travel Nest',
    kind: 'Booking app',
    year: '2023',
    tagline: 'An Airbnb-style stays app.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    image: '/travelnest.png',
    repo: 'https://github.com/pavansrinivasmamidala/seekers-frontend',
    live: 'https://seekers-frontend.vercel.app/',
  },
  {
    slug: 'spacestagram',
    title: 'Spacestagram',
    kind: 'Image feed',
    year: '2022',
    tagline: 'A space-themed Instagram, for the Shopify challenge.',
    tech: ['React', 'Tailwind CSS'],
    image: '/spacestagram.png',
    repo: 'https://github.com/pavansrinivasmamidala/spacestagram',
    live: 'https://spacestagram-lyart.vercel.app/',
  },
  {
    slug: 'flight-tracker',
    title: 'Flight Tracker',
    kind: 'Data app',
    year: '2022',
    tagline: 'Track any flight by its number.',
    tech: ['React', 'CSS'],
    image: '/flighttracker.jpg',
    repo: 'https://github.com/pavansrinivasmamidala/flight-tracker',
  },
];

export const PROJECT_GROUPS = [
  {
    id: 'recent',
    title: 'Recent',
    note: 'Built with AI. I picked what to build, tested it, and fixed what broke.',
    items: RECENT,
  },
  {
    id: 'earlier',
    title: 'Earlier',
    note: 'Written by hand.',
    items: EARLIER,
  },
];

export const PROJECTS = [...RECENT, ...EARLIER];
export const DETAILED = PROJECTS.filter((p) => p.detail);
export const getProject = (slug: string) => DETAILED.find((p) => p.slug === slug);
