import {Component} from '@angular/core';

/*
 * The left sidenav.
 */

@Component({
    selector: 'nav',
    template: `
        <div>
            <pages></pages>
        </div>
    `,
    styleUrls: ['dist/nav.component.css']
})
export class NavComponent {}

