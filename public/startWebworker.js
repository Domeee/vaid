  function renderSessions(sessions) {
    document.querySelector('#sessions').textContent = sessions;
  }
  document.addEventListener("DOMContentLoaded", function(event) {
    var socket = io();
    socket.on('up', function(count) {
      renderSessions(count);
    });
    socket.on('down', function(count) {
      renderSessions(count);
    });

    var worker;
    if (typeof(Worker) !== "undefined") {
        if (typeof(worker) === "undefined") {
            worker = new Worker("webworker.js");
        }
    } else {
        console.log("Sorry, your browser does not support Web Workers...");
    }

    worker.postMessage({message: "Start"});
  });

  //web worker
