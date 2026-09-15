const resumeModal = document.getElementById('resumeModal');
const openResumeModal = document.getElementById('openResumeModal');
const closeResumeModal = document.getElementById('closeResumeModal');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

let resumeLastFocus = null;
let lightboxLastFocus = null;

function focusableElements(container) {
  return [...container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter((element) => !element.hasAttribute('hidden') && element.offsetParent !== null);
}

function trapFocus(container, event) {
  if (event.key !== 'Tab') return;
  const elements = focusableElements(container);
  if (!elements.length) return;
  const first = elements[0];
  const last = elements[elements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

window.trapFocus = trapFocus;

function openResume() {
  resumeLastFocus = document.activeElement;
  resumeModal.classList.add('open');
  resumeModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeResumeModal.focus();
}

function closeResume() {
  if (!resumeModal.classList.contains('open')) return;
  resumeModal.classList.remove('open');
  resumeModal.setAttribute('aria-hidden', 'true');
  if (!document.getElementById('projectModal')?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
  resumeLastFocus?.focus();
}

function openLightbox(src, alt = 'Expanded portfolio image') {
  lightboxLastFocus = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  lightbox.setAttribute('aria-hidden', 'false');
  closeLightbox.focus();
}

function hideLightbox() {
  if (lightbox.classList.contains('hidden')) return;
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  lightboxLastFocus?.focus();
}

function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

openResumeModal.addEventListener('click', openResume);
closeResumeModal.addEventListener('click', closeResume);

document.addEventListener('click', (event) => {
  const zoom = event.target.closest('.ed-case-zoom');
  if (zoom) {
    event.preventDefault();
    openLightbox(zoom.dataset.full, zoom.querySelector('img')?.alt);
    return;
  }

  if (event.target.tagName === 'IMG' && event.target.closest('#modalContent')) {
    openLightbox(event.target.src, event.target.alt);
    return;
  }

  if (!mobileMenu.classList.contains('hidden') && !event.target.closest('header')) {
    closeMobileMenu();
  }
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target === closeLightbox) hideLightbox();
});

resumeModal.addEventListener('click', (event) => {
  if (event.target === resumeModal) closeResume();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('hidden')) {
    if (event.key === 'Escape') {
      hideLightbox();
      event.stopImmediatePropagation();
    } else {
      trapFocus(lightbox, event);
    }
    return;
  }

  if (resumeModal.classList.contains('open')) {
    if (event.key === 'Escape') closeResume();
    else trapFocus(resumeModal, event);
    return;
  }

  if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
    closeMobileMenu();
    mobileMenuBtn.focus();
  }
});

document.getElementById('printResume').addEventListener('click', () => window.print());

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  window.observeReveals = function (root) {
    (root || document).querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  };
} else {
  window.observeReveals = function (root) {
    (root || document).querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  };
}
window.observeReveals(document);

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.toggle('hidden');
  mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#mobileMenu a').forEach((link) => link.addEventListener('click', closeMobileMenu));
window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 768px)').matches) closeMobileMenu();
});
