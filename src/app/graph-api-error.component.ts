import {Component, Input} from '@angular/core';

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
                <button (click)='reload()'>
                    Seite neu laden
                </button>
            </p>
        </div>
        `
})
export class GraphApiErrorComponent {
    @Input()
    graphApiError: GraphApiError;

    /*
     * Reload the page.
     */
    reload() {
        location.reload();
    }
}

