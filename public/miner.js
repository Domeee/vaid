// Blockchain implementation
var difficulty = 4;        // number of zeros required at front of hash
var maximumNonce = 500000; // limit the nonce to this so we don't mine too long

// NOTE: Because there are 16 possible characters in a hex value, each time you increment
// the difficulty by one you make the puzzle 16 times harder. In my testing, a difficulty
// of 6 requires a maximumNonce well over 500,000,000.

var pattern = '';
for (var x = 0; x < difficulty; x++) {
  pattern += '0';
}

function sha256(block) {
  // calculate a SHA256 hash of the contents of the block
  return CryptoJS.SHA256(block).toString();
}

function updateState(block, blockId, performance, computedBlock) {
  console.log(block);
  console.log('block ' + block + ' blockId' + blockId);
  self.postMessage({ block: block, blockId: blockId, performance: performance, computedBlock });
}

function updateHash(block, chain) {
  // update the SHA256 hash value for this block
  $('#block' + block + 'chain' + chain + 'hash').val(sha256(block, chain));
}

function mine(blockId, previousHash, data, clientCount) {
  var start = new Date().getTime();

  // optimization through randomization
  var step = maximumNonce / clientCount;
  var rnd = getRandomInt(1, clientCount);
  var upperLimit = step * rnd;
  var lowerLimit = upperLimit - step;

  for (var z = lowerLimit; z <= upperLimit; z++) {
    // console.log('z: ' + z + ', lowerLimit: ' + lowerLimit + ', upperLimit' + upperLimit);
    var block = blockId + z + data + previousHash;
    var computedBlock = sha256(block);
    if (computedBlock.substr(0, difficulty) === pattern) {
      // console.log(z)
      var end = new Date().getTime();
      var elapsedTime = (end - start);
      let performance = z / elapsedTime * 1000;
      updateState(block, blockId + 1, performance, computedBlock);
      break;
    }
  }
}

function restartMining(blockId, previousHash, data, clientCount) {
  mine(blockId, previousHash, data, clientCount);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var Mining = {
  start: function(clientCount) {
    mine(1, '0000000000000000000000000000000000000000000000000000000000000000', 'fooBar', clientCount);
  },
  restart: function(nextBlockId, computedBlock, clientCount) {
    restartMining(nextBlockId, computedBlock, 'fooBar', clientCount);
  }
};
