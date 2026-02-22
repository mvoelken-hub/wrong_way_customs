// 1. Variablen initialisieren
let galleryData = [];
let currentIndex = 0;

// 2. DOM Elemente referenzieren
const grid = document.getElementById("galleryGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeLightbox");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// 3. Nur EINMAL die Daten laden
fetch("data/gallery.json")
    .then(res => {
        if (!res.ok) throw new Error("Fehler beim Laden der JSON");
        return res.json();
    })
    .then(data => {
        galleryData = data;
        renderGallery(); // Bilder anzeigen
    })
    .catch(error => console.error("Galerie konnte nicht geladen werden:", error));

// 4. Funktion zum Rendern (saubere Trennung)
function renderGallery() {
    grid.innerHTML = ""; // Sicherstellen, dass das Grid leer ist

    galleryData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gallery-item";

        div.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" 
                 class="w-full rounded-xl shadow-lg" 
                 loading="lazy" />
        `;

        // Klick öffnet Lightbox
        div.addEventListener("click", () => openLightbox(index));
        grid.appendChild(div);
    });
}

// --- Lightbox Logik (unverändert, aber sauberer strukturiert) ---

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

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightboxImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxImage();
}

// Event Listener
closeBtn.addEventListener("click", closeLightboxFn);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightboxFn();
});

document.addEventListener("keydown", e => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightboxFn();
});