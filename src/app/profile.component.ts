import {Component, Input} from '@angular/core';

import {Profile} from './profile';

/*
 * The Component showing the list of pages.
 */

@Component({
    selector: 'profile',
    template: `
        <md-card-header *ngIf='profile'>
            <md-card-title>{{profile.name}}</md-card-title>
            <img md-card-avatar src='{{profile.picture}}'>
        </md-card-header>
    `,
    styleUrls: ['dist/profile.component.css']
})
export class ProfileComponent {

    @Input()
    profile: Profile;
}

