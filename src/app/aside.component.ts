import {Component} from '@angular/core';

/*
 * The right sidebar.
 */

@Component({
    selector: 'aside',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['dist/aside.component.css']
})
export class AsideComponent {}

