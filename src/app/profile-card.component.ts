import {Component, Input} from '@angular/core';

import {Profile} from './profile';

/*
 * A card with the image and name of a Profile in its header.
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

