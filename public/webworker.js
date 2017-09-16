self.importScripts('crypto.js');
// self.importScripts('jquery.min.js');
self.addEventListener('message', function (e) {
  if (e.data.message === 'Start') {
    console.log('Start hasing!! pew pew!');
    Mining.start();
  }
}, false);

// Blockchain implementation
var difficulty = 4;        // number of zeros required at front of hash
var maximumNonce = 500000; // limit the nonce to this so we don't mine too long

// NOTE: Because there are 16 possible characters in a hex value, each time you incrament
// the difficulty by one you make the puzzle 16 times harder. In my testing, a difficulty
// of 6 requires a maximumNonce well over 500,000,000.

/////////////////////////
// global variable setup
/////////////////////////
var pattern = '';
for (var x=0; x<difficulty; x++) {
  pattern += '0';
}

/////////////////////////
// functions
/////////////////////////
function sha256(block) {
  // calculate a SHA256 hash of the contents of the block
  return CryptoJS.SHA256(block).toString();
}

function updateState(block, chain) {
  console.log(block);
  // set the well background red or green for this block
  // if ($('#block'+block+'chain'+chain+'hash').val().substr(0, difficulty) === pattern) {
  //   $('#block'+block+'chain'+chain+'well').removeClass('well-error').addClass('well-success');
  // }
  // else {
  //   $('#block'+block+'chain'+chain+'well').removeClass('well-success').addClass('well-error');
  // }
}

function updateHash(block, chain) {
  // update the SHA256 hash value for this block
  $('#block'+block+'chain'+chain+'hash').val(sha256(block, chain));
  updateState(block, chain);
}

function updateChain(block, chain) {
  // update all blocks walking the chain from this block to the end
  for (var x = block; x <= 5; x++) {
    if (x > 1) {
      $('#block'+x+'chain'+chain+'previous').val($('#block'+(x-1).toString()+'chain'+chain+'hash').val());
    }
    updateHash(x, chain);
  }
}

function mine(blockId, previousHash, data) {
  for (var x = 0; x <= maximumNonce; x++) {
    var block = blockId + x + data + previousHash;
    var computedBlock = sha256(block);
    if (computedBlock.substr(0, difficulty) === pattern) {
      console.log(x)
      updateState(computedBlock);
      break;
    }
  }
}

var Mining = {
  start: function () {
    mine(1, '0000000000000000000000000000000000000000000000000000000000000000', 'fooBar');
  }
};
