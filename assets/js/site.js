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
});
