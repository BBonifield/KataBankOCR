var fs = require('fs');
var _ = require('lodash');
var DigitRow = require('./digit_row');

var ROW_HEIGHT = 4;
var STATUS_ILLEGIBLE = 'ILL';
var STATUS_CHECKSUM_FAIL = 'ERR';

var AccountParser = function(filePath){
  var contents = fs.readFileSync(filePath, 'utf8');
  var textRows = _.chunk(contents.split("\n"), ROW_HEIGHT);

  textRows = textRows.slice(0, -1); // remove trailing erroneous line

  this.rows = _.map(textRows, function(textRow){
    return new DigitRow(textRow.slice(0, -1));
  });
};

_.extend(AccountParser.prototype, {
  accountNumbers: function(){
    return _.map(this.rows, function(row) {
      return row.parseDigits()
    });
  },

  process: function(){
    var self = this;
    _.each(this.accountNumbers(), function(accountNumber) {
      var status = self.validateAccountNumber(accountNumber);

      console.log(accountNumber + (status ? ' ' + status : ''));
    });
  },

  validateAccountNumber: function(number) {
    if (this.illegibleAccountNumber(number)) {
      return STATUS_ILLEGIBLE;
    } else if (this.checksumMatchFailed(number)) {
      return STATUS_CHECKSUM_FAIL;
    }
  },

  illegibleAccountNumber: function(number) {
    return number.match(/\?/);
  },

  checksumMatchFailed: function(number) {
    var checksum = 0,
        digits = number.split('');

    _.each(digits, function(digit, idx) {
      checksum = parseInt(digit) * (digits.length - idx);
    });

    return checksum % 11 !== 0;
  }
});

module.exports = AccountParser;
