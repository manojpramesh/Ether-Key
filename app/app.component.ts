import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        `,  
    styles: [`
    `]
})

export class AppComponent {
    title = 'Ethereum Wallet';
}