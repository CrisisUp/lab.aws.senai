document.addEventListener("DOMContentLoaded", () => {
    if (typeof imageList === 'undefined') {
        console.error("Erro: lista de imagens não encontrada.");
        return;
    }

    const images = imageList;
    let currentIndex = 0;
    const totalImages = images.length;
    const bg = document.getElementById("bg-carousel");
    const counter = document.getElementById("page-counter");

    // Cria o elemento da lupa dinamicamente
    const magnifier = document.createElement("div");
    magnifier.className = "magnifier";
    document.body.appendChild(magnifier);

    function updateDisplay(index) {
        currentIndex = index;
        const imgUrl = images[currentIndex];
        bg.style.backgroundImage = "url('" + imgUrl + "')";
        counter.textContent = (currentIndex + 1) + " / " + totalImages;
        
        // Atualiza a imagem da lupa
        magnifier.style.backgroundImage = "url('" + imgUrl + "')";
        
        counter.style.backgroundColor = (currentIndex === totalImages - 1) 
            ? "rgba(0, 200, 83, 0.8)" 
            : "rgba(0, 120, 212, 0.8)";
    }

    // --- LÓGICA DA LUPA ---
    bg.addEventListener("mousemove", (e) => {
        magnifier.style.display = "block";
        
        const rect = bg.getBoundingClientRect();
        const x = e.pageX - rect.left - window.pageXOffset;
        const y = e.pageY - rect.top - window.pageYOffset;

        // Posiciona o círculo da lupa no mouse
        magnifier.style.left = (e.pageX - 100) + "px";
        magnifier.style.top = (e.pageY - 100) + "px";

        // Calcula a posição do background da lupa (Zoom 2x)
        // O zoom é controlado pelo background-size do magnifier (calculado abaixo)
        const zoom = 2;
        const bgWidth = rect.width * zoom;
        const bgHeight = rect.height * zoom;
        
        magnifier.style.backgroundSize = bgWidth + "px " + bgHeight + "px";
        magnifier.style.backgroundPosition = "-" + (x * zoom - 100) + "px -" + (y * zoom - 100) + "px";
    });

    bg.addEventListener("mouseleave", () => {
        magnifier.style.display = "none";
    });

    // Funções de navegação
    function next() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateDisplay(currentIndex);
    }

    function prev() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateDisplay(currentIndex);
    }

    document.getElementById("next-btn").onclick = next;
    document.getElementById("prev-btn").onclick = prev;

    // Teclado
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === " ") {
            e.preventDefault();
            next();
        } else if (e.key === "ArrowLeft") {
            prev();
        }
    });

    // Swipe
    let touchStartX = 0;
    document.addEventListener("touchstart", (e) => touchStartX = e.changedTouches[0].screenX, false);
    document.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) next();
        else if (touchEndX > touchStartX + 50) prev();
    }, false);

    updateDisplay(0);
});
