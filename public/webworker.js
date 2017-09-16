
self.addEventListener('message', function (e) {

    if (e.data.message === 'Start') {
        console.log('Start hasing!! pew pew!');
    }
}, false);
