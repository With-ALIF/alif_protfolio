export function renderEducationSection(educationData) {
  let eduIndex = 0;

  const education = document.getElementById("education");
  if (!education || !educationData || !educationData.length) return;

  education.innerHTML = `
    <h2 class="section-tite">
      Academic <span class="text-gradient">Background</span>
    </h2>

    <div class="education-grid" id="educationGrid">
      ${educationData
        .map(
          (e, i) => `
        <div class="education-card" data-index="${i}">
          <div class="education-header">
            <img src="${e.logo}" class="education-logo" alt="${e.institute}">
            <div>
              <h3 class="education-degree">${e.degree}</h3>
              <p class="education-institute">
                ${e.institute}, ${e.district}
              </p>
            </div>
          </div>

          <div class="education-meta">
            <span class="education-class">${e.class}</span>
            <span class="education-year">${e.year}</span>
          </div>

          <p class="education-description">${e.description}</p>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="edu-dots" id="eduDots">
      ${educationData
        .map(
          (_, i) =>
            `<span class="edu-dot ${i === 0 ? "active" : ""}"></span>`
        )
        .join("")}
    </div>

    <div class="edu-timeline">
      <button id="eduPrev">‹</button>
      <div class="edu-line">
        <span class="edu-dot"></span>
      </div>
      <button id="eduNext">›</button>
    </div>

    <div id="eduCardWrapper">
      <div id="eduCard"></div>
    </div>
  `;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  /* ================= MOBILE ================= */

  if (isMobile) {
    const eduCard = document.getElementById("eduCard");
    const eduDot = document.querySelector(".edu-line .edu-dot");
    const eduPrev = document.getElementById("eduPrev");
    const eduNext = document.getElementById("eduNext");

    function renderEducation(direction = "right") {
      const e = educationData[eduIndex];

      eduCard.className = `edu-card slide-${direction}`;
      eduCard.innerHTML = `
        <div class="education-card">
          <div class="education-header">
            <img src="${e.logo}" class="education-logo" alt="${e.institute}">
            <div>
              <h3 class="education-degree">${e.degree}</h3>
              <p class="education-institute">
                ${e.institute}, ${e.district}
              </p>
            </div>
          </div>

          <div class="education-meta">
            <span class="education-class">${e.class}</span>
            <span class="education-year">${e.year}</span>
          </div>

          <p class="education-description">${e.description}</p>
        </div>
      `;

      const percent =
        educationData.length > 1
          ? (eduIndex / (educationData.length - 1)) * 100
          : 0;

      eduDot.style.left = `${percent}%`;
    }

    renderEducation();

    eduNext.onclick = () => {
      eduIndex = (eduIndex + 1) % educationData.length;
      renderEducation("right");
    };

    eduPrev.onclick = () => {
      eduIndex =
        (eduIndex - 1 + educationData.length) %
        educationData.length;
      renderEducation("left");
    };

    return;
  }

  /* ================= DESKTOP ================= */

  const grid = document.getElementById("educationGrid");
  const cards = Array.from(
    grid.querySelectorAll(".education-card")
  );
  const dots = document.querySelectorAll("#eduDots .edu-dot");

  function setActiveDot(index) {
    dots.forEach(d => d.classList.remove("active"));
    dots[index]?.classList.add("active");
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      cards[i].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
      setActiveDot(i);
    });
  });

  let scrollTimeout;
  grid.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(
          rect.left + rect.width / 2 -
            window.innerWidth / 2
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveDot(closestIndex);
    }, 100);
  });
}
