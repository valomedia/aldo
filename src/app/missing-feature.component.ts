import {Component} from '@angular/core';

/*
 * The Component shown wherever the real thing is not implemented yet.
 */

@Component({
    selector: 'missing-feature',
    template: `
        <md-card>
            <md-card-header>
                <md-card-title>Fehlendes Feature</md-card-title>
                <md-card-subtitle>Hier entsteht etwas neues</md-card-subtitle>
            </md-card-header>
            <md-card-content>
                <p>
                    Dieses Feature haben wir leider noch nicht fertig bekommen, 
                    aber wir arbeiten daran, bitte habe noch etwas Geduld.
                </p>
            </md-card-content>
        </md-card>
    `,
    styleUrls: ['dist/missing-feature.component.css']
})
export class MissingFeatureComponent {}

