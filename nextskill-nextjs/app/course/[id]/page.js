"use client";
import Image from "next/image";
import { useState, useRef, useEffect, use } from "react";

export default function CourseDetailPage({ params }) {
  const { id } = use(params);
  const [course, setCourse] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Static data for demonstration
  const stats = [
    { label: '5 modules', desc: 'Gain insight into a topic and learn the fundamentals.' },
    { label: '4.7 ★', desc: '(1,343 reviews)' },
    { label: 'Beginner level', desc: 'Recommended experience' },
    { label: 'Flexible schedule', desc: '1 week at 10 hours a week\nLearn at your own pace' },
    { label: '96%', desc: 'Most learners liked this course' }
  ];
  const tabs = ['About', 'Outcomes', 'Modules', 'Recommendations', 'Testimonials'];
  const whatYouLearn = [
    'Concepts and principles that underpin how web development works',
    'Plan and execute a simple web development project'
  ];
  const skills = ['Database Design', 'Relational Databases', 'Databases', 'Database Management Systems', 'Data Manipulation', 'Data Integrity', 'Query Languages', 'MySQL', 'SQL'];
  const details = [
    {
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#E8F0FE"/><path d="M7 12l3 3 7-7" stroke="#1967D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ),
      title: 'Shareable certificate',
      desc: 'Add to your LinkedIn profile'
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#E8F0FE"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#1967D2" strokeWidth="2" strokeLinecap="round"/></svg>
      ),
      title: 'Assessments',
      desc: '1 quiz, 23 assignments'
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#E8F0FE"/><path d="M12 7v10M7 12h10" stroke="#1967D2" strokeWidth="2" strokeLinecap="round"/></svg>
      ),
      title: 'Taught in English',
      desc: <span className="text-blue-700">22 languages available</span>
    }
  ];

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === id);
        if (found) setCourse(found);
        else setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="text-gray-600">Sorry, we couldn't find the course you're looking for.</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="text-gray-500 text-lg">Loading...</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f5f8fe]">
      <Header />
      {/* Banner/Header */}
      <section className="w-full bg-[#f5f8fe] border-b border-gray-200 pt-10 pb-8 md:pt-16 md:pb-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:gap-10 relative">
          <div className="flex-1 z-10">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/next_skill.png" alt="NextSkill" width={48} height={48} className="rounded-full bg-white border" />
              <span className="font-bold text-2xl text-gray-900">NextSkill</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">{course.title}</h1>
            <div className="text-gray-700 mb-2 text-lg">This course is part of <a href="#" className="text-blue-700 underline">Meta Database Engineer Professional Certificate</a></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium text-sm">Instructor:</span>
              <a href="#" className="text-blue-700 underline font-medium text-sm">Taught by {course.instructor}</a>
            </div>
            <button className="mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow transition text-lg">Enroll for Free</button>
            <div className="mt-4 text-gray-700 text-sm">Try for Free: Enroll to start your 7-day full access free trial</div>
            <div className="mt-2 text-gray-900 font-semibold text-base">95,211 already enrolled</div>
            <div className="mt-1 text-gray-700 text-sm">Included with <span className="font-bold text-blue-700">coursera <span className="bg-blue-700 text-white rounded px-2 py-0.5 ml-1 text-xs align-middle">PLUS</span></span> • <a href="#" className="text-blue-700 underline">Learn more</a></div>
          </div>
          {/* Background graphic (optional) */}
          <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 z-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none"><circle cx="200" cy="150" r="120" fill="#e8f0fe" /><path d="M200 30a120 120 0 0 1 120 120h-40a80 80 0 0 0-80-80V30z" fill="#d2e3fc" /></svg>
          </div>
        </div>
      </section>

      {/* Floating Stats Card */}
      <section className="w-full flex justify-center -mt-10 mb-8 z-20 relative">
        <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 md:gap-0 max-w-5xl w-full">
          {stats.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-bold text-lg md:text-xl text-gray-900">{s.label}</span>
              <span className="text-gray-500 text-xs md:text-sm whitespace-pre-line">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="max-w-5xl mx-auto px-4 mb-8 border-b border-gray-200 flex gap-8 text-base font-medium">
        {tabs.map((tab, i) => (
          <a key={tab} href="#" className={`pb-3 ${i === 0 ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-700 hover:text-blue-700'}`}>{tab}</a>
        ))}
      </nav>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-4 py-10 mb-12 bg-white rounded-2xl shadow border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-left">What you'll learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {whatYouLearn.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-blue-700 text-xl mt-1">✔️</span>
              <span className="text-gray-900 text-base">{item}</span>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 text-left">Skills you'll gain</h3>
        <div className="flex flex-wrap gap-2 mb-8 text-left">
          {skills.map((skill) => (
            <span key={skill} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 text-left">Details to know</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-2 text-left">
          {details.map((d, i) => (
            <div key={i} className="flex flex-col items-start gap-2">
              <span>{d.icon}</span>
              <span className="font-semibold text-gray-900">{d.title}</span>
              <span className="text-xs text-gray-500">{d.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Modules Overview Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">There are 5 modules in this course</h2>
        <p className="text-gray-700 mb-2 max-w-2xl">In this course, you will be introduced to databases and explore the modern ways in which they are used. Learn to distinguish between different types of database management systems then practice basic creation and data selection with the use of Structured Query Language (SQL) commands.</p>
        <a href="#" className="text-blue-700 underline text-sm mb-6 inline-block">Read more</a>
        <div className="grid md:grid-cols-3 gap-8 mt-4">
          {/* Modules Card */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow border border-gray-200 divide-y">
              {/* Module rows */}
              <div className="px-6 py-5 flex flex-col gap-2">
                <div className="flex justify-between items-center py-4">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">Introduction to Databases</div>
                    <div className="text-xs text-gray-500">Module 1 • 4 hours to complete</div>
                  </div>
                  <span className="text-blue-700 font-medium cursor-pointer">Module details ▼</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">Create, Read, Update and Delete (CRUD) Operations</div>
                    <div className="text-xs text-gray-500">Module 2 • 11 hours to complete</div>
                  </div>
                  <span className="text-blue-700 font-medium cursor-pointer">Module details ▼</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">SQL Operators and sorting and filtering data</div>
                    <div className="text-xs text-gray-500">Module 3 • 5 hours to complete</div>
                  </div>
                  <span className="text-blue-700 font-medium cursor-pointer">Module details ▼</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">Database design</div>
                    <div className="text-xs text-gray-500">Module 4 • 5 hours to complete</div>
                  </div>
                  <span className="text-blue-700 font-medium cursor-pointer">Module details ▼</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">Graded assessment</div>
                    <div className="text-xs text-gray-500">Module 5 • 53 minutes to complete</div>
                  </div>
                  <span className="text-blue-700 font-medium cursor-pointer">Module details ▼</span>
                </div>
              </div>
              {/* Certificate section */}
              <div className="flex items-center gap-4 px-6 py-6 bg-gray-50 rounded-b-2xl">
                <div className="bg-blue-100 text-blue-700 rounded-full p-2">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/><circle cx="12" cy="14" r="2"/></svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Earn a career certificate</div>
                  <div className="text-xs text-gray-500">Add this credential to your LinkedIn profile, resume, or CV. Share it on social media and in your performance review.</div>
                </div>
              </div>
            </div>
          </div>
          {/* Instructor Card */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 w-full max-w-xs mx-auto">
              <div className="font-bold text-gray-900 mb-2">Instructor</div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-blue-700 text-xl">★</span>
                <span className="font-semibold text-gray-900">4.8</span>
                <span className="text-xs text-gray-500">(384 ratings)</span>
              </div>
              <a href="#" className="flex items-center gap-2 mb-2 hover:underline">
                <Image src="/next_skill.png" alt="Instructor" width={32} height={32} className="rounded-full bg-white border" />
                <div>
                  <div className="font-semibold text-blue-700">Taught by {course.instructor}</div>
                  <div className="text-xs text-gray-500">NextSkill Cambodia</div>
                </div>
              </a>
              <div className="text-xs text-gray-500 mb-4">129 Courses • 1,125,858 learners</div>
              <hr className="my-4" />
              <div className="font-bold text-gray-900 mb-2">Offered by</div>
              <a href="#" className="flex items-center gap-2 hover:underline">
                <Image src="/next_skill.png" alt="NextSkill Cambodia" width={28} height={28} className="rounded bg-white border" />
                <span className="font-semibold text-blue-700">NextSkill Cambodia</span>
              </a>
              <a href="#" className="text-blue-700 text-xs font-medium mt-2 block hover:underline">Learn more</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

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