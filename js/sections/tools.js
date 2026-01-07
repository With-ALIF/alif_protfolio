export function renderTools(toolsData) {
  const toolsHeader = document.getElementById("toolsHeader");
  const toolsContainer = document.getElementById("toolsContainer");

  if (
    !toolsHeader ||
    !toolsContainer ||
    !toolsData ||
    !toolsData.items?.length
  ) return;

  toolsHeader.innerHTML = `
     <h2 class="section-title">
      <span class="text-gradient">Tools</span>
    </h2>
  `;

  toolsContainer.innerHTML = `
    <div class="tools-grid">
      ${toolsData.items.map(tool => `
        <div class="tool-card">
          <img src="${tool.icon}" alt="${tool.name}" class="tool-icon" loading="lazy">
          <span class="tool-name">${tool.name}</span>
        </div>
      `).join("")}
    </div>
  `;
}
