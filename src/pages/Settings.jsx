import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SettingsSidebar from '../components/SettingsSidebar';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DEFAULTS = {
    theme: 'dark', // 'dark' | 'light'
    defaultLanguage: 'JavaScript',
    autosave: true,
    sortOrder: 'newest', // 'newest' | 'oldest' | 'az'
    showLineNumbers: true,
};

export default function Settings() {
    const [settings, setSettings] = useLocalStorage('vault-settings', DEFAULTS);

    useEffect(() => {
        if (settings.theme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    }, [settings.theme]);

    const update = (patch) => setSettings({ ...settings, ...patch });

    const exportSettings = () => {
        const data = JSON.stringify(settings, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vault-settings.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const importSettings = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                setSettings({ ...DEFAULTS, ...parsed });
            } catch (err) {
                    console.error('Invalid settings file', err);
                    alert('Invalid settings file');
                }
        };
        reader.readAsText(file);
    };

    const resetDefaults = () => setSettings(DEFAULTS);

    return (
        <div className="flex min-h-screen">
            <SettingsSidebar />

            <main className="flex-1 p-8 lg:p-12">
                    <div className="mb-6">
                        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                            ← Back to Dashboard
                        </Link>
                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tighter mb-4 italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        Settings Menu
                    </h1>
                <p className="text-gray-400 mb-8 font-mono text-sm tracking-tight">Configure your Vault experience.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div id="appearance" className="glass-card p-6">
                        <h2 className="text-2xl font-bold mb-4">Appearance</h2>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={settings.theme === 'light'}
                                    onChange={(e) => update({ theme: e.target.checked ? 'light' : 'dark' })}
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span>Enable Light Mode</span>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={settings.showLineNumbers}
                                    onChange={(e) => update({ showLineNumbers: e.target.checked })}
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span>Show Line Numbers in Snippets</span>
                            </label>
                        </div>
                    </div>

                    <div id="editor" className="glass-card p-6">
                        <h2 className="text-2xl font-bold mb-4">Editor & Snippets</h2>
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm text-gray-300">Default Language</span>
                                <select
                                    value={settings.defaultLanguage}
                                    onChange={(e) => update({ defaultLanguage: e.target.value })}
                                    className="glass-input max-w-xs"
                                >
                                    <option>JavaScript</option>
                                    <option>TypeScript</option>
                                    <option>React</option>
                                    <option>Python</option>
                                    <option>SQL</option>
                                    <option>CSS</option>
                                </select>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={settings.autosave}
                                    onChange={(e) => update({ autosave: e.target.checked })}
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span>Autosave Snippets</span>
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm text-gray-300">Snippet Sort Order</span>
                                <select
                                    value={settings.sortOrder}
                                    onChange={(e) => update({ sortOrder: e.target.value })}
                                    className="glass-input max-w-xs"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="az">A → Z</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div id="data" className="glass-card p-6">
                        <h2 className="text-2xl font-bold mb-4">Data</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <button onClick={exportSettings} className="bg-white text-obsidian px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200 transition">Export Settings</button>

                                <label className="inline-flex items-center bg-white/5 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10">
                                    <span className="text-sm text-gray-200">Import</span>
                                    <input type="file" accept="application/json" className="hidden" onChange={(e) => importSettings(e.target.files[0])} />
                                </label>
                            </div>

                            <button onClick={resetDefaults} className="bg-red-600 px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition">Reset to Defaults</button>
                        </div>
                    </div>
                </div>

                <div id="advanced" className="mt-6">
                    <div className="glass-card p-6 max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">Advanced</h2>
                        <p className="text-sm text-gray-300">Advanced options and developer tools placeholder.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}