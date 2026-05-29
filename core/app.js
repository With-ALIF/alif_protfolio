const styles = [
  "https://fonts.googleapis.com/css2?family=Clash+Display:wght@700;800&family=Satoshi:wght@400;500;600;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",

  "../lib/update.css",
  "../lib/error.css",
  "../tags/project-tag.css",
  "../scroll/scroll.css"
];

styles.forEach(href => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
});

import { initScrollToTop } from "../scroll/scroll.js";
import "../project/project-details.js";

document.addEventListener("DOMContentLoaded", () => {
  initScrollToTop();
});
