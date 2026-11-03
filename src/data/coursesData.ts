export interface Course {
  id: string;
  title: string;
  category: 'Art & Design' | 'Marketing' | 'Web Development' | 'Networking';
  fee: number;
  originalFee: number;
  duration: string;
  lectures: number;
  projects: number;
  seatsRemaining: number;
  batchDate: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  thumbnail: string;
  skills: string[];
  tools: string[];
  modules: { title: string; topics: string[] }[];
  instructor: {
    name: string;
    role: string;
    experience: string;
  };
}

export const COURSES: Course[] = [
  {
    id: 'graphic-design-freelancing',
    title: 'Graphic Design for Freelancing',
    category: 'Art & Design',
    fee: 10000,
    originalFee: 15000,
    duration: '3 Months (24 Classes)',
    lectures: 24,
    projects: 8,
    seatsRemaining: 6,
    batchDate: 'Nov 18, 2026',
    badge: 'Popular for Freelancers',
    rating: 4.9,
    reviewsCount: 342,
    thumbnail: '/src/assets/images/course_art_design_1793689258048.jpg',
    description: 'Master Photoshop, Illustrator, and InDesign with direct marketplace account setup (Fiverr, Upwork) and real client portfolio creation.',
    skills: ['Logo & Brand Identity', 'Social Media Creatives', 'Print Media Design', 'Fiverr Marketplace Strategy', 'Packaging & Mockups'],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva Pro'],
    modules: [
      {
        title: 'Module 1: Design Principles & Adobe Illustrator Mastery',
        topics: ['Color theory & typography anatomy', 'Pen tool precision & vector illustration', 'Logo design process & client brief breakdown', 'Iconography and geometric shapes']
      },
      {
        title: 'Module 2: Adobe Photoshop Photo Manipulation & Social Media',
        topics: ['Layer masking & clipping path techniques', 'Photo retouching & color grading', 'Commercial social media carousel designs', 'Banner ads & YouTube thumbnails']
      },
      {
        title: 'Module 3: Commercial Print Design & InDesign Layouts',
        topics: ['Business cards, letterheads & brand stationery', 'Tri-fold brochures & corporate profiles', 'Print-ready bleed, CMYK and export settings']
      },
      {
        title: 'Module 4: Freelance Marketplace Setup & Order Delivery',
        topics: ['Fiverr gig creation & keyword SEO', 'Portfolio setup on Behance and Dribbble', 'Client communication & dispute handling', 'International payment gateway setup']
      }
    ],
    instructor: {
      name: 'Tanvir Hossain',
      role: 'Top-Rated Freelancer & Senior Art Director',
      experience: '8+ Years in Brand Identity & 1000+ Completed Orders'
    }
  },
  {
    id: 'fullstack-web-development-mern',
    title: 'Full-Stack Web Development (MERN)',
    category: 'Web Development',
    fee: 15000,
    originalFee: 22000,
    duration: '4 Months (36 Classes)',
    lectures: 36,
    projects: 6,
    seatsRemaining: 4,
    batchDate: 'Nov 20, 2026',
    badge: 'High In-Demand',
    rating: 4.95,
    reviewsCount: 428,
    thumbnail: '/src/assets/images/course_web_dev_1793689260890.jpg',
    description: 'Build robust web applications from scratch with React, Node.js, Express, and MongoDB. Includes REST APIs, authentication, and deployment.',
    skills: ['Modern JavaScript (ES6+)', 'React 19 & Tailwind CSS', 'Node.js & Express REST APIs', 'MongoDB Atlas & JWT Auth', 'Cloud Deployment & Git'],
    tools: ['React', 'Node.js', 'Express', 'MongoDB', 'Postman', 'Git & GitHub', 'Vercel'],
    modules: [
      {
        title: 'Module 1: Advanced Frontend with React & Tailwind CSS',
        topics: ['Component lifecycle & state management hooks', 'Tailwind CSS v4 modern layout crafting', 'Client-side routing & dynamic parameters', 'REST API consumption and state persistence']
      },
      {
        title: 'Module 2: Server-Side Engineering with Node & Express',
        topics: ['Event-driven architecture and Express middlewares', 'RESTful API standard endpoints design', 'JWT authentication and role-based authorization', 'Security sanitization & CORS handling']
      },
      {
        title: 'Module 3: Database Modeling & Aggregations with MongoDB',
        topics: ['Schema design and Mongoose ODM validation', 'Aggregation pipelines for search and analytics', 'Transactions and indexing performance']
      },
      {
        title: 'Module 4: Real-World SaaS Capstone & Deployment',
        topics: ['Building a complete multi-vendor e-commerce platform', 'Payment gateway integration (bKash & Stripe sandbox)', 'CI/CD pipeline with GitHub Actions & Render hosting']
      }
    ],
    instructor: {
      name: 'Ashraful Islam',
      role: 'Principal Software Engineer & Tech Lead',
      experience: '7+ Years in MERN Stack & Enterprise Systems'
    }
  },
  {
    id: 'digital-marketing-seo-mastery',
    title: 'Digital Marketing & SEO Mastery',
    category: 'Marketing',
    fee: 10000,
    originalFee: 14000,
    duration: '3 Months (24 Classes)',
    lectures: 24,
    projects: 5,
    seatsRemaining: 7,
    batchDate: 'Nov 19, 2026',
    badge: 'Career Accelerator',
    rating: 4.88,
    reviewsCount: 295,
    thumbnail: '/src/assets/images/course_marketing_1793689259310.jpg',
    description: 'Dominate organic search results and execute profitable ad campaigns across Meta, Google Ads, and YouTube with data-driven analytics.',
    skills: ['Search Engine Optimization (SEO)', 'Meta Ads Manager (FB & IG)', 'Google Search & Display Ads', 'Conversion Rate Optimization', 'Analytics & Tag Manager'],
    tools: ['Google Ads', 'Meta Business Suite', 'SEMrush', 'Google Analytics 4', 'Ahrefs'],
    modules: [
      {
        title: 'Module 1: Technical & On-Page SEO Architecture',
        topics: ['Keyword research & search intent mapping', 'Site speed audits, structured data & crawl budget', 'High-ranking content briefs & semantic copywriting']
      },
      {
        title: 'Module 2: Meta Ads & Performance Campaign Strategy',
        topics: ['Pixel integration & custom conversions', 'Lookalike audience segmentation & retargeting', 'High-CTR ad creative copywriting & A/B testing']
      },
      {
        title: 'Module 3: Google Ads (Search, Display, Shopping)',
        topics: ['Quality Score optimization & negative keyword filters', 'Bidding strategies (Target CPA, ROAS)', 'Google Tag Manager event attribution']
      },
      {
        title: 'Module 4: Agency Client Acquisition & Freelancing',
        topics: ['Monthly retainer client proposal pitch deck', 'Live audits for real Bangladeshi e-commerce brands', 'Upwork lead generation & cold outreach']
      }
    ],
    instructor: {
      name: 'Mahbubur Rahman',
      role: 'Growth Marketing Director',
      experience: '6+ Years Managing $500K+ Ad Spends'
    }
  },
  {
    id: 'ui-ux-product-design',
    title: 'UI/UX Product Design & Figma',
    category: 'Art & Design',
    fee: 12000,
    originalFee: 18000,
    duration: '3 Months (24 Classes)',
    lectures: 24,
    projects: 6,
    seatsRemaining: 5,
    batchDate: 'Nov 22, 2026',
    badge: 'Top Rated',
    rating: 4.92,
    reviewsCount: 310,
    thumbnail: '/src/assets/images/course_art_design_1793689258048.jpg',
    description: 'Learn modern user experience research, design systems, interactive Figma auto-layout prototyping, and real client handoff workflows.',
    skills: ['User Research & Wireframing', 'Figma Components & Auto Layout', 'Design Systems (Atoms to Organisms)', 'Mobile App & Web App UX', 'Micro-interactions & Prototyping'],
    tools: ['Figma', 'FigJam', 'Miro', 'Zeplin'],
    modules: [
      {
        title: 'Module 1: UX Research & Information Architecture',
        topics: ['User interviews, personas & empathy mapping', 'Card sorting & user flow diagrams', 'Low-fidelity wireframing and usability testing']
      },
      {
        title: 'Module 2: Advanced Figma UI & Auto-Layout 5.0',
        topics: ['Auto-layout constraints and responsive grids', 'Component variants and interactive properties', 'Dark mode tokens and typography scales']
      },
      {
        title: 'Module 3: Enterprise Design System Construction',
        topics: ['Atomic design methodology in practice', 'Variables, token management and documentation', 'Developer handoff specs with Dev Mode']
      },
      {
        title: 'Module 4: Case Study Production for Global Tech Roles',
        topics: ['Documenting problem-solving logic on Medium/Behance', 'Whiteboard challenge prep & interview walkthroughs', 'International remote job applications']
      }
    ],
    instructor: {
      name: 'Sabrina Noor',
      role: 'Lead Product Designer at FinTech Studio',
      experience: '6+ Years designing SaaS & Mobile Products'
    }
  },
  {
    id: 'network-cyber-security-ccna',
    title: 'Network & Cyber Security Engineering',
    category: 'Networking',
    fee: 16000,
    originalFee: 24000,
    duration: '4 Months (32 Classes)',
    lectures: 32,
    projects: 7,
    seatsRemaining: 3,
    batchDate: 'Nov 24, 2026',
    badge: 'Hardware Lab Access',
    rating: 4.96,
    reviewsCount: 220,
    thumbnail: '/src/assets/images/course_networking_1793689260005.jpg',
    description: 'Hands-on training with physical Cisco routers, switches, firewall appliances, Kali Linux penetration testing, and CCNA 200-301 prep.',
    skills: ['IPv4/IPv6 Subnetting & Routing', 'VLANs, Trunking & STP', 'Firewall Policies & VPN Tunnels', 'Ethical Hacking & Vulnerability Scanning', 'CCNA 200-301 Exam Preparation'],
    tools: ['Cisco Packet Tracer', 'GNS3 / EVE-NG', 'Wireshark', 'Kali Linux', 'PfSense Firewall'],
    modules: [
      {
        title: 'Module 1: Enterprise Network Architecture',
        topics: ['OSI & TCP/IP stack in-depth analysis', 'Advanced VLSM subnetting & CIDR calculations', 'Cisco IOS configuration & device hardening']
      },
      {
        title: 'Module 2: Routing Protocols & Switching Protocols',
        topics: ['OSPF single-area and multi-area routing', 'VLAN segmentation, Inter-VLAN routing, and VTP', 'Spanning Tree Protocol (STP) & EtherChannel']
      },
      {
        title: 'Module 3: Network Security, ACLs & Firewalls',
        topics: ['Standard and Extended Access Control Lists', 'NAT/PAT configuration and WAN interfaces', 'Site-to-site IPsec VPNs and SSL encryption']
      },
      {
        title: 'Module 4: Cyber Security Defense & Kali Linux Labs',
        topics: ['Port scanning & service enumeration with Nmap', 'Wireshark packet sniffing and anomaly detection', 'Defense-in-depth security policies']
      }
    ],
    instructor: {
      name: 'Engr. Kamrul Hasan',
      role: 'Senior Network Architect (CCIE Written)',
      experience: '10+ Years in ISP & Datacenter Infrastructure'
    }
  },
  {
    id: 'python-django-ai',
    title: 'Python, Django & Machine Learning',
    category: 'Web Development',
    fee: 14000,
    originalFee: 20000,
    duration: '3.5 Months (28 Classes)',
    lectures: 28,
    projects: 5,
    seatsRemaining: 6,
    batchDate: 'Nov 26, 2026',
    badge: 'Trending Tech',
    rating: 4.91,
    reviewsCount: 184,
    thumbnail: '/src/assets/images/course_web_dev_1793689260890.jpg',
    description: 'From core Python scripting to enterprise Django web backends and practical AI model integrations with scikit-learn and OpenAI APIs.',
    skills: ['Python 3 Object-Oriented Programming', 'Django Web Framework & ORM', 'Django REST Framework (DRF)', 'Data Analysis with Pandas & NumPy', 'AI API & Machine Learning Integration'],
    tools: ['Python', 'Django', 'PostgreSQL', 'Jupyter Notebook', 'Docker'],
    modules: [
      {
        title: 'Module 1: Python Core to Advanced Concepts',
        topics: ['Data structures, list comprehensions, generators', 'Object-oriented programming (OOP) & design patterns', 'File handling, regex, and automated scraping with BeautifulSoup']
      },
      {
        title: 'Module 2: Django Backend & Database ORM',
        topics: ['Django MVT architecture, models and migrations', 'Authentication, session control, and admin dashboard customization', 'PostgreSQL integration and complex queries']
      },
      {
        title: 'Module 3: Django REST Framework & Microservices',
        topics: ['Building and securing production REST APIs', 'Token authentication and throttle control', 'Celery and Redis for asynchronous background tasks']
      },
      {
        title: 'Module 4: Machine Learning & Practical AI Deployment',
        topics: ['Exploratory data analysis with Pandas & Matplotlib', 'Supervised regression & classification algorithms', 'Deploying AI-powered web apps on AWS/DigitalOcean']
      }
    ],
    instructor: {
      name: 'Dr. Naimur Zahan',
      role: 'AI Researcher & Senior Backend Engineer',
      experience: '8+ Years in Python & Scientific Computing'
    }
  },
  {
    id: 'motion-graphics-video-editing',
    title: 'Motion Graphics & Video Editing',
    category: 'Art & Design',
    fee: 12000,
    originalFee: 17000,
    duration: '3 Months (24 Classes)',
    lectures: 24,
    projects: 6,
    seatsRemaining: 5,
    batchDate: 'Nov 28, 2026',
    rating: 4.89,
    reviewsCount: 204,
    thumbnail: '/src/assets/images/course_art_design_1793689258048.jpg',
    description: 'Learn narrative video editing, dynamic typography, 2D motion graphics, audio mastering, and commercial video creation for YouTube, TikTok & TVC.',
    skills: ['Premiere Pro Storyline Editing', 'After Effects Kinetic Typography', 'Color Grading with Lumetri Scopes', 'Sound Design & Foley Sync', 'Commercial Video Production'],
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Audition', 'DaVinci Resolve'],
    modules: [
      {
        title: 'Module 1: Video Editing Foundations & Storytelling',
        topics: ['Rough cut assembly and timeline pacing', 'Multi-camera editing and audio synchronization', 'Transitions, speed ramps, and J/L cuts']
      },
      {
        title: 'Module 2: Motion Graphics with After Effects',
        topics: ['Keyframing graph editor and smooth easing', 'Kinetic typography and lower-thirds design', 'Shape layer animations and logo reveals']
      },
      {
        title: 'Module 3: Color Grading & Audio Engineering',
        topics: ['Rec.709 vs LOG color balancing and LUTs', 'Audio noise reduction, compression, and mastering', 'Export presets for YouTube 4K, Reels, and TikTok']
      },
      {
        title: 'Module 4: High-Ticket Video Freelancing',
        topics: ['Client moodboarding & storyboard approvals', 'Upwork and direct video client outreach', 'Pricing video projects per minute vs project scope']
      }
    ],
    instructor: {
      name: 'Rashedul Karim',
      role: 'Creative Motion Director',
      experience: '7+ Years in Broadcast & Commercial Motion'
    }
  },
  {
    id: 'advanced-seo-content-strategy',
    title: 'Advanced SEO & Content Strategy',
    category: 'Marketing',
    fee: 8000,
    originalFee: 12000,
    duration: '2.5 Months (20 Classes)',
    lectures: 20,
    projects: 4,
    seatsRemaining: 8,
    batchDate: 'Dec 02, 2026',
    rating: 4.87,
    reviewsCount: 165,
    thumbnail: '/src/assets/images/course_marketing_1793689259310.jpg',
    description: 'Specialized program for niche website builders, affiliate marketers, and agency owners seeking guaranteed Google top-page rankings.',
    skills: ['Semantic Topical Authority Mapping', 'High-DA Backlink Outreach', 'E-E-A-T & Helpful Content Guidelines', 'Affiliate Marketing Funnels', 'Programmatic SEO'],
    tools: ['Ahrefs', 'SurferSEO', 'Google Search Console', 'Screaming Frog', 'WordPress'],
    modules: [
      {
        title: 'Module 1: Topical Authority & Keyword Clustering',
        topics: ['Building pillar-cluster content architectures', 'Competitor keyword gap audits with Ahrefs', 'Search intent identification (Informational vs Transactional)']
      },
      {
        title: 'Module 2: Technical SEO & Core Web Vitals',
        topics: ['Resolving crawl errors and indexation bottlenecks', 'Schema.org JSON-LD structured data implementation', 'Speed optimization for mobile first indexation']
      },
      {
        title: 'Module 3: White-Hat Link Building Campaigns',
        topics: ['Skyscraper 2.0 and broken link outreach templates', 'HARO & journalist pitch PR workflows', 'Guest posting and editorial syndication tactics']
      },
      {
        title: 'Module 4: Monetization & Client Reporting',
        topics: ['Amazon & niche affiliate program integration', 'Monthly client ranking & traffic impact reporting', 'Flipping content websites on Empire Flippers']
      }
    ],
    instructor: {
      name: 'Farhan Shahriar',
      role: 'Affiliate Publisher & SEO Strategist',
      experience: '6+ Years Growing 7-Figure Organic Traffic Sites'
    }
  }
];

export interface Seminar {
  id: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  date: string;
  time: string;
  location: string;
  seatsTotal: number;
  seatsLeft: number;
  category: string;
  tags: string[];
  keyTakeaways: string[];
}

export const UPCOMING_SEMINARS: Seminar[] = [
  {
    id: 'career-freelance-2026',
    title: 'Tech Career & Freelancing Roadmap: Zero to First $1,000',
    speaker: 'Engr. Tanvir Ahmed',
    speakerTitle: 'Head of Mentorship, The Everest IT & Top-Rated Plus Freelancer',
    date: 'Upcoming Friday (Nov 15, 2026)',
    time: '3:30 PM - 5:30 PM (BST)',
    location: 'Campus (East Shewrapara) & Live on Zoom',
    seatsTotal: 60,
    seatsLeft: 14,
    category: 'Career Counseling',
    tags: ['Freelance Strategy', 'Upwork / Fiverr', 'Portfolio Review'],
    keyTakeaways: [
      'High-paying IT skills in demand for 2026-2027 global remote markets',
      'Step-by-step method to win international clients without prior reviews',
      'Live portfolio audit of 3 attendees with actionable critique',
      'Direct admission discount coupon (up to 30%) for all attendees'
    ]
  },
  {
    id: 'graphic-design-masterclass',
    title: 'Future of Graphic Design & AI: Opportunities for Bangladeshi Youth',
    speaker: 'Sabrina Noor & Tanvir Hossain',
    speakerTitle: 'Lead Product Designer & Senior Art Director',
    date: 'Next Tuesday (Nov 19, 2026)',
    time: '4:00 PM - 6:00 PM (BST)',
    location: 'East Shewrapara Campus Studio Lab',
    seatsTotal: 50,
    seatsLeft: 8,
    category: 'Art & Design',
    tags: ['Adobe Masterclass', 'AI Workflows', 'Brand Identity'],
    keyTakeaways: [
      'How modern designers leverage AI tools without losing creative value',
      'Building a Behance portfolio that attracts international clients',
      'Freelance rate cards: How to charge $500+ per brand design package',
      'Hands-on live demo in Adobe Illustrator'
    ]
  },
  {
    id: 'fullstack-web-seminar',
    title: 'Modern Web Engineering with React 19 & Next.js in 2026',
    speaker: 'Ashraful Islam',
    speakerTitle: 'Principal Software Engineer & Technical Mentor',
    date: 'Friday (Nov 22, 2026)',
    time: '3:30 PM - 5:30 PM (BST)',
    location: 'Hybrid: Physical Auditorium & Zoom Live Stream',
    seatsTotal: 75,
    seatsLeft: 19,
    category: 'Web Development',
    tags: ['React 19', 'MERN Stack', 'Junior to Senior Path'],
    keyTakeaways: [
      'What tech companies in Dhaka and abroad look for during technical interviews',
      'The exact full-stack roadmap to become job-ready in 4 months',
      'Live code walkthrough of a real-time collaborative application',
      'Q&A session with working alumni from leading software firms'
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Sabbir Ahmed',
    role: 'Full-Stack Developer at Sheba.xyz',
    course: 'Full-Stack Web Development (Batch 38)',
    quote: 'The Everest IT transformed my career. The 1-on-1 mentorship after regular class hours helped me solve complex backend blockers. Within 3 weeks of course completion, I received two job offers in Dhaka.',
    salary: 'Starting 45,000 BDT/mo',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Nusrat Jahan Mim',
    role: 'Top-Rated Graphic Designer on Upwork',
    course: 'Graphic Design for Freelancing (Batch 41)',
    quote: 'Before joining, I only knew basic Photoshop tools. Tanvir Sir guided us through real client briefs and showed us how to write winning proposals. I have now crossed $4,200 in freelance earnings!',
    salary: '$1,200+ monthly freelance income',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Md. Rakibul Hasan',
    role: 'Network Engineer at AmberIT',
    course: 'Network & Cyber Security (Batch 36)',
    quote: 'Having access to real Cisco physical routers and switches at the Shewrapara campus made all the difference. Theoretical books are nothing compared to configuring live hardware.',
    salary: 'Certified CCNA Professional',
    rating: 5
  }
];
