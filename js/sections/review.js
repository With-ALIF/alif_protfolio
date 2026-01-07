export function renderReview(reviewData) {
  const reviewHeader = document.getElementById("reviewHeader");
  const reviewContainer = document.getElementById("reviewContainer");
  if (!reviewHeader || !reviewContainer || !reviewData?.items?.length) return;

  reviewHeader.innerHTML = `<span class="review-label">Testimonial</span>`;

  reviewContainer.innerHTML = `
    <div class="review-grid" id="reviewGrid">
      ${reviewData.items
        .map(
          (item) => `
        <div class="review-inner">
          <div class="review-quote">"</div>
          <p class="review-text">${item.comment}</p>
          <div class="review-author">
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="review-dots" id="reviewDots">
      ${reviewData.items
        .map(
          (_, i) =>
            `<span class="dot ${i === 0 ? "active" : ""}"></span>`
        )
        .join("")}
    </div>
  `;

  const grid = document.getElementById("reviewGrid");
  const cards = Array.from(grid.querySelectorAll(".review-inner"));
  const dots = document.querySelectorAll("#reviewDots .dot");

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
}