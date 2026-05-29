document.getElementById("body").innerHTML = `
<header class="header">
  <div class="container header-content">
    <a class="logo" id="logo"></a>
    <button id="menuBtn">☰</button>
    <nav id="nav"></nav>
  </div>
</header>
<main>
  <section class="hero" id="home">
   <div class="container hero-content">
    <p class="hero-subtitle" id="heroSubtitle"></p>
    <h1 class="hero-title" id="heroTitle"></h1>
    <div id="heroImage"></div>
    <p class="hero-description" id="heroDesc"></p>
    <div class="hero-buttons" id="heroBtns"></div>
  </div>
</section>

<section id="about">
  <div class="container about-grid">
    <div id="aboutContent"></div>
    <div>
      <div id="stats"></div>
      <div class="tech-card">
        <h3 id="techTitle"></h3>
        <div class="tech-tags" id="techTags"></div>
      </div>
    </div>
  </div>
</section>

<section id="skills-section">
  <div class="container">
    <div id="skillsHeader"></div>
    <div id="skillsContainer"></div>
  </div>
</section>

<section id="tools" class="section">
  <div class="container">
    <div id="toolsHeader"></div>
    <div id="toolsContainer"></div>
  </div>
</section>

  <section id="projects-section">
  <div class="container">
  <div id="projectHeader"></div>
  <div id="projectsContainer"></div>
  </div>
</section>

<section id="experience-section">
  <div class="container">
    <div id="experienceHeader"></div>
    <div id="experienceContainer"></div>
  </div>
</section>

<section id="education-section">
  <div class="container">
    <div id="education"></div>
  </div>
</section>

<div id="experience-section">
  <h2 class="section-title"></h2>
  <div id="timeline"></div>
</div>

<section id="review-section">
  <div class="container">
    <div id="reviewHeader" class="review-header"></div>
    <div id="reviewContainer"></div>
  </div>
</section>

<section id="workflow-section">
  <div class="container">
    <h2 class="section-title">Work <span class="text-gradient">Flow</span></h2>
    <div id="workflow-container"></div>
  </div>
</section>

<section id="service-section">
  <div class="container">
    <div id="service"></div> </div>
</section>

<section id="contact-section">
  <div class="container">
    <div id="contact"></div>
  </div>
</section>
</main>

<footer class="footer">
  <div class="container footer-content" id="footer"></div>
</footer>
`;
