document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const copyButton = document.querySelector(".copy-btn");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const targetId = copyButton.getAttribute("data-copy-target");
      const target = targetId ? document.getElementById(targetId) : null;
      const text = target ? target.textContent.trim() : "";

      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const originalText = copyButton.textContent;
        copyButton.textContent = "Copied";
        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 1600);
      } catch (error) {
        console.error("Clipboard copy failed:", error);
      }
    });
  }
});