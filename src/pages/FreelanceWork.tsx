import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const videos = [
  {
    title: 'Client Reel 2023',
    embed: 'https://www.youtube.com/embed/8sHD7BrnRfE',
    description: 'A highlight reel of video editing work from 2023.',
  },
];

export default function FreelanceWork() {
  useEffect(() => {
    document.title = 'Emily Li | Freelance Work';
  }, []);

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-500 hover:text-brand transition-colours mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-brand mb-4">Video Editing</p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Freelance Work</h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed mb-16">
            A collection of freelance video editing projects — social media content, event recaps, and brand
            storytelling for various clients.
          </p>
        </motion.div>

        <div className="space-y-16">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4"
            >
              <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5">
                <iframe
                  src={video.embed}
                  title={video.title}
                  width="100%"
                  height="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium">{video.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
