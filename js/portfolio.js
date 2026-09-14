(function () {
  const data = window.PortfolioData;
  if (!data) return;

  const gallery = document.getElementById('workGallery');
  const filterBar = document.getElementById('workFilters');
  const countEl = document.getElementById('workCount');
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalKicker = document.getElementById('modalKicker');
  const closeModal = document.getElementById('closeModal');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');

  if (!gallery || !modal) return;

  let activeFilter = 'all';
  let currentItemId = null;
  let lastFocus = null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function flattenItems(rows) {
    return rows.flatMap((row) => row.items.map((item) => ({ ...item, rowId: row.id, rhythm: row.rhythm, align: row.align })));
  }

  function itemMatches(item, filter) {
    if (filter === 'all') return true;
    return (item.categories || []).includes(filter);
  }

  function visibleRows() {
    if (activeFilter === 'all') return data.workLayout;

    return data.workLayout
      .map((row) => {
        const items = row.items.filter((item) => itemMatches(item, activeFilter));
        if (!items.length) return null;

        if (items.length === 1 && row.items.length > 1) {
          const solo = { ...items[0] };
          if (solo.span < 8) {
            solo.span = Math.min(8, Math.max(solo.span, 7));
            solo.start = solo.start ? Math.min(solo.start, 5) : undefined;
          }
          return {
            ...row,
            rhythm: solo.featured ? 'chapter' : 'aside',
            items: [solo]
          };
        }

        return { ...row, items };
      })
      .filter(Boolean);
  }

  function visibleItems() {
    return flattenItems(visibleRows());
  }

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function disciplineLine(item) {
    return item.disciplines.join(' · ');
  }

  function frameClass(item) {
    return `ed-frame ed-frame--${item.tone || 'ink'}${item.fit === 'contain' ? ' ed-frame--contain' : ''}`;
  }

  function columnStyle(item, index, total) {
    if (total === 1 && !item.start && item.span === 12) {
      return '--ed-span:12;--ed-start:auto';
    }
    const start = item.start ? item.start : 'auto';
    return `--ed-span:${item.span || 12};--ed-start:${start}`;
  }

  function renderItem(item, number, total, position) {
    const eager = number <= 2 && activeFilter === 'all';
    const objectPos = item.position === 'top' ? 'object-position:top' : '';
    const route = data.projectRoutes && data.projectRoutes[item.project];
    const openHit = route
      ? `<a class="ed-hit" href="${route}" aria-label="View case study: ${item.title}">`
      : `<button class="ed-hit" type="button" data-item="${item.id}" aria-label="View project: ${item.title}">`;
    const closeHit = route ? '</a>' : '</button>';

    return `
      <article class="ed-item reveal" style="${columnStyle(item, position, total)}">
        ${openHit}
          <div class="${frameClass(item)}" style="aspect-ratio:${item.aspect}">
            <img
              src="${item.image}"
              alt="${item.alt}"
              width="${item.width}"
              height="${item.height}"
              loading="${eager ? 'eager' : 'lazy'}"
              decoding="async"
              style="${objectPos}"
            />
          </div>
          <div class="ed-meta">
            <div class="ed-meta-copy">
              <h3 class="ed-title">${item.title}</h3>
              <p class="ed-disc">${disciplineLine(item)}</p>
            </div>
            <div class="ed-meta-side">
              <span class="ed-num">${pad(number)} / ${pad(total)}</span>
              <span class="ed-view" aria-hidden="true">${route ? 'Case Study' : 'View'}</span>
            </div>
          </div>
        ${closeHit}
      </article>
    `;
  }

  function render() {
    const rows = visibleRows();
    const items = flattenItems(rows);
    const total = items.length;
    let n = 0;

    gallery.innerHTML = rows.map((row) => {
      const html = row.items.map((item) => {
        n += 1;
        return renderItem(item, n, total, n);
      }).join('');

      return `<div class="ed-row ed-row--${row.rhythm} ed-row--${row.align}" data-row="${row.id}">${html}</div>`;
    }).join('') || '<p class="ed-lede">No work in this category yet.</p>';

    if (countEl) {
      countEl.textContent = pad(total);
    }

    gallery.querySelectorAll('[data-item]').forEach((btn) => {
      btn.addEventListener('click', () => openItem(btn.dataset.item));
    });

    if (window.observeReveals) window.observeReveals(gallery);
    else {
      gallery.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    }
  }

  function renderFilters() {
    if (!filterBar) return;
    filterBar.innerHTML = data.filters.map((filter) => `
      <button
        type="button"
        class="ed-filter"
        data-filter="${filter.id}"
        aria-pressed="${filter.id === activeFilter}"
      >${filter.label}</button>
    `).join('');

    filterBar.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        renderFilters();
        render();
      });
    });
  }

  function findItem(id) {
    return flattenItems(data.workLayout).find((item) => item.id === id);
  }

  function imageClass(layout) {
    switch (layout) {
      case 'full': return 'ed-case-img ed-case-img--full';
      case 'wide': return 'ed-case-img ed-case-img--wide';
      case 'large': return 'ed-case-img ed-case-img--large';
      case 'portrait': return 'ed-case-img ed-case-img--portrait';
      default: return 'ed-case-img ed-case-img--half';
    }
  }

  function orderImages(project, leadSrc) {
    if (!leadSrc) return project.images.slice();
    const images = project.images.slice();
    const idx = images.findIndex((img) => img.src === leadSrc);
    if (idx > 0) {
      const [lead] = images.splice(idx, 1);
      images.unshift({ ...lead, layout: 'full' });
    }
    return images;
  }

  function openItem(id) {
    const item = findItem(id);
    const project = item && data.projects[item.project];
    if (!project) return;

    currentItemId = id;
    lastFocus = document.activeElement;

    const images = orderImages(project, item.image);
    modalKicker.textContent = project.kicker;

    modalContent.innerHTML = `
      <div class="ed-case">
        <header class="ed-case-head">
          <div>
            <h2 id="modalTitle" class="ed-case-title">${project.title}</h2>
            <p class="ed-case-intro">${project.intro}</p>
          </div>
          <div class="ed-case-meta">
            ${project.meta.map((entry) => `<p>${entry}</p>`).join('')}
          </div>
        </header>

        ${project.sections.length ? `
          <div class="ed-case-sections">
            ${project.sections.map((section) => `
              <article>
                <h3>${section.title}</h3>
                <p>${section.copy}</p>
              </article>
            `).join('')}
          </div>
        ` : ''}

        <div class="ed-case-gallery">
          ${images.map((img, index) => `
            <figure class="ed-case-figure ${imageClass(img.layout)}" ${prefersReducedMotion ? '' : `style="animation-delay:${Math.min(index * 0.06, 0.4)}s"`}>
              ${img.featured ? '<span class="ed-featured">Featured</span>' : ''}
              <button type="button" class="ed-case-zoom" data-full="${img.src}" aria-label="Expand image: ${img.alt}">
                <img src="${img.src}" alt="${img.alt}" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async" />
              </button>
              ${img.caption ? `<figcaption><strong>${img.alt}</strong>${img.caption}</figcaption>` : ''}
            </figure>
          `).join('')}
        </div>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const items = visibleItems();
    const idx = items.findIndex((entry) => entry.id === id);
    const currentProject = items[idx] && items[idx].project;
    const hasPrev = idx > 0 && items.slice(0, idx).some((entry) => entry.project !== currentProject);
    const hasNext = idx >= 0 && items.slice(idx + 1).some((entry) => entry.project !== currentProject);
    if (prevBtn) prevBtn.disabled = !hasPrev;
    if (nextBtn) nextBtn.disabled = !hasNext;

    const close = document.getElementById('closeModal');
    if (close) close.focus();
  }

  function closeProject() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.getElementById('resumeModal')?.classList.contains('open')) {
      document.body.style.overflow = '';
    }
    currentItemId = null;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function stepProject(delta) {
    const items = visibleItems();
    const idx = items.findIndex((entry) => entry.id === currentItemId);
    if (idx < 0) return;
    const currentProject = items[idx].project;
    for (let i = idx + delta; i >= 0 && i < items.length; i += delta) {
      if (items[i].project !== currentProject) {
        openItem(items[i].id);
        return;
      }
    }
  }

  gallery.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const hit = event.target.closest('[data-item]');
    if (!hit) return;
    event.preventDefault();
    openItem(hit.dataset.item);
  });

  if (closeModal) closeModal.addEventListener('click', closeProject);
  if (prevBtn) prevBtn.addEventListener('click', () => stepProject(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => stepProject(1));

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeProject();
  });

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) return;
    const lightboxOpen = !document.getElementById('lightbox')?.classList.contains('hidden');
    if (lightboxOpen) return;
    if (event.key === 'Escape') closeProject();
    if (event.key === 'ArrowLeft') stepProject(-1);
    if (event.key === 'ArrowRight') stepProject(1);
  });

  window.closePortfolioProject = closeProject;
  window.openPortfolioItem = openItem;

  renderFilters();
  render();
})();
