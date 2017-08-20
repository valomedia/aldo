import {Component} from '@angular/core';

/*
 * A dummy Component so there is something to fill into the router-outlet.
 */

@Component({
    selector: 'dummy',
    template: `
        <displacer>
            <div></div>
        </displacer>
    `,
    styleUrls: ['dist/dummy.component.css']
})
export class DummyComponent {}

