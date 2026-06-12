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

    function updateDisplay(index) {
        currentIndex = index;
        bg.style.backgroundImage = "url('" + images[currentIndex] + "')";
        counter.textContent = (currentIndex + 1) + " / " + totalImages;
        
        // Cor de finalização
        counter.style.backgroundColor = (currentIndex === totalImages - 1) 
            ? "rgba(0, 200, 83, 0.8)" 
            : "rgba(0, 120, 212, 0.8)";
    }

    document.getElementById("next-btn").onclick = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateDisplay(currentIndex);
    };

    document.getElementById("prev-btn").onclick = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateDisplay(currentIndex);
    };

    updateDisplay(0);
});
