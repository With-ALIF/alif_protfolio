import "./body.js"
import { loadAllData } from "./utils/loadData.js"
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
import { renderWorkflow } from "./sections/workflow.js"
import { initScrollToTop } from "../scroll/scroll.js"
import { loadService } from "../service/service.js"

const loadLucideScript = () => new Promise(resolve => {
  const script = document.createElement("script")
  script.src = "https://unpkg.com/lucide@latest"
  script.onload = () => resolve()
  document.head.appendChild(script)
})

Promise.all([
  loadAllData(),
  loadLucideScript()
]).then(([
  data,
]) => {
  renderMeta(data.meta)
  renderHeader(data.logo, data.navigator)
  renderHero(data.hero)
  renderAbout(data.about)
  renderStats(data.stats)
  renderEducationSection(data.education)
  renderTools(data.tools)
  renderExperience(data.experience)
  renderProjects(data.projects)
  renderSkills(data.skills)
  renderReview(data.reviews)
  renderContact(data.contact)
  renderFooter(data.logo, data.footer)
  renderWorkflow(data.workflow);
  loadService(data.services);
  initScrollToTop()
}).catch(error => {
  console.error("Data loading error:", error)
})
