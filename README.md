# Chon Has Space

A playful React and Vite demo for reserving fictional advertising space on Chon's cone and harness.

## Current state

- Frontend-only application built with React and Vite.
- No backend, database, analytics, or server-side persistence.
- No real payments are processed.
- The `Pay with Mercado Pago` button opens the demo notice and does not contact Mercado Pago.
- Uploaded files are used only for local sticker previews in the browser.
- The interface supports Spanish and English, detects the browser language on first visit, and remembers manual language changes.

## Development

```bash
npm install
npm run dev
```

Build and verify the production output:

```bash
npm run build
npm run verify
```

## Project structure

- `src/`: React application, translations, and styles.
- `public/`: favicon, video, Chon photo, and the eight selector views.
- `scripts/verify-production.mjs`: basic production-build verification.

## License and authorship

Personal project by Lucas Malizia.
