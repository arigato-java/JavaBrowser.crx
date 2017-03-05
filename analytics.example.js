const _GAAccount = 'UA-XXXXXXXX-X';

/**
 * Google Analytics のセットアップ
 * 
 * ref. https://developer.chrome.com/extensions/tut_analytics
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _GAAccount]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; 
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);
})();


/**
 * リンクのトラッキング(試験的な実装)
 */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.getElementsByTagName("a");
  for (const x of links) {
    x.addEventListener("click", e => {
      _gaq.push(['_trackEvent', 'Link', 'Clicked', x.textContent]);
    });
  }
});
