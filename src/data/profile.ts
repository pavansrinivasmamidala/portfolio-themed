export const PROFILE = {
  name: 'Pavan Srinivas Mamidala',
  shortName: 'Pavan Mamidala',
  role: 'Frontend Engineer',
  secondary: 'Application Security',
  location: 'Toronto, Canada',
  email: 'chinni.mamidala@gmail.com',
  status: 'Open to Frontend & AppSec roles',
  intro:
    'I build fast, accessible React interfaces — and I spend my evenings breaking web apps on Hack The Box. Knowing how attacks actually work makes me a better builder.',
  about: [
    'I started as the kid who took computers apart to see what was inside. That turned into a career building interfaces: trading-floor tools at BMO, investment dashboards at Bayxis, and a long list of side projects that people actually play with.',
    'Somewhere along the way I got curious about the other side. Why does an upload form let a .php5 file through? What happens when an internal admin tool trusts a file path from the browser? I started working through Hack The Box machines and writing up every one — not just how I got in, but why the bug existed and what the developer should have done instead.',
    'That second part is the point. I want to be the engineer on the team who ships UI quickly and also notices the missing output encoding in code review.',
  ],
};

export const LINKS = {
  github: 'https://github.com/pavansrinivasmamidala',
  htb: 'https://profile.hackthebox.com/profile/019e5d39-8f9e-7252-b1b9-f5e7f22caab5',
  email: `mailto:${PROFILE.email}`,
};

export const HTB_STATS = {
  handle: 'Heis3nberg',
  level: 36,
  rank: 'Skilled',
  xp: '16.7k',
};

export type Job = {
  company: string;
  role: string;
  period: string;
  points: string[];
  stack: string[];
  current?: boolean;
};

export const EXPERIENCE: Job[] = [
  {
    company: 'BMO Capital Markets',
    role: 'UI Engineer',
    period: '2023 — Present',
    current: true,
    points: [
      'Build and maintain internal compliance tools used on the trading floor.',
      'Optimize large enterprise React applications for real-time data, using Redux, AMPS, and OpenFin.',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'AMPS', 'OpenFin'],
  },
  {
    company: 'Bayxis Capital',
    role: 'Full Stack Developer',
    period: '2022 — 2023',
    points: [
      'Architected investment dashboards for fund management and data analysis.',
      'Worked across the stack with React on the front end, Python services, and Retool for internal tooling.',
    ],
    stack: ['React', 'Python', 'Retool'],
  },
  {
    company: 'KellyKinetix',
    role: 'Web Development Intern',
    period: '2022',
    points: [
      'Improved website performance by 40%.',
      'Resolved complex UI issues using React and styled-components.',
    ],
    stack: ['React', 'styled-components'],
  },
];

export const SKILLS: { group: string; accent: 'magenta' | 'cyan' | 'lime'; items: string[] }[] = [
  {
    group: 'Frontend',
    accent: 'magenta',
    items: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Angular', 'Svelte', 'Redux', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    group: 'Backend & Data',
    accent: 'cyan',
    items: ['Node.js', 'Express', 'Socket.io', 'Python', 'Java', 'PHP', 'C#', 'MongoDB', 'SQL'],
  },
  {
    group: 'Security',
    accent: 'lime',
    items: ['OWASP Top 10', 'Burp Suite', 'nmap', 'ffuf / gobuster', 'John / hashcat', 'Ghidra', 'Metasploit', 'Linux privilege escalation'],
  },
  {
    group: 'Tooling',
    accent: 'cyan',
    items: ['Git', 'Docker', 'Linux', 'Bash', 'AWS', 'Vite', 'Retool'],
  },
];

export type Project = {
  title: string;
  blurb: string;
  tech: string[];
  image: string;
  repo?: string;
  live?: string;
  status: 'Shipped' | 'In progress';
};

export const PROJECTS: Project[] = [
  {
    title: 'Type with Friends',
    blurb: 'A multiplayer typing race inspired by monkeytype — real-time rooms over WebSockets.',
    tech: ['Svelte', 'Node.js', 'Socket.io', 'MongoDB'],
    image: '/monkeytype.png',
    repo: 'https://github.com/pavansrinivasmamidala/type-with-friends',
    live: 'https://type-with-friends.vercel.app/',
    status: 'In progress',
  },
  {
    title: 'Blog AI',
    blurb: 'Generates blog posts and articles from a title and a target audience, using GPT-4.',
    tech: ['Next.js', 'Tailwind CSS', 'OpenAI'],
    image: '/blog-ai.png',
    repo: 'https://github.com/pavansrinivasmamidala/blog-ai',
    live: 'https://blog-ai-seven.vercel.app',
    status: 'Shipped',
  },
  {
    title: 'Travel Nest',
    blurb: 'An Airbnb-style stays app, with a React/TypeScript front end and a Node + MongoDB API.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    image: '/travelnest.png',
    repo: 'https://github.com/pavansrinivasmamidala/seekers-frontend',
    live: 'https://seekers-frontend.vercel.app/',
    status: 'Shipped',
  },
  {
    title: 'Spacestagram',
    blurb: 'A space-themed Instagram clone, built for the Shopify internship challenge.',
    tech: ['React', 'Tailwind CSS'],
    image: '/spacestagram.png',
    repo: 'https://github.com/pavansrinivasmamidala/spacestagram',
    live: 'https://spacestagram-lyart.vercel.app/',
    status: 'Shipped',
  },
  {
    title: 'Flight Tracker',
    blurb: 'Track a flight by its flight number, using real-time flight data.',
    tech: ['React', 'CSS'],
    image: '/flighttracker.jpg',
    repo: 'https://github.com/pavansrinivasmamidala/flight-tracker',
    status: 'Shipped',
  },
];
