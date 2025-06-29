"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import React from "react";

// --- Header component copied from app/page.js ---
function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState("");
  const [hoveredMobileMenu, setHoveredMobileMenu] = useState("");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    fetch("/courses.json").then(r => r.json()).then(setCourses);
    fetch("/categories.json").then(r => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }
    const q = search.toLowerCase();
    const courseResults = courses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.skills.some(s => s.toLowerCase().includes(q))
    );
    const categoryResults = categories.filter(cat =>
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q)
    );
    setResults([
      ...courseResults.map(c => ({ type: 'course', ...c })),
      ...categoryResults.map(cat => ({ type: 'category', ...cat }))
    ]);
  }, [search, courses, categories]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-2 sm:px-4 relative h-12">
        {/* Burger button (mobile/tablet) */}
        <button
          className="lg:hidden p-2 mr-2 rounded hover:bg-gray-100 focus:outline-none transition"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(v => !v)}
        >
          {mobileMenuOpen ? (
            // X icon
            <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            // Burger icon
            <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
        {/* Logo centered on mobile/tablet, left on desktop */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <a href="/" className="flex items-center h-12 relative transition-opacity duration-200 -my-4">
            <Image src="/next_skill.png" alt="NextSkill Cambodia" width={80} height={80} className="rounded object-contain" priority />
          </a>
        </div>
        {/* Desktop menu */}
        <ul className={`hidden lg:flex flex-1 justify-center gap-8 font-medium text-base transition-opacity duration-200 ${searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <li><a href="/" className="navbar-link-animated text-black hover:text-blue-600 transition">Home</a></li>
          <li><a href="/video-tutorials" className="navbar-link-animated text-black hover:text-blue-600 transition">Video Tutorials</a></li>
          <li><a href="/about" className="navbar-link-animated text-black hover:text-blue-600 transition">About</a></li>
          <li><a href="/contact" className="navbar-link-animated text-black hover:text-blue-600 transition">Contact</a></li>
        </ul>
        {/* Search icon (always right) */}
        <div className="flex items-center ml-2 min-w-[48px]">
          {!searchOpen && (
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
            </button>
          )}
        </div>
        {/* Mobile/tablet menu dropdown */}
        {mobileMenuOpen && !searchOpen && (
          <div className="absolute left-0 top-full w-full bg-white border-b border-gray-200 shadow-md lg:hidden z-40 transition-all duration-300 transform origin-top animate-fade-in"
            style={{
              maxHeight: mobileMenuOpen ? '500px' : '0',
              opacity: mobileMenuOpen ? 1 : 0,
              pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            }}
          >
            <ul className="flex flex-col py-2">
              <li>
                <a href="/" className="block px-6 py-2 text-black hover:bg-blue-50"
                  onClick={() => setActiveMobileMenu('/')}
                  onMouseEnter={() => setHoveredMobileMenu('/')}
                  onMouseLeave={() => setHoveredMobileMenu("")}
                >
                  <span className="relative inline-block">
                    Home
                    {(activeMobileMenu === '/' || hoveredMobileMenu === '/') && (
                      <div className="mobile-underline" />
                    )}
                  </span>
                </a>
              </li>
              <li>
                <a href="/video-tutorials" className="block px-6 py-2 text-black hover:bg-blue-50"
                  onClick={() => setActiveMobileMenu('/video-tutorials')}
                  onMouseEnter={() => setHoveredMobileMenu('/video-tutorials')}
                  onMouseLeave={() => setHoveredMobileMenu("")}
                >
                  <span className="relative inline-block">
                    Video Tutorials
                    {(activeMobileMenu === '/video-tutorials' || hoveredMobileMenu === '/video-tutorials') && (
                      <div className="mobile-underline" />
                    )}
                  </span>
                </a>
              </li>
              <li>
                <a href="/about" className="block px-6 py-2 text-black hover:bg-blue-50"
                  onClick={() => setActiveMobileMenu('/about')}
                  onMouseEnter={() => setHoveredMobileMenu('/about')}
                  onMouseLeave={() => setHoveredMobileMenu("")}
                >
                  <span className="relative inline-block">
                    About
                    {(activeMobileMenu === '/about' || hoveredMobileMenu === '/about') && (
                      <div className="mobile-underline" />
                    )}
                  </span>
                </a>
              </li>
              <li>
                <a href="/contact" className="block px-6 py-2 text-black hover:bg-blue-50"
                  onClick={() => setActiveMobileMenu('/contact')}
                  onMouseEnter={() => setHoveredMobileMenu('/contact')}
                  onMouseLeave={() => setHoveredMobileMenu("")}
                >
                  <span className="relative inline-block">
                    Contact
                    {(activeMobileMenu === '/contact' || hoveredMobileMenu === '/contact') && (
                      <div className="mobile-underline" />
                    )}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Search overlay (unchanged) */}
      {searchOpen && (
        <div className="fixed left-0 top-0 w-full h-12 flex items-center bg-white z-50 px-4 border-b border-blue-700 shadow animate-fade-in">
          {/* Logo stays visible */}
          <a href="/" className="flex items-center h-12 mr-4 -my-4">
            <Image src="/next_skill.png" alt="NextSkill Cambodia" width={80} height={80} className="rounded object-contain" priority />
          </a>
          <form className="flex flex-1 items-center gap-2 relative" onSubmit={e => e.preventDefault()}>
            <div className="relative flex-1 flex items-center h-12">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-8 rounded border border-blue-700 bg-gray-50 shadow-sm px-5 pr-12 text-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-700 placeholder-gray-400 transition-all duration-200"
                placeholder="Search or ask a question"
                style={{ minWidth: 0 }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="22" height="22" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
              </span>
            </div>
            <button
              type="button"
              className="ml-2 h-8 px-4 py-2 border border-gray-400 rounded bg-white hover:bg-gray-100 text-black font-medium flex items-center justify-center"
              onClick={() => { setSearchOpen(false); setSearch(""); setResults([]); }}
            >
              Cancel
            </button>
            {/* Dropdown results */}
            {search && results.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white border border-blue-700 rounded shadow-lg max-h-96 overflow-auto z-50">
                {results.map((item, i) => (
                  <a
                    key={item.type + '-' + (item.id || i)}
                    href={item.type === 'course' ? `/course/${item.id}` : '#'}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition border-b last:border-b-0 border-gray-100"
                  >
                    {item.type === 'course' ? (
                      <Image src={item.image} alt={item.title} width={40} height={40} className="rounded object-cover" />
                    ) : (
                      <span className="text-2xl" style={{ color: item.color }}>{item.icon}</span>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium text-black text-base">{item.type === 'course' ? item.title : item.name}</span>
                      <span className="text-xs text-gray-500 truncate max-w-xs">{item.type === 'course' ? item.description : item.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </nav>
  );
}

// --- Footer component copied from app/page.js ---
function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-8 sm:pt-12 pb-4 sm:pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
        <div>
          <h6 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Courses</h6>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li><a href="#" className="hover:underline">Web Development</a></li>
            <li><a href="#" className="hover:underline">Database</a></li>
            <li><a href="#" className="hover:underline">DevOps</a></li>
            <li><a href="#" className="hover:underline">AI & ML</a></li>
            <li><a href="#" className="hover:underline">Data Science</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Company</h6>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Our Team</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Partners</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Support</h6>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Student Portal</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Community</a></li>
            <li><a href="#" className="hover:underline">Feedback</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Contact</h6>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li className="flex items-center gap-2"><span>📍</span> Phnom Penh, Cambodia</li>
            <li className="flex items-center gap-2"><span>📞</span> <a href="tel:+855123456789" className="hover:underline">+855 12 345 6789</a></li>
            <li className="flex items-center gap-2"><span>✉️</span> <a href="mailto:info@nextskillcambodia.com" className="hover:underline">info@nextskillcambodia.com</a></li>
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <h6 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">About</h6>
          <div className="flex flex-col gap-2">
            <img src="/next_skill.png" alt="NextSkill Cambodia" width={40} height={40} className="rounded mb-2 w-10 h-10 sm:w-12 sm:h-12" />
            <span className="font-bold text-sm sm:text-base">NextSkill Cambodia</span>
            <span className="text-gray-500 text-xs">Empowering individuals with cutting-edge technology education. Join thousands of learners advancing their careers with our expert-led courses.</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6 flex flex-col gap-3 sm:gap-2 text-xs text-gray-500">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-xs">🌐 English (United States)</span>
          <span className="flex items-center gap-1 text-xs">
            <input type="checkbox" checked readOnly className="accent-blue-600 w-3 h-3 sm:w-4 sm:h-4" />
            Your Privacy Choices
          </span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs">
          <a href="#" className="hover:underline">Sitemap</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms of use</a>
          <a href="#" className="hover:underline">Trademarks</a>
          <a href="#" className="hover:underline">Safety & eco</a>
          <a href="#" className="hover:underline">Recycling</a>
          <a href="#" className="hover:underline">About our ads</a>
        </div>
        <div className="text-xs">&copy; 2024 NextSkill Cambodia. All rights reserved.</div>
      </div>
    </footer>
  );
}

const playlistData = {
  'web-dev': {
    title: 'Web Development Fundamentals',
    description: 'Master HTML, CSS, JavaScript, and modern web technologies with our comprehensive video series.',
    icon: 'fas fa-code',
    color: '#2563eb',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
    videoCount: 25,
    totalDuration: '15 hours',
    difficulty: 'Beginner to Intermediate',
    objectives: [
      'Understand HTML structure and semantic markup',
      'Master CSS styling and responsive design',
      'Learn JavaScript fundamentals and DOM manipulation',
      'Build responsive websites from scratch',
      'Deploy websites to the internet'
    ],
    overview: 'This comprehensive course covers everything you need to know about web development. From basic HTML structure to advanced JavaScript concepts, you\'ll learn practical skills that you can immediately apply to real projects.',
    videos: [
      {
        id: 'UB1O30fR-EE',
        title: 'HTML Tutorial for Beginners',
        duration: '45:30',
        thumbnail: 'https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg'
      },
      {
        id: '1PnVor36_40',
        title: 'CSS Tutorial for Beginners',
        duration: '52:15',
        thumbnail: 'https://img.youtube.com/vi/1PnVor36_40/maxresdefault.jpg'
      },
      {
        id: 'W6NZfCO5SIk',
        title: 'JavaScript Tutorial for Beginners',
        duration: '1:08:30',
        thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg'
      }
    ],
    relatedCourses: [
      {
        title: 'Advanced JavaScript',
        description: 'Deep dive into advanced JavaScript concepts',
        link: '/video-playlist-detail/javascript'
      },
      {
        title: 'React.js Mastery',
        description: 'Build modern web applications with React',
        link: '/video-playlist-detail/react'
      }
    ]
  },
  'javascript': {
    title: 'JavaScript Programming',
    description: 'Master JavaScript from basics to advanced concepts with practical examples.',
    icon: 'fab fa-js-square',
    color: '#f7df1e',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
    videoCount: 20,
    totalDuration: '12 hours',
    difficulty: 'Beginner to Advanced',
    objectives: [
      'Learn JavaScript fundamentals and syntax',
      'Understand DOM manipulation and events',
      'Master ES6+ features and modern JavaScript',
      'Build interactive web applications',
      'Work with APIs and asynchronous programming'
    ],
    overview: 'JavaScript is the programming language of the web. This course will take you from complete beginner to confident JavaScript developer, covering all essential concepts and modern practices.',
    videos: [
      {
        id: 'W6NZfCO5SIk',
        title: 'JavaScript Tutorial for Beginners',
        duration: '1:08:30',
        thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg'
      },
      {
        id: 'PkZNo7MFNFg',
        title: 'JavaScript ES6 Tutorial',
        duration: '1:15:45',
        thumbnail: 'https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg'
      },
      {
        id: 'hdI2bqOjy3c',
        title: 'JavaScript DOM Manipulation',
        duration: '45:20',
        thumbnail: 'https://img.youtube.com/vi/hdI2bqOjy3c/maxresdefault.jpg'
      }
    ],
    relatedCourses: [
      {
        title: 'React.js Fundamentals',
        description: 'Build modern UIs with React',
        link: '/video-playlist-detail/react'
      },
      {
        title: 'Node.js Backend Development',
        description: 'Server-side JavaScript with Node.js',
        link: '/video-playlist-detail/nodejs'
      }
    ]
  },
  'react': {
    title: 'React.js Development',
    description: 'Learn React.js to build modern, interactive web applications.',
    icon: 'fab fa-react',
    color: '#61dafb',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
    videoCount: 18,
    totalDuration: '10 hours',
    difficulty: 'Intermediate',
    objectives: [
      'Understand React fundamentals and JSX',
      'Master component-based architecture',
      'Learn state management with hooks',
      'Build single-page applications',
      'Deploy React apps to production'
    ],
    overview: 'React is one of the most popular JavaScript libraries for building user interfaces. This course covers everything from basic concepts to advanced patterns used in modern React development.',
    videos: [
      {
        id: 'w7ejDZ8SWv8',
        title: 'React Tutorial for Beginners',
        duration: '1:25:10',
        thumbnail: 'https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg'
      },
      {
        id: '4UZrsTqkcW4',
        title: 'React Hooks Tutorial',
        duration: '55:30',
        thumbnail: 'https://img.youtube.com/vi/4UZrsTqkcW4/maxresdefault.jpg'
      },
      {
        id: 'Ke90Tje7VS0',
        title: 'React Router Tutorial',
        duration: '40:15',
        thumbnail: 'https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg'
      }
    ],
    relatedCourses: [
      {
        title: 'JavaScript Fundamentals',
        description: 'Master JavaScript before React',
        link: '/video-playlist-detail/javascript'
      },
      {
        title: 'Next.js Full Stack',
        description: 'Full-stack React with Next.js',
        link: '/video-playlist-detail/web-dev'
      }
    ]
  },
  'nodejs': {
    title: 'Node.js Backend Development',
    description: 'Learn server-side JavaScript and backend development with Node.js.',
    icon: 'fab fa-node-js',
    color: '#339933',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
    videoCount: 15,
    totalDuration: '8 hours',
    difficulty: 'Intermediate to Advanced',
    objectives: [
      'Understand Node.js runtime and event loop',
      'Build RESTful APIs with Express.js',
      'Work with databases and authentication',
      'Implement real-time features with Socket.io',
      'Deploy Node.js applications'
    ],
    overview: 'Node.js allows you to use JavaScript on the server side. This course covers backend development, API creation, database integration, and deployment strategies.',
    videos: [
      {
        id: 'Oe421EPjeBE',
        title: 'Node.js Tutorial for Beginners',
        duration: '1:10:25',
        thumbnail: 'https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg'
      },
      {
        id: 'L72fhGm1tfE',
        title: 'Express.js Tutorial',
        duration: '50:40',
        thumbnail: 'https://img.youtube.com/vi/L72fhGm1tfE/maxresdefault.jpg'
      },
      {
        id: 'vjf774RKrLc',
        title: 'MongoDB with Node.js',
        duration: '35:20',
        thumbnail: 'https://img.youtube.com/vi/vjf774RKrLc/maxresdefault.jpg'
      }
    ],
    relatedCourses: [
      {
        title: 'JavaScript Fundamentals',
        description: 'Master JavaScript for Node.js',
        link: '/video-playlist-detail/javascript'
      },
      {
        title: 'Database Management',
        description: 'Learn database design and SQL',
        link: '/video-playlist-detail/database'
      }
    ]
  },
  'python': {
    title: 'Python Programming',
    description: 'Learn Python programming from basics to advanced concepts.',
    icon: 'fab fa-python',
    color: '#3776ab',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
    videoCount: 22,
    totalDuration: '14 hours',
    difficulty: 'Beginner to Intermediate',
    objectives: [
      'Master Python syntax and fundamentals',
      'Learn object-oriented programming',
      'Work with data structures and algorithms',
      'Build web applications with Django/Flask',
      'Data analysis and automation'
    ],
    overview: 'Python is a versatile programming language used in web development, data science, automation, and more. This comprehensive course covers all essential Python concepts.',
    videos: [
      {
        id: 'kqtD5dpn9C8',
        title: 'Python Tutorial for Beginners',
        duration: '1:30:15',
        thumbnail: 'https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg'
      },
      {
        id: 'JeznW_7DlB0',
        title: 'Python OOP Tutorial',
        duration: '45:50',
        thumbnail: 'https://img.youtube.com/vi/JeznW_7DlB0/maxresdefault.jpg'
      },
      {
        id: 'rfscVS0vtbw',
        title: 'Python Django Tutorial',
        duration: '1:15:30',
        thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg'
      }
    ],
    relatedCourses: [
      {
        title: 'Data Science with Python',
        description: 'Learn data analysis and visualization',
        link: '/video-playlist-detail/database'
      },
      {
        title: 'Web Development',
        description: 'Build web applications',
        link: '/video-playlist-detail/web-dev'
      }
    ]
  },
  'database': {
    title: 'Database Management',
    description: 'Learn SQL, MongoDB, and database design principles.',
    icon: 'fas fa-database',
    color: '#336791',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
    videoCount: 16,
    totalDuration: '9 hours',
    difficulty: 'Beginner to Intermediate',
    objectives: [
      'Understand database fundamentals and design',
      'Master SQL queries and database operations',
      'Learn MongoDB and NoSQL databases',
      'Implement database security best practices',
      'Optimize database performance'
    ],
    overview: 'Databases are the backbone of modern applications. This course covers both SQL and NoSQL databases, teaching you how to design, implement, and manage databases effectively.',
    videos: [
      {
        id: 'HXV3zeQKqGY',
        title: 'SQL Tutorial for Beginners',
        duration: '1:20:45',
        thumbnail: 'https://img.youtube.com/vi/HXV3zeQKqGY/maxresdefault.jpg'
      },
      {
        id: 'Www6cTUymas',
        title: 'MongoDB Tutorial',
        duration: '55:30',
        thumbnail: 'https://img.youtube.com/vi/Www6cTUymas/maxresdefault.jpg'
      },
      {
        id: 'vjf774RKrLc',
        title: 'Database Design Tutorial',
        duration: '40:15',
        thumbnail: 'https://img.youtube.com/vi/vjf774RKrLc/maxresdefault.jpg'
      }
    ],
    relatedCourses: [
      {
        title: 'Node.js Backend Development',
        description: 'Build APIs with databases',
        link: '/video-playlist-detail/nodejs'
      },
      {
        title: 'Python Programming',
        description: 'Data analysis with Python',
        link: '/video-playlist-detail/python'
      }
    ]
  }
};

const TABS = ["Overview", "What You'll Learn", "Related Courses"];

export default function VideoPlaylistDetailPage({ params }) {
  const resolvedParams = React.use(params);
  const course = resolvedParams.course || 'web-dev';
  const playlist = playlistData[course] || playlistData['web-dev'];
  const [activeVideo, setActiveVideo] = useState(playlist.videos[0]);
  const [tab, setTab] = useState(TABS[0]);

  return (
    <main className="min-h-screen flex flex-col bg-[#f5f8fe]">
      <Header />
      {/* Hero/Header */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 border-b border-gray-200 py-12 mb-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:gap-10">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{playlist.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{playlist.description}</p>
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-play-circle text-xl"></i> {playlist.videoCount} Videos</div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-clock text-xl"></i> {playlist.totalDuration}</div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-star text-xl"></i> {playlist.difficulty}</div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <span className="text-6xl" style={{ color: playlist.color }}><i className={playlist.icon}></i></span>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Video Player and Tabbed Content */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* Video Player Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-2">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-3xl"
                ></iframe>
              </div>
              <div className="p-6 border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="font-bold text-lg text-gray-900">{activeVideo.title}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-3">
                    <span><i className="fas fa-clock"></i> {activeVideo.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="bg-white rounded-3xl shadow p-6">
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                {TABS.map((t) => (
                  <button
                    key={t}
                    className={`py-2 px-4 font-semibold text-base border-b-2 transition-all duration-200 ${tab === t ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-700'}`}
                    onClick={() => setTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              {tab === "Overview" && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2"><i className="fas fa-book text-blue-700"></i> Course Overview</h4>
                    <p className="text-gray-700 mb-4">{playlist.overview}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {playlist.objectives.map((obj, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 rounded-full px-4 py-1 text-xs font-semibold shadow-sm">{obj}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2"><i className="fas fa-tags text-blue-700"></i> Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {/* Example skills, replace with playlist.skills if available */}
                      <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold">HTML</span>
                      <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold">CSS</span>
                      <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold">JavaScript</span>
                    </div>
                  </div>
                </div>
              )}
              {tab === "What You'll Learn" && (
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2"><i className="fas fa-graduation-cap text-blue-700"></i> What You'll Learn</h4>
                  <ul className="bg-blue-50 rounded-lg p-4 mb-4">
                    {playlist.objectives.map((obj, i) => (
                      <li key={i} className="flex items-center gap-2 mb-2 text-gray-800"><i className="fas fa-check-circle text-green-500"></i> {obj}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tab === "Related Courses" && (
                <div>
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2"><i className="fas fa-link text-blue-700"></i> Related Courses</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {playlist.relatedCourses.map((rc, i) => (
                      <a key={i} href={rc.link} className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition block">
                        <div className="font-semibold text-blue-700 mb-1">{rc.title}</div>
                        <div className="text-gray-700 text-sm">{rc.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Right: Playlist Sidebar */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-3xl shadow p-4 max-h-[700px] overflow-y-auto">
              <h5 className="font-bold text-lg mb-4 flex items-center gap-2"><i className="fas fa-list"></i> Playlist Videos</h5>
              <div className="flex flex-col gap-3">
                {playlist.videos.map((video, i) => (
                  <div
                    key={video.id}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer border-b last:border-b-0 transition group ${activeVideo.id === video.id ? 'bg-blue-50 border-blue-500 shadow-lg' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveVideo(video)}
                  >
                    <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-gray-200 group-hover:border-blue-400 transition-all">
                      <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{video.title}</div>
                      <div className="text-xs text-gray-500">{video.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Certificate/Info Card Example */}
            <div className="bg-white rounded-3xl shadow p-6 flex flex-col items-center text-center">
              <i className="fas fa-certificate text-3xl text-blue-700 mb-2"></i>
              <div className="font-bold text-lg mb-1">Certificate of Completion</div>
              <div className="text-gray-600 text-sm mb-2">Get a certificate after finishing all videos in this playlist.</div>
              <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg shadow transition mt-2">Learn More</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 