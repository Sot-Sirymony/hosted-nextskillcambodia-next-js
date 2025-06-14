fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('course-list');
    container.innerHTML = '';

    data.forEach(course => {
      const skills = course.skills.map(skill => `<span class="badge bg-secondary">${skill}</span>`).join(' ');

      const card = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card h-100 shadow-sm">
            <img loading="lazy" src="${course.image}" class="card-img-top" alt="${course.title}">
            <div class="card-header">
              <small class="text-muted">${course.category}</small>
            </div>
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text">${course.description}</p>
              <p>${skills}</p>
              <small class="text-${course.status === 'Open' ? 'success' : 'warning'}">Status: ${course.status}</small>
            </div>
            <div class="card-footer">
              <a href="course-detail.html?course=${course.id}" class="btn btn-primary w-100">View Course</a>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  });
