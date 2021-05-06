(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\IV godina\agentske tehnologije\chat_zadatak\chat-client\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Gyf/":
/*!***********************************************!*\
  !*** ./src/app/services/websocket.service.ts ***!
  \***********************************************/
/*! exports provided: WebsocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketService", function() { return WebsocketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/webSocket */ "3uOa");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");





class WebsocketService {
    constructor() {
        this.identifier = localStorage.getItem('identifier') == null ? "" : localStorage.getItem('identifier');
        this.WS_ENDPOINT = 'ws://localhost:8080/chat-war/ws/' + this.identifier;
        this.messagesSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.messages$ = this.messagesSubject$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(e => { throw e; }));
    }
    connect() {
        if (!this.socket$ || this.socket$.closed) {
            this.socket$ = this.getNewWebSocket();
            const messages = this.socket$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])({
                error: error => console.log(error),
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(_ => rxjs__WEBPACK_IMPORTED_MODULE_3__["EMPTY"]));
            this.messagesSubject$.next(messages);
            this.socket$.subscribe({
                complete: () => { localStorage.removeItem('sessionId'); }
            });
        }
    }
    getNewWebSocket() {
        return Object(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_1__["webSocket"])({ url: this.WS_ENDPOINT, deserializer: msg => msg.data });
    }
    sendMessage(msg) {
        this.socket$.next(msg);
    }
    close() {
        this.socket$.complete();
        localStorage.removeItem('sessionId');
    }
}
WebsocketService.ɵfac = function WebsocketService_Factory(t) { return new (t || WebsocketService)(); };
WebsocketService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: WebsocketService, factory: WebsocketService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WebsocketService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_websocket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/websocket.service */ "Gyf/");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/user.service */ "qfBg");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");








function AppComponent_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_button_5_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.userService.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Log Out ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(wsService, userService) {
        this.wsService = wsService;
        this.userService = userService;
        this.title = 'chat-client';
        this.liveData$ = this.wsService.messages$;
        this.liveData$.subscribe({
            next: msg => this.handleMessage(msg)
        });
    }
    ngOnInit() {
        this.wsService.connect();
    }
    handleMessage(message) {
        if (message.match('.+:.*')) {
            var type = message.split(':')[0];
            var content = message.split(':')[1];
            if (type == 'sessionId')
                localStorage.setItem('sessionId', content);
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_websocket_service__WEBPACK_IMPORTED_MODULE_1__["WebsocketService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 7, vars: 1, consts: [["color", "primary", 2, "min-width", "100%", "max-width", "max-content"], [2, "width", "10px"], ["font-color", "white", 2, "margin-left", "10px"], ["name", "unauthenticated-user", 2, "flex", "1 1 auto"], ["style", "float: right;", "mat-button", "", "routerLink", "../", 3, "click", 4, "ngIf"], ["mat-button", "", "routerLink", "../", 2, "float", "right", 3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Chat application");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, AppComponent_button_5_Template, 2, 0, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.userService.isLoggedIn());
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__["MatToolbar"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterOutlet"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLink"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _services_websocket_service__WEBPACK_IMPORTED_MODULE_1__["WebsocketService"] }, { type: _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] }]; }, null); })();


/***/ }),

/***/ "WjaR":
/*!*************************************************************!*\
  !*** ./src/app/components/logged-in/logged-in.component.ts ***!
  \*************************************************************/
/*! exports provided: LoggedInComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoggedInComponent", function() { return LoggedInComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user-list/user-list.component */ "sgBM");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../messages/messages.component */ "wa57");




class LoggedInComponent {
    constructor() {
        this.selected = null;
    }
    ngOnInit() {
    }
    receiveMessage($event) {
        this.selected = $event;
    }
}
LoggedInComponent.ɵfac = function LoggedInComponent_Factory(t) { return new (t || LoggedInComponent)(); };
LoggedInComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoggedInComponent, selectors: [["app-logged-in"]], decls: 5, vars: 1, consts: [[2, "width", "30%", "display", "inline-block", "margin-right", "3%"], [3, "messageEvent"], [2, "width", "65%", "display", "inline-block"], [3, "selected"]], template: function LoggedInComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-user-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("messageEvent", function LoggedInComponent_Template_app_user_list_messageEvent_2_listener($event) { return ctx.receiveMessage($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-messages", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selected", ctx.selected);
    } }, directives: [_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_1__["UserListComponent"], _messages_messages_component__WEBPACK_IMPORTED_MODULE_2__["MessagesComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9nZ2VkLWluL2xvZ2dlZC1pbi5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoggedInComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-logged-in',
                templateUrl: './logged-in.component.html',
                styleUrls: ['./logged-in.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _components_authentication_authentication_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/authentication/authentication.component */ "bO1w");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/sort */ "Dh3D");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _components_logged_in_logged_in_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/logged-in/logged-in.component */ "WjaR");
/* harmony import */ var _components_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/user-list/user-list.component */ "sgBM");
/* harmony import */ var _components_messages_messages_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/messages/messages.component */ "wa57");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");


























class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_22__["CommonModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCardModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"],
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__["MatSortModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_16__["MatSelectModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_20__["MatListModule"],
            _angular_material_badge__WEBPACK_IMPORTED_MODULE_21__["MatBadgeModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_23__["MatToolbarModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_24__["MatPaginatorModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _components_authentication_authentication_component__WEBPACK_IMPORTED_MODULE_7__["AuthenticationComponent"],
        _components_logged_in_logged_in_component__WEBPACK_IMPORTED_MODULE_17__["LoggedInComponent"],
        _components_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_18__["UserListComponent"],
        _components_messages_messages_component__WEBPACK_IMPORTED_MODULE_19__["MessagesComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_22__["CommonModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCardModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"],
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__["MatSortModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_16__["MatSelectModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_20__["MatListModule"],
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_21__["MatBadgeModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_23__["MatToolbarModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_24__["MatPaginatorModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _components_authentication_authentication_component__WEBPACK_IMPORTED_MODULE_7__["AuthenticationComponent"],
                    _components_logged_in_logged_in_component__WEBPACK_IMPORTED_MODULE_17__["LoggedInComponent"],
                    _components_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_18__["UserListComponent"],
                    _components_messages_messages_component__WEBPACK_IMPORTED_MODULE_19__["MessagesComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_22__["CommonModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCardModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
                    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"],
                    _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
                    _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
                    _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"],
                    _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__["MatSortModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_16__["MatSelectModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_material_list__WEBPACK_IMPORTED_MODULE_20__["MatListModule"],
                    _angular_material_badge__WEBPACK_IMPORTED_MODULE_21__["MatBadgeModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_23__["MatToolbarModule"],
                    _angular_material_paginator__WEBPACK_IMPORTED_MODULE_24__["MatPaginatorModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "bO1w":
/*!***********************************************************************!*\
  !*** ./src/app/components/authentication/authentication.component.ts ***!
  \***********************************************************************/
/*! exports provided: AuthenticationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationComponent", function() { return AuthenticationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/websocket.service */ "Gyf/");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");











class AuthenticationComponent {
    constructor(userService, wsService, snackBar, router) {
        this.userService = userService;
        this.wsService = wsService;
        this.snackBar = snackBar;
        this.router = router;
        this.liveData$ = this.wsService.messages$;
        this.liveData$.subscribe({
            next: msg => this.handleMessage(msg)
        });
    }
    ngOnInit() {
        this.wsService.connect();
    }
    login() {
        this.userService.login(this.username, this.password);
    }
    signup() {
        this.userService.signup(this.username, this.password);
    }
    handleMessage(message) {
        if (message.match('.+:.*')) {
            var type = message.split(':')[0];
            var content = message.split(':')[1];
            if (type == 'login')
                this.handleLogin(content);
            else if (type == 'register')
                this.handleRegistration(content);
        }
    }
    handleLogin(message) {
        if (message.startsWith('OK ')) {
            localStorage.setItem('identifier', message.substring(3));
            this.router.navigate(['chat']);
        }
        else {
            this.openSnackBar(message);
        }
    }
    handleRegistration(message) {
        this.openSnackBar(message);
    }
    openSnackBar(message) {
        this.snackBar.open(message, 'Okay', { duration: 5000 });
    }
}
AuthenticationComponent.ɵfac = function AuthenticationComponent_Factory(t) { return new (t || AuthenticationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebsocketService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
AuthenticationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthenticationComponent, selectors: [["app-authentication"]], decls: 21, vars: 4, consts: [[2, "height", "100%", "display", "flex", "justify-content", "center"], [1, "mat-elevation-z8", 2, "margin-top", "10%", "width", "40%", "height", "60%", "display", "flex", "justify-content", "center", "align-items", "center", "height", "max-content", "padding-top", "20px", "opacity", "85%"], ["novalidate", "", 2, "width", "80%"], ["feedform", "ngForm"], [1, "item1"], [2, "width", "100%"], ["matInput", "", "required", "", "id", "usernameInput", "name", "c1", 2, "height", "40%", 3, "ngModel", "ngModelChange"], ["name", "ngModel"], [1, "item3"], ["matInput", "", "required", "", "id", "passwordInput", "name", "c2", "type", "password", 2, "height", "40%", 3, "ngModel", "ngModelChange"], ["name2", "ngModel"], [2, "text-align", "center", "margin-top", "20px"], ["id", "loginButton", "mat-raised-button", "", "color", "primary", "type", "submit", 2, "padding", "12px 32px", "margin-right", "20px", 3, "disabled", "click"], ["id", "signupButton", "mat-raised-button", "", "color", "accent", "type", "submit", 2, "padding", "12px 32px", 3, "disabled", "click"]], template: function AuthenticationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "form", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "input", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AuthenticationComponent_Template_input_ngModelChange_8_listener($event) { return ctx.username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AuthenticationComponent_Template_input_ngModelChange_14_listener($event) { return ctx.password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AuthenticationComponent_Template_button_click_17_listener() { return ctx.login(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Log in");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AuthenticationComponent_Template_button_click_19_listener() { return ctx.signup(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Sign up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](9);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", _r1.invalid || _r2.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", _r1.invalid || _r2.invalid);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCard"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthenticationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-authentication',
                templateUrl: './authentication.component.html',
                styleUrls: ['./authentication.component.css']
            }]
    }], function () { return [{ type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"] }, { type: src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebsocketService"] }, { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }]; }, null); })();


/***/ }),

/***/ "qfBg":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class UserService {
    constructor(http) {
        this.http = http;
    }
    login(username, password) {
        var data = new Object();
        data['username'] = username;
        data['password'] = password;
        this.http.post('http://localhost:8080/chat-war/rest/users/login/' + localStorage.getItem('sessionId'), data).subscribe();
    }
    logout() {
        this.http.delete('http://localhost:8080/chat-war/rest/users/loggedIn/' + localStorage.getItem('sessionId') + "/" + localStorage.getItem('identifier')).subscribe();
        localStorage.removeItem('identifier');
    }
    signup(username, password) {
        var data = new Object();
        data['username'] = username;
        data['password'] = password;
        this.http.post('http://localhost:8080/chat-war/rest/users/register/' + localStorage.getItem('sessionId'), data, { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json' }) }).subscribe();
    }
    getRegistered() {
        this.http.get('http://localhost:8080/chat-war/rest/users/registered/' + localStorage.getItem('sessionId')).subscribe();
    }
    getLoggedIn() {
        this.http.get('http://localhost:8080/chat-war/rest/users/loggedIn/' + localStorage.getItem('sessionId')).subscribe();
    }
    isLoggedIn() {
        return localStorage.getItem('identifier') != null;
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "sgBM":
/*!*************************************************************!*\
  !*** ./src/app/components/user-list/user-list.component.ts ***!
  \*************************************************************/
/*! exports provided: UserListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserListComponent", function() { return UserListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/websocket.service */ "Gyf/");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/message.service */ "tZre");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







function UserListComponent_mat_list_option_3_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", user_r2.user, " ");
} }
function UserListComponent_mat_list_option_3_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", user_r2.user, " ");
} }
function UserListComponent_mat_list_option_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserListComponent_mat_list_option_3_div_1_Template, 2, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, UserListComponent_mat_list_option_3_div_2_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", user_r2.user);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", user_r2.active);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !user_r2.active);
} }
class UserListComponent {
    constructor(wsService, userService, s) {
        this.wsService = wsService;
        this.userService = userService;
        this.s = s;
        this.liveData$ = this.wsService.messages$;
        this.loggedIn = [];
        this.registered = [];
        this.displayed = [];
        this.messageEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selected = null;
        this.liveData$.subscribe({
            next: msg => this.handleMessage(msg)
        });
        this.wsService.connect();
        setTimeout(() => { this.userService.getLoggedIn(); this.userService.getRegistered(); }, 500);
    }
    ngOnInit() {
    }
    handleMessage(message) {
        if (message.match('.+:.*')) {
            var type = message.split(':')[0];
            var content = message.split(':')[1];
            if (type == 'loggedInList') {
                this.handleLoggedInList(content);
            }
            else if (type == 'registeredList') {
                this.handleRegisteredList(content);
            }
        }
    }
    handleLoggedInList(message) {
        this.loggedIn = message.split(',');
        this.setUpDisplayedUsers();
    }
    handleRegisteredList(message) {
        this.registered = message.split(',');
        this.setUpDisplayedUsers();
    }
    setUpDisplayedUsers() {
        this.displayed = [];
        for (var user of this.registered) {
            if (this.loggedIn.includes(user))
                this.displayed.push({ 'user': user, 'active': true });
            else
                this.displayed.push({ 'user': user, 'active': false });
        }
        if (this.selected == null && this.displayed.length > 0) {
            this.select(this.displayed[0]['user']);
        }
    }
    sendMessage() {
        this.messageEvent.emit(this.selected);
    }
    select(user) {
        this.selected = user;
        this.sendMessage();
    }
}
UserListComponent.ɵfac = function UserListComponent_Factory(t) { return new (t || UserListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_1__["WebsocketService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"])); };
UserListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserListComponent, selectors: [["app-user-list"]], outputs: { messageEvent: "messageEvent" }, decls: 4, vars: 2, consts: [[3, "multiple", "selectionChange"], ["users", ""], ["style", "display: inline-block;", 3, "value", 4, "ngFor", "ngForOf"], [2, "display", "inline-block", 3, "value"], ["style", "display: inline-block; color: forestgreen;", 4, "ngIf"], ["style", "display: inline-block;", 4, "ngIf"], [2, "display", "inline-block", "color", "forestgreen"], [2, "display", "inline-block"]], template: function UserListComponent_Template(rf, ctx) { if (rf & 1) {
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-selection-list", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectionChange", function UserListComponent_Template_mat_selection_list_selectionChange_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return ctx.select(_r0.selectedOptions.selected[0] == null ? null : _r0.selectedOptions.selected[0].value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, UserListComponent_mat_list_option_3_Template, 3, 3, "mat-list-option", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("multiple", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.displayed);
    } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatSelectionList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListOption"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvdXNlci1saXN0L3VzZXItbGlzdC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-user-list',
                templateUrl: './user-list.component.html',
                styleUrls: ['./user-list.component.css']
            }]
    }], function () { return [{ type: src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_1__["WebsocketService"] }, { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] }, { type: src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"] }]; }, { messageEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "tZre":
/*!*********************************************!*\
  !*** ./src/app/services/message.service.ts ***!
  \*********************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class MessageService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8080/chat-war/rest/messages/';
    }
    send(receiver, subject, content) {
        this.http.post(this.baseUrl + "user/" + localStorage.getItem('sessionId') + "/" + receiver + "/" + subject + "/" + content, null).subscribe();
    }
    sendToAll(subject, content) {
        this.http.post(this.baseUrl + "all/" + localStorage.getItem('sessionId') + "/" + subject + "/" + content, null).subscribe();
    }
    getMessages() {
        this.http.get(this.baseUrl + localStorage.getItem('sessionId')).subscribe();
    }
}
MessageService.ɵfac = function MessageService_Factory(t) { return new (t || MessageService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
MessageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MessageService, factory: MessageService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessageService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "vWLh":
/*!**********************************************!*\
  !*** ./src/app/guard/route-guard.service.ts ***!
  \**********************************************/
/*! exports provided: RouteGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteGuardService", function() { return RouteGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/user.service */ "qfBg");




class RouteGuardService {
    constructor(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    canActivate(route) {
        const onlyLoggedIn = route.data.onlyLoggedIn;
        if (onlyLoggedIn && !this.userService.isLoggedIn()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
RouteGuardService.ɵfac = function RouteGuardService_Factory(t) { return new (t || RouteGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"])); };
RouteGuardService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RouteGuardService, factory: RouteGuardService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RouteGuardService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_authentication_authentication_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/authentication/authentication.component */ "bO1w");
/* harmony import */ var _components_logged_in_logged_in_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/logged-in/logged-in.component */ "WjaR");
/* harmony import */ var _guard_route_guard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./guard/route-guard.service */ "vWLh");







const routes = [
    { path: 'chat', component: _components_logged_in_logged_in_component__WEBPACK_IMPORTED_MODULE_3__["LoggedInComponent"], canActivate: [_guard_route_guard_service__WEBPACK_IMPORTED_MODULE_4__["RouteGuardService"]], data: { onlyLoggedIn: true } },
    { path: '', component: _components_authentication_authentication_component__WEBPACK_IMPORTED_MODULE_2__["AuthenticationComponent"], canActivate: [_guard_route_guard_service__WEBPACK_IMPORTED_MODULE_4__["RouteGuardService"]], data: { onlyLoggedIn: false } }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "wa57":
/*!***********************************************************!*\
  !*** ./src/app/components/messages/messages.component.ts ***!
  \***********************************************************/
/*! exports provided: MessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesComponent", function() { return MessagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/message.service */ "tZre");
/* harmony import */ var src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/websocket.service */ "Gyf/");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");













function MessagesComponent_th_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " . ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MessagesComponent_td_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, element_r9.date, "medium"), " ");
} }
function MessagesComponent_th_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " . ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MessagesComponent_td_10_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Sender: ", element_r10.otherUsername, ": ");
} }
function MessagesComponent_td_10_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Sender: You ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function MessagesComponent_td_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MessagesComponent_td_10_div_2_Template, 2, 1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MessagesComponent_td_10_div_3_Template, 2, 0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", element_r10.incoming === "true");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", element_r10.incoming === "false");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Subject: ", element_r10.subject, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Content: ", element_r10.content, " ");
} }
function MessagesComponent_tr_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 26);
} }
function MessagesComponent_tr_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 27);
} }
const _c0 = function () { return [3]; };
class MessagesComponent {
    constructor(messageService, wsService) {
        this.messageService = messageService;
        this.wsService = wsService;
        this.liveData$ = this.wsService.messages$;
        this.selected = null;
        this.allMessages = [];
        this.displayedMessages = [];
        this.subject = "";
        this.content = "";
        this.displayedColumns = ['date', 'message'];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.displayedMessages);
    }
    ngOnInit() {
        this.liveData$.subscribe({
            next: msg => this.handleMessage(msg)
        });
        this.wsService.connect();
        setTimeout(() => { this.messageService.getMessages(); }, 500);
    }
    ngOnChanges(changes) {
        this.setUpDisplayedMessages();
    }
    setUpDisplayedMessages() {
        this.displayedMessages = [];
        this.sortMessagesByDateTimeCreated();
        this.filterMessagesBySelectedUser();
        this.dataSource.data = this.displayedMessages;
        this.dataSource.paginator = this.paginator;
    }
    sortMessagesByDateTimeCreated() {
        for (var message of this.allMessages) {
            var dateTimeBase = message.dateTime.toString().split('.')[0];
            var dateBase = dateTimeBase.split('T')[0];
            var timeBase = dateTimeBase.split('T')[1];
            message['date'] = new Date(Number(dateBase.split('-')[0]), Number(dateBase.split('-')[1]), Number(dateBase.split('-')[2]), Number(timeBase.split(':')[0]), Number(timeBase.split(':')[1]), Number(timeBase.split(':')[2]));
        }
        this.allMessages.sort((m1, m2) => m1['date'].getTime() - m2['date'].getTime());
    }
    filterMessagesBySelectedUser() {
        for (var message of this.allMessages) {
            if (message.otherUsername == this.selected) {
                this.displayedMessages.push(message);
            }
        }
    }
    handleMessage(message) {
        if (message.match('.+:.*')) {
            var type = message.split(':')[0];
            if (type == 'messageList') {
                this.handleMessageList(message);
            }
            else if (type == 'message') {
                this.handleNewMessage(message);
            }
        }
    }
    handleMessageList(message) {
        message = message.substring(12, message.length);
        this.allMessages = JSON.parse(message);
        this.setUpDisplayedMessages();
    }
    handleNewMessage(message) {
        message = message.substring(8, message.length);
        this.allMessages.push(JSON.parse(message));
        this.setUpDisplayedMessages();
    }
    send() {
        this.messageService.send(this.selected, this.subject, this.content);
        this.subject = "";
        this.content = "";
    }
    sendToAll() {
        this.messageService.sendToAll(this.subject, this.content);
        this.subject = "";
        this.content = "";
    }
}
MessagesComponent.ɵfac = function MessagesComponent_Factory(t) { return new (t || MessagesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_4__["WebsocketService"])); };
MessagesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MessagesComponent, selectors: [["app-messages"]], viewQuery: function MessagesComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
    } }, inputs: { selected: "selected" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 34, vars: 11, consts: [[3, "hidden"], [2, "text-align", "center", "margin-top", "20px"], [1, "mat-elevation-z8", 2, "margin-top", "20px"], ["mat-table", "", 2, "width", "100%", 3, "dataSource"], ["matColumnDef", "date"], ["mat-header-cell", "", "hidden", "true", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "message"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", 3, "pageSizeOptions"], ["novalidate", "", 2, "width", "100%", "padding-left", "10%", "padding-right", "10%", "padding-top", "20px", "padding-bottom", "20px"], ["feedform", "ngForm"], [2, "width", "80%"], ["matInput", "", "required", "", "id", "subjectInput", "name", "c1", 2, "height", "40%", 3, "ngModel", "ngModelChange"], ["name", "ngModel"], ["matInput", "", "required", "", "id", "contentInput", "name", "c2", 2, "height", "40%", 3, "ngModel", "ngModelChange"], ["name2", "ngModel"], [2, "text-align", "left", "margin-top", "20px"], ["id", "sendButton", "mat-raised-button", "", "color", "primary", "type", "submit", 2, "padding", "12px 32px", "margin-right", "20px", 3, "disabled", "click"], ["id", "sendToAllButton", "mat-raised-button", "", "color", "accent", "type", "submit", 2, "padding", "12px 32px", 3, "disabled", "click"], ["mat-header-cell", "", "hidden", "true"], ["mat-cell", ""], [2, "padding", "20px"], [4, "ngIf"], [2, "word-break", "break-all"], ["mat-header-row", ""], ["mat-row", ""]], template: function MessagesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "table", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](5, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MessagesComponent_th_6_Template, 2, 0, "th", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, MessagesComponent_td_7_Template, 3, 4, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](8, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, MessagesComponent_th_9_Template, 2, 0, "th", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, MessagesComponent_td_10_Template, 8, 4, "td", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, MessagesComponent_tr_11_Template, 1, 0, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, MessagesComponent_tr_12_Template, 1, 0, "tr", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "mat-paginator", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "form", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-form-field", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Subject");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "input", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MessagesComponent_Template_input_ngModelChange_21_listener($event) { return ctx.subject = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-form-field", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "input", 16, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MessagesComponent_Template_input_ngModelChange_27_listener($event) { return ctx.content = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MessagesComponent_Template_button_click_30_listener() { return ctx.send(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Send");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MessagesComponent_Template_button_click_32_listener() { return ctx.sendToAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Send to all");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](22);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", ctx.selected == null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Chat with ", ctx.selected, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.subject);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.content);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", _r7.invalid || _r8.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", _r7.invalid || _r8.invalid);
    } }, directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatRowDef"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButton"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatCell"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatRow"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessagesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-messages',
                templateUrl: './messages.component.html',
                styleUrls: ['./messages.component.css']
            }]
    }], function () { return [{ type: src_app_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"] }, { type: src_app_services_websocket_service__WEBPACK_IMPORTED_MODULE_4__["WebsocketService"] }]; }, { selected: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], paginator: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]]
        }] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map