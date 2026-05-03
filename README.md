# Mindwtr Quick Add

Firefox extension to add tasks to a [Mindwtr](https://mindwtr.com) inbox from the browser toolbar.

## Features

- **Add Task** — opens a textarea for manual quick-add input (pre-filled with any selected page text)
- **Add Website** — pre-fills the textarea with a markdown link `[Page Title](URL)` for the current tab
- Supports Mindwtr quick-add syntax: tags (`#foo`), contexts (`@foo`), due dates (`due:tomorrow`), etc.
- Optional Bearer token authentication

## Installation

No build step required.

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on** and select `manifest.json`

To reload after changes: click **Reload** on the extension entry in `about:debugging`.

## Configuration

Click the gear icon in the popup to open settings:

- **API URL** — Mindwtr server base URL (default: `http://127.0.0.1:4317`)
- **API Token** — optional Bearer token (matches `MINDWTR_API_TOKEN` on the server)

## API

POSTs to `POST /tasks` with body `{ "input": "<quick-add string>" }`.

## Requirements

- Firefox 57+
- A running Mindwtr server
