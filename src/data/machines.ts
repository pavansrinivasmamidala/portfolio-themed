// Case studies written from my Hack The Box notes. All machines are retired.
// Deliberately high-level: what was wrong, why, and how a developer fixes it.
// No credentials, flags, IP addresses, or exploit payloads are published here.

export type Phase = 'Recon' | 'Foothold' | 'User' | 'Root';

export type Machine = {
  slug: string;
  name: string;
  os: 'Linux' | 'FreeBSD' | 'Windows';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solved: string; // YYYY-MM
  owned: { user: boolean; root: boolean };
  cves: string[];
  classes: string[]; // vulnerability classes
  summary: string;
  chain: { phase: Phase; title: string; detail: string }[];
  rootCause: string[];
  fixes: string[];
  takeaway: string;
};

export const MACHINES: Machine[] = [
  {
    slug: 'sightless',
    name: 'Sightless',
    os: 'Linux',
    difficulty: 'Easy',
    solved: '2024-11',
    owned: { user: true, root: true },
    cves: ['CVE-2022-0944'],
    classes: ['Template injection', 'Password reuse', 'Exposed debug interface', 'Insecure admin config'],
    summary:
      'A public SQLPad instance with a template-injection flaw led into a container, reused passwords led out of it, and an exposed browser debugging port leaked the admin login for a hosting panel that could run commands as root.',
    chain: [
      { phase: 'Recon', title: 'Found SQLPad on a subdomain', detail: 'The marketing site linked to a SQLPad instance on its own virtual host, running a version older than 6.10.0.' },
      { phase: 'Foothold', title: 'Template injection to code execution', detail: 'SQLPad rendered user-controlled connection fields through a template engine without sandboxing (CVE-2022-0944), which gave command execution inside its Docker container.' },
      { phase: 'User', title: 'Weak hashes, reused on the host', detail: 'The container’s password hashes cracked against a common wordlist, and one of them was also the SSH password for a real user on the host.' },
      { phase: 'Root', title: 'Debug port → panel admin → root', detail: 'A headless Chrome running an automated login had remote debugging enabled. Attaching DevTools through an SSH tunnel exposed the Froxlor admin password as it was typed. Froxlor let admins set an arbitrary PHP-FPM restart command, which a root cron job then executed.' },
    ],
    rootCause: [
      'Untrusted input reached a template engine with access to Node internals.',
      'The same password was used inside the container and on the host.',
      'Chrome remote debugging was left on in an environment other users could reach.',
      'A web admin panel stored shell commands that a root process ran without validation.',
    ],
    fixes: [
      'Patch SQLPad (≥ 6.10.1) and never render user input as a template.',
      'Unique credentials per environment; treat container secrets as compromised if the container is.',
      'Never ship --remote-debugging-port outside local development.',
      'Admin “command” fields should be an allowlist of actions, not free text a root job executes.',
    ],
    takeaway: 'Each step alone was a medium-severity bug. Chained, they were a full compromise. Severity depends on the chain, not on any single finding.',
  },
  {
    slug: 'sea',
    name: 'Sea',
    os: 'Linux',
    difficulty: 'Easy',
    solved: '2024-11',
    owned: { user: true, root: true },
    cves: ['CVE-2023-41425'],
    classes: ['Cross-site scripting', 'CSRF', 'Weak password', 'Command injection'],
    summary:
      'A contact form whose links an admin actually visited turned an XSS bug in WonderCMS into code execution. An internal monitoring tool then trusted a file path from the browser and passed it to a shell running as root.',
    chain: [
      { phase: 'Recon', title: 'Fingerprinted the CMS from a theme folder', detail: 'Most paths were forbidden, but fuzzing inside the theme directory exposed version and license files that identified WonderCMS 3.2.0.' },
      { phase: 'Foothold', title: 'Stored XSS into an admin session', detail: 'WonderCMS 3.2.0 has an XSS bug (CVE-2023-41425) that can make an admin’s browser install a module from a URL. A “website” field on the contact form was visited by a bot running as the admin, which delivered the link.' },
      { phase: 'User', title: 'Cracked a bcrypt hash from the CMS config', detail: 'The site’s JSON database held a bcrypt hash. After un-escaping it, it cracked against a wordlist and worked as a local user’s SSH password.' },
      { phase: 'Root', title: 'Internal tool trusting a client-side path', detail: 'An internal log viewer bound to localhost accepted the log file path as a POST parameter and passed it to a shell command running as root, so both arbitrary file reads and command injection were possible.' },
    ],
    rootCause: [
      'User-supplied content was rendered in an admin context without output encoding.',
      'Privileged actions (installing a module) had no CSRF protection or confirmation step.',
      'An internal service was assumed to be safe because it was “only on localhost”.',
      'A file path from the client was concatenated into a shell command.',
    ],
    fixes: [
      'Contextual output encoding plus a strict Content-Security-Policy on admin pages.',
      'CSRF tokens and re-authentication for anything that installs or executes code.',
      'Map the user’s choice to a server-side allowlist of log files, never a raw path.',
      'Use execFile-style APIs with argument arrays, never shell string interpolation.',
    ],
    takeaway: 'This one cost me hours in a polkit rabbit hole before I listed local ports. Now I enumerate internal services first, because “internal only” usually means nobody threat-modelled it.',
  },
  {
    slug: 'chemistry',
    name: 'Chemistry',
    os: 'Linux',
    difficulty: 'Easy',
    solved: '2024-11',
    owned: { user: true, root: true },
    cves: ['CVE-2024-23346', 'CVE-2024-23334'],
    classes: ['Unsafe deserialization / eval', 'Weak password hashing', 'Path traversal'],
    summary:
      'A Flask app that parsed uploaded crystallography (CIF) files with a vulnerable library gave code execution. An unsalted MD5 password database led to a user, and an internal aiohttp service with a path-traversal bug exposed root’s files.',
    chain: [
      { phase: 'Recon', title: 'File-upload feature on a Flask app', detail: 'Port 5000 served a Werkzeug app that let registered users upload CIF files and view the parsed structure.' },
      { phase: 'Foothold', title: 'Parser evaluates attacker-controlled data', detail: 'The pymatgen CIF parser passed part of the file to Python’s eval (CVE-2024-23346). I confirmed blind execution first by watching for ICMP traffic, then switched to a shell that the box’s restricted environment allowed.' },
      { phase: 'User', title: 'Unsalted MD5 in the app database', detail: 'The app’s SQLite database stored unsalted MD5 hashes. One cracked instantly and was a system user’s SSH password.' },
      { phase: 'Root', title: 'Path traversal in an internal service', detail: 'Port-forwarding a localhost-only service (and learning that the tunnel target must be 127.0.0.1, not the public IP) revealed aiohttp 3.9.1. Its static-file route followed symlinks and allowed path traversal (CVE-2024-23334), so it served files outside its web root as root.' },
    ],
    rootCause: [
      'A parsing library used eval on untrusted file content.',
      'Passwords were stored as fast, unsalted hashes.',
      'A static file route was configured with follow_symlinks and ran as root.',
    ],
    fixes: [
      'Upgrade pymatgen and parse untrusted files in a sandboxed, low-privilege worker.',
      'Use Argon2id or bcrypt with per-user salts.',
      'Upgrade aiohttp (≥ 3.9.2), leave follow_symlinks off, and never run web services as root.',
    ],
    takeaway: 'When a reverse shell won’t connect, prove execution with something boring like ping. Separating “is it executing?” from “is my payload working?” saved this box.',
  },
  {
    slug: 'linkvortex',
    name: 'LinkVortex',
    os: 'Linux',
    difficulty: 'Easy',
    solved: '2025-02',
    owned: { user: true, root: true },
    cves: ['CVE-2023-40028'],
    classes: ['Exposed .git directory', 'Secrets in source control', 'Arbitrary file read', 'Symlink validation bypass'],
    summary:
      'A dev subdomain served its .git folder, which leaked a Ghost admin password. Ghost’s file-read bug exposed config secrets, and a root cleanup script that checked symlinks only one level deep could be bypassed with a chained link.',
    chain: [
      { phase: 'Recon', title: 'A .git directory on the web root', detail: 'A development subdomain exposed its .git folder. Dumping it and restoring the working tree showed a staged change containing a hard-coded admin password.' },
      { phase: 'Foothold', title: 'Ghost arbitrary file read', detail: 'With admin access, Ghost 5.58 allowed uploading archives containing symlinks that were then served back (CVE-2023-40028), turning it into an arbitrary file read.' },
      { phase: 'User', title: 'Secrets in a config file', detail: 'Reading the Ghost production config exposed mail credentials that were reused for SSH.' },
      { phase: 'Root', title: 'One-level symlink check', detail: 'A sudo-allowed cleanup script rejected symlinks pointing at sensitive paths, but only looked at the first link. A link that pointed to another link passed the check and was then read as root.' },
    ],
    rootCause: [
      'Deployment copied the .git folder into a publicly served directory.',
      'Credentials were committed to source control.',
      'Uploaded archives were extracted without stripping symlinks.',
      'Path validation inspected the immediate symlink target instead of the fully resolved path.',
    ],
    fixes: [
      'Deny dotfiles at the web server and deploy build artifacts, not repositories.',
      'Secret scanning in CI, and rotate anything that was ever committed.',
      'Reject or strip symlinks when extracting user archives.',
      'Validate realpath() — the fully resolved path — against an allowlist, after resolution.',
    ],
    takeaway: 'Validating a path before resolving it is the same bug as validating HTML before decoding it. Canonicalize first, then check.',
  },
  {
    slug: 'node',
    name: 'Node',
    os: 'Linux',
    difficulty: 'Medium',
    solved: '2024-11',
    owned: { user: true, root: true },
    cves: [],
    classes: ['Excessive data exposure', 'Weak password hashing', 'Hard-coded secrets', 'Unsafe job queue', 'Denylist filtering'],
    summary:
      'An Express API returned every user’s password hash to anyone who asked. From there: a downloadable backup with the app’s source, database credentials in that source, a job scheduler that ran whatever was in a collection, and a root SUID backup binary with a bypassable path filter.',
    chain: [
      { phase: 'Recon', title: 'Reading the SPA to find the API', detail: 'The AngularJS controllers shipped to the browser listed every API route, including user endpoints the UI never called directly.' },
      { phase: 'Foothold', title: 'API leaked password hashes', detail: 'The users endpoint returned full user objects — hashes and admin flags included. The unsalted SHA-256 hashes cracked, which gave admin access and a downloadable site backup.' },
      { phase: 'User', title: 'Secrets in source → scheduler abuse', detail: 'The backup (an encoded, password-protected archive I also cracked) contained a MongoDB connection string whose password was reused for SSH. Another user ran a scheduler that executed any task document inserted into the database.' },
      { phase: 'Root', title: 'SUID backup binary', detail: 'I reversed the root-owned backup binary in Ghidra. It blocked sensitive paths with a denylist, which a relative path from the filesystem root got around. (The intended route is a buffer overflow in the same binary, which I went back and studied afterwards.)' },
    ],
    rootCause: [
      'API responses serialized whole database documents instead of a response shape.',
      'Unsalted SHA-256 for passwords.',
      'Database credentials hard-coded in the application source.',
      'A scheduler executed arbitrary command strings from a shared data store.',
      'A denylist of “bad” path fragments instead of an allowlist of good ones.',
    ],
    fixes: [
      'Explicit response DTOs; never return password fields from any endpoint.',
      'Argon2id or bcrypt, and rate-limit authentication.',
      'Load secrets from the environment or a secret manager; never reuse them as login passwords.',
      'Job queues should name predefined jobs, not carry shell commands.',
      'Allowlist inputs, and build privileged binaries with modern protections — or don’t make them SUID.',
    ],
    takeaway: 'This was the first box where I had to read a frontend bundle to attack an API. As a frontend engineer, I now assume everything shipped to the browser is public documentation.',
  },
  {
    slug: 'october',
    name: 'October',
    os: 'Linux',
    difficulty: 'Medium',
    solved: '2024-12',
    owned: { user: true, root: true },
    cves: [],
    classes: ['Default credentials', 'Upload filter bypass', 'Stack buffer overflow'],
    summary:
      'Default admin credentials on October CMS plus an extension denylist that forgot .php5 gave a shell. Root came from a stack overflow in a SUID binary, exploited with ret2libc while working around ASLR on a 32-bit system.',
    chain: [
      { phase: 'Recon', title: 'October CMS backend', detail: 'The CMS admin panel was exposed and still accepted the installer’s default credentials.' },
      { phase: 'Foothold', title: 'Denylist upload filter', detail: 'The media manager blocked .php but not other extensions that the server would still execute as PHP.' },
      { phase: 'Root', title: 'ret2libc against ASLR', detail: 'A SUID binary copied input into a 112-byte stack buffer without bounds checking. NX was on, so I returned into libc instead of the stack. ASLR on 32-bit only randomizes a few bits of the libc base, so repeating the attempt with one fixed guess eventually lined up.' },
    ],
    rootCause: [
      'Default credentials left in place after installation.',
      'Upload validation used a denylist of extensions.',
      'An unsafe copy into a fixed-size buffer in a privileged binary.',
      'A 32-bit build, where ASLR has too little entropy to stop brute force.',
    ],
    fixes: [
      'Force a credential change on first login.',
      'Allowlist upload types, store uploads outside the web root, and serve them with a fixed content type.',
      'Use bounded copies; compile with stack canaries, PIE, and full RELRO; drop the SUID bit.',
      'Ship 64-bit builds.',
    ],
    takeaway: 'Node and October are where I stopped treating binaries as black boxes. I learned enough assembly and Ghidra to follow the overflow end to end.',
  },
  {
    slug: 'valentine',
    name: 'Valentine',
    os: 'Linux',
    difficulty: 'Easy',
    solved: '2024-12',
    owned: { user: true, root: true },
    cves: ['CVE-2014-0160'],
    classes: ['Memory disclosure (Heartbleed)', 'Sensitive file exposure', 'Insecure IPC permissions'],
    summary:
      'The site’s artwork was a bleeding heart, and the server really was vulnerable to Heartbleed. Leaked memory held the passphrase for an encrypted SSH key that was sitting in a public directory. A root tmux session with a reachable socket finished it.',
    chain: [
      { phase: 'Recon', title: 'An outdated OpenSSL', detail: 'The HTTPS service ran an OpenSSL version vulnerable to Heartbleed (CVE-2014-0160).' },
      { phase: 'Foothold', title: 'Reading server memory', detail: 'Heartbleed responses leaked chunks of process memory, including a recently submitted value that turned out to be a key passphrase.' },
      { phase: 'User', title: 'Encrypted key in a public folder', detail: 'A hex-encoded, passphrase-protected RSA private key was browsable on the web server. With the leaked passphrase it decrypted and worked for SSH (after allowing the legacy key type on my client).' },
      { phase: 'Root', title: 'Attaching to root’s tmux', detail: 'Root had a tmux session whose socket was accessible to my user, so attaching to it gave a root shell.' },
    ],
    rootCause: [
      'Unpatched OpenSSL.',
      'A private key published under the web root.',
      'A privileged terminal session with loose socket permissions.',
    ],
    fixes: [
      'Patch TLS libraries and rotate keys and certificates after any memory-disclosure bug.',
      'Never store keys anywhere a web server can serve.',
      'Keep privileged multiplexer sockets in 0700 directories owned by root.',
    ],
    takeaway: 'Old bug, still instructive: a memory disclosure means every secret that passed through that process is compromised, not just the one you noticed.',
  },
  {
    slug: 'nibbles',
    name: 'Nibbles',
    os: 'Linux',
    difficulty: 'Easy',
    solved: '2024-11',
    owned: { user: true, root: true },
    cves: ['CVE-2015-6967'],
    classes: ['Information leak in HTML', 'Weak credentials', 'Unrestricted file upload', 'Writable sudo script'],
    summary:
      'An HTML comment pointed to a hidden Nibbleblog install. A guessable admin password and an image plugin that accepted PHP files gave a shell, and a user-writable script allowed under sudo gave root.',
    chain: [
      { phase: 'Recon', title: 'A comment in the page source', detail: 'The homepage HTML contained a developer comment naming the hidden blog directory.' },
      { phase: 'Foothold', title: 'Guessable admin password + upload', detail: 'The admin password was guessable from the box’s theme. Nibbleblog 4.0.3’s image plugin then accepted a PHP file (CVE-2015-6967).' },
      { phase: 'Root', title: 'sudo on a writable script', detail: 'sudo -l showed a monitoring script that could be run as root without a password, and my user could edit it.' },
    ],
    rootCause: [
      'Internal notes shipped in production HTML.',
      'Weak, guessable admin credentials and no lockout.',
      'Upload handler trusted the file’s claimed type.',
      'A sudo rule pointing at a file the user could modify.',
    ],
    fixes: [
      'Strip comments in production builds.',
      'Strong passwords, MFA for admin panels, and rate-limited logins.',
      'Validate uploads by content, re-encode images, and never execute files from upload folders.',
      'sudo rules should only reference root-owned, non-writable files.',
    ],
    takeaway: 'View source first. As a frontend developer, this one stung — build pipelines should strip HTML comments by default.',
  },
  {
    slug: 'sense',
    name: 'Sense',
    os: 'FreeBSD',
    difficulty: 'Easy',
    solved: '2024-11',
    owned: { user: true, root: true },
    cves: ['CVE-2014-4688'],
    classes: ['Sensitive file exposure', 'Default credentials', 'Command injection'],
    summary:
      'A pfSense firewall login page and a forgotten text file that told me the username and that the password was the “company default”. That turned out to be pfSense’s own default, and an authenticated command injection in an old pfSense version gave root directly.',
    chain: [
      { phase: 'Recon', title: 'Content discovery on a firewall UI', detail: 'Directory brute-forcing with a .txt extension found a changelog and a user note left in the web root.' },
      { phase: 'Foothold', title: 'Vendor default password', detail: 'The note named a user and said they still had the default password — which was the vendor’s well-known default.' },
      { phase: 'Root', title: 'Authenticated command injection', detail: 'This pfSense version passed a graph-rendering parameter to a shell (CVE-2014-4688). The web UI runs as root, so it went straight to root.' },
    ],
    rootCause: [
      'Internal notes stored in the web root.',
      'Vendor default credentials never changed.',
      'Unsanitized input passed to a shell by a service running as root.',
    ],
    fixes: [
      'Keep the web root to build output only.',
      'Force credential rotation on appliances and audit for vendor defaults.',
      'Patch network appliances like any other software; they are often the least-patched machine on the network.',
    ],
    takeaway: 'Security appliances are software too. The firewall was the most vulnerable thing on this network.',
  },
  {
    slug: 'greenhorn',
    name: 'GreenHorn',
    os: 'Linux',
    difficulty: 'Easy',
    solved: '2024-11',
    owned: { user: true, root: false },
    cves: ['CVE-2023-50564'],
    classes: ['Secrets in source control', 'Authenticated file upload RCE', 'Password reuse'],
    summary:
      'A Pluck CMS site whose own source, admin password hash included, was public on a Gitea server next to it. Pluck’s module installer then accepted an archive containing PHP, and the same password worked for a local user.',
    chain: [
      { phase: 'Recon', title: 'The password hash was in the repo', detail: 'The web server ran Pluck 4.7.18. A self-hosted Gitea instance alongside it published the site’s source, including the settings file that stores the admin password hash, and the hash cracked against a wordlist.' },
      { phase: 'Foothold', title: 'Module upload executes PHP', detail: 'Pluck’s module installer extracts uploaded ZIPs into a web-accessible folder without checking their contents (CVE-2023-50564).' },
      { phase: 'User', title: 'Password reuse', detail: 'The CMS admin password was also a local user’s password.' },
    ],
    rootCause: [
      'The site’s source, including its password hash file, was published on a public Git server.',
      'Plugin installation extracted arbitrary archives into the web root.',
      'Password reused between a web app and an OS account.',
    ],
    fixes: [
      'Keep credentials and hashes out of repositories, and scan for them in CI.',
      'Signed plugins only, extracted outside the web root and reviewed before activation.',
      'Unique credentials per system, and a password manager for the team.',
    ],
    takeaway: 'Any feature that installs code is a code-execution feature. Treat it with the same access controls as a shell.',
  },
];

// Screenshots from my notes, attached to attack-chain steps by index.
// Every image was reviewed and redacted (IPs, hashes, passwords, auth headers)
// before being copied here; the originals stay in the private notes repo.
export type Figure = { step: number; src: string; caption: string };

export const FIGURES: Record<string, Figure[]> = {
  sightless: [
    { step: 0, src: '/htb/sightless-1.jpg', caption: '/etc/hosts: the main site and the SQLPad subdomain (target IP redacted).' },
    { step: 1, src: '/htb/sightless-2.jpg', caption: 'linPEAS confirms the SQLPad shell is inside a Docker container.' },
    { step: 3, src: '/htb/sightless-3.jpg', caption: 'DevTools attached over the SSH tunnel, paused on the automated Froxlor login.' },
    { step: 3, src: '/htb/sightless-4.jpg', caption: 'Froxlor’s PHP-FPM settings, where an admin sets the command a root job later runs.' },
  ],
  sea: [
    { step: 0, src: '/htb/sea-1.jpg', caption: 'The theme’s version file gives away WonderCMS 3.2.0.' },
    { step: 1, src: '/htb/sea-2.jpg', caption: 'My HTTP server log: the admin’s browser fetching files after opening the link.' },
    { step: 3, src: '/htb/sea-3.jpg', caption: 'netstat: a service listening only on 127.0.0.1:8080.' },
    { step: 3, src: '/htb/sea-4.jpg', caption: 'The internal “System Monitor (Developing)” tool, reached through an SSH tunnel.' },
    { step: 3, src: '/htb/sea-5.jpg', caption: 'The log file path travels as a plain form field (Basic-auth value redacted).' },
  ],
  chemistry: [
    { step: 0, src: '/htb/chemistry-1.jpg', caption: 'Content discovery on the Flask app, including the upload route.' },
    { step: 3, src: '/htb/chemistry-2.jpg', caption: 'The internal dashboard, only reachable through the tunnel.' },
    { step: 3, src: '/htb/chemistry-3.jpg', caption: 'nmap identifies the internal service as aiohttp 3.9.1.' },
  ],
  linkvortex: [
    { step: 0, src: '/htb/linkvortex-1.jpg', caption: 'The dev subdomain serves its .git directory.' },
    { step: 0, src: '/htb/linkvortex-2.jpg', caption: 'The restored working tree: a staged change with a hard-coded password (redacted).' },
    { step: 3, src: '/htb/linkvortex-3.jpg', caption: 'The root-run cleanup script only checks the first symlink target.' },
  ],
  node: [
    { step: 1, src: '/htb/node-1.jpg', caption: '/api/users returns every user, password hashes included (redacted).' },
    { step: 1, src: '/htb/node-2.jpg', caption: 'Signed in as the admin, with a one-click backup download.' },
    { step: 2, src: '/htb/node-3.jpg', caption: 'The scheduler executes whatever command is stored in the tasks collection (credentials redacted).' },
  ],
  october: [
    { step: 0, src: '/htb/october-1.jpg', caption: 'nmap fingerprints October CMS on port 80.' },
    { step: 1, src: '/htb/october-2.jpg', caption: 'The media library accepted a .php5 file.' },
    { step: 2, src: '/htb/october-3.jpg', caption: 'Ghidra: a 112-byte stack buffer filled by an unchecked strcpy.' },
  ],
  valentine: [
    { step: 0, src: '/htb/valentine-1.jpg', caption: 'The homepage art was the hint.' },
    { step: 2, src: '/htb/valentine-2.jpg', caption: 'An encrypted private key, browsable in /dev.' },
  ],
  nibbles: [{ step: 1, src: '/htb/nibbles-1.jpg', caption: 'The image plugin’s upload handler, read in DevTools.' }],
  sense: [{ step: 0, src: '/htb/sense-1.jpg', caption: 'DirBuster finds system-users.txt in the web root.' }],
  greenhorn: [
    { step: 0, src: '/htb/greenhorn-1.jpg', caption: 'The page source names Pluck 4.7.18.' },
    { step: 0, src: '/htb/greenhorn-2.jpg', caption: 'The site’s own Gitea repo publishes the admin password hash (redacted).' },
    { step: 1, src: '/htb/greenhorn-3.jpg', caption: 'Pluck lets admins install themes and modules from uploaded archives.' },
  ],
};

export const getMachine = (slug: string) => MACHINES.find((m) => m.slug === slug);

export const MACHINE_STATS = {
  documented: MACHINES.length,
  rooted: MACHINES.filter((m) => m.owned.root).length,
  cves: new Set(MACHINES.flatMap((m) => m.cves)).size,
};
