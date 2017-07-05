import {Component, Input} from '@angular/core';
import {MdSnackBar, MdSnackBarRef} from '@angular/material';

import {GraphApiError} from './graph-api-error';

/*
 * The Component showing an error from the GraphAPI.
 */

@Component({
    selector: 'graph-api-error',
    template: `
        <div *ngIf='graphApiError'>
            <p>
                <strong>{{graphApiError.getTitle()}}</strong><br>
                <em>{{graphApiError.getMsg()}}</em><br>
            </p>
            <div class='app-snackbar-actions'>
                <button md-button (click)='mdSnackBarRef.dismiss()'>
                    Fehler ignorieren
                    <md-icon>cancel</md-icon>
                </button>
                <button md-button color='primary' (click)='reload()'>
                    Seite neu laden
                    <md-icon>refresh</md-icon>
                </button>
            </div>
        </div>
        `
})
export class GraphApiErrorComponent {

    @Input()
    graphApiError: GraphApiError;

    @Input()
    mdSnackBarRef: MdSnackBarRef<GraphApiErrorComponent>;

    /*
     * Reload the page.
     */
    reload() {
        location.reload();
    }
}

export function showGraphApiError(
    mdSnackBar: MdSnackBar,
    graphApiError: GraphApiError
) {
    if (document.getElementsByTagName('graph-api-error').length) { return; }
    let mdSnackBarRef = mdSnackBar.openFromComponent(GraphApiErrorComponent);
    mdSnackBarRef.instance.graphApiError = graphApiError;
    mdSnackBarRef.instance.mdSnackBarRef = mdSnackBarRef;
}

