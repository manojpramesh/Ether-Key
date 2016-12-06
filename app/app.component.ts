import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
    templateUrl: './app/html/addressGenerator.html',
    styles: [`
        .mb-10 {
            margin-bottom: 10px;
        }
        .text-green {
            color: green;
        }
        .loading {
            text-align: center;
            padding: 10%;
        },
        .text-black {
            color: black;
        }
    `]
})

export class AppComponent {
    constructor(private sanitizer: DomSanitizer) { }
    password: string = '';
    privateKey: string = '';
    address: string = '';
    keyObject: any;
    keyFile: any;
    fileName: string = '';
    isGenerated: boolean = false;
    isGenerating: boolean = false;
    generateKey(password) {
        this.isGenerating = true;
        setTimeout(() => {
            var dk = keythereum.create(params);
            for (var i = 0; i < dk.privateKey.length; i++) {
                this.privateKey += dk.privateKey[i].toString(16);
            }
            this.keyObject = keythereum.dump(this.password, dk.privateKey, dk.salt, dk.iv, options);
            this.address = '0x' + this.keyObject.address;
            this.keyFile = this.sanitizer.bypassSecurityTrustUrl("data:text;charset=utf-8," + encodeURIComponent(JSON.stringify(this.keyObject)));
            this.fileName = "UTC--" + (new Date).toISOString() + "--" + this.keyObject.address;
            this.isGenerated = true;
            this.isGenerating = false;
        }, 10);
    };
}