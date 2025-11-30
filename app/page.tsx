import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import PricingSection from '@/components/pricing/PricingSection'
import FAQSection from '@/components/faq/FAQSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileAlt,
  faStarHalfAlt,
  faTasks,
  faUsers,
  faFileExport,
  faServer,
  faPlay,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900 min-h-screen lg:min-h-[800px]">
        {/* Background Wave Patterns - Top to Bottom */}
        <div className="absolute inset-0 overflow-hidden">
          {/* SVG Wave Pattern - Flowing from Top to Bottom */}
          <svg 
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Wave 1 - Top (Lightest) */}
            <path
              d="M0,100 Q240,50 480,100 T960,100 T1440,100 L1440,0 L0,0 Z"
              fill="rgba(209, 213, 219, 0.15)"
            />
            <path
              d="M0,100 Q240,50 480,100 T960,100 T1440,100"
              fill="none"
              stroke="rgba(209, 213, 219, 0.3)"
              strokeWidth="2"
            />
            
            {/* Wave 2 - Upper Middle */}
            <path
              d="M0,250 Q240,200 480,250 T960,250 T1440,250 L1440,0 L0,0 Z"
              fill="rgba(209, 213, 219, 0.12)"
            />
            <path
              d="M0,250 Q240,200 480,250 T960,250 T1440,250"
              fill="none"
              stroke="rgba(209, 213, 219, 0.25)"
              strokeWidth="2"
            />
            
            {/* Wave 3 - Middle */}
            <path
              d="M0,400 Q240,350 480,400 T960,400 T1440,400 L1440,0 L0,0 Z"
              fill="rgba(209, 213, 219, 0.1)"
            />
            <path
              d="M0,400 Q240,350 480,400 T960,400 T1440,400"
              fill="none"
              stroke="rgba(209, 213, 219, 0.2)"
              strokeWidth="2"
            />
            
            {/* Wave 4 - Lower Middle */}
            <path
              d="M0,550 Q240,500 480,550 T960,550 T1440,550 L1440,0 L0,0 Z"
              fill="rgba(209, 213, 219, 0.08)"
            />
            <path
              d="M0,550 Q240,500 480,550 T960,550 T1440,550"
              fill="none"
              stroke="rgba(209, 213, 219, 0.18)"
              strokeWidth="2"
            />
            
            {/* Wave 5 - Bottom */}
            <path
              d="M0,700 Q240,650 480,700 T960,700 T1440,700 L1440,0 L0,0 Z"
              fill="rgba(209, 213, 219, 0.06)"
            />
            <path
              d="M0,700 Q240,650 480,700 T960,700 T1440,700"
              fill="none"
              stroke="rgba(209, 213, 219, 0.15)"
              strokeWidth="2"
            />
            
            {/* Additional connecting wave lines */}
            <path
              d="M0,175 Q240,125 480,175 T960,175 T1440,175"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
            <path
              d="M0,325 Q240,275 480,325 T960,325 T1440,325"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
            <path
              d="M0,475 Q240,425 480,475 T960,475 T1440,475"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
            <path
              d="M0,625 Q240,575 480,625 T960,625 T1440,625"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          </svg>
          
          {/* Subtle Gradient Overlay - Lighter to maintain wave visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/95 to-gray-800/98"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Feature Cards Showcase */}
            <div className="relative order-2 lg:order-1">
              <div className="space-y-4">
                {/* Candidate Tracking Card */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 transform rotate-[-1deg] border border-gray-700">
                  <div className="bg-primary-500 h-2 rounded-t-lg -m-6 mb-4"></div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-primary-400 font-semibold">OW</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Emma Wilson</h3>
                      <p className="text-gray-400 text-sm">Frontend Developer</p>
                    </div>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full border border-primary-500/30">
                      In progress
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                        <span className="text-gray-300">Created Jan 25</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                        <span className="text-gray-300">Shortlisted</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <span className="text-gray-500">Interview</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <span className="text-gray-500">Hired</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employee Overview Card */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 transform rotate-[1deg] border border-gray-700 ml-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUsers} className="text-primary-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">164 Employees</p>
                      <p className="text-primary-400 text-sm">+10 onboarding now</p>
                    </div>
                  </div>
                </div>

                {/* Notification Card */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 transform rotate-[-0.5deg] border border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-400 font-semibold text-sm">DM</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">Jane Doe</span>
                        <span className="text-primary-400 text-xs bg-primary-500/20 px-2 py-0.5 rounded">Recruiter</span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Hey, we&apos;ve got a hot referral for your frontend team!
                      </p>
                      <p className="text-gray-500 text-xs mt-1">11:26 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2 lg:pl-8">
              <div className="space-y-6">
                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Streamline your <span className="bg-gradient-to-r from-primary-400 to-primary-400 bg-clip-text text-transparent">recruitment process</span>  with all-in-one platform.
                </h1>

                {/* Social Proof */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                      <span className="text-xs text-gray-400">JC</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                      <span className="text-xs text-gray-400">MJ</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                      <span className="text-xs text-gray-400">EW</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      <span>★★★★★</span>
                    </div>
                    <span className="text-gray-400 text-sm">4.9 from 100+ reviews</span>
                  </div>
                </div>

                {/* Value Proposition */}
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                  An all-encompassing recruitment solution to help modern businesses grow with the best talent. Automate CV parsing, scoring, and candidate management.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/signup"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-white bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-primary-500 transition-all shadow-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-gray-900 bg-gradient-to-r from-primary-400 to-primary-400 hover:from-primary-500 hover:to-primary-500 transition-all shadow-lg"
                  >
                    See a Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div className="bg-gray-800 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-400 tracking-wide uppercase">
              Powerful Features
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-5xl">
              Everything you need for efficient recruiting
            </p>
          </div>
          <div className="mt-12">
            <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900 w-full">
              <div className="relative w-full h-auto">
                <Image
                  src="/images/Talentustbanner.png" 
                  alt="Talentust Dashboard Preview"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Why Choose Badge */}
            <div className="inline-flex items-center justify-center mb-6">
              <span className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700">
                Why Choose
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Smarter Recruitment Solutions with{' '}
              <span className="text-gray-400">Transformative AI</span>
            </h2>
            
            {/* Subheading */}
            <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Empower your recruitment team with smarter tools and transformative AI solutions
            </p>
          </div>

          {/* Feature Cards - First Row */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: CV Parsing & Analysis */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all shadow-lg relative overflow-hidden">
                {/* Subtle grid pattern background */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="relative">
                  {/* Icon with colored square */}
                  <div className="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={faFileAlt} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    CV Parsing & Analysis
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Upload resumes in any format. Our AI-powered parser extracts relevant skills,
                    experience, and education to create structured candidate profiles automatically.
                  </p>
                </div>
              </div>

              {/* Card 2: Smart Candidate Scoring */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-400 rounded-lg flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={faStarHalfAlt} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Smart Candidate Scoring
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Score candidates automatically based on job requirements. Customize scoring criteria
                    to match exactly what you&apos;re looking for in potential hires.
                  </p>
                </div>
              </div>

              {/* Card 3: Job & Candidate Management */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={faTasks} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Job & Candidate Management
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Manage all of your open positions and candidates in one place. Track recruitment
                    progress with customizable pipelines and stages.
                  </p>
                </div>
              </div>

              {/* Card 4: Team Collaboration */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={faUsers} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Team Collaboration
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Share candidate profiles with your team. Add notes, ratings, and feedback to
                    collaborate effectively during the hiring process.
                  </p>
                </div>
              </div>

              {/* Card 5: Shortlist Export */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-400 rounded-lg flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={faFileExport} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Shortlist Export
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Generate and export reports of shortlisted candidates. Share professional PDFs or
                    spreadsheets with hiring managers and stakeholders.
                  </p>
                </div>
              </div>

              {/* Card 6: Self-Hosting Options */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={faServer} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Self-Hosting Options
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Deploy on your own servers for complete data control. Our enterprise plan includes
                    self-hosting options with dedicated support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                What our customers say
              </h2>
            </div>
            <div className="mt-4 md:mt-0 md:text-right">
              <p className="text-gray-400 text-sm mb-3">
                Read more customer reviews on our platform and share your experience.
              </p>
              <Link
                href="#reviews"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                See More Reviews
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Review Card 1 - Top Left */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="flex text-yellow-400 mb-4">
                <span className="text-lg">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &quot;Talentust has revolutionized our tech hiring. The CV parsing saved our
                recruiters countless hours, and the scoring system helped us identify qualified
                candidates we might have missed otherwise. Highly recommended!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-400 font-semibold">JC</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Jane Cooper</p>
                  <p className="text-gray-400 text-sm">TechGlobal Inc.</p>
                </div>
              </div>
            </div>

            {/* Video Review Card - Center Column (spans 2 rows) */}
            <div className="bg-gray-900 rounded-xl p-4 shadow-lg border-2 border-primary-500 relative overflow-hidden md:col-span-2 lg:col-span-1 lg:row-span-2 lg:row-start-1 lg:col-start-2 flex flex-col">
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full border border-primary-500/30">
                  Testimonial
                </span>
              </div>
              <div className="relative flex-1 -mx-4 -mt-4 mb-3 min-h-0">
                <div className="w-full h-full bg-gray-800 relative overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/xqtA8gfWENc"
                    title="Example of Video Testimonial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-white font-semibold">
                  Recruiter <span className="text-primary-400">Martinez</span>
                </p>
                <p className="text-gray-400 text-sm mt-1">• Recruiter Pro Services</p>
              </div>
            </div>

            {/* Review Card 2 - Top Right */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="flex text-yellow-400 mb-4">
                <span className="text-lg">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &quot;As a financial institution with strict compliance requirements, the
                self-hosting option was critical for us. Talentust gives us complete control
                over our candidate data while streamlining our hiring process.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-400 font-semibold">MJ</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Michael Johnson</p>
                  <p className="text-gray-400 text-sm">FinanceGroup</p>
                </div>
              </div>
            </div>

            {/* Review Card 3 - Bottom Left */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="flex text-yellow-400 mb-4">
                <span className="text-lg">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &quot;We reduced our time-to-hire by 40% using Talentust. The automated candidate
                scoring and matching features are game-changers. Our team can now focus on
                building relationships rather than sifting through resumes.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-400 font-semibold">RT</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Robert Taylor</p>
                  <p className="text-gray-400 text-sm">InnovateCorp</p>
                </div>
              </div>
            </div>

            {/* Review Card 4 - Bottom Right */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="flex text-yellow-400 mb-4">
                <span className="text-lg">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &quot;The CV parsing accuracy is impressive, and the candidate management dashboard
                is intuitive. We&apos;ve hired 15 top candidates in the last quarter using
                Talentust. Extremely satisfied with their services!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-400 font-semibold">LA</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Lisa Anderson</p>
                  <p className="text-gray-400 text-sm">Digital Ventures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-400 to-primary-400">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Transform your recruitment today.</span>
            <span className="block">Start using Talentust for free.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-800">
            No credit card required. Free plan includes up to 25 CV uploads per month.
          </p>
          <Link
            href="/signup"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-500 bg-gray-900 hover:bg-gray-800 sm:w-auto"
          >
            Start your free trial
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
