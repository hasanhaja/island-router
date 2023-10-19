console.log("Router");

let currentPathname = window.location.pathname;

async function navigate(pathname) {
  currentPathname = pathname;
  // Fetch HTML for the route we're navigating to.
  const response = await fetch(pathname);
  const html = await response.text();

  if (pathname === currentPathname) {
    // Get the part of HTML inside the <body> tag.
    const bodyStartIndex = html.indexOf("<body>") + "<body>".length;
    const bodyEndIndex = html.lastIndexOf("</body>");
    const bodyHTML = html.slice(bodyStartIndex, bodyEndIndex);

    const currentTimer = document.querySelector("x-timer").cloneNode();
    const temp = document.querySelector("#temp");
    temp.appendChild(currentTimer);

    // document.body.innerHTML = bodyHTML;

    // const newTimer = document.querySelector("x-timer");
    // const newParent = document.querySelector("main");
    // newParent.replaceChild(currentTimer, newTimer);

    // const currentTimerStartIndex = currentBody.indexOf("<x-timer>");
    // const currentTimerEndIndex = currentBody.indexOf("</x-timer>") + "</x-timer>".length;

    // console.log(currentBody.slice(0, currentTimerStartIndex));
    // console.log(currentBody.slice(currentTimerEndIndex));
    // 
    // const targetTimerStartIndex = currentBody.indexOf("<x-timer>");
    // const targetTimerEndIndex = currentBody.indexOf("</x-timer>") + "</x-timer>".length;

    // Replace the content on the page.
  }
}

window.addEventListener("click", (e) => {
  // Only listen to link clicks.
  if (e.target.tagName !== "A") {
    return;
  }
  // Ignore "open in a new tab".
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  // Ignore external URLs.
  const href = e.target.getAttribute("href");
  if (!href.startsWith("/")) {
    return;
  }
  // Prevent the browser from reloading the page but update the URL.
  e.preventDefault();
  window.history.pushState(null, null, href);
  // Call our custom logic.
  navigate(href);
}, true);

window.addEventListener("popstate", () => {
  // When the user presses Back/Forward, call our custom logic too.
  navigate(window.location.pathname);
});
