import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import FloatingScrollToTop from './components/FloatingScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';
import FreelanceWork from './pages/FreelanceWork';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <CustomCursor />
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#fdfdfd] text-black dark:bg-[#0d1117] dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300 font-sans">
          {/* Sidebar + page content sit side-by-side; footer is outside so it spans full width */}
          <div className="flex flex-1">
            {/* Navbar renders the sticky sidebar on desktop, top bar on mobile */}
            <Navbar />
            <main className="flex-1 min-w-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/freelance" element={<FreelanceWork />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
          </div>
          {/* Footer is outside the flex row — spans the full page width */}
          <Footer />
          <FloatingScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  );
}
