import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'flex',
    title: 'Flex',
    subtitle: 'Brainstation Diploma Project',
    category: 'UX Case Study',
    description: 'A modern learning platform designed to expose financial literacy with the younger generation through short-form videos.',
    image: '/assets/home-images/Flex.jpg',
    tags: ['UX Research', 'UI Design', 'Prototyping'],
    role: 'Lead UX Designer',
    timeline: '12 Weeks',
    tools: ['Figma', 'Miro', 'Maze'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/flex/Flex-Cover.jpg', caption: 'Flex cover' },
          { type: 'text', content: 'Flex is a fitness platform designed to democratize access to professional fitness guidance. Personal training is often expensive and inaccessible — Flex bridges that gap through a digital-first approach.' },
        ],
      },
      {
        title: 'Research',
        blocks: [
          { type: 'image', url: '/assets/project-img/flex/Flex-PrimaryResearch.jpg', caption: 'Primary research' },
          { type: 'image', url: '/assets/project-img/flex/Flex-SecondaryResearch.jpg', caption: 'Secondary research' },
          { type: 'image', url: '/assets/project-img/flex/Flex-Persona.jpg', caption: 'User persona' },
          { type: 'image', url: '/assets/project-img/flex/Flex-HMW.jpg', caption: 'How might we' },
        ],
      },
      {
        title: 'Design',
        blocks: [
          { type: 'image', url: '/assets/project-img/flex/Flex-ExperienceMap.jpg', caption: 'Experience map' },
          { type: 'image', url: '/assets/project-img/flex/Flex-TaskFlow.jpg', caption: 'Task flow' },
          { type: 'image-grid', urls: ['/assets/project-img/flex/Ex-Sketches-1.jpg', '/assets/project-img/flex/Ex-Sketches-2.jpg'] },
          { type: 'image-grid', urls: ['/assets/project-img/flex/Mid-Fi-1.jpg', '/assets/project-img/flex/Mid-Fi-2.jpg'] },
        ],
      },
      {
        title: 'User Testing',
        blocks: [
          { type: 'image-grid', urls: ['/assets/project-img/flex/Flex-UserTesting1.jpg', '/assets/project-img/flex/Flex-UserTesting2.jpg'] },
        ],
      },
      {
        title: 'UI & Branding',
        blocks: [
          { type: 'image', url: '/assets/project-img/flex/FlexMoodBoard.jpg', caption: 'Mood board' },
          { type: 'image', url: '/assets/project-img/flex/FlexColours.jpg', caption: 'Colour palette' },
          { type: 'image-grid', urls: ['/assets/project-img/flex/FlexType-1.jpg', '/assets/project-img/flex/FlexType-2.jpg'] },
          { type: 'image', url: '/assets/project-img/flex/Flex8Grid.jpg', caption: '8pt grid' },
          { type: 'image', url: '/assets/project-img/flex/Flex-HiFi.jpg', caption: 'Hi-fi screens' },
          { type: 'image-grid', urls: ['/assets/project-img/flex/Flex-MockUp.jpg', '/assets/project-img/flex/Flex-MockUp-2.jpg'] },
          { type: 'image', url: '/assets/project-img/flex/Flex-Marketing.jpg', caption: 'Marketing mockup' },
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
    image: '/assets/home-images/UniversoleFit.png',
    tags: ['E-commerce', 'Optimization', 'User Testing'],
    role: 'UX Designer',
    timeline: '4 Weeks',
    tools: ['Figma', 'Hotjar'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/universolefit/UniversoleFit_Cover.jpg', caption: 'Universole Fit cover' },
          { type: 'text', content: 'Universole Fit saw a high drop-off rate during checkout. The goal was to identify friction points and streamline the path to purchase.' },
        ],
      },
      {
        title: 'Before & After',
        blocks: [
          { type: 'image-grid', urls: ['/assets/project-img/universolefit/Before-1.jpg', '/assets/project-img/universolefit/After-1.jpg'] },
          { type: 'image', url: '/assets/project-img/universolefit/UniversoleFit_Branding.jpg', caption: 'Branding' },
          { type: 'image', url: '/assets/project-img/universolefit/mockup-1.jpg', caption: 'Final mockup' },
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
    description: 'Reimagining one of the most used media consumption app to support the growth of the live streaming boom',
    image: '/assets/home-images/YouTubeRedesign.png',
    tags: ['Redesign', 'Visual Design', 'Interaction'],
    role: 'Product Designer',
    timeline: '6 Weeks',
    tools: ['Figma', 'Principle'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/youtuberedesign/YouTube_Cover.png', caption: 'YouTube Redesign cover' },
          { type: 'text', content: "YouTube's interface has become cluttered over years of feature additions. This project focused on decluttering the viewing experience while maintaining discoverability for power users." },
        ],
      },
      {
        title: 'Research',
        blocks: [
          { type: 'image', url: '/assets/project-img/youtuberedesign/youtube-interview.jpg', caption: 'User interviews' },
          { type: 'image', url: '/assets/project-img/youtuberedesign/youtube-beforeafter-1.jpg', caption: 'Before & after analysis' },
        ],
      },
      {
        title: 'Design',
        blocks: [
          { type: 'image', url: '/assets/project-img/youtuberedesign/youtube-lofi-1.png' },
          { type: 'image', url: '/assets/project-img/youtuberedesign/youtube-lofi-2.png' },
          { type: 'image-grid', urls: ['/assets/project-img/youtuberedesign/youtube-lofi-3.jpg', '/assets/project-img/youtuberedesign/youtube-lofi-4.jpg'] },
          { type: 'image', url: '/assets/project-img/youtuberedesign/youtube_power_shorts.jpg', caption: 'Power Shorts feature' },
          { type: 'image', url: '/assets/project-img/youtuberedesign/youtube_3d.jpg', caption: 'Final 3D mockup' },
        ],
      },
    ],
    reflection:
      'Redesigning a platform used by billions is a humbling exercise. It forced me to consider accessibility and muscle memory in ways I had not before.',
  },
  {
    id: 'freelance-work',
    title: 'Freelance Video Edits',
    subtitle: 'Side Work',
    category: 'Video/Photo Editing & For Fun',
    description: 'A collection of freelance video editing projects spanning social media content, event recaps, and brand storytelling.',
    image: '/assets/home-images/freelance-work.png',
    tags: ['Video/Photo Editing', 'Social Media'],
    role: 'Fun Side Hustle',
    timeline: 'Ongoing since Aug 2021',
    tools: ['Premiere Pro', 'After Effects', 'Audition', 'Photoshop', 'Lightroom'],
    sections: [
      {
        title: 'Photography',
        blocks: [
          { type: 'text', content: 'I have done family photoshoots and photo editing for friends and relatives occassionally.' },
          { type: 'video', url: 'https://www.youtube.com/embed/WhqAcCzSAFY', caption: 'Work with me editing family portraits' },
        ],
      },
      {
        title: 'Video Editing',
        blocks: [
          { type: 'text', content: "Here are some freelance videos I've edited for clients." },
          { type: 'instagram-embed', url: 'https://www.instagram.com/p/DUtPZI5git6/', caption: 'Latest reel' },
          { type: 'video', url: 'https://www.youtube.com/embed/CcufneryzvI', caption: 'Watching my friends play Valo #shorts' },
          { type: 'video', url: 'https://www.youtube.com/embed/eMA4mnuzrqI', caption: 'Welcome to Gryphon Nova by Gryphon Development' },
          { type: 'video', url: 'https://www.youtube.com/embed/y34tBvGg0wY', caption: 'Just West by Sightline Properties' },
          { type: 'video', url: 'https://www.youtube.com/embed/PxTqI6I5ImY', caption: 'Claridge House at Oakridge by Polygon' },
          { type: 'video', url: 'https://www.youtube.com/embed/cWEqlRucQv0', caption: 'Artesia by Qualex Landmark in Burnaby Metrotown' },
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
    description: 'A community-driven app for local contractors and home owners.',
    image: '/assets/home-images/Sawyer.png',
    tags: ['UX/UI', 'Branding'],
    role: 'UI/UX Designer',
    timeline: '1 Semester',
    tools: ['Figma', 'Illustrator'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/sawyer/Sawyer_Cover.png', caption: 'Sawyer cover' },
          { type: 'text', content: 'Local artisans often struggle to find a dedicated platform to showcase their work and connect with local buyers without high platform fees.' },
        ],
      },
      {
        title: 'Branding',
        blocks: [
          { type: 'image', url: '/assets/project-img/sawyer/sawyer-2.svg' },
          { type: 'image', url: '/assets/project-img/sawyer/sawyer-3.svg' },
          { type: 'image', url: '/assets/project-img/sawyer/sawyer-4.svg', caption: 'Brand identity' },
        ],
      },
      {
        title: 'Design Process',
        blocks: [
          { type: 'image-grid', urls: ['/assets/project-img/sawyer/sawyer-lofi-brainstorm-1.png', '/assets/project-img/sawyer/sawyer-lofi-brainstorm-2.png'] },
          { type: 'image', url: '/assets/project-img/sawyer/sawyer-1.png' },
          { type: 'image', url: '/assets/project-img/sawyer/sawyer-5.png' },
          { type: 'image-grid', urls: ['/assets/project-img/sawyer/sawyer-6.png', '/assets/project-img/sawyer/sawyer-7.png'] },
          { type: 'image-grid', urls: ['/assets/project-img/sawyer/sawyer-8.png', '/assets/project-img/sawyer/sawyer-12.png'] },
          { type: 'image', url: '/assets/project-img/sawyer/sawyer-13.png', caption: 'Final screens' },
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
    image: '/assets/home-images/nodus.png',
    tags: ['Medical Device', 'Biofeedback', 'Research'],
    role: 'Product Designer',
    timeline: '1 Semester',
    tools: ['Figma', 'Arduino', 'Miro'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/nodus/Nodus_Cover.png', caption: 'Nodus cover' },
          { type: 'text', content: 'Nodus is a wearable device and companion app designed to help PTSD patients recognize and manage stress responses through real-time biofeedback.' },
        ],
      },
      {
        title: 'Process',
        blocks: [
          { type: 'image-grid', urls: ['/assets/project-img/nodus/nodus-1.png', '/assets/project-img/nodus/nodus-2.png'] },
          { type: 'image-grid', urls: ['/assets/project-img/nodus/nodus-3.png', '/assets/project-img/nodus/nodus-4.png'] },
          { type: 'image-grid', urls: ['/assets/project-img/nodus/nodus-5.png', '/assets/project-img/nodus/nodus-6.png'] },
          { type: 'image', url: '/assets/project-img/nodus/nodus-7.png', caption: 'Final prototype' },
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
    image: '/assets/home-images/TDMySpend.png',
    tags: ['FinTech', 'Redesign', 'Mobile'],
    role: 'UX Designer',
    timeline: '6 Weeks',
    tools: ['Figma', 'Maze'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/tdmyspend/TDMySpend_Cover.png', caption: 'TD MySpend cover' },
          { type: 'text', content: "TD MySpend's existing interface lacked clarity for young adult users trying to understand their spending habits. This redesign focused on surfacing actionable insights." },
        ],
      },
      {
        title: 'Process',
        blocks: [
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_01.png' },
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_02.png' },
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_03.png' },
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_04.png' },
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_05.png' },
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_06.png' },
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_07.png' },
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_08.png' },
          { type: 'image', url: '/assets/project-img/tdmyspend/TD_Project_Page_09.png' },
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
    image: '/assets/home-images/GroceryVan.png',
    tags: ['Sustainability', 'Mobile App', 'E-commerce'],
    role: 'UI/UX Designer',
    timeline: '1 Semester',
    tools: ['Figma', 'Miro'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/grocery-van/GroceryVan_Cover.png', caption: 'GroceryVan cover' },
          { type: 'text', content: 'GroceryVan connects consumers with surplus produce from local farms, reducing food waste while providing affordable fresh groceries.' },
        ],
      },
      {
        title: 'Process',
        blocks: [
          { type: 'image-grid', urls: ['/assets/project-img/grocery-van/grocery-van-1.png', '/assets/project-img/grocery-van/grocery-van-2.png'] },
          { type: 'image-grid', urls: ['/assets/project-img/grocery-van/grocery-van-3.png', '/assets/project-img/grocery-van/grocery-van-4.png'] },
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
    image: '/assets/home-images/FindingYou.png',
    tags: ['Mental Health', 'Mobile App', 'Journaling'],
    role: 'UX/UI Designer',
    timeline: '4 Weeks',
    tools: ['Figma'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/finding-you/FindingYou_Cover.png', caption: 'Finding You cover' },
          { type: 'text', content: 'Finding You is a mental wellness app that guides users through structured self-reflection exercises to help them reconnect with their values and goals.' },
        ],
      },
      {
        title: 'Process',
        blocks: [
          { type: 'image-grid', urls: ['/assets/project-img/finding-you/finding-you-1.jpg', '/assets/project-img/finding-you/finding-you-2.jpg'] },
          { type: 'image-grid', urls: ['/assets/project-img/finding-you/finding-you-3.jpg', '/assets/project-img/finding-you/finding-you-4.jpg'] },
          { type: 'image-grid', urls: ['/assets/project-img/finding-you/finding-you-5.jpg', '/assets/project-img/finding-you/finding-you-6.jpg'] },
          { type: 'image-grid', urls: ['/assets/project-img/finding-you/finding-you-7.jpg', '/assets/project-img/finding-you/finding-you-8.jpg'] },
          { type: 'image-grid', urls: ['/assets/project-img/finding-you/finding-you-9.png', '/assets/project-img/finding-you/finding-you-10.png'] },
          { type: 'image-grid', urls: ['/assets/project-img/finding-you/finding-you-11.png', '/assets/project-img/finding-you/finding-you-12.png'] },
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
    image: '/assets/home-images/Jett.png',
    tags: ['Travel', 'Mobile App', 'AI'],
    role: 'UI/UX Designer',
    timeline: '3 Weeks',
    tools: ['Figma'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/jett/Jett_Cover.png', caption: 'Jett cover' },
          { type: 'text', content: 'Jett is a travel planning app that combines AI-powered itinerary suggestions with collaborative planning tools for solo and group travellers.' },
        ],
      },
      {
        title: 'Process',
        blocks: [
          { type: 'image', url: '/assets/project-img/jett/Jett_Behind.png', caption: 'Behind the scenes' },
          { type: 'image-grid', urls: ['/assets/project-img/jett/Final - Poster.png', '/assets/project-img/jett/Final - Prop Poster.png'] },
          { type: 'image', url: '/assets/project-img/jett/Kunai.png', caption: 'Character design' },
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
    image: '/assets/home-images/TicTacToe.png',
    tags: ['JavaScript', 'HTML/CSS', 'Game'],
    role: 'Developer',
    timeline: '1 Week',
    tools: ['VS Code', 'JavaScript'],
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'image', url: '/assets/project-img/tictactoe/TicTacToe_Cover.png', caption: 'Tic Tac Toe cover' },
          { type: 'text', content: 'A classic Tic Tac Toe game built from scratch with vanilla JavaScript. This project was a hands-on exercise in DOM manipulation, game state management, and clean UI design.' },
        ],
      },
      {
        title: 'Process',
        blocks: [
          { type: 'image', url: '/assets/project-img/tictactoe/Final_Poster.png', caption: 'Final poster' },
          { type: 'image', url: '/assets/project-img/tictactoe/moodboard.png', caption: 'Mood board' },
          { type: 'image-grid', urls: ['/assets/project-img/tictactoe/sketch1.png', '/assets/project-img/tictactoe/sketch2.png'] },
          { type: 'image-grid', urls: ['/assets/project-img/tictactoe/process1.png', '/assets/project-img/tictactoe/final-1.png'] },
          { type: 'image-grid', urls: ['/assets/project-img/tictactoe/final-2.png', '/assets/project-img/tictactoe/final-3.png'] },
          { type: 'image-grid', urls: ['/assets/project-img/tictactoe/final-4.png', '/assets/project-img/tictactoe/final-5.png'] },
          { type: 'image', url: '/assets/project-img/tictactoe/final-6.png', caption: 'Final result' },
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
