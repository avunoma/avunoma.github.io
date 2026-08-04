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

const foldableTitles = document.querySelectorAll(".section-title.foldable");

function setFolded(title, folded) {
  const wrap = document.getElementById(title.dataset.foldTarget);
  wrap.classList.toggle("folded", folded);
  title.classList.toggle("is-folded", folded);
  title.setAttribute("aria-expanded", String(!folded));
}

function toggleFold(title) {
  const wrap = document.getElementById(title.dataset.foldTarget);
  setFolded(title, !wrap.classList.contains("folded"));
}

foldableTitles.forEach((title) => {
  title.addEventListener("click", () => toggleFold(title));
  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFold(title);
    }
  });
});
