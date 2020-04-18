const parseCookies = (req, res, next) => {
  var cookie = req.headers.cookie;
  var parse = '';
  if (cookie) {
    if (cookie.includes(';')) {
      parse = cookie.split('; ');
      for (var i = 0; i < parse.length; i++) {
        var split = parse[i].split('=');
        var key = split[0];
        var value = split[1];
        req.cookies[key] = value;
      }
      next();
    } else {
      parse = cookie.split('=');
      var key = parse[0];
      var value = parse[1];
      req.cookies[key] = value;
      next();
    }
  } else {
    next();
  }
};

module.exports = parseCookies;