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

## Deployment

The site is published through GitHub Pages from the `main` branch.
