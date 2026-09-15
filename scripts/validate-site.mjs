import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const notes = [];
const ignored = new Set(['.git', 'node_modules']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function fail(file, message) {
  failures.push(`${relative(file)}: ${message}`);
}

function localTarget(file, raw) {
  if (!raw || raw.startsWith('#') || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(raw)) return null;
  const clean = decodeURIComponent(raw.split('#')[0].split('?')[0]);
  if (!clean) return null;
  const resolved = path.resolve(path.dirname(file), clean);
  return clean.endsWith('/') ? path.join(resolved, 'index.html') : resolved;
}

const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const jsFiles = files.filter((file) => file.endsWith('.js'));
const imageFiles = files.filter((file) => /\.(png|jpe?g|webp|gif|svg)$/i.test(file));

if (files.some((file) => path.basename(file) === '.DS_Store')) {
  failures.push('Repository contains .DS_Store metadata.');
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');

  if (!/<title>[^<]+<\/title>/i.test(html)) fail(file, 'missing a page title');
  if (!/<meta\s+name="viewport"/i.test(html)) fail(file, 'missing viewport metadata');
  if (path.basename(file) !== '404.html' && !/<meta\s+name="description"/i.test(html)) fail(file, 'missing meta description');

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  duplicateIds.forEach((id) => fail(file, `duplicate id "${id}"`));

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target = localTarget(file, match[1]);
    if (target && !fs.existsSync(target)) fail(file, `broken local reference "${match[1]}"`);
  }

  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      fail(file, `invalid JSON-LD: ${error.message}`);
    }
  }

  for (const match of html.matchAll(/<a\b([^>]*target="_blank"[^>]*)>/gi)) {
    if (!/rel="[^"]*noopener[^"]*"/i.test(match[1])) fail(file, 'target="_blank" link is missing rel="noopener"');
  }
}

for (const file of files.filter((entry) => entry.endsWith('.css'))) {
  const css = fs.readFileSync(file, 'utf8');
  for (const match of css.matchAll(/url\((['"]?)([^'")]+)\1\)/gi)) {
    const target = localTarget(file, match[2]);
    if (target && !fs.existsSync(target)) fail(file, `broken CSS asset "${match[2]}"`);
  }
}

const portfolioData = path.join(root, 'js', 'portfolio-data.js');
if (fs.existsSync(portfolioData)) {
  const source = fs.readFileSync(portfolioData, 'utf8');
  for (const match of source.matchAll(/(?:image|src):\s*['"]([^'"]+)['"]/g)) {
    const target = path.join(root, match[1]);
    if (!fs.existsSync(target)) fail(portfolioData, `missing portfolio asset "${match[1]}"`);
  }
}

for (const file of imageFiles) {
  const size = fs.statSync(file).size;
  if (size > 750 * 1024) fail(file, `image is ${Math.round(size / 1024)} KB; keep web images below 750 KB`);
}

const requiredPages = [
  'index.html',
  '404.html',
  'work/ameriserv/index.html',
  'work/early-bird/index.html',
  'work/signal-point/index.html',
  'work/hygrocotton/index.html',
  'work/goatwood/index.html'
];
requiredPages.forEach((page) => {
  if (!fs.existsSync(path.join(root, page))) failures.push(`Missing required page: ${page}`);
});

notes.push(`Checked ${htmlFiles.length} HTML files, ${jsFiles.length} JavaScript files, and ${imageFiles.length} images.`);

if (failures.length) {
  console.error('\nPortfolio validation failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  console.error('');
  process.exit(1);
}

console.log(`Portfolio validation passed. ${notes.join(' ')}`);
