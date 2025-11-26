# Talenust - Recruitment App

Modern recruitment platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Multi-tenant SaaS** - Cloud-based with subscription billing
- **Self-hosted Option** - One-time payment license for on-premise installation
- **CV Parsing & Analysis** - AI-powered resume parsing
- **Smart Candidate Scoring** - Automated candidate-job matching
- **Job Management** - Complete job posting and management system
- **Analytics & Reports** - Comprehensive recruitment analytics
- **Team Collaboration** - Multi-user support with role-based access

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account (for cloud deployment)

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Deployment Type
DEPLOYMENT_TYPE=cloud

# Stripe (for SaaS billing)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
recruitment-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/          # Dashboard routes
│   └── page.tsx            # Landing page
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components
│   └── features/           # Feature-specific components
├── lib/                    # Utility libraries
│   ├── supabase/           # Supabase client utilities
│   ├── billing/            # Billing/subscription logic
│   ├── license/            # License management (self-hosted)
│   └── deployment/         # Deployment type detection
├── types/                  # TypeScript type definitions
└── hooks/                  # Custom React hooks
```

## 🎨 Design System

- **Theme**: Dark mode with green accents
- **Primary Color**: #10b981 (green-500)
- **Font**: Inter
- **Framework**: Tailwind CSS v4

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📚 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **File Upload**: React Dropzone

## 🔐 Authentication

The app uses Supabase Auth with middleware protection. Protected routes are automatically redirected to login if user is not authenticated.

## 📖 Documentation

For detailed documentation, development plans, and setup guides, see the `Docs/` directory:
- `Docs/README.md` - Detailed setup and configuration
- `Docs/CONVERSION_PLAN.md` - Development plan and phases
- `Docs/NEXT_STEPS.md` - Next development steps
- `Docs/MOCK_DATABASE_SETUP.md` - Mock database setup guide

## 🚢 Deployment

### Cloud (SaaS) Deployment

1. Deploy to Vercel:
   ```bash
   vercel
   ```

2. Configure environment variables in Vercel dashboard

3. Set up Supabase production project

### Self-Hosted Deployment

1. Build Docker image:
   ```bash
   docker build -t recruitment-app .
   ```

2. Run with Docker Compose (see deployment docs)

## 📝 License

See LICENSE file for details.

---

**Version**: 0.1.0  
**Last Updated**: January 2025

