import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SnippetCard from '../components/SnippetCard';
import NewSnippetModal from '../components/NewSnippetModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialSnippets } from '../data/initialData';

function StatCard({ title, value, color }) {
  return (
    <div className="glass-card p-4 flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{title}</span>
      <span className={`text-2xl font-mono font-bold ${color}`}>{value}</span>
    </div>
  );
}

function getMostUsedLanguage(snippets) {
  if (snippets.length === 0) return "N/A";
  const counts = snippets.reduce((acc, s) => {
    acc[s.language] = (acc[s.language] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

function Dashboard() {
  const [snippets, setSnippets] = useLocalStorage('vault-snippets', initialSnippets);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null); // Track what we are editing

  const handleSaveSnippet = (snippetData) => {
    if (editingSnippet) {
      // UPDATE: Find the existing snippet by ID and replace its data
      setSnippets(snippets.map(s => s.id === editingSnippet.id ? snippetData : s));
      setEditingSnippet(null); 
    } else {
      // CREATE: Standard add to top
      setSnippets([snippetData, ...snippets]);
    }
    setIsModalOpen(false);
  };

  const openEditModal = (snippet) => {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  };

  const handleDeleteSnippet = (id) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };

  const filteredSnippets = snippets.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.language.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.language === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <h1 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-1">
              Active Archive / {activeCategory}
            </h1>
            <input 
              type="text" 
              placeholder="Search your vault..." 
              className="glass-input w-96 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => {
              setEditingSnippet(null); // Ensure we aren't "editing" when making a new one
              setIsModalOpen(true);
            }}
            className="bg-white text-obsidian px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
          >
            + New Snippet
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <StatCard title="Total Artifacts" value={snippets.length} color="text-white" />
          <StatCard 
            title="Languages" 
            value={[...new Set(snippets.map(s => s.language))].length} 
            color="text-blue-400" 
          />
          <StatCard 
            title="Most Used" 
            value={getMostUsedLanguage(snippets)} 
            color="text-purple-400" 
          />
          <StatCard title="Storage" value="Local" color="text-green-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSnippets.map(snippet => (
            <SnippetCard 
              key={snippet.id} 
              snippet={snippet} 
              onDelete={handleDeleteSnippet}
              onEdit={openEditModal} // Pass the edit function down
            />
          ))}
        </div>
        
        {filteredSnippets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-500 italic font-mono">Archive Empty for this Sector.</p>
          </div>
        )}
      </main>

      <NewSnippetModal 
        key={editingSnippet ? editingSnippet.id : 'new'} // This forces a fresh start
        isOpen={isModalOpen} 
        editingSnippet={editingSnippet}
        onClose={() => {
        setIsModalOpen(false);
        setEditingSnippet(null);
      }} 
      onSave={handleSaveSnippet} 
      />
    </div>
  );
}

export default Dashboard;