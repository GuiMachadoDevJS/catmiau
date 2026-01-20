const modalMessages = {
  whatsapp: "Atendimento pelo WhatsApp em preparação. Em breve por aqui! 😺",
  loja: "Loja própria em construção. Acompanhe pelo Instagram por enquanto! ✨",
  shopee: "Loja na Shopee chegando em breve! 🛒",
};

const modalBackdrop = document.querySelector("[data-modal-backdrop]");
const modalMessage = document.querySelector(".cat-modal__message");
const modalTitle = document.querySelector("#cat-modal-title");
const closeButton = document.querySelector("[data-modal-close]");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const openModal = (type) => {
  if (!modalBackdrop || !modalMessage) return;
  modalMessage.textContent = modalMessages[type] || "";
  modalTitle.textContent = "Em breve";
  modalBackdrop.classList.add("is-open");
  modalBackdrop.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove("is-open");
  modalBackdrop.setAttribute("aria-hidden", "true");
};

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const type = button.getAttribute("data-modal");
    openModal(type);
  });
});

if (closeButton) {
  closeButton.addEventListener("click", closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

const scrollTopButton = document.querySelector(".scroll-top");

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const { target } = entry;
          const delay = target.getAttribute("data-delay");

          if (delay) {
            target.style.setProperty("--reveal-delay", delay);
          }

          target.classList.add("is-visible");
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
