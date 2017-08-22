import {Component, Input} from '@angular/core';

import {Profile} from './profile';

/*
 * The Component showing image and name of a Profile in the header of a card.
 */

@Component({
    selector: 'profile-card',
    templateUrl: './_profile-card.component.html',
    styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
    @Input()
    profile: Profile;
}

