# ASTRA AI Academy — React + JavaScript

A responsive four-page academy website starter built with React, Vite, plain JavaScript, React Router, Framer Motion, and Lucide icons.

## Requirements
- Node.js 20+ recommended
- npm

## Run locally
1. Extract this folder.
2. Open the folder in VS Code.
3. Open the terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build for production
```bash
npm run build
npm run preview
```

## Pages
- `/` — Home
- `/courses` — Courses
- `/about` — About
- `/contact` — Contact

## Customize
- Course information: `src/data/courses.js`
- Theme and responsive styles: `src/styles.css`
- Shared navigation/footer: `src/components/`
- Page content: `src/pages/`

## Notes
- Theme choice is saved in localStorage.
- The contact form currently provides client-side validation and a demo success state. Connect it to a backend or form provider before using it for real leads.
- The custom cursor effect is disabled for touch-first devices and respects reduced-motion preferences.
