document.addEventListener('DOMContentLoaded', () => {  
  updateKakugen();
});


function updateKakugen() {
  // 表示時にジャバ格言をセット
  //
  // ref. ありジャバAPI https://arigato-java.download/api.html
  //
  // ex.
  // 
  //  > curl -H "Content-Type: application/json" -X POST -d '{"topic":"0"}' \
  //    https://ue4higkk44.execute-api.us-west-2.amazonaws.com/prod/kakugen
  //  
  const API_URI = "https://ue4higkk44.execute-api.us-west-2.amazonaws.com/prod/kakugen";
  
  fetch(API_URI, {
    method: "POST",
    body: '{"topic":"0"}'
  })
  .then(res => res.json())
  .then(j => {
    console.log(j);

    // 格言内容を表示
    const txt = document.getElementById("kakugen-txt");
    if (j.kakugen) {
      txt.textContent = j.kakugen;
    } else {
      txt.textContent = "(null)";
    }

    // 長さに応じてフォントサイズを調整
    refineFontSize(
      document.getElementById("kakugen"), 
      j.kakugen);


    // 引用元を表示
    const ref = document.getElementById("kakugen-ref");
    // URLぽいものだけを引用元に入れる(JSなど入れないように)
    if (j.url && isHttpLink(j.url)) {
      ref.href = j.url;
      ref.hidden = false;
    } else {
      ref.hidden = true;
    }

    document.getElementById("kakugen").hidden = false;
  });  
}


/**
 * おもしろくないリンクをはじくための関数
 * 
 * @param {string} url
 * @returns {boolean} 
 */
function isHttpLink(url) {
  const u = new URL(url);
  return (u.host != "") &&
         (u.origin != "null") &&
         (u.protocol == "http:" || u.protocol == "https:");
}

/**
 * 
 * @param {Element} node - Target Element
 * @param {string} msg - Message
 */
function refineFontSize(node, msg) {
  const len = Array.of(...msg).length;

  const xs = [
    {len: 130,  clsName: "small"},
    {len: 80,   clsName: "ltl-small"},
    {len: 30,   clsName: "normal"},
    {len: 0,    clsName: "large"}
  ];

  xs.map(x => x.clsName)
    .forEach(x => node.classList.remove(x));
  
  for (x of xs) {
    if (x.len < len) {
      node.classList.add(x.clsName); 
      break;
    }
  }
}
