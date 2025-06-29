"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
// Import Header and Footer components (copy from other pages if not global)

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

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f5f8fe]">
      <Header />
      {/* Hero/Header */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 border-b border-gray-200 py-12 mb-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:gap-10">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About NextSkill Cambodia</h1>
            <p className="text-lg text-gray-700 mb-6">Empowering learners across Cambodia with high-quality educational content. We believe that knowledge should be accessible to everyone, regardless of their background or location.</p>
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-play-circle text-xl"></i> 100+ Free Videos</div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-users text-xl"></i> 1000+ Students</div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-th-large text-xl"></i> 6 Categories</div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><i className="fas fa-clock text-xl"></i> 24/7 Access</div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <span className="text-6xl text-blue-600 opacity-80"><i className="fas fa-graduation-cap"></i></span>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 hover:shadow-lg transition-transform">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900"><i className="fas fa-bullseye text-blue-700"></i> Our Mission</h2>
          <p className="text-gray-600 text-lg mb-6">At NextSkill Cambodia, our mission is to democratize education by providing high-quality learning resources in web development, programming, and technology. We strive to bridge the digital skills gap in Cambodia and empower individuals to pursue careers in the tech industry.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
            <div className="text-center bg-blue-50 rounded-xl p-6">
              <div className="text-3xl font-extrabold text-blue-700 mb-1">100+</div>
              <div className="text-gray-700 font-medium">Free Videos</div>
            </div>
            <div className="text-center bg-blue-50 rounded-xl p-6">
              <div className="text-3xl font-extrabold text-blue-700 mb-1">1000+</div>
              <div className="text-gray-700 font-medium">Students</div>
            </div>
            <div className="text-center bg-blue-50 rounded-xl p-6">
              <div className="text-3xl font-extrabold text-blue-700 mb-1">6</div>
              <div className="text-gray-700 font-medium">Learning Categories</div>
            </div>
            <div className="text-center bg-blue-50 rounded-xl p-6">
              <div className="text-3xl font-extrabold text-blue-700 mb-1">24/7</div>
              <div className="text-gray-700 font-medium">Access</div>
            </div>
          </div>
        </div>
        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 hover:shadow-lg transition-transform">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900"><i className="fas fa-eye text-blue-700"></i> Our Vision</h2>
          <p className="text-gray-600 text-lg">To empower the young generation of Cambodia with comprehensive information technology training, enabling them to actively participate in and contribute to the development of our society. We envision a future where every Cambodian has access to world-class tech education, fostering innovation and driving economic growth through digital transformation.</p>
        </div>
        {/* Core Values */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 hover:shadow-lg transition-transform">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900"><i className="fas fa-heart text-blue-700"></i> Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="text-center bg-blue-50 rounded-xl p-6 border-l-4 border-blue-700 hover:shadow-md transition">
              <div className="text-3xl mb-2 text-blue-700"><i className="fas fa-star"></i></div>
              <div className="font-bold text-lg mb-2">Quality Training</div>
              <div className="text-gray-600">We deliver practical, hands-on training with real-world experience and industry-relevant projects. Our curriculum bridges theory and practice, ensuring students are job-ready.</div>
            </div>
            <div className="text-center bg-blue-50 rounded-xl p-6 border-l-4 border-blue-700 hover:shadow-md transition">
              <div className="text-3xl mb-2 text-blue-700"><i className="fas fa-rocket"></i></div>
              <div className="font-bold text-lg mb-2">Innovation</div>
              <div className="text-gray-600">We continuously update our curriculum with the latest technologies and trends, preparing students for the rapidly changing tech landscape.</div>
            </div>
            <div className="text-center bg-blue-50 rounded-xl p-6 border-l-4 border-blue-700 hover:shadow-md transition">
              <div className="text-3xl mb-2 text-blue-700"><i className="fas fa-seedling"></i></div>
              <div className="font-bold text-lg mb-2">Growth</div>
              <div className="text-gray-600">We foster a culture of lifelong learning, encouraging continuous personal and professional development and a growth mindset.</div>
            </div>
            <div className="text-center bg-blue-50 rounded-xl p-6 border-l-4 border-blue-700 hover:shadow-md transition">
              <div className="text-3xl mb-2 text-blue-700"><i className="fas fa-universal-access"></i></div>
              <div className="font-bold text-lg mb-2">Accessibility</div>
              <div className="text-gray-600">We believe education should be accessible to everyone, regardless of financial situation or location. Our free, high-quality content ensures no one is left behind.</div>
            </div>
          </div>
        </div>
        {/* Teaching Philosophy */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 hover:shadow-lg transition-transform">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900"><i className="fas fa-chalkboard-teacher text-blue-700"></i> Our Teaching Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 mb-2">
              <h4 className="text-blue-700 font-bold mb-2 flex items-center gap-2"><i className="fas fa-user-tie"></i> For Teachers</h4>
              <p className="text-gray-600">We inspire our instructors to deliver practical experience through innovative teaching methodologies. Our approach emphasizes creativity, self-directed learning, and critical thinking skills. We encourage educators to create engaging, interactive learning experiences that challenge students to think beyond traditional boundaries and develop problem-solving capabilities.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 mb-2">
              <h4 className="text-blue-700 font-bold mb-2 flex items-center gap-2"><i className="fas fa-user-graduate"></i> For Students</h4>
              <p className="text-gray-600">We provide engaging real-world experiences and hands-on projects through our comprehensive courses. Our programs help students grow their knowledge and skills aligned with their career goals in Web Development, Database Management, DevOps, Mobile Development, and Data Science. We focus on practical application and industry-relevant skills development.</p>
            </div>
          </div>
        </div>
        {/* Team */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 hover:shadow-lg transition-transform">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900"><i className="fas fa-users text-blue-700"></i> Our Team</h2>
          <p className="text-gray-600 mb-6">Meet the passionate educators and developers behind NextSkill Cambodia who are dedicated to making quality education accessible to all.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center bg-blue-50 rounded-xl p-6">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-blue-700 to-yellow-400 flex items-center justify-center">
                <Image src="/img/khean-visal.jpg" alt="Khean Visal" width={112} height={112} className="object-cover w-full h-full" onError={(e) => {e.target.onerror=null; e.target.src='/next_skill.png';}} />
              </div>
              <div className="font-bold text-lg mb-1 text-gray-900">Khean Visal</div>
              <div className="text-blue-700 font-medium mb-2">AI Researcher & Instructor</div>
              <div className="text-gray-600 text-sm">With a Master's in AI from Soonchunhyang University (Korea), Visal is a researcher and developer specializing in Computer Vision and Machine Learning. He is passionate about mentoring the next generation of tech professionals in Cambodia.</div>
            </div>
            <div className="flex flex-col items-center text-center bg-blue-50 rounded-xl p-6">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-blue-700 to-yellow-400 flex items-center justify-center">
                <Image src="/img/sirymony-sot.jpg" alt="Sirymony Sot" width={112} height={112} className="object-cover w-full h-full" onError={(e) => {e.target.onerror=null; e.target.src='/next_skill.png';}} />
              </div>
              <div className="font-bold text-lg mb-1 text-gray-900">Sirymony Sot</div>
              <div className="text-blue-700 font-medium mb-2">Back-End Developer & Instructor</div>
              <div className="text-gray-600 text-sm">A skilled Back-End Developer with experience building robust applications using Spring Boot. Sirymony is dedicated to sharing his expertise in back-end technologies and software architecture with the community.</div>
            </div>
            <div className="flex flex-col items-center text-center bg-blue-50 rounded-xl p-6">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-blue-700 to-yellow-400 flex items-center justify-center">
                <span className="text-4xl text-white"><i className="fas fa-user"></i></span>
              </div>
              <div className="font-bold text-lg mb-1 text-gray-900">Kosal Sean</div>
              <div className="text-blue-700 font-medium mb-2">Assistant Manager, System Development</div>
              <div className="text-gray-600 text-sm">Full experienced software developer with end-to-end expertise in the entire software development lifecycle. From requirement gathering to project deployment and maintenance, excels in developing complex systems and leveraging cutting-edge technologies.</div>
            </div>
          </div>
        </div>
        {/* Contact */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 hover:shadow-lg transition-transform">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-900"><i className="fas fa-envelope text-blue-700"></i> Get in Touch</h2>
          <p className="text-gray-600 mb-6">Have questions or want to collaborate? We'd love to hear from you!</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl"><i className="fas fa-envelope"></i></div>
              <div>
                <div className="font-bold text-gray-900">Email</div>
                <div className="text-gray-600">info@nextskillcambodia.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl"><i className="fab fa-telegram"></i></div>
              <div>
                <div className="font-bold text-gray-900">Telegram</div>
                <div className="text-gray-600">@nextskillcambodia</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl"><i className="fab fa-facebook"></i></div>
              <div>
                <div className="font-bold text-gray-900">Facebook</div>
                <div className="text-gray-600">NextSkill Cambodia</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl"><i className="fas fa-map-marker-alt"></i></div>
              <div>
                <div className="font-bold text-gray-900">Location</div>
                <div className="text-gray-600">Phnom Penh, Cambodia</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 