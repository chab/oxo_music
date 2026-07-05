document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("oxo-carousel");
  if (!carousel) {
    return;
  }

  const imageEl = document.getElementById("carousel-image");
  const dotsContainer = document.getElementById("carousel-dots");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  const start = Number(carousel.dataset.start || 1);
  const end = Number(carousel.dataset.end || start);
  const basePath = carousel.dataset.basePath || "images/gallery_";
  const extension = carousel.dataset.extension || ".png";

  const candidates = [];
  for (let i = start; i <= end; i += 1) {
    candidates.push({
      number: i,
      src: `${basePath}${i}${extension}`,
    });
  }

  const probeImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });

  Promise.all(
    candidates.map(async (candidate) => ({
      ...candidate,
      exists: await probeImage(candidate.src),
    }))
  ).then((results) => {
    const slides = results.filter((item) => item.exists);

    if (slides.length === 0) {
      imageEl.removeAttribute("src");
      imageEl.alt = "No gallery images available";
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }

    let currentIndex = 0;

    const render = () => {
      const current = slides[currentIndex];
      imageEl.src = current.src;
      imageEl.alt = `Oxo Steps gallery image ${current.number}`;

      const dots = dotsContainer.querySelectorAll(".carousel-dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
      });
    };

    const goTo = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      render();
    };

    dotsContainer.innerHTML = "";
    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Show image ${slide.number}`);
      dot.addEventListener("click", () => goTo(index));
      dotsContainer.appendChild(dot);
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => goTo(currentIndex + 1));
    }

    let touchStartX = null;
    carousel.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      (event) => {
        if (touchStartX === null) return;
        const touchEndX = event.changedTouches[0].screenX;
        const delta = touchStartX - touchEndX;

        if (Math.abs(delta) > 45) {
          if (delta > 0) {
            goTo(currentIndex + 1);
          } else {
            goTo(currentIndex - 1);
          }
        }

        touchStartX = null;
      },
      { passive: true }
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        goTo(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        goTo(currentIndex + 1);
      }
    });

    render();
  });
});
