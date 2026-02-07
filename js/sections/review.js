export function renderReview(reviewData) {
  const reviewHeader = document.getElementById("reviewHeader");
  const reviewContainer = document.getElementById("reviewContainer");
  
  if (!reviewHeader || !reviewContainer || !reviewData?.items?.length) {
    console.warn("Review section elements or data not found");
    return;
  }
 
  reviewHeader.innerHTML = `
    <span class="review-label">Testimonials</span>
  `;

 
  reviewContainer.innerHTML = `
    <div class="review-grid" id="reviewGrid">
      ${reviewData.items
        .map(
          (item, index) => `
        <div class="review-inner" data-index="${index}">
          <div class="review-quote">"</div>
          <p class="review-text">${item.comment}</p>
          ${item.rating ? `
            <div class="review-rating">
              ${generateStars(item.rating)}
            </div>
          ` : ''}
          <div class="review-author">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2256%22 height=%2256%22%3E%3Ccircle cx=%2228%22 cy=%2228%22 r=%2228%22 fill=%22%23333%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23fff%22 font-size=%2224%22%3E${item.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
            <div class="review-author-info">
              <h4>${item.name}</h4>
              ${item.role ? `<span class="review-author-role">${item.role}</span>` : ''}
            </div>
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
            `<span class="dot ${i === 0 ? "active" : ""}" data-index="${i}" role="button" aria-label="Go to review ${i + 1}"></span>`
        )
        .join("")}
    </div>
  `;

  // Initialize functionality after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeReviewSection();
  }, 50);
}

function generateStars(rating) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  let starsHTML = '';
  
  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars) {
      starsHTML += '<span class="star">★</span>';
    } else {
      starsHTML += '<span class="star empty">★</span>';
    }
  }
  
  return starsHTML;
}

function initializeReviewSection() {
  const grid = document.getElementById("reviewGrid");
  const dots = document.querySelectorAll("#reviewDots .dot");

  if (!grid) {
    console.error("Review grid not found");
    return;
  }

  const cards = Array.from(grid.querySelectorAll(".review-inner"));

  if (cards.length === 0) {
    console.warn("No review cards found");
    return;
  }

  // Check if mobile
  const width = window.innerWidth || document.documentElement.clientWidth;
  const isMobile = width <= 768;

  function setActiveDot(index) {
    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  // Dot click handlers
  dots.forEach((dot, i) => {
    const clickHandler = () => {
      if (cards[i]) {
        cards[i].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
        setActiveDot(i);
      }
    };

    dot.addEventListener("click", clickHandler);
    
    // Touch support for mobile
    if (isMobile) {
      dot.addEventListener("touchstart", (e) => {
        e.preventDefault();
        clickHandler();
      }, { passive: false });
    }
  });

  // Scroll tracking for active dot
  let scrollTimeout;
  grid.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const viewportCenter = window.innerWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveDot(closestIndex);
    }, 100);
  });

  // Touch swipe support for better mobile experience
  if (isMobile) {
    let touchStartX = 0;
    let touchEndX = 0;

    grid.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    grid.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        // Swiped left or right
        const currentIndex = Array.from(dots).findIndex(dot => 
          dot.classList.contains("active")
        );

        if (diff > 0 && currentIndex < cards.length - 1) {
          // Swiped left - next card
          cards[currentIndex + 1].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
          });
        } else if (diff < 0 && currentIndex > 0) {
          // Swiped right - previous card
          cards[currentIndex - 1].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
          });
        }
      }
    }
  }

  // Intersection Observer for fade-in animation
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }

  // Set initial active dot
  setActiveDot(0);
}

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Re-initialize if needed
    const reviewGrid = document.getElementById("reviewGrid");
    if (reviewGrid) {
      initializeReviewSection();
    }
  }, 250);
});