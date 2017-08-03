import {Component} from '@angular/core';

/*
 * The left sidenav.
 */

@Component({
    selector: 'nav',
    template: `
        <pages (click)='nav.close()'></pages>
    `,
    styleUrls: ['dist/nav.component.css']
})
export class NavComponent {}

