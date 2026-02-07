export function renderEducationSection(educationData) {
  const education = document.getElementById("education");
  if (!education || !educationData || !educationData.length) {
    console.warn("Education section not found or no data provided");
    return;
  }

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
            <img src="${e.logo}" class="education-logo" alt="${e.institute}" onerror="this.style.display='none'">
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
      <button id="eduPrev" aria-label="Previous education">‹</button>
      <div class="edu-line">
        <span class="edu-dot"></span>
      </div>
      <button id="eduNext" aria-label="Next education">›</button>
    </div>

    <div id="eduCardWrapper">
      <div id="eduCard"></div>
    </div>
  `;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initializeEducation(educationData);
    });
  });
}

function initializeEducation(educationData) {
  let eduIndex = 0;
  const checkIsMobile = () => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width <= 768;
  };
  
  const isMobile = checkIsMobile();
  if (isMobile) {
    const eduCard = document.getElementById("eduCard");
    const eduDot = document.querySelector(".edu-line .edu-dot");
    const eduPrev = document.getElementById("eduPrev");
    const eduNext = document.getElementById("eduNext");

    if (!eduCard || !eduDot || !eduPrev || !eduNext) {
      console.error("Mobile education elements not found");
      return;
    }

    function renderEducation(direction = "right") {
      const e = educationData[eduIndex];

      if (!e) {
        console.error("Education data not found at index:", eduIndex);
        return;
      }
      eduCard.className = "";
      void eduCard.offsetWidth;
      eduCard.className = `edu-card slide-${direction}`;
      
      eduCard.innerHTML = `
        <div class="education-card">
          <div class="education-header">
            <img src="${e.logo}" class="education-logo" alt="${e.institute}" onerror="this.style.display='none'">
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

      const percent = educationData.length > 1
          ? (eduIndex / (educationData.length - 1)) * 100
          : 0;

      if (eduDot && eduDot.style) {
        eduDot.style.left = `${percent}%`;
      }
    }
    setTimeout(() => renderEducation("right"), 100);
    const handleNext = (e) => {
      if (e) e.preventDefault();
      eduIndex = (eduIndex + 1) % educationData.length;
      renderEducation("right");
    };

    const handlePrev = (e) => {
      if (e) e.preventDefault();
      eduIndex = (eduIndex - 1 + educationData.length) % educationData.length;
      renderEducation("left");
    };

    eduNext.onclick = handleNext;
    eduPrev.onclick = handlePrev;
    eduNext.addEventListener("touchstart", handleNext, { passive: false });
    eduPrev.addEventListener("touchstart", handlePrev, { passive: false });

    return;
  }

  const grid = document.getElementById("educationGrid");
  
  if (!grid) {
    console.error("Education grid not found");
    return;
  }

  const cards = Array.from(grid.querySelectorAll(".education-card"));
  const dots = document.querySelectorAll("#eduDots .edu-dot");

  if (cards.length === 0) {
    console.warn("No education cards found");
    return;
  }

  function setActiveDot(index) {
    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      if (cards[i]) {
        cards[i].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
        setActiveDot(i);
      }
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
          rect.left + rect.width / 2 - window.innerWidth / 2
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveDot(closestIndex);
    }, 100);
  });

  setActiveDot(0);
}