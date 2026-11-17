# Pavan Mamidala — Portfolio

Frontend engineer portfolio with an application-security side: projects, experience, and Hack The Box case studies written as short pentest reports (what broke, why, and how a developer fixes it).

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · motion

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs to build/
```

## Editing content

Everything on the site comes from two files:

- `src/data/profile.ts` — bio, links, HTB stats, experience, skills, projects
- `src/data/machines.ts` — Hack The Box case studies

Routing is hash-based (`/#/security/sea`), so the site works on any static host without rewrite rules.

## Case study rules

Only retired machines. No credentials, flags, IP addresses, tokens, or working exploit payloads — the write-ups are about the reasoning and the fix.
