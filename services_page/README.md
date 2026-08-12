# Services Page

A single-page services interface containing:

- IT
- ISO
- Contracting
- Training
- API

## Structure

```text
services_page/
├── index.html
├── css/
│   └── services.css
├── js/
│   └── services.js
└── assets/
```

## How it works

The top navigation is controlled by `services.js`.

Clicking a service:

1. Removes the `active` state from the other navigation items.
2. Adds the `active` state to the clicked service.
3. Hides the other service containers.
4. Shows the selected service container.
5. Scrolls back to the top.

The ISO section has its own independent JavaScript state. Clicking an ISO standard updates the ISO detail panel without changing the main service navigation.

## Adding ISO standards

Add a new sidebar button in `index.html` and add its matching object to `isoData` in `js/services.js`.

## Images

The demo currently uses Unsplash image URLs for the ISO hero images. Replace these with your own assets when the final site imagery is ready.

## Opening

No build system is required.

Open `index.html` directly in a browser.
