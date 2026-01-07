export function renderHero(hero) {
  heroSubtitle.textContent = hero.subtitle

  heroTitle.innerHTML = `
    <span>${hero.title.line1}</span>
    <span class="text-gradient">${hero.title.line2}</span>
  `

  heroDesc.textContent = hero.description

  heroImage.innerHTML = `
    <img
      src="https://github.com/With-ALIF/logo_zone/blob/main/person/alif.jpg?raw=true"
      alt="Alif"
      class="hero-photo"
      width="150"
      height="150"
    />
  `

  heroBtns.innerHTML = hero.buttons.map(b => {
    if (b.style === "cv") {
      return `
        <a href="${b.link}" class="btn btn-cv" target="_blank" rel="noopener">
          ${b.text}
        </a>
      `
    }
    return `<a href="${b.link}" class="btn btn-${b.style}">${b.text}</a>`
  }).join("")
}
