"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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

const categories = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'HTML, CSS, JavaScript, and modern web technologies',
    icon: 'fas fa-code',
    color: '#2563eb',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Learn JavaScript from basics to advanced concepts',
    icon: 'fab fa-js-square',
    color: '#f7df1e',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB'
  },
  {
    id: 'react',
    title: 'React.js',
    description: 'Build modern web applications with React',
    icon: 'fab fa-react',
    color: '#61dafb',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB'
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    description: 'Server-side JavaScript and backend development',
    icon: 'fab fa-node-js',
    color: '#339933',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB'
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Python programming for beginners and beyond',
    icon: 'fab fa-python',
    color: '#3776ab',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB'
  },
  {
    id: 'database',
    title: 'Database',
    description: 'SQL, MongoDB, and database management',
    icon: 'fas fa-database',
    color: '#336791',
    playlistId: 'PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB'
  }
];

const tutorials = [
  {
    id: 'html-basics',
    title: 'HTML Fundamentals',
    description: 'Learn the basics of HTML markup language',
    category: 'web-dev',
    duration: '2 hours',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/UB1O30fR-EE/hqdefault.jpg',
    videoId: 'UB1O30fR-EE'
  },
  {
    id: 'css-styling',
    title: 'CSS Styling',
    description: 'Master CSS for beautiful web design',
    category: 'web-dev',
    duration: '3 hours',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/1PnVor36_40/hqdefault.jpg',
    videoId: '1PnVor36_40'
  },
  {
    id: 'js-basics',
    title: 'JavaScript Basics',
    description: 'Introduction to JavaScript programming',
    category: 'javascript',
    duration: '4 hours',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg',
    videoId: 'W6NZfCO5SIk'
  },
  {
    id: 'react-intro',
    title: 'React Introduction',
    description: 'Get started with React.js framework',
    category: 'react',
    duration: '5 hours',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg',
    videoId: 'w7ejDZ8SWv8'
  },
  {
    id: 'node-basics',
    title: 'Node.js Basics',
    description: 'Learn server-side JavaScript with Node.js',
    category: 'nodejs',
    duration: '3 hours',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/Oe421EPjeBE/hqdefault.jpg',
    videoId: 'Oe421EPjeBE'
  },
  {
    id: 'python-intro',
    title: 'Python for Beginners',
    description: 'Start your Python programming journey',
    category: 'python',
    duration: '6 hours',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/kqtD5dpn9C8/hqdefault.jpg',
    videoId: 'kqtD5dpn9C8'
  }
];

export default function VideoTutorialsPage() {
  const [featured, setFeatured] = useState({
    playlistId: categories[0].playlistId,
    title: 'Web Development Fundamentals',
    thumbnail: 'https://img.youtube.com/vi/UB1O30fR-EE/hqdefault.jpg',
    videoId: 'UB1O30fR-EE'
  });
  return (
    <main className="min-h-screen flex flex-col bg-[#f5f8fe]">
      <Header />
      {/* Hero/Header */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 border-b border-gray-200 py-12 mb-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:gap-10">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Free Video Tutorials</h1>
            <p className="text-lg text-gray-700 mb-6">Learn programming, web development, and technology skills through our curated collection of free video tutorials. Start your learning journey today with high-quality content from expert instructors.</p>
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-play-circle text-xl"></i> 100+ Videos</div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-users text-xl"></i> Free Access</div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-clock text-xl"></i> Updated Weekly</div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <span className="text-6xl text-blue-600 opacity-80"><i className="fas fa-video"></i></span>
          </div>
        </div>
      </section>
      {/* Categories Grid */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fas fa-th-large"></i> Learning Categories</h2>
          <p className="text-gray-600">Choose from our organized collection of video tutorials</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map(cat => (
            <Link key={cat.id} href={`/video-playlist-detail/${cat.id}`}>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center hover:shadow-xl transition cursor-pointer">
                <span className="mb-3 text-4xl" style={{ color: cat.color }}><i className={cat.icon}></i></span>
                <h4 className="font-bold text-lg text-gray-900 mb-1">{cat.title}</h4>
                <p className="text-gray-600 mb-2">{cat.description}</p>
                <div className="flex items-center gap-2 text-blue-700 font-medium mt-2"><i className="fas fa-play"></i> Start Learning</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Featured Playlist */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fas fa-star"></i> Featured Playlist</h2>
          <p className="text-gray-600">Start with our most popular web development series</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl overflow-hidden shadow mb-4">
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${featured.playlistId}`}
                title={featured.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col h-full">
              <h4 className="font-bold text-lg text-gray-900 mb-2">{featured.title.replace(' Playlist', '')}</h4>
              <p className="text-gray-600 mb-4">Master HTML, CSS, JavaScript, and modern web technologies with our comprehensive video series.</p>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2 text-blue-700 font-medium"><i className="fas fa-play-circle"></i> 25 Videos</div>
                <div className="flex items-center gap-2 text-blue-700 font-medium"><i className="fas fa-clock"></i> 15 Hours</div>
                <div className="flex items-center gap-2 text-blue-700 font-medium"><i className="fas fa-star"></i> Beginner to Intermediate</div>
              </div>
              {categories && (
                <Link
                  href={`/video-playlist-detail/${categories.find(c => c.playlistId === featured.playlistId)?.id || 'web-dev'}`}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow transition mt-auto flex items-center justify-center"
                >
                  <i className="fas fa-play mr-2"></i> View Full Course
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* All Tutorials Grid */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fas fa-list"></i> All Tutorials</h2>
          <p className="text-gray-600">Browse our complete collection of free learning resources</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tutorials.map(tut => (
            <div key={tut.id} className="bg-white rounded-2xl shadow p-4 flex flex-col hover:shadow-xl transition cursor-pointer">
              <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                <img src={tut.thumbnail} alt={tut.title} className="object-cover w-full h-full" />
                <span className="absolute bottom-2 right-2 bg-blue-700 text-white text-xs px-2 py-1 rounded shadow"><i className="fas fa-clock mr-1"></i> {tut.duration}</span>
              </div>
              <h5 className="font-bold text-base text-gray-900 mb-1">{tut.title}</h5>
              <p className="text-gray-600 text-sm mb-2 flex-1">{tut.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="bg-gray-100 rounded px-2 py-0.5">{tut.level}</span>
                <span className="bg-gray-100 rounded px-2 py-0.5">{categories.find(c => c.id === tut.category)?.title}</span>
              </div>
              <Link
                href={`/video-playlist-detail/${tut.category}`}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow transition text-center flex items-center justify-center"
              >
                <i className="fas fa-play mr-2"></i> Watch
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
} 