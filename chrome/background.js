
const blockedPage = chrome.runtime.getURL("blocked.html");

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return;

  const url = new URL(details.url);
  const hostname = url.hostname.toLowerCase();

  if (
    hostname === "informer.rs" ||
    hostname.endsWith(".informer.rs")
  ) {
    chrome.tabs.update(details.tabId, {
      url: blockedPage
    }).catch(console.error);
  }
});
