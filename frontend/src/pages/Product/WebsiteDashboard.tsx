import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  BarChart2,
  Wand2,
  LayoutGrid,
  GalleryHorizontal,
  Mic,
  Heart,
  FileText,
  Calendar,
  Flame,
  User,
  Folder,
  Bot,
  Zap,
  Sparkles,
} from 'lucide-react';

// Utility for class merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const INDIVIDUAL_FEATURES = [
  '50K words per month',
  'Content Inspiration',
  'Generate Ideas',
  'Generate Posts',
  'Post Styling',
  'Post Preview',
  'Scheduling',
  'Auto-add First Comment',
  'Posts Generated for You',
];
const PRO_FEATURES = [
  'All Starter Features',
  'Analytics',
  '100k words per month',
  'Create and Publish Carousels',
  'Engage & Grow',
];

const SIDEBAR_SECTIONS = [
  {
    label: 'Dashboard',
    items: [
      { icon: <LayoutDashboard size={20} />, label: 'Overview', key: 'overview' },
      { icon: <BarChart2 size={20} />, label: 'Analytics', key: 'analytics' },
      { icon: <Calendar size={20} />, label: 'Calendar', key: 'calendar' },
    ],
  },
  {
    label: 'AI Content Creation',
    items: [
      { icon: <Wand2 size={20} />, label: 'AI Post Builder', key: 'post-builder', desc: 'Craft professional LinkedIn content' },
      { icon: <GalleryHorizontal size={20} />, label: 'Ads Copy AI', key: 'ads-copy', desc: 'Generate high-converting ad content' },
      { icon: <FileText size={20} />, label: 'AIO & SEO Blog', key: 'seo-blog', desc: 'Generate SEO-optimized blog content' },
      { icon: <Mic size={20} />, label: 'Voice Notes', key: 'voicenotes', desc: 'Convert voice to text' },
    ],
  },
  {
    label: 'Hiring Solutions',
    items: [
      { icon: <User size={20} />, label: 'Post a Job', key: 'post-job', desc: 'Create and manage job listings' },
      { icon: <Zap size={20} />, label: 'Hire Assist', key: 'hire-assist', desc: 'AI-powered hiring automation' },
    ],
  },
  {
    label: 'AI Tools',
    items: [
      { icon: <Sparkles size={20} />, label: 'Custom LLM', key: 'custom-llm', desc: 'Train and deploy custom language models' },
      { icon: <Settings size={20} />, label: 'AI Operations', key: 'ai-operations', desc: 'Automate business operations' },
    ],
  },
  {
    label: 'Content Management',
    items: [
      { icon: <Folder size={20} />, label: 'Drafts', key: 'drafts' },
      { icon: <Flame size={20} />, label: 'Viral Posts', key: 'viral' },
      { icon: <User size={20} />, label: 'Influencers', key: 'influencers' },
    ],
  },
  {
    label: 'Account',
    items: [
      { icon: <User size={20} />, label: 'Profile', key: 'profile' },
      { icon: <Settings size={20} />, label: 'Settings', key: 'settings' },
    ],
  },
  {
    label: 'Automation',
    items: [
      { icon: <Bot size={20} />, label: 'Auto-pilot Posts Generator', key: 'autopilot' },
    ],
  },
];

const WebsiteDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [planTab, setPlanTab] = useState<'individual' | 'agency'>('individual');
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [currency, setCurrency] = useState<'INR'>('INR');

  // Pricing values
  const starterPrice = billing === 'monthly' ? 1600 : 1600 * 12 * 0.8; // 20% off annual
  const proPrice = billing === 'monthly' ? 2300 : 2300 * 12 * 0.8;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center h-16 px-4 bg-white shadow-sm z-30 relative">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            <span className="sr-only">Open menu</span>
            <LayoutDashboard size={28} />
          </button>
          <span className="text-2xl font-extrabold tracking-tight text-blue-600">MyBrand</span>
        </div>
        <nav className="flex-1 flex items-center justify-center">
          <ol className="flex gap-2 text-sm text-gray-500">
            <li>Dashboard</li>
            <li className="text-gray-400">/</li>
            <li>Manage Your Plan</li>
          </ol>
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <button className="rounded-lg px-3 py-1.5 bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition">AI Assistant</button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white shadow flex items-center justify-center text-lg font-bold text-white">U</div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 flex flex-col transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:static md:translate-x-0 md:w-64'
        )}
        aria-label="Sidebar"
      >
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.label} className="mb-6">
              <div className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">{section.label}</div>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.key}>
                    <button
                      className={cn(
                        'flex items-center gap-3 w-full px-3 py-2 rounded-lg transition',
                        activeNav === item.key ? 'bg-blue-100 text-blue-700 font-semibold shadow' : 'text-gray-700 hover:bg-gray-100'
                      )}
                      onClick={() => setActiveNav(item.key)}
                      aria-current={activeNav === item.key ? 'page' : undefined}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-64 bg-gray-50 min-h-screen">
        <section className="max-w-5xl mx-auto w-full p-6 pb-16">
          {/* Page Title Section */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Manage Your Plan</h1>
            <p className="text-lg text-gray-600">View details of your current subscription or explore other plans that best suit your needs.</p>
          </div>

          {/* Pricing Tabs & Offer Banner */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1 w-fit">
              <button
                className={cn(
                  'px-4 py-2 rounded-lg font-semibold transition',
                  planTab === 'individual' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-blue-600'
                )}
                onClick={() => setPlanTab('individual')}
              >
                Individual Plans
              </button>
              <button
                className={cn(
                  'px-4 py-2 rounded-lg font-semibold transition',
                  planTab === 'agency' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-blue-600'
                )}
                onClick={() => setPlanTab('agency')}
              >
                Agency / Team Plans
              </button>
            </div>
            <div className="flex-1 flex justify-end">
              <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm shadow">🇮🇳 Special Pricing for India - 50% off. Use code 'pdprbkpa50'</span>
            </div>
          </div>

          {/* Pricing Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col hover:shadow-xl transition group border-2 border-gray-100">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg font-bold text-blue-600">Starter</span>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-extrabold text-gray-900">₹{starterPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                <span className="text-gray-500 mb-1 text-lg">/mo</span>
              </div>
              <ul className="mb-6 space-y-2">
                {INDIVIDUAL_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-800">
                    <span className="inline-block w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200 transition focus:outline-none">Upgrade</button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col hover:shadow-xl transition group border-2 border-blue-200 relative ring-2 ring-blue-300">
              <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">POPULAR CHOICE</span>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg font-bold text-blue-700">Pro</span>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-extrabold text-blue-700">₹{proPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                <span className="text-gray-500 mb-1 text-lg">/mo</span>
              </div>
              <ul className="mb-6 space-y-2">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-800">
                    <span className="inline-block w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition focus:outline-none">Upgrade</button>
            </div>
          </div>

          {/* Pricing Toggles */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">Billing:</span>
              <button
                className={cn(
                  'px-4 py-2 rounded-lg font-semibold transition',
                  billing === 'monthly' ? 'bg-blue-100 text-blue-700 shadow' : 'text-gray-500 hover:text-blue-600'
                )}
                onClick={() => setBilling('monthly')}
              >
                Monthly
              </button>
              <button
                className={cn(
                  'px-4 py-2 rounded-lg font-semibold transition',
                  billing === 'annual' ? 'bg-blue-100 text-blue-700 shadow' : 'text-gray-500 hover:text-blue-600'
                )}
                onClick={() => setBilling('annual')}
              >
                Annual <span className="ml-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Get 20% off</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">Currency:</span>
              <button className="px-4 py-2 rounded-lg font-semibold bg-blue-100 text-blue-700 shadow">₹ INR</button>
              {/* Extend for more currencies if needed */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WebsiteDashboard;
