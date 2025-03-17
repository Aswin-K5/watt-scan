
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import IndexPage from './pages/IndexPage';
import ScanPage from './pages/ScanPage';
import CalculationPage from './pages/CalculationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/calculation" element={<CalculationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
