import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsSidebar() {
  return (
    <aside className="w-64 h-screen sticky top-0 p-4 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-obsidian rotate-45"></div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">Settings</h3>
          <span className="text-xs text-gray-400 font-mono">Preferences</span>
        </div>
      </div>
 
      <nav className="flex flex-col gap-2 mt-4">
        <a href="#appearance" className="px-3 py-2 rounded hover:bg-white/5 text-gray-200">Appearance</a>
        <a href="#editor" className="px-3 py-2 rounded hover:bg-white/5 text-gray-200">Editor & Snippets</a>
        <a href="#data" className="px-3 py-2 rounded hover:bg-white/5 text-gray-200">Data</a>
        <a href="#advanced" className="px-3 py-2 rounded hover:bg-white/5 text-gray-200">Advanced</a>
      </nav> 

      <div className="mt-auto">
        <button className="bg-white text-obsidian px-3 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200 transition w-full">Manage Account</button>
      </div>
    </aside>
  );
}
