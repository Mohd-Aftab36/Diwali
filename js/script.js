// Click any gallery photo to open the full-size lightbox.
(() => {
  const cards = Array.from(document.querySelectorAll(".photo-card"));
  const dialog = document.getElementById("photoLightbox");
  if (!cards.length || !dialog) return;

  const lightboxImage = dialog.querySelector(".lightbox-image");
  const caption = dialog.querySelector(".lightbox-caption");
  const count = dialog.querySelector(".lightbox-count");
  const closeButton = dialog.querySelector(".lightbox-close");
  const previousButton = dialog.querySelector(".lightbox-prev");
  const nextButton = dialog.querySelector(".lightbox-next");
  let currentIndex = 0;

  function showPhoto(index) {
    currentIndex = (index + cards.length) % cards.length;
    const card = cards[currentIndex];
    const image = card.querySelector("img");
    lightboxImage.src = card.dataset.full || image.src;
    lightboxImage.alt = image.alt || "Photo from our memories";
    caption.textContent = image.alt || `Our memory ${currentIndex + 1}`;
    count.textContent = `${currentIndex + 1} / ${cards.length}`;
  }

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      showPhoto(index);
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  previousButton.addEventListener("click", () => showPhoto(currentIndex - 1));
  nextButton.addEventListener("click", () => showPhoto(currentIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") showPhoto(currentIndex - 1);
    if (event.key === "ArrowRight") showPhoto(currentIndex + 1);
  });
})();
