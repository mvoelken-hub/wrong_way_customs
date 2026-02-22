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


// Lightbox-Funktionalität
let galleryData = [];
let currentIndex = 0;

// DOM Elemente
const grid = document.getElementById("galleryGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeLightbox");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// JSON laden
fetch("data/gallery.json")
    .then(res => res.json())
    .then(data => {
        galleryData = data;
        renderGallery();
    });

function renderGallery() {
    grid.innerHTML = "";

    galleryData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gallery-item";

        div.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" 
                 class="w-full rounded-xl shadow-lg" />
        `;

        // Klick öffnet Lightbox
        div.addEventListener("click", () => openLightbox(index));

        grid.appendChild(div);
    });
}

function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();

    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
}

function closeLightboxFn() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
}

function updateLightboxImage() {
    lightboxImage.src = galleryData[currentIndex].src;
}

// Navigation
function nextImage() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightboxImage();
}

function prevImage() {
    currentIndex =
        (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxImage();
}

// Event Listener
closeBtn.addEventListener("click", closeLightboxFn);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Overlay klicken schließt Lightbox
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightboxFn();
});

document.addEventListener("keydown", e => {
    if (lightbox.classList.contains("hidden")) return;

    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightboxFn();
});