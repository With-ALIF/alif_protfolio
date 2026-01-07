import { loadJSON } from "./utils/loadJSON.js"

import { renderMeta } from "./sections/meta.js"
import { renderHeader } from "./sections/header.js"
import { renderHero } from "./sections/hero.js"
import { renderAbout } from "./sections/about.js"
import { renderStats } from "./sections/stats.js"
import { renderEducationSection } from "./sections/education.js"
import { renderTools } from "./sections/tools.js"
import { renderExperience } from "./sections/experience.js"
import { renderProjects } from "./sections/projects.js"
import { renderSkills } from "./sections/skills.js"
import { renderReview } from "./sections/review.js"
import { renderContact } from "./sections/contact.js"
import { renderFooter } from "./sections/footer.js"

Promise.all([
  loadJSON("data/meta.json"),
  loadJSON("data/logo.json"),
  loadJSON("data/navigator.json"),
  loadJSON("data/hero.json"),
  loadJSON("data/about.json"),
  loadJSON("data/stats.json"),
  loadJSON("data/education.json"),
  loadJSON("data/experience.json"),
  loadJSON("data/project.json"),
  loadJSON("data/skill.json"),
  loadJSON("data/tools.json"),
  loadJSON("data/review.json"),   
  loadJSON("data/contact.json"),
  loadJSON("data/footer.json")
]).then(([
  meta,
  logo,
  nav,
  hero,
  about,
  stats,
  education,
  experience,
  projects,
  skills,
  tools,
  reviews,
  contact,
  footer
]) => {
  renderMeta(meta)
  renderHeader(logo, nav)
  renderHero(hero)
  renderAbout(about)
  renderStats(stats)
  renderEducationSection(education)
  renderTools(tools)
  renderExperience(experience)
  renderProjects(projects)
  renderSkills(skills)
  renderReview(reviews)           
  renderContact(contact)
  renderFooter(logo, footer)
}).catch(error => {
  console.error("Data loading error:", error)
})