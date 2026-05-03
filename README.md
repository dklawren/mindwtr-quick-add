# Mindwtr Quick Add

Firefox extension to add tasks to a [Mindwtr](https://mindwtr.com) inbox from the browser toolbar.

## Features

- **Add Task** — opens a textarea for manual quick-add input (pre-filled with any selected page text)
- **Add Website** — pre-fills the textarea with a markdown link `[Page Title](URL)` for the current tab
- Supports Mindwtr quick-add syntax: tags (`#foo`), contexts (`@foo`), due dates (`due:tomorrow`), etc.
- Bearer token authentication (required when server has `MINDWTR_API_TOKEN` set)

## Installation

No build step required.

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on** and select `manifest.json`

To reload after changes: click **Reload** on the extension entry in `about:debugging`.

## Permanent Installation (Developer Edition / Nightly only)

Regular Firefox enforces extension signing and cannot be bypassed. Firefox Developer Edition and Nightly allow unsigned installs via an `about:config` flag.

**1. Build the zip bundle**

From the repo root, zip all extension files (excluding git and build artifacts):

```bash
zip -r mindwtr-quick-add.zip manifest.json icons/ popup/ options/
```

**2. Allow unsigned extensions**

1. Open `about:config` in Firefox Developer Edition or Nightly
2. Search for `xpinstall.signatures.required`
3. Set it to `false`

**3. Install**

Drag `mindwtr-quick-add.zip` onto any Firefox tab, or use **File → Open File**. The extension will persist across restarts.

---

## Configuration

Click the gear icon in the popup to open settings:

- **API URL** — Mindwtr server base URL (default: `http://127.0.0.1:4317`)
- **API Token** — Bearer token. Required if `MINDWTR_API_TOKEN` is set on the server (typical for cloud-sync Docker instances).

## API

POSTs to `POST /tasks` with body `{ "input": "<quick-add string>" }`.

## Requirements

- Firefox 57+
- A running Mindwtr server
