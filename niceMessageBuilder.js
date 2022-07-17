const { niceMessages } = require('./nice-messages.json');

module.exports.createNiceMessage = function (author) {
    var randomMessage = niceMessages[Math.floor(Math.random() * niceMessages.length)];
    return `${author}` + ' ' + randomMessage;
}