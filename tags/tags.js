export async function renderProjectTags(container, tags, iconMap = {}) {
  if (!container) return;
  const defaultIcon = iconMap['default'] || '';

  function findTag(tagName) {
    const raw = String(tagName).trim().toLowerCase();
    const firstWord = raw.split(/\s+/)[0];
    const normalized = firstWord.replace(/[^\w]/g, '');
    for (const key of Object.keys(iconMap)) {
      if (key === 'default') continue;
      const kNorm = key.replace(/[^\w]/g, '').toLowerCase();
      if (key.toLowerCase() === raw || kNorm === normalized || kNorm === raw) {
        return iconMap[key];
      }
    }
    return { icon: '', name: tagName };
  }

  const html = tags
    .map(tag => {
      const isObj = typeof tag === 'object' && tag !== null;
      const tagName = isObj ? tag.name : tag;
      let src, displayName;
      if (isObj && tag.icon) {
        src = tag.icon;
        displayName = tag.name;
      } else {
        const found = findTag(tagName);
        src = found.icon || '';
        displayName = found.name || tagName;
      }
      if (src) {
        return `<span class="project-tag">
          <img src="${src}" alt="${displayName}" title="${displayName}" class="tag-icon" loading="lazy"
               onerror="this.style.display='none'" />
          <span class="tag-label">${displayName}</span>
        </span>`;
      }
      return `<span class="project-tag">
        <span class="tag-label">${displayName}</span>
      </span>`;
    })
    .join('');
  container.innerHTML = html;
}
