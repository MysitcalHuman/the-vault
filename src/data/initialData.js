export const initialSnippets = [
  {
    id: '1',
    title: "Glassmorphism Card Effect",
    language: "HTML/CSS",
    code: ".glass-card {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 1rem;\n  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);\n}",
    tags: ["ui", "design", "css"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: "React LocalStorage Hook",
    language: "JavaScript",
    code: "function useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    const item = window.localStorage.getItem(key);\n    return item ? JSON.parse(item) : initialValue;\n  });\n\n  const setValue = (value) => {\n    setStoredValue(value);\n    window.localStorage.setItem(key, JSON.stringify(value));\n  };\n\n  return [storedValue, setValue];\n}",
    tags: ["react", "hooks", "storage"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: "Express Middleware Logger",
    language: "JavaScript",
    code: "const logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);\n  next();\n};\n\napp.use(logger);",
    tags: ["backend", "express", "node"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: "Tailwind Grid Layout",
    language: "HTML/CSS",
    code: "<div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">\n  {items.map(item => (\n    <div key={item.id} className=\"p-4 bg-obsidian border border-white/10\">\n      {item.content}\n    </div>\n  ))}\n</div>",
    tags: ["ui", "tailwind", "layout"],
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date().toISOString()
  }
];