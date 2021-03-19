(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-child-routes"],{

/***/ "XP++":
/*!*********************************************!*\
  !*** ./src/app/pages/pages-child.routes.ts ***!
  \*********************************************/
/*! exports provided: ChildRoutesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChildRoutesModule", function() { return ChildRoutesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/main.component */ "/s1f");
/* harmony import */ var _clothes_men_men_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clothes/men/men.component */ "SoWt");
/* harmony import */ var _clothes_woman_woman_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clothes/woman/woman.component */ "NduU");
/* harmony import */ var _clothes_clothes_details_clothes_details_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clothes/clothes-details/clothes-details.component */ "PAtW");








const routes = [
    {
        path: '', component: _main_main_component__WEBPACK_IMPORTED_MODULE_2__["MainComponent"], data: { title: 'Inicio' }
    },
    {
        path: 'main', component: _main_main_component__WEBPACK_IMPORTED_MODULE_2__["MainComponent"], data: { title: 'Principal' }
    },
    {
        path: 'clothes/man', component: _clothes_men_men_component__WEBPACK_IMPORTED_MODULE_3__["MenComponent"], data: { title: 'Ropa - Hombre' }
    },
    {
        path: 'clothes/woman', component: _clothes_woman_woman_component__WEBPACK_IMPORTED_MODULE_4__["WomanComponent"], data: { title: 'Ropa - Mujer' }
    },
    {
        path: 'clothes/detail/:id', component: _clothes_clothes_details_clothes_details_component__WEBPACK_IMPORTED_MODULE_5__["ClothesDetailsComponent"], data: { title: 'Ropa - Detalles' }
    }
];
class ChildRoutesModule {
}
ChildRoutesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ChildRoutesModule });
ChildRoutesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ChildRoutesModule_Factory(t) { return new (t || ChildRoutesModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ChildRoutesModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChildRoutesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=pages-child-routes.js.map