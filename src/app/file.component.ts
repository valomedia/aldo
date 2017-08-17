import {Component} from '@angular/core';

/*
 * The Component used to select a file.
 *
 * This will prompt the user to provide a link to a file, or upload a file from 
 * their harddrive.  The file is returned as a promise for a string containing 
 * to uri of the file.
 */

@Component({
    selector: 'file',
    templateUrl: './_file.component.html',
    styleUrls: ['./file.component.css']
})
export class FileComponent {
    /*
     * The link the user has added.
     */
    link = '';
}

