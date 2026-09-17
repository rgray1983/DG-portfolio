const { test, expect } = require('@playwright/test');

async function decodedImageSources(page) {
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach((img) => {
      img.loading = 'eager';
    });
    await Promise.all(images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }));
  });

  return page.evaluate(() =>
    [...document.images]
      .filter((img) => img.getAttribute('src') && img.naturalWidth === 0)
      .map((img) => img.getAttribute('src'))
  );
}

test('homepage loads its primary content and portfolio', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Richie Gray/);
  await expect(page.getByRole('heading', { level: 1, name: /Richie Gray/i })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Selected Work' })).toBeVisible();
  await expect(page.locator('#workGallery .ed-item')).not.toHaveCount(0);
  await expect(await decodedImageSources(page)).toEqual([]);
});

test('portfolio filters update the visible work', async ({ page }) => {
  await page.goto('/');

  const filter = page.getByRole('button', { name: 'Packaging', exact: true });
  await filter.click();

  await expect(filter).toHaveAttribute('aria-pressed', 'true');
  const count = Number(await page.locator('#workCount').textContent());
  expect(count).toBeGreaterThan(0);
  await expect(page.locator('#workGallery .ed-item')).toHaveCount(count);
});

test('resume dialog opens and closes from the keyboard', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'View Full Resume' }).click();
  const dialog = page.locator('#resumeModal');
  await expect(dialog).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#closeResumeModal')).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(dialog).toHaveAttribute('aria-hidden', 'true');
});

test('collection project dialog opens and closes', async ({ page }) => {
  await page.goto('/');

  const projectButton = page.locator('#workGallery [data-item]').first();
  await projectButton.click();

  const dialog = page.locator('#projectModal');
  await expect(dialog).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#modalTitle')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(dialog).toHaveAttribute('aria-hidden', 'true');
});

test('mobile menu opens, navigates, and closes', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'), 'Mobile-only navigation check');
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: 'Menu' });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobileMenu')).toBeVisible();

  await page.locator('#mobileMenu a[href="#work"]').click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

const caseStudies = [
  ['/work/ameriserv/', 'AmeriServ Rebrand'],
  ['/work/early-bird/', 'Early Bird'],
  ['/work/signal-point/', 'Signal Point'],
  ['/work/hygrocotton/', 'HygroCotton Cuddlebed'],
  ['/work/goatwood/', 'Goatwood Firewood']
];

for (const [route, title] of caseStudies) {
  test(`${title} case study renders`, async ({ page }) => {
    await page.goto(route);

    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    await expect(page.locator('#story .story-card')).not.toHaveCount(0);
    await expect(page.locator('#gallery figure')).not.toHaveCount(0);
    await expect(await decodedImageSources(page)).toEqual([]);
  });
}

test('case-study lightbox opens and closes', async ({ page }) => {
  await page.goto('/work/ameriserv/');

  await page.locator('#gallery button[data-src]').first().click();
  const lightbox = page.locator('#lightbox');
  await expect(lightbox).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#lightboxImg')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(lightbox).toHaveAttribute('aria-hidden', 'true');
});
