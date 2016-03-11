function Clock () {
  var currentTime = new Date();
  this.hour = currentTime.getHours();
  this.minute = currentTime.getMinutes();
  this.second = currentTime.getSeconds();
  this.printTime();
  setInterval(this._tick.bind(this), 1000);
}

Clock.prototype.printTime = function () {
  var timeString = this.hour + ":" + this.minute + ":" + this.second;
  console.log(timeString);
};

Clock.prototype._tick = function () {
  this.second += 1;
  this.printTime();
};

var readline = require("readline");
var reader = readline.createInterface(process.stdin, process.stdout, null);

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Input a number", function(inputNum) {
      inputNum = parseInt(inputNum);
      sum += inputNum;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    completionCallback(sum);
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {

  function askIfGreaterThan(el1, el2, callback) {
    reader.question("Is " + el1 + " greater than " + el2 + "?",
      function (response) {
        if (response === "yes") {
          callback(true);
        } else {
          callback(false);
        }
      }
    );
  }

  function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop){
    if (i < arr.length - 1) {
      askIfGreaterThan(arr[i], arr[i + 1], function (isGreaterThan){
        if (isGreaterThan === true){
          var tmp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = tmp;
          madeAnySwaps = true;
        }
        innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
      });
    } else {
      outerBubbleSortLoop(madeAnySwaps);
    }
  }

  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps === true) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  outerBubbleSortLoop(true);

}

absurdBubbleSort([4, 3, 2], function (returnArr) {
  console.log(returnArr);
  reader.close();
});
