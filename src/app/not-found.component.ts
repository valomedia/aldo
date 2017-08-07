import {Component} from '@angular/core';

/*
 * The Component shown when the user hits a dead link.
 */

@Component({
    selector: 'not-found',
    template: `
        <md-card>
            <md-card-header>
                <md-card-title>Fehlerhafter Link</md-card-title>
                <md-card-subtitle>
                    Die Seite kann nicht gefunden werden
                </md-card-subtitle>
                <img md-card-avatar src='favicon.ico'>
            </md-card-header>
            <md-card-content>
                <p>
                    Bitte überprüfe den Link, mit dem du auf diese Seite 
                    gekommen bist.  Wenn du diese Seite über einen Knopf in 
                    der App erreicht hast, wende dich bitte an unser 
                    Supportteam, damit wir das Problem beheben können.
                </p>
            </md-card-content>
        </md-card>
    `,
    styleUrls: ['dist/not-found.component.css']
})
export class NotFoundComponent {}

