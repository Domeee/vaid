self.importScripts('crypto.js');
self.importScripts('miner.js');
self.addEventListener('message', function(e) {
  if (e.data.message === 'Start') {
    self.postMessage({ message: 'message from worker' });
    Mining.start(e.data.clientCount);
  } else if (e.data.message === 'Restart') {
    Mining.restart(e.data.nextBlockId, e.data.prevBlock, e.data.clientCount);
  }
}, false);