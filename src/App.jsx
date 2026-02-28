import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { Suspense, lazy } from 'react';

const Updates = lazy(() => import('./pages/Updates'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="p-4 text-center text-gray-300">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;