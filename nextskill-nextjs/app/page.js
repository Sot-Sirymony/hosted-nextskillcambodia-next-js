"use client";
import Image from "next/image";
import FeaturedCourses from "./components/FeaturedCourses";
import { useState, useRef, useEffect } from "react";

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <b key={i} className="text-blue-700">{part}</b> : part
  );
}

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
                    href={item.type === 'course' ? `/courses/${item.id}` : '#'}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition border-b last:border-b-0 border-gray-100"
                  >
                    {item.type === 'course' ? (
                      <Image src={item.image} alt={item.title} width={40} height={40} className="rounded object-cover" />
                    ) : (
                      <span className="text-2xl" style={{ color: item.color }}>{item.icon}</span>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium text-black text-base">{highlightMatch(item.type === 'course' ? item.title : item.name, search)}</span>
                      <span className="text-xs text-gray-500 truncate max-w-xs">{highlightMatch(item.type === 'course' ? item.description : item.description, search)}</span>
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

function Hero() {
  const slides = [
    {
      headline: (
        <>
          Master In-Demand Tech Skills<br />
          with NextSkill Cambodia
        </>
      ),
      subtext: "Advance your career with expert-led online courses in web development, AI, cloud, and more.",
      button: "Browse All Courses",
      image: null,
      logo: "/next_skill.png",
      logoText: "NextSkill Cambodia"
    },
    {
      headline: (
        <>
          Learn Web Development<br />
          from Industry Experts
        </>
      ),
      subtext: "Build real-world projects and become job-ready with our hands-on web dev curriculum.",
      button: "Start Web Dev Path",
      image: null,
      logo: "/next_skill.png",
      logoText: "Web Development"
    },
    {
      headline: (
        <>
          AI & Data Science<br />
          For Everyone
        </>
      ),
      subtext: "Unlock the power of AI and data with beginner to advanced courses, taught by professionals.",
      button: "Explore AI & Data Courses",
      image: null,
      logo: "/next_skill.png",
      logoText: "Data Science"
    }
  ];
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  // Auto-slide every 7s
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [current, slides.length]);

  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative min-h-[60vh] h-auto flex flex-col md:flex-row items-center justify-center overflow-hidden bg-center bg-cover" style={{backgroundImage: 'url(https://training.apple.com/content/dam/appletraining/us/en/2022/hero/AppDevTraining-hero.jpg)'}}>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between px-2 sm:px-4 py-8 md:py-16 lg:py-24 gap-6 md:gap-8 lg:gap-12 transition-all duration-700 z-10">
        {/* Left: Card (transparent for all slides) */}
        <div
          className={
            `bg-white/30 backdrop-blur-md shadow-xl rounded-lg p-4 sm:p-6 md:p-10 lg:p-12 w-full max-w-xl flex flex-col justify-center z-10 transition-all duration-700 text-center md:text-left`
          }
          key={current}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight">{slides[current].headline}</h1>
          <p className="text-base sm:text-lg text-gray-900 mb-6 md:mb-8">{slides[current].subtext}</p>
          <a href="#" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded transition shadow text-base md:text-lg">{slides[current].button}</a>
        </div>
        {/* Right: Product Image & Large Text */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full md:w-auto mt-8 md:mt-0 transition-all duration-700">
          <div className="flex flex-col items-center justify-center w-full">
            {slides[current].image && (
              <Image src={slides[current].image} alt={slides[current].logoText} width={500} height={280} className="object-contain rounded-lg shadow-lg w-full max-w-[400px] md:max-w-[500px] h-40 sm:h-56 md:h-72 lg:h-80" />
            )}
            <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
              {current !== 0 && (
                <span className="text-white text-2xl sm:text-4xl md:text-6xl font-bold drop-shadow-lg tracking-tight">{slides[current].logoText}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Carousel Controls */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4 z-20">
        <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-black shadow transition disabled:opacity-50" aria-label="Previous slide">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`w-3 h-3 rounded-full transition ${i === current ? 'bg-white' : 'bg-white/40'}`} aria-label={`Slide ${i+1}`} />
        ))}
        <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-black shadow transition disabled:opacity-50" aria-label="Next slide">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/testimonials.json")
      .then((res) => res.json())
      .then(setTestimonials);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">What Our Students Say</h2>
          <p className="text-gray-600">Real feedback from our community of learners</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 shadow flex flex-col gap-4">
              <p className="text-gray-900">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} width={48} height={48} className="rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="bg-white/90 border border-blue-100 rounded-2xl shadow-lg max-w-2xl w-full p-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">Stay Updated</h2>
          <p className="text-gray-600 mb-6 text-center">Get the latest course updates, industry insights, and exclusive learning resources delivered to your inbox.</p>
          <form className="w-full flex flex-col sm:flex-row gap-2 mb-4" autoComplete="off">
            <input
              type="email"
              className="flex-1 rounded-lg border border-blue-200 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email address"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              <span>Subscribe</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
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

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <FeaturedCourses />
      <Testimonials />
      <Newsletter />
      <Footer />
      <style jsx global>{`
        .navbar-link-animated {
          position: relative;
          text-decoration: none !important;
        }
        .navbar-link-animated::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background: #000;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .navbar-link-animated:hover::after, .navbar-link-animated:focus::after {
          transform: scaleX(1);
        }
        .mobile-navbar-link-animated {
          position: relative;
          text-decoration: none !important;
          display: inline-block;
          transition: color 0.2s;
        }
        .mobile-navbar-link-animated::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 3px;
          background: #000;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-navbar-link-animated:hover::after,
        .mobile-navbar-link-animated:focus::after,
        .mobile-navbar-link-animated:active::after,
        .mobile-navbar-link-animated.mobile-navbar-link-animated-active::after {
          transform: scaleX(1);
        }
        .mobile-underline {
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 3px;
          background: #000;
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s;
          opacity: 1;
        }
      `}</style>
    </main>
  );
}
