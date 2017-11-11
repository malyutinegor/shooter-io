// Generated by CoffeeScript 1.12.5
var Eureca, app, bannedIPs, compareIP, eurecaServer, express, favicon, game, i, ips, out, port, server;

ips = require('ip');

require('colors');

process.stdin.on('data', function(data) {
  if (data.toString() === "\u0003") {
    return out.exit();
  }
});

express = require('express');

favicon = require('serve-favicon');

app = express(app);

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(express["static"](__dirname + "/public"));

app.set('views', __dirname + '/views');

compareIP = function(ip1, ip2) {
  return ips.isEqual(ip1 + "", ip2 + "");
};

server = require('http').createServer(app);

Eureca = require('eureca.io');

eurecaServer = new Eureca.Server({
  allow: ['playerUpdated', 'playerRemoved', 'serverClosed', 'serverOpened']
});

eurecaServer.attach(server);

i = 0;

bannedIPs = ['192.168.1.108'];

app.get('/', function(req, res, next) {
  var banned;
  banned = (function() {
    var ip, j, len;
    for (j = 0, len = bannedIPs.length; j < len; j++) {
      ip = bannedIPs[j];
      if (compareIP(req.ip, ip)) {
        return true;
      }
    }
    return false;
  })();
  if (!banned) {
    return res.render('index.html');
  }
});

app.get('/*', function(req, res, next) {
  return res.redirect('/');
});

port = process.env.PORT || 5000;

server.listen(port);

out = require('./scripts/out.js')(eurecaServer);

game = require('./scripts/main.js')(eurecaServer, out);

out.promo('SHOOTER.IO');

out.welcome('Welcome in SHOOTER.IO server!');

out.message('Listening on ' + ('http://localhost:' + port).blue + '!');

out.getAdminToken();

out.welcome('Type "help" for view list of avaliable commands.');

out.welcome('You can press "Ctrl+C" or type "exit" for stop server and exit from server\'s CLI.');

out.cli();
