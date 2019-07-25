webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next-server/dist/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next-redux-wrapper */ "./node_modules/next-redux-wrapper/es6/index.js");
/* harmony import */ var next_redux_saga__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next-redux-saga */ "./node_modules/next-redux-saga/dist/next-redux-saga.es.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
/* harmony import */ var _components_AppLayout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/AppLayout */ "./components/AppLayout.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../reducers */ "./reducers/index.js");
/* harmony import */ var _sagas__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../sagas */ "./sagas/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./index */ "./pages/index.js");
/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../reducers/user */ "./reducers/user.js");






 //서버사이드 렌더링에 필수요소










var NodeBird = function NodeBird(_ref) {
  var Component = _ref.Component,
      store = _ref.store,
      pageProps = _ref.pageProps;
  return (// hashtag의 component의 props로 넣어줌.
    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_8__["Provider"], {
      store: store
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("title", null, "NodeBird"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("script", {
      src: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
      rel: "stylesheet",
      type: "text/css",
      charset: "UTF-8",
      href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
      rel: "stylesheet",
      type: "text/css",
      href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_AppLayout__WEBPACK_IMPORTED_MODULE_10__["default"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, pageProps)))
  );
};

NodeBird.propTypes = {
  Component: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType.isRequired,
  store: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired,
  pageProps: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired
}; // const middleware = (store) => (next) => (action) => {
//   next(action);
// };
//= =====middleware만드는 방법 : currying - 인자 하나를 받아 다른 함수를 리턴
// ==================next에서 getInitialProps 실행. context도 같이 넣어줌. 이것에 각 Component에서 실행됨.===============

NodeBird.getInitialProps =
/*#__PURE__*/
function () {
  var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(context) {
    var ctx, Component, pageProps, state, cookie;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(context);
            ctx = context.ctx, Component = context.Component;
            pageProps = {};
            state = ctx.store.getState(); // user 정보 가져옴, user 정보도 서버사이드 렌더링 구현됨

            cookie = ctx.req.headers.cookie; // 쿠키가 위치하는 곳

            console.log(cookie); // 클라이언트 환경에서는 브라우저가 쿠키를 넣어주는데, 서버일 경우에는 직접 넣어야 한다.

            if (!state.user.me) {
              _context.next = 12;
              break;
            }

            ctx.store.dispatch({
              type: _reducers_user__WEBPACK_IMPORTED_MODULE_14__["LOAD_USER_REQUEST"]
            });

            if (!Component.getInitialProps) {
              _context.next = 12;
              break;
            }

            _context.next = 11;
            return Component.getInitialProps(ctx);

          case 11:
            pageProps = _context.sent;

          case 12:
            return _context.abrupt("return", {
              pageProps: pageProps
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}(); // =================================================================================


var configureStore = function configureStore(initialState, options) {
  var sagaMiddleware = Object(redux_saga__WEBPACK_IMPORTED_MODULE_9__["default"])();
  var middlewares = [sagaMiddleware];
  var enhancer =  false // 실제 서비스
  ? undefined : Object(redux__WEBPACK_IMPORTED_MODULE_7__["compose"])(redux__WEBPACK_IMPORTED_MODULE_7__["applyMiddleware"].apply(void 0, middlewares), !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
    return f;
  });
  var store = Object(redux__WEBPACK_IMPORTED_MODULE_7__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_11__["default"], initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(_sagas__WEBPACK_IMPORTED_MODULE_12__["default"]); // 서버사이드 렌더링할 때 store.sagaTask를 변수로 설정. withReduxSaga가 내부에서 필요로 함

  return store;
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_5__["default"])(configureStore)(Object(next_redux_saga__WEBPACK_IMPORTED_MODULE_6__["default"])(NodeBird))); // 레이아웃은 _app.js에서 코딩을 한다.

/***/ })

})
//# sourceMappingURL=_app.js.3d18f8076a337ef78915.hot-update.js.map