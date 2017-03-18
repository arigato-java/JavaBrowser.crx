"use strict";

(function() {
  document.addEventListener("DOMContentLoaded", () => {  
    updateKakugen();
  });


  /**
   *  表示時にジャバ格言をセット
   */
  function updateKakugen() {
    const API_URI = "https://arigato-java.download/kakugen.json";
    
    // ブラウザのキャッシュを期待して、実直に GET しにいく
    fetch(API_URI)
    .then(extractJSON)
    .then(pickRandomly)
    .catch(err => {
      console.error("API Error: ", err);
      return {
        t: "ジャバ.lang.NullPointerException\n" + 
          "at ジャバ人間ブラウザ.main(...)" 
      };
    })
    .then(showKakugen);
  }


  /**
   * オブジェクトからランダムに一つ採取する
   * [a] -> a
   * @param {Object or Array} items
   * @returns {item}
   */
  function pickRandomly(items) {
    return items[Math.floor(Math.random() * items.length)];
  }


  /**
   * JSON を取得する
   * @param {Response} res
   * @returns {JSON}
   */
  function extractJSON(res) {
    console.log("API response: ", res); 
    return res.json();
  }


  /**
   * 格言を表示する
   * 
   * @param {{t: String, u: null|String }} j - 一格言のJSON形式
   * @returns {JSON} - j をそのまま返す
   */
  function showKakugen(j) {
    console.log("JSOK(JavaScript Object Kakugen):", j);

    // 格言内容を表示
    const txt = document.getElementById("kakugen-txt");
    if (j.t) {
      txt.textContent = j.t;
    } else {
      txt.textContent = "(null)";
    }

    // フォントサイズを調整
    refineFontSize(document.getElementById("kakugen"), j.t);
    
    // テキストの改行を反映
    txt.innerHTML = txt.innerText.replace(/\n/ug, "<br>");


    // 引用元を表示
    const ref = document.getElementById("kakugen-ref");
    // URLぽいものだけを引用元に入れる(JSなど入れないように)
    if (j.u && isHttpLink(j.u)) {
      ref.href = j.u;
      ref.hidden = false;
    } else {
      ref.hidden = true;
    }

    document.getElementById("kakugen").hidden = false;

    return j;
  }


  /**
   * おもしろくないリンクをはじく
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
   * フォントサイズをテキストに合わせて調整する
   * サイズに合わせた CSS の class を設定している。
   * 
   * @param {Element} node - Target Element
   * @param {string} msg - Message
   */
  function refineFontSize(node, msg) {
    const len = Array.of(...msg).length;

    // 長さごとの CSS class を定義
    const xs = [
      {len: 130,  clsName: "small"},
      {len: 80,   clsName: "ltl-small"},
      {len: 30,   clsName: "normal"},
      {len: 0,    clsName: "large"}
    ];

    xs.map(x => x.clsName)
      .forEach(x => node.classList.remove(x));
    
    for (let x of xs) {
      if (x.len < len) {
        node.classList.add(x.clsName); 
        break;
      }
    }
  }

})();
