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
          <div class="experience-header">
            ${e.logo ? `<img src="${e.logo}" alt="${e.company} logo" class="experience-logo">` : ""}
            <p class="experience-company">${e.company}</p>
          </div>
          <h3 class="experience-role">${e.role}</h3>
          <span class="experience-duration">${e.duration}</span>
          <p class="experience-description">${e.description}</p>
        </div>
      `).join("")}
    </div>
  `;
}
