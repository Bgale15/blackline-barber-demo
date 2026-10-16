
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const yearElement = document.querySelector("#year");

  // Actualizar automáticamente el año del pie de página.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Abrir y cerrar el menú en dispositivos móviles.
  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";

      document.body.classList.toggle("menu-open", isOpen);
    });

    // Cerrar el menú cuando se selecciona una sección.
    navItems.forEach((item) => {
      item.addEventListener("click", closeMenu);
    });

    // Cerrar el menú con la tecla Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Cerrar el menú si se vuelve a una pantalla grande.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        closeMenu();
      }
    });
  }

  // Animar los bloques cuando aparecen en pantalla.
  const animatedElements = document.querySelectorAll(
    ".section-heading, .service-card, .about-image, " +
    ".about-content, .quote-section > p, .contact-copy, .contact-box"
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }
});
