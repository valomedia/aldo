import {Component, Input} from '@angular/core';

import {Profile} from './profile';

/*
 * The Component showing image and name of a Profile in the header of a card.
 */

@Component({
    selector: 'profile',
    templateUrl: './_profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    @Input()
    profile: Profile;
}

