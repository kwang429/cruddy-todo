const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => { // takes in a num and gives a padded num as a string
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0); // calls a func with 0
    } else {
      callback(null, Number(fileData)); // calls a func with the num from counter.txt
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count); // counterString equals a stringed num
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) { // if error arg exists, throw this error
      throw ('error writing counter');
    } else { // if err arg does NOT exist,
      callback(null, counterString); // call func with counterString
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => { // we want a string number
  readCounter((err, data) => {
    if (err) {
      console.log(err);
    }

    writeCounter(data + 1, (error, string) => {
      if (error) {
        console.log(error);
      } else {
        callback(null, string);
      }
    });
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
