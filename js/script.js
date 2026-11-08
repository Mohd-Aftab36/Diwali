// Reveal a photo automatically when its matching file exists in /images.
document.querySelectorAll(".photo-card img").forEach((img) => {
  const card = img.closest(".photo-card");
  img.addEventListener("load", () => card.classList.add("has-image"));
  img.addEventListener("error", () => card.classList.remove("has-image"));
  if (img.complete && img.naturalWidth > 0) card.classList.add("has-image");
});
