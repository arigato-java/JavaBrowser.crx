// Open links in newTab
document.addEventListener('DOMContentLoaded', () => {
  enableLinks();
});

/**
 * ドキュメント内の `<a href="foo">bar</a>` のリンクが動くようにする。
 */
function enableLinks() {
  const links = document.getElementsByTagName("a");
  for (const x of links) {
    x.addEventListener("click", () => {
      chrome.tabs.create({active: true, url: x.href});
    });
  } 
}