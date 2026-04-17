/* ─────────────────────────────────────────
   SIDEBAR TOGGLE
───────────────────────────────────────── */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');

    sidebar.classList.toggle('hidden');
    content.classList.toggle('expanded');
}

/* ─────────────────────────────────────────
   CAROUSEL
───────────────────────────────────────── */
const track    = document.getElementById('track');
const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');

// cuántas cards se mueven de una vez
const STEP = 1;

// índice de la card que está más a la izquierda visible
let currentIndex = 0;

function getCardWidth() {
    const card = track.querySelector('.card');
    if (!card) return 280;
    // ancho de la card + el gap (20px definido en CSS)
    return card.offsetWidth + 20;
}

function getVisibleCount() {
    return Math.floor(track.offsetWidth / getCardWidth());
}

function getTotalCards() {
    return track.querySelectorAll('.card').length;
}

function updateCarousel() {
    const cardW = getCardWidth();
    track.style.transform = `translateX(-${currentIndex * cardW}px)`;
    track.style.transition = 'transform 0.4s ease';

    const total   = getTotalCards();
    const visible = getVisibleCount();

    // deshabilita botones en los extremos
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= total - visible;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= STEP;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const maxIndex = getTotalCards() - getVisibleCount();
    if (currentIndex < maxIndex) {
        currentIndex += STEP;
        updateCarousel();
    }
});

// recalcula al cambiar tamaño de ventana
window.addEventListener('resize', () => {
    // asegura que el índice no quede fuera del rango
    const maxIndex = getTotalCards() - getVisibleCount();
    if (currentIndex > maxIndex) currentIndex = Math.max(0, maxIndex);
    updateCarousel();
});

// estado inicial
updateCarousel();