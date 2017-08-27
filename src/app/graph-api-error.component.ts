import {Component, Input, OnInit} from '@angular/core';
import {MdSnackBar, MdSnackBarRef} from '@angular/material';

import {GraphApiError} from './graph-api-error';

/*
 * The Component showing an error from the GraphAPI.
 */

@Component({
    selector: 'graph-api-error',
    templateUrl: './_graph-api-error.component.html',
    styleUrls: ['./graph-api-error.component.css']
})
export class GraphApiErrorComponent implements OnInit {

    @Input()
    graphApiError: GraphApiError;

    @Input()
    mdSnackBarRef: MdSnackBarRef<GraphApiErrorComponent>;

    ngOnInit() {
        console.error("Error encountered:", this.graphApiError);
    }

    /*
     * Reload the page.
     */
    reload() {
        location.reload();
    }
}

/*
 * Show a GraphApiError and return it.
 */
export function showGraphApiError(
    mdSnackBar: MdSnackBar,
    graphApiError: GraphApiError
) {
    if (!document.getElementsByTagName('graph-api-error').length) {
        const mdSnackBarRef = mdSnackBar.openFromComponent(
            GraphApiErrorComponent);
        mdSnackBarRef.instance.graphApiError = graphApiError;
        mdSnackBarRef.instance.mdSnackBarRef = mdSnackBarRef;
    }
    return graphApiError;
}

