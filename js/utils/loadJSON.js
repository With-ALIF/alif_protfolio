export const loadJSON = path =>
  fetch(path).then(r => r.json())