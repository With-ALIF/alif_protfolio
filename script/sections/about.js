export function renderAbout(about) {
  aboutContent.innerHTML = `
    <h1 class="section-label">${about.label}</h1>
    <h2 class="section-title">${about.title}</h2>
    ${about.paragraphs
      .map((p, i) => `<p class="about-text">${p}</p>`)
      .join("")}
    <span class="about-toggle">View more</span>
  `

  const texts = aboutContent.querySelectorAll(".about-text")
  const toggle = aboutContent.querySelector(".about-toggle")

  texts.forEach((text, i) => {
    if (i !== 0) text.style.display = "none"
  })

  toggle.addEventListener("click", () => {
    const expanded = toggle.classList.toggle("active")

    texts.forEach((text, i) => {
      if (i !== 0) {
        text.style.display = expanded ? "block" : "none"
      }
    })

    toggle.textContent = expanded ? "View less" : "View more"
  })
}
