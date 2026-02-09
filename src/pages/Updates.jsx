import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, Shield, Pencil, Eye, Tag } from 'lucide-react';

const logs = [
  {
    version: "v1.3",
    date: "February 2026",
    title: "The Visual Vault",
    changes: [
      "Added Visual Artifacts: Support for high-res image previews via URL",
      "Implemented Faceted Tag Filtering: Click tags to drill down instantly",
      "Optimized filtering logic to combine Search, Category, and Tags",
      "Enhanced UI feedback with active filter indicators and 'Clear' buttons",
      "Fixed SPA refresh 404 errors with vercel.json server rewrites"
    ],
    icon: <Eye size={20} className="text-green-400" />
  },
  {
    version: "v1.2",
    date: "January 2026",
    title: "The Logic Refactor",
    changes: [
      "Integrated Prism Syntax Highlighting for professional code display",
      "Added CRUD functionality: Full Edit/Update support for snippets",
      "Optimized Modal performance using React Key-Reset strategy",
      "Expanded snippet view vertical height for better readability",
      "Added 'Copy to Clipboard' utility buttons"
    ],
    icon: <Pencil size={20} className="text-blue-400" />
  },
  {
    version: "v1.1",
    date: "January 2026",
    title: "The Stats Expansion",
    changes: ["Added Dashboard Stat Cards", "Real-time language analytics", "React Router implementation"],
    icon: <Zap size={20} className="text-yellow-400" />
  },
  {
    version: "v1.0",
    date: "January 2026",
    title: "Vault Core Launch",
    changes: ["LocalStorage persistence", "Universal sidebar categories", "Search & Delete functionality", "Glassmorphism UI"],
    icon: <Shield size={20} className="text-blue-400" />
  }
];

export default function Updates() {
  return (
    <div className="min-h-screen bg-obsidian text-white p-8 md:p-20 relative">
       {/* Subtle background glow to match landing page */}
       <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group text-sm font-mono uppercase tracking-widest">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-5xl font-extrabold tracking-tighter mb-4 italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          System Updates
        </h1>
        <p className="text-gray-400 mb-16 font-mono text-sm tracking-tight">Tracking the evolution of The Vault archive.</p>

        <div className="flex flex-col gap-12 border-l border-white/10 pl-8">
          {logs.map((log, index) => (
            <div 
              key={index} 
              className="relative animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both" 
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-obsidian border-2 border-white/20" />
              
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300">
                  {log.version}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} /> {log.date}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {log.icon} {log.title}
              </h3>

              <ul className="space-y-3">
                {log.changes.map((change, i) => (
                  <li key={i} className="text-gray-400 flex items-start gap-2 text-sm">
                    <span className="text-white/30 mt-1.5">•</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}