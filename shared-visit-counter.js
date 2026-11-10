/* Shared page-view counter for every IJT GitHub Pages document. */
(() => {
  "use strict";
  if (window.top !== window.self || location.hostname !== "ijtaneja.github.io" ||
      window.__ijtSharedVisitCounter) return;
  window.__ijtSharedVisitCounter = true;

  const showCounter = () => {
    if (!document.body || document.getElementById("ijt-shared-visit-counter")) return;
    const host = document.createElement("div");
    host.id = "ijt-shared-visit-counter";
    host.style.cssText = "display:block!important;position:relative!important;clear:both!important;width:auto!important;max-width:720px!important;margin:28px auto!important;padding:0 18px!important;box-sizing:border-box!important;";
    const root = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = ":host{color-scheme:light}section{box-sizing:border-box;text-align:center;padding:20px 22px;border:1px solid #94adbd;border-left:5px solid #b78a30;border-radius:14px;background:linear-gradient(125deg,#a4bdcd,#d6e1e7 65%,#eee3d3);box-shadow:inset 3px 3px 8px #46657e38,inset -3px -3px 8px #ffffffb3;font-family:'Gill Sans','Trebuchet MS',sans-serif;color:#193d53}p{margin:0 0 12px;font-size:18px;font-weight:600;line-height:1.4}a{display:inline-block;line-height:0}img{display:block;max-width:100%;height:28px;width:auto;border:0}.status{font-size:14px;font-weight:400;margin:0}";
    const section = document.createElement("section");
    section.setAttribute("aria-label", "Shared site visit counter");
    const label = document.createElement("p");
    label.textContent = "Total visits across all pages";
    const link = document.createElement("a");
    link.href = "https://hits.sh/ijtaneja.github.io/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "View total page visits and statistics");
    const badge = document.createElement("img");
    badge.alt = "Total visits across all pages";
    badge.loading = "eager";
    badge.referrerPolicy = "no-referrer";
    const url = new URL("https://hits.sh/ijtaneja.github.io.svg");
    url.searchParams.set("label", "Visits");
    url.searchParams.set("style", "for-the-badge");
    url.searchParams.set("color", "355f7a");
    url.searchParams.set("labelColor", "79582c");
    // The shared path identifies the total. This parameter avoids a cached image
    // being reused when another page is opened or the visitor refreshes.
    url.searchParams.set("visit", Date.now() + "-" + Math.random().toString(36).slice(2));
    badge.onerror = () => {
      const status = document.createElement("p");
      status.className = "status";
      status.textContent = "Visit counter temporarily unavailable";
      link.replaceWith(status);
    };
    link.appendChild(badge);
    section.append(label, link);
    root.append(style, section);
    document.body.appendChild(host);
    badge.src = url.href;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showCounter, { once: true });
  } else {
    showCounter();
  }
})();
