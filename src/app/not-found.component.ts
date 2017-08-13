import {Component} from '@angular/core';
import {Location} from '@angular/common';

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
            <md-card-actions>
                <a md-button (click)='location.back()'>
                    Zurück
                    <md-icon>arrow_back</md-icon>
                </a>
                <a md-button color='primary' [app-link]='null'>
                    Dashboard
                    <md-icon>dashboard</md-icon>
                </a>
            </md-card-actions>
        </md-card>
    `,
    styleUrls: ['dist/not-found.component.css']
})
export class NotFoundComponent {
    constructor(private location: Location) {}
}

