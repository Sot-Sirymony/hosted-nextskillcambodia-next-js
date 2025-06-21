// =========================
// NextSkill Cambodia - Enhanced JavaScript
// =========================

class CourseManager {
  constructor() {
    this.courses = [];
    this.categories = [];
    this.filteredCourses = [];
    this.searchTerm = '';
    this.selectedCategory = '';
    
    this.init();
  }

  async init() {
    console.log('Initializing CourseManager...');
    try {
      await Promise.all([
        this.loadCourses(),
        this.loadCategories()
      ]);
      console.log('Courses and categories loaded successfully');
      this.setupEventListeners();
      console.log('Event listeners setup');
      this.renderFeaturedCourses();
      console.log('All courses rendered in featured section');
      this.setupSearchAndFilter();
      console.log('Search and filter setup complete');
    } catch (error) {
      console.error('Error initializing course manager:', error);
      this.showError('Failed to load courses. Please try again later.');
    }
  }

  async loadCourses() {
    console.log('Loading courses...');
    const response = await fetch('courses.json');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    this.courses = await response.json();
    console.log('Loaded courses:', this.courses);
    this.filteredCourses = [...this.courses];
    console.log('Filtered courses:', this.filteredCourses);
  }

  async loadCategories() {
    console.log('Loading categories...');
    try {
      const response = await fetch('categories.json');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categoriesData = await response.json();
      
      // Validate that we have an array of categories
      if (!Array.isArray(categoriesData) || categoriesData.length === 0) {
        console.warn('Categories data is empty or invalid, using fallback categories');
        this.categories = this.getFallbackCategories();
      } else {
        this.categories = categoriesData;
      }
      
      console.log('Loaded categories:', this.categories);
      this.populateCategoryFilter();
    } catch (error) {
      console.error('Error loading categories:', error);
      console.log('Using fallback categories');
      this.categories = this.getFallbackCategories();
      this.populateCategoryFilter();
    }
  }

  getFallbackCategories() {
    return [
      {
        "id": "web-development",
        "name": "Web Development",
        "description": "Learn to build modern websites and web applications",
        "icon": "🌐",
        "color": "#007bff",
        "courses": ["web-dev"]
      },
      {
        "id": "database",
        "name": "Database",
        "description": "Master database design, development, and management",
        "icon": "🗄️",
        "color": "#28a745",
        "courses": ["database-dev"]
      },
      {
        "id": "devops",
        "name": "DevOps",
        "description": "Automate development and operations workflows",
        "icon": "⚙️",
        "color": "#ffc107",
        "courses": ["devops"]
      },
      {
        "id": "data-science",
        "name": "DataScience",
        "description": "Analyze data and build machine learning models",
        "icon": "📊",
        "color": "#dc3545",
        "courses": ["data-science"]
      }
    ];
  }

  populateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    if (!categoryFilter) {
      console.error('Category filter not found!');
      return;
    }

    // Clear existing options except "All Categories"
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    
    // Add category options
    this.categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = `${category.icon} ${category.name}`;
      categoryFilter.appendChild(option);
    });

    console.log('Category filter populated with', this.categories.length, 'categories');
  }

  filterByCategory(categoryName) {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.value = categoryName;
      this.selectedCategory = categoryName;
      this.filterCourses();
    }
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase();
        this.filterCourses();
      });
    }

    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.selectedCategory = e.target.value;
        this.filterCourses();
      });
    }
  }

  filterCourses() {
    console.log('Filtering courses...');
    console.log('Search term:', this.searchTerm);
    console.log('Selected category:', this.selectedCategory);
    console.log('Total courses before filtering:', this.courses.length);

    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(this.searchTerm) ||
                           course.description.toLowerCase().includes(this.searchTerm) ||
                           course.skills.some(skill => skill.toLowerCase().includes(this.searchTerm));
      
      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      
      console.log(`Course: ${course.title}`);
      console.log(`  - Category: ${course.category}, Selected: ${this.selectedCategory}, Matches: ${matchesCategory}`);
      console.log(`  - Search matches: ${matchesSearch}`);
      console.log(`  - Final result: ${matchesSearch && matchesCategory}`);
      
      return matchesSearch && matchesCategory;
    });

    console.log('Filtered courses count:', this.filteredCourses.length);
    console.log('Filtered courses:', this.filteredCourses);

    this.renderCourses();
  }

  renderCourses() {
    console.log('Rendering courses...');
    const container = document.getElementById('featured-courses');
    if (!container) {
      console.error('Featured courses container not found!');
      return;
    }

    console.log('Container found, filtered courses:', this.filteredCourses.length);

    if (this.filteredCourses.length === 0) {
      console.log('No courses to display, showing no results');
      container.innerHTML = this.renderNoResults();
      return;
    }

    console.log('Rendering', this.filteredCourses.length, 'courses');
    container.innerHTML = this.filteredCourses.map((course, index) => 
      this.renderCourseCard(course, index)
    ).join('');

    // Add staggered animation to cards
    this.animateCards();
  }

  renderCourseCard(course, index) {
    const skills = course.skills.map(skill => 
      `<span class="badge bg-secondary">${skill}</span>`
    ).join('');

    const statusClass = course.status === 'Open' ? 'success' : 'warning';
    const statusIcon = course.status === 'Open' ? '🟢' : '🟡';

    // Find category info from categories data
    const categoryInfo = this.categories.find(cat => cat.name === course.category);
    const categoryIcon = categoryInfo ? categoryInfo.icon : '📚';
    const categoryColor = categoryInfo ? categoryInfo.color : '#6c757d';

    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" style="animation-delay: ${index * 0.1}s;">
        <div class="card course-card h-100">
          <div class="position-relative">
            <img loading="lazy" src="${course.image}" class="card-img-top" alt="${course.title}" 
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 200%22><rect width=%22300%22 height=%22200%22 fill=%22%23f3f4f6%22/><text x=%22150%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%236b7280%22 font-size=%2216%22>${course.title}</text></svg>'">
            <div class="position-absolute top-0 end-0 m-2">
              <span class="badge bg-${statusClass}">${statusIcon} ${course.status}</span>
            </div>
          </div>
          <div class="card-header" style="border-left: 4px solid ${categoryColor};">
            <small><span style="color: ${categoryColor};">${categoryIcon}</span> ${course.category}</small>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${course.title}</h5>
            <p class="card-text flex-grow-1">${course.description}</p>
            <div class="mb-3">
              ${skills}
            </div>
          </div>
          <div class="card-footer">
            <a href="course-detail.html?course=${course.id}" class="btn btn-primary w-100">
              View Course
              <svg width="16" height="16" fill="currentColor" class="ms-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  renderNoResults() {
    return `
      <div class="col-12 text-center py-5">
        <div class="animate-fade-in-up">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
          <h3 class="mb-3">No courses found</h3>
          <p class="text-muted mb-4">Try adjusting your search terms or category filter.</p>
          <button class="btn btn-outline-primary" onclick="courseManager.clearFilters()">
            Clear Filters
          </button>
        </div>
      </div>
    `;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    
    const searchInput = document.getElementById('course-search');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    
    this.filteredCourses = [...this.courses];
    this.renderFeaturedCourses();
  }

  animateCards() {
    const cards = document.querySelectorAll('.course-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  setupSearchAndFilter() {
    // Add debounced search
    let searchTimeout;
    const searchInput = document.getElementById('course-search');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.searchTerm = e.target.value.toLowerCase();
          this.filterCourses();
        }, 300);
      });
    }

    // Add loading states
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.selectedCategory = e.target.value;
        this.showLoading();
        setTimeout(() => {
          this.filterCourses();
          this.hideLoading();
        }, 200);
      });
    }
  }

  showLoading() {
    const container = document.getElementById('featured-courses');
    if (container) {
      container.innerHTML = `
        <div class="col-12">
          <div class="loading-spinner">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Filtering courses...</p>
          </div>
        </div>
      `;
    }
  }

  hideLoading() {
    // Loading is hidden when renderCourses() is called
  }

  showError(message) {
    const container = document.getElementById('featured-courses');
    if (container) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="animate-fade-in-up">
            <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
            <h3 class="mb-3">Oops! Something went wrong</h3>
            <p class="text-muted mb-4">${message}</p>
            <button class="btn btn-primary" onclick="location.reload()">
              Try Again
            </button>
          </div>
        </div>
      `;
    }
  }

  renderFeaturedCourses() {
    console.log('Rendering featured courses...');
    const container = document.getElementById('featured-courses');
    if (!container) {
      console.error('Featured courses container not found!');
      return;
    }

    // Show ALL courses as featured
    const featuredCourses = this.courses;
    console.log('All courses as featured:', featuredCourses);

    if (featuredCourses.length === 0) {
      console.log('No featured courses to display');
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <p class="text-muted">No featured courses available.</p>
        </div>
      `;
      return;
    }

    console.log('Rendering', featuredCourses.length, 'featured courses');
    container.innerHTML = featuredCourses.map((course, index) => 
      this.renderCourseCard(course, index)
    ).join('');

    // Add staggered animation to featured cards
    this.animateCards();
  }
}

// Enhanced UI Utilities
class UIEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupIntersectionObserver();
    this.setupHoverEffects();
    this.setupFormEnhancements();
  }

  setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          // Add animation class and flag
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.add('animated');
          
          // Remove observer after animation starts
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .testimonial-card, h2, h3');
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }

  setupHoverEffects() {
    // Add hover effects to cards
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.course-card')) {
        const card = e.target.closest('.course-card');
        card.style.transform = 'translateY(-8px)';
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.course-card')) {
        const card = e.target.closest('.course-card');
        card.style.transform = 'translateY(0)';
      }
    });
  }

  setupFormEnhancements() {
    // Newsletter form enhancement
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletterSubmit(e.target);
      });

      // Add real-time validation
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput) {
        emailInput.addEventListener('input', (e) => {
          this.validateEmail(e.target);
        });

        emailInput.addEventListener('blur', (e) => {
          this.validateEmail(e.target);
        });
      }
    }
  }

  validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const form = input.closest('.newsletter-form');
    
    // Remove existing states
    form.classList.remove('success', 'error');
    
    if (email === '') {
      return false;
    }
    
    if (emailRegex.test(email)) {
      form.classList.add('success');
      return true;
    } else {
      form.classList.add('error');
      return false;
    }
  }

  async handleNewsletterSubmit(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    const email = emailInput.value.trim();
    
    // Validate email
    if (!this.validateEmail(emailInput)) {
      this.showNotification('Please enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    const originalText = button.innerHTML;

    // Show loading state
    button.disabled = true;
    button.classList.add('loading');
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subscribing...';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      this.showNotification('Successfully subscribed! Check your email for confirmation.', 'success');
      form.reset();
      form.classList.remove('success', 'error');
    } catch (error) {
      this.showNotification('Failed to subscribe. Please try again.', 'error');
    } finally {
      button.disabled = false;
      button.classList.remove('loading');
      button.innerHTML = originalText;
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
    notification.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Export for global access
window.CourseManager = CourseManager;
window.UIEnhancer = UIEnhancer;
