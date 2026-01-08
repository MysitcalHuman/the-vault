import { useState } from 'react';
import { X } from 'lucide-react';

export default function NewSnippetModal({ isOpen, onClose, onSave, editingSnippet }) {
  // We initialize state directly from the prop. 
  // Because of the 'key' in Dashboard, this resets automatically!
  const [formData, setFormData] = useState({
    title: editingSnippet?.title || '',
    language: editingSnippet?.language || 'JavaScript',
    code: editingSnippet?.code || '',
    tags: editingSnippet?.tags.join(', ') || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const snippetData = {
      ...formData,
      // Keep existing ID if editing, otherwise generate new one
      id: editingSnippet ? editingSnippet.id : Date.now(),
      // Clean up tags: remove empty spaces and empty strings
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t !== '')
    };
    onSave(snippetData);
    // Modal closure and reset is handled by the parent's onClose and the useEffect above
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Added max-h-screen and overflow-y-auto to ensure the modal is usable on small laptops */}
      <div className="glass-card w-full max-w-lg p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase italic tracking-tight text-white">
            {editingSnippet ? 'Update Artifact' : 'New Artifact'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Title</label>
            <input 
              required
              className="glass-input" 
              placeholder="e.g. Centering a Div"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Language</label>
            <div className="relative">
              <select 
                className="glass-input appearance-none cursor-pointer w-full"
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
              {/* Optional: Add a chevron icon here since appearance-none hides the default one */}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Code</label>
            <textarea 
              required
              rows="8"
              className="glass-input font-mono text-sm leading-relaxed"
              placeholder="Paste your logic here..."
              value={formData.code}
              onChange={e => setFormData({...formData, code: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Tags (comma separated)</label>
            <input 
              className="glass-input" 
              placeholder="ui, animation, helper"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="mt-2 bg-white text-obsidian font-bold py-3 rounded-lg hover:bg-gray-200 transition-all active:scale-[0.98]"
          >
            {editingSnippet ? 'Update Changes' : 'Save to Vault'}
          </button>
        </form>
      </div>
    </div>
  );
}