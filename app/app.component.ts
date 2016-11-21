import { Component } from '@angular/core';

declare var keythereum;
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

@Component({
    selector: 'my-app',
    template: `
        <span class="col-md-3">Enter a password</span>
        <div class="col-md-6"><input type="password" [(ngModel)]="password"></div>
        <button class="btn btn-success col-md-3" (click)="generateKey()">Generate</button>
        <div class="row">
            <div><label>Private key : </label> {{privateKey}} </div>
            <div><label>Address : </label> {{address}} </div>
        </div>
        <a href="{{keyFile}}" download="{{fileName}}">Get key file</a>
        `,
    styles: [``]
})

export class AppComponent {
    password: string = '';
    privateKey: string = '';
    address: string = '';
    keyObject: any;
    keyFile: string = '';
    fileName: string = '';
    generateKey(password) {
        var dk = keythereum.create(params);
        for (var i = 0; i < dk.privateKey.length; i++) {
            this.privateKey += dk.privateKey[i].toString(16);
        }
        this.keyObject = keythereum.dump(this.password, dk.privateKey, dk.salt, dk.iv, options);
        this.address = '0x' + this.keyObject.address;
        this.keyFile = "data:text;charset=utf-8," + encodeURIComponent(JSON.stringify(this.keyObject));
        this.fileName = "UTC--" + (new Date).toISOString() + "--" + this.keyObject.address;;
    };

    downloadKeyFile() {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.keyObject));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "scene.json");
        dlAnchorElem.click();
    }
}
function uinthex(ua) {

}