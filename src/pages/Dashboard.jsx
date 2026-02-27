import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SnippetCard from '../components/SnippetCard';
import NewSnippetModal from '../components/NewSnippetModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialSnippets } from '../data/initialData';

function StatCard({ title, value, color }) {
  return (
    <div className="glass-card p-3 flex flex-col gap-1 items-start">
      <span className="text-[10px] uppercase tracking-[0.16em] text-gray-400 font-semibold">{title}</span>
      <span className={`text-lg font-mono font-bold ${color}`}>{value}</span>
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
  const [activeTag, setActiveTag] = useState(null);

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
    const matchesTag = !activeTag || s.tags.includes(activeTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} snippets={snippets} />

      <main className="flex-1 p-8 lg:p-12">
        {/* Header: title left, controls right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold font-mono text-white">Vault</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your vault..."
                className="glass-input w-72 md:w-96 text-sm pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">✕</button>
              )}
            </div>

            <button
              onClick={() => { setEditingSnippet(null); setIsModalOpen(true); }}
              className="bg-white text-obsidian px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
            >
              + New Snippet
            </button>
          </div>
        </div>

        {/* Toolbar: stats left, filters/right controls */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3 w-full lg:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              <StatCard title="Most Used" value={getMostUsedLanguage(snippets)} color="text-purple-400" />
              <StatCard title="Storage Type" value="Local" color="text-green-400" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {(activeTag || activeCategory !== 'All' || searchQuery) && (
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-mono font-semibold">{filteredSnippets.length} Artifacts Found{activeTag && <span className="text-blue-300 ml-1">#{activeTag}</span>}</span>
              </div>
            )}

            {(activeTag || activeCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => { setActiveTag(null); setActiveCategory('All'); setSearchQuery(''); }}
                className="bg-white text-obsidian px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Snippets grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSnippets.map(snippet => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onDelete={handleDeleteSnippet}
                onEdit={openEditModal}
                onTagClick={(clickedTag) => setActiveTag(prev => prev === clickedTag ? null : clickedTag)}
              />
            ))}
          </div>

          {filteredSnippets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-gray-400 italic font-mono">No artifacts match the current filters.</p>
            </div>
          )}
        </section>

        <NewSnippetModal
          key={editingSnippet ? editingSnippet.id : 'new'}
          isOpen={isModalOpen}
          editingSnippet={editingSnippet}
          onClose={() => { setIsModalOpen(false); setEditingSnippet(null); }}
          onSave={handleSaveSnippet}
        />
      </main>
    </div>
  );
}

export default Dashboard;