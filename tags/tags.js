let iconMapPromise = null;

function loadIconMap() {
  if (!iconMapPromise) {

    const iconUrl = new URL('tag-icons.json', import.meta.url);
    iconMapPromise = fetch(iconUrl)
      .then(resp => {
        if (!resp.ok) {
          console.error('Failed to load tag-icons.json', resp.status);
          return {};
        }
        return resp.json();
      })
      .catch(err => {
        console.error('Error fetching tag-icons.json', err);
        return {};
      });
  }
  return iconMapPromise;
}

export async function renderProjectTags(container, tags) {
  if (!container) return;
  const iconMap = await loadIconMap();
  const defaultIcon = iconMap['default'] || '';
  const html = tags
    .map(tag => {
      const isObj = typeof tag === 'object' && tag !== null;
      const tagName = isObj ? tag.name : tag;
      const rawKey = String(tagName).trim().toLowerCase();
      const firstWord = rawKey.split(/\s+/)[0];
      const key = firstWord.replace(/[^\w]/g, '');
      const src = (isObj && tag.icon) ? tag.icon : (iconMap[key] || defaultIcon);
      return `<span class="project-tag">
        <img src="${src}" alt="${tagName}" title="${tagName}" class="tag-icon" loading="lazy"
             onerror="this.src='${defaultIcon}'" />
        <span class="tag-label">${tagName}</span>
      </span>`;
    })
    .join('');
  container.innerHTML = html;
}
