module.exports = function (options, imports, register) {
  var logger = imports.logger.getLogger('Landing');

  var waveletApp = imports.waveletApp;
  var express = imports.express;
  var ejs = imports.ejs;

  waveletApp.use(_root + '/', express.static(__dirname + '/../../public'));

  register(null, {}); // provide nothing
};
