export function renderExperience(experienceData) {
  const experienceHeader = document.getElementById("experienceHeader");
  const experienceContainer = document.getElementById("experienceContainer");

  if (!experienceHeader || !experienceContainer || !experienceData?.length) return;

  experienceHeader.innerHTML = `
    <h2 class="section-title">
      Work <span class="text-gradient">Experience</span>
    </h2>
  `;

  experienceContainer.innerHTML = `
    <div class="experience-grid">
      ${experienceData.map(e => `
        <div class="experience-card">
          <h3 class="experience-role">${e.role}</h3>
          <p class="experience-company">${e.company}</p>
          <span class="experience-duration">${e.duration}</span>
          <p class="experience-description">${e.description}</p>
        </div>
      `).join("")}
    </div>
  `;
}
