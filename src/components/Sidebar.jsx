import { useState } from 'react';
import { Terminal, Code2, Layout, Database, Cpu, Braces, Hash, Globe, Settings } from 'lucide-react';
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

export default function Sidebar({ activeCategory, setActiveCategory, snippets = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const total = snippets.length;
  const languages = [...new Set(snippets.map(s => s.language))].filter(Boolean);

  const visibleCategories = categories.filter(cat => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return cat.name.toLowerCase().includes(q) || (cat.filter && cat.filter.toLowerCase().includes(q));
  });

  return (
    <aside className={`${collapsed ? 'w-28' : 'w-64'} h-screen sticky top-0 p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar transition-width relative`}> 
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'}`}>
        <Link to="/" className={`flex items-center gap-3 px-2 hover:opacity-80 transition-opacity ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-obsidian rotate-45"></div>
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold tracking-tight uppercase italic text-white">The Vault</h2>
                <span className="text-xs text-gray-400 font-mono">Active Archive</span>
              </div>
            )}
        </Link>

        <button onClick={() => setCollapsed(c => !c)} className="p-1 rounded hover:bg-white/5 absolute right-2 top-2 z-20">
          <Layout size={16} className="text-gray-300" />
        </button>
      </div>

      {!collapsed && (
        <div className="glass-card p-3 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => setActiveCategory('All')} className="text-left">
              <div className="text-[10px] text-gray-400 uppercase">Total</div>
              <div className="text-lg font-mono font-bold text-white">{total}</div>
            </button>

            <div>
              <div className="text-[10px] text-gray-400 uppercase">Languages</div>
              <div className="text-lg font-mono font-bold text-blue-400">{languages.length}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {languages.slice(0,6).map(lang => (
              <button
                key={lang}
                onClick={() => { setActiveCategory(lang); }}
                className="text-xs px-2 py-1 rounded bg-white/5 text-gray-200 hover:bg-white/10"
              >
                {lang}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input text-sm w-full"
          />
        </div>
      )}

      

      <nav className="flex flex-col gap-2">
        {visibleCategories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => { setActiveCategory(cat.filter); setSearchQuery(''); }}
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-all group ${
              activeCategory === cat.filter 
                ? 'bg-white/10 text-white border border-white/10' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={activeCategory === cat.filter ? 'text-white' : 'group-hover:text-white transition-colors'}>
              {cat.icon}
            </span>
            {!collapsed && <span className="text-sm font-medium">{cat.name}</span>}
          </button>
        ))}
      </nav>

      {collapsed ? (
        <button
          onClick={() => alert('Settings coming soon!')}
          className="mt-auto p-2 rounded-full hover:bg-white/5 self-center"
          aria-label="Settings"
        >
          <Settings size={18} className="text-gray-200" />
        </button>
      ) : (
        <button
          onClick={() => alert('Settings coming soon!')}
          className="bg-white text-obsidian px-4 py-2 flex items-center justify-center rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
          style={{ marginTop: 'auto' }}
        >
          Settings
        </button>
      )}
    </aside>
  );
}