"use strict";

async function init() {
  const { apiUrl, apiToken } = await browser.storage.local.get(["apiUrl", "apiToken"]);
  if (apiUrl) document.getElementById("api-url").value = apiUrl;
  if (apiToken) document.getElementById("api-token").value = apiToken;
}

document.getElementById("options-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const apiUrl = document.getElementById("api-url").value.trim().replace(/\/$/, "");
  const apiToken = document.getElementById("api-token").value.trim();

  await browser.storage.local.set({ apiUrl, apiToken });

  const status = document.getElementById("save-status");
  status.classList.remove("hidden");
  setTimeout(() => status.classList.add("hidden"), 2000);
});

init();
