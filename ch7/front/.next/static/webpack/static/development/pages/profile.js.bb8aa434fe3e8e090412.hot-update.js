webpackHotUpdate("static\\development\\pages\\profile.js",{

/***/ "./pages/profile.js":
/*!**************************!*\
  !*** ./pages/profile.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_NicknameEditForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/NicknameEditForm */ "./components/NicknameEditForm.js");
/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/user */ "./reducers/user.js");
/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers/post */ "./reducers/post.js");
/* harmony import */ var _components_PostCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PostCard */ "./components/PostCard.js");






 // 배열 안에 jsx를 사용하는 경우에는 반드시 key를 넣을 것

var Profile = function Profile() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.user;
  }),
      me = _useSelector.me,
      followingList = _useSelector.followingList,
      followerList = _useSelector.followerList;

  var _useSelector2 = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.post;
  }),
      mainPosts = _useSelector2.mainPosts;

  var onUnfollow = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (userId) {
    return function () {
      dispatch({
        type: _reducers_user__WEBPACK_IMPORTED_MODULE_4__["UNFOLLOW_USER_REQUEST"],
        data: userId
      });
    };
  }, []);
  var onRemoveFollower = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (userId) {
    return function () {
      dispatch({
        type: _reducers_user__WEBPACK_IMPORTED_MODULE_4__["REMOVE_FOLLOWER_REQUEST"],
        data: userId
      });
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NicknameEditForm__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["List"], {
    style: {
      marginBottom: '20px'
    },
    grid: {
      gutter: 4,
      xs: 2,
      md: 3
    },
    size: "small",
    header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\uD314\uB85C\uC789 \uBAA9\uB85D"),
    loadMore: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      style: {
        width: '100%'
      }
    }, "\uB354 \uBCF4\uAE30"),
    bordered: true,
    dataSource: followingList,
    renderItem: function renderItem(item) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
        style: {
          marginTop: '20px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Card"], {
        actions: [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          key: "stop",
          type: "stop",
          onClick: onUnfollow(item.id)
        })]
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Card"].Meta, {
        description: item.nickname
      })));
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["List"], {
    style: {
      marginBottom: '20px'
    },
    grid: {
      gutter: 4,
      xs: 2,
      md: 3
    },
    size: "small",
    header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\uD314\uB85C\uC6CC \uBAA9\uB85D"),
    loadMore: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      style: {
        width: '100%'
      }
    }, "\uB354 \uBCF4\uAE30"),
    bordered: true,
    dataSource: followerList,
    renderItem: function renderItem(item) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
        style: {
          marginTop: '20px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Card"], {
        actions: [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          key: "stop",
          type: "stop",
          onClick: onRemoveFollower(item.id)
        })]
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Card"].Meta, {
        description: item.nickname
      })));
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, mainPosts.map(function (c) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PostCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: +c.createdAt,
      post: c
    });
  })));
};

Profile.getInitialProps = async;
/* harmony default export */ __webpack_exports__["default"] = (Profile);

/***/ })

})
//# sourceMappingURL=profile.js.bb8aa434fe3e8e090412.hot-update.js.map