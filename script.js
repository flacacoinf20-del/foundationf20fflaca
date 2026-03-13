const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const copyContractButton = document.getElementById('copy-contract');
const currentYear = document.getElementById('current-year');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

if (copyContractButton) {
  copyContractButton.addEventListener('click', async () => {
    const contract = copyContractButton.dataset.contract;
    const action = copyContractButton.querySelector('.contract-action');
    if (!contract || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(contract);
      if (action) {
        const previousText = action.textContent;
        action.textContent = 'Copied';
        setTimeout(() => {
          action.textContent = previousText;
        }, 1800);
      }
    } catch {
      if (action) {
        const previousText = action.textContent;
        action.textContent = 'Error';
        setTimeout(() => {
          action.textContent = previousText;
        }, 1800);
      }
    }
  });
}
