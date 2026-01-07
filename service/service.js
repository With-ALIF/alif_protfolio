async function loadService() {
  try {
    const res = await fetch("./service/service.json");
    if (!res.ok) throw new Error("service.json not found");
    const data = await res.json();
    renderService(data);
  } catch (err) {
    console.error("Service data load failed:", err);
  }
}

function renderService(serviceData) {
  const serviceContainer = document.getElementById("service");
  if (!serviceContainer || !serviceData?.items?.length) return;

  serviceContainer.innerHTML = `
    <h2 class="section-tile">
      ${serviceData.title.split(" ")[0]}
      <span class="text-accent">${serviceData.title.split(" ").slice(1).join(" ")}</span>
    </h2>

    <div class="service-list">
      ${serviceData.items.map(item => `
        <div class="service-item">
          <div class="service-header">
            <div class="service-left">
              <i data-lucide="${item.icon}" class="service-icon"></i>
              <h3>${item.title}</h3>
            </div>
            <span class="service-toggle">+</span>
          </div>

          <div class="service-body">
            <p>${item.description}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }

  const serviceItems = serviceContainer.querySelectorAll(".service-item");

  serviceItems.forEach(item => {
    const header = item.querySelector(".service-header");
    const body = item.querySelector(".service-body");

    header.addEventListener("click", () => {
      serviceItems.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
          i.querySelector(".service-body").style.maxHeight = null;
        }
      });

      item.classList.toggle("active");
      body.style.maxHeight = item.classList.contains("active")
        ? body.scrollHeight + "px"
        : null;
    });
  });
}

loadService();