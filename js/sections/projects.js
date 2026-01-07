const projectHeader = document.getElementById("projectHeader");
const projectsContainer = document.getElementById("projectsContainer");

export function renderProjects(projectsData) {
  projectHeader.innerHTML = "";

  const title = document.createElement("h2");
  title.className = "section-title";
  title.innerHTML = projectsData.title;

  projectHeader.appendChild(title);

  drawProjects(projectsData.items);

  function drawProjects(items) {
    projectsContainer.innerHTML = `
      <div class="projects-grid">
        ${
          items.length
            ? items.map(p => `
              <div class="project-card">
                <div class="project-image">
                  <img src="${p.image}" alt="${p.title}">
                </div>
                <div class="project-body">
                  <h3 class="project-title">${p.title}</h3>
                  <p class="project-description">${p.description}</p>
                  <div class="project-tags">
                    ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
                  </div>
                  <div class="project-actions">
                    <a href="${p.github}" class="btn-project" target="_blank">GitHub</a>
                    <a href="${p.demo}" class="btn-project primary" target="_blank">Live Demo</a>
                  </div>
                </div>
              </div>
            `).join("")
            : `<p class="no-result">No projects found</p>`
        }
      </div>
    `;
  }
}
