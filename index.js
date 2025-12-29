const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("header, section");

let isClickScrolling = false;

function setActiveBySection(id) {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.section === id);
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    isClickScrolling = true;

    const sectionId = item.dataset.section;
    const target =
      sectionId === "header"
        ? document.querySelector("header")
        : document.getElementById(sectionId);

    setActiveBySection(sectionId);

    target.scrollIntoView({ behavior: "smooth" });

    // allow observer again after scroll settles
    setTimeout(() => {
      isClickScrolling = false;
    }, 700);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    if (isClickScrolling) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id || "header";
        setActiveBySection(id);
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => observer.observe(section));

const themeSwitch = document.getElementById("theme-switch");

const enableLightmode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "active");
};

const disableLightmode = () => {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
};

let lightmode = localStorage.getItem("lightmode");
if (lightmode === "active") enableLightmode();

themeSwitch.addEventListener("click", () => {
  lightmode = localStorage.getItem("lightmode");
  if (lightmode !== "active") {
    enableLightmode();
  } else {
    disableLightmode();
  }
});
