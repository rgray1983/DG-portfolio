const resumeModal = document.getElementById('resumeModal');
const openResumeModal = document.getElementById('openResumeModal');
const closeResumeModal = document.getElementById('closeResumeModal');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

let resumeLastFocus = null;

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
  if (resumeLastFocus && typeof resumeLastFocus.focus === 'function') resumeLastFocus.focus();
}

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  closeLightbox.focus();
}

function hideLightbox() {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  lightboxImg.src = '';
}

openResumeModal.addEventListener('click', openResume);
closeResumeModal.addEventListener('click', closeResume);

document.addEventListener('click', (event) => {
  const zoom = event.target.closest('.ed-case-zoom');
  if (zoom) {
    event.preventDefault();
    openLightbox(zoom.dataset.full);
    return;
  }
  if (event.target.tagName === 'IMG' && event.target.closest('#modalContent')) {
    openLightbox(event.target.src);
  }
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target === closeLightbox) hideLightbox();
});

resumeModal.addEventListener('click', (event) => {
  if (event.target === resumeModal) closeResume();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (!lightbox.classList.contains('hidden')) {
    hideLightbox();
    event.stopImmediatePropagation();
    return;
  }
  if (document.getElementById('projectModal')?.classList.contains('open')) return;
  closeResume();
});

document.getElementById('printResume').addEventListener('click', () => {
  window.print();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

window.observeReveals = function (root) {
  (root || document).querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
};
window.observeReveals(document);

document.getElementById('mobileMenuBtn').addEventListener('click', (event) => {
  const menu = document.getElementById('mobileMenu');
  const isOpen = !menu.classList.toggle('hidden');
  event.currentTarget.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('#mobileMenu a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('hidden');
    document.getElementById('mobileMenuBtn').setAttribute('aria-expanded', 'false');
  });
});
