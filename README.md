# PayLater (MVP)

PayLater is a mobile-first bill splitter for Nigerian groups. It helps you split bills in NGN, share each person’s amount on WhatsApp, and track Paid/Unpaid status.

> We don’t collect money here — we only help you track.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM + SQLite
- No external auth (owner session via localStorage + optional group PIN)

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy env values:

```bash
cp .env.example .env
```

3. Generate Prisma client + migrate:

```bash
npm run prisma:generate
npm run prisma:migrate
```

4. (Optional) Seed sample data:

```bash
npm run prisma:seed
```

5. Start development server:

```bash
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run prisma:migrate` — create/apply migrations in dev
- `npm run prisma:deploy` — apply migrations in production
- `npm run prisma:seed` — seed demo data
- `npm run check:splits` — sanity test for split math/rounding

## Deploy (Vercel or Node host)

### Vercel

1. Push repo to GitHub.
2. Import project in Vercel.
3. Set env vars:
   - `DATABASE_URL=file:./dev.db` (or your persisted SQLite path)
   - `NEXT_PUBLIC_APP_URL=https://your-domain.com`
4. Build command: `npm run build`
5. Start command: `npm run start`

> For production durability, mount persistent storage for SQLite if your host supports it.

### Any Node host

- Run `npm ci`
- Set env vars from `.env.example`
- Run `npm run prisma:deploy`
- Run `npm run build && npm run start`

## API routes

- `GET/POST /api/groups`
- `GET/POST /api/groups/[groupId]/members`
- `GET/POST /api/groups/[groupId]/bills`
- `GET/POST /api/bills/[billId]/shares`
- `GET /api/shares/[token]`
- `POST /api/shares/[token]/mark-paid`

## Notes

- Currency parsing supports commas (e.g. `25,000`).
- All calculations use integer kobo internally.
- Remainder kobo is distributed from earliest members.
