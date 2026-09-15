(function () {
  const root = document.body;
  const key = root.dataset.project;
  const data = window.PortfolioData;
  const project = data && data.projects[key];
  if (!project) return;

  const prefix = '../../';
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('lightboxClose');
  let lastFocus = null;

  const imageClass = (layout) => ['full', 'wide', 'large', 'portrait'].includes(layout) ? layout : '';

  document.getElementById('kicker').textContent = project.kicker;
  document.getElementById('title').textContent = project.title;
  document.getElementById('intro').textContent = project.intro;
  document.getElementById('meta').innerHTML = project.meta.map((entry) => `<span>${entry}</span>`).join('');
  document.getElementById('story').innerHTML = project.sections.map((section) =>
    `<article class="story-card"><h2>${section.title}</h2><p>${section.copy}</p></article>`
  ).join('');

  gallery.innerHTML = project.images.map((image, index) =>
    `<figure class="figure ${imageClass(image.layout)}">
      <button type="button" data-src="${prefix + image.src}" aria-label="Expand image: ${image.alt}">
        <img src="${prefix + image.src}" alt="${image.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
      </button>
      ${image.caption ? `<figcaption><strong>${image.alt}</strong>${image.caption}</figcaption>` : ''}
    </figure>`
  ).join('');

  const order = ['ameriserv', 'earlybird', 'signalpoint', 'mattress', 'goatwood'];
  const routes = {
    ameriserv: '../ameriserv/index.html',
    earlybird: '../early-bird/index.html',
    signalpoint: '../signal-point/index.html',
    mattress: '../hygrocotton/index.html',
    goatwood: '../goatwood/index.html'
  };
  const currentIndex = order.indexOf(key);
  const previous = order[(currentIndex - 1 + order.length) % order.length];
  const next = order[(currentIndex + 1) % order.length];

  document.getElementById('prev').href = routes[previous];
  document.getElementById('prevName').textContent = data.projects[previous].title;
  document.getElementById('next').href = routes[next];
  document.getElementById('nextName').textContent = data.projects[next].title;

  function focusableElements() {
    return [...lightbox.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => element.offsetParent !== null);
  }

  function hideLightbox() {
    if (!lightbox.classList.contains('open')) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lastFocus?.focus();
  }

  gallery.addEventListener('click', (event) => {
    const button = event.target.closest('[data-src]');
    if (!button) return;
    lastFocus = button;
    lightboxImg.src = button.dataset.src;
    lightboxImg.alt = button.querySelector('img').alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    closeLightbox.focus();
  });

  closeLightbox.addEventListener('click', hideLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) hideLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') {
      hideLightbox();
      return;
    }
    if (event.key !== 'Tab') return;

    const elements = focusableElements();
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
  });
})();
