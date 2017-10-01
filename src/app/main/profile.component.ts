import {Component, Input} from '@angular/core';

import {Profile} from '../profile';
import {Page} from '../page';

/*
 * The Component showing a single Profile in detail.
 */

@Component({
    selector: 'profile',
    templateUrl: './_profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    /*
     * The Profile currently shown.
     */
    @Input()
    profile?: Profile;

    /*
     * Whether the Component is showing a Page.
     */
    get isPage() {
        return this.profile instanceof Page;
    }
}

