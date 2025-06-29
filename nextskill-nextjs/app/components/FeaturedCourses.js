"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Listbox } from "@headlessui/react";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [coursesRes, categoriesRes] = await Promise.all([
        fetch("/courses.json"),
        fetch("/categories.json"),
      ]);
      setCourses(await coursesRes.json());
      setCategories(await categoriesRes.json());
    }
    fetchData();
  }, []);

  useEffect(() => {
    let result = courses;
    if (search) {
      result = result.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (category) {
      result = result.filter((c) => c.category === category);
    }
    setFiltered(result);
  }, [search, category, courses]);

  // Custom CategoryDropdown component
  function CategoryDropdown({ categories, category, setCategory }) {
    return (
      <Listbox value={category} onChange={setCategory}>
        <div className="relative w-full md:w-64">
          <Listbox.Button className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span>
              {category
                ? <><span className="mr-2">{categories.find(c => c.name === category)?.icon}</span><span className="text-gray-900">{category}</span></>
                : <span className="text-gray-900">All Categories</span>}
            </span>
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            <Listbox.Option value="">
              {({ active }) => (
                <div className={`flex items-center px-4 py-2 cursor-pointer ${active ? 'bg-blue-50' : ''} text-gray-900`}>
                  All Categories
                </div>
              )}
            </Listbox.Option>
            {categories.map(cat => (
              <Listbox.Option key={cat.id} value={cat.name}>
                {({ selected, active }) => (
                  <div className={`flex items-center px-4 py-2 cursor-pointer ${active ? 'bg-blue-50' : ''} text-gray-900`}>
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                    {selected && <span className="ml-auto text-blue-600 font-bold">✓</span>}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Featured Courses</h2>
          <p className="text-gray-600">Handpicked courses to accelerate your learning journey</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mb-8 justify-center items-center">
          <div className="flex w-full md:w-auto gap-2 items-center">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
              </span>
              <input
                type="text"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <CategoryDropdown categories={categories} category={category} setCategory={setCategory} />
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg border border-gray-200 transition"
              onClick={() => { setSearch(""); setCategory(""); }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No courses found.</div>
          )}
          {filtered.map((c) => (
            <a
              key={c.id}
              href={`/course/${c.id}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition p-0 flex flex-col overflow-hidden cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
              tabIndex={0}
            >
              <div className="relative w-full h-40">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                {c.status && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded mb-2 w-fit">
                    {c.status}
                  </span>
                )}
                <h3 className="font-bold text-lg text-gray-900 mb-1">{c.title}</h3>
                {c.instructor && (
                  <div className="text-sm text-green-600 font-medium mb-1">{c.instructor}</div>
                )}
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{c.description}</p>
                {c.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="font-semibold text-gray-900">{c.rating}</span>
                    <span className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.round(c.rating) ? '' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                      ))}
                    </span>
                    {c.reviews && <span className="text-xs text-gray-500 ml-1">({c.reviews})</span>}
                  </div>
                )}
                {c.price !== undefined && (
                  <div className="font-bold text-lg text-gray-900 mb-1">${typeof c.price === 'number' ? c.price.toFixed(2) : c.price} USD</div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 