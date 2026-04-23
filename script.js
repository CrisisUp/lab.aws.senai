document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DICIONÁRIO DE INFRAESTRUTURA ---
  const awsConfig = {
    vpcA: "alpha-vpc",
    cidrA: "10.0.0.0/16",
    vpcB: "alpha2-vpc",
    cidrB: "10.1.0.0/16",
    az1: "us-east-1a",
    az2: "us-east-1b",
    subAlphaPubA: "pub-alpha-1a",
    cidrAlphaPubA: "10.0.1.0/24",
    subAlphaPubB: "pub-alpha-1b",
    cidrAlphaPubB: "10.0.2.0/24",
    subAlphaPrivA: "priv-alpha-1a",
    cidrAlphaPrivA: "10.0.3.0/24",
    subAlphaPrivB: "priv-alpha-1b",
    cidrAlphaPrivB: "10.0.4.0/24",
    subAlpha2PubA: "pub-alpha2-1a",
    cidrAlpha2PubA: "10.1.1.0/24",
    subAlpha2PubB: "pub-alpha2-1b",
    cidrAlpha2PubB: "10.1.2.0/24",
    subAlpha2PrivA: "priv-alpha2-1a",
    cidrAlpha2PrivA: "10.1.3.0/24",
    subAlpha2PrivB: "priv-alpha2-1b",
    cidrAlpha2PrivB: "10.1.4.0/24",
    igwA: "alpha-igw",
    igwB: "alpha2-igw",
    natA: "alpha-nat",
    natB: "alpha2-nat",
    rtPubA: "rt-public-alpha",
    rtPrivA: "rt-private-alpha",
    rtPubB: "rt-public-alpha2",
    rtPrivB: "rt-private-alpha2",
    peeringId: "alpha-to-alpha2-peering",
    dbInstanceIdentifier: "lab-db",
    dbUser: "main",
    dbPassword: "lab-password",
    dbEngine: "MySQL",
    dbClass: "db.t3.micro",
    dbStorage: "20GB",
    dbInitialName: "lab",
    dbPort: "3306",
    sgWeb: "sg-web-server",
    sgDb: "sg-db-mysql",
    sshPort: "22",
    httpPort: "80",
    anywhereCidr: "0.0.0.0/0",
    webInstanceA: "web-server-alpha",
    webInstanceB: "web-server-alpha2"
  };

  // --- 2. MOTOR DE INJEÇÃO DE VARIÁVEIS ---
  const injectVariables = () => {
    const elements = document.querySelectorAll("[data-var]");
    elements.forEach((el) => {
      const varName = el.getAttribute("data-var");
      if (awsConfig[varName]) {
        el.textContent = awsConfig[varName];
      }
    });
  };

  // --- 3. LÓGICA DO CHECKLIST E GALERIA ---
  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const galleryContainer = document.getElementById("gallery-container");
  const evidenceGallery = document.getElementById("evidence-gallery");

  const updateGallery = () => {
    evidenceGallery.innerHTML = "";
    let hasImages = false;

    checkboxes.forEach((cb) => {
      if (cb.checked && cb.dataset.img) {
        hasImages = true;
        const itemText = cb.nextElementSibling.innerText;
        
        // Separa as imagens por vírgula, remove espaços e limita a 5 imagens
        const imgPaths = cb.dataset.img.split(',').map(s => s.trim()).slice(0, 5);

        const card = document.createElement("div");
        card.className = "evidence-card";
        
        let imagesHtml = "";
        imgPaths.forEach(path => {
          imagesHtml += `
            <div class="img-wrapper">
              <img src="${path}" alt="${itemText}" onerror="handleImgError(this)">
            </div>
          `;
        });

        card.innerHTML = `
          <h3>${itemText}</h3>
          <div class="card-images-grid">
            ${imagesHtml}
          </div>
        `;
        evidenceGallery.appendChild(card);
      }
    });

    if (hasImages) {
      galleryContainer.classList.remove("hidden");
    } else {
      galleryContainer.classList.add("hidden");
    }
  };

  window.handleImgError = (img) => {
    const wrapper = img.parentElement;
    img.style.display = 'none';
    const path = img.getAttribute('src');
    wrapper.innerHTML = `
      <div class="missing-img-placeholder">
        <p>📷 <strong>Aguardando print</strong></p>
        <small><code>${path}</code></small>
      </div>
    `;
  };

  const updateProgress = () => {
    let checkedCount = 0;
    checkboxes.forEach((cb) => {
      localStorage.setItem(cb.id, cb.checked);
      if (cb.checked) checkedCount++;
    });

    const totalSteps = checkboxes.length;
    const percent = totalSteps > 0 ? Math.round((checkedCount / totalSteps) * 100) : 0;

    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.innerText = `Progresso: ${percent}%`;

    if (percent === 100) {
      if (progressText) progressText.style.color = "#27ae60";
    } else {
      if (progressText) progressText.style.color = "var(--color-sidebar)";
    }

    updateGallery();
  };

  checkboxes.forEach((cb) => {
    cb.checked = localStorage.getItem(cb.id) === "true";
    cb.addEventListener("change", updateProgress);
  });

  injectVariables();
  updateProgress();
});
