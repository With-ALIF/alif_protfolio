export function renderWorkflow(data) {
  const container = document.getElementById("workflow-container");
  if (!container || !data) return;

  container.innerHTML = `
    <div class="workflow-timeline">
      ${data.map((item, index) => `
        <div class="workflow-item">
          <div class="workflow-dot"></div>
          <div class="workflow-card">
            ${item.logo ? `<img src="${item.logo}" alt="${item.title} logo" class="workflow-logo">` : ""}
            <span class="workflow-year">${item.year}</span>
            <h3 class="workflow-title">${item.title}</h3>
            <p class="workflow-role">${item.role}</p>
            ${item.status ? `<span class="workflow-status">${item.status}</span>` : ""}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}
