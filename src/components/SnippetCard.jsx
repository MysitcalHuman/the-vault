import { Trash2, Copy, Pencil } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 1. Added onEdit to the props here
export default function SnippetCard({ snippet, onDelete, onEdit }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
  };

  return (
    <div className="glass-card p-6 group flex flex-col gap-4 relative">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {snippet.title}
          </h3>
          <div className="flex gap-2">
            <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/10 uppercase">
              {snippet.language}
            </span>
          </div>
        </div>
        
        {/* Button Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
            title="Copy Code"
          >
            <Copy size={16} />
          </button>
          
          <button 
            onClick={() => onEdit(snippet)}
            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-blue-400 transition-all"
            title="Edit Snippet"
          >
            <Pencil size={16} />
          </button>

          <button 
            onClick={() => onDelete(snippet.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-all"
            title="Delete Snippet"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-white/5">
        <SyntaxHighlighter
          // Helper: ensures language is valid for the highlighter
          language={snippet.language === 'HTML/CSS' ? 'css' : snippet.language.toLowerCase()}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            fontSize: '0.875rem',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            minHeight: '160px',
            maxHeight: '300px',
          }}
          className="custom-scrollbar"
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {snippet.tags.map(tag => (
          <span key={tag} className="text-[10px] text-gray-500 font-mono">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}