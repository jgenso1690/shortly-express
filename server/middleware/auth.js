const models = require('../models');
const Promise = require('bluebird');
const utils = require('../lib/hashUtils');

module.exports.createSession = (req, res, next) => {
  //if there is no cookies, new users
  if (!req.hasOwnProperty('cookies') || !req.cookies.hasOwnProperty('shortlyid')) {
    return models.Sessions.create()
      .then((session) => {
        models.Sessions.get({id: session.insertId})
          .then((sess) => {
            return sess.hash;
          })
          .then((data) => {
            req.session = {
              hash: data
            };
            res.cookie('shortlyid', data);
            next();
          })
          .catch((err) => {
            console.log(err);
            next();
          });
      })
      .catch((err) => {
        console.log(err);
      });
    next();
  //else when there is a cookie, already users
  } else {
    var hash = req.cookies.shortlyid;
    models.Sessions.get({hash})
      .then((data) => {
        if (data) {
          req.session = {
            userId: data.id,
            hash: data.hash,
            user: data.user
          };
          next();
        } else {
          res.clearCookie('shortlyid');
          //create a new row in sessions table
          models.Sessions.create()
          //gives back an object 'session' with ID property
            .then((session) => {
              // grab id from the object to look inside sessions table
              models.Sessions.get({id: session.insertId})
              //gives back an obj of the row (id,hash,userid)
                .then((sess) => {
                  req.session = {
                    hash: sess.hash
                  };
                  res.cookie('shortlyid', sess.hash);
                  next();
                });
            });

        }
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.assignSession = (req, res, next) => {
  console.log(req);
  next();
};

