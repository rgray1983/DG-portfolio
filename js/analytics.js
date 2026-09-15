window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'G-C6T1Y5HP0P', {
  anonymize_ip: true,
  transport_type: 'beacon'
});

window.trackPortfolioEvent = function (eventName, details = {}) {
  gtag('event', eventName, {
    event_category: 'portfolio',
    ...details
  });
};

function projectNameFromHref(href) {
  const match = href.match(/work\/([^/]+)/);
  return match ? match[1] : 'unknown';
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('a, button');
  if (!target) return;

  if (target.matches('[data-filter]')) {
    window.trackPortfolioEvent('portfolio_filter', {
      event_label: target.dataset.filter
    });
    return;
  }

  if (target.id === 'openResumeModal') {
    window.trackPortfolioEvent('portfolio_resume', { event_label: 'open' });
    return;
  }

  if (target.id === 'downloadResume') {
    window.trackPortfolioEvent('portfolio_resume', { event_label: 'pdf' });
    return;
  }

  if (target.id === 'printResume') {
    window.trackPortfolioEvent('portfolio_resume', { event_label: 'print' });
    return;
  }

  if (target.matches('[data-src], .ed-case-zoom')) {
    window.trackPortfolioEvent('portfolio_image_expand', {
      event_label: document.body.dataset.project || 'collection'
    });
    return;
  }

  const href = target.getAttribute('href') || '';

  if (href.startsWith('mailto:')) {
    window.trackPortfolioEvent('portfolio_contact', { event_label: 'email' });
  } else if (href.startsWith('tel:')) {
    window.trackPortfolioEvent('portfolio_contact', { event_label: 'phone' });
  } else if (href.includes('linkedin.com')) {
    window.trackPortfolioEvent('portfolio_contact', { event_label: 'linkedin' });
  } else if (href.includes('extngraphics.com')) {
    window.trackPortfolioEvent('portfolio_contact', { event_label: 'extn_graphics' });
  } else if (target.id === 'prev' || target.id === 'next') {
    window.trackPortfolioEvent('portfolio_case_navigation', {
      event_label: target.id,
      destination: projectNameFromHref(href)
    });
  } else if (href.includes('work/')) {
    window.trackPortfolioEvent('portfolio_case_study_open', {
      event_label: projectNameFromHref(href)
    });
  }
});

const reachedDepth = new Set();
window.addEventListener('scroll', () => {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  if (available <= 0) return;
  const depth = Math.round((window.scrollY / available) * 100);

  [50, 90].forEach((milestone) => {
    if (depth >= milestone && !reachedDepth.has(milestone)) {
      reachedDepth.add(milestone);
      window.trackPortfolioEvent('portfolio_scroll_depth', {
        event_label: String(milestone),
        value: milestone
      });
    }
  });
}, { passive: true });
