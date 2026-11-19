const formerSocialBlockedPage = browser.runtime.getURL("blocked.html");

function formerIsBlockedSocialURL(address) {
  let url;
  try {
    url = new URL(address);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  const host = url.hostname.toLowerCase().replace(/^(www|m|mobile)\./, "");

  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname).toLowerCase();
  } catch {
    return false;
  }
  const [account = "", id = ""] = pathname.split("/").filter(Boolean);

  switch (host) {
    case "instagram.com":
      return ["informernovine", "hit_informer"].includes(account);
    case "tiktok.com":
      return ["@informertelevizija", "@informerportal"].includes(account);
    case "facebook.com":
      return ["informer.rs", "informernovine"].includes(account);
    case "x.com":
    case "twitter.com":
      return account === "informernovine";
    case "youtube.com":
  return [
    "@informertelevizija",
    "@informerportal",
    "@informerinfo25"
  ].includes(account) ||
    (account === "channel" && id === "uck9s7xcozmyf5rfetwfccvq");


    default:
      return false;
  }
}

function formerCheckSocialNavigation(details) {
  if (details.frameId !== 0 || details.tabId < 0) return;
  if (!formerIsBlockedSocialURL(details.url)) return;
  browser.tabs.update(details.tabId, { url: formerSocialBlockedPage })
    .catch(error => console.error("Former social blocker:", error));
}

browser.webNavigation.onBeforeNavigate.addListener(formerCheckSocialNavigation);
browser.webNavigation.onHistoryStateUpdated.addListener(formerCheckSocialNavigation);
