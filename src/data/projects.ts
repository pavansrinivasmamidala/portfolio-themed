export type WorkItem = {
  kind: 'fix' | 'decision';
  title: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  kind: string; // short category label
  year: string;
  blurb: string; // card text
  tech: string[];
  image?: string; // screenshot; otherwise a designed cover is drawn
  cover?: 'magenta' | 'cyan' | 'lime';
  live?: string;
  repo?: string;
  availability?: string; // shown when there is no public link
  ai?: { tool: string };
  detail?: {
    overview: string[];
    features: { title: string; text: string }[];
    stack: string[];
    work: WorkItem[];
  };
};

// ─── Recent: built with AI ───────────────────────────────────────────────

const RECENT: Project[] = [
  {
    slug: 'keyclash',
    title: 'Keyclash',
    kind: 'Multiplayer typing race',
    year: '2026',
    blurb:
      'A minimalist typing test you can race people on, with synced races, live opponent carets, invite-link rooms, and a server that re-checks every word before it ranks a score.',
    tech: ['JavaScript', 'Node.js', 'Express', 'Socket.io', 'Canvas'],
    image: '/keyclash.png',
    live: 'https://keyclash-kz6f.onrender.com',
    ai: { tool: 'Claude Code' },
    detail: {
      overview: [
        'Keyclash is a typing test that you can turn into a race. Practise solo, jump into a public quick race, or send friends an invite link to a private room. Everyone gets the same words on a synced clock and sees each other’s carets move through the text.',
        'It is deliberately small: a Node server, plain JavaScript in the browser, no build step, and one free Render instance.',
      ],
      features: [
        { title: 'Solo tests', text: 'Time, word-count and quote modes, with punctuation and number toggles, a smooth caret and a three-line scrolling window.' },
        { title: 'Races', text: 'A public quick race that starts 10 seconds after a second player joins, and private rooms with a 4-letter code and invite link.' },
        { title: 'Live opponents', text: 'Progress bars plus every opponent’s caret drawn inside your own text, after a synced 3.5-second countdown.' },
        { title: 'Results', text: 'wpm, accuracy, raw speed, consistency, a character breakdown, and a per-second chart you can hover.' },
        { title: 'Profile', text: 'Personal bests per mode, test history, a wpm trend chart and races won.' },
        { title: 'Settings', text: 'Eight themes, caret styles, focus mode, typing sounds, live stats and font size.' },
      ],
      stack: [
        'Node + Express + socket.io server that owns rooms, matchmaking, the race clock and scoring',
        'Vanilla JS front end; the word list and test generator are one module shared by server and browser',
        'Hand-written canvas line chart, so there are no charting dependencies',
        'Render free web service with a /health check',
      ],
      work: [
        { kind: 'decision', title: 'Don’t trust the client’s score', detail: 'The server keeps its own copy of the race text, re-checks every submitted word and computes wpm itself. Results above 350 wpm are flagged instead of ranked, and unfinished players in word races are marked DNF.' },
        { kind: 'fix', title: 'Verified the wpm maths', detail: 'Checked the formula against scripted input at 100 ms per key: expected 113.6 wpm, reported 113.63. Server and client wpm were also compared on timed races.' },
        { kind: 'fix', title: 'Phone keyboards', detail: 'Mobile keyboards that compose text broke naive key handling, so typing goes through a hidden input that diffs every change instead.' },
        { kind: 'decision', title: 'Keep scores comparable', detail: 'Tests default to the 200 most common words. A longer, rarer word list is optional for solo, labelled in results and kept out of personal bests. Races always use the common list.' },
        { kind: 'decision', title: 'Split it out', detail: 'It started as a mode inside Doodlebop. Once it was clearly its own product, I moved it into its own repo and its own deploy so the two ship independently.' },
      ],
    },
  },
  {
    slug: 'doodlebop',
    title: 'Doodlebop',
    kind: 'Multiplayer party game',
    year: '2026',
    blurb:
      'A mobile-first party game for up to 16 players: draw-and-guess plus Mafia, a word-bomb mode and a team word game, with group voice chat over WebRTC and a live admin panel.',
    tech: ['JavaScript', 'Node.js', 'Socket.io', 'WebRTC', 'Canvas'],
    image: '/doodlebop.png',
    live: 'https://doodlebop-5cyo.onrender.com',
    ai: { tool: 'Claude Code' },
    detail: {
      overview: [
        'Doodlebop started as a draw-and-guess game to play with friends on our phones and grew into a small party-game platform. It has six modes, voice chat, spectators, public matchmaking and an admin panel.',
        'Everything runs on one Node server on Render’s free tier. Changes go through pull requests, a test suite in CI, and an automatic deploy after merge.',
      ],
      features: [
        { title: 'Six game modes', text: 'Draw it, Describe it, Mix, Kaboom (a word bomb), Mafia (hidden roles with Doctor, Detective and Sheriff) and Clue Crew (two teams, captains, a 5×5 word grid).' },
        { title: 'Group voice chat', text: 'Opt-in WebRTC calls with speaking indicators, per-player volume from 0 to 200%, and mic volume with a live level meter.' },
        { title: 'Matchmaking', text: 'Game cards on the home page, invite-only rooms by default, and a Play! button that drops you into a public game.' },
        { title: 'Spectating', text: 'Watch a room, join its voice call and chat with other spectators without affecting the game.' },
        { title: 'Admin panel', text: 'A key-protected /admin view to watch every room live, fix scores, skip turns, kick players or close rooms.' },
        { title: 'Phone-first', text: 'Touch drawing without page scroll, a keyboard-aware layout, auto-rejoin after app switching, and installable as an app.' },
      ],
      stack: [
        'Node + Express + socket.io, with vanilla JS and canvas drawing synced to every player and late joiners',
        'WebRTC mesh voice with TURN support for strict networks',
        'A ~274k-word dictionary for Kaboom answers and Clue Crew clues',
        'GitHub Actions running 230+ tests on every PR; Render deploys after merge to main',
      ],
      work: [
        { kind: 'fix', title: 'Voting on phones was unusable', detail: 'With 12 players, every vote rebuilt the whole Mafia panel — 52 redraws in 3 seconds — which jumped the list to the top and replayed animations. Switched to in-place updates keyed by player, shrank cards so 12 fit on screen, and kept Skip always visible.' },
        { kind: 'fix', title: 'Vote spam flooded the chat', detail: 'Rapid vote flipping produced 160 chat lines in seconds. Added a rate limit (3 quick changes, then one every 2 s) and only announce a vote once it has settled.' },
        { kind: 'fix', title: 'Voice didn’t scale', detail: 'In a mesh every phone uploads once per player. Capped each link to mono Opus at 24 kbit/s with DTX and stopped muted players sending at all: a quiet link went from 13 kbit/s to about 1, a muted one to 0.' },
        { kind: 'fix', title: 'Closing loopholes', detail: 'Dead Mafia players could still talk to the living, so the server now moves them to a separate ghost voice room. Describe-it chat is limited to server-enforced answer buttons, and Clue Crew clues must be one real word so they can’t be glued together.' },
        { kind: 'decision', title: 'Saying no', detail: 'A sixth mode, Clue Rush, was built, merged and reverted the same day to keep the game list focused.' },
        { kind: 'decision', title: 'Shipping safely', detail: 'Set up CI to run the test suite on every pull request, with deploys to Render only after a merge to main.' },
      ],
    },
  },
  {
    slug: 'lumiere',
    title: 'Lumière',
    kind: 'AI French tutor',
    year: '2025 — 2026',
    blurb:
      'A French learning and TCF exam-prep app: adaptive quizzes, tap-to-translate stories, a PDF reader, and real-time voice conversation with an AI tutor.',
    tech: ['React', 'TypeScript', 'Express', 'Gemini', 'Supabase'],
    image: '/lumiere.png',
    repo: 'https://github.com/pavansrinivasmamidala/Lumi-re',
    ai: { tool: 'Google AI Studio' },
    detail: {
      overview: [
        'Lumière is a French learning and TCF exam-prep app. It follows a CEFR curriculum from A1 to B2 and mixes generated quizzes, reading, writing feedback and spoken practice.',
        'It started as a quiz generator in December 2025 and grew into nine sections over the next six months.',
      ],
      features: [
        { title: 'Learning path', text: 'A CEFR syllabus with AI-generated study guides (rules, exceptions, examples) and checkpoints that unlock as quiz scores improve.' },
        { title: 'Adaptive quizzes', text: 'Ten-question quizzes by topic, level and difficulty: multiple choice, fill in the blank, matching, and sentence translation with tu/vous variants accepted.' },
        { title: 'Stories', text: 'Short generated stories at your level, with tap-to-translate words from a contextual glossary.' },
        { title: 'Talk', text: 'Live voice conversation with adjustable pace and per-turn grammar scoring, plus TCF Task 2 and Task 3 speaking simulations.' },
        { title: 'Reader', text: 'Upload a PDF, translate paragraphs and click any word for an explanation in context.' },
        { title: 'Writing practice', text: 'Translation and freeform writing scored out of 10, with a mistake breakdown and better phrasings.' },
      ],
      stack: [
        'React 19 + TypeScript + Vite, with dark/light mode',
        'Express 5 server that proxies text and speech generation requests',
        'Gemini models picked per job: a fast model for quizzes and scoring, a larger one for vocabulary lists, plus TTS and Live audio',
        'Supabase for persistence, falling back to localStorage; pdf.js for documents',
      ],
      work: [
        { kind: 'decision', title: 'Works without the database', detail: 'Every save falls back to localStorage when Supabase is unavailable, and the footer shows whether you are in “Database Connected” or “Local Mode”.' },
        { kind: 'decision', title: 'Right model for the job', detail: 'High-volume calls like quiz generation and answer scoring use a fast, cheap model; the larger model only builds the 300-word vocabulary lists.' },
        { kind: 'decision', title: 'Practice that targets weak spots', detail: 'The app records grammar concepts I get wrong and feeds them back into new writing prompts.' },
        { kind: 'fix', title: 'Real-time audio plumbing', detail: 'Live conversation needs 16 kHz microphone capture and 24 kHz PCM playback to line up with the model’s audio streams.' },
      ],
    },
  },
  {
    slug: 'bearly-wait',
    title: 'Bearly Wait',
    kind: 'Party game show',
    year: '2026',
    blurb:
      'A bear-themed game show for a friend’s gender reveal party: run from a phone, shown on the TV, synced in real time, with an animated grand reveal.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Supabase', 'Gemini'],
    image: '/bearly-wait.png',
    availability: 'Private event app',
    ai: { tool: 'Google AI Studio' },
    detail: {
      overview: [
        'Bearly Wait was built for one night: a friend’s gender reveal party. The host runs the show from a phone while the TV shows the games, scores, timers and the final reveal.',
        'It had to be reliable live, in a room full of people, with no second chances.',
      ],
      features: [
        { title: 'Two synced screens', text: 'A phone-friendly host controller and a full-screen TV display, picked when the app opens.' },
        { title: 'Guess the Price', text: 'Two teams guess the price of baby products against a countdown, with reveal animations and scoring.' },
        { title: 'Word Scramble', text: 'Baby-themed and general scrambled words, with hints the host can toggle.' },
        { title: 'The grand reveal', text: 'A multi-step sequence of countdowns, teases, a drumroll and confetti, controlled from the host’s phone.' },
        { title: 'Lights and photos', text: 'On-screen ambient light effects, optional smart-light control to turn the room pink or blue, and a photo slideshow.' },
        { title: 'AI-made rounds', text: 'Gemini generates new products and puzzles on demand.' },
      ],
      stack: [
        'React 19 + TypeScript + Vite + Tailwind CSS, with Framer Motion and canvas-confetti',
        'Supabase realtime channels keeping the host and TV in sync, and Supabase storage for photos',
        'Gemini for generated rounds; a smart-light API for physical lighting',
      ],
      work: [
        { kind: 'fix', title: 'AI output you can’t rely on live', detail: 'Generated rounds sometimes failed or came back in the wrong shape. The Gemini service now parses defensively and falls back to built-in lists, so the show never stalls on a bad response.' },
        { kind: 'decision', title: 'Phone drives the TV', detail: 'State lives in Supabase and changes go over realtime channels, so the host can walk around the room while the TV follows.' },
        { kind: 'decision', title: 'Everything cued from one place', detail: 'Timers, sounds, lights and each reveal step are host-triggered, so the pace follows the room, not a script.' },
      ],
    },
  },
  {
    slug: 'baby-tracker',
    title: 'Baby Tracker',
    kind: 'Mobile PWA',
    year: '2026',
    blurb:
      'An installable app for logging a newborn’s feeds, diapers and appointments, with charts, reminders, and plain-English questions answered by AI.',
    tech: ['React', 'TypeScript', 'Firestore', 'PWA', 'Gemini'],
    image: '/baby-tracker.png',
    availability: 'Private family app',
    ai: { tool: 'Google AI Studio' },
    detail: {
      overview: [
        'A mobile-first app for the newborn days: log a feed or a diaper change in a couple of taps, see when the last one was, and keep appointments and care contacts in one place.',
        'It installs to the home screen. Because it holds records you can’t recreate, data safety mattered more than features.',
      ],
      features: [
        { title: 'Today', text: 'Last feed and last diaper at a glance, the latest entries, and quick buttons to log feeds (breast, bottle, formula, solids) and changes.' },
        { title: 'Care', text: 'Doctor appointments with calendar import/export and Google Calendar sync, plus a care-team contact list.' },
        { title: 'Stats', text: 'A 7-day feeding chart, diaper breakdown, and a sortable, filterable table of every record.' },
        { title: 'Ask AI', text: 'Ask questions about the logs in plain English, see the matching records, and export them to Excel.' },
        { title: 'Reminders', text: 'After-feed, fixed-interval or set-time reminders with notifications, vibration and an alarm.' },
        { title: 'Admin console', text: 'CSV import, free-text log import, backup restore and an audit log.' },
      ],
      stack: [
        'React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router 7',
        'Cloud Firestore, with an installable PWA and auto-updating service worker',
        'recharts, papaparse and ical.js; Gemini for questions and log parsing',
      ],
      work: [
        { kind: 'decision', title: 'Never lose a record', detail: 'Every save and delete is written to an audit log, and deleted records go to a backup collection that can be restored from the admin console.' },
        { kind: 'fix', title: 'Bringing old data across', detail: 'A CSV importer converts exports from another tracker, including epoch timestamps and differently named feed and diaper types.' },
        { kind: 'decision', title: 'Messy notes in, clean records out', detail: 'Free-form text logs can be pasted in and turned into structured feed and diaper records by Gemini.' },
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
    blurb: 'Generates blog posts and articles from a title and a target audience, using GPT-4.',
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
    blurb: 'An Airbnb-style stays app, with a React/TypeScript front end and a Node + MongoDB API.',
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
    blurb: 'A space-themed Instagram clone, built for the Shopify internship challenge.',
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
    blurb: 'Track a flight by its flight number, using real-time flight data.',
    tech: ['React', 'CSS'],
    image: '/flighttracker.jpg',
    repo: 'https://github.com/pavansrinivasmamidala/flight-tracker',
  },
];

export const PROJECT_GROUPS = [
  {
    id: 'recent',
    title: 'Recent',
    note: 'Built with AI pair-programming. I chose what to build and what to cut, tested it, debugged what broke and shipped it.',
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
