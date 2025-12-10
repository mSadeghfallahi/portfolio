// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      // Close mobile menu if open
      closeMobileMenu();
      // Update active nav link
      updateActiveNavLink(targetId);
    }
  });
});

// Dark/Light mode toggle
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");

function openMobileMenu() {
  sidebar.classList.add("active");
  sidebarOverlay.classList.add("active");
  mobileMenuToggle.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
  mobileMenuToggle.classList.remove("active");
  document.body.style.overflow = "";
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    if (sidebar.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeMobileMenu);
}

// Update active nav link on scroll
function updateActiveNavLink(hash) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    }
  });
}

// Set active nav link based on scroll position
function setActiveNavLink() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");
  
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Update active nav link on scroll
window.addEventListener("scroll", setActiveNavLink);

// Close mobile menu when window is resized to desktop size
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

