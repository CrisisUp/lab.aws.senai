document.addEventListener("DOMContentLoaded", () => {
  // --- 1. CONFIGURAÇÃO E MANIFESTO ---
  const awsConfig = {
    awsRegion: "us-east-1", az1: "us-east-1a", az2: "us-east-1b",
    vpcA: "alpha-vpc", cidrA: "10.0.0.0/16",
    vpcB: "alpha2-vpc", cidrB: "10.1.0.0/16",
    subAlphaPubA: "pub-alpha-1a", cidrAlphaPubA: "10.0.1.0/24",
    subAlphaPubB: "pub-alpha-1b", cidrAlphaPubB: "10.0.2.0/24",
    subAlphaPrivA: "priv-alpha-1a", cidrAlphaPrivA: "10.0.3.0/24",
    subAlphaPrivB: "priv-alpha-1b", cidrAlphaPrivB: "10.0.4.0/24",
    subAlpha2PubA: "pub-alpha2-1a", cidrAlpha2PubA: "10.1.1.0/24",
    subAlpha2PubB: "pub-alpha2-1b", cidrAlpha2PubB: "10.1.2.0/24",
    subAlpha2PrivA: "priv-alpha2-1a", cidrAlpha2PrivA: "10.1.3.0/24",
    subAlpha2PrivB: "priv-alpha2-1b", cidrAlpha2PrivB: "10.1.4.0/24",
    igwA: "alpha-igw", igwB: "alpha2-igw",
    natA: "alpha-nat", natB: "alpha2-nat",
    rtPubA: "rt-public-alpha", rtPrivA: "rt-private-alpha",
    rtPubB: "rt-public-alpha2", rtPrivB: "rt-private-alpha2",
    peeringId: "alpha-to-alpha2-peering",
    dbInstanceIdentifier: "lab-db", dbUser: "main",
    dbPassword: "lab-password", dbEngine: "MySQL", dbEngineVersion: "8.0",
    dbClass: "db.t3.micro", dbStorage: "20GB",
    dbInitialName: "lab", dbPort: "3306",
    dbEndpoint: "lab-db.cpq7pnn7gdwj.us-east-1.rds.amazonaws.com",
    sgWeb: "sg-web-server", sgDb: "sg-db-mysql",
    sshPort: "22", httpPort: "80", anywhereCidr: "0.0.0.0/0",
    webInstanceA: "web-server-alpha", webInstanceB: "web-server-alpha2",
    ec2Class: "t2.micro"
  };

  const manifest = [
    "img01a.png", "img01b.png", "img02a.png", "img02b.png", "img02c.png", 
    "img03.png", "img04.png", "img05.png", "img06.png", 
    "img07a.png", "img07b.png", "img07.png", "img08a.png", "img08b.png"
  ];

  // --- 2. INJEÇÃO DE VARIÁVEIS ---
  document.querySelectorAll("[data-var]").forEach(el => {
    const varName = el.getAttribute("data-var");
    if (awsConfig[varName]) el.textContent = awsConfig[varName];
  });

  // --- 3. UI CONTROLS (THEME & SIDEBAR) ---
  const toggleBtn = document.getElementById("sidebar-toggle");
  const themeBtn = document.getElementById("theme-toggle");

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  themeBtn.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-collapsed");
    toggleBtn.textContent = document.body.classList.contains("sidebar-collapsed") ? "➜" : "☰";
  });

  setTheme(localStorage.getItem("theme") || "light");

  // --- 4. SCROLL SPY (Navegação Ativa) ---
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 150) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) link.classList.add("active");
    });
  });

  // --- 5. GESTÃO DE ESTADO E GALERIA ---
  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  const evidenceGallery = document.getElementById("evidence-gallery");
  const galleryContainer = document.getElementById("gallery-container");
  const IMAGE_PATH_PREFIX = "imgs/";

  const createEvidenceCard = (cb) => {
    const card = document.createElement("div");
    card.className = "evidence-card";
    card.id = `card-${cb.id}`;
    
    const title = document.createElement("h3");
    title.textContent = cb.nextElementSibling.innerText;
    card.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "card-images-grid";
    
    const imgPaths = cb.dataset.img.split(',').map(s => s.trim());
    imgPaths.forEach(path => {
      const wrapper = document.createElement("div");
      wrapper.className = "img-wrapper";
      if (manifest.includes(path)) {
        const img = document.createElement("img");
        img.src = IMAGE_PATH_PREFIX + path;
        img.loading = "lazy";
        wrapper.appendChild(img);
      } else {
        wrapper.innerHTML = `<div class="missing-img-placeholder"><p>📷 Aguardando print</p><small><code>${path}</code></small></div>`;
      }
      grid.appendChild(wrapper);
    });
    card.appendChild(grid);
    return card;
  };

  const updateGallery = (cb) => {
    const existing = document.getElementById(`card-${cb.id}`);
    if (cb.checked && !existing) evidenceGallery.appendChild(createEvidenceCard(cb));
    else if (!cb.checked && existing) existing.remove();
    galleryContainer.classList.toggle("hidden", evidenceGallery.children.length === 0);
  };

  const updateProgress = () => {
    const checked = Array.from(checkboxes).filter(c => c.checked).length;
    const percent = Math.round((checked / checkboxes.length) * 100);
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").textContent = `Conclusão: ${percent}%`;
    
    checkboxes.forEach(cb => {
        const link = document.getElementById(cb.dataset.nav);
        if (link) cb.checked ? link.classList.add("done") : link.classList.remove("done");
        localStorage.setItem(cb.id, cb.checked);
    });
  };

  // Funções Globais
  window.openGallery = (itemId) => {
    const cb = document.getElementById(itemId);
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = "";
    modalBody.appendChild(createEvidenceCard(cb));
    document.getElementById("modal-overlay").style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  window.closeModal = () => {
    document.getElementById("modal-overlay").style.display = "none";
    document.body.style.overflow = "auto";
  };

  checkboxes.forEach(cb => {
    cb.checked = localStorage.getItem(cb.id) === "true";
    cb.addEventListener("change", () => { updateProgress(); updateGallery(cb); });
    if (cb.checked) { updateGallery(cb); }
  });

  updateProgress();
});
