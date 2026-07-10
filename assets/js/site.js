document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const supportEmailEl = document.getElementById("support-email");
  if (supportEmailEl) {
    const user = "contact";
    const domain = "oxo-music";
    const tld = "com";
    const email = `${user}@${domain}.${tld}`;
    const link = document.createElement("a");
    link.className = "mail-link";
    link.href = `mailto:${email}`;
    link.textContent = email;
    supportEmailEl.replaceWith(link);
  }

  const manualGrid = document.querySelector(".manual-grid");
  if (manualGrid) {
    const modal = document.createElement("div");
    modal.className = "manual-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="manual-modal-inner" role="dialog" aria-modal="true" aria-label="Manual image preview">
        <div class="manual-modal-top">
          <button type="button" class="manual-modal-close" aria-label="Close manual preview">Close</button>
        </div>
        <div class="manual-modal-media-wrap">
          <img class="manual-modal-image" alt="">
          <p class="manual-modal-caption"></p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".manual-modal-close");
    const modalImage = modal.querySelector(".manual-modal-image");
    const captionEl = modal.querySelector(".manual-modal-caption");
    let lastFocusedEl = null;

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("manual-modal-open");
      modalImage.removeAttribute("src");
      captionEl.textContent = "";

      if (lastFocusedEl) {
        lastFocusedEl.focus();
      }
    };

    const openModal = (imgEl, captionText, triggerEl) => {
      lastFocusedEl = triggerEl;
      modalImage.src = imgEl.currentSrc || imgEl.src;
      modalImage.alt = imgEl.alt || "Manual screenshot";
      captionEl.textContent = captionText;

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("manual-modal-open");
      closeBtn.focus();
    };

    const manualItems = manualGrid.querySelectorAll(".manual-item");
    manualItems.forEach((item) => {
      const image = item.querySelector("img");
      if (!image) {
        return;
      }

      const captionText = item.querySelector("figcaption")?.textContent?.trim() || "Manual screenshot";
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-label", `Open manual image: ${captionText}`);

      item.addEventListener("click", () => {
        openModal(image, captionText, item);
      });

      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(image, captionText, item);
        }
      });
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }
});
