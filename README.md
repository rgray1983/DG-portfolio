# Richie Gray Portfolio

Portfolio website for Richie Gray, an award-winning senior packaging and brand designer with more than 20 years of experience in corrugated graphics, prepress, brand systems, and production-ready creative.

## Local preview

Open the repository in VS Code and use the Live Server extension on `index.html`. The project uses relative paths and does not require a build step.

## Structure

- `index.html` — portfolio homepage, résumé, and contact content
- `js/portfolio-data.js` — project content and gallery configuration
- `js/portfolio.js` — homepage filters and collection viewer
- `work/` — dedicated flagship case-study pages
- `css/project.css` — shared case-study styling
- `images/display/` — web-ready portfolio images
- `resume/` — downloadable résumé PDF

## Updating work

Add project copy and image references in `js/portfolio-data.js`. Keep web images in `images/display/`, use lowercase filenames, and avoid committing production source files or duplicate full-resolution exports.

## Quality checks

Run the same checks used by GitHub Actions before opening a pull request:

```bash
npm test
npm run check:js
```

No dependency installation is required. The checks validate required pages, local links and images, structured data, duplicate IDs, external-link safety, image file sizes, and JavaScript syntax. GitHub Actions runs them automatically for pull requests and pushes to `main`.

## Deployment

The site is published through GitHub Pages from the `main` branch.

## Analytics

Google Analytics 4 records page views and privacy-conscious portfolio interaction events:

- `portfolio_case_study_open`
- `portfolio_case_navigation`
- `portfolio_filter`
- `portfolio_resume`
- `portfolio_contact`
- `portfolio_image_expand`
- `portfolio_scroll_depth`

Event labels identify the project, filter, résumé action, contact channel, or scroll milestone without sending form input or personal visitor information.
