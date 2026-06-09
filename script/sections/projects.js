const projectHeader = document.getElementById("projectHeader");
const projectsContainer = document.getElementById("projectsContainer");

const githubIcon = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.933 0-1.31.47-2.38 1.235-3.22-.125-.304-.535-1.53.115-3.19 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.005-.405c1.02.005 2.045.137 3.005.405 2.28-1.552 3.285-1.23 3.285-1.23.655 1.66.245 2.886.12 3.19.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.1.81 2.22 0 1.605-.015 2.9-.015 3.295 0 .32.21.695.825.575C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
</svg>`;

const externalLinkIcon = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  <polyline points="15 3 21 3 21 9"/>
  <line x1="10" y1="14" x2="21" y2="3"/>
</svg>`;

import "../../appearance/project-style.js";
import { renderProjectTags } from "../../tags/tags.js";

const detailsIcon = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="16" x2="12" y2="12"></line>
  <line x1="12" y1="8" x2="12.01" y2="8"></line>
</svg>`;

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
                  <img src="${p.thumbnail || p.image || 'https://via.placeholder.com/400x225'}" alt="${p.title}">
                </div>
                <div class="project-body">
                  <h3 class="project-title">${p.title}</h3>
                  <p class="project-description">${p.description}</p>
                  <div class="project-tags" data-tags="${p.tags.join(',')}"></div>
                  <div class="project-actions">
                    <a href="project/project.html?id=${p.id || p.title.toLowerCase().replace(/\s+/g, '-')}" class="btn-project">${detailsIcon}Details</a>
                    <a href="${p.github}" class="btn-project" target="_blank">${githubIcon}GitHub</a>
                    <a href="${p.demo}" class="btn-project primary" target="_blank">${externalLinkIcon}Live Demo</a>
                  </div>
                </div>
              </div>
            `).join("")
            : `<p class="no-result">No projects found</p>`
        }
      </div>
    `;
    document.querySelectorAll('.project-card').forEach(card => {
  const tagsDiv = card.querySelector('.project-tags');
  if (tagsDiv && tagsDiv.dataset.tags) {
    const tags = tagsDiv.dataset.tags.split(',');
    renderProjectTags(tagsDiv, tags);
  }
});
  }
}