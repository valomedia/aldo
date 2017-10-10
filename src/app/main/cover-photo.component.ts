import {Component, Input} from '@angular/core';

import {CoverPhoto} from '../cover-photo';

/*
 * The Component showing a CoverPhoto.
 */

@Component({
    selector: 'cover-photo',
    templateUrl: './_cover-photo.component.html',
    styleUrls: ['./cover-photo.component.css']
})
export class CoverPhotoComponent {
    @Input()
    cover: CoverPhoto;
}

