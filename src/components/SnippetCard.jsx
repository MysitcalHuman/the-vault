import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function SnippetCard({ snippet }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-5 flex flex-col gap-4 group hover:border-white/20 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{snippet.title}</h3>
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{snippet.language}</span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="p-2 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
      </div>
      
      <div className="relative">
        <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto border border-white/5">
          <code className="font-mono text-sm text-blue-300">
            {snippet.code}
          </code>
        </pre>
      </div>

      <div className="flex gap-2">
        {snippet.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10 text-gray-400">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}