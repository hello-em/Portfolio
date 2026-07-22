import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { featuredProjects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const WORDS = ['designer}', 'creator;', 'dreamer.'];
const TYPE_SPEED = 90;   // ms per character typed
const DELETE_SPEED = 55; // ms per character deleted
const PAUSE_AFTER_TYPE = 1800; // ms to hold the full word
const PAUSE_AFTER_DELETE = 400; // ms to pause before typing next word

function useTypingEffect(words: string[]) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = words[wordIndex];

    const tick = () => {
      if (!isDeleting) {
        // Still typing
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
          timeoutRef.current = setTimeout(tick, TYPE_SPEED);
        } else {
          // Word fully typed — pause then start deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        }
      } else {
        // Deleting
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
          timeoutRef.current = setTimeout(tick, DELETE_SPEED);
        } else {
          // Fully deleted — move to next word
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, wordIndex, words]);

  return displayed;
}

export default function Home() {
  const typedWord = useTypingEffect(WORDS);

  return (
    <main className="pt-20 md:pt-16 pb-20 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Hero */}
        <section className="mb-20 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(2.2rem,6vw,4.4rem)] font-serif leading-[1.05] tracking-tight mb-6">
              I am a{' '}
              {/* Typed word + blinking cursor */}
              <span className="inline-block min-w-[2ch]">
                <span className="font-kandi">{typedWord}</span>
                <span className="inline-block w-[3px] h-[0.85em] bg-brand align-middle ml-[2px] animate-[blink_1s_step-end_infinite]" />
              </span>
              <br />
              <span className="italic text-zinc-400 dark:text-zinc-600">
                in UX &amp; UI design, video editing,<br/>and more
              </span>
            </h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-m leading-relaxed">
              Based in Vancouver, BC.<br/> A graduate from Simon Fraser University(SIAT) and Brainstation UX Design.
            </p>
          </motion.div>
        </section>

        {/* Featured projects */}
        <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>
      </div>
    </main>
  );
}
