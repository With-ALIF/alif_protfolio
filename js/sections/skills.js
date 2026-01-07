export function renderSkills(skillsData) {
  const skillsHeader = document.getElementById("skillsHeader");
  const skillsContainer = document.getElementById("skillsContainer");

  if (
    !skillsHeader ||
    !skillsContainer ||
    !skillsData ||
    !skillsData.items?.length
  ) return;

  skillsHeader.innerHTML = `
    <h2 class="section-title">${skillsData.title}</h2>
  `;

  skillsContainer.innerHTML = `
    <div class="skills-grid">
      ${skillsData.items.map(skill => `
        <div class="skill-card">
          <div class="skill-top">
            <img class="skill-icon" src="${skill.icon}" alt="${skill.name}">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percent">${skill.level}%</span>
          </div>
          <div class="skill-bar">
            <span style="width:${skill.level}%"></span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}
