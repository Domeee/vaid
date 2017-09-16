
self.addEventListener('message', function (e) {

    if (e.data.message === 'Start') {
        console.log('Start hasing!! pew pew!');
        self.postMessage({message: 'message from worker'});
    }
}, false);
