document.getElementById("year").textContent = new Date().getFullYear();

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

function toggleFold(title) {
  const wrap = document.getElementById(title.dataset.foldTarget);
  const folded = wrap.classList.toggle("folded");
  title.classList.toggle("is-folded", folded);
  title.setAttribute("aria-expanded", String(!folded));
}

document.querySelectorAll(".section-title.foldable").forEach((title) => {
  title.addEventListener("click", () => toggleFold(title));
  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFold(title);
    }
  });
});
