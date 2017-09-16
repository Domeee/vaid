self.importScripts('crypto.js');
self.importScripts('miner.js');
self.addEventListener('message', function(e) {
  if (e.data.message === 'Start') {
    console.log('Start hasing!! pew pew!');
    self.postMessage({ message: 'message from worker' });
    Mining.start();
  } else if (e.data.message === 'Restart') {
    Mining.restart(e.data.nextBlockId, e.data.computedBlock);
  }
}, false);