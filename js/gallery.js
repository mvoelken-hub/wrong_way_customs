fetch("data/gallery.json")
  .then(response => response.json())
  .then(images => {
    const grid = document.getElementById("galleryGrid");

    images.forEach(img => {
      const item = document.createElement("div");
      item.className = "gallery-item";

      item.innerHTML = `
        <img src="${img.src}"
             alt="${img.alt}"
             loading="lazy">
      `;

      grid.appendChild(item);
    });
  })
  .catch(error => console.error("Galerie konnte nicht geladen werden:", error));
