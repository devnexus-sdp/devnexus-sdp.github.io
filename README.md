# Shivam Paliwal — Portfolio (Angular)

Personal portfolio of Shivam Paliwal, Solutions Engineer. Single-page Angular 18 site with the résumé PDF and
documentation for three open-source libraries.

## Run locally
```bash
npm install
npm start          # http://localhost:4200
```

## Build
```bash
npm run build      # output: dist/resume-website/browser
```

## Deploy
```bash
npm run deploy     # builds and pushes dist/ to the gh-pages branch
```
GitHub Pages serves the `gh-pages` branch at https://devnexus-sdp.github.io.

## Content
- `src/main.ts` — page template and all résumé data (experience, projects, skills, education)
- `src/styles.css` — design system and layout
- `public/Shivam_Paliwal.pdf` — résumé served by the Download button
- `public/docs/` — library documentation PDFs linked from the project cards
