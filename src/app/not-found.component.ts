import {Component} from '@angular/core';
import {Location} from '@angular/common';

/*
 * The Component shown when the user hits a dead link.
 */

@Component({
    selector: 'not-found',
    templateUrl: './_not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
    constructor(private location: Location) {}
}

