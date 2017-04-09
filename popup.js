"use strict";

(function() {
  // ボタンに流すテキスト群
  const marqueeText = [
    "【PR】 あなたとジャバ, 今すぐダウンロー",
    "ド",
    "【PR】 無料ジャバのダウンロード",
    "【PR】 30億のデバイスで走る",
    "【PR】 同意して無料ダウンロードを開始",
  ];

  // テキスト間に挟む空白
  const marqueeWhitespace = "　".repeat(25);


  // Open links in newTab
  document.addEventListener("DOMContentLoaded", () => {
    enableLinks();
    enableJavaButtons();
    javaButtonize();
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


  /**
   * ドキュメント内の主要なリンクをジャバボにする。
   */
  function javaButtonize() {
    const links = document.querySelectorAll(".links a, .cloud a");
    for (const x of links) {
      x.classList.add("redjavabo");
    }
  }


  // ジャバボタンを有効化
  function enableJavaButtons() {
    const javabos = document.querySelectorAll(".redjavabo");
    for (const x of javabos) {
      x.addEventListener("click", () => {
        chrome.runtime.sendMessage(
          {command: "playJavaVoice" }
        );
      });
    }

    // 内容の構築
    const marquee = document.querySelector(".redjavabo marquee");
    marquee.textContent = marqueeText
      .map(x => x + marqueeWhitespace)
      .join("");
    
  }

})();
