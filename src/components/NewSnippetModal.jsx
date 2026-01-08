import { useState } from 'react';
import { X } from 'lucide-react';

export default function NewSnippetModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    language: 'JavaScript',
    code: '',
    tags: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSnippet = {
      ...formData,
      id: Date.now(),
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
    onSave(newSnippet);
    setFormData({ title: '', language: 'JavaScript', code: '', tags: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">New Artifact</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-gray-500 font-bold">Title</label>
            <input 
              required
              className="glass-input" 
              placeholder="e.g. Centering a Div"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-gray-500 font-bold">Language</label>
            <select 
              className="glass-input appearance-none cursor-pointer"
                value={formData.language}
                onChange={e => setFormData({...formData, language: e.target.value})}
            >
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="SQL">SQL</option>
                <option value="CSS">HTML/CSS</option>
                <option value="Utilities">Utilities</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-gray-500 font-bold">Code</label>
            <textarea 
              required
              rows="5"
              className="glass-input font-mono text-sm"
              placeholder="Paste your logic here..."
              value={formData.code}
              onChange={e => setFormData({...formData, code: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-gray-500 font-bold">Tags (comma separated)</label>
            <input 
              className="glass-input" 
              placeholder="ui, animation, helper"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>

          <button type="submit" className="mt-2 bg-white text-obsidian font-bold py-2 rounded-lg hover:bg-gray-200 transition-all">
            Save to Vault
          </button>
        </form>
      </div>
    </div>
  );
}