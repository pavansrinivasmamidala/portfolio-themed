import { Github, Linkedin, Twitter, Instagram, Facebook, Mail, Phone, MapPin, Globe, Code2, Terminal, Database, Layout, Server, Cpu } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Pavan Srinivas Mamidala",
  role: "Full Stack Web Developer",
  bio: "From computer enthusiast to a skilled web architect, I've embarked on a journey to craft captivating, visually stunning, and user-centric websites by harnessing the power of cutting-edge technologies.",
  location: "Toronto, Canada",
  email: "chinni.mamidala@gmail.com",
  phone: "+1 (416)-(854)-(8046)",
  socials: [
    { name: "GitHub", icon: Github, url: "https://github.com" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
    { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
  ]
};

export const SKILLS = [
  { category: "Frontend", icon: Layout, items: ["React", "Angular", "Next.js", "Svelte", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript"] },
  { category: "Backend", icon: Server, items: ["Node.js", "Express", "Java", "PHP", "C#", "Python"] },
  { category: "DevOps & Tools", icon: Terminal, items: ["Docker", "Linux", "AWS", "Git", "Bash"] },
  { category: "Database", icon: Database, items: ["MongoDB", "SQL"] },
];

export const EXPERIENCE = [
  {
    company: "BMO Capital Markets",
    role: "UI Engineer",
    period: "2023 — Present",
    description: "Building high-performance internal compliance tools and optimizing enterprise React applications using Redux, AMPS, and OpenFin for the trading floor.",
    current: true
  },
  {
    company: "Bayxis Capital",
    role: "Full Stack Developer",
    period: "2022 — 2023",
    description: "Architected sophisticated investment dashboards using React, Python, and Retool to enhance fund management and data analysis.",
    current: false
  },
  {
    company: "KellyKinetix",
    role: "Web Development Intern",
    period: "2022",
    description: "Boosted website performance by 40% and resolved complex UI issues using React and Styled-Components.",
    current: false
  }
];

export const PROJECTS = [
  {
    title: "Type with Friends",
    description: "A Multiplayer typing game inspired by monkeytype.com (*currently working on it)",
    tech: ["HTML", "CSS", "Svelte", "Node JS", "Socket.io", "MongoDB"],
    links: [
      { name: "GitHub", url: "https://github.com/pavansrinivasmamidala/type-with-friends", icon: Github },
      { name: "Live Demo", url: "https://type-with-friends.vercel.app/", icon: Globe }
    ],
    image: "https://pavan-portfolio-updated.netlify.app/monkeytype.png",
    status: "In Progress"
  },
  {
    title: "Blog AI",
    description: "GPT-4 application to generate Blogs/Articles based on Title and Audience",
    tech: ["HTML", "Tailwind CSS", "Next JS"],
    links: [
      { name: "GitHub", url: "https://github.com/pavansrinivasmamidala/blog-ai", icon: Github },
      { name: "Live Demo", url: "https://blog-ai-seven.vercel.app", icon: Globe }
    ],
    image: "https://pavan-portfolio-updated.netlify.app/blog-ai.png",
    status: "Completed"
  },
  {
    title: "Travel Nest",
    description: "An Airbnb Clone built using React and Angular.",
    tech: ["HTML", "Tailwind", "TypeScript", "React", "Node Js", "MongoDB"],
    links: [
      { name: "GitHub", url: "https://github.com/pavansrinivasmamidala/seekers-frontend", icon: Github },
      { name: "Live Demo", url: "https://seekers-frontend.vercel.app/", icon: Globe }
    ],
    image: "https://pavan-portfolio-updated.netlify.app/travelnest.png",
    status: "Completed"
  },
  {
    title: "Flight Tracker",
    description: "An application to track flights based on real time data",
    tech: ["HTML", "CSS", "React JS"],
    links: [
      { name: "GitHub", url: "https://github.com/pavansrinivasmamidala/flight-tracker", icon: Github }
    ],
    image: "https://pavan-portfolio-updated.netlify.app/flighttracker.jpg",
    status: "Completed"
  },
  {
    title: "Spacestagram",
    description: "A space themed instagram clone built as a part of Shopify Internship challenge.",
    tech: ["HTML", "Tailwind CSS", "React JS"],
    links: [
      { name: "GitHub", url: "https://github.com/pavansrinivasmamidala/spacestagram", icon: Github },
      { name: "Live Demo", url: "https://spacestagram-lyart.vercel.app/", icon: Globe }
    ],
    image: "https://pavan-portfolio-updated.netlify.app/spacestagram.png",
    status: "Completed"
  }
];
