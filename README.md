<div align="center">

<img src="./public/images/Talentustbanner.png" alt="Talenust Banner" style="border-radius: 12px; max-width: 100%; height: auto;" />

# 🎯 Talenust - Modern Recruitment Platform

**AI-Powered Recruitment Management System Built with Next.js & TypeScript**

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/mahdimiad/recruitment-app)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Download](https://img.shields.io/badge/Download-Latest-brightgreen.svg)](https://github.com/mahdimiad/recruitment-app/releases/latest)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ecf8e?logo=supabase)](https://supabase.com/)

[![Stars](https://img.shields.io/github/stars/mahdimiad/recruitment-app?style=social)](https://github.com/mahdimiad/recruitment-app/stargazers)
[![Forks](https://img.shields.io/github/forks/mahdimiad/recruitment-app?style=social)](https://github.com/mahdimiad/recruitment-app/network/members)
[![Issues](https://img.shields.io/github/issues/mahdimiad/recruitment-app)](https://github.com/mahdimiad/recruitment-app/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/mahdimiad/recruitment-app)](https://github.com/mahdimiad/recruitment-app/pulls)
[![Clones](https://img.shields.io/badge/Clones-14-success?logo=github)](https://github.com/mahdimiad/recruitment-app/insights/traffic)
[![Views](https://img.shields.io/badge/Views-26-blue?logo=github)](https://github.com/mahdimiad/recruitment-app/insights/traffic)

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [💡 Features](#-features) • [🤝 Contributing](#-contributing) • [📄 License](#-license)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Database Setup](#-database-setup)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

**Talenust** is a modern, full-featured recruitment management platform designed to streamline the hiring process. Built with cutting-edge technologies, it's designed to be **self-hosted**, giving you complete control over your data and infrastructure.

### Key Highlights

- 🎨 **Beautiful UI/UX** - Modern dark theme with intuitive design
- 🚀 **High Performance** - Built with Next.js 16+ App Router
- 🔒 **Secure** - Enterprise-grade security
- 📊 **Analytics** - Comprehensive recruitment analytics and reporting
- 🤖 **AI-Powered** - Smart candidate matching and scoring
- 🌐 **Multi-tenant** - Support for multiple companies/organizations
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🏠 **Self-Hosted** - Complete control over your data and infrastructure
- 📦 **JSON Demo Included** - Works out of the box with demo data, integrate your database when ready

---

## ✨ Features

### 🎯 Core Features

- **📝 Job Management**
  - Create, edit, and manage job postings
  - Job templates and bulk operations
  - Status tracking (Draft, Published, Closed)
  - Public job listings with search and filters

- **👥 Candidate Management**
  - CV upload and parsing
  - Candidate profiles with skills and experience
  - Application tracking and status management
  - Advanced candidate search and filtering

- **📊 Analytics & Reports**
  - Real-time dashboard with key metrics
  - Advanced reporting with date range filters
  - Application trends and hiring funnel
  - Score distribution and performance metrics
  - Export reports (PDF, CSV, Email)

- **🤖 Smart Matching**
  - AI-powered candidate-job matching
  - Automated scoring based on requirements
  - Weighted scoring criteria
  - Top candidate recommendations

- **👨‍💼 Team Collaboration**
  - Multi-user support with role-based access
  - Notes and comments on candidates
  - Activity feed and timeline
  - User management and permissions

- **⚙️ Settings & Configuration**
  - Company branding and customization
  - API key management
  - Integration settings (Slack, Teams, etc.)
  - Notification preferences

### 🏠 Self-Hosted

Talenust is designed to be self-hosted, giving you:
- **Complete Data Control** - Your data stays on your servers
- **Customization** - Full access to modify and extend the platform
- **Privacy** - No third-party data sharing
- **Flexibility** - Deploy on your preferred infrastructure

---

## 🛠 Tech Stack

### Frontend
- **[Next.js 16+](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Font Awesome](https://fontawesome.com/)** - Icon library

### Backend
- **PostgreSQL** - Compatible with any PostgreSQL database
- **Supabase** - Optional integration (recommended)
- **Custom Database** - Easy integration with your existing database

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Git** - Version control

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm** package manager
- **Git** ([Download](https://git-scm.com/))
- **PostgreSQL Database** (or use Supabase, or start with JSON demo)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/mahdimiad/recruitment-app.git
cd recruitment-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration (Optional - uses JSON demo by default)
# Option 1: Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Option 2: Custom PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/talenust_db

# Deployment Type
DEPLOYMENT_TYPE=self-hosted
```

**Note**: By default, the app uses a JSON-based mock database for demonstration. You can integrate Supabase, PostgreSQL, or any other database by configuring the environment variables above.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup

### Default: JSON Demo Database

The app comes with a **JSON-based demo database** that works out of the box. This allows you to:
- Test all features immediately without database setup
- Explore the UI and functionality
- Develop and customize the application

The demo database is located in `lib/mock-db/data.json` and is fully functional for development and testing.

### Integrating Your Own Database

When you're ready to use a real database, you can integrate:

#### Option 1: Supabase (Recommended)

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com/)
   - Create a new project
   - Copy your project URL and API keys

2. **Set Up Database Schema**
   - Run the SQL migrations from `Docs/database/schema.sql` (if available)
   - Or use Supabase's SQL editor to create tables manually
   - See `Docs/CONVERSION_PLAN.md` for database schema details

3. **Configure Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Update Code**
   - Replace mock database calls in `lib/mock-db/index.ts` with Supabase queries
   - Or create a new service layer that uses Supabase client

#### Option 2: PostgreSQL Database

1. **Create a PostgreSQL Database**
   ```bash
   createdb talenust_db
   ```

2. **Run Migrations**
   - Import the schema from `Docs/database/schema.sql`
   - Or use your preferred migration tool

3. **Configure Environment Variables**
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/talenust_db
   ```

4. **Update Code**
   - Replace mock database calls with your database queries
   - Use your preferred ORM or query builder (Prisma, Drizzle, etc.)

#### Option 3: Other Databases

Talenust is database-agnostic. You can integrate:
- MySQL/MariaDB
- MongoDB
- SQLite
- Any other database by updating the data access layer

**Migration Path**: Start with the JSON demo, then migrate to your preferred database when ready.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (if using Supabase) | No | - |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (if using Supabase) | No | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (if using Supabase) | No | - |
| `DATABASE_URL` | PostgreSQL connection string (if using PostgreSQL) | No | - |
| `DEPLOYMENT_TYPE` | Deployment type: `self-hosted` | No | `self-hosted` |

**Note**: All database variables are optional. The app uses a JSON demo database by default. Configure these only when integrating your own database.

### Customization

- **Branding**: Update logo in `public/images/`
- **Colors**: Modify Tailwind config in `tailwind.config.ts`
- **Company Info**: Update in Settings page after deployment

---

## 📁 Project Structure

```
recruitment-app/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/                # Login page
│   │   └── signup/               # Signup page
│   ├── dashboard/                # Dashboard routes
│   │   ├── jobs/                 # Job management
│   │   ├── candidates/           # Candidate management
│   │   ├── reports/              # Analytics & reports
│   │   └── settings/              # Settings
│   ├── jobs/                     # Public job listings
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── dashboard/               # Dashboard components
│   ├── jobs/                     # Job-related components
│   ├── layout/                   # Layout components
│   └── reports/                  # Report components
├── lib/                          # Utility libraries
│   ├── mock-db/                  # JSON demo database (default)
│   ├── supabase/                 # Supabase client (optional)
│   ├── utils/                    # Utility functions
│   └── deployment/               # Deployment detection
├── public/                       # Static assets
│   └── images/                   # Images and logos
├── types/                        # TypeScript types
├── Docs/                         # Documentation
│   ├── CONVERSION_PLAN.md        # Development plan
│   └── database/                 # Database schemas
├── .env.local                    # Environment variables (create this)
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── tailwind.config.ts            # Tailwind config
```

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Development Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write your code
   - Follow the existing code style
   - Add comments where necessary

3. **Test Your Changes**
   ```bash
   npm run build      # Ensure build succeeds
   npm run lint       # Check for linting errors
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Open a PR on GitHub
   - Describe your changes
   - Wait for review

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Use functional components with hooks
- Prefer `async/await` over promises
- Use Tailwind CSS for styling

---

## 🚢 Deployment

### Self-Hosted Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Set Up Environment**
   - Configure `.env.local` with production values
   - Optionally set up your database (or use JSON demo)
   - Configure file storage if needed

3. **Start Production Server**
   ```bash
   npm run start
   ```

4. **Run with Docker** (optional)
   ```bash
   docker build -t recruitment-app .
   docker run -p 3000:3000 recruitment-app
   ```

5. **Deploy to Vercel/Railway/Render** (optional)
   - Push your code to GitHub
   - Import to your preferred platform
   - Configure environment variables
   - Deploy!

**Note**: You can deploy anywhere that supports Node.js. The app is self-contained and doesn't require specific hosting providers.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs** - Open an issue with detailed information
- 💡 **Suggest Features** - Share your ideas in discussions
- 📝 **Improve Documentation** - Help make docs better
- 🔧 **Submit Pull Requests** - Fix bugs or add features
- ⭐ **Star the Project** - Show your support

### Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code of Conduct

Please be respectful and constructive in all interactions.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

### Get Help

- 📖 **Documentation**: Check the `Docs/` directory
- 💬 **Discussions**: [GitHub Discussions](https://github.com/mahdimiad/recruitment-app/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/mahdimiad/recruitment-app/issues)

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Charts by [Recharts](https://recharts.org/)

---

<div align="center">

**Made with ❤️ by [Mahdi Miad](https://github.com/mahdimiad)**

[⬆ Back to Top](#-talenust---modern-recruitment-platform)

⭐ Star us on GitHub if you find this project helpful!

</div>
