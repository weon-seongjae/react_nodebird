webpackHotUpdate("static\\development\\pages\\hashtag.js",{

/***/ "./pages/hashtag.js":
/*!**************************!*\
  !*** ./pages/hashtag.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers/post */ "./reducers/post.js");
/* harmony import */ var _components_PostCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PostCard */ "./components/PostCard.js");








var Hashtag = function Hashtag(_ref) {
  var tag = _ref.tag;
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(function (state) {
    return state.post;
  }),
      mainPosts = _useSelector.mainPosts,
      hasMorePost = _useSelector.hasMorePost;

  var onScroll = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight); // scrollY: 처음부터 제일 밑으로 내일 위치에서 상단까지의 높이(스크롤 내린 거리)
    // clientHeight: 상단까지의 높이에서 스크롤을 제외한 하단까지의 높이(화면높이)
    // scrollHeight: scrollY + clientHeight 값(전체 화면 길이)

    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        dispatch({
          type: _reducers_post__WEBPACK_IMPORTED_MODULE_5__["LOAD_HASHTAG_POSTS_REQUEST"],
          lastId: mainPosts[mainPosts.length - 1].id,
          data: tag
        });
      }
    }
  }, [hasMorePost, mainPosts.length]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, mainPosts.map(function (c) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_PostCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: c.id,
      post: c
    });
  }));
};

Hashtag.propTypes = {
  tag: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired
};

Hashtag.getInitialProps =
/*#__PURE__*/
function () {
  var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(context) {
    var tag;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // next가 임의로 추가해준 lifecycle, getInitialProps가 제일 먼저 실행됨.
            tag = context.query.tag;
            console.log('hashtag getInitialProps', tag);
            context.store.dispatch({
              type: _reducers_post__WEBPACK_IMPORTED_MODULE_5__["LOAD_HASHTAG_POSTS_REQUEST"],
              data: tag
            });
            return _context.abrupt("return", {
              tag: context.query.tag
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (Hashtag);

/***/ })

})
//# sourceMappingURL=hashtag.js.9e8144cd5f8e3c9ce3a3.hot-update.js.map