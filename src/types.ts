export type ProjectBlock =
  | { type: 'text'; content: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'image-grid'; urls: string[] }
  | { type: 'figma-embed'; url: string; caption?: string }
  | { type: 'video'; url: string; caption?: string; poster?: string }
  | { type: 'instagram-embed'; url: string; caption?: string };

export interface ProjectSection {
  title: string;
  blocks: ProjectBlock[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  role: string;
  timeline: string;
  tools?: string[];
  sections: ProjectSection[];
  reflection: string;
  figmaUrl?: string;
}
