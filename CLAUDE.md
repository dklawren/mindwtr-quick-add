# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Loading and Testing

No build step. Load directly in Firefox:

1. Go to `about:debugging#/runtime/this-firefox`
2. **Load Temporary Add-on** → select `manifest.json`
3. After any JS/HTML/CSS change: click **Reload** on the extension entry in `about:debugging`

To test the popup without a real Mindwtr server, set API URL to a local endpoint (e.g. `http://127.0.0.1:4317`) and watch Network tab in the browser toolbox (`about:debugging` → Inspect).

Open browser toolbox for popup: right-click toolbar button → **Inspect Popup**.

## Architecture

Manifest V2 (Firefox prefers MV2; MV3 support still incomplete).

**Two entry points, no background script:**

- `popup/popup.js` — runs in extension context when toolbar button clicked. Uses `browser.tabs.query` to get active tab title/URL, `browser.tabs.executeScript` to extract selected text from page content, then POSTs to Mindwtr API.
- `options/options.js` — reads/writes `browser.storage.local` for `apiUrl` and `apiToken`.

**Selected text flow:** `popup.js` cannot access page DOM directly (different origin). It injects a one-liner via `tabs.executeScript` to call `window.getSelection().toString()` in the page context and returns the result.

**API integration:** POST `/tasks` with `{"input": "<title>\n<notes+url>"}`. The Mindwtr quick-add parser derives tags, contexts, due dates etc. from the `input` string. Auth is `Authorization: Bearer <token>` if token is set.

## Mindwtr API

Default: `http://127.0.0.1:4317`. Auth optional via `MINDWTR_API_TOKEN` env var on server side.

Relevant endpoint: `POST /tasks` — body `{ "input": string }`. The `input` field goes through quick-add parsing (tags `#foo`, contexts `@foo`, `due:tomorrow`, etc.).
