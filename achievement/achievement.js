import "../style/achievement-style.js";

export function renderAchievement(certificatesData) {
  const container = document.getElementById("achievementContainer");
  if (!container || !certificatesData || !certificatesData.items || !certificatesData.items.length) {
    console.warn("Achievement section not found or no data provided");
    return;
  }

  const items = certificatesData.items;
  const total = items.length;

  const certCard = (cert, isFeatured = false) => `
    <div class="ach-card ${isFeatured ? 'ach-card-featured' : ''}">
      <div class="ach-card-ribbon"><span>Certificate</span></div>
      <div class="ach-card-image">
        <img src="${cert.image}" alt="${cert.title} - Certificate by ${cert.issuer}" loading="lazy"
          onerror="this.src='https://via.placeholder.com/400x250?text=Certificate'">
        <div class="ach-card-image-overlay"></div>
      </div>
      <div class="ach-card-body">
        <div class="ach-card-issuer-badge">${cert.issuer}</div>
        <h4 class="ach-card-title">${cert.title}</h4>
        <div class="ach-card-divider"></div>
        <div class="ach-card-desc">${cert.description || ''}</div>

        ${cert.topics?.length ? `
          <div class="ach-card-topics">
            ${cert.topics.map(topic => `<span class="ach-topic">${topic}</span>`).join('')}
          </div>
        ` : ''}

        <div class="ach-card-meta">
          <div class="ach-meta-item">
            <span class="ach-meta-icon">◷</span>
            <div>
              <span class="ach-meta-label">ISSUED</span>
              <strong>${cert.issued_date}</strong>
            </div>
          </div>
          ${cert.credential_id ? `
            <div class="ach-meta-item">
              <span class="ach-meta-icon">#</span>
              <div>
                <span class="ach-meta-label">CREDENTIAL</span>
                <strong>${cert.credential_id}</strong>
              </div>
            </div>
          ` : ''}
        </div>

        ${cert.verification_url ? `
          <a href="${cert.verification_url}" target="_blank" rel="noopener noreferrer" class="ach-verify-btn">
            Verify Certificate <span>↗</span>
          </a>
        ` : ''}
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="ach-header">
      <h2 class="section-title">${certificatesData.title || 'My <span class="text-gradient">Achievements</span>'}</h2>
    </div>

    ${total > 0 ? `
    <div class="ach-slider-wrapper">
      <div class="ach-slider" id="achSlider">
        ${items.map(cert => certCard(cert, cert.featured)).join('')}
      </div>
    </div>

    ${total > 1 ? `
    <div class="ach-dots" id="achDots">
      ${items.map((_, i) => `<span class="ach-dot ${i === 0 ? 'active' : ''}" data-index="${i}" role="button" aria-label="Go to certificate ${i + 1}"></span>`).join('')}
    </div>
    ` : ''}
    ` : ''}
  `;

  if (total > 1) {
    initAchSlider();
  }
}

function initAchSlider() {
  const slider = document.getElementById("achSlider");
  const dots = document.querySelectorAll("#achDots .ach-dot");
  if (!slider) return;

  let currentIndex = 0;
  const cards = slider.querySelectorAll(".ach-card");
  const total = cards.length;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 1;
    return 2;
  }

  function scrollToIndex(idx) {
    const maxIndex = Math.max(0, total - getVisibleCount());
    currentIndex = Math.max(0, Math.min(idx, maxIndex));
    const card = cards[currentIndex];
    if (card) {
      slider.scrollTo({ left: card.offsetLeft - 10, behavior: "smooth" });
    }
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => scrollToIndex(parseInt(dot.dataset.index)));
  });

  let scrollTimeout;
  slider.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - slider.scrollLeft - 10);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      currentIndex = closest;
      dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    }, 100);
  });
}
