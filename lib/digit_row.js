var _ = require('lodash');

var DIGITS = {
  // http://macao.communications.museum/images/exhibits/2_18_6_3_eng.png
  // 'abcdefg': '#',
  '1111110': '0',
  '0110000': '1',
  '1101101': '2',
  '1111001': '3',
  '0110011': '4',
  '1011011': '5',
  '1011111': '6',
  '1110000': '7',
  '1111111': '8',
  '1111011': '9'
};

var DIGIT_WIDTH = 3;
var DIGIT_HEIGHT = 3;
var DIGIT_COUNT = 9;

var DigitRow = function(matrix){
  this.matrix = matrix;
};

_.extend(DigitRow.prototype, {
  parseDigits: function(){
    var self = this;

    return _.times(DIGIT_COUNT, function(digitIdx){
      var digitMatrix = _.times(DIGIT_HEIGHT, function(rowIdx){
        var start = digitIdx * DIGIT_WIDTH,
            end = start + DIGIT_WIDTH;
        return self.matrix[rowIdx].slice(start, end);
      });

      return self.matrixToDigit(digitMatrix);
    }).join('');
  },

  matrixToDigit: function(matrix){
    var binary = this.matrixToBinary(matrix);

    return DIGITS[binary] || '?';
  },

  matrixToBinary: function(matrix){
    var binary = [];

    binary.push( matrix[0][1] !== ' ' ? '1' : '0' ); // a
    binary.push( matrix[1][2] !== ' ' ? '1' : '0' ); // b
    binary.push( matrix[2][2] !== ' ' ? '1' : '0' ); // c
    binary.push( matrix[2][1] !== ' ' ? '1' : '0' ); // d
    binary.push( matrix[2][0] !== ' ' ? '1' : '0' ); // e
    binary.push( matrix[1][0] !== ' ' ? '1' : '0' ); // f
    binary.push( matrix[1][1] !== ' ' ? '1' : '0' ); // g

    return binary.join('');
  }
});

module.exports = DigitRow;
