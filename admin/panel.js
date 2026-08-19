import { supabase } from "../config/supabase.js";

const navSections = [
  { id: "hero", label: "Hero", icon: "🏠", type: "jsonb" },
  { id: "about", label: "About", icon: "👤", type: "jsonb" },
  { id: "stats", label: "Stats", icon: "📊", type: "jsonb" },
  { id: "contact", label: "Contact", icon: "📬", type: "jsonb" },
  { id: "footer", label: "Footer", icon: "📄", type: "jsonb" },
  { id: "navigator", label: "Navigation", icon: "🧭", type: "jsonb" },
  { id: "logo", label: "Logo", icon: "✨", type: "jsonb" },
  { id: "projects", label: "Projects", icon: "📁", type: "table" },
  { id: "skills", label: "Skills", icon: "💻", type: "table" },
  { id: "education", label: "Education", icon: "🎓", type: "table" },
  { id: "experience", label: "Experience", icon: "💼", type: "table" },
  { id: "services", label: "Services", icon: "🔧", type: "table" },
  { id: "reviews", label: "Reviews", icon: "⭐", type: "table" },
  { id: "workflow", label: "Workflow", icon: "⚡", type: "table" },
  { id: "tools", label: "Tools", icon: "🛠", type: "table" },
  { id: "project_details", label: "Project Details", icon: "📝", type: "details" },
];

const ALLOWED_EMAIL = "alifbrur16@gmail.com";

let currentSection = null;
let currentType = null;

async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || session.user.email !== ALLOWED_EMAIL) {
    await supabase.auth.signOut();
    window.location.href = "../admin.html";
    return null;
  }
  document.getElementById("admin-email").textContent = session.user.email;
  return session;
}

function showToast(msg, type = "success") {
  const t = document.getElementById("admin-toast");
  t.textContent = msg;
  t.className = `admin-toast ${type} show`;
  setTimeout(() => t.className = "admin-toast", 3000);
}

function esc(s) {
  if (s == null) return "";
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildNav() {
  const nav = document.getElementById("admin-panel-nav");
  nav.innerHTML = navSections.map(s =>
    `<button class="admin-panel-nav-item" data-section="${s.id}" data-type="${s.type}">${s.icon} ${s.label}</button>`
  ).join("");
  nav.addEventListener("click", e => {
    const btn = e.target.closest(".admin-panel-nav-item");
    if (!btn) return;
    nav.querySelectorAll(".admin-panel-nav-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadSection(btn.dataset.section, btn.dataset.type);
  });
}

async function loadSection(id, type) {
  currentSection = id;
  currentType = type;
  const label = navSections.find(s => s.id === id)?.label || id;
  document.getElementById("admin-section-title").textContent = label;
  const content = document.getElementById("admin-panel-content");
  content.innerHTML = '<div class="admin-panel-loading">Loading...</div>';

  if (type === "jsonb") {
    await loadJsonbSection(id);
  } else if (type === "details") {
    await loadProjectDetailsSection();
  } else {
    await loadTableSection(id);
  }
}

// ============================================
// JSONB SECTIONS (site_content table)
// ============================================
async function loadJsonbSection(section) {
  const content = document.getElementById("admin-panel-content");
  let data = null;
  try {
    const res = await supabase.from("site_content").select("data").eq("section", section).single();
    if (!res.error && res.data) data = res.data.data;
  } catch {}

  if (!data) { content.innerHTML = '<div class="admin-panel-loading">No data found.</div>'; return; }

  let html = "";
  switch (section) {
    case "hero": html = heroEditor(data); break;
    case "about": html = aboutEditor(data); break;
    case "stats": html = statsEditor(data); break;
    case "contact": html = contactEditor(data); break;
    case "footer": html = footerEditor(data); break;
    case "navigator": html = navEditor(data); break;
    case "logo": html = logoEditor(data); break;
  }

  content.innerHTML = html + saveBar();
  bindInputs(content, data);
  document.getElementById("admin-save-btn").onclick = () => saveJsonb(section, data);
  document.getElementById("admin-reset-btn").onclick = () => loadSection(section, "jsonb");

  if (section === "about") {
    if (!data.paragraphs) data.paragraphs = [];
    content.querySelectorAll("[data-para-idx]").forEach(textarea => {
      textarea.addEventListener("input", () => {
        data.paragraphs[parseInt(textarea.dataset.paraIdx)] = textarea.value;
      });
    });
    content.querySelectorAll("[data-remove-para]").forEach(btn => {
      btn.addEventListener("click", () => {
        data.paragraphs.splice(parseInt(btn.dataset.removePara), 1);
        rerenderJsonb(section, data);
      });
    });
    const addBtn = content.querySelector("#admin-add-para");
    if (addBtn) addBtn.addEventListener("click", () => {
      data.paragraphs.push("");
      rerenderJsonb(section, data);
    });
  }

  if (section === "stats" && Array.isArray(data)) {
    content.querySelectorAll("[data-stat-idx]").forEach(input => {
      input.addEventListener("input", () => {
        const idx = parseInt(input.dataset.statIdx);
        const field = input.dataset.field;
        if (data[idx]) data[idx][field] = input.value;
      });
    });
    const addBtn = content.querySelector("#admin-add-stat-btn");
    if (addBtn) addBtn.addEventListener("click", () => {
      data.push({ number: "", label: "" });
      rerenderJsonb(section, data);
    });
  }

  if (section === "navigator" && Array.isArray(data)) {
    content.querySelectorAll("[data-nav-idx]").forEach(input => {
      input.addEventListener("input", () => {
        const idx = parseInt(input.dataset.navIdx);
        const field = input.dataset.field;
        if (data[idx]) data[idx][field] = input.value;
      });
    });
    const addBtn = content.querySelector("#admin-add-nav-link");
    if (addBtn) addBtn.addEventListener("click", () => {
      data.push({ label: "", link: "" });
      rerenderJsonb(section, data);
    });
  }

  if (section === "contact") {
    const socials = data.details?.socials || {};
    const origKeys = Object.keys(socials);
    const keyMap = {};

    content.querySelectorAll("[data-social-key]").forEach(input => {
      const idx = parseInt(input.dataset.socialKey);
      const field = input.dataset.field;
      if (!keyMap[idx]) keyMap[idx] = origKeys[idx] || "";
      input.addEventListener("input", () => {
        const currentKey = keyMap[idx];
        if (field === "key") {
          const newKey = input.value.trim();
          if (currentKey && currentKey !== newKey) {
            socials[newKey] = socials[currentKey];
            delete socials[currentKey];
            keyMap[idx] = newKey;
          }
        } else if (field === "icon") {
          if (currentKey) {
            if (typeof socials[currentKey] !== "object") {
              socials[currentKey] = { url: socials[currentKey], icon: "" };
            }
            socials[currentKey].icon = input.value;
          }
        } else {
          if (currentKey) {
            if (typeof socials[currentKey] !== "object") {
              socials[currentKey] = { url: input.value, icon: "" };
            } else {
              socials[currentKey].url = input.value;
            }
          }
        }
      });
    });

    content.querySelectorAll("[data-remove-social]").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.removeSocial;
        delete socials[key];
        rerenderJsonb(section, data);
      });
    });

    const addBtn = content.querySelector("#admin-add-social");
    if (addBtn) addBtn.addEventListener("click", () => {
      let newName = "new-platform";
      let i = 1;
      while (socials[newName]) { newName = "new-platform-" + i; i++; }
      socials[newName] = { url: "", icon: "" };
      rerenderJsonb(section, data);
    });
  }
}

function rerenderJsonb(section, data) {
  const content = document.getElementById("admin-panel-content");
  let html = "";
  switch (section) {
    case "hero": html = heroEditor(data); break;
    case "about": html = aboutEditor(data); break;
    case "stats": html = statsEditor(data); break;
    case "contact": html = contactEditor(data); break;
    case "footer": html = footerEditor(data); break;
    case "navigator": html = navEditor(data); break;
    case "logo": html = logoEditor(data); break;
  }
  content.innerHTML = html + saveBar();
  bindInputs(content, data);
  document.getElementById("admin-save-btn").onclick = () => saveJsonb(section, data);
  document.getElementById("admin-reset-btn").onclick = () => loadSection(section, "jsonb");

  if (section === "about") {
    if (!data.paragraphs) data.paragraphs = [];
    content.querySelectorAll("[data-para-idx]").forEach(textarea => {
      textarea.addEventListener("input", () => {
        data.paragraphs[parseInt(textarea.dataset.paraIdx)] = textarea.value;
      });
    });
    content.querySelectorAll("[data-remove-para]").forEach(btn => {
      btn.addEventListener("click", () => {
        data.paragraphs.splice(parseInt(btn.dataset.removePara), 1);
        rerenderJsonb(section, data);
      });
    });
    const addBtn = content.querySelector("#admin-add-para");
    if (addBtn) addBtn.addEventListener("click", () => {
      data.paragraphs.push("");
      rerenderJsonb(section, data);
    });
  }

  if (section === "stats" && Array.isArray(data)) {
    content.querySelectorAll("[data-stat-idx]").forEach(input => {
      input.addEventListener("input", () => {
        const idx = parseInt(input.dataset.statIdx);
        const field = input.dataset.field;
        if (data[idx]) data[idx][field] = input.value;
      });
    });
    const addBtn = content.querySelector("#admin-add-stat-btn");
    if (addBtn) addBtn.addEventListener("click", () => {
      data.push({ number: "", label: "" });
      rerenderJsonb(section, data);
    });
  }

  if (section === "navigator" && Array.isArray(data)) {
    content.querySelectorAll("[data-nav-idx]").forEach(input => {
      input.addEventListener("input", () => {
        const idx = parseInt(input.dataset.navIdx);
        const field = input.dataset.field;
        if (data[idx]) data[idx][field] = input.value;
      });
    });
    const addBtn = content.querySelector("#admin-add-nav-link");
    if (addBtn) addBtn.addEventListener("click", () => {
      data.push({ label: "", link: "" });
      rerenderJsonb(section, data);
    });
  }
}

function heroEditor(d) {
  return `<div class="admin-section-editor"><h3>Hero Section</h3>
    <div class="admin-form-row"><label>Title Line 2 (Name)</label><input type="text" data-path="title.line2" value="${esc(d.title?.line2 || "")}"></div>
    <div class="admin-form-row"><label>Description</label><textarea data-path="description">${esc(d.description || "")}</textarea></div>
    <div class="admin-form-row"><label>CV Link</label><input type="text" data-path="buttons.2.link" value="${esc(d.buttons?.[2]?.link || "")}"></div>
  </div>`;
}

function aboutEditor(d) {
  const paras = (d.paragraphs || []).map((p, i) =>
    `<div class="admin-item-card">
      <div class="admin-item-card-header"><h4>Paragraph ${i + 1}</h4>
        <button class="admin-item-remove-btn" data-remove-para="${i}">&times;</button>
      </div>
      <div class="admin-form-row"><textarea data-para-idx="${i}">${esc(p)}</textarea></div>
    </div>`
  ).join("");
  return `<div class="admin-section-editor"><h3>About Section</h3>
    <div class="admin-form-row"><label>Label</label><input type="text" data-path="label" value="${esc(d.label || "")}"></div>
    <div class="admin-form-row"><label>Title (HTML)</label><input type="text" data-path="title" value="${esc(d.title || "")}"></div>
  </div>
  <div class="admin-section-editor"><h3>Paragraphs</h3>
    <div id="about-paras-list">${paras}</div>
    <button class="admin-add-item-btn" id="admin-add-para">+ Add Paragraph</button>
  </div>`;
}

function statsEditor(d) {
  const items = Array.isArray(d) ? d : [];
  return `<div class="admin-section-editor"><h3>Stats</h3>
    ${items.map((s, i) => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>Stat ${i + 1}</h4>
          <button class="admin-item-remove-btn" onclick="this.closest('.admin-item-card').remove()" data-idx="${i}">&times;</button>
        </div>
        <div class="admin-form-row-inline">
          <div class="admin-form-row"><label>Number</label><input type="text" data-stat-idx="${i}" data-field="number" value="${esc(s.number)}"></div>
          <div class="admin-form-row"><label>Label</label><input type="text" data-stat-idx="${i}" data-field="label" value="${esc(s.label)}"></div>
        </div>
      </div>`).join("")}
    <button class="admin-add-item-btn" id="admin-add-stat-btn">+ Add Stat</button>
  </div>`;
}

function contactEditor(d) {
  const socials = d.details?.socials || {};
  const socialEntries = Object.entries(socials);
  return `<div class="admin-section-editor"><h3>Contact</h3>
    <div class="admin-form-row"><label>Title (HTML)</label><input type="text" data-path="title" value="${esc(d.title || "")}"></div>
    <div class="admin-form-row-inline">
      <div class="admin-form-row"><label>Email</label><input type="text" data-path="details.email" value="${esc(d.details?.email || "")}"></div>
      <div class="admin-form-row"><label>Location</label><input type="text" data-path="details.location" value="${esc(d.details?.location || "")}"></div>
    </div>
  </div>
  <div class="admin-section-editor"><h3>Social Links</h3>
    <p style="font-size:.82rem;color:hsl(40,10%,55%);margin-bottom:1rem">Icon: Image URL (png/svg/jpg)</p>
    <div id="social-links-list">
      ${socialEntries.map(([key, val], i) => {
        const url = typeof val === "object" ? (val.url || "") : val;
        const icon = typeof val === "object" ? (val.icon || "") : "";
        return `
        <div class="admin-item-card" data-social-card="${i}">
          <div class="admin-item-card-header"><h4>${esc(key)}</h4>
            <button class="admin-item-remove-btn" data-remove-social="${key}">&times;</button>
          </div>
          <div class="admin-form-row-inline">
            <div class="admin-form-row"><label>Name</label><input type="text" data-social-key="${i}" data-field="key" value="${esc(key)}"></div>
            <div class="admin-form-row"><label>Icon URL</label><input type="text" data-social-key="${i}" data-field="icon" value="${esc(icon)}" placeholder="https://example.com/icon.png"></div>
          </div>
          <div class="admin-form-row"><label>URL</label><input type="text" data-social-key="${i}" data-field="val" value="${esc(url)}"></div>
        </div>`;
      }).join("")}
    </div>
    <button class="admin-add-item-btn" id="admin-add-social">+ Add Social Link</button>
  </div>`;
}

function footerEditor(d) {
  return `<div class="admin-section-editor"><h3>Footer</h3>
    <div class="admin-form-row"><label>Footer Text</label><input type="text" data-path="text" value="${esc(d.text || "")}"></div>
  </div>`;
}

function navEditor(d) {
  const items = Array.isArray(d) ? d : [];
  return `<div class="admin-section-editor"><h3>Navigation Links</h3>
    ${items.map((n, i) => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(n.label) || "Link " + (i + 1)}</h4>
          <button class="admin-item-remove-btn" onclick="this.closest('.admin-item-card').remove()" data-idx="${i}">&times;</button>
        </div>
        <div class="admin-form-row-inline">
          <div class="admin-form-row"><label>Label</label><input type="text" data-nav-idx="${i}" data-field="label" value="${esc(n.label)}"></div>
          <div class="admin-form-row"><label>Link</label><input type="text" data-nav-idx="${i}" data-field="link" value="${esc(n.link)}"></div>
        </div>
      </div>`).join("")}
    <button class="admin-add-item-btn" id="admin-add-nav-link">+ Add Link</button>
  </div>`;
}

function logoEditor(d) {
  return `<div class="admin-section-editor"><h3>Logo</h3>
    <div class="admin-form-row"><label>Logo HTML</label><textarea data-path="html">${esc(d.html || "")}</textarea></div>
  </div>`;
}

function saveBar() {
  return `<div class="admin-save-bar">
    <button class="admin-reset-btn" id="admin-reset-btn">Reset</button>
    <button class="admin-save-btn" id="admin-save-btn">Save Changes</button>
  </div>`;
}

function bindInputs(container, data) {
  container.querySelectorAll("[data-path]").forEach(input => {
    input.addEventListener("input", () => {
      setNested(data, input.dataset.path, input.value);
    });
  });
}

function setNested(obj, path, val) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (cur[keys[i]] === undefined) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = val;
}

async function saveJsonb(section, data) {
  const btn = document.getElementById("admin-save-btn");
  btn.disabled = true; btn.textContent = "Saving...";
  const { error } = await supabase.from("site_content").upsert(
    { section, data, updated_at: new Date().toISOString() },
    { onConflict: "section" }
  );
  btn.disabled = false; btn.textContent = "Save Changes";
  if (error) showToast("Error: " + error.message, "error");
  else { showToast("Saved!"); try { sessionStorage.removeItem("portfolio_cache"); } catch {} }
}

// ============================================
// PROJECT DETAILS (project_details table)
// ============================================
async function loadProjectDetailsSection() {
  const content = document.getElementById("admin-panel-content");
  const { data: items, error } = await supabase.from("project_details").select("*");
  if (error) { content.innerHTML = `<div class="admin-panel-loading">Error: ${error.message}</div>`; return; }

  content.innerHTML = `
    <div class="admin-section-editor">
      <h3>Project Details</h3>
      <p style="font-size:.85rem;color:hsl(40,10%,55%);margin-bottom:1rem">Click a project to edit its detail page content.</p>
      <div class="admin-items-list">
        ${(items || []).map(p => `
          <div class="admin-item-card">
            <div class="admin-item-card-header">
              <h4>${esc(p.data?.title || p.id)}</h4>
              <div>
                <button class="admin-item-remove-btn" data-edit="${p.id}" title="Edit">✏️</button>
                <button class="admin-item-remove-btn" data-delete="${p.id}" title="Delete">&times;</button>
              </div>
            </div>
            <p style="font-size:.82rem;color:hsl(40,10%,55%)">${esc(p.data?.category || '')} — ${esc(p.data?.status || '')}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  content.querySelectorAll("[data-delete]").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (!confirm("Delete this project detail?")) return;
      await supabase.from("project_details").delete().eq("id", btn.dataset.delete);
      showToast("Deleted!");
      loadProjectDetailsSection();
    });
  });

  content.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = items.find(i => i.id === btn.dataset.edit);
      if (item) editProjectDetail(item);
    });
  });
}

function editProjectDetail(item) {
  const content = document.getElementById("admin-panel-content");
  const d = item.data || {};
  const slug = item.id;

  const arrFields = (key, arr) => (arr || []).map((v, i) =>
    `<div class="admin-form-row"><label>${key} ${i + 1}</label><input type="text" data-arr="${key}" data-idx="${i}" value="${esc(typeof v === 'string' ? v : v.title || v.name || v.label || JSON.stringify(v))}"></div>`
  ).join("");

  const techFields = (d.technologies || []).map((t, i) => `
    <div class="admin-item-card">
      <div class="admin-item-card-header"><h4>${esc(t.name) || "Tech " + (i+1)}</h4>
        <button class="admin-item-remove-btn" data-remove-tech="${i}">&times;</button>
      </div>
      <div class="admin-form-row-inline">
        <div class="admin-form-row"><label>Name</label><input type="text" data-tech-idx="${i}" data-field="name" value="${esc(t.name)}"></div>
        <div class="admin-form-row"><label>Icon URL</label><input type="text" data-tech-idx="${i}" data-field="icon" value="${esc(t.icon)}"></div>
      </div>
    </div>
  `).join("");

  const galleryFields = (d.gallery || []).map((g, i) => {
    const img = typeof g === 'string' ? g : g.image || '';
    const cap = typeof g === 'object' ? (g.title || '') : '';
    return `
    <div class="admin-item-card">
      <div class="admin-item-card-header"><h4>Gallery ${i+1}</h4>
        <button class="admin-item-remove-btn" data-remove-gallery="${i}">&times;</button>
      </div>
      <div class="admin-form-row"><label>Image URL</label><input type="text" data-gallery-idx="${i}" data-field="image" value="${esc(img)}"></div>
      <div class="admin-form-row"><label>Title</label><input type="text" data-gallery-idx="${i}" data-field="title" value="${esc(cap)}"></div>
    </div>`;
  }).join("");

  const timelineFields = (d.timeline || []).map((t, i) => `
    <div class="admin-item-card">
      <div class="admin-item-card-header"><h4>Phase ${i+1}</h4>
        <button class="admin-item-remove-btn" data-remove-timeline="${i}">&times;</button>
      </div>
      <div class="admin-form-row-inline">
        <div class="admin-form-row"><label>Date/Phase</label><input type="text" data-timeline-idx="${i}" data-field="date" value="${esc(t.date)}"></div>
        <div class="admin-form-row"><label>Title</label><input type="text" data-timeline-idx="${i}" data-field="title" value="${esc(t.title)}"></div>
      </div>
      <div class="admin-form-row"><label>Detail</label><textarea data-timeline-idx="${i}" data-field="detail">${esc(t.detail)}</textarea></div>
    </div>
  `).join("");

  const content2 = `
    <div class="admin-section-editor">
      <h3>Edit: ${esc(d.title || slug)}</h3>
      <div class="admin-form-row"><label>Slug (ID)</label><input type="text" value="${esc(slug)}" disabled></div>
      <div class="admin-form-row"><label>Title</label><input type="text" data-dfield="title" value="${esc(d.title)}"></div>
      <div class="admin-form-row"><label>Category</label><input type="text" data-dfield="category" value="${esc(d.category)}"></div>
      <div class="admin-form-row"><label>Status</label><input type="text" data-dfield="status" value="${esc(d.status)}"></div>
      <div class="admin-form-row"><label>Thumbnail URL</label><input type="text" data-dfield="thumbnail" value="${esc(d.thumbnail)}"></div>
      <div class="admin-form-row"><label>GitHub URL</label><input type="text" data-dfield="github" value="${esc(d.github)}"></div>
      <div class="admin-form-row"><label>Demo URL</label><input type="text" data-dfield="demo" value="${esc(d.demo)}"></div>
      <div class="admin-form-row"><label>Short Description</label><textarea data-dfield="description">${esc(d.description)}</textarea></div>
      <div class="admin-form-row"><label>Full Description</label><textarea data-dfield="fullDescription" style="min-height:150px">${esc(d.fullDescription)}</textarea></div>
    </div>

    <div class="admin-section-editor">
      <h3>Tags</h3>
      <div class="admin-form-row"><label>Tags (comma separated)</label><input type="text" data-dfield="tagsCSV" value="${(d.tags || []).join(', ')}"></div>
    </div>

    <div class="admin-section-editor">
      <h3>Technologies</h3>
      <div class="admin-items-list">${techFields}</div>
      <button class="admin-add-item-btn" id="admin-add-tech">+ Add Technology</button>
    </div>

    <div class="admin-section-editor">
      <h3>Features</h3>
      ${arrFields("feature", d.features)}
      <button class="admin-add-item-btn" id="admin-add-feature">+ Add Feature</button>
    </div>

    <div class="admin-section-editor">
      <h3>Challenges</h3>
      ${arrFields("challenge", d.challenges)}
      <button class="admin-add-item-btn" id="admin-add-challenge">+ Add Challenge</button>
    </div>

    <div class="admin-section-editor">
      <h3>Solutions</h3>
      ${arrFields("solution", d.solutions)}
      <button class="admin-add-item-btn" id="admin-add-solution">+ Add Solution</button>
    </div>

    <div class="admin-section-editor">
      <h3>Results</h3>
      ${arrFields("result", d.results)}
      <button class="admin-add-item-btn" id="admin-add-result">+ Add Result</button>
    </div>

    <div class="admin-section-editor">
      <h3>Gallery</h3>
      <div class="admin-items-list">${galleryFields}</div>
      <button class="admin-add-item-btn" id="admin-add-gallery">+ Add Gallery Image</button>
    </div>

    <div class="admin-section-editor">
      <h3>Timeline</h3>
      <div class="admin-items-list">${timelineFields}</div>
      <button class="admin-add-item-btn" id="admin-add-timeline">+ Add Timeline Phase</button>
    </div>

    <div class="admin-section-editor">
      <h3>Database (optional)</h3>
      <div class="admin-form-row"><label>Name</label><input type="text" data-dbfield="name" value="${esc(d.database?.name)}"></div>
      <div class="admin-form-row"><label>Icon URL</label><input type="text" data-dbfield="icon" value="${esc(d.database?.icon)}"></div>
      <div class="admin-form-row"><label>Description</label><textarea data-dbfield="description">${esc(d.database?.description)}</textarea></div>
    </div>

    <div class="admin-save-bar">
      <button class="admin-reset-btn" id="admin-cancel-btn">Cancel</button>
      <button class="admin-save-btn" id="admin-save-btn">Save Changes</button>
    </div>
  `;

  document.getElementById("admin-panel-content").innerHTML = content2;

  let data = JSON.parse(JSON.stringify(d));
  if (!data.tags) data.tags = [];
  if (!data.features) data.features = [];
  if (!data.challenges) data.challenges = [];
  if (!data.solutions) data.solutions = [];
  if (!data.results) data.results = [];
  if (!data.gallery) data.gallery = [];
  if (!data.timeline) data.timeline = [];
  if (!data.technologies) data.technologies = [];
  if (!data.database) data.database = {};

  const c = document.getElementById("admin-panel-content");

  c.querySelectorAll("[data-dfield]").forEach(el => {
    el.addEventListener("input", () => {
      const key = el.dataset.dfield;
      if (key === "tagsCSV") {
        data.tags = el.value.split(",").map(s => s.trim()).filter(Boolean);
      } else {
        data[key] = el.value;
      }
    });
  });

  c.querySelectorAll("[data-dbfield]").forEach(el => {
    el.addEventListener("input", () => {
      if (!data.database) data.database = {};
      data.database[el.dataset.dbfield] = el.value;
    });
  });

  c.querySelectorAll("[data-tech-idx]").forEach(el => {
    el.addEventListener("input", () => {
      const idx = parseInt(el.dataset.techIdx);
      if (data.technologies[idx]) data.technologies[idx][el.dataset.field] = el.value;
    });
  });

  c.querySelectorAll("[data-gallery-idx]").forEach(el => {
    el.addEventListener("input", () => {
      const idx = parseInt(el.dataset.galleryIdx);
      if (!data.gallery[idx]) data.gallery[idx] = { image: "", title: "" };
      const field = el.dataset.field;
      if (field === "image") {
        if (typeof data.gallery[idx] === "string") data.gallery[idx] = { image: el.value, title: "" };
        else data.gallery[idx].image = el.value;
      } else {
        if (typeof data.gallery[idx] === "string") data.gallery[idx] = { image: data.gallery[idx], title: el.value };
        else data.gallery[idx].title = el.value;
      }
    });
  });

  c.querySelectorAll("[data-timeline-idx]").forEach(el => {
    el.addEventListener("input", () => {
      const idx = parseInt(el.dataset.timelineIdx);
      if (data.timeline[idx]) data.timeline[idx][el.dataset.field] = el.value;
    });
  });

  const simpleArrHandler = (key) => {
    c.querySelectorAll(`[data-arr="${key}"]`).forEach(el => {
      el.addEventListener("input", () => {
        const idx = parseInt(el.dataset.idx);
        data[key][idx] = el.value;
      });
    });
  };
  ["feature","challenge","solution","result"].forEach(simpleArrHandler);

  const addSimple = (key, template) => {
    const idMap = {
      features: "admin-add-feature",
      challenges: "admin-add-challenge",
      solutions: "admin-add-solution",
      results: "admin-add-result"
    };
    document.getElementById(idMap[key])?.addEventListener("click", () => {
      data[key].push(template);
      editProjectDetail({ id: slug, data });
    });
  };
  addSimple("features", "");
  addSimple("challenges", "");
  addSimple("solutions", "");
  addSimple("results", "");

  document.getElementById("admin-add-tech")?.addEventListener("click", () => {
    data.technologies.push({ name: "", icon: "" });
    editProjectDetail({ id: slug, data });
  });
  document.getElementById("admin-add-gallery")?.addEventListener("click", () => {
    data.gallery.push({ image: "", title: "" });
    editProjectDetail({ id: slug, data });
  });
  document.getElementById("admin-add-timeline")?.addEventListener("click", () => {
    data.timeline.push({ date: "", title: "", detail: "" });
    editProjectDetail({ id: slug, data });
  });

  c.querySelectorAll("[data-remove-tech]").forEach(btn => {
    btn.addEventListener("click", () => { data.technologies.splice(parseInt(btn.dataset.removeTech), 1); editProjectDetail({ id: slug, data }); });
  });
  c.querySelectorAll("[data-remove-gallery]").forEach(btn => {
    btn.addEventListener("click", () => { data.gallery.splice(parseInt(btn.dataset.removeGallery), 1); editProjectDetail({ id: slug, data }); });
  });
  c.querySelectorAll("[data-remove-timeline]").forEach(btn => {
    btn.addEventListener("click", () => { data.timeline.splice(parseInt(btn.dataset.removeTimeline), 1); editProjectDetail({ id: slug, data }); });
  });

  document.getElementById("admin-cancel-btn")?.addEventListener("click", () => loadSection("project_details", "details"));
  document.getElementById("admin-save-btn")?.addEventListener("click", async () => {
    const btn = document.getElementById("admin-save-btn");
    btn.disabled = true; btn.textContent = "Saving...";
    const { error } = await supabase.from("project_details").upsert(
      { id: slug, data, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );
    btn.disabled = false; btn.textContent = "Save Changes";
    if (error) showToast("Error: " + error.message, "error");
    else { showToast("Saved!"); loadSection("project_details", "details"); }
  });
}

// ============================================
// TABLE SECTIONS (individual rows)
// ============================================
async function loadTableSection(table) {
  const content = document.getElementById("admin-panel-content");
  const noSort = ["reviews"];
  let query = supabase.from(table).select("*");
  if (!noSort.includes(table)) query = query.order("sort_order", { ascending: true });
  const { data: items, error } = await query;
  if (error) { content.innerHTML = `<div class="admin-panel-loading">Error: ${error.message}</div>`; return; }

  let html = "";
  switch (table) {
    case "projects": html = projectsTable(items); break;
    case "skills": html = skillsTable(items); break;
    case "education": html = educationTable(items); break;
    case "experience": html = experienceTable(items); break;
    case "services": html = servicesTable(items); break;
    case "reviews": html = reviewsTable(items); break;
    case "workflow": html = workflowTable(items); break;
    case "tools": html = toolsTable(items); break;
  }

  content.innerHTML = html;
  content.querySelectorAll("[data-delete]").forEach(btn => {
    btn.addEventListener("click", () => deleteRow(table, btn.dataset.delete));
  });
  content.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => editRow(table, btn.dataset.edit, items));
  });
  const addBtn = content.querySelector("#admin-add-new-btn");
  if (addBtn) addBtn.addEventListener("click", () => addRow(table));
}

function projectsTable(items) {
  return `<div class="admin-section-editor"><h3>Projects</h3>
    <div class="admin-items-list">${items.map(p => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(p.title)}</h4>
          <div>
            <span style="font-size:.7rem;padding:2px 8px;border-radius:10px;${p.is_published !== false ? 'background:hsl(140,50%,25%);color:hsl(140,60%,70%)' : 'background:hsl(0,50%,25%);color:hsl(0,60%,70%)'}">${p.is_published !== false ? 'Published' : 'Draft'}</span>
            <button class="admin-item-remove-btn" data-edit="${p.id}">✏️</button>
            <button class="admin-item-remove-btn" data-delete="${p.id}">&times;</button>
          </div>
        </div>
        <p style="font-size:.82rem;color:hsl(40,10%,55%)">${esc(p.description).substring(0, 80)}...</p>
        <div style="font-size:.75rem;color:hsl(40,10%,40%);margin-top:.3rem">${esc(p.demo)}</div>
      </div>`).join("")}</div>
    <button class="admin-add-item-btn" id="admin-add-new-btn">+ Add Project</button>
  </div>`;
}

function skillsTable(items) {
  return `<div class="admin-section-editor"><h3>Skills</h3>
    <div class="admin-items-list">${items.map(s => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(s.name)} (${s.level}%)</h4>
          <div><button class="admin-item-remove-btn" data-edit="${s.id}">✏️</button>
          <button class="admin-item-remove-btn" data-delete="${s.id}">&times;</button></div>
        </div>
        <div style="background:hsl(20,14%,15%);border-radius:4px;height:6px;margin-top:.4rem">
          <div style="width:${s.level}%;background:linear-gradient(90deg,hsl(38,92%,50%),hsl(340,80%,50%));height:100%;border-radius:4px"></div>
        </div>
      </div>`).join("")}</div>
    <button class="admin-add-item-btn" id="admin-add-new-btn">+ Add Skill</button>
  </div>`;
}

function educationTable(items) {
  return `<div class="admin-section-editor"><h3>Education</h3>
    <div class="admin-items-list">${items.map(e => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(e.degree)}</h4>
          <div><button class="admin-item-remove-btn" data-edit="${e.id}">✏️</button>
          <button class="admin-item-remove-btn" data-delete="${e.id}">&times;</button></div>
        </div>
        <p style="font-size:.82rem;color:hsl(40,10%,55%)">${esc(e.institute)}, ${esc(e.district)} — ${esc(e.year)}</p>
      </div>`).join("")}</div>
    <button class="admin-add-item-btn" id="admin-add-new-btn">+ Add Education</button>
  </div>`;
}

function experienceTable(items) {
  return `<div class="admin-section-editor"><h3>Experience</h3>
    <div class="admin-items-list">${items.map(e => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(e.role)} @ ${esc(e.company)}</h4>
          <div><button class="admin-item-remove-btn" data-edit="${e.id}">✏️</button>
          <button class="admin-item-remove-btn" data-delete="${e.id}">&times;</button></div>
        </div>
        <p style="font-size:.82rem;color:hsl(40,10%,55%)">${esc(e.duration)}</p>
      </div>`).join("")}</div>
    <button class="admin-add-item-btn" id="admin-add-new-btn">+ Add Experience</button>
  </div>`;
}

function servicesTable(items) {
  return `<div class="admin-section-editor"><h3>Services</h3>
    <div class="admin-items-list">${items.map(s => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(s.title)}</h4>
          <div><button class="admin-item-remove-btn" data-edit="${s.id}">✏️</button>
          <button class="admin-item-remove-btn" data-delete="${s.id}">&times;</button></div>
        </div>
        <p style="font-size:.82rem;color:hsl(40,10%,55%)">${esc(s.description).substring(0, 60)}...</p>
      </div>`).join("")}</div>
    <button class="admin-add-item-btn" id="admin-add-new-btn">+ Add Service</button>
  </div>`;
}

function reviewsTable(items) {
  return `<div class="admin-section-editor"><h3>Reviews</h3>
    <div class="admin-items-list">${items.map(r => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(r.name)}</h4>
          <div>
            <span style="font-size:.7rem;padding:2px 8px;border-radius:10px;${r.is_published ? 'background:hsl(140,50%,25%);color:hsl(140,60%,70%)' : 'background:hsl(0,50%,25%);color:hsl(0,60%,70%)'}">${r.is_published ? 'Published' : 'Draft'}</span>
            <button class="admin-item-remove-btn" data-edit="${r.id}">✏️</button>
            <button class="admin-item-remove-btn" data-delete="${r.id}">&times;</button>
          </div>
        </div>
        <p style="font-size:.82rem;color:hsl(40,10%,55%)">${esc(r.comment).substring(0, 80)}...</p>
      </div>`).join("")}</div>
    <button class="admin-add-item-btn" id="admin-add-new-btn">+ Add Review</button>
  </div>`;
}

function workflowTable(items) {
  return `<div class="admin-section-editor"><h3>Workflow</h3>
    <div class="admin-items-list">${items.map(w => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(w.title)}</h4>
          <div><button class="admin-item-remove-btn" data-edit="${w.id}">✏️</button>
          <button class="admin-item-remove-btn" data-delete="${w.id}">&times;</button></div>
        </div>
        <p style="font-size:.82rem;color:hsl(40,10%,55%)">${esc(w.role)} — ${esc(w.year)}</p>
      </div>`).join("")}</div>
    <button class="admin-add-item-btn" id="admin-add-new-btn">+ Add Workflow</button>
  </div>`;
}

function toolsTable(items) {
  return `<div class="admin-section-editor"><h3>Tools</h3>
    <div class="admin-items-list">${items.map(t => `
      <div class="admin-item-card">
        <div class="admin-item-card-header"><h4>${esc(t.name)}</h4>
          <div><button class="admin-item-remove-btn" data-edit="${t.id}">✏️</button>
          <button class="admin-item-remove-btn" data-delete="${t.id}">&times;</button></div>
        </div>
      </div>`).join("")}</div>
    <button class="admin-add-item-btn" id="admin-add-new-btn">+ Add Tool</button>
  </div>`;
}

// ============================================
// CRUD OPERATIONS
// ============================================
async function deleteRow(table, id) {
  if (!confirm("Delete this item?")) return;
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) showToast("Delete failed: " + error.message, "error");
  else { showToast("Deleted!"); loadSection(currentSection, "table"); }
}

function editRow(table, id, items) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  showEditModal(table, item);
}

function addRow(table) {
  const templates = {
    projects: { title: "", slug: "", description: "", image: "", github: "", demo: "", featured: false, is_published: true, sort_order: 0 },
    skills: { name: "", icon: "", level: 0, sort_order: 0 },
    education: { degree: "", institute: "", district: "", class: "", year: "", description: "", logo: "", sort_order: 0 },
    experience: { role: "", company: "", logo: "", duration: "", description: "", sort_order: 0 },
    services: { title: "", icon: "code", description: "", sort_order: 0 },
    reviews: { name: "", image: "", comment: "", is_published: true },
    workflow: { title: "", role: "", year: "", status: "", logo: "", sort_order: 0 },
    tools: { name: "", icon: "", sort_order: 0 },
  };
  showEditModal(table, templates[table] || {}, true);
}

function showEditModal(table, item, isNew = false) {
  const content = document.getElementById("admin-panel-content");
  const fields = getTableFields(table);

  const html = `
    <div class="admin-section-editor">
      <h3>${isNew ? "Add" : "Edit"} ${table.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</h3>
      ${fields.map(f => {
        const val = item[f.key] ?? "";
        if (f.type === "textarea") {
          return `<div class="admin-form-row"><label>${f.label}</label><textarea data-field="${f.key}">${esc(val)}</textarea></div>`;
        }
        if (f.type === "toggle") {
          return `<div class="admin-form-row"><label>${f.label}</label>
            <select data-field="${f.key}">
              <option value="true" ${val ? "selected" : ""}>Yes</option>
              <option value="false" ${!val ? "selected" : ""}>No</option>
            </select></div>`;
        }
        return `<div class="admin-form-row"><label>${f.label}</label><input type="${f.type || 'text'}" data-field="${f.key}" value="${esc(val)}"></div>`;
      }).join("")}
      <div class="admin-save-bar">
        <button class="admin-reset-btn" id="admin-cancel-btn">Cancel</button>
        <button class="admin-save-btn" id="admin-save-btn">${isNew ? "Add" : "Save"}</button>
      </div>
    </div>
  `;

  content.innerHTML = html;
  document.getElementById("admin-cancel-btn").onclick = () => loadSection(currentSection, "table");
  document.getElementById("admin-save-btn").onclick = async () => {
    const data = {};
    fields.forEach(f => {
      let val = content.querySelector(`[data-field="${f.key}"]`).value;
      if (f.type === "number") val = Number(val);
      if (f.type === "toggle") val = val === "true";
      if (f.type === "array-comma") val = val.split(",").map(s => s.trim()).filter(Boolean);
      data[f.key] = val;
    });
    data.updated_at = new Date().toISOString();

    let res;
    if (isNew) {
      data.created_at = new Date().toISOString();
      res = await supabase.from(table).insert(data);
    } else {
      res = await supabase.from(table).update(data).eq("id", item.id);
    }

    if (res.error) showToast("Error: " + res.error.message, "error");
    else { showToast(isNew ? "Added!" : "Saved!"); loadSection(currentSection, "table"); }
  };
}

function getTableFields(table) {
  const map = {
    projects: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Image URL" },
      { key: "github", label: "GitHub URL" },
      { key: "demo", label: "Demo URL" },
      { key: "featured", label: "Featured", type: "toggle" },
      { key: "is_published", label: "Published", type: "toggle" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
    skills: [
      { key: "name", label: "Name" },
      { key: "icon", label: "Icon URL" },
      { key: "level", label: "Level (0-100)", type: "number" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
    education: [
      { key: "degree", label: "Degree" },
      { key: "institute", label: "Institute" },
      { key: "district", label: "District" },
      { key: "class", label: "Class" },
      { key: "year", label: "Year" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "logo", label: "Logo URL" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
    experience: [
      { key: "role", label: "Role" },
      { key: "company", label: "Company" },
      { key: "logo", label: "Logo URL" },
      { key: "duration", label: "Duration" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
    services: [
      { key: "title", label: "Title" },
      { key: "icon", label: "Lucide Icon Name" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
    reviews: [
      { key: "name", label: "Name" },
      { key: "image", label: "Image URL" },
      { key: "comment", label: "Comment", type: "textarea" },
      { key: "is_published", label: "Published", type: "toggle" },
    ],
    workflow: [
      { key: "title", label: "Title" },
      { key: "role", label: "Role" },
      { key: "year", label: "Year" },
      { key: "status", label: "Status" },
      { key: "logo", label: "Logo URL" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
    tools: [
      { key: "name", label: "Name" },
      { key: "icon", label: "Icon URL" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
  };
  return map[table] || [];
}

// ============================================
// INIT
// ============================================
document.getElementById("admin-logout-btn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "../admin.html";
});

document.getElementById("admin-sidebar-toggle").addEventListener("click", () => {
  document.querySelector(".admin-panel-sidebar").classList.toggle("open");
});

(async () => {
  const session = await checkAuth();
  if (!session) return;
  buildNav();
  const firstBtn = document.querySelector(".admin-panel-nav-item");
  if (firstBtn) { firstBtn.classList.add("active"); loadSection(firstBtn.dataset.section, firstBtn.dataset.type); }
})();
