const projects = [
  {
    title: "Oil Spill Monitoring & Simulation",
    description: "GIS and remote sensing based work focused on detecting and simulating oil spills in the eastern coastal area of Bangladesh.",
    image: "images/project-oil-spill.jpg",
    tags: ["Remote Sensing", "GIS", "Coastal Monitoring"]
  },
  {
    title: "Wetland Change & Livelihood Impact",
    description: "Machine learning based wetland change analysis in Chanda Beel, Gopalganj, with attention to livelihood impacts.",
    image: "images/project-wetland.jpg",
    tags: ["Machine Learning", "Wetlands", "Land Use"]
  },
  {
    title: "Flood Susceptibility Prediction",
    description: "Flood susceptibility research using hydro-climatic extremes, land-use dynamics, GIS, and machine learning approaches.",
    image: "images/project-flood.jpg",
    tags: ["Flood", "ML", "Risk Mapping"]
  },
  {
    title: "Land Use & Socio-economic Survey",
    description: "Field-based project on land-use patterns and socio-economic conditions in Khurulia Mouza, Cox’s Bazar, Bangladesh.",
    image: "images/project-landuse.jpg",
    tags: ["Field Survey", "Land Use", "Socio-economic"]
  },
  {
    title: "Hydro-geomorphological Investigation",
    description: "Investigation of hydro-geomorphological conditions at Rarikhal and Vagyakul area, Munshiganj, Bangladesh.",
    image: "images/project-hydro.jpg",
    tags: ["Hydrology", "Geomorphology", "Field Work"]
  },
  {
    title: "Agricultural Adjustment in Hazard-prone Areas",
    description: "Study on agricultural adjustment in natural hazard-prone areas of Gangachara Upazila, Rangpur, Bangladesh.",
    image: "images/project-agriculture.jpg",
    tags: ["Agriculture", "Hazards", "Adaptation"]
  }
];

const fallbackSvg = (title) => {
  const safeTitle = encodeURIComponent(title);
  return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='600' viewBox='0 0 900 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%230f766e'/%3E%3Cstop offset='1' stop-color='%23f59e0b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='900' height='600'/%3E%3Ccircle cx='730' cy='120' r='90' fill='rgba(255,255,255,0.22)'/%3E%3Ccircle cx='180' cy='500' r='130' fill='rgba(255,255,255,0.16)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='40' font-weight='700' fill='white'%3E${safeTitle}%3C/text%3E%3C/svg%3E`;
};

const projectGrid = document.getElementById("projectGrid");

projects.forEach((project) => {
  const article = document.createElement("article");
  article.className = "project-card";

  article.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.title}" loading="lazy">
    </div>
    <div class="project-body">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </div>
  `;

  const img = article.querySelector("img");
  img.addEventListener("error", () => {
    img.src = fallbackSvg(project.title);
  });

  projectGrid.appendChild(article);
});

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 110;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) item.classList.add("active");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
