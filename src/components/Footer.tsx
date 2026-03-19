export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-400 font-medium">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <p className="text-base font-serif text-zinc-700 dark:text-zinc-300">Let's Talk.</p>
          <a
            href="mailto:hello.li.emily@gmail.com"
            className="hover:text-brand transition-colours"
          >
            hello.li.emily@gmail.com
          </a>
          <p className="text-xs mt-1">© {new Date().getFullYear()} Emily Li. All rights reserved.</p>
        </div>
        <div className="flex gap-8 uppercase tracking-widest text-xs">
          <a
            href="https://www.linkedin.com/in/helloemerie"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colours"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/hello.emerie/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colours"
          >
            Instagram
          </a>
          <a
            href="https://github.com/hello-em"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colours"
          >
            GitHub
          </a>
          <a
            href="https://www.youtube.com/channel/UC8qOV13AYOR02eJ3H2wx7jw"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colours"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
