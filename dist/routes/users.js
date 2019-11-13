"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/profile', function (req, res, next) {
  res.send('Bullshit for now');
});
router.post('/signup', function (req, res, next) {
  console.log(req);
  res.send('jwttoken123');
});
var _default = router;
exports["default"] = _default;