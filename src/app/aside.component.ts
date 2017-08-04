import {Component} from '@angular/core';

/*
 * The right sidebar.
 */

@Component({
    selector: 'aside',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['dist/aside.component.css']
})
export class AsideComponent {}

