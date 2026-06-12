document.addEventListener("DOMContentLoaded", () => {
    // imageList vem do arquivo images_list.js carregado no HTML
    if (typeof imageList === 'undefined') {
        console.error("Erro: lista de imagens não encontrada.");
        return;
    }

    const images = imageList;
    let currentIndex = 0;
    const totalImages = images.length;
    const bg = document.getElementById("bg-carousel");
    const counter = document.getElementById("page-counter");

    if (!bg || !counter) return;

    function updateDisplay(index) {
        currentIndex = index;
        bg.style.backgroundImage = "url('" + images[currentIndex] + "')";
        counter.textContent = (currentIndex + 1) + " / " + totalImages;
        
        // Cor de finalização
        counter.style.backgroundColor = (currentIndex === totalImages - 1) 
            ? "rgba(0, 200, 83, 0.8)" 
            : "rgba(0, 120, 212, 0.8)";
    }

    function next() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateDisplay(currentIndex);
    }

    function prev() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateDisplay(currentIndex);
    }

    // --- NAVEGAÇÃO VIA CLIQUE ---
    document.getElementById("next-btn").onclick = next;
    document.getElementById("prev-btn").onclick = prev;

    // --- NAVEGAÇÃO VIA TECLADO ---
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === " ") {
            e.preventDefault(); // Evita scroll na barra de espaço
            next();
        } else if (e.key === "ArrowLeft") {
            prev();
        }
    });

    // --- NAVEGAÇÃO VIA GESTOS (SWIPE) ---
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const threshold = 50; // Distância mínima para ser considerado swipe
        if (touchEndX < touchStartX - threshold) {
            next(); // Swipe para a esquerda -> Próximo
        } else if (touchEndX > touchStartX + threshold) {
            prev(); // Swipe para a direita -> Anterior
        }
    }

    // Inicialização
    updateDisplay(0);
});
