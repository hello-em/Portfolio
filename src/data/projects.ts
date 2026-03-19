import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'flex',
    title: 'Flex',
    subtitle: 'Brainstation Diploma Project',
    category: 'UX Case Study',
    description: 'A comprehensive fitness platform designed to bridge the gap between personal trainers and clients.',
    image: '/assets/images/home-images/Flex.jpg',
    tags: ['UX Research', 'UI Design', 'Prototyping'],
    role: 'Lead UX Designer',
    timeline: '12 Weeks',
    tools: ['Figma', 'Miro', 'Maze'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'Flex is a fitness platform designed to democratize access to professional fitness guidance. Personal training is often expensive and inaccessible — Flex bridges that gap through a digital-first approach.',
          },
          { type: 'image', url: '/assets/images/project-img/flex-overview.png', caption: 'Flex app overview' },
        ],
      },
    ],
    reflection:
      'This project taught me the importance of balancing business goals with user empathy. Switching our focus to the "intimidated beginner" persona helped us unlock the true value of the micro-session concept.',
  },
  {
    id: 'universole-fit',
    title: 'Universole Fit',
    subtitle: 'Short-Term Contracted Job',
    category: 'UX Design',
    description: 'Optimizing the e-commerce experience for a specialized footwear retailer.',
    image: '/assets/images/home-images/UniversoleFit.png',
    tags: ['E-commerce', 'Optimization', 'User Testing'],
    role: 'UX Designer',
    timeline: '4 Weeks',
    tools: ['Figma', 'Hotjar'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'Universole Fit saw a high drop-off rate during checkout. The goal was to identify friction points and streamline the path to purchase.',
          },
          { type: 'image', url: '/assets/images/project-img/universolefit-overview.png', caption: 'Universole Fit redesign' },
        ],
      },
    ],
    reflection:
      'Working on a tight 4-week timeline required extreme prioritization. Small, data-driven tweaks can have a larger impact than a full visual redesign.',
  },
  {
    id: 'youtube-redesign',
    title: 'YouTube Redesign',
    subtitle: 'Brainstation Certificate Project',
    category: 'UX Case Study',
    description: 'Reimagining the content consumption experience for power users.',
    image: '/assets/images/home-images/YouTubeRedesign.png',
    tags: ['Redesign', 'Visual Design', 'Interaction'],
    role: 'Product Designer',
    timeline: '6 Weeks',
    tools: ['Figma', 'Principle'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: "YouTube's interface has become cluttered over years of feature additions. This project focused on decluttering the viewing experience while maintaining discoverability for power users.",
          },
          { type: 'image', url: '/assets/images/project-img/youtube-overview.png', caption: 'YouTube Redesign concept' },
        ],
      },
    ],
    reflection:
      'Redesigning a platform used by billions is a humbling exercise. It forced me to consider accessibility and muscle memory in ways I had not before.',
  },
  {
    id: 'freelance-work',
    title: 'Freelance Video Edits',
    subtitle: 'Current Side Work',
    category: 'Video Editing',
    description: 'A collection of freelance video editing projects spanning social media content, event recaps, and brand storytelling.',
    image: '/assets/images/home-images/freelance-work.png',
    tags: ['Video Editing', 'Motion', 'Social Media'],
    role: 'Video Editor',
    timeline: 'Ongoing',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'Freelance video editing work covering social media reels, event highlight videos, and brand content for various clients.',
          },
        ],
      },
    ],
    reflection:
      'Freelance work has sharpened my ability to communicate with clients, manage timelines independently, and adapt my style to different brand voices.',
  },
  {
    id: 'sawyer',
    title: 'Sawyer',
    subtitle: 'IAT 334 School Project',
    category: 'App Design',
    description: 'A community-driven app for local artisans and craft enthusiasts.',
    image: '/assets/images/home-images/Sawyer.png',
    tags: ['Community', 'Mobile App', 'Branding'],
    role: 'UI/UX Designer',
    timeline: '1 Semester',
    tools: ['Figma', 'Illustrator'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'Local artisans often struggle to find a dedicated platform to showcase their work and connect with local buyers without high platform fees.',
          },
          { type: 'image', url: '/assets/images/project-img/sawyer-overview.png', caption: 'Sawyer app screens' },
        ],
      },
    ],
    reflection:
      'This was my first time building a brand from scratch alongside the product. It taught me how visual identity and UX must work in tandem to build trust in a marketplace.',
  },
  {
    id: 'nodus',
    title: 'Nodus',
    subtitle: 'IAT 481 Neuroscience Product Design',
    category: 'Product Design',
    description: 'A PTSD medical device and companion app designed to help users manage stress responses through biofeedback.',
    image: '/assets/images/home-images/nodus.png',
    tags: ['Medical Device', 'Biofeedback', 'Research'],
    role: 'Product Designer',
    timeline: '1 Semester',
    tools: ['Figma', 'Arduino', 'Miro'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'Nodus is a wearable device and companion app designed to help PTSD patients recognize and manage stress responses through real-time biofeedback.',
          },
          { type: 'image', url: '/assets/images/project-img/nodus-overview.png', caption: 'Nodus device and app' },
        ],
      },
    ],
    reflection:
      'Designing for a vulnerable user group required deep empathy and careful ethical consideration at every step of the process.',
  },
  {
    id: 'td-myspend',
    title: 'TD MySpend',
    subtitle: 'IAT 334 Existing App Feature Design',
    category: 'UX Case Study',
    description: 'A redesign of TD Bank\'s MySpend feature to improve financial literacy and spending awareness for young adults.',
    image: '/assets/images/home-images/TDMySpend.png',
    tags: ['FinTech', 'Redesign', 'Mobile'],
    role: 'UX Designer',
    timeline: '6 Weeks',
    tools: ['Figma', 'Maze'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: "TD MySpend's existing interface lacked clarity for young adult users trying to understand their spending habits. This redesign focused on surfacing actionable insights.",
          },
          { type: 'image', url: '/assets/images/project-img/tdmyspend-overview.png', caption: 'TD MySpend redesign screens' },
        ],
      },
    ],
    reflection:
      'Working within an existing brand system taught me how to innovate within constraints — a skill that is invaluable in real-world product design.',
  },
  {
    id: 'grocery-van',
    title: 'GroceryVan',
    subtitle: 'IAT 334 School Project',
    category: 'App Design',
    description: 'A grocery delivery app concept focused on reducing food waste by connecting consumers with surplus produce from local farms.',
    image: '/assets/images/home-images/GroceryVan.png',
    tags: ['Sustainability', 'Mobile App', 'E-commerce'],
    role: 'UI/UX Designer',
    timeline: '1 Semester',
    tools: ['Figma', 'Miro'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'GroceryVan connects consumers with surplus produce from local farms, reducing food waste while providing affordable fresh groceries.',
          },
          { type: 'image', url: '/assets/images/project-img/groceryvan-overview.png', caption: 'GroceryVan app screens' },
        ],
      },
    ],
    reflection:
      'This project deepened my understanding of how design can drive sustainable behaviour change without sacrificing usability.',
  },
  {
    id: 'finding-you',
    title: 'Finding You',
    subtitle: 'Personal Project',
    category: 'UX Design',
    description: 'A mental wellness app concept designed to help users reconnect with their sense of self through guided journaling and reflection.',
    image: '/assets/images/project-img/findingyou-cover.png',
    tags: ['Mental Health', 'Mobile App', 'Journaling'],
    role: 'UX/UI Designer',
    timeline: '4 Weeks',
    tools: ['Figma'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'Finding You is a mental wellness app that guides users through structured self-reflection exercises to help them reconnect with their values and goals.',
          },
          { type: 'image', url: '/assets/images/project-img/findingyou-overview.png', caption: 'Finding You app screens' },
        ],
      },
    ],
    reflection:
      'Designing for mental wellness required me to be especially thoughtful about tone, language, and the emotional weight of every interaction.',
  },
  {
    id: 'jett',
    title: 'Jett',
    subtitle: 'Personal Project',
    category: 'App Design',
    description: 'A travel planning app that helps solo travellers build itineraries collaboratively with AI-powered suggestions.',
    image: '/assets/images/home-images/Jett.png',
    tags: ['Travel', 'Mobile App', 'AI'],
    role: 'UI/UX Designer',
    timeline: '3 Weeks',
    tools: ['Figma'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'Jett is a travel planning app that combines AI-powered itinerary suggestions with collaborative planning tools for solo and group travellers.',
          },
          { type: 'image', url: '/assets/images/project-img/jett-overview.png', caption: 'Jett app screens' },
        ],
      },
    ],
    reflection:
      'Exploring AI-assisted UX flows pushed me to think carefully about when automation helps users and when it removes meaningful agency.',
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    subtitle: 'Personal Coding Project',
    category: 'Development',
    description: 'A fully functional Tic Tac Toe game built with vanilla JavaScript, HTML, and CSS as a front-end development exercise.',
    image: '/assets/images/project-img/tictactoe-cover.png',
    tags: ['JavaScript', 'HTML/CSS', 'Game'],
    role: 'Developer',
    timeline: '1 Week',
    tools: ['VS Code', 'JavaScript'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            type: 'text',
            content: 'A classic Tic Tac Toe game built from scratch with vanilla JavaScript. This project was a hands-on exercise in DOM manipulation, game state management, and clean UI design.',
          },
        ],
      },
    ],
    reflection:
      'Building a game from scratch without frameworks gave me a much deeper appreciation for what libraries and frameworks actually solve.',
  },
];

// Featured projects shown on the Home page (in order)
export const featuredProjects = projects.filter(p =>
  ['flex', 'universole-fit', 'youtube-redesign', 'freelance-work', 'sawyer'].includes(p.id)
);

// Archive projects (everything not featured)
export const archiveProjects = projects.filter(p =>
  !['flex', 'universole-fit', 'youtube-redesign', 'freelance-work', 'sawyer'].includes(p.id)
);
