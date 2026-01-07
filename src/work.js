fetch("src/work.json")
  .then(res => res.json())
  .then(data => {
    document.querySelector(".work-title").innerText =
      data.sectionTitle;

    const timeline = document.getElementById("work-timeline");

    data.experiences.forEach(item => {
      const div = document.createElement("div");
      div.className = "work-item";

      div.innerHTML = `
        <span class="work-dot work-${item.status}"></span>

        <div class="work-content">
          <span class="work-date">${item.start} - ${item.end}</span>
          <h3 class="work-name">${item.title}</h3>
          <p class="work-role">${item.role}</p>
          <span class="work-badge work-${item.status}">
            ${item.status}
          </span>
        </div>
      `;

      timeline.appendChild(div);
    });
  })
  .catch(err =>
    console.error("Failed to load src/work.json", err)
  );
