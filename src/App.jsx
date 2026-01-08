import { useState } from 'react';
import Sidebar from './components/Sidebar';
import SnippetCard from './components/SnippetCard';
import NewSnippetModal from './components/NewSnippetModal'; // 1. Import
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialSnippets } from './data/initialData';

function App() {
  const [snippets, setSnippets] = useLocalStorage('vault-snippets', initialSnippets);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // 2. State for Modal

  const handleAddSnippet = (newSnippet) => {
    setSnippets([newSnippet, ...snippets]); // 3. Use setSnippets! (Warning gone)
  };

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <input 
            type="text" 
            placeholder="Search your vault..." 
            className="glass-input w-96 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsModalOpen(true)} // 4. Open Modal
            className="bg-white text-obsidian px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
          >
            + New Snippet
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSnippets.map(snippet => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </main>

      {/* 5. The Modal Component */}
      <NewSnippetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddSnippet}
      />
    </div>
  );
}

export default App;