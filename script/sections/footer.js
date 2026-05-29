export function renderFooter(logoData, footerData) {
  footer.innerHTML = `
     <div class="logo">${logoData.html}</div>
    <p class="footer-text">${footerData.text || ""}</p>
  `
}
