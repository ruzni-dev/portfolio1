# Portfolio1 — Ruzni / DARKBEAST

Brief overview
- Static portfolio website showcasing projects, services and contact information. Built with plain HTML, CSS and JavaScript and enhanced with Typed.js and ScrollReveal for micro-interactions.

Live demo
- The project appears intended for GitHub Pages (references like `https://ruzni-dev.github.io/portfolio1/`). Open `index.html` in a browser or serve the folder via a local static server to preview.

Key features
- Responsive single-page layout with multiple sections (Home, About, Services, Portfolio, Contact).
- Light/dark theme toggle that:
  - Uses CSS variables and `body.light` to switch theme colors.
  - Persists the user's choice in `localStorage` under key `theme` ('light' or 'dark').
  - Falls back to the OS preference when no saved choice exists and listens for OS changes.
- Animated typed text (Typed.js) and reveal animations (ScrollReveal).
- Scroll progress bar and sticky header that updates navigation links while scrolling.
- Contact form with client-side validation and a mailto fallback (opens user's mail app).
- Custom cursor outline element that follows the pointer using `Element.animate()`.
- Project/certificate modal viewers with iframe preview for PDFs.

> Note: The contact form does not send messages to a server; it composes a `mailto:` link. Replace with a server or 3rd-party form service (Formspree, EmailJS) to accept real submissions.

Tech / libs used
- Plain HTML, CSS, JavaScript
- Typed.js (typed effects)
- ScrollReveal (scroll animations)
- Font Awesome (icons) — loaded from CDN

Repository structure (important files)
- `index.html` — main entry page
- `pages/` — subpages that reuse the same layout and styles
- `assets/css/style.css` — primary stylesheet (authoritative look & component styles)
- `assets/css/style2.css` — alternate stylesheet used by some pages (kept in sync)
- `assets/js/main.js` — primary JavaScript (navigation, theme persistence, form handling, cursor, modals)
- `assets/js/pages.js` — page-specific JS used by some subpages
- `assets/images/` — project images and icons

How to run locally
1. Quick (open file):
   - Double-click `index.html` or open it in your browser.
2. Recommended (simple local server):
   - Python 3:

```bash
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Customization guide
- Colors & theme: edit CSS variables at the top of `assets/css/style.css` (and `style2.css` if you maintain parity). The theme switch toggles `body.light`.
- Typed strings: edit the arrays in `assets/js/main.js` (the `Typed` initializations).
- Projects: update the `.portfolio-container` markup in `index.html` or files under `pages/`.
- Contact handling: to accept messages server-side, replace the mailto logic inside `assets/js/main.js` (the contact form `submit` handler) with an AJAX POST to your endpoint or a 3rd-party service.

Accessibility & notes
- The theme toggle input is visually hidden but keyboard-focusable and includes a visible focus ring.
- Modals set `aria-hidden` appropriately when opened/closed and close on Escape or clicking outside content.
- Contact form has client-side validation and visible error messages. Ensure server-side validation is added if you accept submissions.

Known issues & fixes applied
- Multiple stylesheets originally had older toggle styles; they were synchronized to match the main `style.css` knob and to use a visually-hidden input instead of `display:none` so label clicks work reliably.
- The cursor outline element needed `z-index: -1` to avoid covering interactive elements — this was synchronized.

Deployment
- The site is suited to static hosting (GitHub Pages, Netlify, Vercel). For GitHub Pages, push the `portfolio1` folder to a repository and enable GitHub Pages from the `main` branch (or publish to `ruzni-dev.github.io/portfolio1`).

Security & privacy
- The contact form uses `mailto:` and does not store user data. If you add server-side handling, follow best practices: validate inputs, rate-limit, and avoid logging sensitive data.

Contributing
- Small fixes and improvements welcome. Suggested steps:
  1. Fork the project
  2. Create a feature branch
  3. Test locally
  4. Open a pull request with a clear description

License
- Add a license you prefer (MIT is a common choice for personal portfolios). If you'd like, I can add a `LICENSE` file.

Next steps I can help with
- Add automated local dev workflow (`package.json`, `live-server`, formatting)
- Replace the `mailto:` contact with Formspree/EmailJS integration
- Add a simple script to sync the toggle styles across all stylesheets

If you want this README adjusted (shorter, more technical, or with deployment scripts), tell me which format you prefer and I'll update it.
