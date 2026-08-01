import { useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import FloatingScrollToTop from './components/FloatingScrollToTop';
import LetterPhysics, { SpawnPayload } from './components/LetterPhysics';
import Home from './pages/Home';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';
import FreelanceWork from './pages/FreelanceWork';
import NotFound from './pages/NotFound';

// Layout wrapper — shared nav/footer for all real pages
function MainLayout({
  onSubmitMessage,
  registerSpawn,
}: {
  onSubmitMessage: (letters: SpawnPayload[]) => void;
  registerSpawn: (fn: (letters: SpawnPayload[]) => void) => void;
}) {
  return (
    <>
      <LetterPhysics registerSpawn={registerSpawn} />
      <div className="min-h-screen flex flex-col bg-[#fdfdfd] text-black dark:bg-[#0d1117] dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300 font-sans">
        <Navbar onSubmitMessage={onSubmitMessage} />
        <div className="flex flex-col min-h-screen md:pl-[18rem]">
          <main className="flex-1 min-w-0">
            {/* Child routes render here */}
            <Outlet />
          </main>
          <Footer />
        </div>
        <FloatingScrollToTop />
      </div>
    </>
  );
}

export default function App() {
  const spawnRef = useRef<((letters: SpawnPayload[]) => void) | null>(null);

  const registerSpawn = useCallback((fn: (letters: SpawnPayload[]) => void) => {
    spawnRef.current = fn;
  }, []);

  const handleSubmitMessage = useCallback((letters: SpawnPayload[]) => {
    spawnRef.current?.(letters);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <CustomCursor />
        <ScrollToTop />
        <Routes>
          {/* All real pages share the MainLayout (nav + footer + sidebar) */}
          <Route
            element={
              <MainLayout
                onSubmitMessage={handleSubmitMessage}
                registerSpawn={registerSpawn}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/freelance" element={<FreelanceWork />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Route>

          {/* 404 — standalone, no nav/footer, only matches unknown URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
