import { Terminal, Code2, Layout, Database, Cpu, Braces, Hash, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'All Snippets', icon: <Terminal size={18} />, filter: 'All' },
  { name: 'React', icon: <Code2 size={18} />, filter: 'React' },
  { name: 'TypeScript', icon: <Braces size={18} />, filter: 'TypeScript' },
  { name: 'JavaScript', icon: <Code2 size={18} />, filter: 'JavaScript' },
  { name: 'Python', icon: <Hash size={18} />, filter: 'Python' },
  { name: 'SQL/Backend', icon: <Database size={18} />, filter: 'SQL' },
  { name: 'HTML/CSS', icon: <Globe size={18} />, filter: 'CSS' },
  { name: 'Utilities', icon: <Cpu size={18} />, filter: 'Utilities' },
];

export default function Sidebar({ activeCategory, setActiveCategory }) {
  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-white/10 p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3 px-2">
        <Link to="/" className="flex items-center gap-3 px-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-obsidian rotate-45"></div>
            </div>
            <h2 className="text-xl font-bold tracking-tight uppercase italic text-white">The Vault</h2>
        </Link>
      </div>

      <nav className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.filter)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
              activeCategory === cat.filter 
                ? 'bg-white/10 text-white border border-white/10' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={activeCategory === cat.filter ? 'text-white' : 'group-hover:text-white transition-colors'}>
              {cat.icon}
            </span>
            <span className="text-sm font-medium">{cat.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}