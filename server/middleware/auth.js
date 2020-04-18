const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (!req.headers.cookies) {
    req.session = {
      hash: ''
    };
    next();
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

