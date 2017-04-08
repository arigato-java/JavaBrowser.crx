"use strict";

(function() {
  const javaButton = {
    state: {
      nj: 0,
      java_sounds: []
    },

    init: function() {
      this.state.java_sounds = document.querySelectorAll(".javasound");
    }, 

    playJava: function() {
      this.state.java_sounds[this.state.nj].play();
      this.state.nj = (this.state.nj + 1) % this.state.java_sounds.length;
    },
  };


  javaButton.init();

  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.command == "playJavaVoice") {
        console.log("Java!!");
        javaButton.playJava();
      }
    }
  );

})();