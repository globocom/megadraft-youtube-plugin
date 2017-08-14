"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _default = function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        _extends({}, this.props, { width: "24", height: "24", viewBox: "0 0 24 24" }),
        _react2.default.createElement(
          "g",
          { fill: "none", fillRule: "evenodd", transform: "translate(6.923077, 4.538462)" },
          _react2.default.createElement("path", { fill: "currentColor", d: "M5.50005518,0.29332192 C2.46240982,0.29332192 1.50990331e-14,2.75573175 1.50990331e-14,5.79326674 C1.50990331e-14,5.89822625 0.00364212829,6.00252356 0.00938123953,6.10593793 L1.50990331e-14,6.10593793 L1.50990331e-14,15.008955 L2.64297109,11.3404489 L2.64142595,10.49095 C2.64164668,10.4911708 2.64186742,10.4912811 2.64208815,10.4913915 L2.64208815,6.04302844 C2.63524537,5.96234978 2.63094103,5.88089855 2.63094103,5.79834364 C2.63094103,5.71600947 2.63524537,5.63455824 2.64208815,5.55387958 L2.64208815,5.54681606 L2.64263999,5.54681606 C2.77022485,4.0802524 4.00049164,2.92933986 5.50016555,2.92933986 C7.08449136,2.92933986 8.36905897,4.21401784 8.36905897,5.79834364 C8.36905897,7.38289018 7.08449136,8.66745779 5.50016555,8.66745779 C5.2097886,8.66745779 4.93033803,8.62275895 4.66622854,8.54241139 L3.18531711,10.7779056 C3.88935154,11.1060282 4.67207802,11.2932116 5.50016555,11.2932116 C8.53759018,11.2932116 11,8.83080173 11,5.79326674 C11,2.75573175 8.53747981,0.29332192 5.50005518,0.29332192 Z", id: "Shape" })
        )
      );
    }
  }]);

  return _default;
}(_react2.default.Component);

exports.default = _default;