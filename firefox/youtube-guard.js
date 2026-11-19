(() => {
  if (window.top !== window) return;

  const BLOCKED_PAGE = browser.runtime.getURL('blocked.html');
  const HANDLES = new Set([
    '@informertelevizija',
    '@informerportal',
    '@informerinfo25'
  ]);
  const CHANNEL_IDS = new Set([
    'uck9s7xcozmyf5rfetwfccvq'
  ]);
  let redirecting = false;

  function isBlockedYouTubeUrl(address) {
    let url;
    try { url = new URL(address, window.location.href); }
    catch { return false; }
    const host = url.hostname.toLowerCase();
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
    if (host !== 'youtube.com' && !host.endsWith('.youtube.com')) return false;
    let path;
    try { path = decodeURIComponent(url.pathname).toLowerCase().split('/').filter(Boolean); }
    catch { return false; }
    if (HANDLES.has(path[0])) return true;
    return path[0] === 'channel' && CHANNEL_IDS.has(path[1]);
  }

  function redirect() {
    if (redirecting) return;
    redirecting = true;
    window.location.replace(BLOCKED_PAGE);
  }

  function checkCurrentUrl() {
    if (isBlockedYouTubeUrl(window.location.href)) redirect();
  }

  document.addEventListener('click', (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const anchor = event.composedPath().find((node) =>
      node instanceof HTMLAnchorElement && node.href
    );
    if (!anchor || !isBlockedYouTubeUrl(anchor.href)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    redirect();
  }, true);

  document.addEventListener('yt-navigate-finish', checkCurrentUrl, true);
  window.addEventListener('popstate', checkCurrentUrl);
  window.addEventListener('pageshow', checkCurrentUrl);
  checkCurrentUrl();
})();
