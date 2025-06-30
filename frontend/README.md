# PostPilot AI Hub

A production-ready AI-powered social media management platform.

## 🚀 Tech Stack
- Next.js 14 (App Router, TypeScript)
- Supabase (Database + Auth + Storage)
- OpenAI / Anthropic integration
- Stripe for payments
- Social media APIs (Twitter, Facebook, Instagram, LinkedIn)
- Tailwind CSS, shadcn/ui, Radix UI
- Vercel deployment

## 📦 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   Copy `.env.local.example` to `.env.local` and fill in your secrets.
3. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── content/
│   │   ├── schedule/
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/
│   │   ├── auth/
│   │   ├── posts/
│   │   ├── ai/
│   │   ├── social/
│   │   ├── webhooks/
│   │   └── cron/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── auth/
│   ├── dashboard/
│   ├── content/
│   └── common/
├── lib/
│   ├── supabase.ts
│   ├── database.ts
│   ├── ai-services.ts
│   ├── social-media.ts
│   ├── stripe.ts
│   ├── utils.ts
│   └── validations.ts
├── hooks/
├── types/
└── middleware.ts
```

## 🗺️ Development Phases
- Phase 1: Project Initialization and Core Setup
- Phase 2: Database Schema and Authentication
- Phase 3: Core Infrastructure
- Phase 4: Feature Implementation
- Phase 5: Advanced Features
- Phase 6: API & Integrations
- Phase 7: Testing and Deployment

## 🛠️ Local Development

To work locally:
1. Clone the repository
2. Install dependencies
3. Copy `.env.local.example` to `.env.local` and fill in your keys
4. Run `npm run dev` to start the development server

---

See the full project spec in this file for details.
