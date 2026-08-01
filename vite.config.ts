import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// All the old portfolio HTML files that need to be copied into dist/
const oldPortfolioFiles = [
  'old_portfolio.html',
  'archive.html',
  'about.html',
  'Flex.html',
  'Sawyer.html',
  'Jett.html',
  'Nodus.html',
  'TDMySpend.html',
  'TicTacToe.html',
  'GroceryVan.html',
  'FindingYou.html',
  'UniversoleFit.html',
  'YouTubeRedesign.html',
  'freelance-work.html',
].map((file) => ({ src: file, dest: '.' }));

// Old portfolio asset folders — CSS, JS, and fonts needed by the old HTML pages
const oldPortfolioAssets = [
  { src: 'assets/css', dest: 'assets' },
  { src: 'assets/js',  dest: 'assets' },
  { src: 'assets/fonts', dest: 'assets' },
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [...oldPortfolioFiles, ...oldPortfolioAssets],
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    historyApiFallback: true,
  },
});
