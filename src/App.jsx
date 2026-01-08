import { useState } from 'react';
import Sidebar from './components/Sidebar';
import SnippetCard from './components/SnippetCard';
import NewSnippetModal from './components/NewSnippetModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialSnippets } from './data/initialData';

function App() {
  const [snippets, setSnippets] = useLocalStorage('vault-snippets', initialSnippets);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All'); // New State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteSnippet = (id) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };

  const handleAddSnippet = (newSnippet) => {
    setSnippets([newSnippet, ...snippets]);
  };

  // The Ultimate Filter Logic
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
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-obsidian px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
          >
            + New Snippet
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSnippets.map(snippet => (
            <SnippetCard 
              key={snippet.id} 
              snippet={snippet} 
              onDelete={handleDeleteSnippet}
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
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddSnippet}
      />
    </div>
  );
}

export default App;