const menuTrigger = document.querySelector('[data-menu-trigger]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const navigationLinks = [...document.querySelectorAll('.navigation-link')];
const oathDialog = document.querySelector('[data-oath-dialog]');
const sections = [...document.querySelectorAll('#mission, #virtues, #legacy')];

function setActiveLink(id) {
  navigationLinks.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('is-active', active);
    link.toggleAttribute('aria-current', active);
  });
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  menuTrigger.setAttribute('aria-expanded', 'false');
  menuTrigger.setAttribute('aria-label', 'Open navigation menu');
}

menuTrigger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuTrigger.setAttribute('aria-expanded', String(isOpen));
  menuTrigger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.querySelectorAll('[data-oath-trigger]').forEach((trigger) => trigger.addEventListener('click', () => oathDialog.showModal()));
document.querySelectorAll('[data-dialog-close]').forEach((trigger) => trigger.addEventListener('click', () => oathDialog.close()));
oathDialog.addEventListener('click', (event) => { if (event.target === oathDialog) oathDialog.close(); });

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveLink(visible.target.id);
}, { rootMargin: '-25% 0px -55%', threshold: [0.1, 0.4, 0.7] });
sections.forEach((section) => observer.observe(section));
