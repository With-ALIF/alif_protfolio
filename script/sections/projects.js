import "../../appearance/project-style.js";
import { renderProjectTags } from "../../tags/tags.js";
import { githubIcon, externalLinkIcon, detailsIcon } from "../../icons/index.js";

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
                  <img src="${p.thumbnail || p.image }" alt="${p.title}">
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