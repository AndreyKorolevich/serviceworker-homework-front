import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.starts-with";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/web.url";
import "regenerator-runtime/runtime";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var version = 'v2';
var cacheName = "ahj-".concat(version);
var files = ['/', '/main.css', '/main.js'];

function putFilesToCache(_x) {
  return _putFilesToCache.apply(this, arguments);
}

function _putFilesToCache() {
  _putFilesToCache = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(file) {
    var cache;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return caches.open(cacheName);

          case 2:
            cache = _context4.sent;
            _context4.next = 5;
            return cache.addAll(file);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _putFilesToCache.apply(this, arguments);
}

function removeOldCache(_x2) {
  return _removeOldCache.apply(this, arguments);
}

function _removeOldCache() {
  _removeOldCache = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(retain) {
    var keys;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return caches.keys();

          case 2:
            keys = _context5.sent;
            return _context5.abrupt("return", Promise.all(keys.filter(function (key) {
              return !retain.includes(key);
            }).map(function (key) {
              return caches.delete(key);
            })));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _removeOldCache.apply(this, arguments);
}

self.addEventListener('install', function (evt) {
  console.log(evt);
  evt.waitUntil(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return putFilesToCache(files);

          case 2:
            _context.next = 4;
            return self.skipWaiting();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))());
});
self.addEventListener('activate', function (evt) {
  console.log(evt);
  evt.waitUntil(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return removeOldCache([cacheName]);

          case 2:
            _context2.next = 4;
            return self.clients.claim();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))());
});
self.addEventListener('fetch', function (evt) {
  var requestUrl = new URL(evt.request.url);

  if (requestUrl.pathname.startsWith('/news')) {
    return;
  }

  evt.respondWith(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var cache, response, cachedResponse;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return caches.open(cacheName);

          case 2:
            cache = _context3.sent;
            _context3.prev = 3;
            _context3.next = 6;
            return fetch(evt.request);

          case 6:
            response = _context3.sent;
            if (response.ok) evt.waitUntil(cache.put(evt.request, response.clone()));
            return _context3.abrupt("return", response);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](3);
            _context3.next = 15;
            return cache.match(evt.request);

          case 15:
            cachedResponse = _context3.sent;

            if (!cachedResponse) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", cachedResponse);

          case 18:
            throw new Error(_context3.t0.message);

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 11]]);
  }))());
});