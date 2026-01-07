export function renderMeta(meta) {
  document.title = meta.title

  const desc = document.querySelector("meta[name='description']")
  if (desc) desc.content = meta.description

  let link = document.querySelector("link[rel~='icon']")
  if (!link) {
    link = document.createElement("link")
    link.rel = "icon"
    document.head.appendChild(link)
  }

  link.href =
    "https://github.com/With-ALIF/logo_zone/blob/main/alif/logo.jpg?raw=true?v=" +
    Date.now()
}
