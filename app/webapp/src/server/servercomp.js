"use strict";

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.number.constructor");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _path = _interopRequireDefault(require("path"));

var _sqlite = _interopRequireDefault(require("sqlite"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);

var io = require('socket.io')(server);

var PORT = 8082;
var dbPromise = Promise.resolve().then(function () {
  return _sqlite["default"].open('../database.sqlite');
}).then(function (db) {
  return db.migrate({
    force: 'last'
  });
})["catch"](function (err) {
  return console.error(err);
});

var testdb =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var db, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dbPromise;

          case 2:
            db = _context.sent;
            _context.next = 5;
            return db.all('SELECT * FROM Projects;');

          case 5:
            res = _context.sent;
            console.info(res);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function testdb() {
    return _ref.apply(this, arguments);
  };
}();

testdb();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, '..', '..', 'public')));
app.get('/', function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, '..', '..', 'public/index.html'));
}); // API

app.post('/projects',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var db, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dbPromise;

          case 2:
            db = _context2.sent;
            _context2.next = 5;
            return db.all('SELECT * FROM Projects;');

          case 5:
            data = _context2.sent;
            res.json(data);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
app.post('/projects/stop',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, project, duration, data, db, name, _ref4;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, project = _req$body.project, duration = _req$body.duration;
            _context3.next = 3;
            return dbPromise;

          case 3:
            db = _context3.sent;

            if (!(typeof Number(project) !== 'number')) {
              _context3.next = 17;
              break;
            }

            _context3.prev = 5;
            _context3.next = 8;
            return db.get('SELECT * FROM Projects where name = ?;', project);

          case 8:
            _ref4 = _context3.sent;
            name = _ref4.name;
            duration = _ref4.duration;
            project = name;
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](5);
            res.json({
              error: _context3.t0
            });

          case 17:
            if (project) {
              _context3.next = 21;
              break;
            }

            res.json({
              error: 'no project'
            });
            _context3.next = 34;
            break;

          case 21:
            _context3.prev = 21;
            _context3.next = 24;
            return db.get('UPDATE Projects SET started = NULL, duration = $duration WHERE id = $id;', {
              $id: project,
              $duration: duration
            });

          case 24:
            _context3.next = 26;
            return db.get('SELECT * FROM Projects where id = ?;', project);

          case 26:
            data = _context3.sent;
            io.emit('stopProject', data);
            res.json({
              data: data
            });
            _context3.next = 34;
            break;

          case 31:
            _context3.prev = 31;
            _context3.t1 = _context3["catch"](21);
            res.json({
              error: _context3.t1
            });

          case 34:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 14], [21, 31]]);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}());
app.post('/projects/start',
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var project, data, db, started, _ref6, name;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            project = req.body.project;
            _context4.next = 3;
            return dbPromise;

          case 3:
            db = _context4.sent;
            started = Date.now();

            if (!(typeof Number(project) !== 'number')) {
              _context4.next = 17;
              break;
            }

            _context4.prev = 6;
            _context4.next = 9;
            return db.get('SELECT * FROM Projects where name = ?;', project);

          case 9:
            _ref6 = _context4.sent;
            name = _ref6.name;
            project = name;
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](6);
            res.json({
              error: _context4.t0
            });

          case 17:
            if (project) {
              _context4.next = 21;
              break;
            }

            res.json({
              error: 'no project'
            });
            _context4.next = 34;
            break;

          case 21:
            _context4.prev = 21;
            _context4.next = 24;
            return db.get('UPDATE Projects SET started = $started WHERE id = $id;', {
              $id: project,
              $started: started
            });

          case 24:
            _context4.next = 26;
            return db.get('SELECT * FROM Projects where id = ?;', project);

          case 26:
            data = _context4.sent;
            io.emit('startProject', data);
            res.json({
              data: data
            });
            _context4.next = 34;
            break;

          case 31:
            _context4.prev = 31;
            _context4.t1 = _context4["catch"](21);
            res.json({
              error: _context4.t1
            });

          case 34:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 14], [21, 31]]);
  }));

  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}());
app.post('/projects/add',
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var db, data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return dbPromise;

          case 3:
            db = _context5.sent;
            _context5.next = 6;
            return db.get('INSERT INTO Projects (name) VALUES (?);', req.body.name);

          case 6:
            _context5.next = 8;
            return db.get('SELECT * FROM Projects where name = ?;', req.body.name);

          case 8:
            data = _context5.sent;
            io.emit('addNewProject', data);
            res.json({
              data: data
            });
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            res.json({
              error: _context5.t0
            });

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));

  return function (_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}());
io.on('connection', function (socket) {
  console.log('new connection to server');
});
server.listen(PORT, function () {
  console.log('running');
});
