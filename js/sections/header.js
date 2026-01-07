export function renderHeader(logoData, navigation) {
  const logo = document.getElementById("logo");
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");

  logo.innerHTML = logoData.html;

  nav.innerHTML = navigation
    .map(n => `<a href="${n.link}">${n.label}</a>`)
    .join("");

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("active") &&
      !nav.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      nav.classList.remove("active");
    }
  });

  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) {
      nav.classList.remove("active");
    }
  });
}
