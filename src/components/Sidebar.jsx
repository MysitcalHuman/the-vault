import { Terminal, Code2, Database, Layout, Cpu } from 'lucide-react';

const categories = [
  { name: 'All Snippets', icon: <Terminal size={18} /> },
  { name: 'React', icon: <Code2 size={18} /> },
  { name: 'Tailwind', icon: <Layout size={18} /> },
  { name: 'Backend', icon: <Database size={18} /> },
  { name: 'Utilities', icon: <Cpu size={18} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-white/10 p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-obsidian rotate-45"></div>
        </div>
        <h2 className="text-xl font-bold tracking-tight">The Vault</h2>
      </div>

      <nav className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors group"
          >
            <span className="group-hover:text-white transition-colors">{cat.icon}</span>
            <span className="text-sm font-medium">{cat.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}