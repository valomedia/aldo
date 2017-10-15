import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';

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
    graphApiError?: GraphApiError;

    @Input()
    matSnackBarRef?: MatSnackBarRef<GraphApiErrorComponent>;

    /*
     * Show a GraphApiError and return it.
     */
    static show(
        matSnackBar: MatSnackBar,
        graphApiError: GraphApiError
    ) {
        if (!document.getElementsByTagName('graph-api-error').length) {
            const matSnackBarRef = matSnackBar.openFromComponent(
                GraphApiErrorComponent);
            matSnackBarRef.instance.graphApiError = graphApiError;
            matSnackBarRef.instance.matSnackBarRef = matSnackBarRef;
        }
        return graphApiError;
    }

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

