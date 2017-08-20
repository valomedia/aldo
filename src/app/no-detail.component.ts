import {Component} from '@angular/core';

/*
 * The Component shown when the user opens the detail, with nothing selected.
 */

@Component({
    selector: 'no-detail',
    template: `
        <h1>Kein Post ausgewählt</h1>
        <p>
            Klicke auf einen Post in der Hauptansicht, um hier mehr Details 
            zu sehen.
        </p>
    `,
    styleUrls: ['dist/no-detail.component.css']
})
export class NoDetailComponent {}

