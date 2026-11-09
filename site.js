// Shared non-sensitive page helpers.
document.querySelectorAll("#year").forEach(element => {
  element.textContent = String(new Date().getFullYear());
});
