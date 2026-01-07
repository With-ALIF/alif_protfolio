export function renderContact(contactData) {
  const contact = document.getElementById("contact");
  if (!contact || !contactData || !contactData.details) return;

  const { email, location, socials } = contactData.details;

  contact.innerHTML = `
    <p class="section-label">${contactData.label}</p>
    <h2 class="section-title">${contactData.title}</h2>
    <p class="contact-description">${contactData.description}</p>

    <div class="contact-cards">
      <div class="contact-card">
        <div class="contact-icon">
          ${mailSVG}
        </div>
        <div>
          <p class="contact-label">Email</p>
          <a href="mailto:${email}" class="contact-value">${email}</a>
        </div>
      </div>

      <div class="contact-card">
        <div class="contact-icon">
          ${locationSVG}
        </div>
        <div>
          <p class="contact-label">Location</p>
          <p class="contact-value">${location}</p>
        </div>
      </div>
    </div>

    <div class="contact-socials">
      ${socials?.facebook
  ? `<a href="${socials.facebook}" target="_blank" aria-label="Facebook">${facebookSVG}</a>`
  : ""}

${socials?.github
  ? `<a href="${socials.github}" target="_blank" aria-label="GitHub">${githubSVG}</a>`
  : ""}

${socials?.instagram
  ? `<a href="${socials.instagram}" target="_blank" aria-label="Instagram">${instagramSVG}</a>`
  : ""}

${socials?.whatsapp
  ? `<a href="${socials.whatsapp}" target="_blank" aria-label="WhatsApp">${whatsappSVG}</a>`
  : ""}

${socials?.linkedin
  ? `<a href="${socials.linkedin}" target="_blank" aria-label="LinkedIn">${linkedinSVG}</a>`
  : ""}

${socials?.telegram
  ? `<a href="${socials.telegram}" target="_blank" aria-label="Telegram">${telegramSVG}</a>`
  : ""}

    </div>
  `;
}

/* ================= SVG ICONS ================= */

const mailSVG = `
<svg viewBox="0 0 24 24" width="22" height="22"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="5" width="18" height="14" rx="2"/>
  <path d="M3 7l9 6 9-6"/>
</svg>
`;

const locationSVG = `
<svg viewBox="0 0 24 24" width="22" height="22"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>
`;

const facebookSVG = `
<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
  <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2V9.5
  c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1
  c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12"/>
</svg>
`;

const githubSVG = `
<svg viewBox="0 0 24 24" width="22" height="22"
  fill="none"
  stroke="currentColor"
  stroke-width="1.6"
  stroke-linecap="round"
  stroke-linejoin="round">
  <path d="M9 19c-4 1.5-4-2.5-6-3"/>
  <path d="M15 19c0-1 .1-1.8.4-2.5
  .7-1.1-.3-2.3-.8-2.9
  2.2-.2 4.5-1.1 4.5-5
  0-1.1-.4-2.1-1.1-2.9
  .1-.3.5-1.5-.1-3
  0 0-.9-.3-3 1.1
  a10.3 10.3 0 00-5.8 0
  C7.4 4.3 6.5 4.6 6.5 4.6
  c-.6 1.5-.2 2.7-.1 3
  C5.7 8.4 5.3 9.4 5.3 10.5
  c0 3.9 2.3 4.8 4.5 5
  -.3.4-.6 1-.6 2"/>
</svg>
`;


const instagramSVG = `
<svg viewBox="0 0 24 24" width="20" height="20"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="20" height="20" rx="5"/>
  <circle cx="12" cy="12" r="4"/>
  <circle cx="18" cy="6" r="1"/>
</svg>
`;

const whatsappSVG = `
<svg viewBox="0 0 24 24" width="22" height="22"
  fill="none"
  stroke="currentColor"
  stroke-width="1.8"
  stroke-linecap="round"
  stroke-linejoin="round">
  <path d="M20.5 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.2
  a8.5 8.5 0 1115.5-4.3z"/>
  <path d="M9.5 8.5c.4-1 .8-1 1.3-.9.4 0 .8 0 1.1.6
  .3.5.9 1.7 1 1.9.1.2.1.5 0 .7
  -.1.2-.2.4-.4.6-.2.2-.4.4-.6.6
  -.2.2-.4.4-.2.8.2.4.9 1.4 2 2.2
  1.1.8 2 1.1 2.4 1.2.4.1.6.1.8-.1
  .2-.2.9-1 .9-1 .2-.3.4-.3.7-.2
  .3.1 2 .9 2.3 1.1.3.2.5.3.5.5
  0 .2 0 1.2-.7 1.7-.7.5-1.4.6-1.9.6"/>
</svg>
`;


const linkedinSVG = `
<svg viewBox="0 0 24 24" width="22" height="22"
  fill="none"
  stroke="currentColor"
  stroke-width="1.8"
  stroke-linecap="round"
  stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="2"/>
  <path d="M8 10v6"/>
  <path d="M8 7h.01"/>
  <path d="M12 16v-4a2 2 0 114 0v4"/>
</svg>
`;


const telegramSVG = `
<svg viewBox="0 0 24 24" width="22" height="22"
  fill="none"
  stroke="currentColor"
  stroke-width="1.8"
  stroke-linecap="round"
  stroke-linejoin="round">
  <path d="M22 2L11 13"/>
  <path d="M22 2L15 22l-4-9-9-4z"/>
</svg>
`;

