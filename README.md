# GrapplingGarage

Static Next.js website for Grappling Garage in Tunis.

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Production build

```bash
npm install
npm run lint
npm run build
```

The build creates the complete static website in `out/` and verifies the
production domain, Google meta tag, canonical URL, robots, sitemap, employee
noindex, Plesk fallback, Firestore rules, and llms.txt 3/3 structure.

Copy the contents of `out/` directly into the Plesk document root. The website
does not require Node.js on Plesk.

The employee page uses PIN `1111`, then edits the public `schedules` collection
directly with the Firebase SDK. Deploy `firestore.rules` once so schedule fields
remain validated:

```bash
npx firebase-tools@latest login
npx firebase-tools@latest use grapplinggarage
npx firebase-tools@latest deploy --only firestore:rules
```

The remaining Plesk certificate and Topnet DNS actions are listed precisely in
`deploy/PRODUCTION-CHECKLIST.md`.
