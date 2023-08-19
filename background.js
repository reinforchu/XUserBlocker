function StreamChecker(details) {
  const filter = browser.webRequest.filterResponseData(details.requestId);
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();

  filter.ondata = (event) => {
    let str = decoder.decode(event.data, { stream: true });
    str = str.replaceAll(/178685274/gi, "783214"); // Debug
    filter.write(encoder.encode(str));
  };

  filter.onstop = (event) => {
    filter.close();
  };
}

browser.webRequest.onBeforeRequest.addListener(
  StreamChecker,
  {urls: ["*://twitter.com/*"], types: ["xmlhttprequest"]},
  ["blocking"]
);