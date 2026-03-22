import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import FloatingScrollToTop from './components/FloatingScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Archive from './pages/Archive';
import ProjectDetail from './pages/ProjectDetail';
import FreelanceWork from './pages/FreelanceWork';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <CustomCursor />
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#fdfdfd] text-black dark:bg-[#0d1117] dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colours duration-300 font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/freelance" element={<FreelanceWork />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              {/* Catch-all redirect to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <FloatingScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  );
}
