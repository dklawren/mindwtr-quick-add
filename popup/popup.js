"use strict";

async function getSelectedText(tabId) {
  try {
    const results = await browser.tabs.executeScript(tabId, {
      code: "window.getSelection().toString();"
    });
    return (results && results[0]) ? results[0].trim() : "";
  } catch {
    return "";
  }
}

function showInputSection(prefill) {
  document.getElementById("choice-row").classList.add("hidden");
  document.getElementById("input-section").classList.remove("hidden");
  const textarea = document.getElementById("task-input");
  textarea.value = prefill;
  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
}

async function init() {
  const { apiUrl, apiToken } = await browser.storage.local.get(["apiUrl", "apiToken"]);

  if (!apiUrl) {
    document.getElementById("config-warning").classList.remove("hidden");
  }

  const openOptions = (e) => { e.preventDefault(); browser.runtime.openOptionsPage(); };
  document.getElementById("open-options").addEventListener("click", openOptions);
  document.getElementById("btn-options").addEventListener("click", openOptions);

  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const selectedText = await getSelectedText(tab.id);

  document.getElementById("btn-add-task").addEventListener("click", () => {
    showInputSection(selectedText);
  });

  document.getElementById("btn-add-website").addEventListener("click", () => {
    const title = tab.title || tab.url || "";
    const url = tab.url || "";
    const prefill = url ? `${title}\n${url}` : title;
    showInputSection(prefill);
  });

  document.getElementById("submit-btn").addEventListener("click", () => {
    submitTask({ apiUrl, apiToken });
  });
}

async function submitTask({ apiUrl, apiToken }) {
  const btn = document.getElementById("submit-btn");
  const statusEl = document.getElementById("status");

  const input = document.getElementById("task-input").value.trim();
  if (!input) return;

  btn.disabled = true;
  statusEl.className = "status hidden";

  try {
    const headers = { "Content-Type": "application/json" };
    if (apiToken) headers["Authorization"] = `Bearer ${apiToken}`;

    const response = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers,
      body: JSON.stringify({ input })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status}: ${text}`);
    }

    statusEl.textContent = "Added to inbox.";
    statusEl.className = "status success";
    setTimeout(() => window.close(), 1200);
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
    statusEl.className = "status error";
    btn.disabled = false;
  }
}

init();
