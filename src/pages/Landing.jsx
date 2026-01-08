import { Link } from 'react-router-dom';
import { Shield, Zap, Monitor, ChevronRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-obsidian text-white overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />

      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-obsidian rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase italic">The Vault</span>
        </div>

        {/*Sign in link tbd*/}
        {/*<Link to="/dashboard" className="text-sm font-medium hover:text-gray-400 transition-colors">
          Sign In
        </Link>*/}
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 relative z-10">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            SECURE YOUR LOGIC.
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            A premium, local-first code snippet library designed for the modern developer. 
            No cloud. No latency. Just your best code, organized.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 bg-white text-obsidian px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            Enter The Vault <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield className="text-blue-400" />} 
            title="Local First" 
            desc="Your data stays on your machine. Zero tracking, maximum privacy." 
          />
          <FeatureCard 
            icon={<Zap className="text-yellow-400" />} 
            title="Instant Search" 
            desc="Filter through thousands of snippets in milliseconds with optimized indexing." 
          />
          <FeatureCard 
            icon={<Monitor className="text-purple-400" />} 
            title="Glass UI" 
            desc="A workspace that looks as good as your code feels. Dark mode by default." 
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-card p-8 group hover:border-white/20 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}