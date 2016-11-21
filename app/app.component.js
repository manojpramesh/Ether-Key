"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var options = {
    kdf: "pbkdf2",
    cipher: "aes-128-ctr",
    kdfparams: {
        c: 262144,
        dklen: 32,
        prf: "hmac-sha256"
    }
};
var params = { keyBytes: 32, ivBytes: 16 };
var kdf = "pbkdf2";
var AppComponent = (function () {
    function AppComponent() {
        this.password = '';
        this.privateKey = '';
        this.address = '';
        this.keyFile = '';
        this.fileName = '';
    }
    AppComponent.prototype.generateKey = function (password) {
        var dk = keythereum.create(params);
        for (var i = 0; i < dk.privateKey.length; i++) {
            this.privateKey += dk.privateKey[i].toString(16);
        }
        this.keyObject = keythereum.dump(this.password, dk.privateKey, dk.salt, dk.iv, options);
        this.address = '0x' + this.keyObject.address;
        this.keyFile = "data:text;charset=utf-8," + encodeURIComponent(JSON.stringify(this.keyObject));
        this.fileName = "UTC--" + (new Date).toISOString() + "--" + this.keyObject.address;
        ;
    };
    ;
    AppComponent.prototype.downloadKeyFile = function () {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.keyObject));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "scene.json");
        dlAnchorElem.click();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <span class=\"col-md-3\">Enter a password</span>\n        <div class=\"col-md-6\"><input type=\"password\" [(ngModel)]=\"password\"></div>\n        <button class=\"btn btn-success col-md-3\" (click)=\"generateKey()\">Generate</button>\n        <div class=\"row\">\n            <div><label>Private key : </label> {{privateKey}} </div>\n            <div><label>Address : </label> {{address}} </div>\n        </div>\n        <a href=\"{{keyFile}}\" download=\"{{fileName}}\">Get key file</a>\n        ",
            styles: [""]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
function uinthex(ua) {
}
//# sourceMappingURL=app.component.js.map