import {Component} from '@angular/core';

/*
 * The Component containing the layout everything else goes into.
 */

@Component({
    selector: 'main',
    template: `
        <div>
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['dist/main.component.css']
})
export class MainComponent {}

